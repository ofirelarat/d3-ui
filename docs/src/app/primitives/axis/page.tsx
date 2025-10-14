"use client";

import { CodeBlock } from "@/app/components/CodeBlock";
import * as d3 from "d3";
import { Axis } from "@d3-ui/primitives/Axis";

const code = `import { Axis } from "@d3-ui/primitives/Axis";

// Create a linear scale
const scale = d3.scaleLinear()
  .domain([0, 100])
  .range([0, 400]);

// Basic bottom axis
<svg width={500} height={100}>
  <Axis
    scale={scale}
    orient="bottom"
    transform="translate(50, 50)"
  />
</svg>

// Left axis with more ticks
<svg width={100} height={500}>
  <Axis
    scale={scale}
    orient="left"
    transform="translate(50, 50)"
    ticks={10}
  />
</svg>
`;

const propsTable = `| Prop | Type | Default | Description |
|------|------|---------|-------------|
| scale | d3.AxisScale<d3.NumberValue> | required | The D3 scale function to use for the axis |
| orient | "bottom" \| "left" | "bottom" | The orientation of the axis |
| transform | string | "" | SVG transform string to position the axis |
| ticks | number | 5 | Number of ticks to display |`;

function AxisExamples() {
  const scale = d3.scaleLinear().domain([0, 100]).range([0, 400]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Bottom Axis</h3>
        <div className="border rounded-lg p-4 bg-gray-50">
          <svg width={500} height={100}>
            <Axis
              scale={scale}
              orient="bottom"
              transform="translate(50, 50)"
            />
          </svg>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Left Axis (with more ticks)</h3>
        <div className="border rounded-lg p-4 bg-gray-50">
          <svg width={100} height={500}>
            <Axis
              scale={scale}
              orient="left"
              transform="translate(50, 50)"
              ticks={10}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function AxisPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Axis</h1>
        <p className="text-gray-600">
          The Axis primitive component is a foundational building block for creating
          D3-based charts. It provides a flexible way to render axis lines, ticks,
          and labels using D3 scales.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Usage</h2>
        <p className="mb-4">
          The Axis component takes a D3 scale and orientation as required props,
          along with optional styling and formatting options. Here are some basic
          examples:
        </p>
        <CodeBlock code={code} />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Examples</h2>
        <AxisExamples />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Props</h2>
        <div className="prose max-w-none">
          <CodeBlock code={propsTable} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Always provide a transform prop to position your axis correctly within
            the SVG canvas.
          </li>
          <li>
            Adjust the number of ticks using the ticks prop to control the density
            of axis marks.
          </li>
          <li>
            Choose the appropriate orientation (bottom or left) based on your chart
            layout.
          </li>
          <li>
            Ensure your scale domain and range match your data and available space.
          </li>
        </ul>
      </div>
    </div>
  );
}
