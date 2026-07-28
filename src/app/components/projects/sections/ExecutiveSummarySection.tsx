import { PortableTextRenderer } from "@/sanity/portableText";
import type { PortableTextBlock } from "@portabletext/types";
import type { SectionProps } from "../SectionRenderer";

export function ExecutiveSummarySection({ data, project }: SectionProps) {
  const content = data.content as PortableTextBlock[] | undefined;
  if (!content?.length) return null;

  const coverImage = project?.cover;
  const galleryFirst = project?.gallery?.[0]?.image;
  const image = coverImage || galleryFirst;

  return (
    <section className="w-full py-16 md:py-20">
      <div className="container-app">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Text column */}
          <div className="flex flex-col gap-6">
            <div className="text-lg md:text-xl leading-relaxed text-[var(--color-dark)] [&_p:first-child]:text-[1.4rem] [&_p:first-child]:md:text-[1.8rem] [&_p:first-child]:font-bold [&_p:first-child]:leading-[1.2] [&_p:first-child]:tracking-tight [&_p:first-child]:text-[var(--color-dark)]">
              <PortableTextRenderer value={content} />
            </div>
          </div>

          {/* Image column */}
          {image && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt="Proyecto"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}