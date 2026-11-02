import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, User, Calendar } from "lucide-react";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";

import { getPostBySlug, getPostSlugs } from "@/sanity/data/posts";
import { imageUrl } from "@/sanity/image";
import { PortableTextRenderer } from "@/sanity/portableText";
import {
  InstagramPostShowcase,
  InstagramQuickBadge,
} from "@/app/components/shared/InstagramPostShowcase";
import { resolveInstagramUrl } from "@/app/components/shared/instagramUtils";
import { ShareArticle } from "../components/ShareArticle";
import { estimateReadingTime, formatDate } from "../utils";
import { ArticleDetailClient } from "./ArticleDetailClient";

const newsreader = Newsreader({
  variable: "--font-editorial",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

type PostImage = SanityImageSource & {
  alt?: string;
  caption?: string;
};

type PostRaw = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: PostImage;
  publishedAt?: string;
  instagramUrl?: string;
  body?: PortableTextBlock[];
  author?: { name: string; slug: string; avatar?: SanityImageSource; role?: string; bio?: string };
  categories?: { title: string; slug: string }[];
  seo?: { metaTitle?: string; metaDescription?: string; ogTitle?: string; ogDescription?: string; ogImage?: SanityImageSource };
};

export async function generateStaticParams() {
  try {
    const slugs = await getPostSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getPostBySlug(slug)) as PostRaw | null;

  if (!post) return { title: "Artículo | Star Grow Studio" };

  const title = post.seo?.metaTitle ?? `${post.title} | Star Grow Studio`;
  const description = post.seo?.metaDescription ?? post.excerpt ?? "";
  const ogTitle = post.seo?.ogTitle ?? title;
  const ogDescription = post.seo?.ogDescription ?? description;
  const ogImageUrl = post.seo?.ogImage
    ? imageUrl(post.seo.ogImage, 1200)
    : post.mainImage
      ? imageUrl(post.mainImage, 1200)
      : undefined;

  const categoryStrings = post.categories?.map((c) => c.title).join(", ") ?? "";

  return {
    title,
    description,
    keywords: [categoryStrings, "transformación digital", "Star Grow Studio", "blog B2B"].filter(Boolean).join(", "),
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author?.name ?? "Star Grow Studio"],
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
    alternates: {
      canonical: `https://stargrowstudio.com/blog/${slug}`,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = (await getPostBySlug(slug)) as PostRaw | null;

  if (!post) notFound();

  const readingTime = estimateReadingTime(post.body as unknown as PortableTextBlock[]);
  const instagramUrl = resolveInstagramUrl(post.slug ?? slug, post.instagramUrl);
  const ogImageUrl = post.seo?.ogImage
    ? imageUrl(post.seo.ogImage, 1200)
    : post.mainImage
      ? imageUrl(post.mainImage, 1200)
      : undefined;

  return (
    <ArticleDetailClient
      post={{
        ...post,
        readingTime,
      }}
      readingTime={readingTime}
      ogImageUrl={ogImageUrl}
      fontClassName={newsreader.variable}
    >
      {/* Top Editorial Bar + Breadcrumb (100% alineado a la columna) */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center justify-between border-b border-[var(--color-border)] pb-4 pt-8 lg:pt-10"
      >
        <ol className="flex min-w-0 items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-[var(--color-dark-gray)]">
          <li>
            <Link
              href="/"
              className="transition-colors hover:text-[var(--color-primary-bright)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-bright)]"
            >
              Inicio
            </Link>
          </li>
          <li aria-hidden="true" className="text-[var(--color-border)]">/</li>
          <li>
            <Link
              href="/blog"
              className="transition-colors hover:text-[var(--color-primary-bright)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-bright)]"
            >
              Blog
            </Link>
          </li>
          <li aria-hidden="true" className="text-[var(--color-border)]">/</li>
          <li
            className="truncate max-w-[180px] sm:max-w-[300px] text-[var(--color-primary-bright)] font-semibold"
            aria-current="page"
          >
            {post.categories?.[0]?.title ?? post.title}
          </li>
        </ol>

        <span className="hidden text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-dark-gray)] sm:inline">
          Edición Digital
        </span>
      </nav>

      {/* Article */}
      <article className="pt-7 sm:pt-9">
        <header className="w-full">
          {/* Kicker / Categorías */}
          {post.categories && post.categories.length > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-2.5">
              {post.categories.map((c, idx) => (
                <span key={c.slug} className="inline-flex items-center gap-2.5">
                  {idx > 0 && (
                    <span className="text-xs text-[var(--color-dark-gray)]" aria-hidden="true">
                      ·
                    </span>
                  )}
                  <Link
                    href={`/blog?categoria=${c.slug}`}
                    className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-primary-bright)] transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-bright)]"
                  >
                    {c.title}
                  </Link>
                </span>
              ))}
            </div>
          )}

          {/* Headline estilo New York Times */}
          <h1 className="font-editorial text-[2.05rem] font-bold leading-[1.12] tracking-[-0.022em] text-[var(--color-primary-to-white)] sm:text-[2.65rem] lg:text-[3.05rem]">
            {post.title}
          </h1>

          {/* Standfirst / Bajada editorial (Excerpt) */}
          {post.excerpt && (
            <p className="font-editorial mt-5 text-[1.15rem] leading-[1.58] text-[var(--color-dark-gray)] sm:text-[1.32rem]">
              {post.excerpt}
            </p>
          )}

          {/* Byline & Meta Bar con filetes horizontales simétricos */}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-y border-[var(--color-border)] py-4">
            <div className="flex items-center gap-3.5">
              {post.author?.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl(post.author.avatar, 64)}
                  alt={post.author.name}
                  className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-[var(--color-border)]"
                />
              ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-tint)] ring-1 ring-[var(--color-border)]">
                  <User size={16} className="text-[var(--color-primary-bright)]" />
                </div>
              )}

              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-1.5 text-sm">
                  <span className="text-[var(--color-dark-gray)]">Por</span>
                  <span className="font-bold text-[var(--color-primary-to-white)]">
                    {post.author?.name ?? "Star Grow Studio"}
                  </span>
                  {post.author?.role && (
                    <span className="hidden text-xs text-[var(--color-dark-gray)] sm:inline">
                      · {post.author.role}
                    </span>
                  )}
                </div>

                <div className="mt-0.5 flex flex-wrap items-center gap-3 text-xs text-[var(--color-dark-gray)]">
                  {post.publishedAt && (
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={12} aria-hidden="true" />
                      <time dateTime={post.publishedAt.slice(0, 10)}>
                        {formatDate(post.publishedAt)}
                      </time>
                    </span>
                  )}
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} aria-hidden="true" />
                    <span>{readingTime} min de lectura</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Acciones sociales alineadas al borde derecho */}
            <div className="flex flex-wrap items-center gap-2.5">
              {instagramUrl && (
                <InstagramQuickBadge instagramUrl={instagramUrl} label="Post en IG" />
              )}
              <ShareArticle title={post.title} slug={post.slug} />
            </div>
          </div>
        </header>

        {/* Imagen destacada: mismo ancho exacto de la columna para simetría total */}
        {post.mainImage && (
          <figure className="my-9 w-full">
            <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-white-to-primary)] shadow-[0_18px_50px_-18px_rgba(86,86,181,0.16)]">
              {(post.mainImage as { browserUrl?: string }).browserUrl && (
                <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/85" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/85" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/85" />
                  </div>
                  <div className="flex min-w-0 items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-white-to-primary)] px-3.5 py-1 text-[11px] font-medium text-[var(--color-dark-gray)]">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                    <span className="truncate font-mono">
                      {(post.mainImage as { browserUrl?: string }).browserUrl}
                    </span>
                  </div>
                  <span className="hidden rounded-full bg-[var(--color-primary-tint)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-primary-bright)] sm:inline-block">
                    {(post.mainImage as { badge?: string }).badge ?? "Proyecto Star Grow Studio"}
                  </span>
                </div>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl(post.mainImage, 1200)}
                alt={post.mainImage.alt ?? post.title}
                className="w-full object-cover"
              />
            </div>
            {(post.mainImage.caption || post.mainImage.alt) && (
              <figcaption className="mt-2.5 border-b border-[var(--color-border-subtle)] pb-2.5 text-xs leading-relaxed text-[var(--color-dark-gray)] sm:text-[13px]">
                {post.mainImage.caption ?? post.mainImage.alt}
              </figcaption>
            )}
          </figure>
        )}

        {/* Cuerpo del artículo */}
        <div className="editorial-body mt-8 w-full">
          <PortableTextRenderer value={post.body} variant="editorial" />
        </div>

        {/* Ornamento final estilo editorial (NYT / New Yorker) */}
        <div className="mt-8 flex items-center gap-3" aria-hidden="true">
          <span className="inline-block h-2.5 w-2.5 bg-[var(--color-primary-bright)]" />
          <span className="h-px flex-1 bg-[var(--color-border)]" />
        </div>

        {/* Showcase interactivo de Instagram alineado a la columna */}
        {instagramUrl && (
          <InstagramPostShowcase
            instagramUrl={instagramUrl}
            title={post.title}
            context="article"
          />
        )}

        {/* Firma / Bio del Autor al pie del artículo */}
        {post.author && (
          <section
            aria-label="Sobre el autor"
            className="mt-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
          >
            <div className="flex items-start gap-4">
              {post.author.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl(post.author.avatar, 80)}
                  alt={post.author.name}
                  className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-[var(--color-border)]"
                />
              ) : (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-tint)] ring-1 ring-[var(--color-border)]">
                  <User size={20} className="text-[var(--color-primary-bright)]" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-primary-bright)]">
                  Escrito por
                </span>
                <h3 className="mt-0.5 font-editorial text-lg font-bold text-[var(--color-primary-to-white)]">
                  {post.author.name}
                </h3>
                {post.author.role && (
                  <p className="text-xs font-medium text-[var(--color-dark-gray)]">
                    {post.author.role}
                  </p>
                )}
                {post.author.bio && (
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-dark-gray)]">
                    {post.author.bio}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}
      </article>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: ogImageUrl,
            datePublished: post.publishedAt,
            author: {
              "@type": "Organization",
              name: post.author?.name ?? "Star Grow Studio",
            },
            publisher: {
              "@type": "Organization",
              name: "Star Grow Studio",
              logo: {
                "@type": "ImageObject",
                url: "https://stargrowstudio.com/logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://stargrowstudio.com/blog/${slug}`,
            },
          }),
        }}
      />
    </ArticleDetailClient>
  );
}
