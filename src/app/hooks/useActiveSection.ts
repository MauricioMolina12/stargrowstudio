'use client'
import { useEffect, useState } from "react";

export function useActiveSection(navItems: { label: string; href: string }[]) {
  const [activeSection, setActiveSection] = useState(navItems[0].label);

  useEffect(() => {
    const onScroll = () => {
      for (const section of navItems) {
        const el = document.querySelector(section.href);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight  && rect.bottom >= 0) {
          setActiveSection(section.label);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [navItems]);

  return activeSection;
}
