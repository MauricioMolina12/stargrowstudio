/**
 * Migración de proyectos legacy al nuevo modelo.
 *
 * Convierte:
 *   serviceLine (string)  → services[] (referencias a Service)
 *   stack (string[])      → stack (referencias a Technology)
 *   clientName (string)   → client (referencia a Client)
 *   summary + description → sections[] (Section Builder)
 *
 * Idempotente: usa createOrReplace + patch.set. Se puede correr N veces.
 *
 * Uso:
 *   node --env-file=.env.local --import tsx scripts/migrate-projects.ts
 */
import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

/* ───────────────────────── Configuración ───────────────────────── */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Faltan variables de entorno.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-10-01", useCdn: false });
const PUBLIC_DIR = path.resolve(process.cwd(), "public");

/* ───────────────────────── Mapeo serviceLine → Service slug(s) ───────────────────────── */

const SERVICE_MAP: Record<string, string[]> = {
  software: ["desarrollo-de-software"],
  design: ["diseno"],
  photography: ["fotografia"],
  consulting: ["consultoria"],
};

/* ───────────────────────── Tecnologías conocidas (para upsert) ───────────────────────── */

const KNOWN_TECHS: Record<string, { name: string; category: string; image?: string }> = {
  react: { name: "React", category: "frontend", image: "/techs/react.png" },
  "next.js": { name: "Next.js", category: "frontend", image: "/techs/next.png" },
  "nextjs": { name: "Next.js", category: "frontend", image: "/techs/next.png" },
  typescript: { name: "TypeScript", category: "frontend", image: "/techs/typescript.png" },
  angular: { name: "Angular", category: "frontend", image: "/techs/angular.png" },
  vue: { name: "Vue", category: "frontend", image: "/techs/vue.png" },
  node: { name: "Node.js", category: "backend" },
  "node.js": { name: "Node.js", category: "backend" },
  python: { name: "Python", category: "backend" },
  mongodb: { name: "MongoDB", category: "backend", image: "/techs/mongo.webp" },
  mysql: { name: "MySQL", category: "backend" },
  postgresql: { name: "PostgreSQL", category: "backend" },
  "sql server": { name: "SQL Server", category: "backend", image: "/techs/sqlserver.png" },
  flutter: { name: "Flutter", category: "mobile", image: "/techs/flutter.png" },
  "react native": { name: "React Native", category: "mobile", image: "/techs/react.png" },
  swift: { name: "Swift", category: "mobile", image: "/techs/swift.png" },
  kotlin: { name: "Kotlin", category: "mobile", image: "/techs/kotlin.png" },
  ionic: { name: "Ionic", category: "mobile", image: "/techs/ionic.png" },
  figma: { name: "Figma", category: "design", image: "/techs/figma.png" },
  "adobe xd": { name: "Adobe XD", category: "design", image: "/techs/Adobe_XD.png" },
  illustrator: { name: "Illustrator", category: "design", image: "/techs/Adobe_Illustrator.png" },
  photoshop: { name: "Photoshop", category: "design", image: "/techs/Adobe_Photoshop.png" },
  sanity: { name: "Sanity", category: "cms" },
  strapi: { name: "Strapi", category: "cms" },
  wordpress: { name: "WordPress", category: "cms" },
  aws: { name: "AWS", category: "cloud" },
  gcp: { name: "Google Cloud", category: "cloud" },
  azure: { name: "Azure", category: "cloud" },
  docker: { name: "Docker", category: "cloud" },
  tailwind: { name: "Tailwind CSS", category: "frontend" },
  "tailwind css": { name: "Tailwind CSS", category: "frontend" },
  sass: { name: "Sass", category: "frontend" },
  html: { name: "HTML5", category: "frontend" },
  css: { name: "CSS3", category: "frontend" },
  javascript: { name: "JavaScript", category: "frontend" },
  jquery: { name: "jQuery", category: "frontend" },
  git: { name: "Git", category: "tools" },
  github: { name: "GitHub", category: "tools" },
};

