"use client";

import Heatmap from "@d3-ui/Heatmap";
import { Card, CardContent } from "./Card";
import LineChart from "@d3-ui/LineChart";
import ScatterPlot from "@d3-ui/ScatterPlot";
import Treemap from "@d3-ui/Treemap";
import GaugeChart from "@d3-ui/Gauge";
import BarChart from "@d3-ui/BarChart";
import PieChart from "@d3-ui/PieChart";
import AreaChart from "@d3-ui/AreaChart";
import { useState } from "react";

export function HeatmapExamples() {
  function generateMatrix(rows: number, cols: number, min = 0, max = 100) {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () =>
        Math.floor(Math.random() * (max - min) + min)
      )
    );
  }

  const baseData = {
    sales: { data: generateMatrix(4, 4), color: "#2563eb", label: "Sales" },
    profit: { data: generateMatrix(4, 4), color: "#16a34a", label: "Profit" },
    loss: { data: generateMatrix(4, 4), color: "#dc2626", label: "Loss" },
  };

  const darkData = {
    energy: { data: generateMatrix(6, 6), color: "#9333ea", label: "Energy" },
    water: { data: generateMatrix(6, 6), color: "#3b82f6", label: "Water" },
    waste: { data: generateMatrix(6, 6), color: "#f97316", label: "Waste" },
  };
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Heatmap</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Visualize dense data grids with color gradients. Perfect for showing matrix data patterns.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h3 className="font-semibold text-slate-900 dark:text-white">Basic Heatmap</h3>
            <Heatmap.Container
              data={{ sales: baseData.sales }}
              width={140}
              height={140}
            >
              <Heatmap.Tile dataKey="sales" />
              <Heatmap.Legend />
            </Heatmap.Container>
          </CardContent>
        </Card>
        <Card className="border border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h3 className="font-semibold text-slate-900 dark:text-white">Hidden Labels</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs text-center">
              Using <code className="bg-slate-100 dark:bg-slate-900 px-1 rounded">{`variant="none"`}</code>
            </p>
            <Heatmap.Container
              data={{ profit: baseData.profit }}
              width={140}
              height={140}
            >
              <Heatmap.Tile dataKey="profit" label={{ variant: "none" }} />
              <Heatmap.Legend />
            </Heatmap.Container>
          </CardContent>
        </Card>
        <Card className="border border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h3 className="font-semibold text-slate-900 dark:text-white">Custom Formatting</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs text-center">
              Format cell values with <code className="bg-slate-100 dark:bg-slate-900 px-1 rounded">labelFormatter</code>
            </p>
            <Heatmap.Container
              data={{ loss: baseData.loss }}
              width={140}
              height={140}
            >
              <Heatmap.Tile
                dataKey="loss"
                label={{
                  labelFormatter: (v) => <div className="text-xs">${v}</div>,
                  variant: "text",
                }}
              />
              <Heatmap.Legend />
            </Heatmap.Container>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-slate-900 dark:bg-slate-950 border border-slate-800">
        <CardContent className="p-6 flex flex-col gap-4 items-center">
          <h3 className="font-semibold text-white">Large Heatmap (600x600)</h3>
          <p className="text-slate-400 text-sm">
            Multi-dataset visualization with high-contrast colors
          </p>
          <Heatmap.Container data={darkData} width={600} height={600}>
            <Heatmap.Tile dataKey="energy" label={{ variant: "text" }} />
            <Heatmap.Tile dataKey="water" label={{ variant: "text" }} />
            <Heatmap.Tile dataKey="waste" label={{ variant: "text" }} />
            <Heatmap.Legend />
          </Heatmap.Container>
        </CardContent>
      </Card>
    </section>
  );
}

