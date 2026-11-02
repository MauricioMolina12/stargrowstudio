export type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: unknown;
  publishedAt?: string;
  instagramUrl?: string;
  author?: { name: string; slug: string; avatar?: unknown; role?: string };
  categories?: { title: string; slug: string }[];
  /** Estimated reading time in minutes */
  readingTime?: number;
};

export type PostDetail = PostListItem & {
  body?: unknown[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: unknown;
  };
  /** Related posts for CTA section */
  relatedPosts?: PostListItem[];
};

export type BlogFilters = {
  category?: string;
  query?: string;
  sort?: "recent" | "oldest" | "title";
};
