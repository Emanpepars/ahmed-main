"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "@/animations/gsap";
import { GradientPlate } from "./GradientPlate";
import { useCursor } from "@/components/cursor/CursorProvider";
import { useIsTouchDevice } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMergedRefs } from "@/hooks/useMergedRefs";
import type { Project } from "@/data/projects";
import { cn } from "@/utils/cn";

type Props = {
  project: Project;
  className?: string;
  imageClassName?: string;
  /** Lets a parent (the horizontal work gallery) drive this card's own
   * ref directly with gsap.set() every scroll frame — for a continuous,
   * scroll-synced prominence gradient rather than a CSS-transitioned
   * on/off state that lags behind the scrub. */
  containerRef?: React.Ref<HTMLAnchorElement>;
};

export function ProjectCard({ project, className, imageClassName, containerRef }: Props) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const mergedRef = useMergedRefs(cardRef, containerRef);
  const imageRef = useRef<HTMLDivElement>(null);
  const { show, reset } = useCursor();
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();

  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);
  const scaleTo = useRef<gsap.QuickToFunc | null>(null);

  const ensureQuickTo = () => {
    if (!imageRef.current) return;
    if (!xTo.current) {
      xTo.current = gsap.quickTo(imageRef.current, "x", { duration: 0.6, ease: "power3.out" });
      yTo.current = gsap.quickTo(imageRef.current, "y", { duration: 0.6, ease: "power3.out" });
      scaleTo.current = gsap.quickTo(imageRef.current, "scale", { duration: 0.5, ease: "power3.out" });
    }
  };

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTouch || reducedMotion) return;
    ensureQuickTo();
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const relY = (e.clientY - rect.top - rect.height / 2) / rect.height;
    xTo.current?.(relX * 24);
    yTo.current?.(relY * 24);
  };

  const handleEnter = () => {
    show("view", "VIEW");
    if (isTouch || reducedMotion) return;
    ensureQuickTo();
    scaleTo.current?.(1.08);
  };

  const handleLeave = () => {
    reset();
    if (isTouch || reducedMotion) return;
    xTo.current?.(0);
    yTo.current?.(0);
    scaleTo.current?.(1);
  };

  return (
    <Link
      href={`/work/${project.slug}`}
      ref={mergedRef}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={cn("group block", className)}
    >
      <div className={cn("relative overflow-hidden rounded-[var(--radius-lg)]", imageClassName)}>
        <div ref={imageRef} className="absolute inset-[-4%]">
          <GradientPlate from={project.gradient[0]} to={project.gradient[1]} className="h-full w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={`${project.title} — ${project.description}`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </GradientPlate>
        </div>
        {/* Covers range from near-black to near-white, so the number and
            tag chips get a scrim rather than relying on the artwork behind
            them happening to be dark enough. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent"
        />
        <div className="absolute left-5 top-5 font-mono text-xs uppercase tracking-[0.15em] text-white/85">
          {project.number}
        </div>
        <div className="absolute right-5 top-5 flex gap-2">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-[var(--radius-pill)] bg-black/25 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-white backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl font-medium text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-accent)] sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--color-ink-muted)]">
            {project.description}
          </p>
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--color-ink-faint)]">
          {project.year}
        </span>
      </div>
    </Link>
  );
}
