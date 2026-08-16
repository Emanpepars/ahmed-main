"use client";

import { RevealText } from "@/components/ui/RevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useThemeSection } from "@/hooks/useThemeSection";
import { useCursor } from "@/components/cursor/CursorProvider";
import { profile } from "@/data/profile";

export function ContactCTA() {
  const themeRef = useThemeSection<HTMLElement>("dark");
  const magneticRef = useMagnetic<HTMLDivElement>(0.5);
  const { show, reset } = useCursor();

  return (
    <section ref={themeRef} id="contact" className="relative py-[var(--space-section)]">
      <div className="container-edge flex flex-col items-center text-center">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
          {profile.availability}
        </span>

        <RevealText
          as="h2"
          blur
          className="font-display mt-6 max-w-4xl text-5xl font-medium leading-[1.02] tracking-tight text-[var(--color-ink)] sm:text-7xl lg:text-8xl"
        >
          Have a project in mind? Let&apos;s build something great.
        </RevealText>

        <div
          ref={magneticRef}
          className="group relative mt-14 flex h-40 w-40 cursor-pointer items-center justify-center rounded-full bg-[var(--color-accent)] transition-transform duration-500 sm:h-52 sm:w-52"
          onMouseEnter={() => show("open", "SAY HELLO")}
          onMouseLeave={reset}
        >
          <a
            href={`mailto:${profile.email}`}
            className="flex h-full w-full items-center justify-center rounded-full"
            aria-label={`Email ${profile.email}`}
          >
            <ArrowUpRight />
          </a>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton href={`mailto:${profile.email}`} variant="outline" cursorText="OPEN">
            {profile.email}
          </MagneticButton>
          <MagneticButton href={profile.phoneHref} variant="outline" cursorText="CALL">
            {profile.phone}
          </MagneticButton>
        </div>

        <a
          href={profile.cvHref}
          download
          className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)] underline decoration-[var(--color-line)] underline-offset-8 transition-colors hover:text-[var(--color-ink)] hover:decoration-[var(--color-accent)]"
        >
          Download CV ↓
        </a>
      </div>
    </section>
  );
}

function ArrowUpRight() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="transition-transform duration-500 group-hover:rotate-45">
      <path d="M7 17L17 7M17 7H9M17 7V15" stroke="var(--color-accent-ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
