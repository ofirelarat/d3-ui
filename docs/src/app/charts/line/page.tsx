import { PageHeader } from "@/app/components/PageHeader";
import { Section } from "@/app/components/Section";
import fs from "fs";
import path from "path";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/Tabs";
import { CodeBlock } from "@/app/components/CodeBlock";
import { LineChartExample, code } from "./LineChartExample";

// Dynamically read source file
const lineChartFile = path.join(process.cwd(), "../components/LineChart.tsx");
const lineChartCode = fs.readFileSync(lineChartFile, "utf-8");

export default function LineChartDocsPage() {
  return (
    <div className="mx-auto max-w-3xl py-16 px-6 space-y-12">
      <PageHeader
        title="Line Chart"
        subtitle="A flexible and composable line chart built with D3.js and styled using Tailwind."
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
              <LineChartExample />
            </div>
          </TabsContent>
          <TabsContent value="code">
            <CodeBlock title="Example Usage" code={code} />
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
            <CodeBlock code="Coming Soon..." />
          </TabsContent>
        </Tabs>
      </Section>

      {/* How it works */}
      <Section title="How It Works">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          This chart uses a compound component pattern to provide maximum
          flexibility and composability. The chart is built using{" "}
          <code>d3.scaleLinear</code> for both axes and <code>d3.line</code> to
          draw the SVG paths.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          The main components are:
        </p>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-4">
          <li>
            <code>LineChart.Container</code> - The main container that provides
            context for all child components
          </li>
          <li>
            <code>LineChart.Line</code> - Renders a single line series with data
            points
          </li>
          <li>
            <code>LineChart.XAxis</code> - Renders the X axis
          </li>
          <li>
            <code>LineChart.YAxis</code> - Renders the Y axis
          </li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Each line series can have its own color and label, which automatically
          updates the legend. The chart automatically scales based on the
          combined data range of all series.
        </p>
      </Section>
    </div>
  );
}