/* ───────────────────────── Helpers ───────────────────────── */

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const assetCache = new Map<string, string>();
async function uploadImage(publicPath?: string) {
  if (!publicPath) return undefined;
  const filePath = path.join(PUBLIC_DIR, publicPath.replace(/^\//, ""));
  if (assetCache.has(filePath)) return assetCache.get(filePath)!;
  if (!existsSync(filePath)) return undefined;
  const filename = path.basename(filePath);
  const existing = await client.fetch<string | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    { filename }
  );
  if (existing) { assetCache.set(filePath, existing); return existing; }
  const asset = await client.assets.upload("image", await readFile(filePath), { filename });
  assetCache.set(filePath, asset._id);
  console.log(`  ↑ subida: ${publicPath}`);
  return asset._id;
}

/* ───────────────────────── Migración ───────────────────────── */

async function ensureTechnology(name: string): Promise<string | null> {
  const key = name.toLowerCase().trim();
  const known = KNOWN_TECHS[key];
  if (!known) {
    console.warn(`  ⚠ Tecnología desconocida, se omite: "${name}"`);
    return null;
  }
  const slug = slugify(known.name);
  const id = `tech.${slug}`;
  const existing = await client.fetch<string | null>(`*[_id == $id][0]._id`, { id });
  if (existing) return existing;

  const logo = known.image ? await uploadImage(known.image) : undefined;
  const doc = {
    _id: id,
    _type: "technology",
    name: known.name,
    slug: { _type: "slug", current: slug },
    category: known.category,
    ...(logo ? { logo: { _type: "image", asset: { _type: "reference", _ref: logo } } } : {}),
  };
  await client.createOrReplace(doc);
  console.log(`  ✓ Tecnología creada: ${known.name} (${id})`);
  return id;
}

async function ensureClient(name: string): Promise<string | null> {
  if (!name?.trim()) return null;
  const slug = slugify(name);
  const id = `client.${slug}`;
  const existing = await client.fetch<string | null>(`*[_id == $id][0]._id`, { id });
  if (existing) return existing;

  const doc = {
    _id: id,
    _type: "client",
    name: name.trim(),
    slug: { _type: "slug", current: slug },
    status: "active",
  };
  await client.createOrReplace(doc);
  console.log(`  ✓ Cliente creado: ${name.trim()} (${id})`);
  return id;
}

async function getServiceRefs(serviceLine: string | null | undefined) {
  if (!serviceLine) return [];
  const slugs = SERVICE_MAP[serviceLine] ?? [];
  const refs: { _type: "reference"; _ref: string }[] = [];
  for (const slug of slugs) {
    const svc = await client.fetch<{ _id: string } | null>(
      `*[_type == "service" && slug.current == $slug][0]{ _id }`,
      { slug }
    );
    if (svc) {
      refs.push({ _type: "reference", _ref: svc._id });
    }
  }
  return refs;
}

function buildSections(summary: string | null, description: unknown[] | null) {
  const sections: Record<string, unknown>[] = [];

  // Hero section from project cover + summary
  sections.push({
    _type: "section.hero",
    _key: "hero-0",
    heading: "",
    subheading: summary ?? "",
  });

  // Rich text section from legacy description
  if (description && Array.isArray(description) && description.length > 0) {
    sections.push({
      _type: "section.richText",
      _key: "desc-1",
      content: description,
    });
  }

  return sections;
}

async function run() {
  console.log("→ Leyendo proyectos legacy...\n");
  const projects = await client.fetch<
    { _id: string; name: string; serviceLine: string | null; stack: string[] | null; clientName: string | null; summary: string | null; description: unknown[] | null }[]
  >(
    `*[_type == "project"]{ _id, name, serviceLine, "stack": legacyStack, clientName, summary, description }`
  );
  console.log(`  ${projects.length} proyecto(s) encontrado(s).\n`);

  for (const [i, p] of projects.entries()) {
    console.log(`[${i + 1}/${projects.length}] ${p.name}`);

    const patches: Record<string, unknown> = {};
    let needsPatch = false;

    // 1. Convert serviceLine → services[]
    if (p.serviceLine) {
      const refs = await getServiceRefs(p.serviceLine);
      if (refs.length > 0) {
        patches.services = refs;
        needsPatch = true;
        console.log(`  → services: ${refs.length} servicio(s)`);
      }
    }

    // 2. Convert stack[] strings → Technology refs
    if (p.stack && p.stack.length > 0) {
      const techRefs: { _type: "reference"; _ref: string }[] = [];
      for (const techName of p.stack) {
        const ref = await ensureTechnology(techName);
        if (ref) {
          techRefs.push({ _type: "reference", _ref: ref });
        }
      }
      if (techRefs.length > 0) {
        patches.stack = techRefs;
        needsPatch = true;
        console.log(`  → stack: ${techRefs.length} tecnología(s)`);
      }
    }

    // 3. Convert clientName → Client ref
    if (p.clientName) {
      const clientId = await ensureClient(p.clientName);
      if (clientId) {
        patches.client = { _type: "reference", _ref: clientId };
        needsPatch = true;
        console.log(`  → client: ${p.clientName}`);
      }
    }

    // 4. Build sections from summary + description
    const sections = buildSections(p.summary, p.description);
    if (sections.length > 0) {
      patches.sections = sections;
      needsPatch = true;
      console.log(`  → sections: ${sections.length} sección(es)`);
    }

    // 5. Set defaults
    patches.status = "completed";
    patches.visibility = "public";

    if (needsPatch) {
      await client.patch(p._id).set(patches).commit();
      console.log(`  ✓ Actualizado\n`);
    } else {
      console.log(`  − Sin cambios\n`);
    }
  }

  console.log("Migración completada ✅");
}

run().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});