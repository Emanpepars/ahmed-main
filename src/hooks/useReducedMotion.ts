"use client";

import { useCallback, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

const getServerSnapshot = () => false;

export function useReducedMotion() {
  const getSnapshot = useCallback(() => window.matchMedia(QUERY).matches, []);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
