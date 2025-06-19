import { onMounted, onUnmounted } from "vue";

export function useIntersectionObserver(
  selector: string,
  options?: IntersectionObserverInit,
  type: string = "1"
) {
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    const elements =
      type === "1"
        ? document.querySelector(selector)
        : document.querySelectorAll(selector);

    if (
      !elements ||
      (type !== "1" && (elements as NodeListOf<Element>).length === 0)
    ) {
      console.warn(
        `useIntersectionObserver: No se encontró elemento(s) para el selector "${selector}" con el tipo "${type}".`
      );
      return;
    }

    if (type === "1") {
      (elements as HTMLElement).classList.add("hidden");
    } else {
      (elements as NodeListOf<HTMLElement>).forEach((element: HTMLElement) => {
        element.classList.add("hidden");
      });
    }

    const observerCallback = (
      entries: IntersectionObserverEntry[],
      obs: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.classList.remove("hidden");
          obs.unobserve(entry.target);
        }
      });
    };

    observer = new IntersectionObserver(
      observerCallback,
      options || { threshold: 0.4 }
    );
    if (type === "1") {
      observer.observe(elements as HTMLElement);
    } else {
      (elements as NodeListOf<HTMLElement>).forEach((element: HTMLElement) => {
        observer!.observe(element);
      });
    }
  });

  onUnmounted(() => {
    observer?.disconnect();
  });
}
