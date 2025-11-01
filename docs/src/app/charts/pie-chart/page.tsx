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
import { PieChartExample } from "./PieExample";
import { code } from "./PieCode";

const pieChartFile = path.join(process.cwd(), "../components/PieChart.tsx");
const pieChartCode = fs.readFileSync(pieChartFile, "utf-8");

export default function PieChartDocsPage() {
  return (
    <div className="mx-auto max-w-3xl py-16 px-6 space-y-12">
      <PageHeader
        title="Pie Chart"
        subtitle="A composable pie chart built with D3.js arcs and Tailwind styling."
      />

      <Section title="Example">
        <Tabs defaultValue="preview" className="w-full">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 flex justify-center">
              <PieChartExample />
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
              title="./components/charts/PieChart.tsx"
              code={pieChartCode}
            />
          </TabsContent>
          <TabsContent value="cli">
            <CodeBlock title="Coming Soon..." code="Coming Soon..." />
          </TabsContent>
        </Tabs>
      </Section>

      <Section title="How It Works">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          The Pie Chart is built using <code>d3.pie</code> and{" "}
          <code>d3.arc</code> to generate slice paths. It supports labels and a
          responsive legend.
        </p>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-4">
          <li><code>PieChart.Container</code> – Provides chart context</li>
          <li><code>PieChart.Slice</code> – Renders each pie segment</li>
          <li><code>PieChart.Legend</code> – Displays series names and colors</li>
        </ul>
      </Section>
    </div>
  );
}
