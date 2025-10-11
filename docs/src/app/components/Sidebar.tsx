// apps/docs/app/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/getting-started", label: "Getting Started" },
  { href: "/charts/line", label: "Line Chart" },
  // More components later...
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-60 border-r border-gray-200 bg-white h-screen p-4 sticky top-0">
      <h2 className="font-semibold text-lg mb-6">d3-ui</h2>
      <nav className="flex flex-col gap-2">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "px-3 py-2 rounded-md text-sm font-medium transition-colors",
              pathname === href
                ? "bg-sky-100 text-sky-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
