"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap, useGsapRegistration } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { useThemeSection } from "@/hooks/useThemeSection";
import { GradientPlate } from "@/components/ui/GradientPlate";
import { timeline } from "@/data/timeline";
import { cn } from "@/utils/cn";

export function Journey() {
  const themeRef = useThemeSection<HTMLElement>("light");

  return (
    <section ref={themeRef} id="journey" className="relative py-[var(--space-section)]">
      <div className="container-edge mb-16 lg:mb-24">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
          Journey
        </span>
        <h2 className="font-display mt-4 max-w-2xl text-4xl font-medium leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-5xl">
          From Sousse to Dubai, in four chapters.
        </h2>
      </div>

      <JourneyPath />
      <JourneyMobile />
    </section>
  );
}

type Point = { x: number; y: number };

/** Cards alternate left/right down the column, connected by a single
 * smooth curve that draws itself in as the section scrolls (stroke-dash
 * technique) instead of the old pinned single-card crossfade — this is a
 * continuous, naturally-scrolling reveal, not a pin/release each time a
 * card changes, which reads as far smoother. */
function JourneyPath() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const reducedMotion = useReducedMotion();
  useGsapRegistration();

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const containerRect = container.getBoundingClientRect();
      const next: Point[] = [];
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const r = card.getBoundingClientRect();
        next.push({
          x: (i % 2 === 0 ? r.right : r.left) - containerRect.left,
          y: r.top - containerRect.top + r.height / 2,
        });
      });
      setPoints(next);
      setSize({ width: containerRect.width, height: containerRect.height });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const pathD = useMemo(() => {
    if (points.length < 2) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const midX = (p0.x + p1.x) / 2;
      d += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return d;
  }, [points]);

  // Draws the connecting path in sync with scroll.
  useLayoutEffect(() => {
    const path = pathRef.current;
    const container = containerRef.current;
    if (!path || !container || !pathD) return;

    if (reducedMotion) {
      gsap.set(path, { strokeDasharray: "none" });
      return;
    }

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top 75%",
        end: "bottom 60%",
        scrub: 0.6,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [pathD, reducedMotion]);

  // Reveals each card (sliding in from the side it's connected to) and
  // pops its dot marker as it enters view — a natural scroll reveal, not
  // tied to a pinned "active index".
  useLayoutEffect(() => {
    if (reducedMotion || points.length !== timeline.length) return;
    const cards = cardRefs.current.filter((c): c is HTMLDivElement => Boolean(c));
    if (!cards.length) return;

    const timelines = cards.map((card, i) => {
      const dot = dotRefs.current[i];
      const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 85%" } });
      tl.from(card, {
        x: i % 2 === 0 ? -32 : 32,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      if (dot) {
        tl.from(dot, { scale: 0, transformOrigin: "center", duration: 0.35, ease: "back.out(2.5)" }, "-=0.35");
      }
      return tl;
    });

    return () => {
      timelines.forEach((tl) => {
        tl.scrollTrigger?.kill();
        tl.kill();
      });
    };
  }, [points.length, reducedMotion]);

  return (
    <div ref={containerRef} className="container-edge relative hidden lg:block">
      {size.width > 0 && (
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0"
          width={size.width}
          height={size.height}
          viewBox={`0 0 ${size.width} ${size.height}`}
        >
          <path ref={pathRef} d={pathD} fill="none" stroke="var(--color-line)" strokeWidth={1.5} />
          {points.map((p, i) => (
            <circle
              key={timeline[i]?.id ?? i}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              cx={p.x}
              cy={p.y}
              r={5}
              fill="var(--color-accent)"
            />
          ))}
        </svg>
      )}

      <div className="flex flex-col gap-16 py-4">
        {timeline.map((m, i) => (
          <div
            key={m.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={cn(
              "w-[46%] rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-bg-raised)] p-8",
              i % 2 === 0 ? "self-start" : "self-end",
            )}
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-[var(--radius-sm)]">
                <GradientPlate from={m.gradient[0]} to={m.gradient[1]} className="h-full w-full" />
              </div>
              <div>
                <span className="font-display block text-2xl font-semibold text-[var(--color-accent)]">
                  {m.year}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink-faint)]">
                  {m.category}
                </span>
              </div>
            </div>
            <h3 className="font-display mt-5 text-2xl font-medium text-[var(--color-ink)]">{m.title}</h3>
            <span className="mt-1 block font-mono text-sm text-[var(--color-ink-muted)]">{m.company}</span>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">{m.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function JourneyMobile() {
  const ref = useStaggerReveal<HTMLDivElement>({ selector: "[data-milestone]", y: 32, start: "top 90%" });

  return (
    <div ref={ref} className="container-edge flex flex-col gap-10 lg:hidden">
      {timeline.map((m) => (
        <div key={m.id} data-milestone className="flex gap-5 border-l border-[var(--color-line)] pl-6">
          <div className="flex-1">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
              {m.year} — {m.category}
            </span>
            <h3 className="font-display mt-3 text-2xl font-medium text-[var(--color-ink)]">{m.title}</h3>
            <span className="mt-1 block font-mono text-sm text-[var(--color-ink-muted)]">{m.company}</span>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-muted)]">{m.description}</p>
            <div className="relative mt-5 aspect-video w-full overflow-hidden rounded-[var(--radius-md)]">
              <GradientPlate from={m.gradient[0]} to={m.gradient[1]} className="h-full w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
