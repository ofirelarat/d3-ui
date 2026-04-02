"use client";

import React, { createContext, useContext, useState } from "react";
import { cn } from "@/app/lib/utils";
import {
  Monitor,
  Zap,
  Layout,
  Moon,
  Sun,
  RefreshCcw,
  Palette
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

export type ChartTheme = "classic" | "neon" | "material" | "sleek";

export const PALETTES: Record<ChartTheme, string[]> = {
  classic: ["#3b82f6", "#f59e0b", "#ec4899", "#10b981", "#8b5cf6"],
  neon: ["#00f3ff", "#ff00c1", "#00ff9f", "#ffea00", "#9d00ff"],
  material: ["#3f51b5", "#e91e63", "#ff9800", "#4caf50", "#9c27b0"],
  sleek: ["#94a3b8", "#64748b", "#475569", "#334155", "#1e293b"],
};

interface ChartThemeContextType {
  theme: ChartTheme;
  colors: string[];
}

const ChartThemeContext = createContext<ChartThemeContextType>({
  theme: "classic",
  colors: PALETTES.classic,
});

export const useChartTheme = () => useContext(ChartThemeContext);

interface ChartShowcaseProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function ChartShowcase({ children, title, description }: ChartShowcaseProps) {
  const [activeTheme, setActiveTheme] = useState<ChartTheme>("classic");
  const { isDark } = useTheme();

  return (
    <ChartThemeContext.Provider value={{ theme: activeTheme, colors: PALETTES[activeTheme] }}>
      <div
        className={cn(
          "group relative flex flex-col gap-4 w-full",
          activeTheme === "neon" && "neon-theme",
          activeTheme === "material" && "material-theme"
        )}
        data-chart-theme={activeTheme}
        style={{
          "--chart-axis": activeTheme === "neon" ? "#94a3b8" : (isDark ? "#94a3b8" : "#64748b"),
          "--chart-primary": PALETTES[activeTheme][0],
          "--tooltip-radius": activeTheme === "neon" ? "0px" : (activeTheme === "material" ? "12px" : "8px"),
          "--tooltip-shadow": activeTheme === "neon" ? "0 0 15px var(--chart-primary)" : "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        } as React.CSSProperties}
      >
        <div className="flex items-center justify-between px-2">
          <div>
            {title && <h3 className="text-lg font-bold tracking-tight">{title}</h3>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>

          <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-full border border-border/50 backdrop-blur-sm">
            <ThemeButton
              active={activeTheme === "classic"}
              onClick={() => setActiveTheme("classic")}
              icon={<Layout className="w-3.5 h-3.5" />}
              label="Classic"
            />
            <ThemeButton
              active={activeTheme === "neon"}
              onClick={() => setActiveTheme("neon")}
              icon={<Zap className="w-3.5 h-3.5" />}
              label="Neon"
            />
            <ThemeButton
              active={activeTheme === "material"}
              onClick={() => setActiveTheme("material")}
              icon={<Palette className="w-3.5 h-3.5" />}
              label="Material"
            />
            <ThemeButton
              active={activeTheme === "sleek"}
              onClick={() => setActiveTheme("sleek")}
              icon={<Monitor className="w-3.5 h-3.5" />}
              label="Sleek"
            />
          </div>
        </div>

        <div className={cn(
          "relative min-h-[450px] w-full rounded-2xl border border-border overflow-hidden transition-all duration-500 flex flex-col",
          "bg-white dark:bg-slate-950",
          activeTheme === "neon" && "bg-slate-950 text-cyan-400 rounded-none border-teal-500/50 shadow-[0_0_50px_-12px_rgba(45,212,191,0.25)]",
          activeTheme === "material" && "rounded-[2rem] border-none shadow-none bg-slate-50 dark:bg-slate-900",
          activeTheme === "sleek" && "dark:bg-black"
        )}>
          {/* Immersive Background Decorations */}
          <div className="absolute inset-0 pointer-events-none">
            <div className={cn(
              "absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] opacity-[0.03] dark:opacity-[0.05]",
              activeTheme === "neon" ? "bg-[radial-gradient(circle_at_center,theme(colors.cyan.500)_0%,transparent_70%)] opacity-20" : "bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)]"
            )} />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
          </div>

          <div className="relative z-10 w-full h-full p-8 flex items-center justify-center">
            <div className={cn(
              "transition-all duration-700 w-full flex justify-center",
              activeTheme === "neon" && "neon-glow text-primary"
            )}>
              {children}
            </div>
          </div>

          {/* Floating Indicator */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-[10px] uppercase font-bold tracking-widest text-muted-foreground transition-opacity group-hover:opacity-100 opacity-0">
            <div className={cn(
              "w-2 h-2 rounded-full",
              activeTheme === "classic" && "bg-blue-500",
              activeTheme === "neon" && "bg-cyan-400 shadow-[0_0_8px_cyan]",
              activeTheme === "material" && "bg-pink-500",
              activeTheme === "sleek" && "bg-slate-400"
            )} />
            {activeTheme} MODE
          </div>
        </div>
      </div>
    </ChartThemeContext.Provider>
  );
}

function ThemeButton({
  active,
  onClick,
  icon,
  label
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200",
        active
          ? "bg-white dark:bg-slate-800 text-primary shadow-sm ring-1 ring-border"
          : "text-muted-foreground hover:bg-white/50 dark:hover:bg-slate-800/50"
      )}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
