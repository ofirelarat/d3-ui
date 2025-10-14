"use client";
import * as d3 from "d3";
import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { Legend } from "./primitives/Legend";
import { TooltipProvider, useTooltip } from "./primitives/Tooltip";

type TreemapNode = {
  name: string;
  value?: number;
  color?: string;
  children?: TreemapNode[];
};

interface ContainerProps {
  data: TreemapNode;
  width?: number;
  height?: number;
  children: ReactNode;
}

interface TileProps {
  colorScale?: d3.ScaleSequential<string>;
}

type TreemapContextType = {
  data: TreemapNode;
  width: number;
  height: number;
};

const TreemapContext = createContext<TreemapContextType | null>(null);

const useTreemap = () => {
  const context = useContext(TreemapContext);
  if (!context) {
    throw new Error(
      "Treemap components must be used within a Treemap.Container"
    );
  }
  return context;
};

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
    <TreemapContext.Provider value={contextValue}>
      <TooltipProvider>
        <div className="flex flex-col items-center gap-4">
          <svg width={width} height={height} className="overflow-visible">
            {svgChildren}
          </svg>
          {otherChildren}
        </div>
      </TooltipProvider>
    </TreemapContext.Provider>
  );
};

const Tile = ({ colorScale }: TileProps) => {
  const { data, width, height } = useTreemap();
  const { show, hide } = useTooltip();

  const root = d3
    .hierarchy<TreemapNode>(data)
    .sum((d) => d.value || 0)
    .sort((a, b) => (b.value || 0) - (a.value || 0));

  const treemapLayout = d3
    .treemap<TreemapNode>()
    .size([width, height])
    .padding(2);
  const treemapRoot = treemapLayout(root);

  const nodes = treemapRoot.leaves();

  const color =
    colorScale ||
    d3.scaleSequential(d3.interpolateSpectral).domain([0, treemapRoot.height]);

  return (
    <g>
      {nodes.map((node, i) => {
        const fillColor = node.data.color || color(node.depth);
        return (
          <g key={i} transform={`translate(${node.x0}, ${node.y0})`}>
            <rect
              width={node.x1 - node.x0}
              height={node.y1 - node.y0}
              fill={fillColor}
              stroke="#fff"
              onMouseEnter={(e) =>
                show(
                  {
                    title: node.data.name,
                    color: fillColor,
                    content: `Value: ${
                      node.data.value?.toLocaleString() ?? "—"
                    }`,
                  },
                  e
                )
              }
              onMouseLeave={hide}
              className="cursor-pointer transition-all hover:opacity-75"
            />
            {node.x1 - node.x0 > 40 && node.y1 - node.y0 > 20 && (
              <text
                x={(node.x1 - node.x0) / 2}
                y={(node.y1 - node.y0) / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={10}
                fill="white"
                className="pointer-events-none select-none"
              >
                {node.data.name}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
};

// Legend
const ChartLegend = () => {
  const { data } = useTreemap();

  const flatten = (node: TreemapNode): { label: string; color: string }[] => {
    if (!node.children)
      return [{ label: node.name, color: node.color || "#999" }];
    return node.children.flatMap(flatten);
  };

  const items = flatten(data);
  return <Legend items={items} />;
};

const Treemap = {
  Container,
  Tile,
  Legend: ChartLegend,
};

export default Treemap;
