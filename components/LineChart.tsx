"use client";
import * as d3 from "d3";
import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { Axis } from "./primitives/Axis";
import { Legend } from "./primitives/Legend";
import { TooltipProvider, useTooltip } from "./primitives/Tooltip";
import { Label, LabelProps } from "./primitives/Label";

// Types
type DataPoint = { x: number; y: number };
type LineData = {
  [key: string]: {
    data: DataPoint[];
    color: string;
    label: string;
  };
};

interface ContainerProps {
  data: LineData;
  width?: number;
  height?: number;
  children: ReactNode;
}

interface LineProps {
  dataKey: string;
}

// Context
type LineChartContext = {
  data: LineData;
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
  xScale: d3.ScaleLinear<number, number>;
  yScale: d3.ScaleLinear<number, number>;
};

const LineChartContext = createContext<LineChartContext | null>(null);

const useLineChart = () => {
  const context = useContext(LineChartContext);
  if (!context) {
    throw new Error(
      "Line chart components must be used within a Line.Container"
    );
  }
  return context;
};

// Components
const Container = ({
  data,
  width = 400,
  height = 200,
  children,
}: ContainerProps) => {
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  const allPoints = Object.values(data).flatMap((series) => series.data);

  const scales = useMemo(() => {
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(allPoints, (d) => d.x) as [number, number])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(allPoints, (d) => d.y)!])
      .nice()
      .range([height - margin.bottom, margin.top]);

    return { xScale, yScale };
  }, [allPoints, width, height, margin]);

  const contextValue = {
    data,
    width,
    height,
    margin,
    ...scales,
  };

  // Split children into SVG elements and non-SVG elements (like Legend)
  const { svgChildren, otherChildren } = React.Children.toArray(
    children
  ).reduce(
    (acc, child) => {
      if (React.isValidElement(child)) {
        if (child.type === ChartLegend) {
          acc.otherChildren.push(child);
        } else {
          acc.svgChildren.push(child);
        }
      }
      return acc;
    },
    { svgChildren: [], otherChildren: [] } as {
      svgChildren: React.ReactNode[];
      otherChildren: React.ReactNode[];
    }
  );

  return (
    <LineChartContext.Provider value={contextValue}>
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
    </LineChartContext.Provider>
  );
};

interface LineProps {
  dataKey: string;
  label?: {
    labelFormatter?: (value: any) => React.ReactNode;
    variant?: LabelProps["variant"];
    className?: string;
  };
}

const Line = ({ dataKey, label }: LineProps) => {
  const { data, xScale, yScale } = useLineChart();
  const seriesData = data[dataKey];

  if (!seriesData) {
    console.warn(`No data found for key: ${dataKey}`);
    return null;
  }

  const line = d3
    .line<DataPoint>()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y));

  return (
    <g>
      <path
        d={line(seriesData.data) || ""}
        fill="none"
        stroke={seriesData.color}
        strokeWidth={2}
      />
      <g>
        {seriesData.data.map((d, i) => {
          const { show, hide } = useTooltip();
          return (
            <g
              key={i}
              onMouseEnter={(e: React.MouseEvent) =>
                show(
                  {
                    title: seriesData.label,
                    color: seriesData.color,
                    content: `x: ${d.x.toLocaleString()}\ny: ${d.y.toLocaleString()}`,
                  },
                  e
                )
              }
              onMouseLeave={hide}
              className="cursor-pointer transition-all hover:r-6"
            >
              <Label
                x={xScale(d.x)}
                y={yScale(d.y)}
                color={seriesData.color}
                value={d.y}
                formatter={label?.labelFormatter}
                className={label?.className}
                variant={label?.variant || "circle"}
              />
            </g>
          );
        })}
      </g>
    </g>
  );
};

const ChartXAxis = () => {
  const { xScale, height, margin } = useLineChart();
  return (
    <Axis
      scale={xScale}
      orient="bottom"
      transform={`translate(0,${height - margin.bottom})`}
    />
  );
};

const ChartYAxis = () => {
  const { yScale, margin } = useLineChart();
  return (
    <Axis
      scale={yScale}
      orient="left"
      transform={`translate(${margin.left},0)`}
    />
  );
};

const ChartLegend = () => {
  const { data } = useLineChart();
  return (
    <Legend
      items={Object.entries(data).map(([key, { color, label }]) => ({
        label,
        color,
      }))}
    />
  );
};

// Export as compound component
const LineChart = {
  Container,
  Line,
  XAxis: ChartXAxis,
  YAxis: ChartYAxis,
  Legend: ChartLegend,
};

export default LineChart;
