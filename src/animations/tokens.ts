/** Motion tokens mirrored from globals.css so GSAP/Framer Motion configs
 * stay in sync with the CSS custom properties instead of drifting. */
export const EASE = {
  out: "cubic-bezier(0.16, 1, 0.3, 1)",
  inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
  soft: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;

export const DURATION = {
  fast: 0.3,
  base: 0.6,
  slow: 1,
} as const;

/** Framer Motion uses array bezier tuples, not CSS strings. */
export const FM_EASE = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  soft: [0.22, 1, 0.36, 1] as const,
};
