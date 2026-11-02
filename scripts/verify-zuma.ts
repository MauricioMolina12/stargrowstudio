/**
 * Verificación: ZUMA en Sanity.
 * Usa el token de SCRITURA (el mismo que el seed) para diagnosticar
 * si los documentos existen realmente.
 *
 * Uso:
 *   node --env-file=.env.local --import tsx scripts/verify-zuma.ts
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Faltan variables de entorno.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-10-01", useCdn: false });

async function run() {
  console.log("\n→ Verificando ZUMA (write token):");
  console.log(`  projectId=${projectId} dataset=${dataset}\n`);

  const byIdClient = await client.fetch(`*[_id == "client.zuma"][0]{ _id, name, "slug": slug.current, status }`);
  console.log("client.zuma (por _id):", byIdClient ? JSON.stringify(byIdClient) : "NO EXISTE");

  const bySlugClient = await client.fetch(`*[_type == "client" && slug.current == "zuma"][0]{ _id, name, "slug": slug.current, status }`);
  console.log("client zuma (por slug):", bySlugClient ? JSON.stringify(bySlugClient) : "NO EXISTE");

  const byIdProject = await client.fetch(
    `*[_id == "project.zuma-branding-identidad-visual"][0]{
      _id, name, "slug": slug.current, status, visibility, featured,
      "client": client->{ name },
      "sectionsCount": count(sections),
      "deliverablesCount": count(deliverables),
      tags,
      seo { metaTitle, metaDescription }
    }`
  );
  console.log("project.zuma-branding-identidad-visual (por _id):", byIdProject ? JSON.stringify(byIdProject, null, 2) : "NO EXISTE");

  const bySlugProject = await client.fetch(
    `*[_type == "project" && slug.current == "zuma-branding-identidad-visual"][0]{ _id, name, "slug": slug.current }`
  );
  console.log("project zuma (por slug):", bySlugProject ? JSON.stringify(bySlugProject) : "NO EXISTE");

  // Buscar cualquier documento que mencione zuma en cualquiera de los campos
  const anyZuma = await client.fetch(
    `*[ _type in ["client", "project"] && (name match "zuma*" || name match "*ZUMA*") ]{ _id, _type, name }`
  );
  console.log("cualquier doc con nombre que contenga ZUMA:", JSON.stringify(anyZuma, null, 2));
}

run().catch((err) => { console.error("Error:", err); process.exit(1); });