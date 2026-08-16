"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, SplitText, useGsapRegistration } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIntroDone } from "@/components/layout/Intro";

export function useHeroIntro() {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const played = useRef(false);

  const introDone = useIntroDone();
  const reducedMotion = useReducedMotion();
  useGsapRegistration();

  // Entrance timeline — gated on the intro loader finishing so nothing
  // plays underneath it.
  useLayoutEffect(() => {
    if (!introDone || played.current) return;
    played.current = true;

    const targets = [
      eyebrowRef.current,
      headingRef.current,
      subRef.current,
      ctasRef.current,
      visualRef.current,
      bgTextRef.current,
    ];
    if (targets.some((t) => !t)) return;

    if (reducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0, scale: 1, clipPath: "inset(0 0 0% 0)" });
      return;
    }

    const split = SplitText.create(headingRef.current, {
      type: "lines",
      mask: "lines",
      linesClass: "split-line",
    });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Name wipes in left-to-right on its own first (a slow clip-path
    // reveal, not a fade), then the portrait reveals individually — no
    // other element appears until it's fully settled — and only after
    // that do the eyebrow/heading/sub/CTAs/stat chips follow in sequence.
    tl.fromTo(
      bgTextRef.current,
      { clipPath: "inset(0 100% 0 0)", opacity: 1 },
      { clipPath: "inset(0 0% 0 0)", duration: 2.6, ease: "power2.inOut" },
    )
      .fromTo(
        visualRef.current,
        { clipPath: "inset(100% 0 0 0)", scale: 1.15 },
        { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 2, ease: "power3.inOut" },
        "-=1",
      )
      .fromTo(eyebrowRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
      .fromTo(
        split.lines,
        { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, stagger: 0.1 },
        "-=0.3",
      )
      .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.55")
      .fromTo(ctasRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.45")
      .fromTo(statsRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 });

    return () => split.revert();
  }, [introDone, reducedMotion]);

  // Scroll-driven exit — the hero pins for over a viewport of scroll while
  // the content layer is pulled up and off-screen as one grouped unit (a
  // "drawer" of text sliding away, not a subtle fade-in-place) and the
  // name/portrait layers behind it dissolve at a slower, offset pace, so
  // Work arrives from underneath as a continuous layered reveal rather
  // than a cut or a plain fade.
  useLayoutEffect(() => {
    if (reducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const section = sectionRef.current;
      if (!section) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=130%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
        },
      });

      // Everything below lives on this ONE timeline — which owns the pin —
      // rather than each getting its own separate ScrollTrigger on the same
      // trigger element. Independent triggers on a pinned element measure
      // unreliably (the pin-spacer shifts what "top top" resolves to
      // depending on creation order), which is exactly what was happening
      // here: the portrait was barely fading at 80%+ of scroll progress
      // through what should have been its whole exit. Everything on `tl`
      // shares its scrollTrigger's progress directly, so it can't drift.
      //
      // fromTo with an EXPLICIT starting state, not to() — a scrubbed to()
      // tween implicitly captures "current value at creation time" as its
      // start, which here would be each element's pre-entrance opacity:0
      // (this effect mounts long before the entrance timeline finishes).
      // Scrolling back up to progress 0 would then render that stale,
      // never-actually-visible state instead of the real settled look.
      tl
        .fromTo(bgTextRef.current, { opacity: 1, scale: 1 }, { scale: 1.4, opacity: 0, ease: "none" }, 0.1)
        // The headline/eyebrow/description/CTA group is the "drawer": it
        // travels a real fraction of the viewport height (not a token
        // percent of its own box) so it visibly slides up and out from in
        // front of the portrait/name, starting immediately and finishing
        // well before the name/portrait dissolve completes — a layered,
        // staggered pull rather than everything fading in unison.
        .fromTo(
          [eyebrowRef.current, headingRef.current, subRef.current, ctasRef.current],
          { y: 0, opacity: 1, filter: "blur(0px)" },
          { y: "-55vh", opacity: 0, filter: "blur(4px)", ease: "power1.in", stagger: 0.04 },
          0,
        )
        // The inline portrait only needs to carry its own dissolve through
        // the hero's own pin range — HeroPortraitGhost (a true top-level
        // fixed layer, unaffected by this section's pin transform +
        // overflow clip) crossfades in right as this finishes and carries
        // the blur on further, lingering past the hero into Work.
        .fromTo(
          visualRef.current,
          { yPercent: 0, scale: 1, opacity: 1, filter: "blur(0px)" },
          { yPercent: -14, scale: 0.92, opacity: 0, filter: "blur(14px)", ease: "none" },
          0,
        )
        .fromTo(
          statsRef.current,
          { y: 0, opacity: 1, filter: "blur(0px)" },
          { y: "-8vh", opacity: 0, filter: "blur(8px)", ease: "none" },
          0,
        )
        // The opaque backdrop is the last thing to go, weighted toward the
        // end of the pin (power1.in) — Work is pulled up underneath Hero
        // (see Work.tsx's negative margin) over this same range, so as this
        // dissolves it reads as a drawer opening onto Work at low opacity,
        // rising to full opacity as this finishes clearing away.
        .fromTo(bgLayerRef.current, { opacity: 1 }, { opacity: 0, ease: "power1.in" }, 0);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    mm.add("(max-width: 767px)", () => {
      // Lighter, non-pinned treatment on mobile — a gentle lift/fade
      // instead of a pinned multi-layer transition, to keep scroll cost low.
      const visual = visualRef.current;
      if (!visual) return;
      const tween = gsap.fromTo(
        visual,
        { yPercent: 0, opacity: 1 },
        {
          yPercent: 12,
          opacity: 0.6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [reducedMotion]);

  // Sidebar reveal — the persistent nav starts completely hidden and
  // slides/fades in as the user scrolls past the hero. Deliberately
  // delayed to start after the portrait/text are already visibly
  // dissolving (not from scroll 0 like they do) — in the reference, the
  // image is noticeably fading/blurring while the nav is still sitting in
  // its original hero position, and only afterward does the sidebar form
  // around it. Starting both at once (the previous behavior) reads as
  // everything happening at the same time instead of one clear sequence.
  useLayoutEffect(() => {
    if (reducedMotion) {
      gsap.set(document.documentElement, { "--sidebar-reveal": 1 });
      return;
    }

    gsap.set(document.documentElement, { "--sidebar-reveal": 0 });

    // Direct scrollY computation, not a ScrollTrigger on the pinned
    // section — a second independent trigger on the same pinned element
    // as the exit timeline above measures unreliably (confirmed: it was
    // sitting at 0% still at 1150px of scroll when it should have been
    // complete by ~855px). This sidesteps the trigger-measurement drift
    // entirely, the same fix HeroPortraitGhost needed for the same reason.
    //
    // heroStartY is measured ONCE, before any scrolling — not inside the
    // ticker. Once GSAP pins the section it becomes position:fixed, so a
    // live getBoundingClientRect().top call would always read ~0 and
    // silently track scrollY itself, permanently pinning progress at 0
    // (confirmed: that was the actual bug here).
    const section = sectionRef.current;
    const heroStartY = section ? window.scrollY + section.getBoundingClientRect().top : 0;
    const update = () => {
      const vh = window.innerHeight;
      const start = heroStartY + vh * 0.22;
      const end = heroStartY + vh * 0.95;
      const progress = Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));
      gsap.set(document.documentElement, { "--sidebar-reveal": progress });
    };

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, [reducedMotion]);

  return { sectionRef, eyebrowRef, headingRef, subRef, ctasRef, visualRef, bgTextRef, statsRef, bgLayerRef };
}
