"use client";
import * as d3 from "d3";
import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { Legend } from "./primitives/Legend";
import { TooltipProvider } from "./primitives/Tooltip";
import { useD3Transition } from "./hooks/useTransition";
import { Label } from "./primitives/Label";

// ---- Types ----
export interface GaugeData {
  label: string;
  value: number;
  color: string;
}

interface ContainerProps {
  data: GaugeData[];
  min?: number;
  max?: number;
  width?: number;
  height?: number;
  children: ReactNode;
}

interface GaugeContext {
  data: GaugeData[];
  min: number;
  max: number;
  width: number;
  height: number;
  radius: number;
  arcGenerator: d3.Arc<any, d3.DefaultArcObject>;
  angleScale: d3.ScaleLinear<number, number>;
}

const GaugeChartContext = createContext<GaugeContext | null>(null);

const useGaugeChart = () => {
  const ctx = useContext(GaugeChartContext);
  if (!ctx)
    throw new Error(
      "GaugeChart components must be used within a GaugeChart.Container"
    );
  return ctx;
};

// ---- Container ----
const Container = ({
  data,
  min = 0,
  max = 100,
  width = 300,
  height = 200,
  children,
}: ContainerProps) => {
  const radius = Math.min(width, height * 2) / 2 - 10;

  const angleScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([min, max])
        .range([-Math.PI / 2, Math.PI / 2]),
    [min, max]
  );

  const arcGenerator = d3
    .arc<d3.DefaultArcObject>()
    .innerRadius(radius * 0.7)
    .outerRadius(radius * 0.9);

  const ctx: GaugeContext = {
    data,
    min,
    max,
    width,
    height,
    radius,
    arcGenerator,
    angleScale,
  };

  const { svgChildren, otherChildren } = React.Children.toArray(
    children
  ).reduce(
    (acc, child) => {
      if (React.isValidElement(child)) {
        if (child.type === GaugeLegend) acc.otherChildren.push(child);
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
    <GaugeChartContext.Provider value={ctx}>
      <TooltipProvider>
        <div className="flex flex-col items-center gap-4">
          <svg width={width} height={height} className="overflow-visible">
            <g transform={`translate(${width / 2}, ${height})`}>
              {svgChildren}
            </g>
          </svg>
          {otherChildren}
        </div>
      </TooltipProvider>
    </GaugeChartContext.Provider>
  );
};

// ---- Arc ----
interface ArcProps {
  backgroundColor?: string;
}

const Arc = ({ backgroundColor = "#eee" }: ArcProps) => {
  const { data, arcGenerator, angleScale, radius } = useGaugeChart();
  const arcRef = useD3Transition<SVGPathElement>({
    before: (sel) => sel.attr("fill-opacity", 0),
    apply: (t) => t.attr("fill-opacity", 1),
    deps: [data],
  });

  const totalValue = data.reduce((sum, d) => sum + d.value, 0);
  const segments = data.map((d, i, arr) => {
    const prevSum = arr.slice(0, i).reduce((s, v) => s + v.value, 0);
    const startValue = prevSum;
    const endValue = prevSum + d.value;
    return {
      ...d,
      startAngle: angleScale((startValue / totalValue) * 100),
      endAngle: angleScale((endValue / totalValue) * 100),
    };
  });

  return (
    <g>
      <path
        d={
          arcGenerator({
            innerRadius: radius * 0.7,
            outerRadius: radius * 0.9,
            startAngle: angleScale(0),
            endAngle: angleScale(100),
          })!
        }
        fill={backgroundColor}
      />
      {segments.map((s, i) => (
        <path
          key={i}
          ref={arcRef}
          d={
            arcGenerator({
              innerRadius: radius * 0.7,
              outerRadius: radius * 0.9,
              startAngle: s.startAngle,
              endAngle: s.endAngle,
            })!
          }
          fill={s.color}
        />
      ))}
    </g>
  );
};

interface NeedleProps {
  value: number;
  color?: string;
}

const Needle = ({ value, color = "black" }: NeedleProps) => {
  const { angleScale, radius } = useGaugeChart();
  const angle = angleScale(value);
  const needleRef = useD3Transition<SVGLineElement>({
    apply: (t) => t.attr("transform", `rotate(${(angle * 180) / Math.PI})`),
    deps: [value],
  });

  return (
    <g ref={needleRef}>
      <line
        x1={0}
        y1={0}
        x2={0}
        y2={-radius * 0.9}
        stroke={color}
        strokeWidth={3}
      />
      <circle r={5} fill={color} />
    </g>
  );
};

interface GaugeLabelProps {
  value: number;
  formatter?: (v: number) => string;
  color?: string;
}

const GaugeLabel = ({ value, formatter, color = "#333" }: GaugeLabelProps) => {
  return (
    <Label
      x={-5}
      y={-10}
      value={value}
      variant="text"
      color={color}
      className="text-[18px] font-bold text-center"
      formatter={formatter}
    />
  );
};

// ---- Legend ----
const GaugeLegend = () => {
  const { data } = useGaugeChart();
  return (
    <Legend items={data.map((d) => ({ label: d.label, color: d.color }))} />
  );
};

// ---- Export Compound ----
const GaugeChart = {
  Container,
  Arc,
  Needle,
  Label: GaugeLabel,
  Legend: GaugeLegend,
};

export default GaugeChart;
