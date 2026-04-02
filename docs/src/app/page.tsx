import Link from "next/link";
import { ArrowRight, Zap, Code2, Palette, TrendingUp } from "lucide-react";
import {
  AreaChartExamples,
  BarChartExamples,
  GaugeChartExamples,
  HeatmapExamples,
  LineChartExamples,
  PieChartExamples,
  ScatterPlotExamples,
  TreemapExamples,
} from "./components/ShowCases";
import { ChartShowcase } from "./components/ChartShowcase";

export default function HomePage() {
  return (
    <div className="relative space-y-24">
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-[0.05] dark:opacity-[0.1] -z-10" />

      {/* Hero Section */}
      <section className="relative py-20 pointer-events-none">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-200 dark:border-sky-900 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-xs font-bold tracking-widest uppercase mb-8 animate-in fade-in slide-in-from-bottom-2">
            <Zap className="w-3 h-3 fill-current" />
            Introducing d3-ui 1.0
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 leading-[0.9] tracking-tighter animate-in fade-in slide-in-from-bottom-4">
            Build Stunning
            <span className="block italic bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-indigo-500 bg-clip-text text-transparent">
              Visual Stories.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-3xl animate-in fade-in slide-in-from-bottom-6">
            A premium collection of <span className="text-slate-900 dark:text-slate-100 font-semibold">atomic D3 components</span> designed for speed, flexibility, and jaw-dropping aesthetics.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto animate-in fade-in slide-in-from-bottom-8">
            <Link
              href="/getting-started"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-2xl font-bold shadow-xl shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://github.com/ofirelarat/d3-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 glass-panel border border-border text-slate-900 dark:text-white rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
            >
              <Code2 className="w-5 h-5" />
              Source Code
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Showcase Section (Using the new ShowCases) */}
      <section className="py-20 space-y-24">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
            Experience the Precision.
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Interactive, responsive, and themeable by default. Check out how d3-ui components adapt to your brand.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-24">
          <div className="space-y-8">
            <div className="flex items-center gap-2 border-l-4 border-sky-500 pl-4">
              <div className="text-sm font-black uppercase tracking-widest text-sky-600 mb-1">Trends & Progress</div>
              <h3 className="text-2xl font-bold">Line & Area Charts</h3>
            </div>
            <div className="grid grid-cols-1 gap-12">
              <ChartShowcase title="Stacked Area Concept">
                <AreaChartExamples />
              </ChartShowcase>
              <ChartShowcase title="Multi-series Line Analysis">
                <LineChartExamples />
              </ChartShowcase>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-2 border-l-4 border-amber-500 pl-4">
              <div className="text-sm font-black uppercase tracking-widest text-amber-600 mb-1">Volume & Distribution</div>
              <h3 className="text-2xl font-bold">Bar & Scatter Plots</h3>
            </div>
            <div className="grid grid-cols-1 gap-12">
              <ChartShowcase title="Categorical Bar Systems">
                <BarChartExamples />
              </ChartShowcase>
              <ChartShowcase title="High-Density Scatter Plot">
                <ScatterPlotExamples />
              </ChartShowcase>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6 rounded-lg bg-gradient-to-r from-sky-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 border border-sky-200 dark:border-slate-700">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Ready to get started?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Check out our getting started guide to learn how to install and use d3-ui in your project.
          </p>
          <Link
            href="/getting-started"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-colors"
          >
            View Getting Started Guide
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
