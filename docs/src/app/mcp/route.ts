import { createMcpHandler } from "@vercel/mcp-adapter";
// /app/api/mcp/route.ts

const tools: string[] = [];
const mcpHandler = createMcpHandler(
  (server) => {
    server.tool(
      "echo",
      "Echo tool",
      { message: "string" },
      async ({ message }) => {
        return {
          content: [{ type: "text", text: message }],
          structuredContent: { message },
        };
      }
    );
    tools.push("echo");
    server.tool(
      "dice and roll",
      "Roll a dice and get a random number between 1 and 6",
      {
        sides: {
          type: "number",
          description: "Number of sides on the dice",
          default: 6,
        },
      },
      async ({ sides }) => {
        const roll = Math.floor(Math.random() * sides) + 1;
        return {
          content: [
            {
              type: "text",
              text: `You rolled a ${roll} on a ${sides}-sided dice.`,
            },
          ],
        };
      }
    );
    server.tool("list_tools", "List all available tools", {}, async () => {
      return { content: [{ type: "text", text: tools.join(", ") }] };
    });
    tools.push("list_tools");
  },
  {
    serverInfo: { name: "My MCP", version: "1.0" },
    capabilities: {
      tools: {
        echo: {
          description: "Echo tool",
        },
        list_tools: { description: "List all available tools" },
        "dice and roll": {
          description: "Roll a dice and get a random number between 1 and 6",
        },
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
