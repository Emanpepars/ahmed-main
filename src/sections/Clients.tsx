"use client";

import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { useThemeSection } from "@/hooks/useThemeSection";
import { profile } from "@/data/profile";

/** Replaces the template's invented testimonials — the same dark section
 * slot, but showing only names that can actually be stood behind: the
 * employers on the CV and the brands named in the published project work. */
export function Clients() {
  const themeRef = useThemeSection<HTMLElement>("dark");
  const ref = useStaggerReveal<HTMLDivElement>({ selector: "[data-client]", y: 24, stagger: 0.06 });

  return (
    <section ref={themeRef} id="clients" className="relative py-[var(--space-section)]">
      <div className="container-edge">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
          Clients
        </span>
        <h2 className="font-display mt-4 max-w-xl text-4xl font-medium leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-5xl">
          Brands the work has been made for.
        </h2>

        <div
          ref={ref}
          className="mt-14 grid grid-cols-2 border-l border-t border-[var(--color-line)] sm:grid-cols-3 lg:grid-cols-4"
        >
          {profile.clients.map((name) => (
            <div
              key={name}
              data-client
              className="flex min-h-28 items-center justify-center border-b border-r border-[var(--color-line)] px-6 py-8 text-center transition-colors duration-500 hover:bg-[var(--color-bg-raised)]"
            >
              <span className="font-display text-lg font-medium tracking-tight text-[var(--color-ink-muted)] transition-colors duration-300 sm:text-xl">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
