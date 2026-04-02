"use client";

import Treemap from "@d3-ui/Treemap";
import { useChartTheme } from "@/app/components/ChartShowcase";

export function TreemapExample() {
  const { colors } = useChartTheme();
  
  const data = {
    name: "root",
    children: [
      { name: "Electronics", value: 1500, color: colors[0] },
      { name: "Furniture", value: 900, color: colors[1] },
      {
        name: "Clothing",
        color: colors[2],
        children: [
          { name: "Men", value: 600, },
          { name: "Women", value: 800, },
        ],
      },
      { name: "Accessories", value: 400, color: colors[3] },
    ],
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 mt-4">
      <Treemap.Container data={data} width={600} height={400}>
        <Treemap.Tile />
        <Treemap.Legend className="mt-8 scale-110" />
      </Treemap.Container>
    </div>
  );
}
