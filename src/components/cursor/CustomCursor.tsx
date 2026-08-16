"use client";

import { useEffect, useRef } from "react";
import { useCursor } from "./CursorProvider";
import { useIsTouchDevice } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const RING_SIZES: Record<string, number> = {
  default: 16,
  view: 96,
  open: 96,
  drag: 88,
  explore: 96,
};

export function CustomCursor() {
  const { state } = useCursor();
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();

  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    window.addEventListener("mousemove", onMove);

    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [isTouch, reducedMotion]);

  if (isTouch || reducedMotion) return null;

  const size = RING_SIZES[state.variant] ?? RING_SIZES.default;
  const isTextVariant = state.text.length > 0;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] transition-opacity duration-200"
        style={{ opacity: state.variant === "hidden" ? 0 : 1 }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border border-[var(--color-ink)]/25 bg-[var(--color-ink)]/5 backdrop-blur-sm transition-[width,height,background-color,border-color,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          width: size,
          height: size,
          opacity: state.variant === "hidden" ? 0 : 1,
          backgroundColor: isTextVariant ? "var(--color-accent)" : undefined,
          borderColor: isTextVariant ? "transparent" : undefined,
        }}
      >
        {isTextVariant && (
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--color-accent-ink)]">
            {state.text}
          </span>
        )}
      </div>
    </>
  );
}
