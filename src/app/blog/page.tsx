import type { Metadata } from "next";
import { getPosts } from "@/sanity/data/posts";
import type { PostListItem } from "./types";
import { BlogPageClient } from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog | Perspectivas de Transformación Digital | Star Grow Studio",
  description:
    "Explora artículos sobre branding, diseño UX/UI, desarrollo de software y estrategia digital. Perspectivas B2B para líderes que buscan transformar su negocio.",
  openGraph: {
    title: "Blog | Star Grow Studio",
    description:
      "Perspectivas de transformación digital para líderes empresariales. Branding, UX/UI, desarrollo y estrategia.",
    type: "website",
  },
};

export default async function BlogPage() {
  let posts: PostListItem[] = [];
  let error = false;

  try {
    posts = await getPosts();
  } catch {
    error = true;
  }

  // Collect unique categories
  const allCategories = Array.from(
    new Map(
      posts
        .flatMap((p) => p.categories ?? [])
        .map((c) => [c.slug, c])
    ).values()
  );

  return (
    <BlogPageClient
      initialPosts={posts}
      categories={allCategories}
      error={error}
    />
  );
}