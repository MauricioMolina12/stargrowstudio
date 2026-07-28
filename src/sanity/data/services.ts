import { cache } from "react";
import { sanityFetch } from "@/sanity/fetch";
import {
  servicesQuery,
  serviceByPathQuery,
  serviceSlugsQuery,
  navServicesQuery,
} from "@/sanity/queries";
import type {
  ServiceSummary,
  ServiceNavGroup,
  ServiceDetail,
} from "@/sanity/types/service";

const TAG = "service";

/** Servicios de primer nivel para el bento del home. */
export const getServices = cache(() =>
  sanityFetch<ServiceSummary[]>({ query: servicesQuery, tags: [TAG] })
);

/** Padres con sus hijos para el mega-menú y el footer. */
export const getNavServices = cache(() =>
  sanityFetch<ServiceNavGroup[]>({ query: navServicesQuery, tags: [TAG] })
);

/**
 * Detalle por ruta jerárquica. `segments` viene del catch-all:
 *   ["desarrollo-de-software"]                       → padre
 *   ["desarrollo-de-software", "desarrollo-web"]     → hijo
 * Solo importan el último (hoja) y, si existe, el anterior (padre).
 */
export const getServiceByPath = cache((segments: string[]) => {
  const slug = segments[segments.length - 1];
  const parentSlug = segments.length > 1 ? segments[segments.length - 2] : null;

  return sanityFetch<ServiceDetail | null>({
    query: serviceByPathQuery,
    params: { slug, parentSlug },
    tags: [TAG],
  });
});

/** Segmentos de todas las rutas de servicio (para prerender). */
export const getServiceSlugParams = cache(() =>
  sanityFetch<{ segments: string[] }[]>({
    query: serviceSlugsQuery,
    tags: [TAG],
  })
);
