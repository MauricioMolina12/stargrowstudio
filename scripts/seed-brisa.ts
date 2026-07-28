/**
 * Seed: Brisa & Fuego — Caso de Éxito.
 *
 * Crea los registros en Sanity si no existen:
 *   - Client (Brisa & Fuego)
 *   - Project (Brisa & Fuego) con secciones narrativas
 *
 * Idempotente: si el proyecto ya existe, solo parcha sections.
 *
 * Uso:
 *   node --env-file=.env.local --import tsx scripts/seed-brisa.ts
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
  const id = "client.brisa-y-fuego";
  const existing = await client.fetch<{ _id: string } | null>(`*[_id == $id][0]{ _id }`, { id });
  if (existing) { console.log("  − Client ya existe"); return id; }

  await client.create({
    _id: id,
    _type: "client",
    name: "Brisa & Fuego",
    slug: { _type: "slug", current: "brisa-y-fuego" },
    description: "Restaurante de cocina fusión que combina técnicas tradicionales con ingredientes de temporada para ofrecer una experiencia gastronómica única.",
    status: "active",
  });
  console.log("  ✓ Client creado");
  return id;
}

async function seedProject(clientId: string) {
  const projectSlug = "brisa-y-fuego";
  const projectId = `project.${projectSlug}`;

  // Check existing
  const existing = await client.fetch<{ _id: string } | null>(`*[_id == $id][0]{ _id }`, { id: projectId });
  if (existing) {
    console.log("  − Project ya existe. Parcheando sections...");
    // Solo sections, respeta el resto
    await client.patch(projectId).set({ sections: buildSections() }).commit();
    console.log("  ✓ Sections actualizadas");
    return projectId;
  }

  const doc = {
    _id: projectId,
    _type: "project",
    name: "Brisa & Fuego",
    slug: { _type: "slug", current: projectSlug },
    client: { _type: "reference", _ref: clientId },
    tags: ["Branding", "Identidad Visual", "Logo", "Manual de Marca", "Restaurante", "Gastronomía"],
    status: "completed",
    visibility: "public",
    featured: true,
    year: 2025,
    sections: buildSections(),
    deliverables: [
      { _key: "del-1", title: "Branding", description: "Identidad visual completa para el restaurante.", iconName: "Palette" },
      { _key: "del-2", title: "Diseño de Logo", description: "Logotipo principal y variantes.", iconName: "PenTool" },
      { _key: "del-3", title: "Identidad Visual", description: "Paleta cromática, tipografía, iconografía y sistema gráfico.", iconName: "Palette" },
      { _key: "del-4", title: "Manual de Marca", description: "Guía completa de aplicación de la identidad visual.", iconName: "Book" },
    ],
    seo: {
      metaTitle: "Brisa & Fuego | Caso de Éxito en Branding Gastronómico | Star Grow Studio",
      metaDescription: "Construimos la identidad de marca de Brisa & Fuego desde cero: logotipo, paleta cromática, sistema visual y manual de marca para un restaurante de cocina fusión.",
    },
  };

  await client.create(doc);
  console.log("  ✓ Project creado");
  return projectId;
}

function buildSections() {
  return [
    {
      _type: "section.hero",
      _key: "hero-1",
      heading: "Brisa & Fuego",
      subheading: "De una idea gastronómica a una identidad de marca con personalidad, coherencia y vocación de crecimiento.",
    },
    {
      _type: "section.executiveSummary",
      _key: "exec-2",
      content: portableText([
        h2("Resumen Ejecutivo"),
        p("Brisa & Fuego llegó a nosotros con una visión clara pero un lienzo en blanco: crear un restaurante de cocina fusión que combinara técnicas tradicionales con ingredientes de temporada, y necesitaba una identidad de marca que comunicara esa promesa desde el primer contacto."),
        p("Star Grow Studio construyó un sistema de marca completo: desde la conceptualización del universo visual hasta el diseño del logotipo, la paleta cromática, los estilos gráficos y el manual de marca. El resultado es una identidad que no solo distingue a Brisa & Fuego en un mercado gastronómico competitivo, sino que se convierte en un activo estratégico para su crecimiento."),
      ]),
    },
    {
      _type: "section.challenge",
      _key: "challenge-3",
      heading: "El desafío de nacer siendo marca",
      content: portableText([
        p("Construir una marca desde cero es un reto fascinante y complejo. Brisa & Fuego no necesitaba un rediseño ni una actualización; necesitaba una identidad que no existía y que debía comunicar personalidad, confianza y diferenciación desde el día uno."),
        p("El verdadero desafío estratégico no era simplemente crear un logotipo atractivo. Era definir una personalidad visual capaz de transmitir la esencia del restaurante —una cocina que fusiona tradición e innovación— y garantizar que esa personalidad se mantuviera coherente en cada punto de contacto: desde el menú hasta las redes sociales, desde la fachada del local hasta la papelería corporativa."),
        p("En un mercado gastronómico donde la competencia es intensa, la marca no es un adorno: es la primera conversación con el comensal. Brisa & Fuego necesitaba ganar esa conversación."),
      ]),
    },
    {
      _type: "section.richText",
      _key: "sol-4",
      content: portableText([
        h2("La construcción de un universo visual"),
        p("Abordamos el proyecto desde una premisa clara: una marca gastronómica no comunica únicamente con su logotipo; comunica con cada color, cada tipografía, cada textura y cada espacio en blanco."),
        strong("1. Conceptualización"),
        p("El punto de partida fue entender la esencia de Brisa & Fuego: un restaurante que vive en el equilibrio entre la brisa (ligereza, frescura, ingredientes de temporada) y el fuego (técnica, tradición, profundidad de sabor). De ese equilibrio nació toda la identidad."),
        strong("2. Logotipo"),
        p("El logotipo fue diseñado para reflejar esa dualidad: formas orgánicas que evocan movimiento y fluidez, combinadas con una presencia sólida que transmite confianza y calidad. Cada trazo responde a una intención, no a una tendencia estética."),
        strong("3. Paleta cromática"),
        p("Seleccionamos una paleta que evoca los elementos del nombre de la marca: tonos cálidos que remiten al fuego, combinados con matices frescos que sugieren la brisa. El contraste entre ambos polos genera una identidad visual dinámica y memorable."),
        strong("4. Sistema gráfico y manual de marca"),
        p("Más allá del logotipo, construimos un sistema gráfico completo que incluye tipografía corporativa, iconografía, patrones visuales y reglas de aplicación. Todo quedó documentado en un manual de marca que garantiza consistencia en cualquier soporte futuro."),
      ]),
    },
    {
      _type: "section.richText",
      _key: "res-5",
      content: portableText([
        h2("El impacto de una marca con identidad propia"),
        p("La nueva identidad transformó la percepción de Brisa & Fuego incluso antes de su apertura. La marca no es un agregado estético: es la primera impresión que el comensal tiene del restaurante. Una identidad visual coherente y profesional comunica calidad, cuidado y atención al detalle antes de que la primera persona pruebe el primer plato."),
        p("Hoy, Brisa & Fuego cuenta con un sistema de marca que: transmite profesionalismo desde el primer contacto, genera reconocimiento en un mercado competitivo, está preparada para escalar a nuevos canales y soportes, y refleja fielmente la calidad de la experiencia gastronómica."),
        strong("Reflexión final"),
        p("Las marcas memorables no nacen únicamente de elementos visuales. Nacen de una estrategia capaz de convertir una visión empresarial en una experiencia que conecta con las personas. Eso es lo que construimos para Brisa & Fuego: no un logotipo, sino la identidad de un negocio que aspira a ser recordado."),
      ]),
    },
  ];
}

async function run() {
  console.log("\n→ Sembrando Brisa & Fuego...\n");
  const clientId = await seedClient();
  console.log("");
  await seedProject(clientId);
  console.log("\n✅ Brisa & Fuego listo.\n");
}

run().catch((err) => { console.error("Error:", err); process.exit(1); });