import { PageHeader } from "@/app/components/PageHeader";
import { Section } from "@/app/components/Section";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/Tabs";
import { CodeBlock } from "@/app/components/CodeBlock";

export default function UseD3TransitionPage() {
  return (
    <div className="py-12 space-y-16">
      <PageHeader
        title="useD3Transition"
        subtitle="A React hook for applying smooth D3 transitions to SVG elements"
      />

      <Section title="Overview">
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          <code className="bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded text-sm font-mono">
            useD3Transition
          </code>{" "}
          is a powerful hook that simplifies applying D3 transitions to SVG
          elements in React. It handles the D3 selection lifecycle,
          automatically updates when dependencies change, and provides full
          control over transition behavior.
        </p>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Perfect for animating chart elements, creating smooth interactions,
          and building engaging data visualizations.
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
                A simple example showing how to animate the opacity and position
                of an SVG element:
              </p>
              <div className="bg-white dark:bg-slate-950 p-4 rounded border border-slate-200 dark:border-slate-800">
                <pre className="text-xs font-mono text-slate-700 dark:text-slate-300 overflow-x-auto">
                  {`<rect ref={pathRef} width="100" height="100" fill="blue" />`}
                </pre>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="code">
            <CodeBlock
              title="Basic Animation Example"
              code={`import { useD3Transition } from '@d3-ui/hooks';
import * as d3 from 'd3';
import { useState } from 'react';

export function AnimatedRect() {
  const [isActive, setIsActive] = useState(false);

  const ref = useD3Transition<SVGRectElement>({
    duration: 800,
    ease: d3.easeCubicInOut,
    apply: (t) => t
      .attr('opacity', isActive ? 1 : 0.5)
      .attr('x', isActive ? 100 : 0),
    deps: [isActive],
  });

  return (
    <svg width="300" height="100">
      <rect 
        ref={ref} 
        y="0" 
        width="50" 
        height="50" 
        fill="blue"
      />
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
                  duration?: number
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Duration of the transition in milliseconds. Defaults to{" "}
                  <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">
                    600
                  </code>
                  .
                </p>
                <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-xs font-mono text-slate-700 dark:text-slate-300">
                  useD3Transition({`{ duration: 1000, ... }`})
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="font-mono font-semibold text-sm text-slate-900 dark:text-white mb-2">
                  ease?: (t: number) =&gt; number
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Easing function for the transition. Defaults to{" "}
                  <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">
                    d3.easeCubicInOut
                  </code>
                  .
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  Common easing functions:{" "}
                  <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">
                    easeLinear
                  </code>
                  ,{" "}
                  <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">
                    easeCubicInOut
                  </code>
                  ,{" "}
                  <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">
                    easeQuadInOut
                  </code>
                  ,{" "}
                  <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">
                    easeElasticInOut
                  </code>
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="font-mono font-semibold text-sm text-slate-900 dark:text-white mb-2">
                  before?: (selection) =&gt; void
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Optional function executed before the transition starts. Use
                  this to set initial states.
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
                <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-xs font-mono text-slate-700 dark:text-slate-300">
                  {`apply: (t) => t.attr('opacity', 1)`}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="font-mono font-semibold text-sm text-slate-900 dark:text-white mb-2">
                  deps?: React.DependencyList
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  React dependency array. Transition runs when dependencies
                  change. Defaults to{" "}
                  <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">
                    []
                  </code>
                  .
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
              Animating Multiple Attributes
            </h3>
            <CodeBlock
              code={`const ref = useD3Transition<SVGCircleElement>({
  duration: 800,
  apply: (t) => t
    .attr('cx', 200)
    .attr('cy', 150)
    .attr('r', 50)
    .attr('fill', 'blue')
    .attr('opacity', 0.8),
  deps: [data],
});`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
              Using attrTween for Complex Animations
            </h3>
            <CodeBlock
              code={`const ref = useD3Transition<SVGPathElement>({
  duration: 1000,
  apply: (t) => t.attrTween('d', function(this: SVGPathElement) {
    const current = +this.getAttribute('data-value') || 0;
    const target = newValue;
    const interpolate = d3.interpolate(current, target);
    return (t: number) => generatePath(interpolate(t));
  }),
  deps: [newValue],
});`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
              Setting Initial State with before
            </h3>
            <CodeBlock
              code={`const ref = useD3Transition<SVGRectElement>({
  before: (sel) => {
    sel.attr('opacity', 0).attr('x', 0);
  },
  apply: (t) => t
    .attr('opacity', 1)
    .attr('x', 100),
  deps: [data],
});`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
              Chaining Transitions
            </h3>
            <CodeBlock
              code={`const ref = useD3Transition<SVGRectElement>({
  apply: (t) => t
    .attr('width', 200)
    .transition()
    .duration(500)
    .attr('height', 150)
    .transition()
    .duration(500)
    .attr('opacity', 0.5),
  deps: [data],
});`}
            />
          </div>
        </div>
      </Section>

      <Section title="Real-World Example">
        <CodeBlock
          title="Animated Bar Chart"
          code={`import { useD3Transition } from '@d3-ui/hooks';
import * as d3 from 'd3';
import { useState, useMemo } from 'react';

interface BarProps {
  data: number[];
  width: number;
  height: number;
}

export function AnimatedBars({ data, width, height }: BarProps) {
  const yScale = useMemo(() => 
    d3.scaleLinear()
      .domain([0, Math.max(...data)])
      .range([0, height - 40]),
    [data, height]
  );

  return (
    <svg width={width} height={height}>
      {data.map((value, i) => {
        const ref = useD3Transition<SVGRectElement>({
          duration: 800,
          apply: (t) => t
            .attr('y', height - 40 - yScale(value))
            .attr('height', yScale(value)),
          deps: [value],
        });

        return (
          <rect
            key={i}
            ref={ref}
            x={i * (width / data.length) + 10}
            width={width / data.length - 20}
            fill="#3b82f6"
          />
        );
      })}
    </svg>
  );
}`}
        />
      </Section>

      <Section title="Performance Tips">
        <ul className="list-disc pl-6 space-y-3 text-slate-600 dark:text-slate-400">
          <li>
            <strong className="text-slate-900 dark:text-white">
              Use proper dependencies:
            </strong>{" "}
            Include all values that affect the transition in the dependency
            array to ensure smooth updates.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white">
              Avoid excessive transitions:
            </strong>{" "}
            Running too many transitions simultaneously can impact performance.
            Consider staggering animations.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white">
              Use reasonable durations:
            </strong>{" "}
            Keep transition durations between 300-1000ms for smooth, responsive
            interactions.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white">
              Memoize calculations:
            </strong>{" "}
            Use useMemo for scale and data calculations to prevent unnecessary
            re-renders.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white">
              Handle SVG selection carefully:
            </strong>{" "}
            Ensure the ref is properly attached to an SVG element before the
            transition runs.
          </li>
        </ul>
      </Section>
    </div>
  );
}
