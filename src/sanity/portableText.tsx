import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { imageUrl } from "./image";

const defaultComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    h2: ({ children }) => <h2 className="mb-4 mt-8 text-2xl font-bold">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-3 mt-6 text-xl font-bold">{children}</h3>,
    h4: ({ children }) => <h4 className="mb-2 mt-4 text-lg font-semibold">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-[var(--color-primary-bright)] pl-4 italic text-[var(--color-dark-gray)]">
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
        className="text-[var(--color-primary-bright)] underline"
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

/**
 * Componentes estilo editorial (inspirado en The New York Times):
 * - Simetría estricta en los márgenes izquierdo y derecho de la columna.
 * - Tipografía serif editorial con los colores de marca de la aplicación (--color-primary-to-white).
 * - Lectura fluida sin negros puros.
 */
const editorialComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="editorial-p mb-6 text-[1.08rem] leading-[1.85] tracking-[-0.004em] text-[var(--color-dark-gray)] sm:text-[1.18rem] sm:leading-[1.88]">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-editorial mt-12 mb-5 border-t border-[var(--color-border)] pt-8 text-[1.6rem] font-bold leading-[1.2] tracking-[-0.02em] text-[var(--color-primary-to-white)] first:mt-0 first:border-t-0 first:pt-0 sm:text-[1.95rem]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-editorial mt-9 mb-3.5 text-[1.25rem] font-bold leading-[1.3] tracking-[-0.01em] text-[var(--color-primary-to-white)] sm:text-[1.4rem]">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-7 mb-2.5 text-[1.08rem] font-semibold leading-[1.4] text-[var(--color-primary-to-white)] sm:text-[1.15rem]">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <figure className="my-10 border-y border-[var(--color-border)] bg-[var(--color-primary-tint)]/40 py-7 px-6 rounded-r-xl">
        <blockquote className="font-editorial relative border-l-[3px] border-[var(--color-primary-bright)] pl-5 text-[1.22rem] italic leading-[1.55] text-[var(--color-primary-to-white)] sm:text-[1.38rem]">
          {children}
        </blockquote>
      </figure>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 space-y-3.5 border-l border-[var(--color-border)] pl-5 sm:pl-6">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 list-decimal space-y-3.5 pl-6 marker:font-semibold marker:text-[var(--color-primary-bright)]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative text-[1.05rem] leading-[1.8] text-[var(--color-dark-gray)] sm:text-[1.14rem] before:absolute before:-left-[1.45rem] sm:before:-left-[1.7rem] before:top-[0.72em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--color-primary-bright)]">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="pl-1 text-[1.05rem] leading-[1.8] text-[var(--color-dark-gray)] sm:text-[1.14rem]">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[var(--color-primary-to-white)]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-[var(--color-primary-tint)] px-1.5 py-0.5 font-mono text-[0.9em] text-[var(--color-primary-bright)]">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-[var(--color-primary-bright)] underline decoration-[var(--color-primary-bright)]/40 underline-offset-4 transition-colors hover:decoration-[var(--color-primary-bright)]"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const src = imageUrl(value, 1200);
      if (!src) return null;
      const browserUrl = value?.browserUrl as string | undefined;
      const badge = value?.badge as string | undefined;
      const liveHref = value?.liveHref as string | undefined;
      const caseStudyHref = value?.caseStudyHref as string | undefined;

      return (
        <figure className="my-11 w-full">
          <div className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-white-to-primary)] shadow-[0_18px_50px_-18px_rgba(86,86,181,0.16)] transition-all duration-300 hover:border-[var(--color-primary-bright)]/40">
            {browserUrl && (
              <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/85" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/85" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/85" />
                </div>

                <div className="flex min-w-0 items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-white-to-primary)] px-3.5 py-1 text-[11px] font-medium text-[var(--color-dark-gray)]">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                  <span className="truncate font-mono">{browserUrl}</span>
                </div>

                <div className="flex items-center gap-2">
                  {badge && (
                    <span className="hidden rounded-full bg-[var(--color-primary-tint)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-primary-bright)] sm:inline-block">
                      {badge}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="relative overflow-hidden bg-[var(--color-surface)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={value?.alt ?? ""}
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </div>
          </div>

          {(value?.caption || value?.alt || liveHref || caseStudyHref) && (
            <figcaption className="mt-3 flex flex-col justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-3 text-left text-xs leading-relaxed text-[var(--color-dark-gray)] sm:flex-row sm:items-center sm:text-[13px]">
              <span>{value?.caption ?? value?.alt}</span>
              {(caseStudyHref || liveHref) && (
                <span className="flex shrink-0 items-center gap-3 font-semibold text-[var(--color-primary-bright)]">
                  {caseStudyHref && (
                    <a
                      href={caseStudyHref}
                      className="hover:underline"
                    >
                      Ver caso de éxito →
                    </a>
                  )}
                  {liveHref && (
                    <a
                      href={liveHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Visitar sitio ↗
                    </a>
                  )}
                </span>
              )}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export function PortableTextRenderer({
  value,
  variant = "default",
}: {
  value?: PortableTextBlock[];
  variant?: "default" | "editorial";
}) {
  if (!value) return null;
  return (
    <PortableText
      value={value}
      components={variant === "editorial" ? editorialComponents : defaultComponents}
    />
  );
}
