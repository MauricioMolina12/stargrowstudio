import { groq } from "next-sanity";

/* ------------------------------- Servicios ------------------------------- */
// La ruta jerárquica (`path`) se computa: para un hijo es "padre/hijo", para un
// padre es su propio slug. Nunca se almacena. Las imágenes se resuelven a URL.

/** Fragmento de ruta reutilizable. */
const PATH = groq`"path": select(defined(parent) => parent->slug.current + "/" + slug.current, slug.current)`;

/** Resumen para el bento del home: solo servicios de primer nivel. */
export const servicesQuery = groq`
  *[_type == "service" && !defined(parent)] | order(order asc, service asc){
    "slug": slug.current,
    ${PATH},
    service,
    "shortDescription": coalesce(shortDescription, subtitle, ""),
    iconName,
    "image": coalesce(mainImage.asset->url, image.asset->url),
    "alt": coalesce(mainImage.alt, alt),
    badge,
    "featured": coalesce(featured, false),
    list
  }
`;

/** Servicios HIJOS para el carrusel del Banner del Home (los padres se excluyen). */
export const childServicesQuery = groq`
  *[_type == "service" && defined(parent)] | order(parent->order asc, order asc, service asc){
    "slug": slug.current,
    "path": parent->slug.current + "/" + slug.current,
    "name": service,
    "shortDescription": coalesce(shortDescription, subtitle, ""),
    // Misma resolución de imagen que la página individual: hero.image || mainImage || legacy
    "image": coalesce(hero.image.asset->url, mainImage.asset->url, image.asset->url),
    "alt": coalesce(hero.image.alt, mainImage.alt, alt),
    "benefits": benefits[]{ title }
  }
`;

/** Mega-menú y footer: padres con sus hijos (referencias reales). */
export const navServicesQuery = groq`
  *[_type == "service" && !defined(parent)] | order(order asc, service asc){
    "slug": slug.current,
    ${PATH},
    service,
    iconName,
    "children": *[_type == "service" && parent._ref == ^._id] | order(order asc, service asc){
      "slug": slug.current,
      "path": ^.slug.current + "/" + slug.current,
      service,
      "shortDescription": coalesce(shortDescription, subtitle),
      iconName,
      badge
    }
  }
`;

/** Detalle completo (landing) buscando por ruta jerárquica.
 *  Solo se solicitan los campos estrictamente usados en ServiceDetailPage.
 *  Se eliminaron campos legacy: title, subtitle, image, alt, list, callAction,
 *  animationTitle, gallery, featured — que NUNCA se renderizan en el detalle.
 */
export const serviceByPathQuery = groq`
  *[_type == "service" && slug.current == $slug && (
    ($parentSlug == null && !defined(parent)) || parent->slug.current == $parentSlug
  )][0]{
    _id,
    "slug": slug.current,
    ${PATH},
    service,
    iconName,
    badge,
    "parent": parent->{ service, "slug": slug.current, "path": slug.current },
    "shortDescription": coalesce(shortDescription, subtitle, ""),
    fullDescription,
    hero{
      heading,
      subheading,
      "image": image.asset->url,
      "imageAlt": image.alt,
      ctas[]{ label, href, style }
    },
    "mainImage": coalesce(mainImage.asset->url, image.asset->url),
    "mainImageAlt": coalesce(mainImage.alt, alt),
    benefits[]{ title, description, iconName },
    features[]{ title, description },
    process[]{ step, title, description },
    faq[]{ question, answer },
    cta{ heading, description, label, href },
    seo{ metaTitle, metaDescription, "ogImage": ogImage.asset->url },
    "children": *[_type == "service" && parent._ref == ^._id] | order(order asc, service asc){
      service,
      "slug": slug.current,
      "path": ^.slug.current + "/" + slug.current,
      "shortDescription": coalesce(shortDescription, subtitle),
      iconName
    },
    "techs": techs[]{ name, "image": image.asset->url },
    "projects": projects[]{ title, description, "image": image.asset->url }
  }
`;

