"use client";
import * as d3 from "d3";
import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { Axis } from "./primitives/Axis";
import { Legend } from "./primitives/Legend";
import { TooltipProvider, useTooltip } from "./primitives/Tooltip";
import { Label, LabelProps } from "./primitives/Label";
import { useD3Transition } from "./hooks/useTransition";

// Types
type DataPoint = { x: number; y: number };
type AreaData = {
  [key: string]: {
    data: DataPoint[];
    color: string;
    label: string;
  };
};

interface ContainerProps {
  data: AreaData;
  width?: number;
  height?: number;
  children: ReactNode;
  variant?: "spread" | "stacked"; // 👈 Added variant
}

// Context
type AreaChartContext = {
  data: AreaData;
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
  xScale: d3.ScaleLinear<number, number>;
  yScale: d3.ScaleLinear<number, number>;
  variant: "spread" | "stacked"; // 👈 Added variant to context
};

const AreaChartContext = createContext<AreaChartContext | null>(null);

const useAreaChart = () => {
  const context = useContext(AreaChartContext);
  if (!context) {
    throw new Error(
      "Area chart components must be used within an Area.Container"
    );
  }
  return context;
};

// Components
const Container = ({
  data,
  width = 400,
  height = 200,
  variant = "spread", // 👈 Default variant
  children,
}: ContainerProps) => {
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  const allPoints = Object.values(data).flatMap((series) => series.data);
  const allXValues = Array.from(new Set(allPoints.map((d) => d.x))).sort(
    (a, b) => a - b
  );

  // If stacked, we need to compute cumulative Y values
  const stackedData = useMemo(() => {
    if (variant !== "stacked") return null;

    const keys = Object.keys(data);
    const stacked = d3
      .stack<DataPoint>()
      .keys(keys)
      .value((_, key) => {
        const series = data[key];
        return series.data.find((d) => d.x === _.x)?.y ?? 0;
      });

    // Build data array with all x values
    const base = allXValues.map((x) => {
      const entry: any = { x };
      keys.forEach((key) => {
        entry[key] = data[key].data.find((d) => d.x === x)?.y ?? 0;
      });
      return entry;
    });

    return stacked(base);
  }, [variant, data, allXValues]);

  const maxY = useMemo(() => {
    if (variant === "stacked" && stackedData) {
      return d3.max(stackedData[stackedData.length - 1], (d) => d[1])!;
    }
    return d3.max(allPoints, (d) => d.y)!;
  }, [variant, stackedData, allPoints]);

  const scales = useMemo(() => {
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(allXValues) as [number, number])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, maxY])
      .nice()
      .range([height - margin.bottom, margin.top]);

    return { xScale, yScale };
  }, [allXValues, width, height, margin, maxY]);

  const contextValue = {
    data,
    width,
    height,
    margin,
    variant,
    ...scales,
  };

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
    <AreaChartContext.Provider value={contextValue}>
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
    </AreaChartContext.Provider>
  );
};

interface AreaProps {
  dataKey: string;
  label?: {
    labelFormatter?: (value: any) => React.ReactNode;
    variant?: LabelProps["variant"];
    className?: string;
  };
}

const Area = ({ dataKey, label }: AreaProps) => {
  const { data, xScale, yScale, height, margin, variant } = useAreaChart();
  const seriesData = data[dataKey];

  if (!seriesData) {
    console.warn(`No data found for key: ${dataKey}`);
    return null;
  }

  let pathData: string | null = null;
  let stackedSeries = null;

  if (variant === "stacked") {
    const keys = Object.keys(data);
    const index = keys.indexOf(dataKey);

    const baseData = Array.from(new Set(seriesData.data.map((d) => d.x))).map(
      (x) => {
        const entry: Record<string, number> & { x: number } = { x };
        keys.forEach((key) => {
          entry[key] = data[key].data.find((d) => d.x === x)?.y ?? 0;
        });
        return entry;
      }
    );

    const stackGen = d3.stack<Record<string, number>>().keys(keys);
    const stacked = stackGen(baseData);
    stackedSeries = stacked[index];

    const areaGenerator = d3
      .area<d3.SeriesPoint<Record<string, number>>>()
      .x((d) => xScale(d.data.x))
      .y0((d) => yScale(d[0]))
      .y1((d) => yScale(d[1]));

    pathData = areaGenerator(stackedSeries) || "";
  } else {
    const areaGenerator = d3
      .area<DataPoint>()
      .x((d) => xScale(d.x))
      .y0(height - margin.bottom)
      .y1((d) => yScale(d.y));

    pathData = areaGenerator(seriesData.data) || "";
  }

  const pathRef = useD3Transition<SVGPathElement>({
    before: (sel) => sel.attr("opacity", 0),
    apply: (t) => t.attr("opacity", 0.6),
    deps: [seriesData, variant],
  });

  return (
    <g>
      <path ref={pathRef} d={pathData} fill={seriesData.color} opacity={0.6} />
      {/* Labels */}
      <g>
        {(variant === "spread"
          ? seriesData.data.map((d, i) => ({ x: d.x, y: d.y }))
          : stackedSeries!.map((d) => ({ x: d.data.x, y: d[1] }))
        ) // use y1 for stacked
          .map((point, i) => {
            const { show, hide } = useTooltip();
            return (
              <g
                key={i}
                onMouseEnter={(e: React.MouseEvent) =>
                  show(
                    {
                      title: seriesData.label,
                      color: seriesData.color,
                      content: `x: ${seriesData.data[i].x}\ny: ${seriesData.data[i].y}`,
                    },
                    e
                  )
                }
                onMouseLeave={hide}
                className="cursor-pointer transition-all hover:r-6"
              >
                <Label
                  x={xScale(point.x)}
                  y={yScale(point.y)}
                  color={seriesData.color}
                  value={seriesData.data[i].y}
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
  const { xScale, height, margin } = useAreaChart();
  return (
    <Axis
      scale={xScale}
      orient="bottom"
      transform={`translate(0,${height - margin.bottom})`}
    />
  );
};

const ChartYAxis = () => {
  const { yScale, margin } = useAreaChart();
  return (
    <Axis
      scale={yScale}
      orient="left"
      transform={`translate(${margin.left},0)`}
    />
  );
};

const ChartLegend = () => {
  const { data } = useAreaChart();
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
const AreaChart = {
  Container,
  Area,
  XAxis: ChartXAxis,
  YAxis: ChartYAxis,
  Legend: ChartLegend,
};

export default AreaChart;
