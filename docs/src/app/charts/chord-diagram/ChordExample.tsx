"use client";
import React, { useState } from "react";
import ChordDiagram from "@d3-ui/ChordDiagram";
import { ChordData } from "@d3-ui/types";

const INITIAL_DATA: ChordData = [
  {
    label: "Blackberry",
    color: "#334155",
    ribbons: [
      { label: "Blackberry", sourceValue: 11975, targetValue: 11975 },
      { label: "Apple", sourceValue: 5871, targetValue: 1951 },
      { label: "HTC", sourceValue: 8916, targetValue: 8010 },
      { label: "Samsung", sourceValue: 2868, targetValue: 1013 },
    ],
  },
  {
    label: "Apple",
    color: "#94a3b8",
    ribbons: [
      { label: "Apple", sourceValue: 10048, targetValue: 10048 },
      { label: "HTC", sourceValue: 2060, targetValue: 16145 },
      { label: "Samsung", sourceValue: 6171, targetValue: 990 },
    ],
  },
  {
    label: "HTC",
    color: "#64748b",
    ribbons: [
      { label: "HTC", sourceValue: 8090, targetValue: 8090 },
      { label: "Samsung", sourceValue: 8045, targetValue: 940 },
    ],
  },
  {
    label: "Samsung",
    color: "#475569",
    ribbons: [
      { label: "Samsung", sourceValue: 6907, targetValue: 6907 },
    ],
  },
];

export const ChordChartExample = () => {
  const [directed, setDirected] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
          <input 
            type="checkbox" 
            checked={directed} 
            onChange={(e) => setDirected(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-slate-600 focus:ring-slate-500"
          />
          Directed Chord Diagram
        </label>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-inner border border-slate-100 dark:border-slate-800 w-full flex justify-center overflow-hidden">
        <ChordDiagram.Container 
          data={INITIAL_DATA} 
          width={450} 
          height={450}
          directed={directed}
          padAngle={0.04}
        >
          <ChordDiagram.Ribbons />
          <ChordDiagram.Groups label={{ variant: "text", className: "text-[10px] font-bold" }} />
          <ChordDiagram.Legend orientation="horizontal" position="bottom" />
        </ChordDiagram.Container>
      </div>
    </div>
  );
};
