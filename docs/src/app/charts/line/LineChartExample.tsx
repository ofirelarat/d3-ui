"use client";

import LineChart from "@d3-ui/LineChart";

interface Props {
  data: {
    [key: string]: {
      data: { x: number; y: number }[];
      color: string;
      label: string;
    };
  };
}

const data = {
  series1: {
    data: [
      { x: 0, y: 10 },
      { x: 1, y: 30 },
      { x: 2, y: 20 },
    ],
    color: "#3b82f6",
    label: "Series 1",
  },
  series2: {
    data: [
      { x: 0, y: 15 },
      { x: 1, y: 25 },
      { x: 2, y: 35 },
    ],
    color: "#ef4444",
    label: "Series 2",
  },
};

export function LineChartExample() {
  return (
    <div className="flex flex-col items-center gap-4">
      <LineChart.Container data={data}>
        <LineChart.XAxis />
        <LineChart.YAxis />
        <LineChart.Line dataKey="series1" />
        <LineChart.Line dataKey="series2" />
        <LineChart.Legend />
      </LineChart.Container>
    </div>
  );
}
