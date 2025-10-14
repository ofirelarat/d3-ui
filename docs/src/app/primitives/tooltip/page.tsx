"use client";

import { CodeBlock } from "@/app/components/CodeBlock";
import { useState } from "react";
import { TooltipProvider, useTooltip } from "@d3-ui/primitives/Tooltip";

const code = `import { TooltipProvider, useTooltip } from "@d3-ui/primitives/Tooltip";

// Wrap your app or component with TooltipProvider
function App() {
  return (
    <TooltipProvider>
      <YourComponent />
    </TooltipProvider>
  );
}

// Use the tooltip in your component
function YourComponent() {
  const { show, hide } = useTooltip();

  return (
    <div
      onMouseEnter={(e) => show({
        title: "Data Point",
        content: "Value: 42",
        color: "#2563eb"
      }, e)}
      onMouseLeave={hide}
    >
      Hover me
    </div>
  );
}`;

const contextCode = `// Using the TooltipProvider
<TooltipProvider>
  <Chart />
</TooltipProvider>

// Inside a chart component
const { show, hide } = useTooltip();

// Show tooltip with options
show({
  title: "Data Point",    // Optional title
  content: "Value: 42",   // Required content
  color: "#2563eb"       // Optional color for indicator
}, event);

// Hide tooltip
hide();`;

const propsTable = `| Component/Hook | Props/Return | Type | Description |
|----------------|--------------|------|-------------|
| TooltipProvider | children | ReactNode | The components that need tooltip functionality |
| TooltipProvider | className | string? | Optional class for the container |
| TooltipProvider | contentClassName | string? | Optional class for the tooltip content |
| useTooltip | show | (options: TooltipOptions, event: MouseEvent) => void | Function to show the tooltip |
| useTooltip | hide | () => void | Function to hide the tooltip |`;

const typesTable = `\`\`\`typescript
interface TooltipOptions {
  content: string;     // Main content of the tooltip
  title?: string;      // Optional title text
  color?: string;      // Optional color for the indicator dot
}

// Example usage:
const options = {
  content: "Population: 1,234,567",
  title: "New York",
  color: "#2563eb"
};
\`\`\``;

function TooltipExample() {
  const items = [
    { label: "Revenue", value: "$50,000", color: "#2563eb" },
    { label: "Profit", value: "$20,000", color: "#16a34a" },
    { label: "Loss", value: "$5,000", color: "#dc2626" },
  ];

  return (
    <TooltipProvider>
      <div className="flex gap-4">
        {items.map((item) => (
          <TooltipItem key={item.label} {...item} />
        ))}
      </div>
    </TooltipProvider>
  );
}

function TooltipItem({ label, value, color }: { label: string; value: string; color: string }) {
  const { show, hide } = useTooltip();

  return (
    <div
      className="w-24 h-24 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
      style={{ backgroundColor: color }}
      onMouseEnter={(e) =>
        show(
          {
            title: label,
            content: value,
            color: color,
          },
          e
        )
      }
      onMouseLeave={hide}
    >
      <span className="text-white font-medium">{label}</span>
    </div>
  );
}

export default function TooltipPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Tooltip</h1>
        <p className="text-gray-600">
          The Tooltip primitive component provides a flexible way to show contextual
          information when users hover over elements. It uses React Context for state
          management and supports customizable content with titles and color indicators.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Usage</h2>
        <p className="mb-4">
          The Tooltip system consists of a provider component and a hook. Wrap your
          application or chart component with TooltipProvider, then use the useTooltip
          hook to show and hide tooltips:
        </p>
        <CodeBlock code={code} />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Example</h2>
        <p className="mb-4">Hover over the boxes to see tooltips in action:</p>
        <TooltipExample />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Context Usage</h2>
        <p className="mb-4">
          The tooltip system uses React Context to manage state. Here's how to
          implement it in your components:
        </p>
        <CodeBlock code={contextCode} />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Props & Methods</h2>
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
            Always wrap components that use tooltips with TooltipProvider at an
            appropriate level in your component tree.
          </li>
          <li>
            Keep tooltip content concise and relevant to the hovered element.
          </li>
          <li>
            Use the color indicator when you want to associate the tooltip with a
            specific data series or category.
          </li>
          <li>
            Remember to call hide() when the mouse leaves the target element.
          </li>
          <li>
            Consider using titles for categorical information and content for
            detailed values.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Styling</h2>
        <p>
          The Tooltip component uses Tailwind CSS for styling and includes built-in
          dark mode support. You can customize the appearance using the
          contentClassName prop on TooltipProvider. The tooltip automatically
          positions itself relative to the mouse cursor and handles overflow.
        </p>
      </div>
    </div>
  );
}
