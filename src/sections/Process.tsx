"use client";

import { motion } from "framer-motion";
import { FM_EASE } from "@/animations/tokens";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useThemeSection } from "@/hooks/useThemeSection";
import { process } from "@/data/services";
import { cn } from "@/utils/cn";

export function Process() {
  const themeRef = useThemeSection<HTMLElement>("dark");

  return (
    <section ref={themeRef} id="process" className="relative py-[var(--space-section)]">
      <div className="container-edge">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
          Process
        </span>
        <h2 className="font-display mt-4 max-w-xl text-4xl font-medium leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-5xl">
          How a project runs.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {process.map((phase, i) => (
            <motion.div
              key={phase.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: FM_EASE.out }}
              className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] border p-8 transition-colors duration-500",
                phase.highlighted
                  ? "border-[var(--color-accent)] bg-[var(--color-bg-raised)]"
                  : "border-[var(--color-line)] hover:border-[var(--color-ink-muted)]",
              )}
            >
              {phase.highlighted && (
                <span className="absolute right-8 top-8 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-accent-ink)]">
                  The bulk of it
                </span>
              )}

              <div>
                <p className="font-mono text-2xl text-[var(--color-accent)]">{phase.step}</p>
                <h3 className="font-display mt-3 text-2xl font-medium text-[var(--color-ink)]">{phase.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-muted)]">{phase.description}</p>

                <ul className="mt-8 flex flex-col gap-3">
                  {phase.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-[var(--color-ink-muted)]">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <MagneticButton
                  href="#contact"
                  variant={phase.highlighted ? "solid" : "outline"}
                  cursorText="OPEN"
                  className="w-full justify-center"
                >
                  Get in touch
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
