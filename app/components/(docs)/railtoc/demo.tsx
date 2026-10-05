"use client";

import { useRef } from "react";

import RailToc, { type RailTocItem } from "@/components/ui/rail-toc";

const items: RailTocItem[] = [
  { id: "installation", label: "Installation", depth: 0 },
  { id: "prerequisites", label: "Prerequisites", depth: 1 },
  { id: "installation-steps", label: "Installation Steps", depth: 1 },
  { id: "configuration", label: "Configuration", depth: 1 },
  { id: "usage", label: "Usage", depth: 0 },
  { id: "customizing-content", label: "Customizing Content", depth: 1 },
  { id: "submenu-content", label: "Submenu Content", depth: 2 },
  { id: "features", label: "Features", depth: 0 },
];

export default function Demo() {
  const scrollRef = useRef<HTMLElement>(null);

  return (
    <main
      ref={scrollRef}
      className="h-full overflow-auto [container-type:size] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="grid">
        <div className="sticky top-0 z-10 flex h-[100cqh] items-center justify-center self-start [grid-area:1/1]">
          <RailToc items={items} containerRef={scrollRef} />
        </div>

        {/* empty sections the toc tracks, so the preview has something to scroll */}
        <div className="[grid-area:1/1]" aria-hidden>
          {items.map((item) => (
            <div key={item.id} id={item.id} className="h-[50cqh]" />
          ))}
        </div>
      </div>
    </main>
  );
}
