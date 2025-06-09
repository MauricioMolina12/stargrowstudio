import { onMounted, onUnmounted } from 'vue';

export function useIntersectionObserver(selector: string, options?: IntersectionObserverInit) {
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    const element = document.querySelector(selector);
    if (!element) return;

    element.classList.add('hidden');

    observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.classList.remove('hidden');
          obs.unobserve(entry.target);
        }
      });
    }, options || { threshold: 0.4 });

    observer.observe(element);
  });

  onUnmounted(() => {
    observer?.disconnect();
  });
}
