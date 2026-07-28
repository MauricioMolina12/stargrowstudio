import type { PortableTextBlock } from "@portabletext/types";

/**
 * Tipos del dominio "servicio", únicos para toda la app.
 * Las imágenes ya llegan resueltas como URL (string) desde GROQ.
 */

export type SeoMeta = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
};

export type HeroCta = {
  label: string;
  href: string;
  style: "primary" | "secondary";
};

export type ServiceHero = {
  heading?: string;
  subheading?: string;
  image?: string;
  imageAlt?: string;
  ctas?: HeroCta[];
};

export type Benefit = { title: string; description?: string; iconName?: string };
export type Feature = { title: string; description?: string };
export type ProcessStep = { step?: number; title: string; description?: string };
export type FaqItem = { question: string; answer?: string };
export type GalleryImage = { url: string; alt?: string };
export type Tech = { name: string; image?: string };
export type ProjectRef = { title: string; description?: string; image?: string };
export type ServiceCta = { heading?: string; description?: string; label?: string; href?: string };

/** Referencia mínima a un servicio. `path` = ruta jerárquica completa. */
export type ServiceRef = {
  service: string;
  slug: string;
  path: string;
};

/** Tarjeta de servicio hijo (dentro de una landing de padre). */
export type ServiceChildCard = ServiceRef & {
  shortDescription: string | null;
  iconName: string | null;
};

/** Resumen para el bento del home y listados de primer nivel. */
export type ServiceSummary = {
  slug: string;
  path: string;
  service: string;
  shortDescription: string;
  iconName: string | null;
  image: string | null;
  alt: string | null;
  badge: string | null;
  featured: boolean;
  list: string[] | null;
};

/** Item hijo en el mega-menú / footer. */
export type ServiceNavChild = {
  slug: string;
  path: string;
  service: string;
  shortDescription: string | null;
  iconName: string | null;
  badge: string | null;
};

/** Grupo (servicio padre) en el mega-menú / footer. */
export type ServiceNavGroup = {
  slug: string;
  path: string;
  service: string;
  iconName: string | null;
  children: ServiceNavChild[];
};

/** Documento completo para la página de detalle (landing). */
export type ServiceDetail = {
  _id: string;
  slug: string;
  path: string;
  service: string;
  iconName: string | null;
  badge: string | null;
  featured: boolean;
  parent: ServiceRef | null;
  shortDescription: string;
  fullDescription: PortableTextBlock[] | null;
  hero: ServiceHero | null;
  mainImage: string | null;
  mainImageAlt: string | null;
  gallery: GalleryImage[] | null;
  benefits: Benefit[] | null;
  features: Feature[] | null;
  process: ProcessStep[] | null;
  faq: FaqItem[] | null;
  cta: ServiceCta | null;
  seo: SeoMeta | null;
  children: ServiceChildCard[] | null;

  // Legado (compat con Banner y secciones actuales de la página de detalle).
  title: { main?: string; second?: string; optional?: string } | null;
  subtitle: string | null;
  image: string | null;
  alt: string | null;
  list: string[] | null;
  callAction: { label: string; actionKey: string }[] | null;
  techs: Tech[] | null;
  projects: ProjectRef[] | null;
  animationTitle: boolean;
};
