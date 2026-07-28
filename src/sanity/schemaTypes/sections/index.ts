/**
 * Registro central de todos los tipos de sección.
 * Importar y agregar al array `sectionTypes` para registrar un nuevo bloque.
 */
import { sectionHero } from "./hero";
import { sectionExecutiveSummary } from "./executiveSummary";
import { sectionChallenge } from "./challenge";
import { sectionStatistics } from "./statistics";
import { sectionRichText } from "./richText";

// Registro: agrega aquí cada nuevo tipo de sección
export const sectionTypes = [
  sectionHero,
  sectionExecutiveSummary,
  sectionChallenge,
  sectionStatistics,
  sectionRichText,
];