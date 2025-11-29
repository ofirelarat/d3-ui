import { PageHeader } from "@/app/components/PageHeader";
import { Section } from "@/app/components/Section";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/Tabs";
import { CodeBlock } from "@/app/components/CodeBlock";

export default function UseD3GroupTransitionPage() {
  return (
    <div className="py-12 space-y-16">
      <PageHeader
        title="useD3GroupTransition"
        subtitle="A React hook for applying staggered D3 transitions to groups of SVG elements"
      />

      <Section title="Overview">
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          <code className="bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded text-sm font-mono">
            useD3GroupTransition
          </code>{" "}
          is designed for animating multiple elements simultaneously with
          optional staggering and randomization. Perfect for creating entrance
          animations, cascading effects, and coordinated transitions across
          multiple DOM elements.
        </p>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          It automatically selects child elements using CSS selectors and
          applies transitions with built-in support for delay calculations.
        </p>
      </Section>

      <Section title="Basic Usage">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Example</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="basic">
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                A simple example showing how to stagger animations across
                multiple circles:
              </p>
              <div className="bg-white dark:bg-slate-950 p-4 rounded border border-slate-200 dark:border-slate-800">
                <pre className="text-xs font-mono text-slate-700 dark:text-slate-300 overflow-x-auto">
                  {`<g ref={groupRef}>
  <circle cx="50" cy="50" r="10" fill="blue" />
  <circle cx="100" cy="50" r="10" fill="blue" />
  <circle cx="150" cy="50" r="10" fill="blue" />
</g>`}
                </pre>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="code">
            <CodeBlock
              title="Basic Staggered Animation"
              code={`import { useD3GroupTransition } from '@d3-ui/hooks';
import { useState } from 'react';

export function StaggeredCircles() {
  const [isActive, setIsActive] = useState(false);

  const ref = useD3GroupTransition<SVGCircleElement>({
    selector: 'circle',
    duration: 600,
    stagger: true,
    randomize: true,
    apply: (t) => t
      .attr('opacity', isActive ? 1 : 0)
      .attr('r', isActive ? 20 : 10),
    deps: [isActive],
  });

  return (
    <svg width="200" height="100">
      <g ref={ref}>
        <circle cx="50" cy="50" r="10" fill="blue" />
        <circle cx="100" cy="50" r="10" fill="blue" />
        <circle cx="150" cy="50" r="10" fill="blue" />
      </g>
    </svg>
  );
}`}
            />
          </TabsContent>
        </Tabs>
      </Section>

      <Section title="API Reference">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4 text-lg">
              Options
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="font-mono font-semibold text-sm text-slate-900 dark:text-white mb-2">
                  selector?: string
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  {`CSS selector to find child elements. Defaults to <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">"*"</code> (all children).`}
                </p>
                <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-xs font-mono text-slate-700 dark:text-slate-300">
                  selector: 'circle' // Selects all circle elements
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="font-mono font-semibold text-sm text-slate-900 dark:text-white mb-2">
                  duration?: number
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Duration of each transition in milliseconds. Defaults to{" "}
                  <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">
                    600
                  </code>
                  .
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="font-mono font-semibold text-sm text-slate-900 dark:text-white mb-2">
                  ease?: (t: number) =&gt; number
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Easing function. Defaults to{" "}
                  <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">
                    d3.easeCubicInOut
                  </code>
                  .
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="font-mono font-semibold text-sm text-slate-900 dark:text-white mb-2">
                  stagger?: boolean
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Whether to stagger animations. Defaults to{" "}
                  <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">
                    true
                  </code>
                  .
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="font-mono font-semibold text-sm text-slate-900 dark:text-white mb-2">
                  randomize?: boolean
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Add random offset to stagger delay. Defaults to{" "}
                  <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">
                    true
                  </code>
                  .
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="font-mono font-semibold text-sm text-slate-900 dark:text-white mb-2">
                  before?: (selection) =&gt; void
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Optional function executed before transitions start. Applied
                  to all selected elements.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="font-mono font-semibold text-sm text-slate-900 dark:text-white mb-2">
                  apply: (transition) =&gt; void
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Function that applies the transition. Required. Receives a D3
                  transition object.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="font-mono font-semibold text-sm text-slate-900 dark:text-white mb-2">
                  deps?: React.DependencyList
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  React dependency array. Transitions run when dependencies
                  change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Common Patterns">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
              Entrance Animation (No Stagger)
            </h3>
            <CodeBlock
              code={`const ref = useD3GroupTransition<SVGRectElement>({
  selector: 'rect',
  duration: 800,
  stagger: false,  // All animate simultaneously
  apply: (t) => t
    .attr('opacity', 1)
    .attr('y', (_, i) => i * 30),
  deps: [data],
});`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
              Fade In with Stagger
            </h3>
            <CodeBlock
              code={`const ref = useD3GroupTransition<SVGTextElement>({
  selector: 'text',
  duration: 600,
  stagger: true,
  randomize: false,  // Predictable order
  apply: (t) => t
    .attr('opacity', 1)
    .attr('transform', (_, i) => \`translate(0, \${i * 20})\`),
  deps: [items],
});`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
              Cascade Effect with Initial State
            </h3>
            <CodeBlock
              code={`const ref = useD3GroupTransition<SVGCircleElement>({
  selector: 'circle',
  duration: 800,
  before: (sel) => {
    sel
      .attr('opacity', 0)
      .attr('r', 5);
  },
  apply: (t) => t
    .attr('opacity', 1)
    .attr('r', 15),
  deps: [data],
});`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
              Color Transition with Stagger
            </h3>
            <CodeBlock
              code={`const ref = useD3GroupTransition<SVGRectElement>({
  selector: 'rect',
  duration: 1000,
  stagger: true,
  randomize: true,
  apply: (t) => t
    .attr('fill', '#3b82f6')
    .attr('width', 100),
  deps: [activeIndex],
});`}
            />
          </div>
        </div>
      </Section>

      <Section title="Real-World Example">
        <CodeBlock
          title="Animated Chart Bars with Stagger"
          code={`import { useD3GroupTransition } from '@d3-ui/hooks';
import * as d3 from 'd3';
import { useMemo } from 'react';

interface BarChartProps {
  data: number[];
  width: number;
  height: number;
}

export function AnimatedBarChart({ data, width, height }: BarChartProps) {
  const yScale = useMemo(() => 
    d3.scaleLinear()
      .domain([0, Math.max(...data)])
      .range([0, height - 60]),
    [data, height]
  );

  const xScale = useMemo(() => 
    d3.scaleBand()
      .domain(data.map((_, i) => i.toString()))
      .range([0, width])
      .padding(0.2),
    [data, width]
  );

  const ref = useD3GroupTransition<SVGRectElement>({
    selector: 'rect',
    duration: 800,
    stagger: true,
    randomize: false,
    before: (sel) => {
      sel
        .attr('y', height - 40)
        .attr('height', 0)
        .attr('opacity', 0);
    },
    apply: (t) => t
      .attr('y', (_, i) => height - 40 - yScale(data[i]))
      .attr('height', (_, i) => yScale(data[i]))
      .attr('opacity', 1),
    deps: [data],
  });

  return (
    <svg width={width} height={height}>
      <g ref={ref}>
        {data.map((value, i) => (
          <rect
            key={i}
            x={xScale(i.toString())}
            width={xScale.bandwidth()}
            fill="#3b82f6"
          />
        ))}
      </g>
      {/* X-axis label */}
      <line
        x1="0"
        x2={width}
        y1={height - 40}
        y2={height - 40}
        stroke="currentColor"
      />
    </svg>
  );
}`}
        />
      </Section>

      <Section title="Stagger Delay Calculation">
        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            When{" "}
            <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">
              stagger: true
            </code>
            , the delay for each element is calculated as:
          </p>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded mb-4">
            <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
              {`baseDelay = (index / totalElements) * duration * 0.8
randomOffset = randomize ? Math.random() * 200 : 0
totalDelay = baseDelay + randomOffset`}
            </pre>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            This creates a cascading effect where elements start one after
            another, with the randomOffset adding natural variance to the
            timing.
          </p>
        </div>
      </Section>

      <Section title="Performance Tips">
        <ul className="list-disc pl-6 space-y-3 text-slate-600 dark:text-slate-400">
          <li>
            <strong className="text-slate-900 dark:text-white">
              Be specific with selectors:
            </strong>{" "}
            Use precise CSS selectors (e.g.,{" "}
            <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
              circle.data-point
            </code>
            ) to avoid selecting unintended elements.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white">
              Manage element count:
            </strong>{" "}
            Staggering works best with reasonable numbers of elements (10-100).
            Very large groups may perform poorly.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white">
              Balance stagger and duration:
            </strong>{" "}
            Adjust duration based on the number of elements to keep total
            animation time reasonable.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white">
              Use requestAnimationFrame:
            </strong>{" "}
            The hook automatically uses requestAnimationFrame for better
            performance.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white">
              Disable randomize for consistency:
            </strong>{" "}
            Set{" "}
            <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
              randomize: false
            </code>{" "}
            when you need predictable timing.
          </li>
        </ul>
      </Section>

      <Section title="Comparison: Single vs Group Transitions">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
              useD3Transition
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>✓ Single element transitions</li>
              <li>✓ Full control over animation</li>
              <li>✓ Lightweight for one-off animations</li>
              <li>✗ Not ideal for multiple elements</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
              useD3GroupTransition
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>✓ Multiple element transitions</li>
              <li>✓ Built-in stagger & randomize</li>
              <li>✓ Perfect for entrance animations</li>
              <li>✗ Requires CSS selector matching</li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
