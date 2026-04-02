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
import { BarChartExample } from "./BarExample";
import { code } from "./BarCode";
import { ChartShowcase } from "@/app/components/ChartShowcase";

const barChartFile = path.join(process.cwd(), "../components/BarChart.tsx");
const barChartCode = fs.readFileSync(barChartFile, "utf-8");

export default function BarChartDocsPage() {
  return (
    <div className="mx-auto max-w-4xl py-16 px-6 space-y-16">
      <PageHeader
        title="Bar Chart"
        subtitle="A composable and responsive bar chart built with D3.js and Tailwind CSS."
      />


      <Section title="Example">
        <Tabs defaultValue="preview" className="w-full">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <ChartShowcase
              title="Customizable Bar Chart"
              description="Experiment with different themes and watch the chart transform."
            >
              <BarChartExample />
            </ChartShowcase>
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
              title="./components/charts/BarChart.tsx"
              code={barChartCode}
            />
          </TabsContent>
          <TabsContent value="cli">
            <CodeBlock title="Coming Soon..." code="Coming Soon..." />
          </TabsContent>
        </Tabs>
      </Section>

      <Section title="Usage">
        <CodeBlock defaultExpanded title="Example Usage" code={code} />
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
              title="./components/charts/BarChart.tsx"
              code={barChartCode}
            />
          </TabsContent>
          <TabsContent value="cli">
            <CodeBlock title="Coming Soon..." code="Coming Soon..." />
          </TabsContent>
        </Tabs>
      </Section>

      <Section title="How It Works">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          The Bar Chart uses <code>d3.scaleBand</code> for categorical X-axis
          and <code>d3.scaleLinear</code> for the Y-axis to map bar heights.
        </p>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-4">
          <li><code>BarChart.Container</code> – Chart context provider</li>
          <li><code>BarChart.Bar</code> – Renders each bar for a data key</li>
          <li><code>BarChart.XAxis</code> / <code>YAxis</code> – Axis rendering</li>
          <li><code>BarChart.Legend</code> – Displays color-to-series mapping</li>
        </ul>
      </Section>
    </div>
  );
}
