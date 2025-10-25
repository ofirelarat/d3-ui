import { createMcpHandler } from "@vercel/mcp-adapter";
import z from "zod";
// /app/api/mcp/route.ts
import { code as GaugeCode } from "../charts/gauge/GaugeExample";
import { code as HitmapCode } from "../charts/heatmap/HeatmapExample";
import { code as LineCode } from "../charts/line/LineChartExample";
import { code as ScatterPlotCode } from "../charts/scatter-plot/ScatterPlotExample";
import { code as TreemapCode } from "../charts/treemap/TreemapExample";

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
      {
        chartType: z.enum(["gauge", "heatmap", "line", "scatter", "treemap"]),
      },
      async ({ chartType }) => {
        switch (chartType) {
          case "gauge":
            return {
              content: [
                { type: "text", text: GaugeCode, language: "typescript" },
              ],
            };
          case "heatmap":
            return {
              content: [
                { type: "text", text: HitmapCode, language: "typescript" },
              ],
            };
          case "line":
            return {
              content: [
                { type: "text", text: LineCode, language: "typescript" },
              ],
            };
          case "scatter":
            return {
              content: [
                { type: "text", text: ScatterPlotCode, language: "typescript" },
              ],
            };
          case "treemap":
            return {
              content: [
                { type: "text", text: TreemapCode, language: "typescript" },
              ],
            };
          default:
            return {
              content: [{ type: "text", text: "Please specify a chart type." }],
            };
        }
      }
    );
    tools.push("example_chart");

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
