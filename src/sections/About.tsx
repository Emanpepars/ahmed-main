"use client";

import { RevealText } from "@/components/ui/RevealText";
import { GradientPlate } from "@/components/ui/GradientPlate";
import { StatBlock } from "@/components/ui/StatBlock";
import { useParallax } from "@/hooks/useParallax";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { useThemeSection } from "@/hooks/useThemeSection";
import { profile } from "@/data/profile";

export function About() {
  const themeRef = useThemeSection<HTMLElement>("light");
  const imageRef = useParallax<HTMLDivElement>(-12);
  const skillsRef = useStaggerReveal<HTMLDivElement>({ selector: "[data-skill]", y: 16, stagger: 0.05 });

  return (
    <section ref={themeRef} id="about" className="relative py-[var(--space-section)]">
      <div className="container-edge">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
          About
        </span>

        <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          <div>
            <RevealText
              as="h2"
              blur
              className="font-display max-w-3xl text-4xl font-medium leading-[1.15] tracking-tight text-[var(--color-ink)] sm:text-5xl lg:text-6xl"
            >
              Print, digital, and screen — I build visual content that holds a brand together everywhere it shows up.
            </RevealText>

            <RevealText
              as="p"
              className="mt-8 max-w-xl text-base leading-relaxed text-[var(--color-ink-muted)] sm:text-lg"
              start="top 90%"
            >
              Six years between Tunisia and the UAE: full-cycle video production for agency clients in Sousse, then brand and social work for a Dubai clinic, and retail merchandising and campaign design across UAE stores. A master&apos;s in graphic design underneath it, and a habit of pulling AI tools into the process wherever they genuinely earn their place.
            </RevealText>

            <div ref={skillsRef} className="mt-12 flex flex-wrap gap-3">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  data-skill
                  className="rounded-[var(--radius-pill)] border border-[var(--color-line)] px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-[var(--color-ink-muted)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[var(--radius-lg)]">
            <div ref={imageRef} className="absolute inset-[-10%]">
              <GradientPlate from="#1b2a1f" to="#c8ff4d" className="h-full w-full" />
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-8 border-t border-[var(--color-line)] pt-10 sm:grid-cols-4">
          {profile.stats.map((stat) => (
            <StatBlock key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
