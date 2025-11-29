import * as React from "react";
import Heatmap from "../components/Heatmap";

export default {
  title: "Charts/Heatmap",
  component: Heatmap.Container,
};

const matrix = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => Math.round(Math.random() * 100)));

const data = { sales: { data: matrix, color: "#2563eb", label: "Sales" } };

export const Basic = () => (
  <Heatmap.Container data={data} width={360} height={240}>
    <Heatmap.Tile dataKey="sales" />
    <Heatmap.Legend />
  </Heatmap.Container>
);
