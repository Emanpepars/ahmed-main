"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, useGsapRegistration } from "@/animations/gsap";
import { useReducedMotion } from "./useReducedMotion";

/** Scrubs an element's yPercent as its trigger scrolls through the
 * viewport — shared parallax primitive for images/panels site-wide. */
export function useParallax<T extends HTMLElement>(yPercent = 15) {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();
  useGsapRegistration();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [yPercent, reducedMotion]);

  return ref;
}
