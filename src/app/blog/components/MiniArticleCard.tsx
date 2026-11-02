"use client";

import Link from "next/link";
import { ArrowUpRight as IconArrowUpRight, Calendar as IconCalendar, Clock as IconClock } from "lucide-react";
import { imageUrl } from "@/sanity/image";
import { formatDateShort } from "../utils";
import type { PostListItem } from "../types";
import "../styles/animations.css";

type MiniArticleCardProps = {
  post: PostListItem;
  index?: number;
};

export function MiniArticleCard({ post, index = 0 }: MiniArticleCardProps) {
  const category = post.categories?.[0];
  const numberLabel = String(index).padStart(2, "0");

  return (
    <article
      className="group anim-stagger flex w-full"
      style={{ "--anim-index": index } as React.CSSProperties}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="flex w-full items-start gap-3.5 rounded-xl p-2 -mx-2 transition-colors duration-200 hover:bg-[var(--color-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-bright)] sm:gap-4"
        aria-label={`Leer artículo: ${post.title}`}
      >
        {/* Número de edición estilo NYT */}
        <span
          className="font-editorial mt-0.5 shrink-0 text-xl font-bold leading-none text-[var(--color-primary-bright)]/45 transition-colors group-hover:text-[var(--color-primary-bright)]"
          aria-hidden="true"
        >
          {numberLabel}
        </span>

        {/* Contenido */}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          {category && (
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-primary-bright)]">
              {category.title}
            </span>
          )}

          <h3 className="font-editorial line-clamp-2 text-[1.02rem] font-bold leading-snug text-[var(--color-primary-to-white)] transition-colors duration-200 group-hover:text-[var(--color-primary-bright)]">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="line-clamp-2 text-xs leading-relaxed text-[var(--color-dark-gray)]">
              {post.excerpt}
            </p>
          )}

          {/* Meta: fecha + lectura */}
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-[var(--color-dark-gray)]">
            {post.publishedAt && (
              <time
                dateTime={post.publishedAt.slice(0, 10)}
                className="inline-flex items-center gap-1"
              >
                <IconCalendar size={12} aria-hidden="true" />
                {formatDateShort(post.publishedAt)}
              </time>
            )}

            {post.readingTime && (
              <span className="inline-flex items-center gap-1">
                <IconClock size={12} aria-hidden="true" />
                {post.readingTime} min
              </span>
            )}
          </div>
        </div>

        {/* Miniatura cuadrada/4:3 a la derecha estilo periódico */}
        <figure className="img-zoom relative aspect-square w-20 shrink-0 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-gray)] sm:w-24">
          {post.mainImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl(post.mainImage, 240)}
              alt={post.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-[var(--color-primary-tint)] to-[var(--color-primary-light)]">
              <span className="font-editorial text-sm font-bold text-[var(--color-primary-bright)] opacity-40">
                SGS
              </span>
            </div>
          )}
          <span className="absolute bottom-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-white-to-primary)]/90 text-[var(--color-primary-bright)] opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
            <IconArrowUpRight size={12} aria-hidden="true" />
          </span>
        </figure>
      </Link>
    </article>
  );
}
