"use client";

import { useCallback, useRef } from "react";

/** Combines multiple refs onto a single DOM node — needed where two
 * independent animation hooks both need the same section element.
 * Callers must pass stable refs (i.e. from useRef), not new values each
 * render, since only the initial list is captured. */
export function useMergedRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  const refsRef = useRef(refs);

  return useCallback((node: T) => {
    const list = refsRef.current;
    for (let i = 0; i < list.length; i++) {
      const ref = list[i];
      if (!ref) continue;
      if (typeof ref === "function") {
        ref(node);
      } else {
        const target = ref as { current: T | null };
        target.current = node;
      }
    }
  }, []);
}
