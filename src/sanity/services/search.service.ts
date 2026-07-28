import type { SearchIndex, SearchIndexItem, SearchCategory } from "@/sanity/types/search";

// Re-export for backward compatibility with consumers
export type { SearchCategory, SearchIndex };
export type SearchResult = SearchIndexItem;

/**
 * Convierte un item a un string de búsqueda combinando
 * title, description y TODOS los keywords (aplanando arrays).
 */
function searchableText(item: SearchIndexItem): string {
  const parts: string[] = [];
  if (item.title) parts.push(item.title);
  if (item.description) parts.push(item.description);
  for (const k of item.keywords) {
    if (Array.isArray(k)) {
      // Algunos keywords pueden ser arrays anidados
      for (const sub of k) {
        if (typeof sub === "string") parts.push(sub);
      }
    } else if (typeof k === "string") {
      parts.push(k);
    }
  }
  return parts.join(" ").toLowerCase();
}

/** Filtro client-side instantáneo. Busca en title + description + keywords. */
export function filterIndex(index: SearchIndex, q: string): SearchIndexItem[] {
  const trimmed = q.trim().toLowerCase();
  if (!trimmed) return [];

  const results: SearchIndexItem[] = [];
  const seen = new Set<string>();

  // Helper para evitar duplicados
  const addIfMatch = (item: SearchIndexItem, text: string) => {
    if (text.includes(trimmed) && !seen.has(item._id)) {
      seen.add(item._id);
      results.push(item);
    }
  };

  // Filtrar servicios
  for (const item of index.services) {
    addIfMatch(item, searchableText(item));
  }

  // Filtrar proyectos
  for (const item of index.projects) {
    addIfMatch(item, searchableText(item));
  }

  // Filtrar insights
  for (const item of index.insights) {
    addIfMatch(item, searchableText(item));
  }

  return results;
}