import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface TransitionOptions {
  /** duration in ms */
  duration?: number;
  /** easing function */
  ease?: (t: number) => number;
  /** optional callback to apply before transition starts */
  before?: (selection: d3.Selection<any, unknown, null, undefined>) => void;
  /** callback that applies during transition */
  apply: (transition: d3.Transition<any, unknown, null, undefined>) => void;
}

/**
 * Generic D3 transition hook that works for any SVG element.
 * 
 * Example:
 * const ref = useD3Transition({
 *   duration: 800,
 *   apply: (t) => t.attr("opacity", 1).attr("x", 100),
 * });
 */
export const useD3Transition = <T extends SVGElement>({
  duration = 600,
  ease = d3.easeCubicInOut,
  before,
  apply,
}: TransitionOptions) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const selection = d3.select(ref.current);
    before?.(selection);
    const t = selection.transition().duration(duration).ease(ease);
    apply(t);
  });

  return ref;
};
