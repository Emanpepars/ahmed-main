"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, useGsapRegistration } from "@/animations/gsap";
import { useReducedMotion } from "./useReducedMotion";

type Options = {
  y?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
  scale?: number;
  /** Adds a subtle blur-in as part of the reveal — matches the site's
   * blur/deblur transition language. Set false to skip. */
  blur?: boolean;
};

/** Reveals a single element (image, card, panel) as it enters the
 * viewport — the non-text counterpart to RevealText. */
export function useScrollReveal<T extends HTMLElement>({
  y = 48,
  duration = 1,
  delay = 0,
  ease = "power3.out",
  start = "top 85%",
  scale,
  blur = true,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();
  useGsapRegistration();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(el, {
        y,
        opacity: 0,
        scale: scale ? scale : undefined,
        filter: blur ? "blur(10px)" : undefined,
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
        },
      });
    });

    return () => ctx.revert();
  }, [y, duration, delay, ease, start, scale, blur, reducedMotion]);

  return ref;
}
