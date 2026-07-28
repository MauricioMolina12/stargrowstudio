
import { client } from "./client";

type FetchParams = {
  query: string;
  params?: Record<string, unknown>;
  /** Tags de Next para revalidación bajo demanda (revalidateTag desde el webhook). */
  tags?: string[];
  /** Segundos de revalidación en background. Por defecto 60. */
  revalidate?: number;
};

/**
 * Helper de fetch para Server Components.
 * Usa el sistema de caché de Next (tags + revalidate) sobre el cliente de Sanity.
 *
 * - `cache()` de React deduplica llamadas dentro del mismo render.
 * - Tags activos → next.revalidate = false para usar webhooks + revalidateTag.
 * - Sin tags     → ISR cada `revalidate` segundos (default 60).
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
  revalidate = 60,
}: FetchParams): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: tags ? false : revalidate,
      tags,
    },
  });
}
