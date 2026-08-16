"use client";

import { createContext, useContext, useLayoutEffect, useState } from "react";
import { ScrollTrigger, useGsapRegistration } from "@/animations/gsap";
import { useLenis } from "./SmoothScrollProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const IntroContext = createContext(false);

/** True once initial layout has settled — sections gate their entrance
 * timelines on this so nothing plays before the page is actually ready. */
export function useIntroDone() {
  return useContext(IntroContext);
}

/** No separate loading screen — the hero's own entrance (name wipe,
 * portrait reveal, etc.) is the first thing the user sees, not something
 * that plays after a counter/panel disappears. Previously this ran a
 * multi-second counter-then-slide-away sequence, which read as two
 * disconnected phases: a loading screen, then separately "the animation".
 * A brief scroll lock is still needed — Lenis measures page height while
 * mounting, and needs one settled layout pass (fonts, initial paint)
 * before that measurement is trustworthy — but it resolves within a
 * couple of frames, not seconds, and has no visible UI of its own; hero
 * content already starts at opacity 0 via its own classes, so there's
 * nothing to flash while this resolves. */
export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();
  const done = reducedMotion || ready;
  const lenis = useLenis();
  useGsapRegistration();

  useLayoutEffect(() => {
    if (reducedMotion) {
      document.body.classList.remove("no-scroll");
      lenis?.start();
      ScrollTrigger.refresh();
      return;
    }

    document.body.classList.add("no-scroll");
    lenis?.stop();

    // Two rAFs: one to let this "no-scroll" class itself commit/paint,
    // a second to let dependent layout (fonts, SplitText measurements
    // sections make once mounted) settle before Lenis/ScrollTrigger
    // measure real page height.
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.remove("no-scroll");
        lenis?.start();
        ScrollTrigger.refresh();
        setReady(true);
      });
    });

    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return <IntroContext.Provider value={done}>{children}</IntroContext.Provider>;
}
