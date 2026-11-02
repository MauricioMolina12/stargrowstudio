/**
 * Diagnóstico: ¿por qué no aparece ZUMA en el frontend?
 *
 * Reproduce EXACTAMENTE la configuración de src/sanity/client.ts:
 * - useCdn: true (CDN apicdn.sanity.io)
 * - token: SANITY_API_WRITE_TOKEN (el que funciona)
 * - perspective: "published"
 *
 * Ejecuta la query real projectsQuery (la del portafolio) y compara
 * contra el host de API origen (useCdn: false) para detectar si es
 * un problema de caché del CDN o de la query.
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Faltan variables de entorno.");
  process.exit(1);
}

const PROJECTS_QUERY = `*[_type == "project" && visibility == "public"] | order(featured desc, year desc, name asc){
  _id,
  name,
  "slug": slug.current,
  "client": client->{ name, "slug": slug.current, "logo": logo.asset->url },
  "cover": cover.asset->url,
  "summary": coalesce(
    sections[_type == "section.hero"][0].subheading,
    summary,
    ""
  ),
  year,
  featured,
  status,
  visibility
}`;

const clientCdn = createClient({
  projectId, dataset, token, apiVersion: "2024-10-01", useCdn: true, perspective: "published",
});

const clientOrigin = createClient({
  projectId, dataset, token, apiVersion: "2024-10-01", useCdn: false, perspective: "published",
});

async function run() {
  console.log("\n→ Diagnóstico ZUMA en frontend\n");

  console.log("① projectsQuery vía CDN (useCdn: true) — como el sitio web:");
  const viaCdn = await clientCdn.fetch<unknown[]>(PROJECTS_QUERY);
  console.log("  Total proyectos:", viaCdn.length);
  viaCdn.forEach((p: any) => console.log(`   - ${p.name} (${p.slug}) featured=${p.featured}`));

  console.log("\n② projectsQuery vía API origen (useCdn: false) — verdadero estado:");
  const viaOrigin = await clientOrigin.fetch<unknown[]>(PROJECTS_QUERY);
  console.log("  Total proyectos:", viaOrigin.length);
  viaOrigin.forEach((p: any) => console.log(`   - ${p.name} (${p.slug}) featured=${p.featured}`));

  console.log("\n③ ¿Aparece ZUMA en CDN?:", viaCdn.some((p: any) => p.slug === "zuma-branding-identidad-visual") ? "SÍ" : "NO");
  console.log("  ¿Aparece ZUMA en origen?:", viaOrigin.some((p: any) => p.slug === "zuma-branding-identidad-visual") ? "SÍ" : "NO");
}

run().catch((err) => { console.error("Error:", err); process.exit(1); });