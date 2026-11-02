/**
 * Modelo de contenido para documentos legales (Política de Privacidad,
 * Términos y Condiciones, etc.). Mantiene el contenido separado de la
 * presentación: las páginas solo declaran datos y `LegalDocument` los renderiza
 * con un diseño consistente con la identidad de Star Grow.
 */

/** Enlaces ligeros dentro de un párrafo: `[texto](url)` */
export type LegalBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] }
  /** Nota destacada (recuadro suave). */
  | { kind: "note"; text: string }
  /** Botón que abre el panel de preferencias de cookies (CookieYes). */
  | { kind: "consentButton"; label: string };

export type LegalSection = {
  /** Id usado para el ancla del índice de contenidos. */
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  /** Etiqueta corta sobre el título (p. ej. "Star Grow Studio"). */
  eyebrow: string;
  title: string;
  intro: string;
  updatedAt: string;
  sections: LegalSection[];
};
