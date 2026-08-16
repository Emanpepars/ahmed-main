"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/utils/cn";

type Props = {
  value: string;
  label: string;
  size?: "sm" | "lg";
  className?: string;
  /** Set false for stats visible immediately on load — nothing to "scroll
   * into", so counting up from 0 would just show a wrong number briefly
   * instead of the real value from the first frame. */
  animate?: boolean;
};

export function StatBlock({ value, label, size = "lg", className, animate = true }: Props) {
  const { ref, display } = useCountUp(value, { animate });

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span
        ref={ref}
        className={cn(
          "font-display font-medium text-[var(--color-ink)]",
          size === "lg" ? "text-3xl sm:text-4xl" : "text-xl",
        )}
      >
        {display}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-ink-faint)]">
        {label}
      </span>
    </div>
  );
}
