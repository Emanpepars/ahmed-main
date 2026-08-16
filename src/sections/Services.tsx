"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { useThemeSection } from "@/hooks/useThemeSection";
import { services } from "@/data/services";
import { FM_EASE } from "@/animations/tokens";

/** Service titles woven into one flowing sentence as inline chips, each
 * revealing its fuller description in a popover on hover — instead of a
 * static accordion list. Text and chip fragments are declared together so
 * the sentence stays a single, natural read. */
type Service = (typeof services)[number];
type Fragment = { kind: "text"; text: string } | { kind: "chip"; service: Service };

const brandService = services[0]!;
const videoService = services[1]!;
const socialService = services[2]!;
const printService = services[3]!;
const aiService = services[4]!;

const sentence: Fragment[] = [
  { kind: "text", text: "Design, film, and AI, working together — I build " },
  { kind: "chip", service: brandService },
  { kind: "text", text: " systems, produce " },
  { kind: "chip", service: videoService },
  { kind: "text", text: ", and carry both into " },
  { kind: "chip", service: socialService },
  { kind: "text", text: ", " },
  { kind: "chip", service: printService },
  { kind: "text", text: ", and " },
  { kind: "chip", service: aiService },
  { kind: "text", text: " that keeps a brand consistent everywhere it shows up." },
];

export function Services() {
  const themeRef = useThemeSection<HTMLElement>("dark");
  const ref = useStaggerReveal<HTMLDivElement>({ selector: "[data-service-fragment]", y: 16, stagger: 0.015 });

  return (
    <section ref={themeRef} id="services" className="relative py-[var(--space-section)]">
      <div className="container-edge">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
          Services
        </span>
        <h2 className="font-display mt-4 max-w-xl text-4xl font-medium leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-5xl">
          Where I can help.
        </h2>

        <div
          ref={ref}
          className="font-display mt-16 max-w-4xl text-2xl font-medium leading-[1.4] tracking-tight text-[var(--color-ink)] sm:text-3xl lg:text-4xl"
        >
          {sentence.map((part, i) =>
            part.kind === "chip" ? (
              <ServiceChip key={part.service.number} service={part.service} />
            ) : (
              <span key={i} data-service-fragment>
                {part.text}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function ServiceChip({ service }: { service: (typeof services)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <span
      data-service-fragment
      className="group relative mx-1 inline-flex cursor-default items-center gap-1.5 rounded-[var(--radius-pill)] border border-[var(--color-line)] bg-[var(--color-bg-raised)] px-4 py-1.5 align-middle text-base font-medium text-[var(--color-ink)] transition-colors duration-300 hover:border-[var(--color-accent)] sm:text-lg"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="font-mono text-[10px] text-[var(--color-accent)]">{service.number}</span>
      {service.title}
      <ChevronIcon className="h-3 w-3 text-[var(--color-ink-faint)] transition-transform duration-300 group-hover:rotate-180" />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: FM_EASE.out }}
            className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 w-64 -translate-x-1/2 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-bg-raised)] p-4 text-left shadow-2xl"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-accent)]">
              {service.number} — {service.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">{service.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
