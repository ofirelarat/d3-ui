"use client";

import PieChart from "@d3-ui/PieChart";
import { useChartTheme } from "@/app/components/ChartShowcase";

export function PieChartExample() {
  const { colors } = useChartTheme();
  
  const data = {
    apples: { value: 30, color: colors[0], label: "Apples" },
    bananas: { value: 20, color: colors[1], label: "Bananas" },
    cherries: { value: 25, color: colors[2], label: "Cherries" },
    dates: { value: 15, color: colors[3], label: "Dates" },
    elderberries: { value: 10, color: colors[4], label: "Elderberries" },
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl animate-in fade-in zoom-in duration-700">
      <PieChart.Container data={data} width={450} height={400} innerRadius={80}>
        <PieChart.Slice label={{ variant: "text" }} />
        <PieChart.CenterLabel className="flex flex-col items-center translate-y-[-10px] scale-125">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Total</span>
          <span className="text-3xl font-bold text-foreground">100</span>
        </PieChart.CenterLabel>
        <PieChart.Legend className="mt-8 scale-110" />
      </PieChart.Container>
    </div>
  );
}
