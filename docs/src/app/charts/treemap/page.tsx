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
import { TreemapExample } from "./TreemapExample";
import { CodeBlock } from "@/app/components/CodeBlock";
import { code } from "./TreemapCode";
import { ChartShowcase } from "@/app/components/ChartShowcase";

// Dynamically read source file
const filePath = path.join(process.cwd(), "../components/Treemap.tsx");
const sourceCode = fs.readFileSync(filePath, "utf-8");

export default function TreemapPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-12">
      <PageHeader
        title="Treemap"
        subtitle="A flexible and composable treemap built with D3 primitives and React."
      />

      {/* Example */}
      <Section title="Example">
        <Tabs defaultValue="preview" className="w-full">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <ChartShowcase title="Treemap" description="Visualize hierarchical data using nested rectangles.">
              <TreemapExample />
            </ChartShowcase>
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
              defaultExpanded={false}
              title="components/charts/Treemap.tsx"
              code={sourceCode}
            />
          </TabsContent>
        </Tabs>
      </Section>

      {/* How it works */}
      <Section title="How It Works">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          The Treemap uses <code>d3.hierarchy</code> and <code>d3.treemap</code> 
          to calculate the spatial distribution of nested rectangles. Each leaf
          node represents a data point, and its area is proportional to its value.
          The <code>useD3Transition</code> hook ensures smooth transitions when
          data changes.
        </p>
      </Section>
    </div>
  );
}
