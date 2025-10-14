"use client";
import Link from "next/link";
import { useState } from "react";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [chartsOpen, setChartsOpen] = useState(true);
  const [primitivesOpen, setPrimitivesOpen] = useState(true);

  const generalLinks = [
    { title: "Home", href: "/" },
    { title: "Getting Started", href: "/getting-started" },
  ];

  const chartLinks = [
    { title: "Line Chart", href: "/charts/line" },
    { title: "Scatter Plot", href: "/charts/scatter-plot" },
    { title: "Heatmap", href: "/charts/heatmap" },
    { title: "Treemap", href: "/charts/treemap" },
  ];

  const primitiveLinks = [
    { title: "Axis", href: "/primitives/axis" },
    { title: "Legend", href: "/primitives/legend" },
    { title: "Tooltip", href: "/primitives/tooltip" },
  ];

  const renderLinks = (links: { title: string; href: string }[]) =>
    links.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className="block px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
      >
        {link.title}
      </Link>
    ));

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 p-6 border-r border-gray-200 dark:border-gray-800 fixed h-full overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">D3-UI Docs</h1>

        {/* General */}
        <div className="mb-4">
          <h2 className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2">
            General
          </h2>
          {renderLinks(generalLinks)}
        </div>

        {/* Charts */}
        <div className="mb-4">
          <button
            onClick={() => setChartsOpen(!chartsOpen)}
            className="w-full flex justify-between items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 hover:text-blue-500"
          >
            Charts
            <span
              className={`transition-transform ${
                chartsOpen ? "rotate-90" : "rotate-0"
              }`}
            >
              &gt;
            </span>
          </button>
          {chartsOpen && <div className="pl-4">{renderLinks(chartLinks)}</div>}
        </div>

        {/* Primitives */}
        <div className="mb-4">
          <button
            onClick={() => setPrimitivesOpen(!primitivesOpen)}
            className="w-full flex justify-between items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 hover:text-blue-500"
          >
            Primitives
            <span
              className={`transition-transform ${
                primitivesOpen ? "rotate-90" : "rotate-0"
              }`}
            >
              &gt;
            </span>
          </button>
          {primitivesOpen && (
            <div className="pl-4">{renderLinks(primitiveLinks)}</div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-10">{children}</main>
    </div>
  );
}
