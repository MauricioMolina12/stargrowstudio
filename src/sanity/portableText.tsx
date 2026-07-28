import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { imageUrl } from "./image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    h2: ({ children }) => <h2 className="mb-4 mt-8 text-2xl font-bold">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-3 mt-6 text-xl font-bold">{children}</h3>,
    h4: ({ children }) => <h4 className="mb-2 mt-4 text-lg font-semibold">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-[var(--color-primary)] pl-4 italic text-[var(--color-dark-gray)]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-4 list-disc space-y-1 pl-6">{children}</ul>,
    number: ({ children }) => <ol className="mb-4 list-decimal space-y-1 pl-6">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-[var(--color-gray)] px-1.5 py-0.5 text-sm">{children}</code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--color-primary)] underline"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl(value, 1000)}
          alt={value?.alt ?? ""}
          className="w-full rounded-xl"
        />
        {value?.caption && (
          <figcaption className="mt-2 text-center text-sm text-[var(--color-dark-gray)]">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
};

export function PortableTextRenderer({ value }: { value?: PortableTextBlock[] }) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}
