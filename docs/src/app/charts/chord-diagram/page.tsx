import React from "react";
import { PageHeader } from "@/app/components/PageHeader";
import { Section } from "@/app/components/Section";
import { ChartShowcase } from "@/app/components/ChartShowcase";
import fs from "fs";
import path from "path";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/Tabs";
import { CodeBlock } from "@/app/components/CodeBlock";
import { ChordChartExample } from "./ChordExample";
import { code } from "./ChordCode";

const chordChartFile = path.join(process.cwd(), "../components/ChordDiagram.tsx");
const chordChartCode = fs.readFileSync(chordChartFile, "utf-8");

export default function ChordDiagramDocsPage() {
  return (
    <div className="mx-auto max-w-5xl py-12 px-6 space-y-16">
      <PageHeader
        title="Chord Diagram"
        subtitle="A beautiful circular chart representing flows between categories. Supports directed and undirected modes."
      />

      <Section title="Example">
        <Tabs defaultValue="preview" className="w-full">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <ChartShowcase 
              title="Relationship Flow" 
              description="Visualize complex relational data and migration flows with elegant ribbons and circular transitions."
            >
              <ChordChartExample />
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
              title="./components/charts/ChordDiagram.tsx"
              code={chordChartCode}
            />
          </TabsContent>
          <TabsContent value="cli">
            <CodeBlock title="Coming Soon..." code="Coming Soon..." />
          </TabsContent>
        </Tabs>
      </Section>

      <Section title="Key Features">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Directed Support</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Toggle between standard and directed modes. Directed mode uses d3.chordDirected and ribbonArrow for asymmetrical flows.
            </p>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Premium Gradients</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Ribbons use color gradients transitions between source and target, making it easy to trace flows.
            </p>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Seamless Transitions</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Built with useD3GroupTransition for smooth, animated updates when switching between modes or updating data.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Data Format">
        <CodeBlock 
          title="ChordData interface" 
          code={`export interface ChordRibbon {
  label: string; // Target label
  sourceValue: number; // Flow from source to target
  targetValue: number; // Flow from target back to source
  color?: string; // Optional custom color
}

export interface ChordSeries extends Omit<SeriesBase, "color"> {
  color?: string;
  ribbons: ChordRibbon[];
}

export type ChordData = ChordSeries[];`}
        />
      </Section>

      <Section title="Components Reference">
         <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-4 leading-relaxed">
          <li>
            <strong className="text-slate-900 dark:text-slate-100">ChordDiagram.Container</strong> – Sets up the chord layout and scale.
            <div className="mt-1 text-sm opacity-80 italic">Prop: directed?: boolean, width?: number, height?: number</div>
          </li>
          <li>
            <strong className="text-slate-900 dark:text-slate-100">ChordDiagram.Groups</strong> – Renders the circular arcs for each category. Supports tooltips.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-slate-100">ChordDiagram.Ribbons</strong> – Renders the connection paths in the center. Supports tooltips and automated gradients.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-slate-100">ChordDiagram.Legend</strong> – Displays the names and colors.
          </li>
        </ul>
      </Section>
    </div>
  );
}
