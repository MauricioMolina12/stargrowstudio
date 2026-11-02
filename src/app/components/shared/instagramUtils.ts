/**
 * Mapa de enlaces de Instagram por slug (artículos y proyectos).
 * Sirve como respaldo inmediato y determinista junto al campo `instagramUrl` de Sanity.
 * Archivo puro (sin "use client") para poder usarse tanto en Server Components como en Client Components.
 */
export const INSTAGRAM_LINKS_BY_SLUG: Record<string, string> = {
  "por-que-las-grandes-marcas-usan-logos-sencillos":
    "https://www.instagram.com/p/DSTx5ETjt8V/?vrfl=MTBsdW44bXAzbWh5cQ==",
  "mi-diseno-no-convence-a-nadie-como-solucionarlo":
    "https://www.instagram.com/p/DTOLE5TEpH-/?obrf=dm5pejJwOWNxdng4",
  "que-contenido-subir-para-atraer-mas-publico-b2b":
    "https://www.instagram.com/p/DST6QesDq_C/?mdxt=MWluODk0Zzg4Zngxbw==",
  "4-tips-de-diseno-ux-ui-que-deberias-aplicar-en-tu-producto-digital":
    "https://www.instagram.com/p/DURwu4AjuCX/?dlrf=NzZ1OWUzb3U0eHdm",
  "zuma-branding-identidad-visual":
    "https://www.instagram.com/p/DTeRIXEjutI/?obrf=MTB4N3lydmdtMW8weQ==",
};

export function resolveInstagramUrl(slug?: string, sanityUrl?: string | null): string | undefined {
  if (sanityUrl && sanityUrl.trim().length > 0) return sanityUrl.trim();
  if (slug && INSTAGRAM_LINKS_BY_SLUG[slug]) return INSTAGRAM_LINKS_BY_SLUG[slug];
  return undefined;
}

/**
 * Extrae el shortcode de una URL de Instagram (/p/SHORTCODE o /reel/SHORTCODE)
 * para construir la URL oficial de embed interactivo.
 */
export function extractInstagramShortcode(url: string): { type: "p" | "reel"; code: string } | null {
  const match = url.match(/instagram\.com\/(p|reel)\/([A-Za-z0-9_-]+)/i);
  if (!match) return null;
  return {
    type: match[1].toLowerCase() === "reel" ? "reel" : "p",
    code: match[2],
  };
}

