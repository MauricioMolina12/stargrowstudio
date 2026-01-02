export interface ArticlesType {
  _id: string;
  title: string;
  slug: string | {
    _type?: 'slug';
    current: string;
  };
  excerpt?: string;
  content: string;
  topics: {
    _id: string;
    title: string;
    slug: {
      _type?: 'slug';
      current: string;
    };
  }[];
  coverImage?: {
    _type?: 'image';
    asset: {
      _ref: string;
      _type?: 'reference';
      url?: string;
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
  };
  publishedAt: string;
  status: 'draft' | 'published';
}
