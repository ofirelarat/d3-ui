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
import ScatterPlotExample, { code } from "./ScatterPlotExample";

// Dynamically read source file
const filePath = path.join(process.cwd(), "../components/ScatterPlot.tsx");
const sourceCode = fs.readFileSync(filePath, "utf-8");

export default function ScatterPlotDocsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-12">
      <PageHeader
        title="Scatter Plot"
        subtitle="A scatter plot built with D3 primitives and React."
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
              <ScatterPlotExample />
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
          </TabsList>
          <TabsContent value="manual">
            <CodeBlock
              title="components/charts/ScatterPlot.tsx"
              code={sourceCode}
            />
          </TabsContent>
        </Tabs>
      </Section>

      {/* How it works */}
      <Section title="How It Works">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          This chart uses <code>Axis</code> and <code>Tooltip</code> primitives
          to render axes and show interactive data points. Each circle
          represents a data point and shows its values on hover. The axes scale
          dynamically based on the data extent.
        </p>
      </Section>
    </div>
  );
}
