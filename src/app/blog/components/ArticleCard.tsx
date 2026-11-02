"use client";

import Link from "next/link";
import {
  ArrowUpRight as IconArrowUpRight,
  Instagram as IconBrandInstagram,
  Calendar as IconCalendar,
  Clock as IconClock,
  User as IconUser,
} from "lucide-react";
import { imageUrl } from "@/sanity/image";
import { resolveInstagramUrl } from "@/app/components/shared/instagramUtils";
import { formatDateShort } from "../utils";
import type { PostListItem } from "../types";
import "../styles/animations.css";

type ArticleCardProps = {
  post: PostListItem;
  index?: number;
};

export function ArticleCard({ post, index = 0 }: ArticleCardProps) {
  const category = post.categories?.[0];
  const instagramUrl = resolveInstagramUrl(post.slug, post.instagramUrl);

  return (
    <article
      className="group anim-stagger flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-white-to-primary)] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary-bright)]/40 sm:p-5"
      style={{ "--anim-index": index } as React.CSSProperties}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-bright)]"
        aria-label={`Leer artículo: ${post.title}`}
      >
        {/* Imagen 16:9 */}
        <figure className="img-zoom relative aspect-video w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-gray)]">
          {post. mainImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl(post.mainImage, 600)}
              alt={post.title}
              loading={index > 2 ? "lazy" : "eager"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-[var(--color-primary-tint)] to-[var(--color-primary-light)]">
              <span className="font-editorial text-2xl font-bold text-[var(--color-primary-bright)] opacity-35">
                SGS
              </span>
            </div>
          )}
          {instagramUrl && (
            <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              <IconBrandInstagram size={12} aria-hidden="true" />
              IG
            </span>
          )}
        </figure>

        {/* Contenido */}
        <div className="flex flex-1 flex-col pt-4">
          {/* Kicker + Fecha / Lectura */}
          <div className="flex items-center justify-between gap-2 text-xs">
            {category ? (
              <span className="font-bold uppercase tracking-[0.13em] text-[var(--color-primary-bright)]">
                {category.title}
              </span>
            ) : (
              <span />
            )}

            <div className="flex items-center gap-2 text-[11px] font-medium text-[var(--color-dark-gray)]">
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

          {/* Título con color de la app */}
          <h3 className="font-editorial mt-2.5 text-xl font-bold leading-snug text-[var(--color-primary-to-white)] transition-colors duration-300 group-hover:text-[var(--color-primary-bright)]">
            {post.title}
          </h3>

          {/* Resumen */}
          {post.excerpt && (
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--color-dark-gray)]">
              {post.excerpt}
            </p>
          )}

          {/* Autor + Leer más simétrico al fondo */}
          <div className="mt-auto flex items-center justify-between border-t border-[var(--color-border)] pt-3.5 mt-5">
            <div className="flex items-center gap-2">
              {post.author?.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl(post.author.avatar, 48)}
                  alt={post.author.name}
                  className="h-6 w-6 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary-tint)]">
                  <IconUser size={12} aria-hidden="true" className="text-[var(--color-primary-bright)]" />
                </div>
              )}
              <span className="text-xs font-semibold text-[var(--color-primary-to-white)]">
                {post.author?.name ?? "Star Grow Studio"}
              </span>
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[var(--color-primary-bright)] transition-transform duration-300 group-hover:translate-x-0.5">
              Leer <IconArrowUpRight size={14} aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
