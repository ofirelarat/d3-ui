"use client";
import * as d3 from "d3";
import { Tooltip } from "./primitives/Tooltip";

interface HeatmapProps {
  data: number[][];
  width?: number;
  height?: number;
}

export default function Heatmap({
  data,
  width = 400,
  height = 400,
}: HeatmapProps) {
  const rows = data.length;
  const cols = data[0]?.length || 0;
  const cellWidth = width / cols;
  const cellHeight = height / rows;
  const colorScale = d3
    .scaleSequential(d3.interpolateBlues)
    .domain([0, d3.max(data.flat()) || 1]);

  return (
    <Tooltip>
      {({ show, hide }) => (
        <svg width={width} height={height}>
          {data.map((row, i) =>
            row.map((value, j) => (
              <rect
                key={`${i}-${j}`}
                x={j * cellWidth}
                y={i * cellHeight}
                width={cellWidth}
                height={cellHeight}
                fill={colorScale(value)}
                onMouseEnter={(e) =>
                  show(
                    {
                        title: `Value: ${value.toLocaleString()}`,
                      content: `Row: ${i + 1}\nCol: ${j + 1}`,
                    },
                    e
                  )
                }
                onMouseLeave={hide}
                className="cursor-pointer transition-all hover:r-[6]"
              />
            ))
          )}
        </svg>
      )}
    </Tooltip>
  );
}
