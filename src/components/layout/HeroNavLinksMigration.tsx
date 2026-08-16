"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useNavBridge } from "./NavBridge";
import { useFlipMigrate } from "@/hooks/useFlipMigrate";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useLenis } from "./SmoothScrollProvider";
import { useIntroDone } from "./Intro";
import { navLinks } from "@/data/profile";
import { NAV_ICONS } from "@/components/ui/NavIcons";
import { cn } from "@/utils/cn";

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

/** The nav links' real, interactive pills — they start laid out in the
 * hero (so the hero shows the full nav from the first frame, matching the
 * reference) and physically relocate into the sidebar's slots via FLIP as
 * the hero scrolls away, the same mechanism HeroNavMigration already uses
 * for the single CTA button, just multiplied across the whole nav list. */
export function HeroNavLinksMigration() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeId = useActiveSection(isHome ? sectionIds : []);
  const introDone = useIntroDone();

  return (
    <>
      {navLinks.map((link) => (
        <NavLinkMigrator
          key={link.href}
          href={link.href}
          label={link.label}
          active={link.href.replace("#", "") === activeId}
          isHome={isHome}
          introDone={introDone}
        />
      ))}
    </>
  );
}

function NavLinkMigrator({
  href,
  label,
  active,
  isHome,
  introDone,
}: {
  href: string;
  label: string;
  active: boolean;
  isHome: boolean;
  introDone: boolean;
}) {
  const { navFrom, navTo } = useNavBridge();
  const lenis = useLenis();
  const [settled, setSettled] = useState(false);
  const Icon = NAV_ICONS[label];

  const flipRef = useFlipMigrate<HTMLAnchorElement>({
    fromRef: navFrom[href],
    toRef: navTo[href],
    enabled: introDone,
  });

  useEffect(() => {
    if (!introDone) return;
    const id = requestAnimationFrame(() => setSettled(true));
    return () => cancelAnimationFrame(id);
  }, [introDone]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target instanceof HTMLElement) {
      lenis?.scrollTo(target, { offset: -12, duration: 1.4 });
    }
  };

  return (
    <a
      href={isHome ? href : `/${href}`}
      onClick={handleClick}
      ref={flipRef}
      className={cn(
        "fixed z-[72] hidden items-center gap-3 whitespace-nowrap rounded-[var(--radius-pill)] px-3 py-2 font-mono text-xs uppercase tracking-[0.15em] opacity-0 transition-[opacity,background-color,color] duration-500 lg:flex",
        settled && "opacity-100",
        active ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)]" : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]",
      )}
      style={{ visibility: "hidden" }}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">{Icon && <Icon />}</span>
      <span>{label}</span>
    </a>
  );
}
