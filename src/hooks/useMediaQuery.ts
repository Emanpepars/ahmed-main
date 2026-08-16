"use client";

import { useCallback, useSyncExternalStore } from "react";

const getServerSnapshot = () => false;

export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query],
  );
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** True for touch/coarse-pointer devices — used to disable the custom
 * cursor and heavy desktop-only scroll choreography. */
export function useIsTouchDevice() {
  return useMediaQuery("(hover: none), (pointer: coarse)");
}

export const BREAKPOINTS = {
  mobile: "(max-width: 767px)",
  tablet: "(min-width: 768px) and (max-width: 1023px)",
  desktop: "(min-width: 1024px)",
} as const;
