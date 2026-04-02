"use client";

import BarChart from "@d3-ui/BarChart";
import { useChartTheme } from "@/app/components/ChartShowcase";

export function BarChartExample() {
  const { colors, theme } = useChartTheme();
  const data = {
    series1: {
      label: "Revenue",
      color: colors[0],
      data: [
        { x: "Jan", y: 30 },
        { x: "Feb", y: 50 },
        { x: "Mar", y: 40 },
        { x: "Apr", y: 60 },
        { x: "May", y: 80 },
        { x: "Jun", y: 70 },
      ],
    },
    series2: {
      label: "Expenses",
      color: colors[1],
      data: [
        { x: "Jan", y: 20 },
        { x: "Feb", y: 30 },
        { x: "Mar", y: 25 },
        { x: "Apr", y: 40 },
        { x: "May", y: 50 },
        { x: "Jun", y: 45 },
      ],
    },
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl animate-in fade-in zoom-in duration-500">
      <BarChart.Container 
        data={data} 
        width={600} 
        height={350} 
        variant="spread" 
        orientation="vertical"
      >
        <BarChart.YAxis />
        <BarChart.XAxis />
        <BarChart.Bar 
          dataKey="series1" 
          label={{ variant: "none" }} 
        />
        <BarChart.Bar 
          dataKey="series2" 
          label={{ variant: "none" }} 
        />
        <BarChart.Legend className="mt-8 scale-110" />
      </BarChart.Container>
    </div>
  );
}
