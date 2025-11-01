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
import { AreaChartExample } from "./AreaExample";
import { code } from "./AreaCode";

const areaChartFile = path.join(process.cwd(), "../components/AreaChart.tsx");
const areaChartCode = fs.readFileSync(areaChartFile, "utf-8");

export default function AreaChartDocsPage() {
  return (
    <div className="mx-auto max-w-3xl py-16 px-6 space-y-12">
      <PageHeader
        title="Area Chart"
        subtitle="A smooth, composable area chart built with D3.js and styled using Tailwind."
      />

      <Section title="Example">
        <Tabs defaultValue="preview" className="w-full">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 flex justify-center">
              <AreaChartExample />
            </div>
          </TabsContent>
          <TabsContent value="code">
            <CodeBlock defaultExpanded title="Example Usage" code={code} />
          </TabsContent>
        </Tabs>
      </Section>

      <Section title="Installation">
        <Tabs defaultValue="manual" className="w-full">
          <TabsList>
            <TabsTrigger value="manual">Manual</TabsTrigger>
            <TabsTrigger value="cli">CLI</TabsTrigger>
          </TabsList>
          <TabsContent value="manual">
            <CodeBlock
              defaultExpanded={false}
              title="./components/charts/AreaChart.tsx"
              code={areaChartCode}
            />
          </TabsContent>
          <TabsContent value="cli">
            <CodeBlock title="Coming Soon..." code="Coming Soon..." />
          </TabsContent>
        </Tabs>
      </Section>

      <Section title="How It Works">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          The Area Chart builds on the Line Chart by filling the space beneath
          the line using <code>d3.area</code>. It supports multiple series and
          automatic scaling.
        </p>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-4">
          <li><code>AreaChart.Container</code> – Provides chart context</li>
          <li><code>AreaChart.Area</code> – Draws the filled area for each series</li>
          <li><code>AreaChart.XAxis</code> and <code>AreaChart.YAxis</code> – Render chart axes</li>
          <li><code>AreaChart.Legend</code> – Displays color and label mapping</li>
        </ul>
      </Section>
    </div>
  );
}
