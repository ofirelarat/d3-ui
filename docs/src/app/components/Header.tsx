// apps/docs/app/components/Header.tsx
"use client";

import Link from "next/link";
import { Github, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if dark class is on html element
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const isDarkNow = html.classList.contains("dark");
    
    if (isDarkNow) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-8 items-center">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">d3</span>
              </div>
              <span className="font-semibold text-lg text-slate-900 dark:text-white">
                d3-ui
              </span>
            </Link>
            <nav className="hidden md:flex gap-6 text-sm">
              <Link
                href="/getting-started"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Getting Started
              </Link>
              <Link
                href="/contributors"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Contributors
              </Link>
            </nav>
          </div>
          <div className="flex gap-4 items-center">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            )}
            <a
              href="https://github.com/ofirelarat/d3-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
