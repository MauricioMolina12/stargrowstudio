import { groq } from "next-sanity";

/**
 * Índice de búsqueda: carga TODOS los servicios, proyectos y artículos.
 * Sin filtro `defined(slug.current)` para no excluir documentos con slugs
 * que GROQ considere "no definidos" por alguna razón de esquema.
 * El filtrado real se hace client-side con searchableText().
 */
export const searchIndexQuery = groq`{
  "services": *[_type == "service"]{
    _id,
    "title": coalesce(service, ""),
    "description": coalesce(shortDescription, ""),
    "slug": slug.current,
    "path": "services/" + select(
      defined(parent) => parent->slug.current + "/" + slug.current,
      slug.current
    ),
    iconName,
    "category": "Servicios",
    "keywords": [
      coalesce(service, ""),
      coalesce(shortDescription, ""),
      coalesce(hero.heading, ""),
      coalesce(hero.subheading, ""),
      coalesce(seo.metaTitle, ""),
      coalesce(seo.metaDescription, ""),
      coalesce(benefits[].description, []),
      coalesce(features[].description, []),
      coalesce(process[].description, []),
      coalesce(fullDescription, [])[].children[].text
    ]
  },
  "projects": *[_type == "project"]{
    _id,
    "title": coalesce(name, ""),
    "description": coalesce(summary, ""),
    "slug": slug.current,
    "path": "portafolio/" + slug.current,
    "category": "Casos de éxito",
    "keywords": [
      coalesce(name, ""),
      coalesce(clientName, ""),
      coalesce(summary, ""),
      coalesce(serviceLine, "")
    ]
  },
  "insights": *[_type == "post"]{
    _id,
    "title": coalesce(title, ""),
    "description": coalesce(excerpt, ""),
    "slug": slug.current,
    "path": "blog/" + slug.current,
    "category": "Insights",
    "keywords": [
      coalesce(title, ""),
      coalesce(excerpt, "")
    ]
  }
}`;