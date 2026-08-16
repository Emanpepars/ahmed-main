"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FM_EASE } from "@/animations/tokens";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { useThemeSection } from "@/hooks/useThemeSection";
import { faqs } from "@/data/faq";
import { cn } from "@/utils/cn";

export function FAQ() {
  const themeRef = useThemeSection<HTMLElement>("light");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useStaggerReveal<HTMLDivElement>({ selector: "[data-faq-item]", y: 24, stagger: 0.06 });

  return (
    <section ref={themeRef} id="faq" className="relative py-[var(--space-section)]">
      <div className="container-edge">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">FAQ</span>
        <h2 className="font-display mt-4 max-w-xl text-4xl font-medium leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-5xl">
          Good to know.
        </h2>

        <div ref={ref} className="mt-14 border-t border-[var(--color-line)]">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.question} data-faq-item className="border-b border-[var(--color-line)]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-7 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg font-medium text-[var(--color-ink)] sm:text-xl">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] transition-all duration-400",
                      isOpen && "border-[var(--color-accent)] text-[var(--color-accent)]",
                    )}
                  >
                    <span
                      className="absolute h-px w-3.5 bg-current transition-transform duration-400"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                    <span
                      className="absolute h-3.5 w-px bg-current transition-transform duration-400"
                      style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: FM_EASE.inOut }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-7 text-sm leading-relaxed text-[var(--color-ink-muted)] sm:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
