"use client";

import React, { useState } from "react";
import GaugeChart from "@d3-ui/Gauge";

export const code = `<GaugeChart.Container
  data={[
    { label: "Completed", value: 60, color: "#34d399" },
    { label: "Pending", value: 40, color: "#f59e0b" },
  ]}
  min={0}
  max={100}
  width={300}
  height={180}
>
  <GaugeChart.Arc />
  <GaugeChart.Needle value={70} color="#111" />
  <GaugeChart.Label value={70} />
  <GaugeChart.Legend />
</GaugeChart.Container>`;

export function GaugeChartExample() {
  const [value, setValue] = useState(70);

  const data = [
    { label: "Completed", value: 60, color: "#34d399" },
    { label: "Pending", value: 40, color: "#f59e0b" },
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      <GaugeChart.Container
        data={data}
        min={0}
        max={100}
        width={300}
        height={180}
      >
        <GaugeChart.Arc />
        <GaugeChart.Needle value={value} color="#111" />
        <GaugeChart.Label value={value} />
        <GaugeChart.Legend />
      </GaugeChart.Container>

      {/* Slider to change the value dynamically */}
      <div className="flex flex-col items-center w-full max-w-xs">
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full"
        />
        <span className="text-gray-700 dark:text-gray-300 mt-2">
          Current Value: {value}
        </span>
      </div>
    </div>
  );
}
