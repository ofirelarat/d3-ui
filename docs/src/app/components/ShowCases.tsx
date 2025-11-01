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
    <div className="flex flex-col gap-10 p-8">
      <h1 className="text-3xl font-bold">Heatmap Examples</h1>
      <p className="text-gray-600">
        The Heatmap component visualizes dense data grids with color gradients
        and labels. Below are several examples showing how props and styles
        change its appearance.
      </p>
      <div className="flex gap-4 flex-wrap">
        <Card className="w-[280px]">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2">Basic Heatmap</h2>
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
        <Card className="w-[280px]">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2">Hidden Labels</h2>
            <p className="text-gray-500 text-sm">
              Using <code>{`label.variant="none"`}</code> hides labels
              completely.
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
        <Card className="w-[280px]">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2">
              Custom Label Formatting
            </h2>
            <p className="text-gray-500 text-sm">
              Use <code>labelFormatter</code> to format cell values (e.g., add %
              or $).
            </p>
            <Heatmap.Container
              data={{ loss: baseData.loss }}
              width={140}
              height={140}
            >
              <Heatmap.Tile
                dataKey="loss"
                label={{
                  labelFormatter: (v) => <div className="text-sm">${v}</div>,
                  variant: "text",
                }}
              />
              <Heatmap.Legend />
            </Heatmap.Container>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-gray-900 text-white">
        <CardContent className="p-6 flex flex-col gap-4 items-center">
          <h2 className="text-xl font-semibold mb-2 text-white">
            Dark Mode Heatmap
          </h2>
          <p className="text-gray-400 text-sm">
            A larger heatmap (600x600) with high-contrast colors.
          </p>
          <Heatmap.Container data={darkData} width={600} height={600}>
            <Heatmap.Tile dataKey="energy" label={{ variant: "text" }} />
            <Heatmap.Tile dataKey="water" label={{ variant: "text" }} />
            <Heatmap.Tile dataKey="waste" label={{ variant: "text" }} />
            <Heatmap.Legend />
          </Heatmap.Container>
        </CardContent>
      </Card>
    </div>
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
    <div className="flex flex-col gap-10 p-8">
      <h1 className="text-3xl font-bold">Line Chart Examples</h1>
      <p className="text-gray-600">
        The LineChart component visualizes trends over time or sequential data.
        Below are examples with multiple lines, single line, and custom labels.
      </p>

      <div className="flex gap-4 flex-wrap">
        <Card className="w-[280px]">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2">Multiple Lines</h2>
            <p className="text-gray-500 text-sm">
              Shows sales, profit, and loss together with different colors.
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

        <Card className="w-[280px]">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2">Single Line</h2>
            <p className="text-gray-500 text-sm">
              A single line representing revenue over time.
            </p>
            <LineChart.Container data={singleLineData} width={280} height={180}>
              <LineChart.Line dataKey="revenue" />
              <LineChart.XAxis />
              <LineChart.YAxis />
              <LineChart.Legend />
            </LineChart.Container>
          </CardContent>
        </Card>

        <Card className="w-[280px]">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2">Custom Labels</h2>
            <p className="text-gray-500 text-sm">
              Labels formatted with a currency symbol.
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

        {/* Example 4: Dark mode / large chart */}
        <Card className="bg-gray-900 text-white w-full">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2 text-white">
              Dark Mode Chart
            </h2>
            <p className="text-gray-400 text-sm">
              Large chart (600x300) with multiple lines for high contrast
              viewing.
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
      </div>
    </div>
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
    <div className="flex flex-col gap-10 p-8">
      <h1 className="text-3xl font-bold">Scatter Plot Examples</h1>
      <p className="text-gray-600">
        The ScatterPlot component visualizes individual points and trends in
        data. Below are examples with multiple series, single series, and custom
        labels.
      </p>

      <div className="flex gap-4 flex-wrap">
        <Card className="w-[280px]">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2">Multiple Series</h2>
            <p className="text-gray-500 text-sm">
              Sales, profit, and loss points shown together with different
              colors.
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
        <Card className="w-[280px]">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2">Single Series</h2>
            <p className="text-gray-500 text-sm">
              Only revenue points over time.
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

        <Card className="w-[280px]">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2">Custom Labels</h2>
            <p className="text-gray-500 text-sm">
              Show points with currency labels.
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

        {/* Example 4: Dark mode / large plot */}
        <Card className="bg-gray-900 text-white w-full">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2 text-white">
              Dark Mode Scatter
            </h2>
            <p className="text-gray-400 text-sm">
              Large scatter plot (600x300) with multiple series and high
              contrast colors.
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
      </div>
    </div>
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
      <p className="text-gray-600">
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
            <p className="text-gray-500 text-sm">
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
            <p className="text-gray-500 text-sm">
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
      <p className="text-gray-600">
        The GaugeChart component visualizes values on a semi-circular gauge.
        Below are examples with multiple segments, dynamic needles, and dark
        mode.
      </p>

      <div className="flex gap-4 flex-wrap">
        <Card className="w-[280px]">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2">Simple Gauge</h2>
            <p className="text-gray-500 text-sm">
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
            <p className="text-gray-500 text-sm">
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
            <p className="text-gray-500 text-sm">
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
    <div className="flex flex-col gap-10 p-8">
      <h1 className="text-3xl font-bold">Bar Chart Examples</h1>
      <p className="text-gray-600">
        Examples show how different props and styles change its appearance.
      </p>
      <div className="flex gap-4 flex-wrap">
        {/* Small Spread Chart */}
        <Card className="w-[280px]">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold">Grouped Bar Chart</h2>
            <BarChart.Container
              data={barData}
              variant="spread"
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

        {/* Small Stacked Chart */}
        <Card className="w-[280px]">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold">Stacked Bar Chart</h2>
            <BarChart.Container
              data={barData}
              variant="stacked"
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

        {/* Small Dynamic Bar */}
        <Card className="w-[280px]">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold">Dynamic Value Bar</h2>
            <BarChart.Container
              data={{
                apples: {
                  ...barData.apples,
                  data: [{ x: "Jan", y: dynamicValue }],
                },
              }}
              variant="spread"
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

      {/* Big Dark Chart */}
      <Card className="bg-gray-900 text-white w-full">
        <CardContent className="p-6 flex flex-col gap-4 items-center">
          <h2 className="text-xl font-semibold text-white">
            Big Dark Stacked Bar
          </h2>
          <BarChart.Container
            data={barData}
            variant="stacked"
            width={600}
            height={300}
          >
            <BarChart.Bar dataKey="apples" />
            <BarChart.Bar dataKey="oranges" />
            <BarChart.XAxis />
            <BarChart.YAxis />
            <BarChart.Legend />
          </BarChart.Container>
        </CardContent>
      </Card>
    </div>
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
    <div className="flex flex-col gap-10 p-8">
      <h1 className="text-3xl font-bold">Pie Chart Examples</h1>
      <p className="text-gray-600">
        Examples show how different props and styles change its appearance.
      </p>
      <div className="flex gap-4 flex-wrap">
        {/* Simple Pie */}
        <Card className="w-[280px]">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold">Simple Pie</h2>
            <PieChart.Container data={pieData0} width={280} height={180}>
              <PieChart.Slice label={{ variant: "text" }} />
              <PieChart.Legend />
            </PieChart.Container>
          </CardContent>
        </Card>

        {/* Multi-segment Pie */}
        <Card className="w-[280px]">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold">Multi-segment Pie</h2>
            <PieChart.Container data={pieData2} width={280} height={180}>
              <PieChart.Slice label={{ variant: "text" }} />
              <PieChart.Legend />
            </PieChart.Container>
          </CardContent>
        </Card>

        {/* Dynamic Pie */}
        <Card className="w-[280px]">
          <CardContent className="p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold">Dynamic Pie</h2>
            <PieChart.Container data={pieData1} width={280} height={180}>
              <PieChart.Slice label={{ variant: "text" }} />
              <PieChart.Legend />
            </PieChart.Container>
          </CardContent>
        </Card>
      </div>
      {/* Big Dark Pie */}
      <Card className="bg-gray-900 text-white w-full">
        <CardContent className="p-6 flex flex-col gap-4 items-center">
          <h2 className="text-xl font-semibold text-white">Big Dark Pie</h2>
          <PieChart.Container data={pieData2} width={600} height={300}>
            <PieChart.Slice label={{ variant: "text" }} />
            <PieChart.Legend />
          </PieChart.Container>
        </CardContent>
      </Card>
    </div>
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
    <div className="flex flex-col gap-10 p-8">
      <h1 className="text-3xl font-bold">Area Chart Examples</h1>
      <p className="text-gray-600">
        Demonstrating stacked and multi-series area charts, with labels and
        legends.
      </p>

      {/* Small charts row */}
      <div className="flex gap-4 flex-wrap">
        <Card className="w-[280px]">
          <CardContent className="p-4 flex flex-col gap-2 items-center">
            <h2 className="text-lg font-semibold">Single Series</h2>
            <AreaChart.Container data={areaData1} width={280} height={180}>
              <AreaChart.YAxis />
              <AreaChart.XAxis />
              <AreaChart.Area dataKey="series1" label={{ variant: "circle" }} />
              <AreaChart.Legend />
            </AreaChart.Container>
          </CardContent>
        </Card>

        <Card className="w-[280px]">
          <CardContent className="p-4 flex flex-col gap-2 items-center">
            <h2 className="text-lg font-semibold">Two Series Stacked</h2>
            <AreaChart.Container
              data={areaData2}
              width={280}
              height={180}
              variant="stacked"
            >
              <AreaChart.YAxis />
              <AreaChart.XAxis />
              <AreaChart.Area dataKey="series1" label={{ variant: "circle" }} />
              <AreaChart.Area dataKey="series2" label={{ variant: "circle" }} />
              <AreaChart.Legend />
            </AreaChart.Container>
          </CardContent>
        </Card>

        <Card className="w-[280px]">
          <CardContent className="p-4 flex flex-col gap-2 items-center">
            <h2 className="text-lg font-semibold">Three Series Spread</h2>
            <AreaChart.Container
              data={areaData3}
              width={280}
              height={180}
              variant="spread"
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

      {/* Large dark background chart */}
      <Card className="bg-gray-900 text-white w-full">
        <CardContent className="p-6 flex flex-col gap-4 items-center">
          <h2 className="text-xl font-semibold text-white">
            Large Stacked Chart
          </h2>
          <AreaChart.Container
            data={areaData3}
            width={600}
            height={400}
            variant="stacked"
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
  );
}
