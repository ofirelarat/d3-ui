import * as React from "react";
import LineChart from "../components/LineChart";

export default {
  title: "Charts/LineChart",
  component: LineChart.Container,
  argTypes: {
    width: { control: "number", description: "Width of the chart" },
    height: { control: "number", description: "Height of the chart" },
  },
  args: {
    width: 600,
    height: 260,
  },
};

const multiLineData = {
  sales: { data: Array.from({ length: 8 }, (_, i) => ({ x: i + 1, y: Math.round(Math.random() * 80 + 20) })), color: "#2563eb", label: "Sales" },
  profit: { data: Array.from({ length: 8 }, (_, i) => ({ x: i + 1, y: Math.round(Math.random() * 40 + 10) })), color: "#16a34a", label: "Profit" },
};

export const Basic = (args: any) => (
  <LineChart.Container data={multiLineData} {...args}>
    <LineChart.Line dataKey="sales" />
    <LineChart.Line dataKey="profit" />
    <LineChart.XAxis />
    <LineChart.YAxis />
    <LineChart.Legend />
  </LineChart.Container>
);

export const SingleSeries = (args: any) => (
  <LineChart.Container data={{ revenue: { data: Array.from({ length: 12 }, (_, i) => ({ x: i + 1, y: Math.round(Math.random() * 150 + 20) })), color: "#f97316", label: "Revenue" } }} {...args}>
    <LineChart.Line dataKey="revenue" />
    <LineChart.XAxis />
    <LineChart.YAxis />
    <LineChart.Legend />
  </LineChart.Container>
);
