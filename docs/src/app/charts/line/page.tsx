import { PageHeader } from "@/app/components/PageHeader";
import { Section } from "@/app/components/Section";
import LineChart from "../../../../../components/LineChart";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/Tabs";
import { CodeBlock } from "@/app/components/CodeBlock";
import path from "path";
import fs from "fs";

const data = [
  { x: 0, y: 10 },
  { x: 1, y: 30 },
  { x: 2, y: 20 },
];

// Resolve the LineChart file path
const lineChartFile = path.join(process.cwd(), "../components/LineChart.tsx");

// Read the file synchronously at build time
const lineChartCode = fs.readFileSync(lineChartFile, "utf-8");

export default function LineChartDocsPage() {
  return (
    <div className="mx-auto max-w-3xl py-16 px-6 space-y-12">
      <PageHeader
        title="Line Chart"
        subtitle="A responsive line chart built with D3.js and styled using Tailwind."
      />

      {/* Example */}
      <Section title="Example">
        <Tabs defaultValue="preview" className="w-full">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 flex justify-center">
              <LineChart data={data} />
            </div>
          </TabsContent>
          <TabsContent value="code">
            <CodeBlock
              title="Example Usage"
              code={`import LineChart from "@/components/LineChart";

const data = [
  { x: 0, y: 10 },
  { x: 1, y: 30 },
  { x: 2, y: 20 },
];

export default function Example() {
  return <LineChart data={data} />;
}`}
            />
          </TabsContent>
        </Tabs>
      </Section>

      {/* Installation */}
      <Section title="Installation">
        <Tabs defaultValue="manual" className="w-full">
          <TabsList>
            <TabsTrigger value="manual">Manual</TabsTrigger>
            <TabsTrigger value="cli">CLI</TabsTrigger>
          </TabsList>
          <TabsContent value="manual">
            <CodeBlock
              title="./components/charts/LineChart.tsx"
              code={lineChartCode}
            />
          </TabsContent>
          <TabsContent value="cli">
            <CodeBlock code="Comming Soon..." />
          </TabsContent>
        </Tabs>
      </Section>

      {/* How it works */}
      <Section title="How It Works">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          This chart uses <code>d3.scaleLinear</code> for both axes and{" "}
          <code>d3.line</code> to draw the SVG path. It automatically scales
          based on the data range. You can extend it with tooltips, transitions,
          and responsive layouts.
        </p>
      </Section>
    </div>
  );
}
