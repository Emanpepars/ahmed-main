"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, useGsapRegistration } from "@/animations/gsap";
import { useReducedMotion } from "./useReducedMotion";

type Options = {
  /** Invisible marker sized/positioned where the element rests in its
   * origin layout (e.g. inside the hero). Absent on routes that have no
   * hero to start from — see the update loop below. */
  fromRef: React.RefObject<HTMLElement | null>;
  /** Invisible marker sized/positioned at the element's destination
   * (e.g. its slot in the sidebar). May itself be mid-animation (the
   * sidebar revealing) — remeasured live every frame rather than
   * snapshotted once. */
  toRef: React.RefObject<HTMLElement | null>;
  /** Gate wiring until true (e.g. the intro loader finishing) so the
   * element doesn't pop into its "from" position underneath it. */
  enabled?: boolean;
};

const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

/** Morphs a single real, interactive element from one layout position to
 * another, driven by the same `--sidebar-reveal` CSS variable the
 * sidebar itself uses — not a second, independently-calibrated scroll
 * range, which in practice does NOT resolve to the same pixel span as
 * the sidebar's own reveal even with an identical-looking config (pin
 * spacers shift the math depending on measurement order). Reading the
 * live variable every gsap ticker frame guarantees this always matches
 * the sidebar exactly and self-corrects continuously — and sidesteps
 * relying on the Lenis instance ref, which isn't populated yet the first
 * time a descendant's effect runs (SmoothScrollProvider, as the
 * outermost provider, creates it after all descendant effects have
 * already fired). Desktop (lg+) only; the caller hides the element below
 * that breakpoint. */
export function useFlipMigrate<T extends HTMLElement>({ fromRef, toRef, enabled = true }: Options) {
  const elRef = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();
  useGsapRegistration();

  useLayoutEffect(() => {
    const el = elRef.current;
    const to = toRef.current;
    if (!el || !to || !enabled) return;
    if (window.innerWidth < 1024) return;

    // Only the home page renders a hero, so only there is there an origin
    // marker to migrate from. On every other route the sidebar is already
    // fully revealed (--sidebar-reveal defaults to 1), so the element
    // simply sits in its destination slot — without this it stayed
    // visibility:hidden and the sidebar rendered an empty nav and no CTA.
    const from = fromRef.current;

    gsap.set(el, { position: "fixed", visibility: "visible" });

    const update = () => {
      const toRect = to.getBoundingClientRect();
      // With no origin to travel from, the element is simply parked at the
      // destination — same as being fully migrated.
      const p = from ? parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--sidebar-reveal")) || 0 : 1;
      const fromRect = from && !reducedMotion ? from.getBoundingClientRect() : toRect;
      gsap.set(el, {
        top: lerp(fromRect.top, toRect.top, p),
        left: lerp(fromRect.left, toRect.left, p),
        width: lerp(fromRect.width, toRect.width, p),
        height: lerp(fromRect.height, toRect.height, p),
      });
    };

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, enabled]);

  return elRef;
}
