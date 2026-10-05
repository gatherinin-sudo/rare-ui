"use client";

import { useState } from "react";
import McpCode from "@/components/mcp/McpCode";
import { MCP_CLIENTS } from "@/lib/mcp";
import { cn } from "@/lib/utils";

export default function McpClients() {
  const [active, setActive] = useState<(typeof MCP_CLIENTS)[number]["id"]>(
    "claude",
  );
  const current =
    MCP_CLIENTS.find((client) => client.id === active) ?? MCP_CLIENTS[0];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-1">
        {MCP_CLIENTS.map((client) => {
          const selected = client.id === active;
          return (
            <button
              key={client.id}
              type="button"
              onClick={() => setActive(client.id)}
              data-active={selected}
              className={cn(
                "cursor-pointer rounded-md px-2 py-1 text-xs font-medium transition-colors",
                selected
                  ? "bg-muted text-foreground"
                  : "text-foreground/40 hover:text-foreground/70",
              )}
            >
              {client.label}
            </button>
          );
        })}
      </div>
      <McpCode value={current.command} />
    </div>
  );
}
