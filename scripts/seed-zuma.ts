/**
 * Seed: ZUMA — Caso de Éxito.
 *
 * Crea los registros en Sanity si no existen:
 *   - Client (ZUMA)
 *   - Project (ZUMA) con secciones narrativas de branding
 *
 * Idempotente: si el proyecto ya existe, solo parcha sections.
 *
 * Uso:
 *   node --env-file=.env.local --import tsx scripts/seed-zuma.ts
 *
 * NOTA:
 * - Los campos de imagen (cover, gallery, hero, seo.ogImage) quedan
 *   vacíos/pendientes para subir manualmente los assets de ZUMA.
 * - services, stack, industry, relatedPosts, relatedProjects, team
 *   quedan pendientes de seleccionar referencias reales en Sanity.
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const portableText = (blocks: any[]) =>
  blocks.map((b: any, i: number) => ({
    _type: "block",
    _key: `blk-${i}`,
    style: b.style ?? "normal",
    markDefs: [],
    listItem: b.listItem,
    level: b.level,
    children: (b.children as { text: string; marks?: string[] }[]).map((c, j) => ({
      _type: "span",
      _key: `spn-${i}-${j}`,
      text: c.text,
      marks: c.marks ?? [],
    })),
  }));

const p = (text: string) => ({ children: [{ text }] });
const h2 = (text: string) => ({ style: "h2", children: [{ text }] });
const strong = (text: string) => ({ children: [{ text, marks: ["strong"] }] });

async function seedClient() {
  const id = "client.zuma";
  const existing = await client.fetch<{ _id: string } | null>(`*[_id == $id][0]{ _id }`, { id });
  if (existing) { console.log("  − Client ya existe"); return id; }

  await client.create({
    _id: id,
    _type: "client",
    name: "ZUMA",
    slug: { _type: "slug", current: "zuma" },
    description:
      "Empresa española del sector deportivo especializada en ropa deportiva, calzado, accesorios y equipamiento para deportistas y organizaciones.",
    status: "active",
  });
  console.log("  ✓ Client creado");
  return id;
}

async function seedProject(clientId: string) {
  const projectSlug = "zuma-branding-identidad-visual";
  const projectKey = `project.${projectSlug}`;

  // Check existing
  const existing = await client.fetch<{ _id: string } | null>(`*[_id == $id][0]{ _id }`, { id: projectKey });
  if (existing) {
    console.log("  − Project ya existe. Parcheando sections...");
    await client.patch(projectKey).set({
      sections: buildSections(),
      instagramUrl: "https://www.instagram.com/p/DTeRIXEjutI/?obrf=MTB4N3lydmdtMW8weQ==",
    }).commit();
    console.log("  ✓ Sections actualizadas");
    return projectKey;
  }

  const doc = {
    _id: projectKey,
    _type: "project",
    name: "ZUMA — Branding e identidad visual",
    slug: { _type: "slug", current: projectSlug },
    client: { _type: "reference", _ref: clientId },
    tags: ["Branding", "Identidad visual", "Diseño de marca", "Sports", "Retail deportivo", "ZUMA", "Brand identity"],
    status: "completed",
    visibility: "public",
    featured: true,
    instagramUrl: "https://www.instagram.com/p/DTeRIXEjutI/?obrf=MTB4N3lydmdtMW8weQ==",
    // No inventar año ni duración — pendiente de confirmar
    sections: buildSections(),
    deliverables: [
      {
        _key: "del-1",
        title: "Identidad visual",
        description:
          "Construcción del sistema de identidad visual de ZUMA: concepto de marca, personalidad y dirección de arte.",
        iconName: "Palette",
      },
      {
        _key: "del-2",
        title: "Diseño de logo",
        description:
          "Desarrollo del identificador visual de la marca, preparado para su aplicación en diferentes soportes y tamaños.",
        iconName: "PenTool",
      },
      {
        _key: "del-3",
        title: "Sistema cromático",
        description: "Definición de la paleta de color en blanco y negro y criterios de aplicación en la comunicación.",
        iconName: "Droplets",
      },
      {
        _key: "del-4",
        title: "Sistema tipográfico",
        description: "Incorporación de CMAS PLAY como tipografía principal dentro del sistema de marca.",
        iconName: "Type",
      },
      {
        _key: "del-5",
        title: "Dirección visual de marca",
        description:
          "Criterios visuales de composición, recursos gráficos y uso del sistema para mantener coherencia en la comunicación.",
        iconName: "Eye",
      },
    ],
    seo: {
      metaTitle: "ZUMA — Branding e identidad visual para marca deportiva",
      metaDescription:
        "Construimos la identidad visual de ZUMA: logo, paleta cromática, tipografía CMAS PLAY y un sistema de marca coherente para el sector deportivo español.",
    },
  };

  await client.create(doc);
  console.log("  ✓ Project creado");
  return projectKey;
}

function buildSections() {
  return [
    {
      _type: "section.hero",
      _key: "hero-1",
      heading: "ZUMA — Identidad visual para una marca deportiva",
      subheading:
        "Construimos un sistema de marca coherente para una empresa española del sector deportivo: ropa, calzado, accesorios y equipamiento.",
    },
    {
      _type: "section.executiveSummary",
      _key: "exec-2",
      content: portableText([
        h2("Resumen ejecutivo"),
        p(
          "ZUMA es una empresa española centrada en el sector deportivo, con actividad en ropa deportiva, calzado, accesorios y equipamiento."
        ),
        p(
          "Nuestro equipo acompañó a ZUMA en la construcción de su branding e identidad visual: definimos el posicionamiento de marca, desarrollamos el logo, establecimos el sistema cromático y tipográfico, y construimos una dirección visual coherente que la marca puede aplicar en todos sus puntos de contacto."
        ),
        p(
          "El resultado es un sistema de identidad sólido, pensado para transmitir carácter, profesionalidad y cercanía con el mundo del deporte."
        ),
      ]),
    },
    {
      _type: "section.challenge",
      _key: "challenge-3",
      heading: "El reto: una identidad con carácter",
      content: portableText([
        p(
          "ZUMA necesitaba una identidad visual propia, capaz de diferenciarla en un sector competitivo como el deportivo."
        ),
        p(
          "El reto era construir un sistema de marca que transmitiera solidez y personalidad, fuera reconocible en todos los soportes —desde la tienda online hasta la equipación— y sirviera como base para el crecimiento futuro del negocio."
        ),
        p(
          "Además, la identidad debía reflejar los valores del deporte: energía, rendimiento, disciplina y cercanía, sin perder una estética profesional y atemporal."
        ),
      ]),
    },
    {
      _type: "section.richText",
      _key: "enfoque-4",
      content: portableText([
        h2("Un enfoque estratégico y visual"),
        p(
          "Abordamos el proyecto desde una doble perspectiva: estratégica y visual. Primero analizamos el sector, el público objetivo y el posicionamiento deseado. Después definimos la personalidad de la marca y traducimos esa personalidad a un sistema visual completo."
        ),
        p(
          "La dirección de arte se apoyó en una base cromática de blanco y negro, apostando por la limpieza, el contraste y la versatilidad. Este planteamiento permite que la identidad funcione tanto en entornos digitales como físicos, y que destaque junto a marcas con paletas más saturadas."
        ),
      ]),
    },
    {
      _type: "section.richText",
      _key: "identidad-5",
      content: portableText([
        h2("Una identidad construida para durar"),
        p(
          "Desarrollamos el logo de ZUMA como pieza central del sistema: un identificador claro, memorable y con presencia deportiva. A partir de ahí, construimos el resto de los elementos de marca para que convivieran en armonía: color, tipografía, recursos gráficos y criterios de composición."
        ),
        p(
          "El objetivo no era solo crear un logo atractivo, sino un ecosistema visual completo que cualquier equipo —interno o externo— pueda aplicar con coherencia."
        ),
      ]),
    },
    {
      _type: "section.richText",
      _key: "sistema-6",
      content: portableText([
        h2("El sistema visual"),
        p("El sistema visual de ZUMA se apoya en cuatro pilares:"),
        strong("Logo"),
        p("Identificador principal de la marca, diseñado para funcionar en distintos tamaños y soportes."),
        strong("Sistema cromático"),
        p("Paleta en blanco y negro, versátil y de alto contraste."),
        strong("Tipografía"),
        p("CMAS PLAY como tipografía principal, aportando una personalidad propia y diferenciada al sistema."),
        strong("Recursos gráficos"),
        p(
          "Dirección de arte y recursos visuales que garantizan consistencia en comunicaciones, packaging y puntos de venta."
        ),
        p(
          "Todos los elementos quedan recogidos bajo criterios de aplicación que protegen la coherencia de la marca."
        ),
      ]),
    },
    {
      _type: "section.richText",
      _key: "resultado-7",
      content: portableText([
        h2("Una base sólida para crecer"),
        p(
          "ZUMA cuenta ahora con una identidad visual coherente y profesional, lista para aplicarse en todos sus puntos de contacto: tienda, e-commerce, comunicación, packaging y presencia de marca."
        ),
        p(
          "La nueva identidad refuerza el posicionamiento de ZUMA en el sector deportivo y proporciona una base visual consistente sobre la que construir futuras colecciones, campañas y líneas de producto."
        ),
      ]),
    },
    {
      _type: "section.richText",
      _key: "cierre-8",
      content: portableText([
        h2("El valor de una identidad visual sólida"),
        p(
          "Una marca deportiva no compite solo por producto: compite también por percepción. Una identidad visual bien construida genera confianza, diferencia y recuerdo."
        ),
        p(
          "El caso de ZUMA demuestra cómo el branding y la identidad visual —bien planteados desde la estrategia— pueden dotar a una empresa de un activo duradero: un sistema de marca capaz de acompañarla en su crecimiento."
        ),
      ]),
    },
  ];
}

async function run() {
  console.log("\n→ Sembrando ZUMA...\n");
  const clientId = await seedClient();
  console.log("");
  await seedProject(clientId);
  console.log("\n✅ ZUMA listo.\n");
}

run().catch((err) => { console.error("Error:", err); process.exit(1); });