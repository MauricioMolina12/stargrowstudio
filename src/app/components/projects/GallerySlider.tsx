'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type GalleryItem = {
  image?: string;
  alt?: string;
  title?: string;
  description?: string;
  category?: string;
};

type Props = {
  items: GalleryItem[];
};

export default function GallerySlider({ items }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = items.length;

  const goTo = useCallback((index: number, dir: 'left' | 'right') => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % total, 'right');
  }, [current, total, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + total) % total, 'left');
  }, [current, total, goTo]);

  // Autoplay
  useEffect(() => {
    if (isPaused || total <= 1) return;
    timerRef.current = setInterval(next, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPaused, total, next]);

  if (!total) return null;

  const item = items[current];
  const slideClass = direction === 'right' ? 'translate-x-0' : '-translate-x-0';

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl bg-black/[0.03] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides container */}
      <div className="relative w-full aspect-[16/10] md:aspect-[16/9] lg:aspect-[2/1]">
        {items.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
              i === current
                ? 'opacity-100 scale-100'
                : i < current
                ? 'opacity-0 scale-[0.97] -translate-x-4'
                : 'opacity-0 scale-[0.97] translate-x-4'
            }`}
            aria-hidden={i !== current}
          >
            {img.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={img.image}
                alt={img.alt || img.title || `Imagen ${i + 1}`}
                className="h-full w-full object-cover"
              />
            )}
            {/* Overlay for text */}
            {(img.title || img.description || img.category) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6 md:p-8">
                {img.category && (
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60">
                    {img.category}
                  </span>
                )}
                {img.title && (
                  <h3 className="mt-1.5 text-lg md:text-xl font-bold text-white">
                    {img.title}
                  </h3>
                )}
                {img.description && (
                  <p className="mt-1 max-w-lg text-sm text-white/70 line-clamp-2">
                    {img.description}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 min-h-[44px] min-w-[44px] rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all duration-300 hover:bg-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="h-5 w-5 text-[var(--color-dark)]" strokeWidth={2} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 min-h-[44px] min-w-[44px] rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all duration-300 hover:bg-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="h-5 w-5 text-[var(--color-dark)]" strokeWidth={2} />
          </button>
        </>
      )}

      {/* Dots */}
      {total > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 'right' : 'left')}
              className="flex items-center justify-center p-2 rounded-full transition-all duration-500 focus:outline-none"
              aria-label={`Ir a imagen ${i + 1}`}
            >
              <span className={`block rounded-full transition-all duration-500 ${
                i === current
                  ? 'h-1.5 w-6 bg-white'
                  : 'h-1.5 w-1.5 bg-white/40 hover:bg-white/60'
              }`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}