import * as React from "react";
import LineChart from "../components/LineChart";

export default {
  title: "Charts/LineChart",
  component: LineChart.Container,
};

const multiLineData = {
  sales: { data: Array.from({ length: 8 }, (_, i) => ({ x: i + 1, y: Math.round(Math.random() * 80 + 20) })), color: "#2563eb", label: "Sales" },
  profit: { data: Array.from({ length: 8 }, (_, i) => ({ x: i + 1, y: Math.round(Math.random() * 40 + 10) })), color: "#16a34a", label: "Profit" },
};

export const Basic = () => (
  <LineChart.Container data={multiLineData} width={600} height={260}>
    <LineChart.Line dataKey="sales" />
    <LineChart.Line dataKey="profit" />
    <LineChart.XAxis />
    <LineChart.YAxis />
    <LineChart.Legend />
  </LineChart.Container>
);

export const SingleSeries = () => (
  <LineChart.Container data={{ revenue: { data: Array.from({ length: 12 }, (_, i) => ({ x: i + 1, y: Math.round(Math.random() * 150 + 20) })), color: "#f97316", label: "Revenue" } }} width={600} height={260}>
    <LineChart.Line dataKey="revenue" />
    <LineChart.XAxis />
    <LineChart.YAxis />
    <LineChart.Legend />
  </LineChart.Container>
);
