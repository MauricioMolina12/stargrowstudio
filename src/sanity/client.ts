import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

/**
 * Cliente de lectura para Server Components.
 *
 * - `useCdn: true` → lecturas rápidas desde el edge CDN (`apicdn.sanity.io`).
 * - `perspective: "published"` → sirve todos los documentos publicados sin
 *   depender de tokens de entorno en Vercel.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
