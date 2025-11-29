import * as React from "react";
import PieChart from "../components/PieChart";

export default {
  title: "Charts/PieChart",
  component: PieChart.Container,
};

const simple = {
  a: { value: 40, color: "#2563eb", label: "A" },
  b: { value: 30, color: "#16a34a", label: "B" },
  c: { value: 30, color: "#f97316", label: "C" },
};

export const Basic = () => (
  <PieChart.Container data={simple} width={320} height={240}>
    <PieChart.Slice />
    <PieChart.Legend />
  </PieChart.Container>
);

export const Donut = () => (
  <PieChart.Container data={simple} width={320} height={240} innerRadius={40}>
    <PieChart.Slice />
    <PieChart.Legend />
  </PieChart.Container>
);
