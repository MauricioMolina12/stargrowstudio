/**
 * Estimate reading time from Portable Text blocks.
 * Average reading speed: 200 words per minute for Spanish text.
 */
export function estimateReadingTime(blocks?: unknown[]): number {
  if (!blocks || blocks.length === 0) return 1;

  let wordCount = 0;

  for (const block of blocks as { _type?: string; children?: { text?: string }[] }[]) {
    if (block._type === "block" && block.children) {
      for (const child of block.children) {
        if (child.text) {
          wordCount += child.text.split(/\s+/).filter(Boolean).length;
        }
      }
    }
  }

  const minutes = Math.ceil(wordCount / 200);
  return Math.max(1, minutes);
}

/**
 * Format ISO date to a readable Spanish format.
 */
export function formatDate(iso?: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.slice(0, 10).split("-");
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  return `${parseInt(d)} de ${meses[parseInt(m) - 1]} de ${y}`;
}

/**
 * Format ISO date to short format for cards.
 */
export function formatDateShort(iso?: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.slice(0, 10).split("-");
  const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${parseInt(d)} ${meses[parseInt(m) - 1]} ${y}`;
}