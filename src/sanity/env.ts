/**
 * Configuración de Sanity para Star Grow Studio (rnp9m2th / production).
 */

export const apiVersion = "2024-10-01";

export const dataset = "production";

export const projectId = "rnp9m2th";

/** Token de solo lectura (opcional). */
export const readToken = process.env.SANITY_API_READ_TOKEN || "";
