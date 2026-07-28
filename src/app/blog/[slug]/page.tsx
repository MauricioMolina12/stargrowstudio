import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";

import { getPostBySlug, getPostSlugs } from "@/sanity/data/posts";
import { imageUrl } from "@/sanity/image";
import { PortableTextRenderer } from "@/sanity/portableText";

type Post = {
  title: string;
  excerpt?: string;
  mainImage?: SanityImageSource;
  publishedAt?: string;
  body?: PortableTextBlock[];
  author?: { name: string; role?: string; avatar?: SanityImageSource };
  categories?: { title: string; slug: string }[];
  seo?: { metaTitle?: string; metaDescription?: string };
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
  const post = (await getPostBySlug(slug)) as Post | null;
  if (!post) return { title: "Artículo | Star Grow Studio" };
  return {
    title: post.seo?.metaTitle ?? `${post.title} | Star Grow Studio`,
    description: post.seo?.metaDescription ?? post.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = (await getPostBySlug(slug)) as Post | null;

  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-5 py-12 lg:py-16">
      <Link
        href="/blog"
        className="mb-8 flex w-fit items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:underline"
      >
        <ArrowLeft size={16} /> Volver al blog
      </Link>

      <article>
        <header className="mb-8">
          {post.categories && post.categories.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.categories.map((c) => (
                <span
                  key={c.slug}
                  className="rounded-full bg-[var(--color-primary-tint)] px-3 py-1 text-xs font-medium text-[var(--color-primary)]"
                >
                  {c.title}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-3xl font-bold text-[var(--color-primary-to-white)] lg:text-4xl">
            {post.title}
          </h1>
          {post.author && (
            <p className="mt-4 text-sm text-[var(--color-dark-gray)]">
              Por {post.author.name}
              {post.author.role ? ` · ${post.author.role}` : ""}
            </p>
          )}
        </header>

        {post.mainImage && (
          <figure className="mb-8 overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl(post.mainImage, 1200)} alt={post.title} className="w-full" />
          </figure>
        )}

        <div className="text-[var(--color-primary-to-white)]">
          <PortableTextRenderer value={post.body} />
        </div>
      </article>
    </main>
  );
}
