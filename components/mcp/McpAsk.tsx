import McpCode from "@/components/mcp/McpCode";
import { MCP_ASK, MCP_PROMPT, MCP_PROMPT_DIRECT } from "@/lib/mcp";

export default function McpAsk() {
  return (
    <div className="flex flex-col gap-2">
      <p className="px-1 font-mono text-[12.5px] leading-relaxed text-muted-foreground/60 line-through decoration-foreground/35">
        {MCP_PROMPT_DIRECT}
      </p>
      <McpCode value={MCP_PROMPT} />
      <McpCode value={MCP_ASK} />
    </div>
  );
}
