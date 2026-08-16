"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useNavBridge } from "./NavBridge";
import { useFlipMigrate } from "@/hooks/useFlipMigrate";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useMergedRefs } from "@/hooks/useMergedRefs";
import { useCursor } from "@/components/cursor/CursorProvider";
import { useIntroDone } from "./Intro";
import { profile } from "@/data/profile";
import { cn } from "@/utils/cn";

/** The one real, interactive CTA button — it starts sitting in the hero
 * and physically relocates (position + size) into the sidebar's CTA slot
 * as the hero scrolls away, rather than two separate buttons crossfading
 * into each other. */
export function HeroNavMigration() {
  const { ctaFrom, ctaTo } = useNavBridge();
  const introDone = useIntroDone();
  const isHome = usePathname() === "/";
  const [settled, setSettled] = useState(false);

  const flipRef = useFlipMigrate<HTMLAnchorElement>({
    fromRef: ctaFrom,
    toRef: ctaTo,
    enabled: introDone,
  });
  const magneticRef = useMagnetic<HTMLAnchorElement>(0.25);
  const mergedRef = useMergedRefs(flipRef, magneticRef);
  const { show, reset } = useCursor();

  useEffect(() => {
    if (!introDone) return;
    const id = requestAnimationFrame(() => setSettled(true));
    return () => cancelAnimationFrame(id);
  }, [introDone]);

  return (
    <a
      href={isHome ? "#contact" : "/#contact"}
      ref={mergedRef}
      onMouseEnter={() => show("view", "OPEN")}
      onMouseLeave={reset}
      className={cn(
        "fixed z-[75] hidden items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-7 py-3.5 text-sm font-medium tracking-tight text-[var(--color-accent-ink)] opacity-0 transition-opacity duration-500 lg:inline-flex",
        settled && "opacity-100",
      )}
      style={{ visibility: "hidden" }}
    >
      {profile.ctaLabel}
      <ArrowIcon />
    </a>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
