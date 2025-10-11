"use client";
import * as d3 from "d3";
import { Axis } from "./primitives/Axis";
import { Legend } from "./primitives/Legend";
import { Tooltip } from "./primitives/Tooltip";

interface LineChartProps {
  data: { x: number; y: number }[];
  width?: number;
  height?: number;
  color?: string;
}

export default function LineChart({
  data,
  width = 400,
  height = 200,
  color = "#3b82f6",
}: LineChartProps) {
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.x) as [number, number])
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.y)!])
    .nice()
    .range([height - margin.bottom, margin.top]);

  const line = d3
    .line<{ x: number; y: number }>()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y));

  return (
    <div className="relative">
      <Tooltip className="inline-block">
        {({ show, hide }) => (
          <svg width={width} height={height}>
            <path
              d={line(data) || ""}
              fill="none"
              stroke={color}
              strokeWidth={2}
            />

            {data.map((d, i) => (
              <circle
                key={i}
                cx={xScale(d.x)}
                cy={yScale(d.y)}
                r={4}
                fill={color}
                onMouseEnter={(e) => 
                  show({
                    title: "Data Point",
                    color: color,
                    content: `x: ${d.x.toLocaleString()}\ny: ${d.y.toLocaleString()}`
                  }, e)
                }
                onMouseLeave={hide}
                className="cursor-pointer transition-all hover:r-[6]"
              />
            ))}

            {/* Axes */}
            <Axis
              scale={xScale}
              orient="bottom"
              transform={`translate(0,${height - margin.bottom})`}
            />
            <Axis
              scale={yScale}
              orient="left"
              transform={`translate(${margin.left},0)`}
            />
          </svg>
        )}
      </Tooltip>

      <Legend items={[{ label: "Data Series", color }]} />
    </div>
  );
}
