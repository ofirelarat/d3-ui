import * as React from "react";
import Treemap from "../components/Treemap";

export default {
  title: "Charts/Treemap",
  component: Treemap.Container,
  argTypes: {
    width: { control: "number", description: "Width of the chart" },
    height: { control: "number", description: "Height of the chart" },
  },
  args: {
    width: 600,
    height: 300,
  },
};

const data = {
  name: "root",
  children: [
    { name: "A", value: 500, color: "#3182bd" },
    { name: "B", value: 300, color: "#16a34a" },
    { name: "C", value: 200, color: "#f59e0b" },
  ],
};

export const Basic = (args: any) => (
  <Treemap.Container data={data} {...args}>
    <Treemap.Tile />
    <Treemap.Legend />
  </Treemap.Container>
);
