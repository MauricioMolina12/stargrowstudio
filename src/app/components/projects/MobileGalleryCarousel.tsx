'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSwipe } from '@/app/hooks/useSwipe';

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

const IDLE_RESUME_DELAY = 5000; // 5 seconds after interaction

/**
 * Mobile-first horizontal image carousel for project gallery.
 * Activated only on viewports < 1024px.
 * Features: swipe navigation, autoplay with pause-on-interaction,
 * progress bar, image counter, lazy loading with preload.
 */
export default function MobileGalleryCarousel({ items }: Props) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const idleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = items.length;

  if (!total) return null;

  const goTo = useCallback((index: number) => {
    const next = ((index % total) + total) % total;
    setCurrent(next);
    setProgress(0);
    progressRef.current = 0;
  }, [total]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Swipe handlers
  const swipeHandlers = useSwipe({
    onSwipeLeft: next,
    onSwipeRight: prev,
  });

  // Touch drag for visual feedback
  const dragStartX = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
    setIsDragging(true);
    setDragOffset(0);
    swipeHandlers.onTouchStart(e);
  }, [swipeHandlers]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isDragging) {
      const dx = e.touches[0].clientX - dragStartX.current;
      const maxWidth = (containerRef.current?.clientWidth ?? 0);
      const clamped = Math.max(-maxWidth, Math.min(maxWidth, dx));
      setDragOffset(clamped * 0.3); // 30% resistance for natural feel
    }
    swipeHandlers.onTouchMove(e);
  }, [isDragging, swipeHandlers]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setDragOffset(0);
    swipeHandlers.onTouchEnd();
  }, [swipeHandlers]);

  // Autoplay: 20s total = 20000ms. Update progress every 200ms.
  // Each tick advances 1% (100% / 100 ticks).
  useEffect(() => {
    if (isPaused || total <= 1) return;

    const interval = setInterval(() => {
      progressRef.current += 1;
      setProgress(progressRef.current);
      if (progressRef.current >= 100) {
        progressRef.current = 0;
        goTo(current + 1);
      }
    }, 200); // 200ms × 100 steps = 20s

    return () => clearInterval(interval);
  }, [isPaused, total, current, goTo]);

  // Pause/resume on interaction
  const pauseAutoplay = useCallback(() => {
    setIsPaused(true);
    if (idleRef.current) clearTimeout(idleRef.current);
  }, []);

  const resumeAutoplay = useCallback(() => {
    if (idleRef.current) clearTimeout(idleRef.current);
    idleRef.current = setTimeout(() => {
      setIsPaused(false);
    }, IDLE_RESUME_DELAY);
  }, []);

  const handleInteraction = useCallback(() => {
    pauseAutoplay();
    resumeAutoplay();
  }, [pauseAutoplay, resumeAutoplay]);

  // Preload adjacent images
  useEffect(() => {
    const preloadImages = [current + 1, current - 1, current + 2, current - 2]
      .filter((i) => i >= 0 && i < total)
      .map((i) => items[i]?.image)
      .filter(Boolean);

    preloadImages.forEach((src) => {
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, [current, items, total]);

  const item = items[current];

  return (
    <section className="w-full bg-white">
      {/* Header */}
      <div className="container-app py-12 md:py-16">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
          Galería del proyecto
        </span>
        <h2 className="mt-3 max-w-2xl text-[clamp(1.5rem,3vw,2.2rem)] font-bold leading-[1.08] tracking-tight text-[var(--color-dark)]">
          Imágenes del{' '}
          <span className="text-[var(--color-primary)]">caso de estudio</span>
        </h2>
      </div>

      {/* Carousel */}
      <div className="w-full">
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => { handleTouchEnd(); }}
          onMouseDown={() => {}}
          onClick={handleInteraction}
        >
          {/* Image container - 16:9 aspect ratio */}
          <div className="relative w-full aspect-video bg-black/5">
            {items.map((img, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-500 ease-out ${
                  i === current
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-[1.02]'
                }`}
                aria-hidden={i !== current}
                style={{
                  transform: i === current && isDragging
                    ? `translateX(${dragOffset}px) scale(1)`
                    : undefined,
                  transition: isDragging ? 'none' : undefined,
                }}
              >
                {img.image && (
                  <img
                    src={img.image}
                    alt={img.alt || img.title || `Imagen ${i + 1}`}
                    className="h-full w-full object-contain"
                    loading={i === current ? 'eager' : 'lazy'}
                    fetchPriority={i === current ? 'high' : 'auto'}
                    draggable={false}
                  />
                )}
              </div>
            ))}

            {/* Dark gradient overlay at bottom for text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 z-10 flex gap-0.5 p-2">
            {items.map((_, i) => (
              <div
                key={i}
                className="h-0.5 flex-1 rounded-full bg-white/30 overflow-hidden"
              >
                <div
                  className="h-full rounded-full bg-white transition-all duration-200 ease-linear"
                  style={{
                    width: i === current ? `${Math.min(progress, 100)}%` : i < current ? '100%' : '0%',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          {total > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); handleInteraction(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all duration-300 hover:bg-white active:scale-95"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-5 w-5 text-[var(--color-dark)]" strokeWidth={2} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); handleInteraction(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all duration-300 hover:bg-white active:scale-95"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="h-5 w-5 text-[var(--color-dark)]" strokeWidth={2} />
              </button>
            </>
          )}

          {/* Image counter */}
          <div className="absolute top-3 right-3 z-10 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-xs font-medium text-white/90">
              {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>

          {/* Touch hint - show only briefly on first load */}
          {total > 1 && progress < 5 && (
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none opacity-30 animate-pulse">
              <ChevronLeft className="h-6 w-6 text-white ml-2" strokeWidth={1.5} />
            </div>
          )}
        </div>

        {/* Caption */}
        <div className="container-app py-6">
          {item?.category && (
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-primary)] mb-1.5">
              {item.category}
            </span>
          )}
          {item?.title && (
            <h3 className="text-lg md:text-xl font-bold text-[var(--color-dark)] leading-snug">
              {item.title}
            </h3>
          )}
          {item?.description && (
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-dark-gray)] max-w-lg">
              {item.description}
            </p>
          )}

          {/* Dots indicator */}
          {total > 1 && (
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { goTo(i); handleInteraction(); }}
                    className="flex items-center justify-center p-1.5 rounded-full transition-all duration-300"
                    aria-label={`Ir a imagen ${i + 1}`}
                  >
                    <span
                      className={`block rounded-full transition-all duration-500 ${
                        i === current
                          ? 'h-2 w-6 bg-[var(--color-primary)]'
                          : 'h-2 w-2 bg-black/20 hover:bg-black/40'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {isPaused && (
                <span className="text-[10px] font-medium text-[var(--color-dark-gray)] ml-1">
                  Pausado
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}