"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

interface NavGroup {
  title: string;
  items: { label: string; href: string }[];
}

const navGroups: NavGroup[] = [
  {
    title: "General",
    items: [
      { label: "Home", href: "/" },
      { label: "Getting Started", href: "/getting-started" },
    ],
  },
  {
    title: "Charts",
    items: [
      { label: "Line Chart", href: "/charts/line" },
      { label: "Bar Chart", href: "/charts/bar-chart" },
      { label: "Area Chart", href: "/charts/area-chart" },
      { label: "Pie Chart", href: "/charts/pie-chart" },
      { label: "Scatter Plot", href: "/charts/scatter-plot" },
      { label: "Heatmap", href: "/charts/heatmap" },
      { label: "Treemap", href: "/charts/treemap" },
      { label: "Gauge", href: "/charts/gauge" },
    ],
  },
  {
    title: "Primitives",
    items: [
      { label: "Axis", href: "/primitives/axis" },
      { label: "Legend", href: "/primitives/legend" },
      { label: "Tooltip", href: "/primitives/tooltip" },
      { label: "Label", href: "/primitives/label" },
    ],
  },
];

export default function Sidebar() {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    General: true,
    Charts: true,
    Primitives: true,
  });

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside className="h-screen w-64 bg-gray-50 border-r border-gray-200 dark:bg-gray-900 dark:border-gray-800 flex flex-col">
      <div className="overflow-y-auto flex-1 p-4 space-y-4">
        {navGroups.map((group) => {
          const isOpen = openGroups[group.title];
          return (
            <div key={group.title}>
              <button
                onClick={() => toggleGroup(group.title)}
                className="flex items-center justify-between w-full text-left font-semibold text-gray-800 dark:text-gray-100 mb-2"
              >
                <span>{group.title}</span>
                {isOpen ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
              </button>
              {isOpen && (
                <ul className="ml-2 border-l border-gray-200 dark:border-gray-700 pl-3 space-y-1">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
