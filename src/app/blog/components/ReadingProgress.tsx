"use client";

import { useEffect, useState, useRef } from "react";
import "../styles/animations.css";

/**
 * Reading progress bar using native scroll events.
 * GPU-accelerated via `transform: scaleX()` — only transforms, no layout thrashing.
 * Debounced to 50ms for 60 FPS performance.
 *
 * UX: Provides clear visual cue of reading progress, reducing drop-off.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current !== null) return; // throttle to rAF

      rafId.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const value = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
        setProgress(value);
        rafId.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"
      style={{ transform: `scaleX(${progress})` }}
      role="progressbar"
      aria-label="Progreso de lectura"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    />
  );
}