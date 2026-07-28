import type { IndustrySummary } from "./industry";

/** Resumen de cliente para listados y tarjetas. */
export type ClientSummary = {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
  website?: string;
  industry?: IndustrySummary;
};

/** Cliente completo (página de detalle, si existe en el futuro). */
export type ClientDetail = ClientSummary & {
  location?: string;
  description?: string;
  status?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
};