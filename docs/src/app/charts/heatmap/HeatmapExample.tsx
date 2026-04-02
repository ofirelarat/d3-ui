"use client";

import Heatmap from "@d3-ui/Heatmap";
import { useChartTheme } from "@/app/components/ChartShowcase";

export function HeatmapExample() {
  const { colors } = useChartTheme();
  
  function generateMatrix(rows: number, cols: number, min = 0, max = 100) {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () =>
        Math.floor(Math.random() * (max - min) + min)
      )
    );
  }

  const data = {
    sales: {
      data: generateMatrix(8, 8, 20, 100),
      color: colors[0],
      label: "Sales Volume",
    },
    performance: {
      data: generateMatrix(8, 8, 0, 80),
      color: colors[1],
      label: "Team Performance",
    },
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 mt-4">
      <Heatmap.Container data={data} width={550} height={400}>
        <Heatmap.Tile dataKey="sales" label={{ variant: "none" }} />
        <Heatmap.Tile dataKey="performance" label={{ variant: "none" }} />
        <Heatmap.Legend className="mt-8 scale-110" />
      </Heatmap.Container>
    </div>
  );
}