export function LineChartExamples() {
  function generateLineData(points: number, min = 0, max = 100) {
    return Array.from({ length: points }, (_, i) => ({
      x: i + 1,
      y: Math.floor(Math.random() * (max - min) + min),
    }));
  }

  const multiLineData = {
    sales: {
      data: generateLineData(8, 10, 100),
      color: "#2563eb",
      label: "Sales",
    },
    profit: {
      data: generateLineData(8, 5, 50),
      color: "#16a34a",
      label: "Profit",
    },
    loss: { data: generateLineData(8, 0, 30), color: "#dc2626", label: "Loss" },
  };

  const singleLineData = {
    revenue: {
      data: generateLineData(12, 20, 200),
      color: "#f97316",
      label: "Revenue",
    },
  };
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Line Chart</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Track trends over time with smooth, responsive line charts.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h3 className="font-semibold text-slate-900 dark:text-white">Multiple Lines</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs text-center">
              Sales, profit, and loss comparison
            </p>
            <LineChart.Container data={multiLineData} width={280} height={180}>
              <LineChart.Line dataKey="sales" />
              <LineChart.Line dataKey="profit" />
              <LineChart.Line dataKey="loss" />
              <LineChart.XAxis />
              <LineChart.YAxis />
              <LineChart.Legend />
            </LineChart.Container>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h3 className="font-semibold text-slate-900 dark:text-white">Single Line</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs text-center">
              Revenue over 12 months
            </p>
            <LineChart.Container data={singleLineData} width={280} height={180}>
              <LineChart.Line dataKey="revenue" />
              <LineChart.XAxis />
              <LineChart.YAxis />
              <LineChart.Legend />
            </LineChart.Container>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h3 className="font-semibold text-slate-900 dark:text-white">Custom Labels</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs text-center">
              Formatted with currency symbol
            </p>
            <LineChart.Container data={singleLineData} width={280} height={180}>
              <LineChart.Line
                dataKey="revenue"
                label={{
                  labelFormatter: (v) => <div className="text-[9px]">${v}</div>,
                }}
              />
              <LineChart.XAxis />
              <LineChart.YAxis />
              <LineChart.Legend />
            </LineChart.Container>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-slate-900 dark:bg-slate-950 border border-slate-800">
        <CardContent className="p-6 flex flex-col gap-4 items-center">
          <h3 className="font-semibold text-white">Large Chart (600x300)</h3>
          <p className="text-slate-400 text-sm">
            Multiple lines with labels in high-resolution visualization
          </p>
          <LineChart.Container data={multiLineData} width={600} height={300}>
            <LineChart.Line dataKey="sales" label={{ variant: "square" }} />
            <LineChart.Line dataKey="profit" />
            <LineChart.Line dataKey="loss" />
            <LineChart.XAxis />
            <LineChart.YAxis />
            <LineChart.Legend />
          </LineChart.Container>
        </CardContent>
      </Card>
    </section>
  );
}

// Example datasets

export function ScatterPlotExamples() {
  // Helper: generate random scatter data
  function generateScatterData(
    points: number,
    xMin = 0,
    xMax = 100,
    yMin = 0,
    yMax = 100
  ) {
    return Array.from({ length: points }, () => ({
      x: Math.floor(Math.random() * (xMax - xMin) + xMin),
      y: Math.floor(Math.random() * (yMax - yMin) + yMin),
    }));
  }
  const multiSeriesData = {
    sales: {
      data: generateScatterData(12, 10, 100, 0, 50),
      color: "#2563eb",
      label: "Sales",
    },
    profit: {
      data: generateScatterData(12, 10, 100, 0, 50),
      color: "#16a34a",
      label: "Profit",
    },
    loss: {
      data: generateScatterData(12, 10, 100, 0, 50),
      color: "#dc2626",
      label: "Loss",
    },
  };

  const singleSeriesData = {
    revenue: {
      data: generateScatterData(15, 0, 100, 0, 200),
      color: "#f97316",
      label: "Revenue",
    },
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Scatter Plot</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Explore correlations between variables and identify patterns.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h3 className="font-semibold text-slate-900 dark:text-white">Multiple Series</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs text-center">
              Sales, profit, and loss
            </p>
            <ScatterPlot.Container
              data={multiSeriesData}
              width={280}
              height={200}
            >
              <ScatterPlot.Dots dataKey="sales" />
              <ScatterPlot.Dots dataKey="profit" />
              <ScatterPlot.Dots dataKey="loss" />
              <ScatterPlot.XAxis />
              <ScatterPlot.YAxis />
              <ScatterPlot.Legend />
            </ScatterPlot.Container>
          </CardContent>
        </Card>
        <Card className="border border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h3 className="font-semibold text-slate-900 dark:text-white">Single Series</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs text-center">
              Revenue distribution
            </p>
            <ScatterPlot.Container
              data={singleSeriesData}
              width={280}
              height={200}
            >
              <ScatterPlot.Dots
                dataKey="revenue"
                label={{ variant: "circle-text" }}
              />
              <ScatterPlot.XAxis />
              <ScatterPlot.YAxis />
              <ScatterPlot.Legend />
            </ScatterPlot.Container>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h3 className="font-semibold text-slate-900 dark:text-white">Custom Labels</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs text-center">
              With currency formatting
            </p>
            <ScatterPlot.Container
              data={singleSeriesData}
              width={280}
              height={200}
            >
              <ScatterPlot.Dots
                dataKey="revenue"
                label={{ labelFormatter: (v) => <>${v}</>, variant: "text" }}
              />
              <ScatterPlot.XAxis />
              <ScatterPlot.YAxis />
              <ScatterPlot.Legend />
            </ScatterPlot.Container>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-slate-900 dark:bg-slate-950 border border-slate-800">
        <CardContent className="p-6 flex flex-col gap-4 items-center">
          <h3 className="font-semibold text-white">Large Plot (600x300)</h3>
          <p className="text-slate-400 text-sm">
            Multi-series visualization with high contrast
          </p>
          <ScatterPlot.Container
            data={multiSeriesData}
            width={600}
            height={300}
          >
            <ScatterPlot.Dots dataKey="sales" label={{ variant: "square" }} />
            <ScatterPlot.Dots dataKey="profit" />
            <ScatterPlot.Dots dataKey="loss" />
            <ScatterPlot.XAxis />
            <ScatterPlot.YAxis />
            <ScatterPlot.Legend />
          </ScatterPlot.Container>
        </CardContent>
      </Card>
    </section>
  );
}

