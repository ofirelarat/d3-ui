import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Getting Started – D3 UI",
  description: "Set up your environment to use D3 UI components with React and Tailwind CSS.",
};

export default function GettingStartedPage() {
  return (
    <div className="mx-auto max-w-3xl py-16 px-6 prose prose-gray dark:prose-invert">
      <h1>Getting Started</h1>

      <p>
        Welcome to <strong>D3 UI</strong> — a collection of ready-to-use, beautiful D3.js components built for React and styled with Tailwind CSS.
      </p>

      <h2>🧩 Prerequisites</h2>
      <p>Before using D3 UI, ensure you have the following:</p>
      <ul>
        <li>Node.js 18+ and npm or pnpm/yarn</li>
        <li>A React app (Next.js recommended)</li>
        <li>Tailwind CSS installed and configured</li>
      </ul>

      <h2>⚙️ Setup</h2>

      <h3>1. Install Tailwind CSS</h3>
      <p>
        If you don’t already have Tailwind configured, follow the{" "}
        <Link href="https://tailwindcss.com/docs/guides/nextjs" target="_blank" className="text-blue-600 hover:underline">
          official Tailwind guide
        </Link>.
      </p>

      <h3>2. Install D3</h3>
      <pre>
        <code className="language-bash">npm install d3</code>
      </pre>

      <h3>3. Add the Component</h3>
      <p>
        Copy the component file you need (for example, <code>LineChart.tsx</code>) from the{" "}
        <Link href="/components/line-chart" className="text-blue-600 hover:underline">
          components docs
        </Link>{" "}
        into your project’s <code>components</code> folder.
      </p>

      <pre>
        <code className="language-bash">
{`# Example folder structure
src/
  components/
    charts/
      LineChart.tsx`}
        </code>
      </pre>

      <h3>4. Use the Component</h3>
      <pre>
        <code className="language-tsx">
{`import LineChart from "@/components/charts/LineChart";

const data = [
  { x: 0, y: 10 },
  { x: 1, y: 30 },
  { x: 2, y: 20 },
];

export default function Example() {
  return <LineChart data={data} />;
}`}
        </code>
      </pre>

      <h3>🎉 Done!</h3>
      <p>
        You’re ready to use <strong>D3 UI</strong> in your React project. Explore more components in the{" "}
        <Link href="/components" className="text-blue-600 hover:underline">
          components section
        </Link>.
      </p>
    </div>
  );
}
