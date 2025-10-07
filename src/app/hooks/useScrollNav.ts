'use client'
import { useEffect, useState } from "react";

export function useActiveClassScroll() {
  const [isNavScrolled, setIsNavScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.querySelector('.nav');
      const rect = el?.getBoundingClientRect();

      if (rect && rect.top <= -20) {
        setIsNavScrolled(true);
      } else {
        setIsNavScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return isNavScrolled;
}
