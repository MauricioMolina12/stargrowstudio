"use client";

import Link from "next/link";
import { IconArrowUpRight, IconBrandInstagram, IconCalendar, IconClock, IconFlame, IconUser } from "@tabler/icons-react";
import { imageUrl } from "@/sanity/image";
import { resolveInstagramUrl } from "@/app/components/shared/instagramUtils";
import { formatDateShort } from "../utils";
import type { PostListItem } from "../types";
import "../styles/animations.css";

type FeaturedArticleCardProps = {
  post: PostListItem;
  index?: number;
};

export function FeaturedArticleCard({ post, index = 0 }: FeaturedArticleCardProps) {
  const categories = post.categories ?? [];
  const instagramUrl = resolveInstagramUrl(post.slug, post.instagramUrl);

  return (
    <article
      className="group anim-stagger flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-white-to-primary)] p-5 transition-all duration-300 hover:border-[var(--color-primary-bright)]/40 sm:p-7"
      style={{ "--anim-index": index } as React.CSSProperties}
      aria-label="Artículo destacado"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-bright)]"
        aria-label={`Leer artículo: ${post.title}`}
      >
        {/* Imagen principal 16:9 */}
        <figure className="img-zoom relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-gray)]">
          {post.mainImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl(post.mainImage, 1000)}
              alt={post.title}
              loading="eager"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-[var(--color-primary-tint)] to-[var(--color-primary-light)]">
              <span className="font-editorial text-4xl font-bold text-[var(--color-primary-bright)] opacity-35">
                Star Grow Studio
              </span>
            </div>
          )}

          {/* Badge Destacado */}
          <span className="absolute left-3.5 top-3.5 z-10 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary)] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm">
            <IconFlame size={13} aria-hidden="true" />
            Artículo Principal
          </span>

          {/* Badge Instagram */}
          {instagramUrl && (
            <span className="absolute right-3.5 top-3.5 z-10 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              <IconBrandInstagram size={13} aria-hidden="true" />
              Carrusel IG
            </span>
          )}
        </figure>

        {/* Contenido */}
        <div className="flex flex-1 flex-col pt-6">
          {/* Categorías estilo Kicker */}
          {categories.length > 0 && (
            <div className="mb-2.5 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-primary-bright)]">
              {categories.map((c, idx) => (
                <span key={c.slug} className="inline-flex items-center gap-2">
                  {idx > 0 && <span className="text-[var(--color-dark-gray)]">·</span>}
                  <span>{c.title}</span>
                </span>
              ))}
            </div>
          )}

          {/* Título con color de la app */}
          <h2 className="font-editorial text-2xl font-bold leading-[1.18] tracking-[-0.02em] text-[var(--color-primary-to-white)] transition-colors duration-300 group-hover:text-[var(--color-primary-bright)] sm:text-[1.9rem]">
            {post.title}
          </h2>

          {/* Resumen */}
          {post.excerpt && (
            <p className="font-editorial mt-3 line-clamp-3 text-base leading-relaxed text-[var(--color-dark-gray)] sm:text-[1.06rem]">
              {post.excerpt}
            </p>
          )}

          {/* Pie simétrico anclado abajo */}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-border)] pt-4 mt-6 text-xs font-medium text-[var(--color-dark-gray)]">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-primary-to-white)]">
                {post.author?.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageUrl(post.author.avatar, 48)}
                    alt={post.author.name}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <IconUser size={14} aria-hidden="true" className="text-[var(--color-primary-bright)]" />
                )}
                {post.author?.name ?? "Star Grow Studio"}
              </span>

              {post.publishedAt && (
                <time
                  dateTime={post.publishedAt.slice(0, 10)}
                  className="inline-flex items-center gap-1"
                >
                  <IconCalendar size={13} aria-hidden="true" />
                  {formatDateShort(post.publishedAt)}
                </time>
              )}

              {post.readingTime && (
                <span className="inline-flex items-center gap-1">
                  <IconClock size={13} aria-hidden="true" />
                  {post.readingTime} min de lectura
                </span>
              )}
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[var(--color-primary-bright)]">
              Leer artículo
              <IconArrowUpRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
