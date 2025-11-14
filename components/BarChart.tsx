"use client";
import * as d3 from "d3";
import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { Axis } from "./primitives/Axis";
import { Legend } from "./primitives/Legend";
import { TooltipProvider, useTooltip } from "./primitives/Tooltip";
import { Label, LabelProps } from "./primitives/Label";
import { useD3GroupTransition } from "./hooks/useGroupTransition";

// Types
type DataPoint = { x: string | number | Date; y: number };
type BarData = {
  [key: string]: {
    data: DataPoint[];
    color: string;
    label: string;
  };
};

interface ContainerProps {
  data: BarData;
  width?: number;
  height?: number;
  variant?: "spread" | "stacked";
  orientation?: "vertical" | "horizontal";
  children: ReactNode;
}

// Context
type BarChartContext = {
  data: BarData;
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
  xScale: any;
  yScale: any;
  variant: "spread" | "stacked";
  orientation: "vertical" | "horizontal";
  groupScale?: d3.ScaleBand<string> | null;
  stackedData?: d3.Series<Record<string, number>, string>[] | null;
  seriesKeys: string[];
  allPoints: DataPoint[];
};

const BarChartContext = createContext<BarChartContext | null>(null);

const useBarChart = () => {
  const context = useContext(BarChartContext);
  if (!context)
    throw new Error("Bar chart components must be used within a Bar.Container");
  return context;
};

// Container
const Container = ({
  data,
  width = 400,
  height = 200,
  variant = "spread",
  orientation = "vertical",
  children,
}: ContainerProps) => {
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const seriesKeys = Object.keys(data);
  const allPoints = Object.values(data).flatMap((series) => series.data);
  const allCategories = Array.from(
    new Set(allPoints.map((d) => d.x.toString()))
  );

  const yMax =
    variant === "stacked"
      ? d3.max(allCategories, (cat) =>
          d3.sum(seriesKeys, (key) => {
            const point = data[key].data.find((d) => d.x.toString() === cat);
            return point ? point.y : 0;
          })
        )!
      : d3.max(allPoints, (d) => d.y)!;

  // Scales
  const xScale = useMemo(() => {
    if (orientation === "vertical") {
      return d3
        .scaleBand()
        .domain(allCategories)
        .range([margin.left, width - margin.right])
        .padding(0.1);
    } else {
      return d3
        .scaleLinear()
        .domain([0, yMax])
        .range([margin.left, width - margin.right]);
    }
  }, [allCategories, width, margin, orientation, yMax]);

  const yScale = useMemo(() => {
    if (orientation === "vertical") {
      return d3
        .scaleLinear()
        .domain([0, yMax])
        .nice()
        .range([height - margin.bottom, margin.top]);
    } else {
      return d3
        .scaleBand()
        .domain(allCategories)
        .range([margin.top, height - margin.bottom])
        .padding(0.1);
    }
  }, [allCategories, height, margin, orientation, yMax]);

  // Grouped scale
  const groupScale = useMemo(() => {
    if (variant === "spread") {
      return d3
        .scaleBand()
        .domain(seriesKeys)
        .range([
          0,
          orientation === "vertical"
            ? (xScale as d3.ScaleBand<string>).bandwidth()
            : (yScale as d3.ScaleBand<string>).bandwidth(),
        ])
        .padding(0.05);
    }
    return null;
  }, [variant, seriesKeys, xScale, yScale, orientation]);

  // Stacked layout
  const stackedData = useMemo(() => {
    if (variant !== "stacked") return null;
    const stackedInput = allCategories.map((cat) => {
      const entry: Record<string, number> = {};
      seriesKeys.forEach((key) => {
        const point = data[key].data.find((d) => d.x.toString() === cat);
        entry[key] = point ? point.y : 0;
      });
      return entry;
    });
    return d3.stack<Record<string, number>>().keys(seriesKeys)(stackedInput);
  }, [variant, data, allCategories, seriesKeys]);

  const contextValue: BarChartContext = {
    data,
    width,
    height,
    margin,
    xScale,
    yScale,
    variant,
    orientation,
    groupScale,
    stackedData,
    seriesKeys,
    allPoints,
  };

  const { svgChildren, otherChildren } = React.Children.toArray(
    children
  ).reduce(
    (acc, child) => {
      if (React.isValidElement(child)) {
        if (child.type === ChartLegend) acc.otherChildren.push(child);
        else acc.svgChildren.push(child);
      }
      return acc;
    },
    {
      svgChildren: [] as React.ReactNode[],
      otherChildren: [] as React.ReactNode[],
    }
  );

  return (
    <BarChartContext.Provider value={contextValue}>
      <TooltipProvider>
        <div className="flex flex-col items-center gap-4">
          <svg
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            {svgChildren}
          </svg>
          {otherChildren}
        </div>
      </TooltipProvider>
    </BarChartContext.Provider>
  );
};

