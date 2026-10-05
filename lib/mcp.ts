export const MCP_REGISTRY_URL =
  "https://raw.githubusercontent.com/swamimalode07/rare-ui/main/public/r/{name}.json";

export const MCP_COMPONENTS_JSON = `{
  "registries": {
    "@rare-ui": "${MCP_REGISTRY_URL}"
  }
}`;

export const MCP_CLIENTS = [
  {
    id: "claude",
    label: "Claude Code",
    command: "npx shadcn@latest mcp init --client claude",
  },
  {
    id: "cursor",
    label: "Cursor",
    command: "npx shadcn@latest mcp init --client cursor",
  },
  {
    id: "vscode",
    label: "VS Code",
    command: "npx shadcn@latest mcp init --client vscode",
  },
] as const;

export const MCP_CODEX = `[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]`;

export const MCP_PROMPT_DIRECT = "add fluid-orb";

export const MCP_PROMPT = "add @rare-ui/fluid-orb";

export const MCP_ASK = "Add the fluid orb from Rare UI";

export const MCP_CLI =
  "npx shadcn@latest add swamimalode07/rare-ui/fluid-orb";
