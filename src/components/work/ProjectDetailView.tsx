"use client";

import { GradientPlate } from "@/components/ui/GradientPlate";
import { RevealText } from "@/components/ui/RevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useParallax } from "@/hooks/useParallax";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  next: Project;
};

export function ProjectDetailView({ project, next }: Props) {
  const imageRef = useScrollReveal<HTMLDivElement>({ y: 0, scale: 1.08, duration: 1.2, start: "top 100%" });
  const parallaxRef = useParallax<HTMLDivElement>(-10);
  const metaRef = useScrollReveal<HTMLDivElement>({ y: 24, start: "top 100%", delay: 0.2 });

  return (
    <article className="pt-32">
      <div className="container-edge">
        <MagneticButton href="/#work" variant="outline" cursorText="BACK" className="mb-10">
          ← Back to Work
        </MagneticButton>

        <div ref={metaRef} className="flex flex-wrap items-end justify-between gap-6 border-b border-[var(--color-line)] pb-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
              {project.category} — {project.number}
            </span>
            <RevealText
              as="h1"
              trigger="immediate"
              className="font-display mt-4 max-w-3xl text-5xl font-medium leading-[1.02] tracking-tight text-[var(--color-ink)] sm:text-7xl"
            >
              {project.title}
            </RevealText>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-6">
            {project.client && (
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-ink-faint)]">
                  Client
                </span>
                <span className="text-sm text-[var(--color-ink)]">{project.client}</span>
              </div>
            )}
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-ink-faint)]">
                Role
              </span>
              <span className="text-sm text-[var(--color-ink)]">{project.role}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-ink-faint)]">
                Year
              </span>
              <span className="text-sm text-[var(--color-ink)]">{project.year}</span>
            </div>
          </div>
        </div>
      </div>

      <div ref={imageRef} className="relative mt-12 aspect-[16/9] w-full overflow-hidden">
        <div ref={parallaxRef} className="absolute inset-[-10%]">
          <GradientPlate from={project.gradient[0]} to={project.gradient[1]} className="h-full w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={`${project.title} — ${project.description}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </GradientPlate>
        </div>
      </div>

      <div className="container-edge grid grid-cols-1 gap-12 py-[var(--space-section)] lg:grid-cols-[0.3fr_0.7fr]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="w-fit rounded-[var(--radius-pill)] border border-[var(--color-line)] px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-[var(--color-ink-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-ink-faint)]">
              Made with
            </span>
            <ul className="flex flex-col gap-1">
              {project.tools.map((tool) => (
                <li key={tool} className="text-sm text-[var(--color-ink-muted)]">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-2xl">
          <p className="text-xl leading-relaxed text-[var(--color-ink-muted)] sm:text-2xl">
            {project.longDescription}
          </p>
          {project.link && (
            <MagneticButton
              href={project.link}
              variant="outline"
              cursorText="OPEN"
              className="mt-10"
              external
            >
              View full project on Behance
            </MagneticButton>
          )}
        </div>
      </div>

      <div className="border-t border-[var(--color-line)] py-16">
        <div className="container-edge flex items-center justify-between gap-6">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-ink-faint)]">
            Next Project
          </span>
          <MagneticButton href={`/work/${next.slug}`} cursorText="VIEW">
            {next.title} →
          </MagneticButton>
        </div>
      </div>
    </article>
  );
}