// Bar
interface BarProps {
  dataKey: string;
  label?: {
    labelFormatter?: (value: any) => React.ReactNode;
    variant?: LabelProps["variant"];
    className?: string;
  };
}

const Bar = ({ dataKey, label }: BarProps) => {
  const {
    data,
    xScale,
    yScale,
    width,
    height,
    margin,
    variant,
    orientation,
    groupScale,
    stackedData,
    seriesKeys,
    allPoints,
  } = useBarChart();
  const seriesData = data[dataKey];
  const { show, hide } = useTooltip();

  if (!seriesData) return null;

  const barRef = useD3GroupTransition<SVGGElement>({
    before: (sel) => sel.attr("opacity", 0),
    apply: (t) => t.attr("opacity", 1),
    deps: [seriesData, variant, orientation],
  });

  const categories = Array.from(new Set(allPoints.map((d) => d.x.toString())));

  // Spread bars
  if (variant === "spread" && groupScale) {
    return (
      <g ref={barRef}>
        {seriesData.data.map((d, i) => {
          const category = d.x.toString();

          if (orientation === "vertical") {
            const x = xScale(category);
            if (x == null) return null;
            const barX = x + groupScale(dataKey)!;
            const barY = yScale(d.y);
            const barHeight = height - margin.bottom - barY;
            const barWidth = groupScale.bandwidth();

            return (
              <g
                key={i}
                onMouseEnter={(e) =>
                  show(
                    {
                      title: seriesData.label,
                      color: seriesData.color,
                      content: `x: ${d.x}\ny: ${d.y}`,
                    },
                    e
                  )
                }
                onMouseLeave={hide}
                className="cursor-pointer hover:opacity-80"
              >
                <rect
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={seriesData.color}
                />
                {label && (
                  <Label
                    x={barX + barWidth / 2}
                    y={barY}
                    value={d.y}
                    color={seriesData.color}
                    formatter={label.labelFormatter}
                    variant={label.variant || "text"}
                    className={label.className}
                  />
                )}
              </g>
            );
          } else {
            // Horizontal
            const y = yScale(category);
            if (y == null) return null;
            const barY = y + groupScale(dataKey)!;
            const barHeight = groupScale.bandwidth();
            const barX = margin.left;
            const barWidth = xScale(d.y);

            return (
              <g
                key={i}
                onMouseEnter={(e) =>
                  show(
                    {
                      title: seriesData.label,
                      color: seriesData.color,
                      content: `x: ${d.x}\ny: ${d.y}`,
                    },
                    e
                  )
                }
                onMouseLeave={hide}
                className="cursor-pointer hover:opacity-80"
              >
                <rect
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={seriesData.color}
                />
                {label && (
                  <Label
                    x={barX + barWidth}
                    y={barY + barHeight / 2}
                    value={d.y}
                    color={seriesData.color}
                    formatter={label.labelFormatter}
                    variant={label.variant || "text"}
                    className={label.className}
                  />
                )}
              </g>
            );
          }
        })}
      </g>
    );
  }

  // Stacked bars
  if (variant === "stacked" && stackedData) {
    const seriesIndex = seriesKeys.indexOf(dataKey);
    if (seriesIndex === -1) return null;
    const series = stackedData[seriesIndex];

    return (
      <g ref={barRef}>
        {series.map((d, i) => {
          const category = categories[i];
          if (orientation === "vertical") {
            const x = xScale(category);
            if (x == null) return null;
            const barY = yScale(d[1]);
            const barHeight = yScale(d[0]) - yScale(d[1]);
            const barWidth = xScale.bandwidth();

            return (
              <g
                key={i}
                onMouseEnter={(e) =>
                  show(
                    {
                      title: seriesData.label,
                      color: seriesData.color,
                      content: `x: ${category}\ny: ${d[1] - d[0]}`,
                    },
                    e
                  )
                }
                onMouseLeave={hide}
                className="cursor-pointer hover:opacity-80"
              >
                <rect
                  x={x}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={seriesData.color}
                />
                {label && (
                  <Label
                    x={x + barWidth / 2}
                    y={barY}
                    value={d[1] - d[0]}
                    color={seriesData.color}
                    formatter={label.labelFormatter}
                    variant={label.variant || "text"}
                    className={label.className}
                  />
                )}
              </g>
            );
          } else {
            // Horizontal stacked
            const y = yScale(category);
            if (y == null) return null;
            const barX = xScale(d[0]);
            const barWidth = xScale(d[1]) - xScale(d[0]);
            const barHeight = yScale.bandwidth();

            return (
              <g
                key={i}
                onMouseEnter={(e) =>
                  show(
                    {
                      title: seriesData.label,
                      color: seriesData.color,
                      content: `x: ${category}\ny: ${d[1] - d[0]}`,
                    },
                    e
                  )
                }
                onMouseLeave={hide}
                className="cursor-pointer hover:opacity-80"
              >
                <rect
                  x={barX}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={seriesData.color}
                />
                {label && (
                  <Label
                    x={barX + barWidth}
                    y={y + barHeight / 2}
                    value={d[1] - d[0]}
                    color={seriesData.color}
                    formatter={label.labelFormatter}
                    variant={label.variant || "text"}
                    className={label.className}
                  />
                )}
              </g>
            );
          }
        })}
      </g>
    );
  }

  return null;
};

