"use client";

import { CodeBlock } from "@/app/components/CodeBlock";
import { Legend } from "@d3-ui/primitives/Legend";

const code = `import { Legend } from "@d3-ui/primitives/Legend";

const items = [
  { label: "Revenue", color: "#2563eb" },
  { label: "Profit", color: "#16a34a" },
  { label: "Loss", color: "#dc2626" },
];

<Legend items={items} />`;

const propsTable = `| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | Array<{ label: string; color: string; }> | required | Array of legend items, each with a label and color |`;

const typesTable = `\`\`\`typescript
interface LegendItem {
  label: string;  // Text to display for the legend item
  color: string;  // CSS color value for the legend item's marker
}

interface LegendProps {
  items: LegendItem[];  // Array of legend items to display
}
\`\`\``;

function LegendExamples() {
  const simpleItems = [
    { label: "Revenue", color: "#2563eb" },
    { label: "Profit", color: "#16a34a" },
    { label: "Loss", color: "#dc2626" },
  ];

  const manyItems = [
    { label: "Monday", color: "#2563eb" },
    { label: "Tuesday", color: "#16a34a" },
    { label: "Wednesday", color: "#dc2626" },
    { label: "Thursday", color: "#9333ea" },
    { label: "Friday", color: "#d97706" },
    { label: "Saturday", color: "#0891b2" },
    { label: "Sunday", color: "#be185d" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Legend</h3>
        <div className="border rounded-lg p-4 bg-gray-50 dark:bg-slate-900 dark:border-slate-800">
          <Legend items={simpleItems} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Multi-row Legend</h3>
        <div className="border rounded-lg p-4 bg-gray-50 dark:bg-slate-900 dark:border-slate-800">
          <Legend items={manyItems} />
        </div>
      </div>
    </div>
  );
}

export default function LegendPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Legend</h1>
        <p className="text-gray-600 dark:text-slate-400">
          The Legend primitive component provides a flexible way to display a color-coded
          legend for charts and visualizations. It automatically handles wrapping and
          responsive layout of legend items.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Usage</h2>
        <p className="mb-4">
          The Legend component accepts an array of items, each with a label and color.
          It will automatically lay out the items in a responsive grid:
        </p>
        <CodeBlock code={code} />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Examples</h2>
        <LegendExamples />
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
          <li>
            Use clear, descriptive labels that match your data series or categories.
          </li>
          <li>
            Choose distinct colors that are easily distinguishable from each other.
          </li>
          <li>
            Consider using semantic colors where appropriate (e.g., red for negative
            values, green for positive).
          </li>
          <li>
            Keep the number of legend items reasonable to maintain readability.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Styling</h2>
        <p>
          The Legend component uses Tailwind CSS classes for styling and automatically
          handles dark mode. The legend markers are rounded squares, and the text
          color adjusts based on the color scheme.
        </p>
      </div>
    </div>
  );
}