// Example datasets

export function TreemapExamples() {
  const baseDataTreeMap = {
    name: "root",
    children: [
      { name: "Electronics", value: 1500, color: "#3182bd" },
      { name: "Clothing", value: 1200, color: "#16a34a" },
      { name: "Furniture", value: 900, color: "#f59e0b" },
    ],
  };

  const nestedData = {
    name: "root",
    children: [
      {
        name: "Men",
        color: "#2563eb",
        children: [
          { name: "Shirts", value: 500, color: "#60a5fa" },
          { name: "Pants", value: 300, color: "#3b82f6" },
        ],
      },
      {
        name: "Women",
        color: "#16a34a",
        children: [
          { name: "Dresses", value: 400, color: "#34d399" },
          { name: "Shoes", value: 250, color: "#10b981" },
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col gap-10 p-8">
      <h1 className="text-3xl font-bold">Treemap Examples</h1>
      <p className="text-gray-600 dark:text-slate-400">
        The Treemap component visualizes hierarchical data using nested
        rectangles. Examples show how different props and styles change its
        appearance.
      </p>

      <div className="flex gap-4 flex-wrap">
        <Card className="w-[280px]">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2">Basic Treemap</h2>
            <Treemap.Container data={baseDataTreeMap} width={280} height={180}>
              <Treemap.Tile />
              <Treemap.Legend />
            </Treemap.Container>
          </CardContent>
        </Card>

        <Card className="w-[280px]">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2">Nested Treemap</h2>
            <p className="text-gray-500 dark:text-slate-400 text-sm">
              Shows hierarchical data with children nodes.
            </p>
            <Treemap.Container data={nestedData} width={280} height={180}>
              <Treemap.Tile label={{ variant: "none" }} />
              <Treemap.Legend />
            </Treemap.Container>
          </CardContent>
        </Card>

        <Card className="w-[280px]">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2">Custom Labels</h2>
            <p className="text-gray-500 dark:text-slate-400 text-sm">
              Format labels with a unit or symbol.
            </p>
            <Treemap.Container data={baseDataTreeMap} width={280} height={180}>
              <Treemap.Tile
                label={{
                  labelFormatter: (v) => (
                    <div className="text-[9px]">{v} USD</div>
                  ),
                }}
              />
              <Treemap.Legend />
            </Treemap.Container>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 text-white w-full">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2 text-white">
              Dark Mode Treemap
            </h2>
            <p className="text-gray-400 text-sm">
              Larger treemap (600x400) for high-contrast visualization.
            </p>
            <Treemap.Container data={nestedData} width={600} height={400}>
              <Treemap.Tile label={{ variant: "text" }} />
              <Treemap.Legend />
            </Treemap.Container>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function GaugeChartExamples() {
  const exampleData0 = [{ label: "Completed", value: 100, color: "#34d399" }];

  const exampleData1 = [
    { label: "Completed", value: 60, color: "#34d399" },
    { label: "Pending", value: 40, color: "#f59e0b" },
  ];

  const exampleData2 = [
    { label: "Low", value: 30, color: "#f87171" },
    { label: "Medium", value: 40, color: "#fbbf24" },
    { label: "High", value: 30, color: "#34d399" },
  ];
  const [value, setValue] = useState(65);

  return (
    <div className="flex flex-col gap-10 p-8">
      <h1 className="text-3xl font-bold">Gauge Chart Examples</h1>
      <p className="text-gray-600 dark:text-slate-400">
        The GaugeChart component visualizes values on a semi-circular gauge.
        Below are examples with multiple segments, dynamic needles, and dark
        mode.
      </p>

      <div className="flex gap-4 flex-wrap">
        <Card className="w-[280px]">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2">Simple Gauge</h2>
            <p className="text-gray-500 dark:text-slate-400 text-sm">
              Shows simple gauge with a needle for current value.
            </p>
            <GaugeChart.Container
              data={exampleData0}
              min={0}
              max={100}
              width={280}
              height={180}
            >
              <GaugeChart.Arc />
              <GaugeChart.Needle value={value} />
              <GaugeChart.Label value={value} />
              <GaugeChart.Legend />
            </GaugeChart.Container>
          </CardContent>
        </Card>

        <Card className="w-[280px]">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2">Multi-segment Gauge</h2>
            <p className="text-gray-500 dark:text-slate-400 text-sm">
              Gauge with Low / Medium / High segments, demonstrating multiple
              ranges.
            </p>
            <GaugeChart.Container
              data={exampleData2}
              min={0}
              max={100}
              width={280}
              height={180}
            >
              <GaugeChart.Arc />
              <GaugeChart.Needle value={50} color="#111" />
              <GaugeChart.Label value={50} />
              <GaugeChart.Legend />
            </GaugeChart.Container>
          </CardContent>
        </Card>

        <Card className="w-[280px]">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2">Dynamic Needle</h2>
            <p className="text-gray-500 dark:text-slate-400 text-sm">
              Use the slider to change the needle value dynamically.
            </p>
            <GaugeChart.Container
              data={exampleData1}
              min={0}
              max={100}
              width={280}
              height={180}
            >
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
              className="w-full mt-2"
            />
          </CardContent>
        </Card>

        <Card className="bg-gray-900 text-white w-full">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2 text-white">
              Dark Mode Gauge
            </h2>
            <p className="text-gray-400 text-sm">
              Large gauge (600x300) for high contrast viewing.
            </p>
            <GaugeChart.Container
              data={exampleData2}
              min={0}
              max={100}
              width={600}
              height={300}
            >
              <GaugeChart.Arc />
              <GaugeChart.Needle value={75} color="#fff" />
              <GaugeChart.Label value={75} />
              <GaugeChart.Legend />
            </GaugeChart.Container>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function BarChartExamples() {
  const [dynamicValue, setDynamicValue] = useState(50);

  const barData = {
    apples: {
      data: [
        { x: "Jan", y: 30 },
        { x: "Feb", y: 50 },
      ],
      color: "#34d399",
      label: "Apples",
    },
    oranges: {
      data: [
        { x: "Jan", y: 20 },
        { x: "Feb", y: 40 },
      ],
      color: "#f59e0b",
      label: "Oranges",
    },
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Bar Chart</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Compare values across categories with intuitive bar visualizations.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h3 className="font-semibold text-slate-900 dark:text-white">Grouped Bars</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs text-center">
              Apples and oranges
            </p>
            <BarChart.Container
              data={barData}
              width={280}
              height={180}
            >
              <BarChart.Bar dataKey="apples" />
              <BarChart.Bar dataKey="oranges" />
              <BarChart.XAxis />
              <BarChart.YAxis />
              <BarChart.Legend />
            </BarChart.Container>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h3 className="font-semibold text-slate-900 dark:text-white">Single Series</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs text-center">
              Apples only
            </p>
            <BarChart.Container
              data={{ apples: barData.apples }}
              width={280}
              height={180}
            >
              <BarChart.Bar dataKey="apples" />
              <BarChart.XAxis />
              <BarChart.YAxis />
              <BarChart.Legend />
            </BarChart.Container>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h3 className="font-semibold text-slate-900 dark:text-white">Interactive</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs text-center">
              Adjust with slider
            </p>
            <BarChart.Container
              data={{
                apples: {
                  ...barData.apples,
                  data: [
                    { x: "Q1", y: dynamicValue },
                    { x: "Q2", y: dynamicValue + 5 },
                    { x: "Q3", y: dynamicValue + 10 },
                  ],
                },
              }}
              width={280}
              height={180}
            >
              <BarChart.Bar dataKey="apples" />
              <BarChart.XAxis />
              <BarChart.YAxis />
            </BarChart.Container>
            <input
              type="range"
              min={0}
              max={100}
              value={dynamicValue}
              onChange={(e) => setDynamicValue(Number(e.target.value))}
              className="w-full mt-2"
            />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900 dark:bg-slate-950 border border-slate-800">
        <CardContent className="p-6 flex flex-col gap-4 items-center">
          <h3 className="font-semibold text-white">Large Chart (600x300)</h3>
          <p className="text-slate-400 text-sm">
            Multi-series visualization with detailed breakdown
          </p>
          <BarChart.Container
            data={barData}
            width={600}
            height={300}
          >
            <BarChart.Bar dataKey="apples" />
            <BarChart.Bar dataKey="oranges" />
            <BarChart.XAxis />
            <BarChart.YAxis />
            <BarChart.Legend/>
          </BarChart.Container>
        </CardContent>
      </Card>
    </section>
  );
}

export function PieChartExamples() {
  const pieData0 = {
    apples: { value: 100, color: "#34d399", label: "Completed" },
  };

  const pieData1 = {
    completed: { value: 60, color: "#34d399", label: "Completed" },
    pending: { value: 40, color: "#f59e0b", label: "Pending" },
  };

  const pieData2 = {
    low: { value: 30, color: "#f87171", label: "Low" },
    medium: { value: 40, color: "#fbbf24", label: "Medium" },
    high: { value: 30, color: "#34d399", label: "High" },
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Pie Chart</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Visualize parts of a whole with elegant pie and donut charts.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h3 className="font-semibold text-slate-900 dark:text-white">Simple Pie</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs text-center">
              Single value
            </p>
            <PieChart.Container data={pieData0} width={280} height={180}>
              <PieChart.Slice label={{ variant: "text" }} />
              <PieChart.Legend />
            </PieChart.Container>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h3 className="font-semibold text-slate-900 dark:text-white">Multi-segment</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs text-center">
              Low, medium, high
            </p>
            <PieChart.Container data={pieData2} width={280} height={180}>
              <PieChart.Slice label={{ variant: "text" }} />
              <PieChart.Legend />
            </PieChart.Container>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h3 className="font-semibold text-slate-900 dark:text-white">Donut Chart</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs text-center">
              Completed vs pending
            </p>
            <PieChart.Container
              data={pieData1}
              width={280}
              height={180}
              innerRadius={25}
            >
              <PieChart.Slice label={{ variant: "none" }} />
              <PieChart.Legend />
            </PieChart.Container>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-slate-900 dark:bg-slate-950 border border-slate-800">
        <CardContent className="p-6 flex flex-col gap-4 items-center">
          <h3 className="font-semibold text-white">Large Chart (600x300)</h3>
          <p className="text-slate-400 text-sm">
            Donut chart with center label
          </p>
          <PieChart.Container
            data={pieData2}
            width={600}
            height={300}
            innerRadius={50}
          >
            <PieChart.Slice label={{ variant: "text" }} />
            <PieChart.Legend />
          </PieChart.Container>
        </CardContent>
      </Card>
    </section>
  );
}

export function AreaChartExamples() {
  const areaData1 = {
    series1: {
      label: "Revenue",
      color: "#3b82f6",
      data: [
        { x: 0, y: 30 },
        { x: 1, y: 50 },
        { x: 2, y: 40 },
        { x: 3, y: 60 },
        { x: 4, y: 80 },
        { x: 5, y: 70 },
      ],
    },
  };

  const areaData2 = {
    series1: {
      label: "Revenue",
      color: "#3b82f6",
      data: [
        { x: 0, y: 30 },
        { x: 1, y: 50 },
        { x: 2, y: 40 },
        { x: 3, y: 60 },
        { x: 4, y: 80 },
        { x: 5, y: 70 },
      ],
    },
    series2: {
      label: "Expenses",
      color: "#f59e0b",
      data: [
        { x: 0, y: 20 },
        { x: 1, y: 30 },
        { x: 2, y: 25 },
        { x: 3, y: 40 },
        { x: 4, y: 50 },
        { x: 5, y: 45 },
      ],
    },
  };

  const areaData3 = {
    series1: {
      label: "Revenue",
      color: "#3b82f6",
      data: [
        { x: 0, y: 20 },
        { x: 1, y: 25 },
        { x: 2, y: 30 },
        { x: 3, y: 35 },
        { x: 4, y: 40 },
        { x: 5, y: 45 },
      ],
    },
    series2: {
      label: "Expenses",
      color: "#f59e0b",
      data: [
        { x: 0, y: 15 },
        { x: 1, y: 20 },
        { x: 2, y: 25 },
        { x: 3, y: 30 },
        { x: 4, y: 35 },
        { x: 5, y: 40 },
      ],
    },
    series3: {
      label: "Profit",
      color: "#10b981",
      data: [
        { x: 0, y: 5 },
        { x: 1, y: 5 },
        { x: 2, y: 5 },
        { x: 3, y: 5 },
        { x: 4, y: 5 },
        { x: 5, y: 5 },
      ],
    },
  };
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Area Chart</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Show cumulative data and trends with stacked or overlapping areas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h3 className="font-semibold text-slate-900 dark:text-white">Single Series</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs text-center">
              Revenue
            </p>
            <AreaChart.Container data={areaData1} width={280} height={180}>
              <AreaChart.YAxis />
              <AreaChart.XAxis />
              <AreaChart.Area dataKey="series1" label={{ variant: "circle" }} />
              <AreaChart.Legend />
            </AreaChart.Container>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h3 className="font-semibold text-slate-900 dark:text-white">Two Series</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs text-center">
              Revenue and expenses
            </p>
            <AreaChart.Container
              data={areaData2}
              width={280}
              height={180}
            >
              <AreaChart.YAxis />
              <AreaChart.XAxis />
              <AreaChart.Area dataKey="series1" label={{ variant: "circle" }} />
              <AreaChart.Area dataKey="series2" label={{ variant: "circle" }} />
              <AreaChart.Legend />
            </AreaChart.Container>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h3 className="font-semibold text-slate-900 dark:text-white">Three Series</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs text-center">
              Revenue, expenses, profit
            </p>
            <AreaChart.Container
              data={areaData3}
              width={280}
              height={180}
            >
              <AreaChart.YAxis />
              <AreaChart.XAxis />
              <AreaChart.Area dataKey="series1" label={{ variant: "circle" }} />
              <AreaChart.Area dataKey="series2" label={{ variant: "circle" }} />
              <AreaChart.Area dataKey="series3" label={{ variant: "circle" }} />
              <AreaChart.Legend />
            </AreaChart.Container>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900 dark:bg-slate-950 border border-slate-800">
        <CardContent className="p-6 flex flex-col gap-4 items-center">
          <h3 className="font-semibold text-white">Large Chart (600x400)</h3>
          <p className="text-slate-400 text-sm">
            Multi-series stacked visualization
          </p>
          <AreaChart.Container
            data={areaData3}
            width={600}
            height={400}
          >
            <AreaChart.YAxis />
            <AreaChart.XAxis />
            <AreaChart.Area dataKey="series1" label={{ variant: "circle" }} />
            <AreaChart.Area dataKey="series2" label={{ variant: "circle" }} />
            <AreaChart.Area dataKey="series3" label={{ variant: "circle" }} />
            <AreaChart.Legend />
          </AreaChart.Container>
        </CardContent>
      </Card>
    </section>
  );
}
