"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, useGsapRegistration } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIntroDone } from "./Intro";
import { PortraitImage } from "@/components/ui/PortraitImage";
import { profile } from "@/data/profile";

/** A true top-level fixed layer (sibling of the sections, not nested inside
 * Hero) that carries the portrait's dissolve onward past the hero's own
 * pinned exit — lingering as a heavily blurred ghost behind Work's content
 * for a stretch of scroll, the way the reference's own profile-img layer
 * does. Rendering it inside Hero itself doesn't work: GSAP's pin applies a
 * transform to the section, which makes that section a containing block
 * for any `position: fixed` descendant, so a "fixed" portrait nested in
 * there gets clipped to the section's own (overflow-hidden) box instead of
 * truly escaping to the viewport. Only active at xl — the breakpoint where
 * Hero's own inline portrait switches to its full-bleed layered treatment. */
export function HeroPortraitGhost() {
  const ref = useRef<HTMLDivElement>(null);
  const introDone = useIntroDone();
  const reducedMotion = useReducedMotion();
  // This layer only means anything as a continuation of the hero's exit.
  // On routes with no hero its scroll progress is measured from y=0, so it
  // faded a giant blurred portrait in over the project pages instead.
  const isHome = usePathname() === "/";
  useGsapRegistration();

  useLayoutEffect(() => {
    if (reducedMotion || !introDone || !isHome) return;
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1280px)", () => {
      gsap.set(el, { opacity: 0 });

      // Driven by a directly-computed scroll progress (gsap.ticker + raw
      // scrollY), not a second ScrollTrigger on the same "#hero" element
      // Hero's own effect pins — independent triggers on a pinned element
      // measure unreliably (the pin-spacer shifts what "top top" resolves
      // to depending on creation order across components), which is
      // exactly the bug this replaced: the ghost was drifting out of sync
      // with the pinned hero exit. This mirrors useFlipMigrate's approach
      // to the same underlying problem.
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(
        el,
        { opacity: 0, scale: 1.04, filter: "blur(4px)" },
        { opacity: 0.95, scale: 0.96, filter: "blur(12px)", ease: "none", duration: 0.5 },
        0,
      ).to(el, { opacity: 0, scale: 0.85, yPercent: -10, filter: "blur(28px)", ease: "none", duration: 0.5 }, 0.5);

      // Measured ONCE, before any scrolling — not inside the ticker. Once
      // Hero's own effect pins the section it becomes position:fixed, so a
      // live getBoundingClientRect().top call here would always read ~0
      // and silently track scrollY itself, permanently pinning progress
      // at 0 (this exact bug showed up in the sidebar-reveal tween, which
      // shares this pattern — fixed there the same way).
      const hero = document.getElementById("hero");
      const heroStartY = hero ? window.scrollY + hero.getBoundingClientRect().top : 0;
      const update = () => {
        const range = window.innerHeight * 2.6;
        const progress = Math.min(1, Math.max(0, (window.scrollY - heroStartY) / range));
        tl.progress(progress);
      };

      gsap.ticker.add(update);

      return () => {
        gsap.ticker.remove(update);
        tl.kill();
      };
    });

    return () => mm.revert();
  }, [reducedMotion, introDone, isHome]);

  if (!isHome) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-y-0 right-[1%] z-[5] hidden w-[48%] opacity-0 xl:block"
    >
      <PortraitImage src={profile.portraitSrc} alt="" className="absolute inset-0 h-full w-full" />
    </div>
  );
}
