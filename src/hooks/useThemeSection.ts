"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, useGsapRegistration } from "@/animations/gsap";
import { useReducedMotion } from "./useReducedMotion";
import { THEMES, type ThemeName } from "@/lib/theme";

/** Scrubs the root surface/ink CSS variables toward this section's theme
 * as it crosses into view, so the whole page (sidebar included, since it
 * reads the same variables) morphs between light and dark bands instead
 * of hard-cutting. */
export function useThemeSection<T extends HTMLElement>(theme: ThemeName) {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();
  useGsapRegistration();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const vars = THEMES[theme];

    if (reducedMotion) {
      gsap.set(document.documentElement, vars);
      return;
    }

    const tween = gsap.to(document.documentElement, {
      ...vars,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
        end: "top 25%",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [theme, reducedMotion]);

  return ref;
}
