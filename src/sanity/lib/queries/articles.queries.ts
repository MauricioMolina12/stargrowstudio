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


export const RELATED_ARTICLES_QUERY = `
*[
  _type == "article"
  && status == "published"
  && _id != $id
  && count(topics[@._ref in $topics]) > 0
]
| order(publishedAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt,
  "topics": topics[]->{
    _id,
    title,
    "slug": slug.current
  }
}
`;

export const LAST_ARTICLES = `*[_type == "article" && status == "published"] 
| order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  coverImage,
  topics[]->{
    _id,
    title
  }
}[0...5]`;



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


export const SEARCH_ARTICLES = `
*[
  _type == "article"
  && status == "published"
  && (
    title match $search
    || excerpt match $search
    || pt::text(content) match $search
    || $search in topics[]->title
  )
]
| order(_score desc, publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  coverImage{
    asset->{
      _id,
      url
    }
  },
  "topics": topics[]->{
    _id,
    title,
    "slug": slug.current
  }
}
`;
