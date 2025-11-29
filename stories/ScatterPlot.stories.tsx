import * as React from "react";
import ScatterPlot from "../components/ScatterPlot";

export default {
  title: "Charts/ScatterPlot",
  component: ScatterPlot.Container,
};

const multi = {
  sales: { data: Array.from({ length: 12 }, () => ({ x: Math.random() * 100, y: Math.random() * 100 })), color: "#2563eb", label: "Sales" },
};

export const Basic = () => (
  <ScatterPlot.Container data={multi} width={600} height={300}>
    <ScatterPlot.Dots dataKey="sales" />
    <ScatterPlot.XAxis />
    <ScatterPlot.YAxis />
    <ScatterPlot.Legend />
  </ScatterPlot.Container>
);
