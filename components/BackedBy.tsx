"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
  type Transition,
} from "motion/react";

import { cn } from "@/lib/utils";
import { sponsorsByTier, type Sponsor } from "@/lib/sponsors";

const DWELL = 2600;
const ROLL: Transition = { type: "spring", visualDuration: 0.62, bounce: 0.16 };
const SIZE: Transition = { type: "spring", visualDuration: 0.5, bounce: 0.1 };

// the viewport runs taller than the tallest lockup so the mask fades through slack, not through a logo
const VIEWPORT = "h-4.5 sm:h-6";

const FADE = `linear-gradient(to bottom,
  rgba(0,0,0,0) 0%,
  rgba(0,0,0,0.4) 5%,
  #000 13%,
  #000 87%,
  rgba(0,0,0,0.4) 95%,
  rgba(0,0,0,0) 100%)`;

const mod = (n: number, m: number) => ((n % m) + m) % m;

function Logo({ sponsor }: { sponsor: Sponsor }) {
  const height = sponsor.compactHeight ?? "h-4";
  return (
    <>
      <img
        src={sponsor.lightSrc}
        alt={sponsor.name}
        className={cn("w-auto object-contain dark:hidden", height)}
      />
      <img
        src={sponsor.darkSrc}
        alt={sponsor.name}
        className={cn("hidden w-auto object-contain dark:block", height)}
      />
    </>
  );
}

function Slide({
  sponsor,
  index,
  count,
  pos,
  onFocus,
  ref,
}: {
  sponsor: Sponsor;
  index: number;
  count: number;
  pos: MotionValue<number>;
  onFocus: () => void;
  ref: (node: HTMLSpanElement | null) => void;
}) {
  // wrapping through the half turn keeps the jump from last back to first off screen
  const y = useTransform(
    pos,
    (p) => `${(mod(index - p + count / 2, count) - count / 2) * 100}%`,
  );

  return (
    <motion.span
      ref={ref}
      style={{ y }}
      className="col-start-1 row-start-1 flex w-max items-center justify-self-start"
    >
      <a
        href={sponsor.href}
        target="_blank"
        rel="noopener"
        onFocus={onFocus}
        className="grayscale transition-[filter] duration-200 ease-out hover:grayscale-0 focus-visible:grayscale-0"
      >
        <Logo sponsor={sponsor} />
      </a>
    </motion.span>
  );
}

function Roller({ sponsors }: { sponsors: Sponsor[] }) {
  const count = sponsors.length;
  const pos = useMotionValue(0);
  const width = useMotionValue(0);
  const goal = useRef(0);
  const widths = useRef<number[]>([]);
  const items = useRef<(HTMLSpanElement | null)[]>([]);
  const [measured, setMeasured] = useState(false);
  const [held, setHeld] = useState(false);
  const [away, setAway] = useState(false);
  const first = useRef(true);

  const aim = useCallback(
    (index: number) => {
      const next = widths.current[index];
      if (next) animate(width, next, SIZE);
    },
    [width],
  );

  useEffect(() => {
    const nodes = items.current.filter((node) => node !== null);
    if (nodes.length !== count) return;

    const read = () => {
      const seen = nodes.map((node) => node.getBoundingClientRect().width);
      if (seen.some((value) => value === 0)) return;
      widths.current = seen;
      const target = seen[mod(Math.round(goal.current), count)];
      // the pill renders at its natural max until the logos load, so the first fit is animated too
      if (first.current) {
        first.current = false;
        width.set(Math.max(...seen));
        setMeasured(true);
      }
      animate(width, target, SIZE);
    };

    const observer = new ResizeObserver(read);
    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [count, width]);

  // a hidden tab still fires the interval, so the roll would bank turns and unwind on return
  useEffect(() => {
    const track = () => setAway(document.hidden);
    track();
    document.addEventListener("visibilitychange", track);
    return () => document.removeEventListener("visibilitychange", track);
  }, []);

  useEffect(() => {
    if (held || away || !measured) return;
    const timer = setInterval(() => {
      goal.current += 1;
      animate(pos, goal.current, ROLL);
      aim(mod(goal.current, count));
    }, DWELL);
    return () => clearInterval(timer);
  }, [aim, away, count, held, measured, pos]);

  // focusing an off screen link would otherwise scroll the hero, so the roll follows the focus
  const show = (index: number) => {
    const at = pos.get();
    goal.current = at + mod(index - at + count / 2, count) - count / 2;
    animate(pos, goal.current, ROLL);
    aim(index);
  };

  return (
    <motion.span
      style={{
        width: measured ? width : undefined,
        maskImage: FADE,
        WebkitMaskImage: FADE,
      }}
      onHoverStart={() => setHeld(true)}
      onHoverEnd={() => setHeld(false)}
      className={cn("grid overflow-hidden", VIEWPORT, !measured && "w-auto")}
    >
      {sponsors.map((sponsor, index) => (
        <Slide
          key={sponsor.name}
          sponsor={sponsor}
          index={index}
          count={count}
          pos={pos}
          onFocus={() => show(index)}
          ref={(node) => {
            items.current[index] = node;
          }}
        />
      ))}
    </motion.span>
  );
}

function Row({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <span className={cn("flex items-center gap-4 sm:gap-5", VIEWPORT)}>
      {sponsors.map((sponsor) => (
        <a
          key={sponsor.name}
          href={sponsor.href}
          target="_blank"
          rel="noopener"
          className="grayscale hover:grayscale-0"
        >
          <Logo sponsor={sponsor} />
        </a>
      ))}
    </span>
  );
}

export default function BackedBy() {
  const sponsors = sponsorsByTier("diamond");
  const reduced = useReducedMotion();
  if (sponsors.length === 0) return null;
  // one sponsor has nowhere to roll to, so it would cycle out and back to itself
  const rolls = sponsors.length > 1 && !reduced;

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-black/[0.07] bg-white/70 px-4 py-1 ring-black/15 has-[:focus-visible]:ring-2 sm:gap-4 sm:pl-4 sm:pr-5 dark:border-transparent dark:border-apple dark:bg-white/[0.045] dark:ring-white/25">
      <span className="hidden font-runde text-[11px] font-semibold uppercase tracking-[0.12em] text-black/45 sm:inline dark:text-white/45">
        Backed by
      </span>
      <span className="hidden h-3.5 w-px bg-black/10 sm:inline-block dark:bg-white/15" />
      {rolls ? <Roller sponsors={sponsors} /> : <Row sponsors={sponsors} />}
    </div>
  );
}
