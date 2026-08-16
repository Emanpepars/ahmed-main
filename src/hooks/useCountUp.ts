"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, useGsapRegistration } from "@/animations/gsap";
import { useReducedMotion } from "./useReducedMotion";

/** Parses the leading integer off a stat string ("60+" -> 60 / "+") and
 * counts up to it once the element enters the viewport. Pass
 * `animate: false` for stats that are visible immediately on load (nothing
 * to "scroll into") — counting up from 0 there just shows a wrong number
 * before the tween catches up, instead of the real value from frame one. */
export function useCountUp(rawValue: string, { animate = true }: { animate?: boolean } = {}) {
  const match = rawValue.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const reducedMotion = useReducedMotion();

  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() =>
    target === null || reducedMotion || !animate ? rawValue : `0${suffix}`,
  );
  useGsapRegistration();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || target === null || reducedMotion || !animate) return;

    const counter = { value: 0 };
    const tween = gsap.to(counter, {
      value: target,
      duration: 1.6,
      ease: "power2.out",
      onUpdate: () => setDisplay(`${Math.round(counter.value)}${suffix}`),
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [target, suffix, reducedMotion, animate]);

  return { ref, display };
}
