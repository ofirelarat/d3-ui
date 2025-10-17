import { LineChart } from "lucide-react";
import {
  HeatmapExamples,
  LineChartExamples,
  ScatterPlotExamples,
  TreemapExamples,
} from "./components/ShowCases";

// apps/docs/app/page.tsx
export default function HomePage() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Welcome to d3-ui</h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        d3-ui is a modern collection of D3-powered React components styled with
        Tailwind. Build beautiful, composable, and data-driven interfaces —
        fast.
      </p>

      <h2 className="text-xl font-semibold mb-3">Available Components</h2>
      <ul className="space-y-2">
        <li>
          <a href="/charts/line" className="text-sky-600 hover:underline">
            Line Chart
          </a>{" "}
          – Smooth responsive line charts with D3 & React.
        </li>
      </ul>

      <div>
        <HeatmapExamples />
        <LineChartExamples />
        <ScatterPlotExamples />
        <TreemapExamples />
      </div>
    </section>
  );
}
