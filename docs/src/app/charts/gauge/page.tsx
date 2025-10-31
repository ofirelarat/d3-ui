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
import { GaugeChartExample } from "./GaugeExample";
import { code } from "./GaugeCode";

const gaugeChartFile = path.join(process.cwd(), "../components/Gauge.tsx");
const gaugeChartCode = fs.readFileSync(gaugeChartFile, "utf-8");

export default function GaugeChartDocsPage() {
  return (
    <div className="mx-auto max-w-3xl py-16 px-6 space-y-12">
      <PageHeader
        title="Gauge Chart"
        subtitle="A flexible and composable gauge chart (like a speedometer) built with D3.js and styled using Tailwind."
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
              <GaugeChartExample />
            </div>
          </TabsContent>
          <TabsContent value="code">
            <CodeBlock
              defaultExpanded={true}
              title="Example Usage"
              code={code}
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
            <div className="space-y-4">
              <CodeBlock
                defaultExpanded={false}
                title="./components/charts/GaugeChart.tsx"
                code={gaugeChartCode}
              />
            </div>
          </TabsContent>
          <TabsContent value="cli">
            <CodeBlock title="Coming Soon..." code="Coming Soon..." />
          </TabsContent>
        </Tabs>
      </Section>

      {/* How it works */}
      <Section title="How It Works">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          The GaugeChart uses a compound component pattern for flexibility and
          composability. It is built using <code>d3.scaleLinear</code> to map
          values to angles and <code>d3.arc</code> to draw the SVG arcs.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          The main components are:
        </p>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-4">
          <li>
            <code>GaugeChart.Container</code> - The main container that provides
            context and layout for all child components
          </li>
          <li>
            <code>GaugeChart.Arc</code> - Renders the gauge arcs (background and
            data segments)
          </li>
          <li>
            <code>GaugeChart.Needle</code> - Renders the needle indicating the
            current value
          </li>
          <li>
            <code>GaugeChart.Label</code> - Displays a central value label
          </li>
          <li>
            <code>GaugeChart.Legend</code> - Optional legend showing segment
            labels and colors
          </li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Each segment can have its own color and label. The arcs and needle are
          animated using the <code>useD3Transition</code> hook. The chart
          automatically scales based on the defined <code>min</code> and{" "}
          <code>max</code> values.
        </p>
      </Section>
    </div>
  );
}
