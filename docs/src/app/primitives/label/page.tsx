"use client";

import { CodeBlock } from "@/app/components/CodeBlock";
import { Label, LabelProps, LabelVariant } from "@d3-ui/primitives/Label";

const code = `import { Label } from "@d3-ui/primitives/Label";

<Label value="Revenue" color="#2563eb" />
<Label value="Profit" color="#16a34a" variant="circle" />
<Label value="Loss" color="#dc2626" variant="square-text" />`;

const propsTable = `| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string \\| number | required | The text or value to display in the label |
| color | string | \`#000\` | The color of the label text or shape |
| variant | "text" \\| "circle" \\| "square" \\| "circle-text" \\| "square-text" \\| "none" | "text" | Defines how the label is rendered |
| x | number | 0 | X position of the label (used in SVG charts) |
| y | number | 0 | Y position of the label (used in SVG charts) |
| className | string | — | Additional Tailwind CSS classes for custom styling |
| formatter | (value: string \\| number) => React.ReactNode | — | Custom render function for the label value |`;

const typesTable = `\`\`\`typescript
type LabelVariant =
  | "text"
  | "circle"
  | "square"
  | "circle-text"
  | "square-text"
  | "none";

interface LabelProps {
  value: string | number;
  color?: string;
  variant?: LabelVariant;
  x?: number;
  y?: number;
  className?: string;
  formatter?: (value: string | number) => React.ReactNode;
}
\`\`\``;

function LabelExamples() {
  const examples = [
    { label: "Text", variant: "text", color: "#2563eb" },
    { label: "Circle", variant: "circle", color: "#16a34a" },
    { label: "Square", variant: "square", color: "#9333ea" },
    { label: "Circle + Text", variant: "circle-text", color: "#dc2626" },
    { label: "Square + Text", variant: "square-text", color: "#d97706" },
    { label: "None (Hidden)", variant: "none", color: "#64748b" },
  ];

  return (
    <div className="flex flex-wrap gap-8">
      {examples.map((ex, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <div className="border rounded-lg p-4 bg-gray-50">
            <svg width="120" height="60">
              <Label
                x={60}
                y={30}
                value={ex.label}
                color={ex.color}
                variant={ex.variant as LabelVariant}
                className="text-sm"
              />
            </svg>
          </div>
          <span className="text-sm text-gray-600">{ex.variant}</span>
        </div>
      ))}
    </div>
  );
}

export default function LabelPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Label</h1>
        <p className="text-gray-600">
          The Label primitive provides a flexible way to render labels or markers inside
          chart primitives like tiles, dots, and bars. It supports text-only, shape-only,
          and combined label variants.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Usage</h2>
        <p className="mb-4">
          You can use the <code>Label</code> component to render values or markers
          inside chart elements. The <code>variant</code> prop controls the label
          appearance:
        </p>
        <CodeBlock code={code} />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Examples</h2>
        <LabelExamples />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Props</h2>
        <div className="prose max-w-none">
          <CodeBlock code={propsTable} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Types</h2>
        <div className="prose max-w-none">
          <CodeBlock code={typesTable} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use <code>{`variant="none"`}</code> when the label should be hidden dynamically.</li>
          <li>Prefer <code>circle</code> or <code>square</code> variants for minimal markers.</li>
          <li>Use <code>circle-text</code> or <code>square-text</code> for combined visuals and labels.</li>
          <li>Leverage the <code>formatter</code> function to customize label content dynamically.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Styling</h2>
        <p>
          The Label component uses SVG elements with Tailwind CSS classes. You can control
          appearance using the <code>className</code> prop or define custom variants with
          the <code>formatter</code> callback.
        </p>
      </div>
    </div>
  );
}
