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

    const svgElement = d3.select(ref.current);
    svgElement.call(axisGenerator as any);

    // Apply theme-aware styles to the axis elements
    svgElement.selectAll(".domain")
      .attr("stroke", "var(--chart-axis)")
      .attr("stroke-width", "1");
    
    svgElement.selectAll(".tick line")
      .attr("stroke", "var(--chart-axis)")
      .attr("stroke-opacity", "0.2");
    
    svgElement.selectAll(".tick text")
      .attr("fill", "var(--chart-axis)")
      .attr("font-size", "11px")
      .attr("font-family", "var(--font-mono)");

  }, [scale, orient, ticks, tickFormat]);

  return <g ref={ref} transform={transform} className="chart-axis" />;
}
