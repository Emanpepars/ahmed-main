"use client";

import { navLinks, profile } from "@/data/profile";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";

export function Footer() {
  const ref = useStaggerReveal<HTMLDivElement>({ selector: "[data-reveal-item]", y: 24, start: "top 95%" });

  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-bg)] pb-8 pt-16">
      <div ref={ref} className="container-edge">
        <div data-reveal-item className="flex flex-col gap-10 border-b border-[var(--color-line)] pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-display block text-3xl font-medium text-[var(--color-ink)] md:text-4xl">
              {profile.name}
            </span>
            <span className="mt-2 block font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
              {profile.title}
            </span>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-sm text-[var(--color-ink)] underline decoration-[var(--color-line)] underline-offset-4 transition-colors hover:decoration-[var(--color-accent)]"
            >
              {profile.email}
            </a>
            <a
              href={profile.phoneHref}
              className="font-mono text-sm text-[var(--color-ink-muted)] underline decoration-[var(--color-line)] underline-offset-4 transition-colors hover:decoration-[var(--color-accent)]"
            >
              {profile.phone}
            </a>
          </div>
        </div>

        <div data-reveal-item className="flex flex-col gap-8 pt-10 md:flex-row md:items-start md:justify-between">
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-wrap gap-6">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)]"
              >
                {s.label}
              </a>
            ))}
            <a
              href={profile.cvHref}
              download
              className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-accent)] transition-opacity hover:opacity-70"
            >
              Download CV
            </a>
          </div>
        </div>

        <div data-reveal-item className="mt-10 flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-ink-faint)] md:flex-row md:justify-between">
          <span>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <span>Designed &amp; built from scratch.</span>
        </div>
      </div>
    </footer>
  );
}
