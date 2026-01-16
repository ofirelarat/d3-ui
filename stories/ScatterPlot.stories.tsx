import * as React from "react";
import ScatterPlot from "../components/ScatterPlot";

export default {
  title: "Charts/ScatterPlot",
  component: ScatterPlot.Container,
  argTypes: {
    width: { control: "number", description: "Width of the chart" },
    height: { control: "number", description: "Height of the chart" },
  },
  args: {
    width: 600,
    height: 300,
  },
};

const multi = {
  sales: { data: Array.from({ length: 12 }, () => ({ x: Math.random() * 100, y: Math.random() * 100 })), color: "#2563eb", label: "Sales" },
};

export const Basic = (args: any) => (
  <ScatterPlot.Container data={multi} {...args}>
    <ScatterPlot.Dots dataKey="sales" />
    <ScatterPlot.XAxis />
    <ScatterPlot.YAxis />
    <ScatterPlot.Legend />
  </ScatterPlot.Container>
);
