import { Target } from "lucide-react";
import { PortableTextRenderer } from "@/sanity/portableText";
import type { PortableTextBlock } from "@portabletext/types";
import type { SectionProps } from "../SectionRenderer";

export function ChallengeSection({ data }: SectionProps) {
  const heading = data.heading as string | undefined;
  const content = data.content as PortableTextBlock[] | undefined;
  const watermark = "RETO";

  return (
    <section className="relative w-full py-20 md:py-28 bg-white overflow-hidden">
      {/* Watermark — large editorial typography behind content */}
      <div
        className="absolute inset-0 overflow-hidden select-none pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="
            block font-bold leading-none tracking-[-0.06em] text-center
            text-[clamp(3rem,10vw,14rem)]
            md:text-[clamp(6rem,15vw,14rem)]
            absolute top-0 left-0 translate-x-0 translate-y-0 mt-4 ml-4
            md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:mt-0 md:ml-0
          "
          style={{ color: `color-mix(in srgb, var(--color-primary) 5%, transparent)` }}
        >
          {watermark}
        </span>
      </div>

      <div className="container-app relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-start">
          {/* Left: challenge indicator */}
          <div className="lg:sticky lg:top-24">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
              El reto
            </span>
            <Target
              className="mt-5 h-8 w-8"
              style={{ color: `color-mix(in srgb, var(--color-primary) 60%, transparent)` }}
              strokeWidth={1.5}
            />
            {heading && (
              <h2 className="mt-4 text-2xl md:text-3xl font-bold leading-[1.1] tracking-tight text-[var(--color-dark)]">
                {heading}
              </h2>
            )}
            <div className="mt-4 w-12 h-1 rounded-full bg-[var(--color-primary)]" />
          </div>

          {/* Right: content */}
          <div className="text-[0.95rem] md:text-lg leading-relaxed text-[var(--color-dark-gray)]">
            {content?.length ? <PortableTextRenderer value={content} /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}