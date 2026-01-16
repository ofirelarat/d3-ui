import * as React from "react";
import BarChart from "../components/BarChart";

export default {
  title: "Charts/BarChart",
  component: BarChart.Container,
  argTypes: {
    width: { control: "number", description: "Width of the chart" },
    height: { control: "number", description: "Height of the chart" },
    variant: {
      control: "radio",
      options: ["spread", "stacked"],
      description: "Chart variant: spread or stacked",
    },
    orientation: {
      control: "radio",
      options: ["vertical", "horizontal"],
      description: "Bar chart orientation",
    },
  },
  args: {
    width: 600,
    height: 260,
    variant: "spread",
    orientation: "vertical",
  },
};

const data = {
  2024: {
    data: [
      { x: "Jan", y: 30 },
      { x: "Feb", y: 40 },
      { x: "Mar", y: 50 },
    ],
    color: "#2563eb",
    label: "2024",
  },
  2025: {
    data: [
      { x: "Jan", y: 35 },
      { x: "Feb", y: 46 },
      { x: "Mar", y: 61 },
    ],
    color: "#20ad30ff",
    label: "2025",
  },
};

export const Basic = (args: any) => (
  <BarChart.Container data={data} {...args}>
    <BarChart.Bar dataKey="2024" />
    <BarChart.XAxis />
    <BarChart.YAxis />
    <BarChart.Legend />
  </BarChart.Container>
);

export const SeveralBars = (args: any) => (
  <BarChart.Container data={data} {...args}>
    <BarChart.Bar dataKey="2024" />
    <BarChart.Bar dataKey="2025" />
    <BarChart.XAxis />
    <BarChart.YAxis />
    <BarChart.Legend />
  </BarChart.Container>
);
