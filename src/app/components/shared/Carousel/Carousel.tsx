'use client'
import { useState, useEffect, ReactNode } from "react";

interface CarouselProps {
  children: ReactNode[];
  interval?: number;
  clickable?: boolean;
}

export default function Carousel({ children, interval = 3000, clickable = true }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = children.length;

  useEffect(() => {
    if (interval <= 0) return;
    const id = setInterval(() => {
      nextSlide();
    }, interval);
    return () => clearInterval(id);
  }, [total, interval, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden p-10">
      <div className="relative w-full max-w-5xl h-full">
        {children.map((child, idx) => {

          const isCurrent = idx === currentIndex;
          const isNext = idx === (currentIndex + 1) % total;
          const isAfterNext = idx === (currentIndex + 2) % total;

          let opacity = "opacity-0 pointer-events-none";
          let zIndex = 0;
          let translateX = "0px";
          let scale = 0.9;

          if (isCurrent) {
            opacity = "opacity-100 z-30";
            zIndex = 30;
            translateX = "0px";
            scale = 1;
          } else if (isNext) {
            opacity = "opacity-100 z-20";
            zIndex = 20;
            translateX = "30px";
            scale = 0.96;
          } else if (isAfterNext) {
            opacity = "opacity-100 z-10";
            zIndex = 10;
            translateX = "60px";
            scale = 0.92;
          }

          return (
            <div
              key={idx}
              onClick={clickable && isCurrent ? nextSlide : undefined}
              className={`absolute inset-0 transition-all duration-500 ease-out transform
                ${opacity} ${clickable && isCurrent ? 'cursor-pointer' : ''}`}
              style={{
                zIndex: zIndex,
                transform: `translateX(${translateX}) scale(${scale})`,
              }}
            >

              <div className="w-full h-full">
                {child}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}