"use client";

import ScatterPlot from "@d3-ui/ScatterPlot";
import { useChartTheme } from "@/app/components/ChartShowcase";

export function ScatterPlotExample() {
  const { colors } = useChartTheme();
  
  const data = {
    series1: {
      data: Array.from({ length: 20 }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
      })),
      color: colors[0],
      label: "Series 1",
    },
    series2: {
      data: Array.from({ length: 20 }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
      })),
      color: colors[1],
      label: "Series 2",
    },
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 mt-4">
      <ScatterPlot.Container data={data} width={600} height={350}>
        <ScatterPlot.XAxis />
        <ScatterPlot.YAxis />
        <ScatterPlot.Dots dataKey="series1" />
        <ScatterPlot.Dots dataKey="series2" />
        <ScatterPlot.Legend className="mt-8 scale-110" />
      </ScatterPlot.Container>
    </div>
  );
}