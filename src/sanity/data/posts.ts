import "server-only";

import { sanityFetch } from "@/sanity/fetch";
import { postsQuery, postBySlugQuery, postSlugsQuery } from "@/sanity/queries";
import type { SanityImageSource } from "@sanity/image-url";

export type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: SanityImageSource;
  publishedAt?: string;
  author?: { name: string; slug: string; avatar?: SanityImageSource; role?: string };
  categories?: { title: string; slug: string }[];
};

const TAG = "post";

export function getPosts() {
  return sanityFetch<PostListItem[]>({ query: postsQuery, tags: [TAG] });
}

export function getPostBySlug(slug: string) {
  return sanityFetch<Record<string, unknown> | null>({
    query: postBySlugQuery,
    params: { slug },
    tags: [TAG],
  });
}

export function getPostSlugs() {
  return sanityFetch<string[]>({ query: postSlugsQuery, tags: [TAG] });
}
