import type { Meta, StoryObj } from "@storybook/react";
import ChordDiagram from "../components/ChordDiagram";
import { ChordData } from "../components/types";

const DATA_SAMPLE: ChordData = [
  {
    label: "Category A",
    color: "#3b82f6",
    ribbons: [
      { label: "Category B", sourceValue: 5, targetValue: 2, color: "#ef4444" },
      { label: "Category C", sourceValue: 8, targetValue: 5 },
      { label: "Category D", sourceValue: 2, targetValue: 1 },
    ],
  },
  {
    label: "Category B",
    color: "#ef4444",
    ribbons: [
      { label: "Category C", sourceValue: 4, targetValue: 4 },
      { label: "Category D", sourceValue: 6, targetValue: 2 },
    ],
  },
  {
    label: "Category C",
    color: "#10b981",
    ribbons: [
      { label: "Category D", sourceValue: 8, targetValue: 4 },
    ],
  },
  {
    label: "Category D",
    color: "#f59e0b",
    ribbons: [],
  },
];

const meta: Meta<typeof ChordDiagram.Container> = {
  title: "Charts/ChordDiagram",
  component: ChordDiagram.Container,
  tags: ["autodocs"],
  argTypes: {
    directed: { control: "boolean" },
    width: { control: "number" },
    height: { control: "number" },
    padAngle: { control: { type: "range", min: 0, max: 0.1, step: 0.01 } },
  },
};

export default meta;
type Story = StoryObj<typeof ChordDiagram.Container>;

export const Default: Story = {
  args: {
    data: DATA_SAMPLE,
    width: 500,
    height: 500,
    directed: false,
    padAngle: 0.04,
  },
  render: (args) => (
    <ChordDiagram.Container {...args}>
      <ChordDiagram.Ribbons />
      <ChordDiagram.Groups label={{ variant: "text", className: "text-[12px] font-medium" }} />
      <ChordDiagram.Legend position="bottom" orientation="horizontal" />
    </ChordDiagram.Container>
  ),
};

export const Directed: Story = {
  args: {
    data: [
      {
        label: "Category A",
        color: "#3b82f6",
        ribbons: [
          { label: "Category B", value: 5 },
          { label: "Category C", value: 8 },
          { label: "Category D", value: 2 },
        ],
      },
      {
        label: "Category B",
        color: "#ef4444",
        ribbons: [
          { label: "Category A", value: 2 },
          { label: "Category C", value: 4 },
          { label: "Category D", value: 6 },
        ],
      },
      {
        label: "Category C",
        color: "#10b981",
        ribbons: [
          { label: "Category A", value: 5 },
          { label: "Category B", value: 4 },
          { label: "Category D", value: 8 },
        ],
      },
      {
        label: "Category D",
        color: "#f59e0b",
        ribbons: [
          { label: "Category A", value: 1 },
          { label: "Category B", value: 2 },
          { label: "Category C", value: 4 },
        ],
      },
    ],
    width: 600,
    height: 600,
    directed: true,
    padAngle: 0.04,
  },
  render: (args) => (
    <ChordDiagram.Container {...args}>
      <ChordDiagram.Ribbons />
      <ChordDiagram.Groups label={{ variant: "text", className: "text-[14px] font-bold" }} />
      <ChordDiagram.Legend position="right" />
    </ChordDiagram.Container>
  ),
};

export const LargeMatrix: Story = {
    args: {
      data: [
        {
          label: "North",
          ribbons: [
            { label: "North", sourceValue: 100, targetValue: 100 },
            { label: "South", sourceValue: 20, targetValue: 10 },
            { label: "East", sourceValue: 30, targetValue: 20 },
            { label: "West", sourceValue: 10, targetValue: 5 },
            { label: "Central", sourceValue: 5, targetValue: 15 },
          ],
        },
        {
          label: "South",
          ribbons: [
            { label: "South", sourceValue: 150, targetValue: 150 },
            { label: "East", sourceValue: 40, targetValue: 30 },
            { label: "West", sourceValue: 20, targetValue: 10 },
            { label: "Central", sourceValue: 10, targetValue: 25 },
          ],
        },
        {
          label: "East",
          ribbons: [
            { label: "East", sourceValue: 120, targetValue: 120 },
            { label: "West", sourceValue: 40, targetValue: 20 },
            { label: "Central", sourceValue: 15, targetValue: 35 },
          ],
        },
        {
          label: "West",
          ribbons: [
            { label: "West", sourceValue: 180, targetValue: 180 },
            { label: "Central", sourceValue: 25, targetValue: 45 },
          ],
        },
        {
          label: "Central",
          ribbons: [
            { label: "Central", sourceValue: 110, targetValue: 110 },
          ],
        },
      ],
      width: 500,
      height: 500,
      directed: false,
      padAngle: 0.04,
    },
    render: (args) => (
      <ChordDiagram.Container {...args}>
        <ChordDiagram.Ribbons />
        <ChordDiagram.Groups />
        <ChordDiagram.Legend position="bottom" orientation="horizontal" />
      </ChordDiagram.Container>
    ),
  };
