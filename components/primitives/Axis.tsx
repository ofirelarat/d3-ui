"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Axis as D3Axis } from "d3";

type Orient = "bottom" | "left" | "top" | "right";

interface AxisProps<Scale extends d3.AxisScale<any>> {
  scale: Scale;
  orient?: Orient;
  transform?: string;
  ticks?: number;
  tickFormat?: (d: any) => string; // override
}

export function Axis<Scale extends d3.AxisScale<any>>({
  scale,
  orient = "bottom",
  transform = "",
  ticks = 5,
  tickFormat,
}: AxisProps<Scale>) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    let axisGenerator: D3Axis<any> =
      orient === "bottom" ? d3.axisBottom(scale) : d3.axisLeft(scale);

    if ("ticks" in axisGenerator) axisGenerator.ticks(ticks);

    if (tickFormat) {
      axisGenerator.tickFormat(tickFormat as any);
    } 

    d3.select(ref.current).call(axisGenerator as any);
  }, [scale, orient, ticks, tickFormat]);

  return <g ref={ref} transform={transform} />;
}
