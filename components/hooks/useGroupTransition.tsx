import * as d3 from "d3";
import { useEffect, useRef } from "react";

export function useD3GroupTransition<ElementType extends SVGElement = SVGElement>(
  {
    selector = "*",
    duration = 600,
    ease = d3.easeCubicInOut,
    before,
    apply,
    stagger = true,
    randomize = true,
    deps = [],
  }: {
    selector?: string;
    duration?: number;
    ease?: (t: number) => number;
    before?: (sel: d3.Selection<ElementType, unknown, any, undefined>) => void;
    apply: (t: d3.Transition<ElementType, unknown, null, undefined>) => void;
    stagger?: boolean;
    randomize?: boolean;
    deps?: React.DependencyList;
  }
) {
  const ref = useRef<SVGGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    requestAnimationFrame(() => {
      const selection = d3
        .select(ref.current)
        .selectAll<ElementType, unknown>(selector);

      before?.(selection);

      const total = selection.size();
      const transition = selection
        .transition()
        .duration(duration)
        .ease(ease)
        .delay((_, i) => {
          if (!stagger) return 0;
          const baseDelay = (i / total) * duration * 0.8;
          const randomOffset = randomize ? Math.random() * 200 : 0;
          return baseDelay + randomOffset;
        });

      apply(transition);
    });
  }, deps);

  return ref;
}
