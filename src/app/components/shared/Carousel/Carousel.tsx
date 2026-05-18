'use client'
import { useState, useEffect, ReactNode, useRef } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: ReactNode[];
  interval?: number;
  clickable?: boolean;
}

export default function Carousel({ children, interval = 4000, clickable = true }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = children.length;
  if (total === 0) return null;
  if (total === 1) {
    // Single slide: render centered, no controls or autoplay
    return (
      <div className="w-full flex items-center justify-center py-10">
        <div className="w-full max-w-6xl">
          {children[0]}
        </div>
      </div>
    );
  }
  const touchStartX = useRef<number | null>(null);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + total) % total);
  const goTo = (i: number) => setCurrentIndex(((i % total) + total) % total);

  useEffect(() => {
    if (interval <= 0 || isPaused) return;
    const id = setInterval(() => nextSlide(), interval);
    return () => clearInterval(id);
  }, [total, interval, isPaused]);

  const onMouseEnter = () => setIsPaused(true);
  const onMouseLeave = () => setIsPaused(false);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  }

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx > 0) prevSlide(); else nextSlide();
    }
    touchStartX.current = null;
    setIsPaused(false);
  }

  return (
    <div
      className="relative w-full flex items-center justify-center overflow-hidden py-10"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Carousel"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative w-full max-w-6xl">
        {children.map((child, idx) => {
          const isCurrent = idx === currentIndex;
          const isPrev = idx === (currentIndex - 1 + total) % total;
          const isNext = idx === (currentIndex + 1) % total;

          let classes = 'absolute inset-0 transition-opacity duration-500 ease-out transform';
          let style: any = { zIndex: 0, opacity: 0, pointerEvents: 'none', transform: 'translateX(0) scale(0.95)' };

          if (isCurrent) {
            classes += ' opacity-100 z-30';
            style = { zIndex: 30, opacity: 1, pointerEvents: 'auto', transform: 'translateX(0) scale(1)' };
          } else if (isPrev) {
            classes += ' opacity-100 z-20';
            style = { zIndex: 20, opacity: 0.9, pointerEvents: 'none', transform: 'translateX(-30px) scale(0.97)' };
          } else if (isNext) {
            classes += ' opacity-100 z-20';
            style = { zIndex: 20, opacity: 0.9, pointerEvents: 'none', transform: 'translateX(30px) scale(0.97)' };
          }

          return (
            <div
              key={idx}
              onClick={clickable && isCurrent ? nextSlide : undefined}
              className={`${classes} ${clickable && isCurrent ? 'cursor-pointer' : ''}`}
              style={style}
              aria-hidden={!isCurrent}
            >
              <div className="w-full h-full">
                {child}
              </div>
            </div>
          );
        })}

        {/* Controls */}
        <button
          aria-label="Previous slide"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md z-40"
        >
          <ChevronLeft className="w-5 h-5 text-[var(--color-primary)]" />
        </button>

        <button
          aria-label="Next slide"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md z-40"
        >
          <ChevronRight className="w-5 h-5 text-[var(--color-primary)]" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-2">
          {children.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-3 h-3 rounded-full ${i === currentIndex ? 'bg-[var(--color-primary)]' : 'bg-white/60'} shadow`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}