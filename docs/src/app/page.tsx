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

export default function HomePage() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="py-12">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Beautiful D3 + React
            <span className="block bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
              Data Visualizations
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-2xl">
            d3-ui is a modern collection of composable React components powered by D3. 
            Build beautiful, interactive data visualizations with an easy-to-use API.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/getting-started"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-colors"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://github.com/ofirelarat/d3-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              View on GitHub
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">Why d3-ui?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-700 transition-colors">
            <Zap className="w-8 h-8 text-sky-600 dark:text-sky-400 mb-3" />
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-lg">
              Easy to Use
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {`Intuitive compound component API that's familiar to React developers.`}
            </p>
          </div>
          <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-700 transition-colors">
            <Code2 className="w-8 h-8 text-sky-600 dark:text-sky-400 mb-3" />
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-lg">
              TypeScript
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Fully typed components with excellent IDE support and autocomplete.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-700 transition-colors">
            <Palette className="w-8 h-8 text-sky-600 dark:text-sky-400 mb-3" />
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-lg">
              Customizable
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Styled with Tailwind CSS. Customize colors, sizes, and styling easily.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-700 transition-colors">
            <TrendingUp className="w-8 h-8 text-sky-600 dark:text-sky-400 mb-3" />
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-lg">
              Performant
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Optimized rendering with smooth D3 transitions and animations.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-700 transition-colors">
            <Code2 className="w-8 h-8 text-sky-600 dark:text-sky-400 mb-3" />
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-lg">
              Composable
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Build complex visualizations by composing simple, reusable components.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-700 transition-colors">
            <Code2 className="w-8 h-8 text-sky-600 dark:text-sky-400 mb-3" />
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-lg">
              Interactive
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Built-in tooltips, legends, and smooth interactions out of the box.
            </p>
          </div>
        </div>
      </section>

      {/* Components Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">Available Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {[
            { name: "Line Chart", href: "/charts/line", description: "Track trends over time" },
            { name: "Bar Chart", href: "/charts/bar-chart", description: "Compare values across categories" },
            { name: "Area Chart", href: "/charts/area-chart", description: "Show cumulative data" },
            { name: "Pie Chart", href: "/charts/pie-chart", description: "Visualize parts of a whole" },
            { name: "Scatter Plot", href: "/charts/scatter-plot", description: "Explore correlations" },
            { name: "Heatmap", href: "/charts/heatmap", description: "Show matrix data patterns" },
            { name: "Treemap", href: "/charts/treemap", description: "Visualize hierarchies" },
            { name: "Gauge", href: "/charts/gauge", description: "Display progress or status" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-700 hover:bg-sky-50 dark:hover:bg-slate-900 transition-all group"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors flex items-center gap-2">
                {item.name}
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-12 space-y-16">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Component Examples</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Explore interactive examples of all available components
          </p>
        </div>
        <HeatmapExamples />
        <LineChartExamples />
        <AreaChartExamples />
        <BarChartExamples />
        <PieChartExamples />
        <ScatterPlotExamples />
        <TreemapExamples />
        <GaugeChartExamples />
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