// Axes
const ChartXAxis = ({ tickFormat }: { tickFormat?: (d: any) => string }) => {
  const { xScale, yScale, height, margin, orientation } = useBarChart();
  return (
    <Axis
      scale={orientation === "vertical" ? xScale : yScale}
      orient={orientation === "vertical" ? "bottom" : "left"}
      transform={
        orientation === "vertical"
          ? `translate(0,${height - margin.bottom})`
          : `translate(${margin.left},0)`
      }
      tickFormat={tickFormat}
    />
  );
};

const ChartYAxis = ({ tickFormat }: { tickFormat?: (d: any) => string }) => {
  const { yScale, xScale, height, margin, orientation } = useBarChart();
  return (
    <Axis
      scale={orientation === "vertical" ? yScale : xScale}
      orient={orientation === "vertical" ? "left" : "bottom"}
      transform={
        orientation === "vertical"
          ? `translate(${margin.left},0)`
          : `translate(0,${height - margin.bottom})`
      }
      tickFormat={tickFormat}
    />
  );
};

// Legend
const ChartLegend = ({
  className,
  itemClassName,
}: {
  className?: string;
  itemClassName?: string;
}) => {
  const { data } = useBarChart();
  return (
    <Legend
      className={className}
      itemClassName={itemClassName}
      items={Object.entries(data).map(([_, { label, color }]) => ({
        label,
        color,
      }))}
    />
  );
};

// Export
const BarChart = {
  Container,
  Bar,
  XAxis: ChartXAxis,
  YAxis: ChartYAxis,
  Legend: ChartLegend,
};

export default BarChart;
