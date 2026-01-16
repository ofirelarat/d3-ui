import * as React from "react";
import Heatmap from "../components/Heatmap";

export default {
  title: "Charts/Heatmap",
  component: Heatmap.Container,
  argTypes: {
    width: { control: "number", description: "Width of the chart" },
    height: { control: "number", description: "Height of the chart" },
  },
  args: {
    width: 360,
    height: 240,
  },
};

const matrix = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => Math.round(Math.random() * 100)));

const data = { sales: { data: matrix, color: "#2563eb", label: "Sales" } };

export const Basic = (args: any) => (
  <Heatmap.Container data={data} {...args}>
    <Heatmap.Tile dataKey="sales" />
    <Heatmap.Legend />
  </Heatmap.Container>
);
