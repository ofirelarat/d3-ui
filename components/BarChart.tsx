"use client";
import * as d3 from "d3";
import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { Axis } from "./primitives/Axis";
import { Legend } from "./primitives/Legend";
import { TooltipProvider, useTooltip } from "./primitives/Tooltip";
import { Label, LabelProps } from "./primitives/Label";
import { useD3GroupTransition } from "./hooks/useGroupTransition";

// Types
type DataPoint = { x: string | number; y: number };
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
  children: ReactNode;
}

// Context
type BarChartContext = {
  data: BarData;
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
  xScale: d3.ScaleBand<string>;
  yScale: d3.ScaleLinear<number, number>;
  variant: "spread" | "stacked";
  groupScale?: d3.ScaleBand<string> | null;
  stackedData?: d3.Series<Record<string, number>, string>[] | null;
  seriesKeys: string[];
  allPoints: DataPoint[];
};

const BarChartContext = createContext<BarChartContext | null>(null);

const useBarChart = () => {
  const context = useContext(BarChartContext);
  if (!context) {
    throw new Error("Bar chart components must be used within a Bar.Container");
  }
  return context;
};

// Container
const Container = ({
  data,
  width = 400,
  height = 200,
  variant = "spread",
  children,
}: ContainerProps) => {
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const seriesKeys = Object.keys(data);

  const allPoints = Object.values(data).flatMap((series) => series.data);
  const allCategories = Array.from(
    new Set(allPoints.map((d) => d.x.toString()))
  );

  // Scales
  const xScale = useMemo(
    () =>
      d3
        .scaleBand()
        .domain(allCategories)
        .range([margin.left, width - margin.right])
        .padding(0.1),
    [allCategories, width, margin]
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

  const yScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, yMax])
        .nice()
        .range([height - margin.bottom, margin.top]),
    [yMax, height, margin]
  );

  // Grouped (spread) scale
  const groupScale = useMemo(() => {
    if (variant === "spread") {
      return d3
        .scaleBand()
        .domain(seriesKeys)
        .range([0, xScale.bandwidth()])
        .padding(0.05);
    }
    return null;
  }, [variant, seriesKeys, xScale]);

  // Stacked layout
  const stackedData = useMemo(() => {
    if (variant !== "stacked") return null;
    const categories = Array.from(
      new Set(allPoints.map((d) => d.x.toString()))
    );
    const stackedInput = categories.map((cat) => {
      const entry: Record<string, number> = {};
      seriesKeys.forEach((key) => {
        const point = data[key].data.find((d) => d.x.toString() === cat);
        entry[key] = point ? point.y : 0;
      });
      return entry;
    });
    return d3.stack<Record<string, number>>().keys(seriesKeys)(stackedInput);
  }, [variant, data, allPoints, seriesKeys]);

  const contextValue: BarChartContext = {
    data,
    width,
    height,
    margin,
    xScale,
    yScale,
    variant,
    groupScale,
    stackedData,
    seriesKeys,
    allPoints,
  };

  // Split SVG and non-SVG children
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
    { svgChildren: [], otherChildren: [] } as {
      svgChildren: React.ReactNode[];
      otherChildren: React.ReactNode[];
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
    height,
    margin,
    variant,
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
    deps: [seriesData, variant],
  });

  // Spread (grouped) bars
  if (variant === "spread" && groupScale) {
    const barWidth = groupScale.bandwidth();
    return (
      <g ref={barRef}>
        {seriesData.data.map((d, i) => {
          const x = xScale(d.x.toString());
          if (x == null) return null;
          const barX = x + groupScale(dataKey)!;
          const barY = yScale(d.y);
          const barHeight = height - margin.bottom - barY;

          return (
            <g
              key={i}
              onMouseEnter={(e) =>
                show(
                  {
                    title: seriesData.label,
                    color: seriesData.color,
                    content: `x: ${d.x.toString()}\ny: ${d.y.toLocaleString()}`,
                  },
                  e
                )
              }
              onMouseLeave={hide}
              className="cursor-pointer transition-all hover:opacity-80"
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
                  color={seriesData.color}
                  value={d.y}
                  formatter={label.labelFormatter}
                  className={label.className}
                  variant={label.variant || "text"}
                />
              )}
            </g>
          );
        })}
      </g>
    );
  }

  // Stacked bars
  if (variant === "stacked" && stackedData) {
    const seriesIndex = seriesKeys.indexOf(dataKey);
    if (seriesIndex === -1) return null;
    const series = stackedData[seriesIndex];
    const categories = Array.from(
      new Set(allPoints.map((d) => d.x.toString()))
    );

    return (
      <g ref={barRef}>
        {series.map((d, i) => {
          const x = xScale(categories[i]);
          if (x == null) return null;
          const barY = yScale(d[1]);
          const barHeight = yScale(d[0]) - yScale(d[1]);

          return (
            <g
              key={i}
              onMouseEnter={(e) =>
                show(
                  {
                    title: seriesData.label,
                    color: seriesData.color,
                    content: `x: ${categories[i]}\ny: ${(
                      d[1] - d[0]
                    ).toLocaleString()}`,
                  },
                  e
                )
              }
              onMouseLeave={hide}
              className="cursor-pointer transition-all hover:opacity-80"
            >
              <rect
                x={x}
                y={barY}
                width={xScale.bandwidth()}
                height={barHeight}
                fill={seriesData.color}
              />
              {label && (
                <Label
                  x={x + xScale.bandwidth() / 2}
                  y={barY}
                  color={seriesData.color}
                  value={d[1] - d[0]}
                  formatter={label.labelFormatter}
                  className={label.className}
                  variant={label.variant || "text"}
                />
              )}
            </g>
          );
        })}
      </g>
    );
  }

  return null;
};

// XAxis
const ChartXAxis = () => {
  const { xScale, height, margin } = useBarChart();
  return (
    <Axis
      scale={xScale}
      orient="bottom"
      transform={`translate(0,${height - margin.bottom})`}
    />
   );
};

// YAxis
const ChartYAxis = () => {
  const { yScale, margin } = useBarChart();
  return (
    <Axis
      scale={yScale}
      orient="left"
      transform={`translate(${margin.left},0)`}
    />
  );
};

// Legend
const ChartLegend = () => {
  const { data } = useBarChart();
  return (
    <Legend
      items={Object.entries(data).map(([key, { color, label }]) => ({
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
