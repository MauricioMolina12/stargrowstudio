import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;
const assetDirectory = process.env.SG_EVENTS_ASSET_DIR;

if (!projectId || !dataset || !token || !assetDirectory) {
  console.error("Faltan variables de entorno para escribir en Sanity o localizar las imágenes.");
  process.exit(1);
}

const clientConfig = {
  projectId,
  dataset,
  token,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01",
  useCdn: false,
};
const client = createClient({ ...clientConfig, perspective: "raw" });
const publishedClient = createClient({ ...clientConfig, perspective: "published" });

const imageFiles = {
  cover: "Icono de calendario futurista en morado.png",
  brandIcon: "Icono de eventos con calendario y check.png",
  dashboard: "Captura de pantalla 2026-11-02 095922.png",
  registration: "Captura de pantalla 2026-11-02 100241.png",
  checkIn: "Captura de pantalla 2026-11-02 100300.png",
} as const;

type PortableTextBlock = {
  _type: "block";
  _key: string;
  style: "normal" | "h2";
  markDefs: never[];
  listItem?: "bullet";
  level?: number;
  children: { _type: "span"; _key: string; text: string; marks: string[] }[];
};

function textBlock(key: string, text: string, style: "normal" | "h2" = "normal"): PortableTextBlock {
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-span`, text, marks: [] }],
  };
}

function bulletBlock(key: string, label: string, description: string): PortableTextBlock {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    markDefs: [],
    listItem: "bullet",
    level: 1,
    children: [
      { _type: "span", _key: `${key}-label`, text: `${label}: `, marks: ["strong"] },
      { _type: "span", _key: `${key}-description`, text: description, marks: [] },
    ],
  };
}

function imageReference(assetId: string) {
  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: assetId },
  };
}

async function uploadImage(filename: string): Promise<string> {
  const file = await readFile(path.join(assetDirectory!, filename));
  const sha1hash = createHash("sha1").update(file).digest("hex");
  const existingAsset = await client.fetch<string | null>(
    '*[_type == "sanity.imageAsset" && sha1hash == $sha1hash][0]._id',
    { sha1hash }
  );
  if (existingAsset) return existingAsset;

  const asset = await client.assets.upload("image", file, { filename });
  console.log(`Imagen cargada: ${filename}`);
  return asset._id;
}

async function run() {
  const assets = Object.fromEntries(
    await Promise.all(
      Object.entries(imageFiles).map(async ([key, filename]) => [key, await uploadImage(filename)])
    )
  ) as Record<keyof typeof imageFiles, string>;

  const assetIds = [...new Set(Object.values(assets))];
  const validAssetIds = await publishedClient.fetch<string[]>(
    '*[_type == "sanity.imageAsset" && _id in $assetIds]._id',
    { assetIds }
  );
  if (validAssetIds.length !== assetIds.length) {
    throw new Error("No se pudieron verificar todos los assets cargados en Sanity.");
  }

  const catalogs = await publishedClient.fetch<{
    clients: { _id: string; name: string; slug: string | null }[];
    services: { _id: string; service: string; slug: string | null }[];
    industries: { _id: string; name: string; slug: string | null }[];
  }>(`{
    "clients": *[_type == "client"]{ _id, name, "slug": slug.current },
    "services": *[_type == "service"]{ _id, service, "slug": slug.current },
    "industries": *[_type == "industry"]{ _id, name, "slug": slug.current }
  }`);

  const studioClient = catalogs.clients.find(
    (item) => item.slug === "star-grow-studio" || item.name.trim().toLowerCase() === "star grow studio"
  );
  const relevantServiceSlugs = new Set([
    "desarrollo-de-software",
    "desarrollo-web",
    "diseno",
    "ui",
    "ux",
  ]);
  const services = catalogs.services.filter(
    (item) => item.slug !== null && relevantServiceSlugs.has(item.slug)
  );
  const eventIndustry = catalogs.industries.find((item) =>
    /event|entretenimiento/i.test(`${item.name} ${item.slug ?? ""}`)
  );

  const cover = {
    ...imageReference(assets.cover),
    alt: "Ilustración de un calendario con confirmación de eventos en tonos morados.",
  };
  const gallery = [
    {
      _key: "gallery-dashboard",
      _type: "galleryItem",
      image: imageReference(assets.dashboard),
      alt: "Panel de control de Star Grow Events con indicadores y resumen del evento.",
      title: "Panel de control",
      description: "Vista general de eventos, registros e indicadores de operación.",
      category: "dashboard",
    },
    {
      _key: "gallery-registration",
      _type: "galleryItem",
      image: imageReference(assets.registration),
      alt: "Interfaz de mesa de registro para consultar inscripciones y asistentes.",
      title: "Mesa de registro",
      description: "Vista operativa para consultar inscripciones y registrar participantes.",
      category: "ui",
    },
    {
      _key: "gallery-checkin",
      _type: "galleryItem",
      image: imageReference(assets.checkIn),
      alt: "Pantalla de ingreso y turnos con opción de escanear códigos QR.",
      title: "Ingreso y turnos",
      description: "Interfaz de apoyo al control de ingreso y consulta de inscripciones.",
      category: "ui",
    },
    {
      _key: "gallery-brand",
      _type: "galleryItem",
      image: imageReference(assets.brandIcon),
      alt: "Icono de calendario con una marca de confirmación sobre fondo violeta.",
      title: "Recurso gráfico de eventos",
      description: "Gráfica de calendario y confirmación asociada a la plataforma.",
      category: "other",
    },
  ];

  const sections = [
    {
      _type: "section.hero",
      _key: "hero",
      heading: "Gestión de eventos, con cada proceso en un solo lugar",
      subheading:
        "Star Grow Events centraliza la organización, las inscripciones, el seguimiento de participantes y la lectura de resultados en una plataforma digital.",
      image: {
        ...imageReference(assets.cover),
        alt: "Ilustración de calendario y confirmación de eventos de Star Grow Events.",
      },
      ctas: [
        {
          _key: "cta-project",
          _type: "cta",
          label: "Hablemos de tu plataforma",
          href: "/cotizar",
          style: "primary",
        },
      ],
    },
    {
      _type: "section.executiveSummary",
      _key: "overview",
      content: [
        textBlock("overview-title", "Una operación de eventos conectada", "h2"),
        textBlock(
          "overview-intro",
          "Star Grow Events es una plataforma digital para administrar eventos desde un entorno unificado. Reúne herramientas para organizar cada evento, habilitar inscripciones, consultar participantes y revisar indicadores."
        ),
        textBlock(
          "overview-value",
          "La solución atiende las necesidades de organizadores y asistentes con flujos que acompañan la gestión antes y durante cada evento."
        ),
      ],
    },
    {
      _type: "section.challenge",
      _key: "challenge",
      heading: "El reto: coordinar cada etapa con visibilidad",
      content: [
        textBlock(
          "challenge-context",
          "La organización de un evento combina tareas distintas: configurar información, recibir inscripciones, atender a participantes y dar seguimiento a lo que ocurre."
        ),
        textBlock(
          "challenge-need",
          "El desafío consiste en reunir esos procesos y mantener una referencia común para el equipo organizador, sin perder de vista la experiencia de quienes asisten."
        ),
      ],
    },
    {
      _type: "section.richText",
      _key: "solution",
      content: [
        textBlock("solution-title", "La solución: una plataforma para la gestión integral", "h2"),
        textBlock(
          "solution-intro",
          "Desarrollamos Star Grow Events como un espacio central para administrar la información y el seguimiento de cada evento. La plataforma conecta las tareas de organización con herramientas de inscripción, gestión de participantes y consulta de resultados."
        ),
        textBlock(
          "solution-operations",
          "Desde la configuración del evento hasta la operación de registro e ingreso, el equipo puede trabajar sobre vistas diseñadas para apoyar cada momento de la gestión."
        ),
      ],
    },
    {
      _type: "section.richText",
      _key: "features",
      content: [
        textBlock("features-title", "Funcionalidades para una operación más clara", "h2"),
        bulletBlock(
          "feature-events",
          "Gestión de eventos",
          "Crea, configura y administra la información de cada evento desde un mismo entorno."
        ),
        bulletBlock(
          "feature-registration",
          "Inscripciones públicas",
          "Ofrece formularios accesibles para que los asistentes puedan registrarse."
        ),
        bulletBlock(
          "feature-participants",
          "Gestión de participantes",
          "Centraliza la consulta y el seguimiento de las personas inscritas."
        ),
        bulletBlock(
          "feature-access",
          "Registro e ingreso",
          "Apoya las tareas de registro y control de acceso con herramientas para consultar inscripciones y escanear códigos QR."
        ),
        bulletBlock(
          "feature-metrics",
          "Métricas y estadísticas",
          "Presenta indicadores para revisar el comportamiento y los resultados de cada evento."
        ),
        bulletBlock(
          "feature-admin",
          "Administración centralizada",
          "Mantiene la información y el seguimiento de los eventos en una plataforma unificada."
        ),
      ],
    },
    {
      _type: "section.richText",
      _key: "experience",
      content: [
        textBlock("experience-title", "Una interfaz orientada al trabajo diario", "h2"),
        textBlock(
          "experience-screens",
          "Las pantallas del producto muestran una navegación común y vistas específicas para el panel de control, la mesa de registro, el ingreso y la configuración de eventos."
        ),
        textBlock(
          "experience-usability",
          "Esta organización separa las tareas de consulta y operación, y ayuda a que los equipos encuentren la información adecuada según el momento del evento."
        ),
      ],
    },
    {
      _type: "section.richText",
      _key: "business-value",
      content: [
        textBlock("value-title", "Más contexto para coordinar cada evento", "h2"),
        textBlock(
          "value-centralization",
          "Concentrar configuraciones, inscripciones, participantes e indicadores ofrece al equipo una referencia compartida para seguir la operación y consultar la información disponible."
        ),
        textBlock(
          "value-outcome",
          "El valor de la plataforma está en ordenar la gestión y facilitar el seguimiento, sin atribuir mejoras cuantitativas que no han sido medidas."
        ),
      ],
    },
    {
      _type: "section.richText",
      _key: "closing",
      content: [
        textBlock("closing-title", "Tecnología diseñada alrededor de la operación", "h2"),
        textBlock(
          "closing-copy",
          "Star Grow Events refleja cómo Star Grow Studio convierte necesidades operativas en productos digitales: plataformas a medida que conectan procesos, información y experiencia de usuario."
        ),
        textBlock(
          "closing-cta",
          "Si tu organización busca digitalizar procesos o desarrollar una plataforma empresarial, conversemos sobre una solución alineada con sus objetivos."
        ),
      ],
    },
  ];

  const projectDocument = {
    _id: "project.star-grow-events",
    _type: "project",
    name: "Star Grow Events",
    slug: { _type: "slug", current: "star-grow-events" },
    cover,
    services: services.map((item) => ({ _type: "reference", _ref: item._id })),
    stack: [],
    sections,
    gallery,
    deliverables: [
      {
        _key: "deliverable-platform",
        title: "Plataforma digital de gestión de eventos",
        description: "Entorno centralizado para organizar y administrar eventos.",
      },
      {
        _key: "deliverable-dashboard",
        title: "Panel administrativo y de métricas",
        description: "Vistas de resumen e indicadores para consultar la operación de los eventos.",
      },
      {
        _key: "deliverable-registration",
        title: "Inscripciones y gestión de participantes",
        description: "Flujos para recibir registros y consultar la información de asistentes.",
      },
      {
        _key: "deliverable-access",
        title: "Herramientas de registro e ingreso",
        description: "Interfaz para apoyar el registro y la consulta de accesos, incluido el escaneo de códigos QR.",
      },
      {
        _key: "deliverable-interface",
        title: "Interfaz de administración de eventos",
        description: "Pantallas de configuración, mesa de registro, ingreso y seguimiento.",
      },
    ],
    status: "completed",
    visibility: "public",
    year: 2026,
    featured: true,
    serviceLine: "software",
    tags: [
      "software de gestión de eventos",
      "plataforma de administración de eventos",
      "inscripciones online",
      "gestión de participantes",
      "organización de eventos",
      "desarrollo de plataformas a medida",
      "Star Grow Studio",
    ],
    seo: {
      metaTitle: "Software de gestión de eventos | Star Grow Events",
      metaDescription:
        "Centraliza eventos, inscripciones y participantes con Star Grow Events: una plataforma de gestión para organizar operaciones y consultar métricas.",
      ogTitle: "Software de gestión de eventos | Star Grow Events",
      ogDescription:
        "Centraliza eventos, inscripciones y participantes con Star Grow Events: una plataforma de gestión para organizar operaciones y consultar métricas.",
      ogImage: imageReference(assets.cover),
    },
    ...(studioClient
      ? { client: { _type: "reference", _ref: studioClient._id } }
      : {}),
    ...(eventIndustry
      ? { industry: { _type: "reference", _ref: eventIndustry._id } }
      : {}),
  };

  const matches = await client.fetch<{ _id: string }[]>(
    '*[_type == "project" && (slug.current == $slug || lower(name) == $name)]{ _id }',
    { slug: "star-grow-events", name: "star grow events" }
  );
  const uniqueIds = [...new Set(matches.map(({ _id }) => _id.replace(/^drafts\./, "")))];
  if (uniqueIds.length > 1) {
    throw new Error(`Hay varios documentos coincidentes; no se modificó ninguno: ${uniqueIds.join(", ")}`);
  }

  const existingId = matches.find(({ _id }) => !_id.startsWith("drafts."))?._id ?? matches[0]?._id;
  const { _id, _type, ...fields } = projectDocument;
  const unsetFields = [
    ...(!studioClient ? ["client"] : []),
    ...(!eventIndustry ? ["industry"] : []),
    ...(services.length === 0 ? ["services"] : []),
  ];

  if (existingId) {
    const patch = client.patch(existingId).set(fields);
    if (unsetFields.length > 0) patch.unset(unsetFields);
    await patch.commit();
    console.log(`Proyecto actualizado (${_type}): ${existingId}`);
  } else {
    await client.createOrReplace(projectDocument);
    console.log(`Proyecto creado: ${_id}`);
  }

  const saved = await publishedClient.fetch<{
    _id: string;
    name: string;
    "slug": string;
    "cover": { "asset": { "_ref": string } } | null;
    "gallery": { "image": { "asset": { "_ref": string } }; "category": string }[];
    "client": { "_id": string } | null;
    "services": { "_id": string }[];
    "stack": { "_id": string }[];
    "industry": { "_id": string } | null;
    "status": string;
    "visibility": string;
    "year": number;
    "featured": boolean;
    "sections": { "_type": string }[];
    "deliverables": { "title": string }[];
    "seo": { "ogImage": { "asset": { "_ref": string } } } | null;
  }>(
    `*[_type == "project" && _id == $id][0]{
      _id, name, "slug": slug.current, cover{ asset }, gallery[]{ image{ asset }, category },
      "client": client->{ _id }, "services": services[]->{ _id }, "stack": stack[]->{ _id },
      "industry": industry->{ _id }, status, visibility, year, featured,
      sections[]{ _type }, deliverables[]{ title },
      "seo": seo{ ogImage{ asset } }
    }`,
    { id: existingId ?? _id }
  );

  if (
    !saved ||
    saved.name !== "Star Grow Events" ||
    saved.slug !== "star-grow-events" ||
    !saved.cover?.asset._ref ||
    !saved.seo?.ogImage.asset._ref ||
    saved.gallery.length !== gallery.length ||
    saved.sections.length !== sections.length ||
    saved.deliverables.length !== projectDocument.deliverables.length ||
    saved.status !== "completed" ||
    saved.visibility !== "public" ||
    saved.year !== 2026 ||
    saved.featured !== true ||
    saved.stack.length !== 0
  ) {
    throw new Error("La verificación del documento guardado en Sanity no pasó.");
  }

  const referencedAssetIds = [
    saved.cover.asset._ref,
    saved.seo.ogImage.asset._ref,
    ...saved.gallery.map(({ image }) => image.asset._ref),
  ];
  if (referencedAssetIds.some((assetId) => !validAssetIds.includes(assetId))) {
    throw new Error("Una de las imágenes del proyecto no referencia un asset válido.");
  }
  if (saved.gallery.some(({ category }) => !["ui", "dashboard", "responsive", "mobile", "other"].includes(category))) {
    throw new Error("La galería contiene una categoría que no está definida en el schema.");
  }

  const referenceIds = [
    ...(saved.client ? [saved.client._id] : []),
    ...(saved.services ?? []).map(({ _id }) => _id),
    ...(saved.stack ?? []).map(({ _id }) => _id),
    ...(saved.industry ? [saved.industry._id] : []),
  ];
  const existingReferences = await publishedClient.fetch<string[]>(
    "*[_id in $ids]._id",
    { ids: referenceIds }
  );
  if (existingReferences.length !== referenceIds.length) {
    throw new Error("La verificación de referencias del documento no pasó.");
  }

  console.log(
    JSON.stringify(
      {
        id: saved._id,
        slug: saved.slug,
        uploadedAssets: Object.entries(assets).map(([name, assetId]) => ({ name, assetId })),
        galleryImages: saved.gallery.length,
        client: saved.client?._id ?? null,
        services: saved.services.map(({ _id }) => _id),
        technologies: saved.stack.map(({ _id }) => _id),
        industry: saved.industry?._id ?? null,
        sections: saved.sections.map(({ _type }) => _type),
      },
      null,
      2
    )
  );
}

run().catch((error: unknown) => {
  console.error("No se pudo completar la integración de Star Grow Events:", error);
  process.exitCode = 1;
});
