"use client";

import BarChart from "@d3-ui/BarChart";

const data = {
  series1: {
    label: "Revenue",
    color: "#3b82f6",
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
    color: "#f59e0b",
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

export function BarChartExample() {
  return (
    <div className="flex justify-center">
      <BarChart.Container data={data} width={600} height={400} variant="spread" orientation="vertical">
        <BarChart.YAxis />
        <BarChart.XAxis />
        <BarChart.Bar dataKey="series1" label={{ variant: "none" }} />
        <BarChart.Bar dataKey="series2" label={{ variant: "none" }} />
        <BarChart.Legend />
      </BarChart.Container>
    </div>
  );
}
