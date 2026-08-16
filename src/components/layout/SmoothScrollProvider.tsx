"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LenisContext = createContext<{ current: Lenis | null }>({ current: null });

/** Returns the live Lenis instance (or null before it's ready / under
 * reduced motion). Read at call time inside handlers and effects rather
 * than relied on to trigger re-renders. */
export function useLenis() {
  return useContext(LenisContext).current;
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<Lenis | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
    });

    ref.current = instance;

    instance.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // ScrollTrigger inserts/resizes pin-spacers as sections mount (often
    // after Lenis's own initial measurement), which changes the page's
    // true scrollable height. Without telling Lenis to re-measure on
    // every ScrollTrigger refresh, it keeps using its stale initial
    // limit and silently stops responding to wheel/scroll input.
    const onRefresh = () => instance.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);
    ScrollTrigger.refresh();

    // The page's true height isn't fixed at mount: at lg+ widths, the
    // sidebar reveal (--sidebar-reveal, scrubbed by the hero's own scroll
    // timeline) pushes .main-column over via padding-left as the user
    // scrolls past the hero, which reflows every heading below into more
    // lines and only reaches its final, tallest state well after Lenis's
    // initial measurement. <html>/<body> are height:100% (viewport-locked
    // per globals.css), so their own laid-out box never grows with
    // overflowing content and a ResizeObserver on them never fires for
    // this; .main-column is a normal block that genuinely grows, so it's
    // observed instead.
    let resizeRaf = 0;
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => instance.resize());
    });
    const mainColumn = document.querySelector(".main-column");
    if (mainColumn) resizeObserver.observe(mainColumn);

    return () => {
      cancelAnimationFrame(resizeRaf);
      resizeObserver.disconnect();
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(onTick);
      instance.destroy();
      ref.current = null;
    };
  }, [reduced]);

  return <LenisContext.Provider value={ref}>{children}</LenisContext.Provider>;
}
