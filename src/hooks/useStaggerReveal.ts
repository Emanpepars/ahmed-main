"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, useGsapRegistration } from "@/animations/gsap";
import { useReducedMotion } from "./useReducedMotion";

type Options = {
  selector: string;
  y?: number;
  stagger?: number;
  duration?: number;
  start?: string;
};

/** Reveals a container's matching children in sequence as the group
 * enters view — used for card grids (services, process, clients). */
export function useStaggerReveal<T extends HTMLElement>({
  selector,
  y = 40,
  stagger = 0.12,
  duration = 0.9,
  start = "top 80%",
}: Options) {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();
  useGsapRegistration();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll(selector);
    if (!items.length) return;

    if (reducedMotion) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const tween = gsap.from(items, {
      y,
      opacity: 0,
      duration,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [selector, y, stagger, duration, start, reducedMotion]);

  return ref;
}
