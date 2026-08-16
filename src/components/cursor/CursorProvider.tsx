"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

export type CursorVariant = "default" | "view" | "open" | "drag" | "explore" | "hidden";

type CursorState = {
  variant: CursorVariant;
  text: string;
};

type CursorContextValue = {
  state: CursorState;
  show: (variant: CursorVariant, text?: string) => void;
  reset: () => void;
};

const DEFAULT_STATE: CursorState = { variant: "default", text: "" };

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CursorState>(DEFAULT_STATE);
  const depth = useRef(0);

  const show = useCallback((variant: CursorVariant, text = "") => {
    depth.current += 1;
    setState({ variant, text });
  }, []);

  const reset = useCallback(() => {
    depth.current = Math.max(0, depth.current - 1);
    if (depth.current === 0) setState(DEFAULT_STATE);
  }, []);

  const value = useMemo(() => ({ state, show, reset }), [state, show, reset]);

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursor must be used within CursorProvider");
  return ctx;
}
