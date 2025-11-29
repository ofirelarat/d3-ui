import * as React from "react";
import AreaChart from "../components/AreaChart";

export default {
  title: "Charts/AreaChart",
  component: AreaChart.Container,
};

const series = {
  a: { data: Array.from({ length: 10 }, (_, i) => ({ x: i + 1, y: Math.round(Math.random() * 60 + 10) })), color: "#2563eb", label: "A" },
  b: { data: Array.from({ length: 10 }, (_, i) => ({ x: i + 1, y: Math.round(Math.random() * 40 + 5) })), color: "#16a34a", label: "B" },
};

export const Basic = () => (
  <AreaChart.Container data={series} width={600} height={260}>
    <AreaChart.Area dataKey="a" />
    <AreaChart.Area dataKey="b" />
    <AreaChart.XAxis />
    <AreaChart.YAxis />
    <AreaChart.Legend />
  </AreaChart.Container>
);
