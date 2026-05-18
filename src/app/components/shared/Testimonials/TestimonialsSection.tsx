"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Testimonial } from "@/app/types/testimonials";
import { stringToColor } from "@/app/utils/functions/stringToColor";
import { getInitialsAvatar } from "@/app/utils/functions/getInitialsAvatar";

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: Props) {
  if (!testimonials?.length) return null;
  if (testimonials.length === 1) {
    const t = testimonials[0];
    return (
      <section className="py-24 pt-4 relative">
        <div className="relative max-w-6xl mx-auto overflow-hidden">
          <div className="flex justify-center">
            <div className="w-full max-w-2xl px-4">
              <div className={`mt-8 flex flex-col items-start gap-4 rounded-2xl p-8 py-14 min-h-[200px] bg-[#c9c9ea]`}>
                <div className="flex">
                  <p className="text-gray-800 text-lg italic">{t.content}</p>
                </div>
                <div className="flex items-center gap-5">
                  <div
                    style={{ backgroundColor: stringToColor(t.name ?? "") }}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                  >
                    {getInitialsAvatar(t.name)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-600">{t.role !== "" ? t.role : "Empleado"} {t.company && `| ${t.company}`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const [index, setIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const extended = [
    testimonials[testimonials.length - 1],
    ...testimonials,
    testimonials[0],
  ];

  const next = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-12 lg:py-24 pt-4 relative px-4 lg:px-0">
      <div className="relative max-w-6xl mx-auto overflow-hidden">

        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(calc(-${index * 100}% + 0%))`,
          }}
        >
          {testimonials.map((t, i) => {
            const isActive = i === index;

            return (
              <div
                key={i}
                className="flex-shrink-0 w-full lg:basis-[60%] px-0 lg:px-4"
              >
                <div
                  className={`mt-4 lg:mt-8 flex flex-col items-start gap-4 rounded-2xl p-6 lg:p-8 py-8 lg:py-14 transition-all duration-500 min-h-[200px]
              ${isActive
                      ? "bg-[#c9c9ea] scale-100 opacity-100"
                      : "bg-[#c9c9ea]/60 scale-95 opacity-80 hidden lg:flex"
                    }`}
                >

                  <div className="flex">
                    <p className="text-gray-800 text-base lg:text-lg italic">
                      {t.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-5">
                    <div
                      style={{ backgroundColor: stringToColor(t.name ?? "") }}
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                    >
                      {getInitialsAvatar(t.name)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {t.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {t.role !== "" ? t.role : "Empleado"}{" "}
                        {t.company && `| ${t.company}`}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-4">
        <button
          onClick={prev}
          className="p-3 bg-white rounded-full shadow cursor-pointer"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={next}
          className="p-3 bg-white rounded-full shadow cursor-pointer"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}
