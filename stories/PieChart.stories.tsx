import * as React from "react";
import PieChart from "../components/PieChart";

export default {
  title: "Charts/PieChart",
  component: PieChart.Container,
  argTypes: {
    width: { control: "number", description: "Width of the chart" },
    height: { control: "number", description: "Height of the chart" },
    innerRadius: { control: "number", description: "Inner radius for donut chart (0 for pie)" },
  },
  args: {
    width: 320,
    height: 240,
    innerRadius: 0,
  },
};

const simple = {
  a: { value: 40, color: "#2563eb", label: "A" },
  b: { value: 30, color: "#16a34a", label: "B" },
  c: { value: 30, color: "#f97316", label: "C" },
};

export const Basic = (args: any) => (
  <PieChart.Container data={simple} {...args}>
    <PieChart.Slice />
    <PieChart.Legend />
  </PieChart.Container>
);

export const Donut = (args: any) => (
  <PieChart.Container data={simple} {...args}>
    <PieChart.Slice />
    <PieChart.Legend />
  </PieChart.Container>
);

Donut.args = {
  width: 320,
  height: 240,
  innerRadius: 40,
};
