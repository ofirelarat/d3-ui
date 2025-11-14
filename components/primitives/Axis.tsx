"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { AxisScale, ScaleBand } from "d3";

interface AxisProps {
  scale: AxisScale<number> | ScaleBand<string>;
  orient?: "bottom" | "left";
  transform?: string;
  ticks?: number;
}

export function Axis({ scale, orient = "bottom", transform = "", ticks = 5 }: AxisProps) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    const axisGenerator =
      orient === "bottom"
        ? d3.axisBottom(scale as any).ticks(ticks)
        : d3.axisLeft(scale as any).ticks(ticks);

    d3.select(ref.current).call(axisGenerator as any);
  }, [scale, orient, ticks]);

  return <g ref={ref} transform={transform} />;
}
