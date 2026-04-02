"use client";

import React, { useState } from "react";
import GaugeChart from "@d3-ui/Gauge";
import { useChartTheme } from "@/app/components/ChartShowcase";

export function GaugeChartExample() {
  const { colors } = useChartTheme();
  const [value, setValue] = useState(70);

  const data = [
    { label: "Low", value: 30, color: colors[0] },
    { label: "Medium", value: 40, color: colors[1] },
    { label: "High", value: 30, color: colors[2] },
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <GaugeChart.Container
        data={data}
        min={0}
        max={100}
        width={450}
        height={250}
      >
        <GaugeChart.Arc />
        <GaugeChart.Needle value={value} color="currentColor" />
        <GaugeChart.Label value={value} />
        <GaugeChart.Legend className="mt-8 scale-110" />
      </GaugeChart.Container>

      <div className="flex flex-col items-center w-full max-w-xs gap-3">
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          Current Value: <span className="text-foreground tabular-nums font-bold">{value}</span>
        </span>
      </div>
    </div>
  );
}
