"use client";
import * as d3 from "d3";
import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { Axis } from "./primitives/Axis";
import { Legend } from "./primitives/Legend";
import { TooltipProvider, useTooltip } from "./primitives/Tooltip";

// Types
type DataPoint = { x: number; y: number };
type ScatterData = {
  [key: string]: {
    data: DataPoint[];
    color: string;
    label: string;
  };
};

interface ContainerProps {
  data: ScatterData;
  width?: number;
  height?: number;
  children: ReactNode;
}

interface DotsProps {
  dataKey: string;
}

// Context
type ScatterPlotContext = {
  data: ScatterData;
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
  xScale: d3.ScaleLinear<number, number>;
  yScale: d3.ScaleLinear<number, number>;
};

const ScatterPlotContext = createContext<ScatterPlotContext | null>(null);

const useScatterPlot = () => {
  const context = useContext(ScatterPlotContext);
  if (!context) {
    throw new Error("Scatter plot components must be used within a ScatterPlot.Container");
  }
  return context;
};

// Components
const Container = ({
  data,
  width = 400,
  height = 300,
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
  const { svgChildren, otherChildren } = React.Children.toArray(children).reduce(
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
    { svgChildren: [], otherChildren: [] } as { svgChildren: React.ReactNode[], otherChildren: React.ReactNode[] }
  );

  return (
    <ScatterPlotContext.Provider value={contextValue}>
      <TooltipProvider>
        <div className="flex flex-col items-center gap-4">
          <svg 
            width={width} 
            height={height}
            className="overflow-visible"
          >
            {svgChildren}
          </svg>
          {otherChildren}
        </div>
      </TooltipProvider>
    </ScatterPlotContext.Provider>
  );
};

const Dots = ({ dataKey }: DotsProps) => {
  const { data, xScale, yScale } = useScatterPlot();
  const seriesData = data[dataKey];
  const { show, hide } = useTooltip();

  if (!seriesData) {
    console.warn(`No data found for key: ${dataKey}`);
    return null;
  }

  return (
    <g>
      {seriesData.data.map((d, i) => (
        <circle
          key={i}
          cx={xScale(d.x)}
          cy={yScale(d.y)}
          r={5}
          fill={seriesData.color}
          onMouseEnter={(e) =>
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
        />
      ))}
    </g>
  );
};

const ChartXAxis = () => {
  const { xScale, height, margin } = useScatterPlot();
  return (
    <Axis
      scale={xScale}
      orient="bottom"
      transform={`translate(0,${height - margin.bottom})`}
    />
  );
};

const ChartYAxis = () => {
  const { yScale, margin } = useScatterPlot();
  return (
    <Axis
      scale={yScale}
      orient="left"
      transform={`translate(${margin.left},0)`}
    />
  );
};

const ChartLegend = () => {
  const { data } = useScatterPlot();
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
const ScatterPlot = {
  Container,
  Dots,
  XAxis: ChartXAxis,
  YAxis: ChartYAxis,
  Legend: ChartLegend,
};

export default ScatterPlot;
