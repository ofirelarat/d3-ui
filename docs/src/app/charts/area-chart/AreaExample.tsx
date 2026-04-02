"use client";

import AreaChart from "@d3-ui/AreaChart";
import { useChartTheme } from "@/app/components/ChartShowcase";

export function AreaChartExample() {
  const { colors, theme } = useChartTheme();
  
  const data = {
    series1: {
      label: "Revenue",
      color: colors[0],
      data: [
        { x: 0, y: 30 },
        { x: 1, y: 50 },
        { x: 2, y: 40 },
        { x: 3, y: 60 },
        { x: 4, y: 80 },
        { x: 5, y: 70 },
      ],
    },
    series2: {
      label: "Expenses",
      color: colors[1],
      data: [
        { x: 0, y: 20 },
        { x: 1, y: 30 },
        { x: 2, y: 25 },
        { x: 3, y: 40 },
        { x: 4, y: 50 },
        { x: 5, y: 45 },
      ],
    },
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <AreaChart.Container 
        data={data} 
        width={600} 
        height={350} 
        variant="stacked"
      >
        <AreaChart.YAxis />
        <AreaChart.XAxis />
        <AreaChart.Area 
          dataKey="series1" 
        />
        <AreaChart.Area 
          dataKey="series2" 
        />
        <AreaChart.Legend className="mt-8 scale-110" />
      </AreaChart.Container>
    </div>
  );
}
