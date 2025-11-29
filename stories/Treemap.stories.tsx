import * as React from "react";
import Treemap from "../components/Treemap";

export default {
  title: "Charts/Treemap",
  component: Treemap.Container,
};

const data = {
  name: "root",
  children: [
    { name: "A", value: 500, color: "#3182bd" },
    { name: "B", value: 300, color: "#16a34a" },
    { name: "C", value: 200, color: "#f59e0b" },
  ],
};

export const Basic = () => (
  <Treemap.Container data={data} width={600} height={300}>
    <Treemap.Tile />
    <Treemap.Legend />
  </Treemap.Container>
);
