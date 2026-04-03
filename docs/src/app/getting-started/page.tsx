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

const labelFile = path.join(process.cwd(), "../components/primitives/Label.tsx");
const labelCode = fs.readFileSync(labelFile, "utf-8");

const typesFile = path.join(process.cwd(), "../components/types.ts");
const typesCode = fs.readFileSync(typesFile, "utf-8");

const utilsFile = path.join(process.cwd(), "../components/lib/utils.tsx");
const utilsCode = fs.readFileSync(utilsFile, "utf-8");

const useTransitionFile = path.join(
  process.cwd(),
  "../components/hooks/useTransition.tsx"
);
const useTransitionCode = fs.readFileSync(useTransitionFile, "utf-8");

const useGroupTransitionFile = path.join(
  process.cwd(),
  "../components/hooks/useGroupTransition.tsx"
);
const useGroupTransitionCode = fs.readFileSync(useGroupTransitionFile, "utf-8");

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
        <p className="text-gray-700 dark:text-gray-300 mb-4">
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

      <Section title="Add Shared Types">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Copy the shared types into your <code>components/types.ts</code> file.
          These types are used across all D3 UI components.
        </p>
        <CodeBlock
          defaultExpanded={false}
          title="./components/types.ts"
          code={typesCode}
        />
      </Section>

      <Section title="Add Utility Functions">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Add the following helper function to <code>components/lib/utils.tsx</code>.
        </p>
        <CodeBlock
          defaultExpanded={true}
          title="./components/lib/utils.tsx"
          code={utilsCode}
        />
      </Section>

      <Section title="Add Custom Hooks">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Add these hooks to <code>components/hooks/</code> for seamless transitions
          and animations.
        </p>
        <div className="space-y-4">
          <CodeBlock
            defaultExpanded={false}
            title="./components/hooks/useTransition.tsx"
            code={useTransitionCode}
          />
          <CodeBlock
            defaultExpanded={false}
            title="./components/hooks/useGroupTransition.tsx"
            code={useGroupTransitionCode}
          />
        </div>
      </Section>

      <Section title="Add Primitive Components">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The following primitives are used as building blocks for all charts.
          Place them in <code>components/primitives/</code>.
        </p>
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
            title="./components/primitives/Legend.tsx"
            code={legendCode}
          />
          <CodeBlock
            defaultExpanded={false}
            title="./components/primitives/Label.tsx"
            code={labelCode}
          />
        </div>
      </Section>

      <Section title="Use the Chart Components">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Now you can copy any chart component from{" "}
          <Link
            href="/charts/bar-chart"
            className="text-blue-600 hover:underline"
          >
            our docs
          </Link>{" "}
          into your project’s <code>components/</code> folder:
        </p>
        <CodeBlock
          defaultExpanded={true}
          code={`src/
  components/
    BarChart.tsx`}
        />
      </Section>

      <Section title="Example Usage">
        <CodeBlock
          defaultExpanded={true}
          code={`import BarChart from "@/components/BarChart";
import { BarData } from "@/components/types";

const data: BarData = {
  "Sales": {
    label: "Monthly Sales",
    data: [
      { x: "Jan", y: 10 },
      { x: "Feb", y: 30 },
      { x: "Mar", y: 20 },
    ],
  }
};

export default function Example() {
  return (
    <div className="h-96 w-full">
      <BarChart data={data} title="Monthly Sales Overview" />
    </div>
  );
}`}
        />
      </Section>

      <Section>
        <p className="text-gray-700 dark:text-gray-300">
          That’s it! You’ve set up the core of <strong>D3 UI</strong>. Explore the
          rest of the charts in documentation to start building your dashboard.
        </p>
      </Section>
    </div>
  );
}
