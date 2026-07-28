
import { createClient } from "@sanity/client";
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

/* ───────────────────────── Helpers ───────────────────────── */

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const ref = (type: string, id: string) => ({ _type: "reference" as const, _ref: id });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const portableText = (blocks: any[]) =>
  blocks.map((b, i) => ({
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

/* ───────────────────────── Seed: Technologies ───────────────────────── */

const TECH_SEED = [
  { name: "Next.js", slug: "next-js", category: "frontend" },
  { name: "React", slug: "react", category: "frontend" },
  { name: "TypeScript", slug: "typescript", category: "frontend" },
  { name: "Sanity", slug: "sanity", category: "cms" },
  { name: "Tailwind CSS", slug: "tailwind-css", category: "frontend" },
  { name: "Vercel", slug: "vercel", category: "cloud" },
  { name: "Figma", slug: "figma", category: "design" },
];

async function seedTechnologies() {
  const ids: string[] = [];
  for (const t of TECH_SEED) {
    const id = `tech.${t.slug}`;
    await client.createOrReplace({
      _id: id,
      _type: "technology",
      name: t.name,
      slug: { _type: "slug", current: t.slug },
      category: t.category,
      order: ids.length,
    });
    ids.push(id);
    console.log(`  ✓ Technology: ${t.name}`);
  }
  return ids;
}

/* ───────────────────────── Seed: Industry ───────────────────────── */

async function seedIndustry() {
  const id = "industry.multiservicios";
  await client.createOrReplace({
    _id: id,
    _type: "industry",
    name: "Multiservicios",
    slug: { _type: "slug", current: "multiservicios" },
    description: "Empresas que ofrecen servicios integrales a hogares y empresas.",
    order: 1,
  });
  console.log("  ✓ Industry: Multiservicios");
  return id;
}

/* ───────────────────────── Seed: Client ───────────────────────── */

async function seedClient() {
  const id = "client.opera-multiservicios";
  await client.createOrReplace({
    _id: id,
    _type: "client",
    name: "Opera Multiservicios",
    slug: { _type: "slug", current: "opera-multiservicios" },
    description:
      "Empresa multiservicios con amplia trayectoria ofreciendo soluciones integrales para hogares y empresas, desde mantenimiento y reparaciones hasta proyectos de mayor envergadura.",
    status: "active",
  });
  console.log("  ✓ Client: Opera Multiservicios");
  return id;
}

/* ───────────────────────── Get Service Refs ───────────────────────── */

async function getServiceRefs(slugs: string[]) {
  const refs: { _type: "reference"; _ref: string }[] = [];
  for (const slug of slugs) {
    const svc = await client.fetch<{ _id: string } | null>(
      `*[_type == "service" && slug.current == $slug][0]{ _id }`,
      { slug }
    );
    if (svc) refs.push({ _type: "reference", _ref: svc._id });
  }
  return refs;
}

/* ───────────────────────── Seed: Project Opera ───────────────────────── */

async function seedProject(clientId: string, techIds: string[], industryId: string) {
  const serviceRefs = await getServiceRefs([
    "desarrollo-de-software",
    "desarrollo-web",
    "diseno",
    "ui",
    "ux",
    "branding",
    "consultoria",
  ]);

  const projectId = "project.opera-multiservicios";

  const doc = {
    _id: projectId,
    _type: "project",
    name: "Opera Multiservicios",
    slug: { _type: "slug", current: "opera-multiservicios" },
    client: { _type: "reference", _ref: clientId },
    services: serviceRefs,
    stack: techIds.map((id) => ({ _type: "reference", _ref: id })),
    industry: { _type: "reference", _ref: industryId },
    tags: [
      "Branding",
      "Diseño Web",
      "Headless CMS",
      "SEO",
      "Transformación Digital",
      "Ecosistema Digital",
      "Sitio Corporativo",
      "Optimización",
    ],
    status: "completed",
    visibility: "public",
    featured: true,
    year: 2025,
    durationStart: "2024-11-01",
    durationEnd: "2025-04-30",
    team: [
      {
        _key: "pm-1",
        name: "Mauricio Molina",
        role: "pm",
      },
      {
        _key: "ux-1",
        name: "Mauricio Molina",
        role: "ux",
      },
      {
        _key: "ui-1",
        name: "Mauricio Molina",
        role: "ui",
      },
      {
        _key: "front-1",
        name: "Mauricio Molina",
        role: "frontend",
      },
      {
        _key: "brand-1",
        name: "Mauricio Molina",
        role: "branding",
      },
    ],
    deliverables: [
      { _key: "del-1", title: "Branding", description: "Identidad visual completa de la marca Opera Multiservicios.", iconName: "Palette" },
      { _key: "del-2", title: "Diseño de Logo", description: "Logotipo profesional con variantes para diferentes usos y fondos.", iconName: "PenTool" },
      { _key: "del-3", title: "Manual de Marca", description: "Guía completa de uso de la identidad visual con especificaciones técnicas.", iconName: "Book" },
      { _key: "del-4", title: "Propuesta Comercial", description: "Documento de presentación comercial digital alineado con la nueva identidad.", iconName: "FileText" },
      { _key: "del-5", title: "Diseño UI/UX", description: "Interfaces modernas con enfoque en usabilidad y experiencia de usuario.", iconName: "LayoutTemplate" },
      { _key: "del-6", title: "Arquitectura de Información", description: "Estructura de contenido clara y escalable para facilitar la navegación.", iconName: "Sitemap" },
      { _key: "del-7", title: "Desarrollo Web", description: "Sitio web corporativo con Next.js, TypeScript y Tailwind CSS.", iconName: "Code" },
      { _key: "del-8", title: "Headless CMS", description: "Panel de administración con Sanity CMS para gestión autónoma de contenido.", iconName: "Database" },
      { _key: "del-9", title: "SEO Técnico", description: "Optimización completa para motores de búsqueda: estructura, metadatos y velocidad.", iconName: "Search" },
      { _key: "del-10", title: "Optimización de Rendimiento", description: "Core Web Vitals optimizados, carga rápida y experiencia fluida en todos los dispositivos.", iconName: "Gauge" },
      { _key: "del-11", title: "Responsive Design", description: "Experiencia consistente y optimizada en móvil, tablet y escritorio.", iconName: "MonitorSmartphone" },
      { _key: "del-12", title: "Infraestructura y Despliegue", description: "Arquitectura cloud escalable con despliegue continuo y monitoreo.", iconName: "Cloud" },
      { _key: "del-13", title: "Consultoría Tecnológica", description: "Asesoramiento estratégico para la toma de decisiones tecnológicas.", iconName: "Lightbulb" },
      { _key: "del-14", title: "Capacitación", description: "Entrenamiento al equipo de Opera para la gestión autónoma del sitio y el CMS.", iconName: "GraduationCap" },
    ],

    sections: [
      /* ── 1. Hero ── */
      {
        _type: "section.hero",
        _key: "hero-1",
        heading: "Opera Multiservicios",
        subheading:
          "De una presencia digital dispersa a un ecosistema digital unificado. Branding, diseño, desarrollo y estrategia en un solo proyecto integral.",
      },

      /* ── 2. Resumen Ejecutivo ── */
      {
        _type: "section.executiveSummary",
        _key: "exec-2",
        content: portableText([
          h2("Resumen Ejecutivo"),
          p("Opera Multiservicios llegó a nosotros con un desafío claro pero complejo: necesitaba una transformación digital completa. La empresa contaba con años de experiencia y una sólida reputación en el sector multiservicios, pero su presencia digital no reflejaba la calidad ni la amplitud de sus servicios."),
          p("Star Grow Studio asumió el reto de construir no solo un sitio web, sino un ecosistema digital completo: desde la identidad de marca hasta la infraestructura tecnológica, pasando por el diseño de experiencia, el desarrollo frontend, la implementación de un CMS headless y la optimización para motores de búsqueda."),
          p("El resultado es una plataforma digital profesional, moderna y escalable que posiciona a Opera Multiservicios como un referente en su sector y está preparada para acompañar su crecimiento en los próximos años."),
        ]),
      },

      /* ── 3. Contexto del Cliente ── */
      {
        _type: "section.richText",
        _key: "ctx-3",
        content: portableText([
          h2("Contexto del Cliente"),
          p("Opera Multiservicios es una empresa con amplia trayectoria ofreciendo soluciones integrales para hogares y empresas. Su portafolio abarca desde servicios de mantenimiento y reparaciones hasta proyectos de mayor envergadura, lo que requiere una comunicación clara y una estructura digital que permita a sus clientes encontrar exactamente lo que necesitan."),
          p("Sin embargo, su presencia digital estaba fragmentada: una marca sin consolidar, contenidos dispersos y una arquitectura de información que no reflejaba la verdadera dimensión de su oferta. La página web existente no comunicaba profesionalismo y dificultaba que los clientes potenciales entendieran la amplitud de servicios disponibles."),
          p("Opera necesitaba algo más que un rediseño. Necesitaba una transformación digital que iniciara desde los cimientos mismos de su identidad como empresa."),
        ]),
      },

      /* ── 4. El Reto ── */
      {
        _type: "section.challenge",
        _key: "challenge-4",
        heading: "El Reto",
        content: portableText([
          p("El principal desafío fue la magnitud del proyecto. No se trataba únicamente de diseñar un sitio web atractivo. Había que construir una identidad de marca donde no existía, estructurar un catálogo de servicios amplio y diverso, y crear una plataforma digital que pudiera administrarse de forma autónoma sin conocimientos técnicos avanzados."),
          p("Además, la empresa necesitaba resultados rápidos sin sacrificar la calidad. El sitio debía estar listo en un plazo ajustado, compitiendo con proyectos de mayor duración pero manteniendo el mismo nivel de excelencia."),
          p("A esto se sumaba la necesidad de sentar bases tecnológicas sólidas que permitieran escalar en el futuro: agregar nuevos servicios, integrar herramientas externas y crecer sin tener que reescribir el código desde cero."),
        ]),
      },

      /* ── 5. Objetivos ── */
      {
        _type: "section.richText",
        _key: "obj-5",
        content: portableText([
          h2("Objetivos del Proyecto"),
          p("El proyecto se estructuró en torno a cinco objetivos estratégicos:"),
          {
            _type: "block",
            _key: "list-1",
            style: "normal",
            markDefs: [],
            children: [
              { _type: "span", _key: "l1", text: "Crear una identidad de marca sólida y profesional que refleje la calidad de los servicios de Opera.", marks: [] },
            ],
            listItem: "bullet",
            level: 1,
          },
          {
            _type: "block",
            _key: "list-2",
            style: "normal",
            markDefs: [],
            children: [
              { _type: "span", _key: "l2", text: "Diseñar una experiencia digital clara que permita a los clientes encontrar y contratar servicios de forma intuitiva.", marks: [] },
            ],
            listItem: "bullet",
            level: 1,
          },
          {
            _type: "block",
            _key: "list-3",
            style: "normal",
            markDefs: [],
            children: [
              { _type: "span", _key: "l3", text: "Desarrollar una plataforma web rápida, segura y optimizada para motores de búsqueda.", marks: [] },
            ],
            listItem: "bullet",
            level: 1,
          },
          {
            _type: "block",
            _key: "list-4",
            style: "normal",
            markDefs: [],
            children: [
              { _type: "span", _key: "l4", text: "Implementar un CMS headless que permita a Opera gestionar su contenido de forma autónoma.", marks: [] },
            ],
            listItem: "bullet",
            level: 1,
          },
          {
            _type: "block",
            _key: "list-5",
            style: "normal",
            markDefs: [],
            children: [
              { _type: "span", _key: "l5", text: "Sentar una arquitectura tecnológica escalable para el crecimiento futuro de la empresa.", marks: [] },
            ],
            listItem: "bullet",
            level: 1,
          },
        ]),
      },

      /* ── 6. Estrategia ── */
      {
        _type: "section.richText",
        _key: "strat-6",
        content: portableText([
          h2("Estrategia"),
          p("Nuestra estrategia se basó en un enfoque integral que abarcó tres dimensiones simultáneamente:"),
          strong("1. Identidad como base"),
          p("Antes de escribir una línea de código, trabajamos en la definición de la marca: logotipo, paleta de color, tipografía, tono de comunicación. Todo el diseño digital posterior se construyó sobre estos cimientos, garantizando coherencia en cada punto de contacto."),
          strong("2. Contenido como estructura"),
          p("En lugar de diseñar páginas bonitas y luego llenarlas de contenido, primero definimos la arquitectura de información: qué servicios ofrecer, cómo organizarlos, qué prioridad darle a cada sección. El diseño llegó después, para envolver una estructura ya sólida."),
          strong("3. Tecnología como habilitador"),
          p("Seleccionamos un stack tecnológico moderno y probado: Next.js para el frontend, Sanity como CMS headless, Tailwind CSS para el diseño, y Vercel para la infraestructura. Cada decisión técnica respondía a un objetivo claro: rendimiento, escalabilidad y facilidad de mantenimiento."),
        ]),
      },

      /* ── 7. Solución ── */
      {
        _type: "section.richText",
        _key: "sol-7",
        content: portableText([
          h2("Solución"),
          p("Construimos una plataforma digital completa que integra:"),
          strong("Identidad visual"),
          p("Un sistema de marca completo que incluye logotipo principal y variantes, paleta de color, tipografía corporativa, iconografía y guías de uso. Todo documentado en un manual de marca para garantizar consistencia en futuras aplicaciones."),
          strong("Sitio web corporativo"),
          p("Desarrollado con Next.js y TypeScript, el sitio ofrece una experiencia rápida y fluida en todos los dispositivos. La navegación está diseñada para que los visitantes encuentren rápidamente el servicio que necesitan, con llamadas a la acción claras en cada sección."),
          strong("CMS headless con Sanity"),
          p("El equipo de Opera puede gestionar todo el contenido del sitio —textos, imágenes, servicios, metadatos SEO— sin depender de conocimientos técnicos. Las actualizaciones se reflejan en tiempo real gracias a la integración con Next.js."),
          strong("Optimización SEO y rendimiento"),
          p("El sitio está optimizado para cumplir con los estándares Core Web Vitals, con carga rápida, imágenes optimizadas, marcado semántico y datos estructurados. Esto sienta las bases para un buen posicionamiento en buscadores."),
          strong("Infraestructura escalable"),
          p("El proyecto está desplegado en Vercel con despliegue continuo desde GitHub. Esto significa que cualquier actualización del código o del contenido se publica de forma automática y segura, sin tiempos de inactividad."),
        ]),
      },

      /* ── 8. Resultados Obtenidos ── */
      {
        _type: "section.statistics",
        _key: "res-8",
        heading: "Resultados Obtenidos",
        items: [
          {
            _key: "stat-1",
            metric: "Completo",
            label: "Ecosistema Digital",
            description: "Desde la identidad de marca hasta la infraestructura tecnológica, todo en un solo proyecto integral.",
          },
          {
            _key: "stat-2",
            metric: "Autónomo",
            label: "CMS Headless",
            description: "El equipo de Opera gestiona su contenido sin dependencia técnica de terceros.",
          },
          {
            _key: "stat-3",
            metric: "Optimizado",
            label: "Rendimiento Web",
            description: "Cumplimiento de estándares Core Web Vitals para una experiencia rápida y fluida.",
          },
          {
            _key: "stat-4",
            metric: "Preparado",
            label: "Crecimiento Futuro",
            description: "Arquitectura escalable que permite agregar nuevos servicios y funcionalidades sin reescribir.",
          },
        ],
      },

      /* ── 9. Galería ── */
      // Nota: Las imágenes se agregarán manualmente desde Sanity Studio
      // ya que no contamos con assets locales para este proyecto.
    ],

    seo: {
      metaTitle: "Opera Multiservicios | Caso de Éxito en Transformación Digital | Star Grow Studio",
      metaDescription:
        "Descubre cómo transformamos la presencia digital de Opera Multiservicios con branding, diseño web, headless CMS y SEO. Un caso de éxito completo de transformación digital empresarial.",
    },
  };

  // Preservar datos manuales del Studio (stack, gallery, seo.ogImage)
  const existing = await client.fetch<{
    stack?: unknown[];
    gallery?: unknown[];
    seo?: { ogImage?: Record<string, unknown> };
  } | null>(
    `*[_id == $id][0]{ stack, gallery, "seo": seo{ ogImage } }`,
    { id: projectId }
  );

  if (existing) {
    // El proyecto ya existe → solo actualizar secciones, respetar TODO lo demás
    await client.patch(projectId).set({
      sections: doc.sections,
    }).commit();
  } else {
    // Primera vez → crear completo
    await client.create(doc);
  }

  console.log("  ✓ Project: Opera Multiservicios");
  return projectId;
}

/* ───────────────────────── Run ───────────────────────── */

async function run() {
  console.log("\n→ Sembrando Opera Multiservicios...\n");

  console.log("1. Technologies");
  const techIds = await seedTechnologies();

  console.log("\n2. Industry");
  const industryId = await seedIndustry();

  console.log("\n3. Client");
  const clientId = await seedClient();

  console.log("\n4. Project");
  await seedProject(clientId, techIds, industryId);

  console.log("\n✅ Opera Multiservicios creado exitosamente.\n");
}

run().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});