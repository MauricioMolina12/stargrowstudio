import { PortableTextRenderer } from "@/sanity/portableText";
import type { PortableTextBlock } from "@portabletext/types";
import type { SectionProps } from "../SectionRenderer";

export function RichTextSection({ data }: SectionProps) {
  const content = data.content as PortableTextBlock[] | undefined;
  if (!content?.length) return null;

  return (
    <section className="w-full py-16 md:py-20">
      <div className="container-app">
        <div className="max-w-3xl mx-auto">
          <PortableTextRenderer value={content} />
        </div>
      </div>
    </section>
  );
}