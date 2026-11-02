/**
 * Lectura tipada de las variables de entorno de Sanity.
 * Los valores NEXT_PUBLIC_* se exponen al navegador (los usa el Studio y el cliente de lectura).
 * SANITY_API_READ_TOKEN solo debe usarse en el servidor.
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  "Falta la variable de entorno: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "rnp9m2th",
  "Falta la variable de entorno: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

/** Token de solo lectura (opcional). Necesario para contenido borrador / previews. */
export const readToken = process.env.SANITY_API_READ_TOKEN || "";

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}
