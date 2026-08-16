"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/animations/gsap";
import { navLinks, profile } from "@/data/profile";
import { useLenis } from "./SmoothScrollProvider";
import { MagneticButton } from "@/components/ui/MagneticButton";

type Props = {
  open: boolean;
  onClose: () => void;
  isHome: boolean;
};

export function MobileMenu({ open, onClose, isHome }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLAnchorElement[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const items = itemsRef.current.filter(Boolean);

    if (open) {
      document.body.classList.add("no-scroll");
      lenis?.stop();
      const tl = gsap.timeline();
      tl.set(panel, { display: "flex" });
      tl.fromTo(panel, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power4.inOut" });
      tl.fromTo(
        items,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power4.out" },
        "-=0.35",
      );
      tl.fromTo(closeRef.current, { opacity: 0, rotate: -90 }, { opacity: 1, rotate: 0, duration: 0.4 }, "-=0.5");
    } else {
      document.body.classList.remove("no-scroll");
      lenis?.start();
      gsap.to(panel, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.55,
        ease: "power4.inOut",
        onComplete: () => gsap.set(panel, { display: "none" }),
      });
    }
  }, [open, lenis]);

  const goToSection = (href: string) => {
    onClose();
    if (!isHome) {
      window.location.href = `/${href}`;
      return;
    }
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target instanceof HTMLElement) {
        lenis?.scrollTo(target, { offset: -24, duration: 1.4 });
      }
    }, 500);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    onClose();
    if (!isHome) return;
    e.preventDefault();
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target instanceof HTMLElement) {
        lenis?.scrollTo(target, { offset: -24, duration: 1.4 });
      }
    }, 500);
  };

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[95] hidden flex-col justify-between bg-[var(--color-bg)] px-6 pb-10 pt-6"
      style={{ clipPath: "inset(0 0 100% 0)" }}
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-ink)]">
          {profile.initials}
          <span className="text-[var(--color-accent)]">.</span>
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="relative h-8 w-8"
        >
          <span className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[var(--color-ink)]" />
          <span className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-[var(--color-ink)]" />
        </button>
      </div>

      <nav className="flex flex-col gap-1">
        {navLinks.map((link, i) => (
          <div key={link.href} className="overflow-hidden">
            <a
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              href={isHome ? link.href : `/${link.href}`}
              onClick={(e) => handleClick(e, link.href)}
              className="font-display block text-3xl font-medium text-[var(--color-ink)] transition-colors duration-300 hover:text-[var(--color-accent)]"
            >
              {link.label}
            </a>
          </div>
        ))}
      </nav>

      <div className="flex flex-col gap-5">
        <MagneticButton onClick={() => goToSection("#contact")} className="w-full justify-center">
          {profile.ctaLabel}
        </MagneticButton>
        <a
          href={profile.cvHref}
          download
          onClick={onClose}
          className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-accent)]"
        >
          Download CV ↓
        </a>
        <div className="flex flex-col gap-1">
          <a href={`mailto:${profile.email}`} className="font-mono text-sm text-[var(--color-ink-muted)]">
            {profile.email}
          </a>
          <a href={profile.phoneHref} className="font-mono text-sm text-[var(--color-ink-muted)]">
            {profile.phone}
          </a>
        </div>
        <div className="flex gap-4">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
