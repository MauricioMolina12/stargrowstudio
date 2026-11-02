import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Convierte una referencia de imagen de Sanity en un builder de URL.
 * Uso: urlFor(image).width(800).url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/** Atajo: devuelve la URL final como string (o undefined si no hay imagen). */
export function imageUrl(
  source: SanityImageSource | { url?: string; src?: string } | string | undefined | null,
  width?: number
): string | undefined {
  if (!source) return undefined;
  if (typeof source === "string") {
    if (source.startsWith("/") || source.startsWith("http://") || source.startsWith("https://")) {
      return source;
    }
  }
  if (typeof source === "object" && source !== null) {
    const directUrl = (source as { url?: string; src?: string }).url ?? (source as { url?: string; src?: string }).src;
    if (typeof directUrl === "string" && directUrl.length > 0 && !(source as { asset?: unknown }).asset) {
      return directUrl;
    }
  }
  const b = urlFor(source as SanityImageSource).auto("format").fit("max");
  return (width ? b.width(width) : b).url();
}
