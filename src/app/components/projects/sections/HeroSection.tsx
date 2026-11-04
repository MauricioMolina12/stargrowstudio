'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SectionProps } from "../SectionRenderer";

export function HeroSection({ data, project }: SectionProps) {
  const heading = (data.heading as string) || project?.name || "";
  const subheading = data.subheading as string | undefined;
  const image = (data.image as string) || project?.cover || undefined;
  const ctas = data.ctas as { label: string; href: string; style: string }[] | undefined;
  const accent = project?.accent || "var(--color-primary)";
  const showProjectTag =
    project?.name && heading.trim().toLowerCase() !== project.name.trim().toLowerCase();

  return (
    <section className="relative flex w-full min-h-[420px] sm:min-h-[480px] lg:min-h-[62vh] xl:min-h-[68vh] max-h-[760px] items-end overflow-hidden bg-[#0b0b1a]">
      {/* Background image or gradient */}
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={heading}
          className="absolute inset-0 h-full w-full object-cover object-center scale-[1.01]"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${accent} 0%, #1a1a3e 100%)`,
          }}
        />
      )}

      {/* Layer 1: Uniform dark-indigo contrast veil + subtle blur over background image */}
      <div
        className="absolute inset-0 bg-[#090918]/55 backdrop-blur-[2px]"
        aria-hidden="true"
      />

      {/* Layer 2: Top vignette to protect breadcrumb legibility */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#070714]/80 via-[#070714]/35 to-transparent"
        aria-hidden="true"
      />

      {/* Layer 3: Directional bottom + left gradient for text & CTA contrast */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070714]/95 via-[#070714]/65 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#070714]/80 via-[#070714]/40 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1390px] px-[clamp(1.25rem,3vw,2.5rem)] pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pb-20">
        <div className="max-w-2xl">
          {/* Eyebrow / Badge */}
          <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a5a6f6]" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
              Caso de éxito{showProjectTag ? ` · ${project?.name}` : ""}
            </span>
          </div>

          {/* Responsive Title — balanced for small laptops (13"/14"), tablets, and desktop */}
          <h1 className="text-[clamp(1.75rem,3.1vw,3.15rem)] font-bold leading-[1.12] tracking-[-0.02em] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]">
            {heading}
          </h1>

          {subheading && (
            <p className="mt-4 max-w-xl text-[clamp(0.95rem,1.15vw,1.125rem)] leading-[1.65] text-white/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
              {subheading}
            </p>
          )}

          {ctas && ctas.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-3">
              {ctas.map((cta, i) => (
                <Link
                  key={i}
                  href={cta.href}
                  className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                    cta.style === "primary"
                      ? "bg-white text-[var(--color-dark)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:bg-white/90"
                      : "border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                  }`}
                >
                  {cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
