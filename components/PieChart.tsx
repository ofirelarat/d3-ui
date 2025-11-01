"use client";
import * as d3 from "d3";
import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { Legend } from "./primitives/Legend";
import { TooltipProvider, useTooltip } from "./primitives/Tooltip";
import { Label, LabelProps } from "./primitives/Label";
import { useD3GroupTransition } from "./hooks/useGroupTransition";

// Types
type PieData = {
  [key: string]: {
    value: number;
    color: string;
    label: string;
  };
};

interface ContainerProps {
  data: PieData;
  width?: number;
  height?: number;
  innerRadius?: number; // 👈 added for donut
  children: ReactNode;
}

type PieDataEntry = [string, { value: number; color: string; label: string }];
type PieChartContext = {
  data: PieData;
  width: number;
  height: number;
  radius: number;
  innerRadius: number;
  centerX: number;
  centerY: number;
  pieData: d3.PieArcDatum<PieDataEntry>[];
};

const PieChartContext = createContext<PieChartContext | null>(null);

const usePieChart = () => {
  const context = useContext(PieChartContext);
  if (!context) {
    throw new Error("Pie chart components must be used within a Pie.Container");
  }
  return context;
};

// Container
const Container = ({
  data,
  width = 400,
  height = 400,
  innerRadius = 0,
  children,
}: ContainerProps) => {
  const radius = Math.min(width, height) / 2 - 40;
  const centerX = width / 2;
  const centerY = height / 2;

  const pieData = useMemo(() => {
    const pie = d3
      .pie<PieDataEntry>()
      .value((d) => d[1].value)
      .sort(null);
    return pie(Object.entries(data));
  }, [data]);

  const contextValue: PieChartContext = {
    data,
    width,
    height,
    radius,
    innerRadius,
    centerX,
    centerY,
    pieData,
  };

  const { svgChildren, otherChildren } = React.Children.toArray(
    children
  ).reduce(
    (acc, child) => {
      if (React.isValidElement(child)) {
        if (child.type === ChartLegend || child.type === CenterLabel) {
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
    <PieChartContext.Provider value={contextValue}>
      <TooltipProvider>
        <div className="flex flex-col items-center gap-4">
          <svg
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            <g transform={`translate(${centerX},${centerY})`}>{svgChildren}</g>
          </svg>
          {otherChildren}
        </div>
      </TooltipProvider>
    </PieChartContext.Provider>
  );
};

// Slice
interface SliceProps {
  label?: {
    labelFormatter?: (value: any) => React.ReactNode;
    variant?: LabelProps["variant"];
    className?: string;
  };
}

const Slice = ({ label }: SliceProps) => {
  const { pieData, radius, innerRadius } = usePieChart();

  const arcGenerator = d3
    .arc<any>()
    .innerRadius(innerRadius)
    .outerRadius(radius);

  const pathRef = useD3GroupTransition<SVGPathElement>({
    before: (sel) =>
      sel.attr("d", function (this: SVGPathElement) {
        const startAngle = parseFloat(this.dataset.startAngle || "0");
        return arcGenerator({ startAngle, endAngle: startAngle, padAngle: 0 });
      }),
    apply: (t) =>
      t.attrTween("d", function (this: SVGPathElement) {
        const startAngle = parseFloat(this.dataset.startAngle || "0");
        const endAngle = parseFloat(this.dataset.endAngle || "0");
        const interpolate = d3.interpolate(
          { startAngle, endAngle: startAngle, padAngle: 0 },
          { startAngle, endAngle, padAngle: 0 }
        );
        return (t: number) => arcGenerator(interpolate(t))!;
      }),
    deps: [pieData, radius, innerRadius],
  });

  return (
    <g ref={pathRef}>
      {pieData.map((slice, i) => {
        const { show, hide } = useTooltip();
        const centroid = arcGenerator.centroid(slice);
        const percentage = (
          ((slice.endAngle - slice.startAngle) / (2 * Math.PI)) *
          100
        ).toFixed(1);

        return (
          <g
            key={i}
            onMouseEnter={(e: React.MouseEvent) =>
              show(
                {
                  title: slice.data[1].label,
                  color: slice.data[1].color,
                  content: `Value: ${slice.data[1].value.toLocaleString()}\nPercentage: ${percentage}%`,
                },
                e
              )
            }
            onMouseLeave={hide}
            className="cursor-pointer transition-all hover:opacity-80"
          >
            <path
              fill={slice.data[1].color}
              data-start-angle={slice.startAngle}
              data-end-angle={slice.endAngle}
            />
            {label && (
              <Label
                x={centroid[0]}
                y={centroid[1]}
                color={slice.data[1].color}
                value={slice.data[1].value}
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
};

// Center Label
interface CenterLabelProps {
  children: ReactNode;
  className?: string;
}
const CenterLabel = ({ children, className }: CenterLabelProps) => {
  const { centerX, centerY } = usePieChart();
  return (
    <div
      style={{
        position: "absolute",
        left: centerX,
        top: centerY,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}
      className={className}
    >
      {children}
    </div>
  );
};

// Legend
const ChartLegend = () => {
  const { data } = usePieChart();
  return (
    <Legend
      items={Object.entries(data).map(([key, { color, label }]) => ({
        label,
        color,
      }))}
    />
  );
};

// Export compound component
const PieChart = {
  Container,
  Slice,
  Legend: ChartLegend,
  CenterLabel,
};

export default PieChart;
