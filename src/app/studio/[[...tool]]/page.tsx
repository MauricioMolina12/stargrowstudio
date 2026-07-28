/**
 * Ruta que monta el Sanity Studio completo en /studio.
 * El editor gestiona blog, proyectos y servicios desde aquí.
 */
import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
