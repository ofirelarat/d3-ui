"use client";
import * as d3 from "d3";
import React, {
  createContext,
  useContext,
  useMemo,
  ReactNode,
  useRef,
} from "react";
import { Legend } from "./primitives/Legend";
import { TooltipProvider, useTooltip } from "./primitives/Tooltip";
import { Label, LabelProps } from "./primitives/Label";
import { useD3Transition } from "./hooks/useTransition";
import { useD3GroupTransition } from "./hooks/useGroupTransition";

// ---- Types ----
interface NodeData {
  name: string;
  value?: number;
  color?: string;
  children?: NodeData[];
}

interface TreemapData {
  name: string;
  children: NodeData[];
}

interface ContainerProps {
  data: TreemapData;
  width?: number;
  height?: number;
  children: ReactNode;
}

interface TileProps {
  label?: {
    labelFormatter?: (value: any) => React.ReactNode;
    variant?: LabelProps["variant"];
    className?: string;
  };
}

// ---- Context ----
type TreemapContext = {
  root: d3.HierarchyNode<NodeData>;
  treemapLayout: d3.TreemapLayout<NodeData>;
  width: number;
  height: number;
  originalData: TreemapData; // <-- keep original data for legend
};

const TreemapContext = createContext<TreemapContext | null>(null);

const useTreemap = () => {
  const context = useContext(TreemapContext);
  if (!context) {
    throw new Error("Treemap components must be used within Treemap.Container");
  }
  return context;
};

// ---- Components ----

const Container = ({
  data,
  width = 500,
  height = 400,
  children,
}: ContainerProps) => {
  const root = useMemo(() => {
    const hierarchy = d3
      .hierarchy<NodeData>(data)
      .sum((d) => d.value || 0)
      .sort((a, b) => (b.value || 0) - (a.value || 0));
    return hierarchy;
  }, [data]);

  const treemapLayout = useMemo(
    () => d3.treemap<NodeData>().size([width, height]).padding(2).round(true),
    [width, height]
  );

  const contextValue = useMemo(
    () => ({ root, treemapLayout, width, height, originalData: data }),
    [root, treemapLayout, width, height, data]
  );

  // Separate Legend from SVG children
  const { svgChildren, otherChildren } = React.Children.toArray(
    children
  ).reduce(
    (acc, child) => {
      if (React.isValidElement(child)) {
        if (child.type === TreemapLegend) acc.otherChildren.push(child);
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

const Tile = ({ label }: TileProps) => {
  const { root, treemapLayout } = useTreemap();
  const { show, hide } = useTooltip();

  const treemapData = treemapLayout(root);

  const groupRef = useD3GroupTransition<SVGRectElement>({
    before: (sel) => sel.attr("opacity", 0),
    apply: (t) => t.attr("opacity", 1),
    deps: [treemapData],
  });

  return (
    <g ref={groupRef}>
      {treemapData.leaves().map((leaf, i) => {
        // Walk up hierarchy to find nearest color
        let node: d3.HierarchyNode<NodeData> | null = leaf;
        let color: string | undefined;
        while (node && !color) {
          color = node.data.color;
          node = node.parent;
        }

        return (
          <g
            transform={`translate(${leaf.x0}, ${leaf.y0})`}
            key={i}
            x={leaf.x0}
            y={leaf.y0}
            onMouseEnter={(e) =>
              show(
                {
                  title: leaf.data.name,
                  color: color || "#ccc",
                  content: `Value: ${leaf.value?.toLocaleString()}`,
                },
                e
              )
            }
            onMouseLeave={hide}
            className="cursor-pointer transition-all hover:opacity-75"
          >
            <rect
              width={leaf.x1 - leaf.x0}
              height={leaf.y1 - leaf.y0}
              fill={color || "#ccc"}
              stroke="#fff"
            />
            <Label
              x={10}
              y={20}
              color={color}
              value={`${leaf.data.name} - ${leaf.value?.toLocaleString()}`}
              formatter={label?.labelFormatter}
              className={label?.className}
              variant={label?.variant || "text"}
            />
          </g>
        );
      })}
    </g>
  );
};

const TreemapLegend = () => {
  const { originalData } = useTreemap();

  // ✅ Use the *original* top-level data, not the processed hierarchy
  const legendItems =
    originalData.children?.map((child) => ({
      label: child.name,
      color: child.color || "#ccc",
    })) || [];

  return <Legend items={legendItems} />;
};

// ---- Export Compound Component ----
const Treemap = {
  Container,
  Tile,
  Legend: TreemapLegend,
};

export default Treemap;
