"use client";

import CopyButton from "@/components/CopyButton";
import { cn } from "@/lib/utils";

export default function McpCode({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl border border-black/[0.06] bg-[#F5F5F7] px-3.5 py-3 dark:border-neutral-500/15 dark:bg-neutral-950",
        className,
      )}
    >
      <pre className="min-w-0 flex-1 overflow-x-auto font-mono text-[12.5px] leading-relaxed text-foreground/80">
        <code>{value}</code>
      </pre>
      <CopyButton
        value={value}
        className="text-foreground/45 hover:text-foreground"
      />
    </div>
  );
}
