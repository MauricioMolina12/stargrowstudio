import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

/**
 * Cliente de lectura para Server Components.
 *
 * - `useCdn: true`  → las lecturas van al host de CDN `apicdn.sanity.io`, cacheado
 *   en el edge y mucho más rápido/estable que el origen `api.sanity.io`
 *   (este último daba timeouts de 10-17s en algunas redes).
 * - `token`         → se usa SOLO en el servidor para leer contenido publicado.
 *   Nunca debe exponerse al navegador (no usar NEXT_PUBLIC_*). El CDN respeta el
 *   token con `perspective: "published"`.
 * - `perspective: "published"` → nunca sirve borradores en el sitio.
 *
 * Nota: el token con permiso de lectura efectivo es el Editor
 * (SANITY_API_WRITE_TOKEN); el SANITY_API_READ_TOKEN actual no tiene grants de
 * lectura (devuelve 0 docs). Lo ideal a futuro: crear un token Viewer con
 * lectura y usarlo aquí. Se prioriza el que funciona.
 */
const serverReadToken =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: serverReadToken || undefined,
  perspective: "published",
});
