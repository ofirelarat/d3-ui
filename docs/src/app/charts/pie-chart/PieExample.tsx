"use client";

import PieChart from "@d3-ui/PieChart";

const data = {
  apples: { value: 30, color: "#3b82f6", label: "Apples" },
  bananas: { value: 20, color: "#f59e0b", label: "Bananas" },
  cherries: { value: 25, color: "#ef4444", label: "Cherries" },
  dates: { value: 15, color: "#10b981", label: "Dates" },
  elderberries: { value: 10, color: "#8b5cf6", label: "Elderberries" },
};

export function PieChartExample() {
  return (
    <div className="flex justify-center">
      <PieChart.Container data={data} width={400} height={400} innerRadius={70}>
        <PieChart.Slice label={{ variant: "text" }} />
        <PieChart.CenterLabel>
          <div className="ml-[35px] flex flex-col items-center">
            <div className="text-lg font-semibold">Fruits</div>
            <div>100</div>
          </div>
        </PieChart.CenterLabel>
        <PieChart.Legend />
      </PieChart.Container>
    </div>
  );
}
