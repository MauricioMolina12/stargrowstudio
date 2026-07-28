'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import type { SectionProps } from "../SectionRenderer";

export function HeroSection({ data, project }: SectionProps) {
  const heading = (data.heading as string) || project?.name || "";
  const subheading = data.subheading as string | undefined;
  const image = (data.image as string) || project?.cover || undefined;
  const ctas = data.ctas as { label: string; href: string; style: string }[] | undefined;
  const accent = project?.accent || "var(--color-primary)";

  // Debug: log image sources in the browser console
  // useEffect(() => {
  //   console.log("[HeroSection] image sources:", {
  //     dataImage: data.image,
  //     projectCover: project?.cover,
  //     resolved: image,
  //   });
  // }, [data.image, project?.cover, image]);

  return (
    <section className="relative w-full min-h-[50vh] lg:min-h-[85vh] flex items-end overflow-hidden">
      {/* Background image or gradient */}
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={heading}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${accent} 0%, #1a1a3e 100%)`,
          }}
        />
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1390px] mx-auto px-[clamp(1rem,3vw,2rem)] pb-16 md:pb-24 pt-14 md:pt-0">
        {subheading && (
          <p className="text-white/60 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Caso de éxito
          </p>
        )}
        <h1 className="text-white text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-tight max-w-3xl">
          {heading}
        </h1>
        {subheading && (
          <p className="mt-4 text-white/80 text-[clamp(1rem,1.3vw,1.2rem)] leading-relaxed max-w-xl">
            {subheading}
          </p>
        )}
        {ctas && ctas.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {ctas.map((cta, i) => (
              <Link
                key={i}
                href={cta.href}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold min-h-[44px] transition-all duration-300 ${
                  cta.style === "primary"
                    ? "bg-white text-[var(--color-dark)] hover:bg-white/90"
                    : "border border-white/30 text-white hover:bg-white/10"
                }`}
              >
                {cta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}