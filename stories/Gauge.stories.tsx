import * as React from "react";
import Gauge from "../components/Gauge";

export default {
  title: "Charts/Gauge",
  component: Gauge.Container,
};

const one = [{ label: "Completed", value: 70, color: "#34d399" }];
const multi = [
  { label: "Low", value: 30, color: "#f87171" },
  { label: "Med", value: 40, color: "#fbbf24" },
  { label: "High", value: 30, color: "#34d399" },
];

export const Simple = () => (
  <Gauge.Container data={one} width={320} height={200} min={0} max={100}>
    <Gauge.Arc />
    <Gauge.Needle value={65} />
    <Gauge.Label value={65} />
    <Gauge.Legend />
  </Gauge.Container>
);

export const MultiSegment = () => (
  <Gauge.Container data={multi} width={320} height={200} min={0} max={100}>
    <Gauge.Arc />
    <Gauge.Legend />
  </Gauge.Container>
);
