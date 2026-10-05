"use client";

import { useRef } from "react";

import FlightPath, { type FlightPathItem } from "@/components/ui/flight-path";

type Section = FlightPathItem & { body: string[] };

const sections: Section[] = [
  {
    id: "installation",
    label: "Installation",
    depth: 0,
    body: [
      "Add the package with your package manager of choice. It ships as a single module with no runtime configuration.",
      "The rest of this page walks through the requirements, the install itself and the first render.",
    ],
  },
  {
    id: "prerequisites",
    label: "Prerequisites",
    depth: 1,
    body: [
      "You need React 19 and a bundler that understands ES modules. Tailwind CSS v4 is used for styling.",
      "Server components are supported; the interactive parts render on the client.",
    ],
  },
  {
    id: "installation-steps",
    label: "Installation Steps",
    depth: 1,
    body: [
      "Run the install command, then import the component where you need it.",
      "No provider is required. Each instance owns its state.",
      "If your project uses path aliases, point the import at the alias instead of a relative path.",
    ],
  },
  {
    id: "configuration",
    label: "Configuration",
    depth: 1,
    body: [
      "Every option has a default, so configuration is optional. Pass props to override the ones you care about.",
      "Theme colors come from the foreground and background tokens, so light and dark modes work without extra setup.",
    ],
  },
  {
    id: "usage",
    label: "Usage",
    depth: 0,
    body: [
      "Render the component next to your content and point it at the headings it should track.",
      "Each heading needs an id that matches an item in the list.",
    ],
  },
  {
    id: "customizing-content",
    label: "Customizing Content",
    depth: 1,
    body: [
      "Labels are plain strings, so they can be translated or shortened independently of the headings they point to.",
      "Depth controls how far each item is indented. The rail bends to follow it.",
    ],
  },
  {
    id: "submenu-content",
    label: "Submenu Content",
    depth: 2,
    body: [
      "Nest as deep as your document goes. Each level adds one indent step.",
      "Deep nesting reads best when the labels stay short.",
    ],
  },
  {
    id: "features",
    label: "Features",
    depth: 0,
    body: [
      "Click any item to scroll to its heading. The solid rail marks what you have read; the dashed rail marks what is left.",
      "Reduced motion is respected: the plane moves without springs and scrolling jumps instead of gliding.",
    ],
  },
];

const items: FlightPathItem[] = sections.map(({ id, label, depth }) => ({
  id,
  label,
  depth,
}));

export default function Demo() {
  const scrollRef = useRef<HTMLElement>(null);

  return (
    <div className="flex h-full gap-10 overflow-hidden p-6">
      <aside className="w-52 shrink-0 pt-2">
        <FlightPath items={items} containerRef={scrollRef} />
      </aside>

      <main
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <article className="max-w-2xl">
          {sections.map((section) => {
            const Heading = section.depth === 0 ? "h2" : "h3";
            return (
              <section key={section.id} className="mt-10 first:mt-0">
                <Heading
                  id={section.id}
                  className={
                    section.depth === 0
                      ? "border-b pb-2 font-cal text-3xl font-medium tracking-wide text-foreground/90"
                      : "font-cal text-lg font-normal tracking-wide text-foreground/80"
                  }
                >
                  {section.label}
                </Heading>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-3 font-sans text-sm leading-6 text-foreground/40"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            );
          })}
        </article>
      </main>
    </div>
  );
}