/** Segmentos de ruta de todos los servicios (para generateStaticParams). */
export const serviceSlugsQuery = groq`
  *[_type == "service" && defined(slug.current)]{
    "segments": select(
      defined(parent) => [parent->slug.current, slug.current],
      [slug.current]
    )
  }
`;

/* --------------------------------- Blog ---------------------------------- */
export const postsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    instagramUrl,
    "author": author->{ name, "slug": slug.current, avatar, role },
    "categories": categories[]->{ title, "slug": slug.current },
    // Tiempo estimado de lectura: ~1000 caracteres/minuto (≈200 palabras en español)
    "readingTime": round(length(pt::text(body)) / 1000) + 1
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    instagramUrl,
    body,
    seo,
    "author": author->{ name, "slug": slug.current, avatar, role, bio },
    "categories": categories[]->{ title, "slug": slug.current }
  }
`;

export const postSlugsQuery = groq`*[_type == "post" && defined(slug.current)].slug.current`;

/* ------------------------------ Proyectos -------------------------------- */
/** Listado de proyectos (usa los campos nuevos, fallback a legacy). */
export const projectsQuery = groq`
  *[_type == "project" && visibility == "public"] | order(featured desc, year desc, name asc){
    _id,
    name,
    "slug": slug.current,
    "client": client->{ name, "slug": slug.current, "logo": logo.asset->url },
    "cover": cover.asset->url,
    "summary": coalesce(
      sections[_type == "section.hero"][0].subheading,
      summary,
      ""
    ),
    year,
    featured,
    status,
    visibility,
    "seoLogo": seo.ogImage.asset->url
  }
`;

/** Detalle completo de proyecto con todas las relaciones resueltas. */
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    "client": client->{
      _id,
      name,
      "slug": slug.current,
      "logo": logo.asset->url,
      website,
      "industry": industry->{ name, "slug": slug.current }
    },
    "services": services[]->{
      _id,
      service,
      "slug": slug.current,
      "path": select(
        defined(parent) => parent->slug.current + "/" + slug.current,
        slug.current
      ),
      iconName
    },
    "stack": stack[]->{
      _id,
      name,
      "slug": slug.current,
      "logo": logo.asset->url,
      category,
      officialUrl
    },
    "industry": industry->{ _id, name, "slug": slug.current },
    "relatedPosts": relatedPosts[]->{ _id, title, "slug": slug.current },
    "relatedProjects": relatedProjects[]->{ _id, name, "slug": slug.current },
    tags,
    sections[]{
      _key,
      _type,
      // Hero
      heading,
      subheading,
      "image": image.asset->url,
      ctas[]{ label, href, style },
      // Executive Summary / Challenge / Rich Text
      content,
      // Statistics
      items[]{
        _key,
        metric,
        label,
        description
      }
    },
    "gallery": gallery[]{
      // Si el item es objeto { image: {...} } (nuevo formato) usa image.asset->url
      // Si es image directa (formato legacy, array de imágenes simple) usa asset->url
      "image": coalesce(image.asset->url, asset->url),
      alt,
      title,
      description,
      category
    },
    deliverables[]{ title, description, iconName },
    status,
    visibility,
    year,
    url,
    instagramUrl,
    durationStart,
    durationEnd,
    team[]{ name, role, "image": image.asset->url, linkedin },
    featured,
    "cover": cover.asset->url,
    seo{ metaTitle, metaDescription, "ogImage": ogImage.asset->url },
    // Legacy fields (disponibles hasta migración)
    summary,
    description,
    serviceLine
  }
`;

/** Slugs de todos los proyectos públicos (para generateStaticParams). */
export const projectSlugsQuery = groq`*[_type == "project" && visibility == "public" && defined(slug.current)].slug.current`;

/** Proyectos relacionados a un servicio (consulta inversa). */
export const projectsByServiceQuery = groq`
  *[_type == "project" && references($serviceId) && visibility == "public"] | order(year desc){
    _id,
    name,
    "slug": slug.current,
    "cover": cover.asset->url,
    "client": client->{ name },
    year,
    featured
  }
`;
