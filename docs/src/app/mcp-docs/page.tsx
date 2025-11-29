// app/docs/mcp/page.tsx
import React from "react";

const MCP_DOCS = {
  serverInfo: {
    name: "d3-ui MCP",
    version: "1.0",
    maxDuration: "60 seconds",
    redisCache: true,
    sseSupport: false,
    verboseLogs: true,
  },
  tools: [
    {
      name: "doc_sections",
      description: "Retrieve the main sections of the D3-UI documentation",
      input: "None",
      output: {
        content: `Available doc sections: Getting Started, Components, Charts, Customization, Examples`,
        structuredContent: [
          "Getting Started",
          "Components",
          "Charts",
          "Customization",
          "Examples",
        ],
      },
    },
    {
      name: "example_chart",
      description: "Return an example chart configuration/code snippet",
      input: {
        chartType: `string (enum) - "gauge", "heatmap", "line", "scatter", "treemap"`,
      },
      outputExample: `{
  content: [
    { type: "text", text: "/* TypeScript code for Line chart */", language: "typescript" }
  ]
}`,
    },
    {
      name: "list_tools",
      description: "List all available MCP tools",
      input: "None",
      outputExample: `{
  content: [
    { type: "text", text: "doc_sections, example_chart, list_tools" }
  ]
}`,
    },
  ],
};

export default function MCPDocsPage() {
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">D3-UI MCP Documentation</h1>

      <section className="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">Server Information</h2>
        <ul className="list-disc pl-5 space-y-1">
          {Object.entries(MCP_DOCS.serverInfo).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value.toString()}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Available Tools</h2>
        {MCP_DOCS.tools.map((tool) => (
          <div
            key={tool.name}
            className="mb-6 p-4 border border-gray-200 rounded-lg bg-white dark:bg-slate-900 dark:border-slate-800"
          >
            <h3 className="text-xl font-bold">{tool.name}</h3>
              <p className="italic text-gray-600 dark:text-slate-400">{tool.description}</p>

            <div className="mt-2">
              <strong>Input:</strong>
              <pre className="bg-gray-100 dark:bg-slate-800 p-2 rounded mt-1">
                {JSON.stringify(tool.input ?? "None", null, 2)}
              </pre>
            </div>

            <div className="mt-2">
              <strong>Output Example:</strong>
              <pre className="bg-gray-100 dark:bg-slate-800 p-2 rounded mt-1">
                {tool.outputExample ??
                  JSON.stringify(tool.output ?? {}, null, 2)}
              </pre>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
