// apps/docs/app/charts/line/page.tsx
"use client";

import LineChart from "../../../../../components/LineChart";
import CodeBlock from "../../components/CodeBlock";

const sample = [
  { x: 0, y: 10 },
  { x: 1, y: 25 },
  { x: 2, y: 40 },
  { x: 3, y: 35 },
  { x: 4, y: 50 },
];

const codeSnippet = `npm install d3 clsx

# Then copy this component file:
# components/LineChart.tsx
`;

export default function LineChartDocsPage() {
  return (
    <article className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Line Chart</h1>
      <p className="text-gray-600 mb-8">
        The <strong>LineChart</strong> component provides a smooth and flexible
        D3-powered line visualization that integrates seamlessly with Tailwind.
      </p>

      <div className="mb-8">
        <h2 className="font-semibold mb-2">Example</h2>
        <div className="border rounded-lg p-4 bg-white">
          <LineChart data={sample} />
        </div>
      </div>

      <h2 className="font-semibold mb-2">Installation</h2>
      <CodeBlock code={codeSnippet} />

      <h2 className="font-semibold mt-8 mb-2">Usage</h2>
      <CodeBlock
        code={`import LineChart from "@/components/LineChart";

const data = [
  { x: 0, y: 10 },
  { x: 1, y: 25 },
  { x: 2, y: 40 },
];

<LineChart data={data} />`}
      />
    </article>
  );
}
