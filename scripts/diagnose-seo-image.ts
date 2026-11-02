/**
 * Diagnóstico: ¿por qué no aparece la imagen de SEO (ogImage) en las cards
 * de "Casos de éxito" del home?
 *
 * Reproduce la query real del home (projectsQuery de src/sanity/queries.ts)
 * y compara CDN vs API origen, mostrando seoLogo y cover de cada proyecto.
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
  "cover": cover.asset->url,
  "seoLogo": seo.ogImage.asset->url,
  "seoOgRaw": seo.ogImage,
  year,
  featured,
  status
}`;

const clientCdn = createClient({
  projectId, dataset, token, apiVersion: "2024-10-01", useCdn: true, perspective: "published",
});

const clientOrigin = createClient({
  projectId, dataset, token, apiVersion: "2024-10-01", useCdn: false, perspective: "published",
});

function show(label: string, rows: any[]) {
  console.log(`\n${label} (${rows.length} proyectos):`);
  for (const p of rows) {
    console.log(`  - ${p.name} (${p.slug})`);
    console.log(`      cover   = ${p.cover ?? "∅ (no definido)"}`);
    console.log(`      seoLogo = ${p.seoLogo ?? "∅ (no definido)"}`);
    console.log(`      ogImage raw = ${JSON.stringify(p.seoOgRaw)?.slice(0, 160) ?? "∅"}`);
  }
}

async function run() {
  const viaCdn = await clientCdn.fetch<any[]>(PROJECTS_QUERY);
  const viaOrigin = await clientOrigin.fetch<any[]>(PROJECTS_QUERY);

  show("① Vía CDN (useCdn: true) — como el sitio web", viaCdn);
  show("② Vía API origen (useCdn: false) — estado real", viaOrigin);

  console.log("\n③ Resumen:");
  const noImgOrigin = viaOrigin.filter((p) => !p.seoLogo && !p.cover);
  const noImgCdn = viaCdn.filter((p) => !p.seoLogo && !p.cover);
  console.log("  Proyectos sin imagen en ORIGEN (seoLogo y cover vacíos):", noImgOrigin.length);
  console.log("    ->", noImgOrigin.map((p) => p.slug).join(", ") || "(ninguno)");
  console.log("  Proyectos sin imagen en CDN (lo que ve el home):", noImgCdn.length);
  console.log("    ->", noImgCdn.map((p) => p.slug).join(", ") || "(ninguno)");
}

run().catch((err) => { console.error("Error:", err); process.exit(1); });
