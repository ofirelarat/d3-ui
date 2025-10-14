import Link from "next/link";
import { PageHeader } from "../components/PageHeader";
import { Section } from "../components/Section";
import { CodeBlock } from "../components/CodeBlock";
import path from "path";
import fs from "fs";

const axisFile = path.join(process.cwd(), "../components/primitives/Axis.tsx");
const asixCode = fs.readFileSync(axisFile, "utf-8");
const tooltipFile = path.join(
  process.cwd(),
  "../components/primitives/Tooltip.tsx"
);
const tooltipCode = fs.readFileSync(tooltipFile, "utf-8");
const legendFile = path.join(
  process.cwd(),
  "../components/primitives/Legend.tsx"
);
const legendCode = fs.readFileSync(legendFile, "utf-8");

export default function GettingStartedPage() {
  return (
    <div className="mx-auto max-w-3xl py-16 px-6 space-y-12">
      <PageHeader
        title="Getting Started"
        subtitle="Set up D3 UI in your React or Next.js project with Tailwind CSS and D3.js."
      />

      <Section title="Prerequisites">
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
          <li>Node.js 18+ and npm/pnpm</li>
          <li>React project (Next.js recommended)</li>
          <li>Tailwind CSS installed</li>
        </ul>
      </Section>

      <Section title="Install Tailwind CSS">
        <p className="text-gray-700 dark:text-gray-300">
          Follow the{" "}
          <Link
            href="https://tailwindcss.com/docs/guides/nextjs"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            official Tailwind setup guide
          </Link>{" "}
          if you haven’t already.
        </p>
      </Section>

      <Section title="Install D3.js">
        <CodeBlock title="Installing d3" code={`npm install d3`} />
      </Section>

      <Section title="Add the primitives components">
        <div className="space-y-4">
          <CodeBlock
            defaultExpanded={false}
            title="./components/primitives/Axis.tsx"
            code={asixCode}
          />
          <CodeBlock
            defaultExpanded={false}
            title="./components/primitives/Tooltip.tsx"
            code={tooltipCode}
          />
          <CodeBlock
            defaultExpanded={false}
            title="./components/primitives/Tooltip.tsx"
            code={legendCode}
          />
        </div>
      </Section>

      <Section title="Add Components">
        <p className="text-gray-700 dark:text-gray-300">
          Copy any component you want from{" "}
          <Link
            href="/components/line-chart"
            className="text-blue-600 hover:underline"
          >
            our docs
          </Link>{" "}
          into your project’s <code>components</code> folder:
        </p>
        <CodeBlock
          defaultExpanded={true}
          code={`src/
  components/
    charts/
      LineChart.tsx`}
        />
      </Section>

      <Section title="Use the Component">
        <CodeBlock
          defaultExpanded={true}
          code={`import LineChart from "@/components/charts/LineChart";

const data = [
  { x: 0, y: 10 },
  { x: 1, y: 30 },
  { x: 2, y: 20 },
];

export default function Example() {
  return <LineChart data={data} />;
}`}
        />
      </Section>

      <Section>
        <p className="text-gray-700 dark:text-gray-300">
          That’s it! You’re ready to use <strong>D3 UI</strong> components in
          your app.
        </p>
      </Section>
    </div>
  );
}
