"use client";
import * as d3 from "d3";
import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { Legend } from "./primitives/Legend";
import { TooltipProvider, useTooltip } from "./primitives/Tooltip";
import { Label, LabelProps } from "./primitives/Label";

// Types
type HeatmapData = {
  [key: string]: {
    data: number[][];
    color: string;
    label: string;
  };
};

interface ContainerProps {
  data: HeatmapData;
  width?: number;
  height?: number;
  children: ReactNode;
}

interface TileProps {
  dataKey: string;
  label?: {
    labelFormatter?: (value: any) => React.ReactNode;
    variant?: LabelProps["variant"];
    className?: string;
  };
}

// Context
type HeatmapContext = {
  data: HeatmapData;
  width: number;
  height: number;
  cellDimensions: {
    width: number;
    height: number;
  };
};

const HeatmapContext = createContext<HeatmapContext | null>(null);

const useHeatmap = () => {
  const context = useContext(HeatmapContext);
  if (!context) {
    throw new Error(
      "Heatmap components must be used within a Heatmap.Container"
    );
  }
  return context;
};

// Components
const Container = ({
  data,
  width = 400,
  height = 400,
  children,
}: ContainerProps) => {
  const contextValue = useMemo(
    () => ({
      data,
      width,
      height,
      cellDimensions: { width: 0, height: 0 }, // Individual tiles will calculate their own cell dimensions
    }),
    [data, width, height]
  );

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
    <HeatmapContext.Provider value={contextValue}>
      <TooltipProvider>
        <div className="flex flex-col items-center gap-4">
          <svg width={width} height={height} className="overflow-visible">
            {svgChildren}
          </svg>
          {otherChildren}
        </div>
      </TooltipProvider>
    </HeatmapContext.Provider>
  );
};

const Tile = ({ dataKey, label }: TileProps) => {
  const { data, width, height } = useHeatmap();
  const seriesData = data[dataKey];
  const { show, hide } = useTooltip();

  if (!seriesData) return null;

  const datasetKeys = Object.keys(data);
  const totalDatasets = datasetKeys.length;

  // --- Adaptive tile sizing ---
  let tileWidth = width;
  let tileHeight = height;
  let offsetX = 0;
  let offsetY = 0;

  if (totalDatasets > 1) {
    const datasetIndex = datasetKeys.indexOf(dataKey);
    const tilesPerRow = Math.ceil(Math.sqrt(totalDatasets));
    tileWidth = width / tilesPerRow;
    tileHeight = height / Math.ceil(totalDatasets / tilesPerRow);
    offsetX = (datasetIndex % tilesPerRow) * tileWidth;
    offsetY = Math.floor(datasetIndex / tilesPerRow) * tileHeight;
  }

  const values = seriesData.data.flat();
  const min = d3.min(values) || 0;
  const max = d3.max(values) || 1;

  const colorScale = d3
    .scaleSequential()
    .interpolator((t) => {
      const adjustedT = Math.pow(t, 0.4);
      return d3.interpolate(
        d3.rgb(seriesData.color).brighter(2),
        d3.rgb(seriesData.color)
      )(adjustedT);
    })
    .domain([min, max]);

  const cellWidth = tileWidth / seriesData.data[0].length;
  const cellHeight = tileHeight / seriesData.data.length;

  return (
    <g transform={`translate(${offsetX}, ${offsetY})`}>
      {seriesData.data.map((rowArr, i) =>
        rowArr.map((value, j) => (
          <g
            key={`${i}-${j}`}
            transform={`translate(${j * cellWidth}, ${i * cellHeight})`}
            onMouseEnter={(e) =>
              show(
                {
                  title: seriesData.label,
                  color: seriesData.color,
                  content: `Value: ${value}\nRow: ${i + 1}, Col: ${j + 1}`,
                },
                e
              )
            }
            onMouseLeave={hide}
            className="cursor-pointer transition-all hover:opacity-75"
          >
            <rect width={cellWidth} height={cellHeight} fill={colorScale(value)} />
            <Label
              x={5}
              y={10}
              color={seriesData.color}
              value={value}
              variant={label?.variant || "text"}
              formatter={label?.labelFormatter}
              className={label?.className}
            />
          </g>
        ))
      )}
    </g>
  );
};


const ChartLegend = () => {
  const { data } = useHeatmap();
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
const Heatmap = {
  Container,
  Tile,
  Legend: ChartLegend,
};

export default Heatmap;
