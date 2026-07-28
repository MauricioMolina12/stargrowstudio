import { Code, Palette, Camera, Lightbulb, type LucideIcon } from 'lucide-react';

/**
 * Metadata de DISEÑO por línea de servicio (acento, etiqueta, icono, orden).
 *
 * Vive en código —no en Sanity— porque son decisiones de dirección de arte,
 * no contenido editable. El contenido (nombre, descripción, imagen) sí viene
 * de Sanity. Así separamos claramente diseño de contenido.
 */
export type ServiceMeta = {
  /** Color de acento de la línea (da identidad a cada bloque). */
  accent: string;
  /** Etiqueta corta (eyebrow) que categoriza el servicio. */
  eyebrow: string;
  /** Icono representativo de la línea. */
  icon: LucideIcon;
  /** Orden canónico en el bento (0 = hero/núcleo). */
  priority: number;
};

const DEV: ServiceMeta = { accent: '#5656b5', eyebrow: 'Núcleo', icon: Code, priority: 0 };
const DESIGN: ServiceMeta = { accent: '#c026d3', eyebrow: 'Experiencia', icon: Palette, priority: 1 };
const PHOTO: ServiceMeta = { accent: '#ea580c', eyebrow: 'Contenido', icon: Camera, priority: 2 };
const CONSULT: ServiceMeta = { accent: '#0d9488', eyebrow: 'Estrategia', icon: Lightbulb, priority: 3 };

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
