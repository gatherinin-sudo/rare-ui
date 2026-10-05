import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import GooeyNavbar from "@/components/GooeyNavbar";
import McpAsk from "@/components/mcp/McpAsk";
import McpClients from "@/components/mcp/McpClients";
import McpCode from "@/components/mcp/McpCode";
import { fetchStarCount } from "@/lib/github";
import { MCP_CLI, MCP_CODEX, MCP_COMPONENTS_JSON } from "@/lib/mcp";
import { SITE_NAME } from "@/lib/site";

const DESCRIPTION =
  "Add Rare UI from Claude Code, Cursor, Codex, or VS Code. One registry in components.json, then ask for any component.";

export const metadata: Metadata = {
  title: "MCP",
  description: DESCRIPTION,
  alternates: {
    canonical: "/mcp",
  },
  openGraph: {
    title: `MCP | ${SITE_NAME}`,
    description: DESCRIPTION,
    url: "/mcp",
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
};

const STEPS = [
  {
    heading: "Add the registry",
    body: "In the project that already has shadcn, open components.json and add this. Leave {name} as written. Your app needs shadcn init first: components.json, Tailwind, and the cn helper.",
    code: MCP_COMPONENTS_JSON,
  },
  {
    heading: "Turn on the shadcn MCP server",
    body: "Run this in that same project, then restart the editor. In Claude Code, /mcp should list shadcn as connected. In Cursor, enable shadcn under MCP settings.",
  },
  {
    heading: "Ask for a component",
    body: "Name @rare-ui, or just ask in a sentence. A bare add fluid-orb looks in the default shadcn set, so that one is crossed out. The file lands in your components/ui folder. You own it after that.",
  },
];

export default async function McpPage() {
  const stars = await fetchStarCount();

  return (
    <>
      <GooeyNavbar stars={stars} />

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-24 pt-32 sm:px-6 md:pt-40">
        <header className="flex flex-col gap-3">
          <h1 className="font-runde text-3xl font-bold tracking-tight sm:text-4xl">
            MCP
          </h1>
          <p className="font-medium text-muted-foreground">{DESCRIPTION}</p>
        </header>

        <div className="mt-12 flex flex-col gap-10">
          {STEPS.map((step, index) => (
            <section key={step.heading} className="flex flex-col gap-3">
              <h2 className="flex items-center gap-2.5 font-runde text-lg font-bold tracking-tight">
                <span className="flex size-6 items-center justify-center rounded-full bg-[#FC4C01]/10 font-mono text-xs font-medium text-[#FC4C01]">
                  {index + 1}
                </span>
                {step.heading}
              </h2>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                {step.body}
              </p>
              {index === 1 ? <McpClients /> : null}
              {index === 2 ? <McpAsk /> : null}
              {step.code ? <McpCode value={step.code} /> : null}
            </section>
          ))}

          <section className="flex flex-col gap-3">
            <h2 className="font-runde text-lg font-bold tracking-tight">
              Codex
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Codex does not write its config for you. Add this to
              ~/.codex/config.toml, then restart Codex. The registries block in
              components.json is the same.
            </p>
            <McpCode value={MCP_CODEX} />
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-runde text-lg font-bold tracking-tight">
              Without MCP
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              The CLI installs the same files. Browse every component on the{" "}
              <Link
                href="/components"
                className="text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors duration-150 ease-out hover:decoration-foreground"
              >
                components
              </Link>{" "}
              page.
            </p>
            <McpCode value={MCP_CLI} />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
