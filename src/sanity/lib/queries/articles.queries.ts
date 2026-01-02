export const ALL_ARTICLES = `*[_type == "article"]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  topics[]->{
    _id,
    title,
    "slug": slug.current
  },
  coverImage{
    asset->{
      _id,
      url
    },
    hotspot
  },
  publishedAt,
  status
}`;



export const ARTICLES_BY_TOPIC = `
*[_type == "article" && references(*[_type=="topic" && slug.current == $slug]._id)]{
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  status,
  "topics": topics[]->{
    title,
    slug
  }
} | order(publishedAt desc)
`;

export const ARTICLE_BY_SLUG = `
*[_type == "article" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,    
  excerpt,
  content,
  coverImage,
  publishedAt,
  status,
  topics[]->{               
    _id,
    title,
    "slug": slug.current
  }
}
`;



export const RELATED_ARTICLES = `
*[_type == "article" && slug.current == $slug][0]{
  "related": *[_type == "article" && references(^.topics[]._ref) && slug.current != $slug]{
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    status
  }
}
`;

export const TOPIC_DETAILS = `
*[_type == "topic" && slug == $slug][0]{
  _id,
  title,
  slug,
  description,
  "articles": *[_type=="article" && references(^._id)]{
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt
  }
}
`;
