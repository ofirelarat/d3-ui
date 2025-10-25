import { createMcpHandler } from "@vercel/mcp-adapter";
// /app/api/mcp/route.ts

const tools: string[] = [];
const mcpHandler = createMcpHandler(
  (server) => {
    // List of tool names
    const tools: string[] = [];

    // Tool 1: Documentation sections
    server.tool(
      "doc_sections",
      "Get sections of D3-UI documentation",
      {},
      async () => {
        const sections = [
          "Getting Started",
          "Components",
          "Charts",
          "Customization",
          "Examples",
        ];
        return {
          content: [
            {
              type: "text",
              text: "Available doc sections: " + sections.join(", "),
            },
          ],
          structuredContent: { sections },
        };
      }
    );
    tools.push("doc_sections");

    // Tool 2: Example chart
    server.tool(
      "example_chart",
      "Return an example chart configuration",
      {},
      async () => {
        const example = {
          type: "bar",
          data: [
            { label: "A", value: 30 },
            { label: "B", value: 80 },
            { label: "C", value: 45 },
          ],
          options: { width: 400, height: 300, color: "steelblue" },
        };
        return {
          content: [{ type: "text", text: "Example chart returned" }],
          structuredContent: { chart: example },
        };
      }
    );
    tools.push("example_chart");

    // Tool 3: Render chart from input data
    server.tool(
      "render_chart",
      "Receive data and return chart configuration",
      {
        data: {
          type: "array",
          description: "Array of {label, value} objects",
        },
        type: {
          type: "string",
          description: "Type of chart (bar, line, pie)",
          default: "bar",
        },
      },
      async ({ data, type }) => {
        const chartConfig = {
          type,
          data,
          options: { width: 500, height: 300, color: "steelblue" },
        };
        return {
          content: [
            {
              type: "text",
              text: `Chart of type '${type}' created with ${data.length} points.`,
            },
          ],
          structuredContent: { chart: chartConfig },
        };
      }
    );
    tools.push("render_chart");

    // Tool 4: List all tools
    server.tool("list_tools", "List all available tools", {}, async () => {
      return { content: [{ type: "text", text: tools.join(", ") }] };
    });
    tools.push("list_tools");
  },
  {
    serverInfo: { name: "d3-ui MCP", version: "1.0" },
    capabilities: {
      tools: {
        doc_sections: {
          description: "Get sections of D3-UI documentation",
        },
        example_chart: { description: "Return an example chart configuration" },
        render_chart: {
          description: "Receive data and return chart configuration",
        },
        list_tools: { description: "List all available tools" },
      },
    },
  },
  {
    redisUrl: process.env.REDIS_URL,
    basePath: "",
    verboseLogs: true,
    maxDuration: 60,
    disableSse: true,
  }
);

export { mcpHandler as GET, mcpHandler as POST, mcpHandler as DELETE };
