export type ThemeName = "dark" | "light";

/** Palettes swapped live via useThemeSection as the user scrolls between
 * sections. Accent stays constant across both — only the surface/ink
 * relationship inverts. */
export const THEMES: Record<ThemeName, Record<string, string>> = {
  dark: {
    "--color-bg": "#0a0a0b",
    "--color-bg-raised": "#111113",
    "--color-ink": "#f4f2ec",
    "--color-ink-muted": "#9a9a9f",
    "--color-ink-faint": "#55555c",
    "--color-line": "#232326",
    "--chip-bg": "rgba(24, 24, 26, 0.6)",
    "--chip-border": "rgba(255, 255, 255, 0.1)",
    "--chip-item-bg": "rgba(255, 255, 255, 0.05)",
  },
  light: {
    "--color-bg": "#f2f0e9",
    "--color-bg-raised": "#e7e3d7",
    "--color-ink": "#0e0e0d",
    "--color-ink-muted": "#5c5b53",
    "--color-ink-faint": "#8f8d81",
    "--color-line": "#d5d1c3",
    "--chip-bg": "rgba(223, 222, 206, 0.75)",
    "--chip-border": "rgba(255, 255, 255, 0.35)",
    "--chip-item-bg": "rgba(0, 0, 0, 0.05)",
  },
};
