"use client";
import { useEffect } from "react";

export function useIntersectionObserver(
  selector: string,
  options?: IntersectionObserverInit,
  type: "1" | "all" = "1"
) {
  useEffect(() => {
    const elements = type === "1"
                     ? document.querySelector(selector)
                     : document.querySelectorAll(selector);

    if (!elements || (type === "all" && (elements as NodeListOf<Element>).length === 0)) {
      console.warn(
        `useIntersectionObserver: No se encontró elemento(s) para el selector "${selector}" con el tipo "${type}".`
      );
      return;
    }

    if (type === "1") {
      (elements as HTMLElement).classList.add("fade-hidden");
    } else {
      (elements as NodeListOf<HTMLElement>).forEach((el) => {
        el.classList.add("fade-hidden");
      });
    }

    const observerCallback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-visible");
          entry.target.classList.remove("fade-hidden");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      options || { threshold: 0.4 }
    );

    if (type === "1") {
      observer.observe(elements as HTMLElement);
    } else {
      (elements as NodeListOf<HTMLElement>).forEach((el) => {
        observer.observe(el);
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [selector, options, type]);
}
