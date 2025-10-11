"use client";
import * as d3 from "d3";
import { useRef, useEffect } from "react";
import { Axis } from "./primitives/Axis";
import { Tooltip } from "./primitives/Tooltip";

interface ScatterPlotProps {
  data: { x: number; y: number }[];
  width?: number;
  height?: number;
  color?: string;
}

export default function ScatterPlot({
  data,
  width = 400,
  height = 300,
  color = "#f87171",
}: ScatterPlotProps) {
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

  return (
    <Tooltip>
      {({ show, hide }) => (
        <svg width={width} height={height}>
          {data.map((d, i) => (
            <circle
              key={i}
              cx={xScale(d.x)}
              cy={yScale(d.y)}
              r={5}
              fill={color}
              onMouseEnter={(e) =>
                show(
                  {
                    title: "Data Point",
                    color: color,
                    content: `x: ${d.x.toLocaleString()}\ny: ${d.y.toLocaleString()}`,
                  },
                  e
                )
              }
              onMouseLeave={hide}
              className="cursor-pointer transition-all hover:r-[6]"
            />
          ))}
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
  );
}
