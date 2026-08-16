"use client";

import { useHeroIntro } from "@/animations/useHeroIntro";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PortraitImage } from "@/components/ui/PortraitImage";
import { StatBlock } from "@/components/ui/StatBlock";
import { useThemeSection } from "@/hooks/useThemeSection";
import { useMergedRefs } from "@/hooks/useMergedRefs";
import { useNavBridge } from "@/components/layout/NavBridge";
import { profile, navLinks } from "@/data/profile";
import { useCursor } from "@/components/cursor/CursorProvider";

// Sampled from the studio backdrop in the portrait photo itself — the hero
// background is set to this exact color so the photo's rectangular bounds
// have nothing to contrast against, instead of masking or cropping the
// image to fake a blend.
const HERO_BG = "#a8b09e";

// Split into two flanking groups the way the reference lays its hero nav
// out around the giant name, rather than one long row.
const navLeft = navLinks.slice(0, 3);
const navRight = navLinks.slice(3);

export function Hero() {
  const { sectionRef, eyebrowRef, headingRef, subRef, ctasRef, visualRef, bgTextRef, statsRef, bgLayerRef } =
    useHeroIntro();
  const themeRef = useThemeSection<HTMLElement>("light");
  const rootRef = useMergedRefs(sectionRef, themeRef);
  const { show, reset } = useCursor();
  const { ctaFrom, navFrom } = useNavBridge();

  return (
    <section
      ref={rootRef}
      id="hero"
      className="hero-scroll-transition relative z-10 flex min-h-screen flex-col justify-end overflow-hidden pt-32 pb-12 xl:pb-0"
    >
      <div
        ref={bgLayerRef}
        className="hero-background absolute inset-0 z-0"
        style={{ backgroundColor: HERO_BG }}
        aria-hidden
      />

      {/* Invisible sizing/position markers for the nav links — the real,
          interactive pills live in HeroNavLinksMigration and start out
          right here (so the full nav is visible in the hero from the
          first frame) before relocating into the sidebar via FLIP as the
          hero scrolls out. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-10 z-[2] hidden items-start justify-between px-[var(--space-gutter)] lg:flex"
      >
        <div className="flex gap-1">
          {navLeft.map((link) => (
            <div
              key={link.href}
              ref={navFrom[link.href] as React.RefObject<HTMLDivElement>}
              className="invisible flex items-center gap-3 whitespace-nowrap rounded-[var(--radius-pill)] px-3 py-2 font-mono text-xs uppercase tracking-[0.15em]"
            >
              <span className="h-5 w-5" />
              <span>{link.label}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          {navRight.map((link) => (
            <div
              key={link.href}
              ref={navFrom[link.href] as React.RefObject<HTMLDivElement>}
              className="invisible flex items-center gap-3 whitespace-nowrap rounded-[var(--radius-pill)] px-3 py-2 font-mono text-xs uppercase tracking-[0.15em]"
            >
              <span className="h-5 w-5" />
              <span>{link.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={bgTextRef}
        aria-hidden
        className="hero-name-layer pointer-events-none absolute inset-x-0 top-[12%] z-[1] flex select-none justify-center opacity-0"
      >
        <span className="font-display whitespace-nowrap text-[24vw] font-semibold leading-none text-[var(--color-accent)] sm:text-[20vw] xl:text-[15vw]">
          {profile.firstName.toUpperCase()}
        </span>
      </div>

      {/* Large layered portrait — sandwiched between the giant outline name
          (behind) and the heading/CTA content (in front), the way the
          reference composition works, instead of a small fixed-size photo
          card sitting beside the text. Only promoted to this scale/position
          from xl up; below that it stays a simple centered block above the
          text so it doesn't crowd the heading on narrow viewports. */}
      <div
        ref={visualRef}
        className="hero-portrait-layer relative z-[5] mx-auto aspect-[520/670] w-full max-w-xs xl:absolute xl:inset-y-0 xl:right-[1%] xl:mx-0 xl:aspect-auto xl:w-[48%] xl:max-w-none"
        onMouseEnter={() => show("explore", "EXPLORE")}
        onMouseLeave={reset}
      >
        <PortraitImage src={profile.portraitSrc} alt={profile.name} className="absolute inset-0 h-full w-full" />

        {/* Stat chips keep a fixed dark-glass treatment regardless of the
            section's light/dark theme, so their own ink tokens are pinned
            locally instead of following the page-wide swap. */}
        <div
          ref={statsRef}
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{ "--color-ink": "#f4f2ec", "--color-ink-faint": "#9a9a9f" } as React.CSSProperties}
        >
          <div className="absolute left-0 top-4 rounded-[var(--radius-md)] border border-white/15 bg-black/35 px-4 py-3 backdrop-blur-md xl:left-4">
            <StatBlock value={profile.miniStats[0].value} label={profile.miniStats[0].label} size="sm" animate={false} />
          </div>
          <div className="absolute -left-4 bottom-16 hidden rounded-[var(--radius-md)] border border-white/15 bg-black/35 px-4 py-3 backdrop-blur-md sm:block">
            <StatBlock value={profile.miniStats[1].value} label={profile.miniStats[1].label} size="sm" animate={false} />
          </div>
        </div>
      </div>

      <div className="hero-content-layer container-edge relative z-20 flex flex-col gap-10 pb-2 xl:max-w-xl xl:pb-16">
        <div>
          <div ref={eyebrowRef} className="mb-6 flex items-center gap-3 opacity-0">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ink-muted)]">
              {profile.title} — {profile.location}
            </span>
          </div>

          <h1
            ref={headingRef}
            className="font-display max-w-3xl text-[clamp(2.75rem,9vw,4.75rem)] font-medium leading-[0.95] tracking-tight text-[var(--color-ink)] xl:text-[clamp(2.75rem,4vw,4rem)]"
          >
            {profile.tagline}
          </h1>

          <p
            ref={subRef}
            className="mt-8 max-w-md text-base leading-relaxed text-[var(--color-ink-muted)] opacity-0 sm:text-lg"
          >
            {profile.heroDescription}
          </p>

          <div ref={ctasRef} className="mt-10 flex flex-wrap items-center gap-4 opacity-0">
            <MagneticButton href="#work" cursorText="VIEW">
              See Selected Work
            </MagneticButton>
            {/* Invisible sizing/position marker — the real "Start a Project"
                button lives in HeroNavMigration and physically relocates
                here-to-sidebar via FLIP as the hero scrolls out. */}
            <div
              ref={ctaFrom as React.RefObject<HTMLDivElement>}
              aria-hidden
              className="invisible inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-pill)] px-7 py-3.5 text-sm font-medium tracking-tight"
            >
              {profile.ctaLabel}
              <span className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
