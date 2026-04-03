"use client";
import * as d3 from "d3";
import React, { createContext, useContext, useMemo } from "react";
import { Legend, LegendProps } from "./primitives/Legend";
import { TooltipProvider, useTooltip } from "./primitives/Tooltip";
import { Label } from "./primitives/Label";
import { useD3GroupTransition } from "./hooks/useGroupTransition";
import { ChordData, BaseContainerProps, ChartLabelProps } from "./types";

interface ContainerProps extends BaseContainerProps<ChordData> {
  innerRadius?: number;
  outerRadius?: number;
  padAngle?: number;
  directed?: boolean;
}

type ChordChartContext = {
  data: ChordData;
  width: number;
  height: number;
  innerRadius: number;
  outerRadius: number;
  centerX: number;
  centerY: number;
  chords: d3.ChordGroup[];
  ribbons: d3.Chord[];
  directed: boolean;
  colorScale: d3.ScaleOrdinal<string, string>;
  labels: string[];
  ribbonColors: Record<string, string>;
};

const ChordChartContext = createContext<ChordChartContext | null>(null);

const useChordChart = () => {
  const context = useContext(ChordChartContext);
  if (!context) {
    throw new Error("Chord chart components must be used within a Chord.Container");
  }
  return context;
};

// Container
const Container = ({
  data,
  width = 600,
  height = 600,
  innerRadius: userInnerRadius,
  outerRadius: userOuterRadius,
  padAngle = 0.04,
  directed = false,
  children,
}: ContainerProps) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) / 2 - 40;
  const outerRadius = userOuterRadius || maxRadius;
  const innerRadius = userInnerRadius || outerRadius - 15;

  const { chords, ribbons, colorScale, labels, ribbonColors } = useMemo(() => {
    // 1. Extract labels and create matrix
    const labelList = data.map((d) => d.label);
    const n = labelList.length;
    const matrix = Array.from({ length: n }, () => new Array(n).fill(0));

    const ribbonColorsMap: Record<string, string> = {};
    data.forEach((series, i) => {
      series.ribbons.forEach((ribbon) => {
        const j = labelList.indexOf(ribbon.label);
        if (j !== -1) {
          // For directed charts, each ribbon object should only represent ONE flow direction (i -> j).
          // For undirected charts, it represents both flows between i and j.
          const sVal = ribbon.value ?? ribbon.sourceValue ?? 0;
          const tVal = ribbon.targetValue ?? 0;
          
          matrix[i][j] += sVal;
          if (!directed && i !== j && tVal > 0) {
            matrix[j][i] += tVal;
          }
          
          if (ribbon.color) {
            const key = i < j ? `${i}-${j}` : `${j}-${i}`;
            ribbonColorsMap[key] = ribbon.color;
          }
        }
      });
    });

    const chordLayout = directed 
      ? d3.chordDirected().padAngle(padAngle).sortSubgroups(d3.descending)
      : d3.chord().padAngle(padAngle).sortSubgroups(d3.descending);
    
    const chordResult = chordLayout(matrix);
    
    const scale = d3.scaleOrdinal<string, string>()
      .domain(labelList)
      .range(data.map(g => g.color).filter(Boolean) as string[] || d3.schemeTableau10);

    return { 
      chords: chordResult.groups, 
      ribbons: chordResult as unknown as d3.Chord[], 
      colorScale: scale,
      labels: labelList,
      ribbonColors: ribbonColorsMap
    };
  }, [data, padAngle, directed]);

  const contextValue: ChordChartContext = {
    data,
    width,
    height,
    innerRadius,
    outerRadius,
    centerX,
    centerY,
    chords,
    ribbons,
    directed,
    colorScale,
    labels,
    ribbonColors,
  };

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
    { svgChildren: [], otherChildren: [] } as {
      svgChildren: React.ReactNode[];
      otherChildren: React.ReactNode[];
    }
  );

  return (
    <ChordChartContext.Provider value={contextValue}>
      <TooltipProvider>
        <div className="flex flex-col items-center gap-6">
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            <g transform={`translate(${centerX},${centerY})`}>{svgChildren}</g>
          </svg>
          {otherChildren}
        </div>
      </TooltipProvider>
    </ChordChartContext.Provider>
  );
};

// Groups (the outer arcs)
interface GroupsProps {
  label?: ChartLabelProps;
}

