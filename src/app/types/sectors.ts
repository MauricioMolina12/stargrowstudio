export interface Sector {
  _id: string;

  name: string;
  slug: string;

  shortDescription: string;
  highlight?: boolean;

  themeColor?: string;

  coverImage: {
    asset: {
      _id?: string;
      url: string;
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
  };

  seo?: SectorSEO;
}

export interface SectorSEO {
  metaTitle?: string;
  metaDescription?: string;

  ogTitle?: string;
  ogDescription?: string;

  canonicalUrl?: string;
  noIndex?: boolean;

  ogImage?: {
    asset: {
      _id?: string;
      url: string;
    };
  };
}
