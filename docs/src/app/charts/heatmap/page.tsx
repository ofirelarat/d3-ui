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
import { HeatmapExample } from "./HeatmapExample";
import { CodeBlock } from "@/app/components/CodeBlock";
import { code } from "./HeatmapCode";

// Dynamically read source file
const filePath = path.join(process.cwd(), "../components/Heatmap.tsx");
const sourceCode = fs.readFileSync(filePath, "utf-8");

export default function HeatmapPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-12">
      <PageHeader
        title="Heatmap"
        subtitle="A heatmap chat built with D3 primitives and React."
      />

      {/* Example */}
      <Section title="Example">
        <Tabs defaultValue="preview" className="w-full">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 flex flex-col items-center gap-8">
              <HeatmapExample />
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
              defaultExpanded={false}
              title="components/charts/Heatmap.tsx"
              code={sourceCode}
            />
          </TabsContent>
        </Tabs>
      </Section>

      {/* How it works */}
      <Section title="How It Works">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          The Heatmap is built using a compound component pattern that allows
          for multiple heatmap tiles to be displayed in a single visualization.
          Each <code>Heatmap.Tile</code> component manages its own color scale
          and data visualization, while sharing the same container dimensions.
          The <code>Tooltip</code> primitive provides interactive data display
          on hover, and the <code>Legend</code> component shows all the
          different heatmap tiles and their corresponding colors.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
          The component accepts a data structure where each key represents a
          different heatmap tile, containing its own data array, color, and
          label. This allows for easy comparison between different datasets in
          the same visualization space.
        </p>
      </Section>
    </div>
  );
}
