import * as React from "react";
import BarChart from "../components/BarChart";

export default {
  title: "Charts/BarChart",
  component: BarChart.Container,
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

export const Basic = () => (
  <BarChart.Container data={data} width={600} height={260}>
    <BarChart.Bar dataKey="2024" />
    <BarChart.XAxis />
    <BarChart.YAxis />
    <BarChart.Legend />
  </BarChart.Container>
);

export const Horizontal = () => (
  <BarChart.Container
    data={data}
    width={600}
    height={260}
    orientation="horizontal"
  >
    <BarChart.Bar dataKey="2024" />
    <BarChart.XAxis />
    <BarChart.YAxis />
    <BarChart.Legend />
  </BarChart.Container>
);

export const SeveralBars = () => (
  <BarChart.Container data={data} width={600} height={260}>
    <BarChart.Bar dataKey="2024" />
    <BarChart.Bar dataKey="2025" />
    <BarChart.XAxis />
    <BarChart.YAxis />
    <BarChart.Legend />
  </BarChart.Container>
);

export const SeveralBarsStacked = () => (
  <div className="relative flex">
    <BarChart.Container data={data} width={600} height={260} variant="stacked">
      <BarChart.Bar dataKey="2024" />
      <BarChart.Bar dataKey="2025" />
      <BarChart.XAxis />
      <BarChart.YAxis />
      <BarChart.Legend />
    </BarChart.Container>
  </div>
);
