import { Code, Palette, Camera, Lightbulb, type LucideIcon } from 'lucide-react';

/**
 * Metadata de DISEÑO por línea de servicio (acento, etiqueta, icono, orden).
 *
 * Vive en código —no en Sanity— porque son decisiones de dirección de arte,
 * no contenido editable. El contenido (nombre, descripción, imagen) sí viene
 * de Sanity. Así separamos claramente diseño de contenido.
 */
/**
 * Paleta pastel de Star Grow: matices suaves, desaturados y elegantes,
 * armonizados con el color principal del sitio (#5656b5).
 *
 * - `accent`: tono medio pastel del matiz de la línea. Se usa para texto,
 *   iconos y acentos pequeños (contraste ≥ 4:1 sobre blanco).
 * - `soft`: tinte muy claro del mismo matiz. Se usa como fondo pastel de la
 *   portada de la card (contraste del icono sobre él ≥ 3:1).
 */
export type ServiceMeta = {
  /** Color de acento de la línea (texto, iconos y acentos pequeños). */
  accent: string;
  /** Tinte pastel claro del mismo matiz (fondo de la portada de la card). */
  soft: string;
  /** Etiqueta corta (eyebrow) que categoriza el servicio. */
  eyebrow: string;
  /** Icono representativo de la línea. */
  icon: LucideIcon;
  /** Orden canónico en el bento (0 = hero/núcleo). */
  priority: number;
};

const DEV: ServiceMeta = { accent: 'var(--sg-dev)', soft: 'var(--sg-dev-soft)', eyebrow: 'Núcleo', icon: Code, priority: 0 };
const DESIGN: ServiceMeta = { accent: 'var(--sg-design)', soft: 'var(--sg-design-soft)', eyebrow: 'Experiencia', icon: Palette, priority: 1 };
const PHOTO: ServiceMeta = { accent: 'var(--sg-photo)', soft: 'var(--sg-photo-soft)', eyebrow: 'Contenido', icon: Camera, priority: 2 };
const CONSULT: ServiceMeta = { accent: 'var(--sg-consult)', soft: 'var(--sg-consult-soft)', eyebrow: 'Estrategia', icon: Lightbulb, priority: 3 };

/**
 * Resuelve la metadata por palabra clave del slug, no por coincidencia exacta,
 * para tolerar variaciones (`diseno-ux-ui`, `diseno-uiux`, etc.).
 */
export function resolveServiceMeta(slug: string): ServiceMeta {
  const s = (slug ?? '').toLowerCase();
  if (s.includes('desarrollo') || s.includes('software') || s.includes('dev')) return DEV;
  if (s.includes('dise')) return DESIGN; // diseño / diseno
  if (s.includes('foto')) return PHOTO;
  if (s.includes('consul') || s.includes('asesor') || s.includes('estrateg')) return CONSULT;
  return DEV;
}
