'use server';

import { client } from "@/sanity/client";
import { searchIndexQuery } from "@/sanity/queries/search.groq";
import type { SearchIndex } from "@/sanity/types/search";

/**
 * Server Action que carga el índice de búsqueda desde Sanity.
 * Se ejecuta exclusivamente en el servidor, donde existe el token SANITY_API_WRITE_TOKEN.
 * El resultado se cachea en el servidor con el sistema de caché de Next.js.
 */
export async function fetchSearchIndex(): Promise<SearchIndex> {
  const data = await client.fetch<SearchIndex>(searchIndexQuery, {}, {
    next: {
      tags: ["search-index"],
      revalidate: 60, // Revalidar cada 60 segundos
    },
  });
  return data;
}