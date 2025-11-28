// apps/docs/app/components/Footer.tsx
import Link from "next/link";
import { Github, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">d3</span>
              </div>
              <span className="font-semibold text-slate-900 dark:text-white">d3-ui</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Beautiful D3 + React components for data visualization
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-3">Documentation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/getting-started" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/charts/line" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  Charts
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-3">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contributors" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  Contributors
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/ofirelarat/d3-ui" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://github.com/ofirelarat/d3-ui/issues" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Report Issues
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/ofirelarat/d3-ui/discussions" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Discussions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {currentYear} d3-ui. Built with{" "}
            <Heart className="w-3 h-3 inline text-red-500" /> by the community
          </p>
          <div className="flex gap-6">
            <a
              href="https://github.com/ofirelarat/d3-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
