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
      { label: "MCP Documentation", href: "/mcp-docs" },
      { label: "Contributors", href: "/contributors" },
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
  {
    title: "Hooks",
    items: [
      { label: "useD3Transition", href: "/hooks/useD3Transition" },
      { label: "useD3GroupTransition", href: "/hooks/useD3GroupTransition" },
    ],
  },
];

export default function Sidebar() {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    General: true,
    Charts: true,
    Primitives: false,
    Hooks: false,
  });

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside className="hidden lg:flex h-screen w-64 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col sticky top-16">
      <div className="overflow-y-auto flex-1 p-4 space-y-4">
        {navGroups.map((group) => {
          const isOpen = openGroups[group.title];
          return (
            <div key={group.title} className="space-y-2">
              <button
                onClick={() => toggleGroup(group.title)}
                className="flex items-center justify-between w-full text-left font-semibold text-sm text-slate-900 dark:text-slate-100 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                <span>{group.title}</span>
                {isOpen ? (
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                )}
              </button>
              {isOpen && (
                <ul className="ml-2 border-l border-slate-200 dark:border-slate-700 pl-3 space-y-1">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors py-1"
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
