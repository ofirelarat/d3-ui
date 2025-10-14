// apps/docs/app/components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4">
      <div className="flex gap-4 items-center">
        <Link href="/" className="font-semibold text-lg text-sky-600">
          d3-ui
        </Link>
        <Link href="/getting-started" className="hover:text-blue-500">
          Getting Started
        </Link>
      </div>
      <nav className="flex gap-4 text-sm text-gray-600">
        <a
          href="https://github.com/ofirelarat/d3-ui"
          target="_blank"
          className="hover:text-sky-600 transition-colors"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
