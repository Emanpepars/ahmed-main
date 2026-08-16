"use client";

import Link from "next/link";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useCursor } from "@/components/cursor/CursorProvider";
import { cn } from "@/utils/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  cursorText?: string;
  variant?: "solid" | "outline";
  href?: string;
  /** Opens in a new tab via a plain anchor — next/link's prefetching and
   * client routing have nothing to do off-site. */
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function MagneticButton(props: Props) {
  const { children, className, cursorText = "OPEN", variant = "solid", href, external, onClick, type } = props;
  const ref = useMagnetic<HTMLDivElement>(0.35);
  const { show, reset } = useCursor();

  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] px-7 py-3.5 font-medium text-sm tracking-tight transition-colors duration-300",
    variant === "solid"
      ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:bg-[var(--color-ink)]"
      : "border border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-ink-muted)]",
    className,
  );

  const inner = (
    <div
      ref={ref}
      className={classes}
      onMouseEnter={() => show("view", cursorText)}
      onMouseLeave={reset}
    >
      {children}
    </div>
  );

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="inline-block">
        {inner}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {inner}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} onClick={onClick} className="inline-block bg-transparent">
      {inner}
    </button>
  );
}
