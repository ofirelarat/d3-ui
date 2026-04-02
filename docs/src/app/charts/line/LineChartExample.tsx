"use client";

import LineChart from "@d3-ui/LineChart";
import { useChartTheme } from "@/app/components/ChartShowcase";

export function LineChartExample() {
  const { colors } = useChartTheme();
  
  const data = {
    series1: {
      data: [
        { x: 0, y: 10 },
        { x: 1, y: 30 },
        { x: 2, y: 20 },
        { x: 3, y: 40 },
        { x: 4, y: 35 },
      ],
      color: colors[0],
      label: "Series 1",
    },
    series2: {
      data: [
        { x: 0, y: 15 },
        { x: 1, y: 25 },
        { x: 2, y: 35 },
        { x: 3, y: 30 },
        { x: 4, y: 45 },
      ],
      color: colors[1],
      label: "Series 2",
    },
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 mt-4">
      <LineChart.Container data={data} width={600} height={350}>
        <LineChart.XAxis />
        <LineChart.YAxis />
        <LineChart.Line dataKey="series1" />
        <LineChart.Line dataKey="series2" />
        <LineChart.Legend className="mt-8 scale-110" />
      </LineChart.Container>
    </div>
  );
}
