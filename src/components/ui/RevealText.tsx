"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGsapRegistration } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";

type Props = {
  children: string;
  as?: Tag;
  className?: string;
  splitBy?: "lines" | "words";
  trigger?: "scroll" | "immediate";
  start?: string;
  stagger?: number;
  delay?: number;
  /** Blurs each line/word in from a few px — reserved for a handful of
   * showcase headings rather than every heading on the page. */
  blur?: boolean;
};

/** Splits text into lines/words and reveals them with a clipped upward
 * slide. Reusable across hero, about, and section headings so every
 * text-reveal animation in the site shares one implementation. */
export function RevealText({
  children,
  as: Tag = "p",
  className,
  splitBy = "lines",
  trigger = "scroll",
  start = "top 85%",
  stagger = 0.08,
  delay = 0,
  blur = false,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  useGsapRegistration();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    let split: InstanceType<typeof SplitText> | null = null;
    let st: ScrollTrigger | null = null;

    document.fonts.ready.then(() => {
      if (!ref.current) return;
      split = SplitText.create(ref.current, {
        type: splitBy,
        mask: splitBy,
        linesClass: "split-line",
        wordsClass: "split-word",
      });

      const targets = splitBy === "lines" ? split.lines : split.words;

      const tween = gsap.fromTo(
        targets,
        { yPercent: 115, opacity: 0, filter: blur ? "blur(8px)" : undefined },
        {
          yPercent: 0,
          opacity: 1,
          filter: blur ? "blur(0px)" : undefined,
          duration: 0.9,
          ease: "power4.out",
          stagger,
          delay,
          paused: trigger === "scroll",
        },
      );

      if (trigger === "scroll") {
        st = ScrollTrigger.create({
          trigger: ref.current,
          start,
          onEnter: () => tween.play(),
        });
      }
    });

    return () => {
      st?.kill();
      split?.revert();
    };
  }, [splitBy, trigger, start, stagger, delay, blur, reducedMotion]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
