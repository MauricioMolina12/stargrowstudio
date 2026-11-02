import { sanityFetch } from "@/sanity/fetch";
import { postsQuery, postBySlugQuery, postSlugsQuery } from "@/sanity/queries";
import {
  COMO_HACER_UNA_PAGINA_WEB_POST,
  COMO_HACER_UNA_PAGINA_WEB_SLUG,
} from "./comoHacerUnaPaginaWeb";
import type { SanityImageSource } from "@sanity/image-url";

export type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: SanityImageSource;
  publishedAt?: string;
  instagramUrl?: string;
  author?: { name: string; slug: string; avatar?: SanityImageSource; role?: string };
  categories?: { title: string; slug: string }[];
  /** Tiempo estimado de lectura en minutos (calculado en GROQ) */
  readingTime?: number;
};

const TAG = "post";

export async function getPosts(): Promise<PostListItem[]> {
  const posts = await sanityFetch<PostListItem[]>({ query: postsQuery, tags: [TAG] });
  const list = Array.isArray(posts) ? [...posts] : [];
  const existingIdx = list.findIndex((p) => p.slug === COMO_HACER_UNA_PAGINA_WEB_SLUG);
  const { body: _body, seo: _seo, ...summary } = COMO_HACER_UNA_PAGINA_WEB_POST;

  if (existingIdx === -1) {
    list.unshift(summary as unknown as PostListItem);
  } else if (!list[existingIdx].mainImage) {
    list[existingIdx] = {
      ...list[existingIdx],
      mainImage: summary.mainImage as unknown as SanityImageSource,
    };
  }
  return list;
}

export async function getPostBySlug(slug: string) {
  const post = await sanityFetch<Record<string, unknown> | null>({
    query: postBySlugQuery,
    params: { slug },
    tags: [TAG],
  });
  if (slug === COMO_HACER_UNA_PAGINA_WEB_SLUG) {
    if (!post) {
      return COMO_HACER_UNA_PAGINA_WEB_POST as unknown as Record<string, unknown>;
    }
    return {
      ...COMO_HACER_UNA_PAGINA_WEB_POST,
      ...post,
      mainImage: post.mainImage ?? COMO_HACER_UNA_PAGINA_WEB_POST.mainImage,
      body: COMO_HACER_UNA_PAGINA_WEB_POST.body,
    } as unknown as Record<string, unknown>;
  }
  return post;
}

export async function getPostSlugs(): Promise<string[]> {
  const slugs = await sanityFetch<string[]>({ query: postSlugsQuery, tags: [TAG] });
  const list = Array.isArray(slugs) ? [...slugs] : [];
  if (!list.includes(COMO_HACER_UNA_PAGINA_WEB_SLUG)) {
    list.push(COMO_HACER_UNA_PAGINA_WEB_SLUG);
  }
  return list;
}
