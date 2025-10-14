"use client";
import ScatterPlot from "@d3-ui/ScatterPlot";

// Generate some random data
const generateData = (length: number, offset = 0) =>
  Array.from({ length }, () => ({
    x: Math.random() * 100 + offset,
    y: Math.random() * 100 + offset,
  }));

// Example data structure for the scatter plot
const exampleData = {
  series1: {
    data: generateData(50),
    color: "#f87171",
    label: "Series 1",
  },
  series2: {
    data: generateData(50, 20),
    color: "#60a5fa",
    label: "Series 2",
  },
};

export const code = `import ScatterPlot from "@d3-ui/ScatterPlot";

// Example data structure for the scatter plot
const data = {
  series1: {
    data: generateData(50),
    color: "#f87171",
    label: "Series 1",
  },
  series2: {
    data: generateData(50, 20),
    color: "#60a5fa",
    label: "Series 2",
  },
};

export default function Example() {
  return (
    <ScatterPlot.Container data={data} width={600} height={400}>
      <ScatterPlot.Dots dataKey="series1" />
      <ScatterPlot.Dots dataKey="series2" />
      <ScatterPlot.XAxis />
      <ScatterPlot.YAxis />
      <ScatterPlot.Legend />
    </ScatterPlot.Container>
  );
}`;

export default function ScatterPlotExample() {
  return (
    <div className="flex flex-col items-center gap-8">
      <ScatterPlot.Container data={exampleData} width={600} height={400}>
        <ScatterPlot.Dots dataKey="series1" />
        <ScatterPlot.Dots dataKey="series2" />
        <ScatterPlot.XAxis />
        <ScatterPlot.YAxis />
        <ScatterPlot.Legend />
      </ScatterPlot.Container>
    </div>
  );
}