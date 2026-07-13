import { useEffect } from "react";

/** Locks document scroll while `locked` (mobile nav overlay). */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}
