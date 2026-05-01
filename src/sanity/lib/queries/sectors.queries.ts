export const SECTORS_QUERY = `
*[_type == "sector" && status == "published"]
| order(order asc) {
  _id,
  name,
  "slug": slug.current,

  shortDescription,
  highlight,
  themeColor,

  problem,
  solution,
  services,

  coverImage {
    asset->{
      _id,
      url
    },
    hotspot
  },

  hoverImage {
    asset->{
      _id,
      url
    },
    hotspot
  },

  seo {
    metaTitle,
    metaDescription
  }
}
`;



export const SECTOR_BY_SLUG_QUERY = `
*[_type == "sector" && slug.current == $slug && status == "published"][0] {
  _id,
  name,
  shortDescription,
  problem,
  solution,
  services,

  coverImage {
    asset->{
      url
    }
  },

  seo
}
`;
