import * as React from "react";
import Gauge from "../components/Gauge";

export default {
  title: "Charts/Gauge",
  component: Gauge.Container,
  argTypes: {
    width: { control: "number", description: "Width of the gauge" },
    height: { control: "number", description: "Height of the gauge" },
    min: { control: "number", description: "Minimum value for the gauge" },
    max: { control: "number", description: "Maximum value for the gauge" },
  },
  args: {
    width: 320,
    height: 200,
    min: 0,
    max: 100,
  },
};

const one = [{ label: "Completed", value: 70, color: "#34d399" }];
const multi = [
  { label: "Low", value: 30, color: "#f87171" },
  { label: "Med", value: 40, color: "#fbbf24" },
  { label: "High", value: 30, color: "#34d399" },
];

export const Simple = (args: any) => (
  <Gauge.Container data={one} {...args}>
    <Gauge.Arc />
    <Gauge.Needle value={65} />
    <Gauge.Label value={65} />
    <Gauge.Legend />
  </Gauge.Container>
);

export const MultiSegment = (args: any) => (
  <Gauge.Container data={multi} {...args}>
    <Gauge.Arc />
    <Gauge.Legend />
  </Gauge.Container>
);
