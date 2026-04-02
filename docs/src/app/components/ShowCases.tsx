"use client";

import React, { useState } from "react";
import Heatmap from "@d3-ui/Heatmap";
import LineChart from "@d3-ui/LineChart";
import ScatterPlot from "@d3-ui/ScatterPlot";
import Treemap from "@d3-ui/Treemap";
import GaugeChart from "@d3-ui/Gauge";
import BarChart from "@d3-ui/BarChart";
import PieChart from "@d3-ui/PieChart";
import AreaChart from "@d3-ui/AreaChart";
import { useChartTheme } from "./ChartShowcase";

export function LineChartExamples() {
  const { colors } = useChartTheme();
  function generateLineData(points: number, min = 0, max = 100) {
    return Array.from({ length: points }, (_, i) => ({
      x: i + 1,
      y: Math.floor(Math.random() * (max - min) + min),
    }));
  }

  const multiLineData = {
    sales: {
      data: generateLineData(12, 10, 100),
      color: colors[0],
      label: "Sales",
    },
    profit: {
      data: generateLineData(12, 5, 50),
      color: colors[1],
      label: "Profit",
    },
    loss: { data: generateLineData(12, 0, 30), color: colors[2], label: "Loss" },
  };

  return (
    <div className="w-full h-full flex items-center justify-center min-h-[350px]">
      <LineChart.Container data={multiLineData} width={650} height={350}>
        <LineChart.Line dataKey="sales" />
        <LineChart.Line dataKey="profit" />
        <LineChart.Line dataKey="loss" />
        <LineChart.XAxis />
        <LineChart.YAxis />
        <LineChart.Legend />
      </LineChart.Container>
    </div>
  );
}

export function ScatterPlotExamples() {
  const { colors } = useChartTheme();
  function generateScatterData(points: number, xMin = 0, xMax = 100, yMin = 0, yMax = 100) {
    return Array.from({ length: points }, () => ({
      x: Math.floor(Math.random() * (xMax - xMin) + xMin),
      y: Math.floor(Math.random() * (yMax - yMin) + yMin),
    }));
  }
  const multiSeriesData = {
    sales: { data: generateScatterData(20, 10, 100, 0, 50), color: colors[0], label: "Sales" },
    profit: { data: generateScatterData(20, 10, 100, 0, 50), color: colors[1], label: "Profit" },
    loss: { data: generateScatterData(20, 10, 100, 0, 50), color: colors[2], label: "Loss" },
  };

  return (
    <div className="w-full h-full flex items-center justify-center min-h-[350px]">
      <ScatterPlot.Container data={multiSeriesData} width={650} height={350}>
        <ScatterPlot.Dots dataKey="sales" />
        <ScatterPlot.Dots dataKey="profit" />
        <ScatterPlot.Dots dataKey="loss" />
        <ScatterPlot.XAxis />
        <ScatterPlot.YAxis />
        <ScatterPlot.Legend />
      </ScatterPlot.Container>
    </div>
  );
}

export function BarChartExamples() {
  const { colors } = useChartTheme();
  const barData = {
    apples: {
      data: [
        { x: "Jan", y: 30 }, { x: "Feb", y: 50 }, { x: "Mar", y: 40 }, 
        { x: "Apr", y: 60 }, { x: "May", y: 45 }, { x: "Jun", y: 55 }
      ],
      color: colors[0],
      label: "Apples",
    },
    oranges: {
      data: [
        { x: "Jan", y: 20 }, { x: "Feb", y: 40 }, { x: "Mar", y: 30 }, 
        { x: "Apr", y: 50 }, { x: "May", y: 35 }, { x: "Jun", y: 45 }
      ],
      color: colors[1],
      label: "Oranges",
    },
  };

  return (
    <div className="w-full h-full flex items-center justify-center min-h-[350px]">
      <BarChart.Container data={barData} width={650} height={350} variant="spread">
        <BarChart.Bar dataKey="apples" />
        <BarChart.Bar dataKey="oranges" />
        <BarChart.XAxis />
        <BarChart.YAxis />
        <BarChart.Legend />
      </BarChart.Container>
    </div>
  );
}

export function AreaChartExamples() {
  const { colors } = useChartTheme();
  const data = {
    series1: {
      label: "Revenue",
      color: colors[0],
      data: [
        { x: 0, y: 30 }, { x: 1, y: 50 }, { x: 2, y: 40 }, { x: 3, y: 60 }, { x: 4, y: 80 }, { x: 5, y: 70 }
      ],
    },
    series2: {
      label: "Expenses",
      color: colors[1],
      data: [
        { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 25 }, { x: 3, y: 40 }, { x: 4, y: 50 }, { x: 5, y: 45 }
      ],
    },
  };

  return (
    <div className="w-full h-full flex items-center justify-center min-h-[350px]">
      <AreaChart.Container data={data} width={650} height={350} variant="stacked">
        <AreaChart.YAxis />
        <AreaChart.XAxis />
        <AreaChart.Area dataKey="series1" />
        <AreaChart.Area dataKey="series2" />
        <AreaChart.Legend />
      </AreaChart.Container>
    </div>
  );
}

export function PieChartExamples() {
  const { colors } = useChartTheme();
  const pieData = {
    completed: { value: 60, color: colors[0], label: "Completed" },
    pending: { value: 25, color: colors[1], label: "Pending" },
    failed: { value: 15, color: colors[2], label: "Failed" },
  };

  return (
    <div className="w-full h-full flex items-center justify-center min-h-[350px]">
      <PieChart.Container data={pieData} width={400} height={350} innerRadius={60}>
        <PieChart.Slice label={{ variant: "text" }} />
        <PieChart.Legend />
      </PieChart.Container>
    </div>
  );
}

export function HeatmapExamples() {
  const { colors } = useChartTheme();
  function generateMatrix(rows: number, cols: number, min = 0, max = 100) {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () =>
        Math.floor(Math.random() * (max - min) + min)
      )
    );
  }

  const baseData = {
    sales: { data: generateMatrix(8, 8), color: colors[0], label: "Sales" },
  };

  return (
    <div className="w-full h-full flex items-center justify-center min-h-[350px]">
      <Heatmap.Container data={baseData} width={400} height={400}>
        <Heatmap.Tile dataKey="sales" label={{ variant: "none" }} />
        <Heatmap.Legend />
      </Heatmap.Container>
    </div>
  );
}

export function TreemapExamples() {
  const { colors } = useChartTheme();
  const data = {
    name: "root",
    children: [
      { name: "Electronics", value: 1500, color: colors[0] },
      { name: "Clothing", value: 1200, color: colors[1] },
      { name: "Furniture", value: 900, color: colors[2] },
      { name: "Toys", value: 600, color: colors[3] },
    ],
  };

  return (
    <div className="w-full h-full flex items-center justify-center min-h-[350px]">
      <Treemap.Container data={data} width={600} height={350}>
        <Treemap.Tile />
        <Treemap.Legend />
      </Treemap.Container>
    </div>
  );
}

export function GaugeChartExamples() {
  const { colors } = useChartTheme();
  const [value, setValue] = useState(65);
  const data = [
    { label: "Low", value: 30, color: colors[0] },
    { label: "Medium", value: 40, color: colors[1] },
    { label: "High", value: 30, color: colors[2] },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center min-h-[350px] gap-8">
      <GaugeChart.Container data={data} min={0} max={100} width={500} height={300}>
        <GaugeChart.Arc />
        <GaugeChart.Needle value={value} />
        <GaugeChart.Label value={value} />
        <GaugeChart.Legend />
      </GaugeChart.Container>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-64 accent-primary"
      />
    </div>
  );
}