const Groups = ({ label }: GroupsProps) => {
  const { chords, innerRadius, outerRadius, colorScale, data, labels } = useChordChart();

  const arcGenerator = d3.arc<d3.ChordGroup>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const groupRef = useD3GroupTransition<SVGGElement>({
    before: (sel) => 
      sel.selectAll("path")
        .attr("d", arcGenerator as any),
    apply: (t) => 
      t.selectAll("path")
        .attrTween("d", function(this: any, d: any) {
          const current = d;
          const previous = { startAngle: current.startAngle, endAngle: current.startAngle };
          const interpolate = d3.interpolate(previous, current);
          return (t: number) => arcGenerator(interpolate(t) as any)!;
        }),
    deps: [chords, innerRadius, outerRadius],
  });

  return (
    <g ref={groupRef}>
      {chords.map((group) => {
        const { show, hide } = useTooltip();
        const groupLabel = labels[group.index];
        const groupColor = data[group.index].color;
        const color = groupColor || colorScale(groupLabel);
        const midAngle = (group.startAngle + group.endAngle) / 2;
        const labelRadius = outerRadius + 15;
        const labelX = labelRadius * Math.cos(midAngle - Math.PI / 2);
        const labelY = labelRadius * Math.sin(midAngle - Math.PI / 2);

        return (
          <g 
            key={group.index}
            onMouseEnter={(e: React.MouseEvent) =>
              show(
                {
                  title: groupLabel,
                  color,
                  content: `Total: ${group.value.toLocaleString()}`,
                },
                e
              )
            }
            onMouseLeave={hide}
            className="cursor-pointer transition-all hover:opacity-80"
          >
            <path
              fill={color}
              stroke={d3.rgb(color).darker().toString()}
            />
            {label && (
              <Label
                x={labelX}
                y={labelY}
                color={color}
                value={groupLabel}
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

// Ribbons
const Ribbons = () => {
  const { ribbons, innerRadius, colorScale, data, directed, labels, ribbonColors } = useChordChart();

  const ribbonGenerator = directed 
    ? (d3.ribbonArrow() as any).radius(innerRadius)
    : (d3.ribbon() as any).radius(innerRadius);

  const ribbonRef = useD3GroupTransition<SVGGElement>({
    before: (sel) => 
      sel.selectAll("path").style("opacity", 0),
    apply: (t) => 
      t.selectAll("path").style("opacity", 0.7),
    deps: [ribbons, innerRadius, directed],
  });

  return (
    <g ref={ribbonRef} className="ribbons">
      {ribbons.map((ribbon, i) => {
        const { show, hide } = useTooltip();
        const sIdx = ribbon.source.index;
        const tIdx = ribbon.target.index;
        const sourceLabel = labels[sIdx];
        const targetLabel = labels[tIdx];
        const colorKey = sIdx < tIdx ? `${sIdx}-${tIdx}` : `${tIdx}-${sIdx}`;
        const customColor = ribbonColors[colorKey];
        const sourceColor = customColor || colorScale(sourceLabel);
        const targetColor = customColor || colorScale(targetLabel);
        
        // Premium look with gradients
        const gradientId = `chord-gradient-${ribbon.source.index}-${ribbon.target.index}-${i}`;

        return (
          <g 
            key={i}
            onMouseEnter={(e: React.MouseEvent) => {
              const currentSeries = data[ribbon.source.index];
              const ribbonData = currentSeries.ribbons.find(r => r.label === targetLabel);
              const sourceVal = ribbonData?.value ?? ribbonData?.sourceValue ?? 0;
              
              const targetSeries = data[ribbon.target.index];
              const reverseRibbon = targetSeries.ribbons.find(r => r.label === sourceLabel);
              const targetVal = reverseRibbon?.value ?? reverseRibbon?.sourceValue ?? 0;

              show(
                {
                  title: directed ? `${sourceLabel} → ${targetLabel}` : `${sourceLabel} ↔ ${targetLabel}`,
                  content: directed 
                   ? `Flow to ${targetLabel}: ${sourceVal.toLocaleString()}`
                   : `From ${sourceLabel}: ${sourceVal.toLocaleString()}\nFrom ${targetLabel}: ${targetVal.toLocaleString()}`,
                  color: sourceColor,
                },
                e
              );
            }}
            onMouseLeave={hide}
            className="cursor-pointer transition-opacity-300"
          >
            <defs>
              <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" 
                x1={innerRadius * Math.cos((ribbon.source.startAngle + ribbon.source.endAngle) / 2 - Math.PI / 2)}
                y1={innerRadius * Math.sin((ribbon.source.startAngle + ribbon.source.endAngle) / 2 - Math.PI / 2)}
                x2={innerRadius * Math.cos((ribbon.target.startAngle + ribbon.target.endAngle) / 2 - Math.PI / 2)}
                y2={innerRadius * Math.sin((ribbon.target.startAngle + ribbon.target.endAngle) / 2 - Math.PI / 2)}>
                <stop offset="0%" stopColor={sourceColor} />
                <stop offset="100%" stopColor={targetColor} />
              </linearGradient>
            </defs>
            <path
              d={ribbonGenerator(ribbon)}
              fill={`url(#${gradientId})`}
              fillOpacity={0.7}
              stroke={d3.rgb(sourceColor).darker().toString()}
              strokeOpacity={0.1}
              className="hover:fill-opacity-100 transition-all duration-300"
            />
          </g>
        );
      })}
    </g>
  );
};

// Legend
const ChartLegend = (props: Partial<LegendProps>) => {
  const { data, colorScale } = useChordChart();
  return (
    <Legend
      items={data.map((g) => ({
        label: g.label,
        color: colorScale(g.label),
      }))}
      {...props}
    />
  );
};

// Export
const ChordDiagram = {
  Container,
  Groups,
  Ribbons,
  Legend: ChartLegend,
};

export default ChordDiagram;
