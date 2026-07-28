import createImageUrlBuilder, {
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
  source: SanityImageSource | undefined | null,
  width?: number
): string | undefined {
  if (!source) return undefined;
  const b = urlFor(source).auto("format").fit("max");
  return (width ? b.width(width) : b).url();
}
