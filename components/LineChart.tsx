"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

type DataPoint = { x: number; y: number };

interface LineChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
}

export default function LineChart({
  data,
  width = 600,
  height = 300,
}: LineChartProps) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.x) as [number, number])
      .range([0, innerWidth]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.y)!])
      .range([innerHeight, 0])
      .nice();

    const line = d3
      .line<DataPoint>()
      .x((d) => x(d.x))
      .y((d) => y(d.y))
      .curve(d3.curveMonotoneX);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).ticks(6))
      .attr("color", "#9ca3af"); // Tailwind gray-400

    g.append("g").call(d3.axisLeft(y).ticks(5)).attr("color", "#9ca3af");

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#3b82f6") // Tailwind blue-500
      .attr("stroke-width", 2)
      .attr("d", line as any);
  }, [data, width, height]);

  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      className="w-full h-auto overflow-visible"
    />
  );
}
