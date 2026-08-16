"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/animations/gsap";
import { useIsTouchDevice } from "./useMediaQuery";
import { useReducedMotion } from "./useReducedMotion";

/** Attracts an element toward the cursor within its bounds, then springs
 * back on leave. Disabled on touch devices and reduced-motion. */
export function useMagnetic<T extends HTMLElement>(strength = 0.4) {
  const ref = useRef<T | null>(null);
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || isTouch || reducedMotion) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [isTouch, reducedMotion, strength]);

  return ref;
}
