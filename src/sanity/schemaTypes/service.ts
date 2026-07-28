import { defineType, defineField, defineArrayMember, type SlugValidationContext } from "sanity";

const API_VERSION = "2024-10-01";

/**
 * Servicio corporativo. Soporta jerarquía padre → hijo mediante `parent`
 * (máximo 2 niveles) y páginas de detalle completas (landing).
 *
 * El slug guardado es SOLO la hoja (ej. `desarrollo-web`). La ruta jerárquica
 * completa (`desarrollo-de-software/desarrollo-web`) se computa en GROQ a partir
 * del padre, nunca se almacena, para evitar desincronización.
 */
export const service = defineType({
  name: "service",
  title: "Servicio",
  type: "document",
  groups: [
    { name: "main", title: "General", default: true },
    { name: "content", title: "Contenido" },
    { name: "landing", title: "Landing" },
    { name: "seo", title: "SEO" },
    { name: "legacy", title: "Legado" },
  ],
  fields: [
    /* ── General ── */
    defineField({
      name: "service",
      title: "Nombre del servicio",
      type: "string",
      group: "main",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (solo la hoja)",
      description:
        "No incluyas el padre. La ruta completa se arma automáticamente: /services/{padre}/{este-slug}.",
      type: "slug",
      group: "main",
      options: {
        source: "service",
        maxLength: 96,
        // Unicidad por hermanos: dos servicios pueden compartir slug si tienen
        // distinto padre; nunca dentro del mismo padre.
        isUnique: isUniqueWithinParent,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "parent",
      title: "Servicio padre",
      description: "Vacío = servicio principal. Con valor = microservicio.",
      type: "reference",
      group: "main",
      to: [{ type: "service" }],
      // Solo se puede referenciar un servicio de primer nivel (evita 3+ niveles).
      options: { filter: "!defined(parent)" },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const ref = (value as { _ref?: string } | undefined)?._ref;
          if (!ref) return true;
          const selfId = context.document?._id?.replace(/^drafts\./, "");
          return ref === selfId ? "Un servicio no puede ser su propio padre." : true;
        }),
    }),
    defineField({
      name: "order",
      title: "Orden de aparición",
      type: "number",
      group: "main",
      description: "Controla el orden en listados, mega-menú y footer.",
    }),
    defineField({
      name: "featured",
      title: "Destacado",
      type: "boolean",
      group: "main",
      initialValue: false,
    }),
    defineField({
      name: "iconName",
      title: "Icono (lucide-react)",
      description: 'Nombre exacto de un icono de lucide-react. Ej: "Code", "Palette", "Camera".',
      type: "string",
      group: "main",
    }),
    defineField({
      name: "badge",
      title: "Etiqueta corta",
      description: 'Texto opcional para el mega-menú. Ej: "Nuevo", "Popular".',
      type: "string",
      group: "main",
    }),
    defineField({
      name: "shortDescription",
      title: "Descripción corta",
      description: "Una frase orientada a resultado. Se usa en tarjetas, mega-menú y footer.",
      type: "text",
      rows: 2,
      group: "main",
      validation: (Rule) => Rule.required().max(200),
    }),

    /* ── Contenido ── */
    defineField({
      name: "fullDescription",
      title: "Descripción completa",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "mainImage",
      title: "Imagen principal",
      type: "image",
      options: { hotspot: true },
      group: "content",
      fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
    }),
    defineField({
      name: "gallery",
      title: "Galería (opcional)",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
        }),
      ],
    }),

    /* ── FAQ ── */
    defineField({
      name: "faq",
      title: "Preguntas frecuentes (FAQ)",
      description: "Preguntas y respuestas para resolver objeciones y aportar structured data para SEO.",
      type: "array",
      group: "landing",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "question", title: "Pregunta", type: "string" },
            { name: "answer", title: "Respuesta", type: "text", rows: 3 },
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ],
    }),

    /* ── Landing ── */
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "landing",
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: "heading", title: "Título", type: "string" },
        { name: "subheading", title: "Subtítulo", type: "text", rows: 2 },
        {
          name: "image",
          title: "Imagen del hero",
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
        },
        {
          name: "ctas",
          title: "Botones",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                { name: "label", title: "Texto", type: "string" },
                { name: "href", title: "Enlace", type: "string" },
                {
                  name: "style",
                  title: "Estilo",
                  type: "string",
                  options: { list: ["primary", "secondary"], layout: "radio" },
                  initialValue: "primary",
                },
              ],
              preview: { select: { title: "label", subtitle: "href" } },
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "benefits",
      title: "Beneficios",
      type: "array",
      group: "landing",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "title", title: "Título", type: "string" },
            { name: "description", title: "Descripción", type: "text", rows: 2 },
            { name: "iconName", title: "Icono (lucide-react)", type: "string" },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
    defineField({
      name: "features",
      title: "Características",
      type: "array",
      group: "landing",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "title", title: "Título", type: "string" },
            { name: "description", title: "Descripción", type: "text", rows: 2 },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
    defineField({
      name: "process",
      title: "Proceso de trabajo",
      type: "array",
      group: "landing",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "step", title: "Paso (nº)", type: "number" },
            { name: "title", title: "Título", type: "string" },
            { name: "description", title: "Descripción", type: "text", rows: 2 },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "Llamado a la acción (cierre)",
      type: "object",
      group: "landing",
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: "heading", title: "Título", type: "string" },
        { name: "description", title: "Descripción", type: "text", rows: 2 },
        { name: "label", title: "Texto del botón", type: "string" },
        { name: "href", title: "Enlace del botón", type: "string" },
      ],
    }),

    /* ── SEO ── */
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),

    /* ── Legado ── (compat con Banner y secciones existentes; no borrar) ── */
    defineField({
      name: "title",
      title: "Título (banner)",
      type: "object",
      group: "legacy",
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: "main", title: "Principal", type: "string" },
        { name: "second", title: "Secundario", type: "string" },
        { name: "optional", title: "Opcional", type: "string" },
      ],
    }),
    defineField({ name: "subtitle", title: "Subtítulo (banner)", type: "text", rows: 2, group: "legacy" }),
    defineField({
      name: "image",
      title: "Imagen del banner",
      type: "image",
      options: { hotspot: true },
      group: "legacy",
    }),
    defineField({ name: "alt", title: "Alt del banner", type: "string", group: "legacy" }),
    defineField({
      name: "list",
      title: "Lista de puntos",
      type: "array",
      of: [{ type: "string" }],
      group: "legacy",
    }),
    defineField({
      name: "callAction",
      title: "Llamados a la acción (banner)",
      type: "array",
      group: "legacy",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "label", title: "Texto", type: "string" },
            { name: "actionKey", title: "Acción", type: "string" },
          ],
          preview: { select: { title: "label", subtitle: "actionKey" } },
        }),
      ],
    }),
    defineField({
      name: "techs",
      title: "Tecnologías",
      type: "array",
      group: "legacy",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "name", title: "Nombre", type: "string" },
            { name: "image", title: "Logo", type: "image", options: { hotspot: true } },
          ],
          preview: { select: { title: "name", media: "image" } },
        }),
      ],
    }),
    defineField({
      name: "projects",
      title: "Proyectos destacados",
      type: "array",
      group: "legacy",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "title", title: "Título", type: "string" },
            { name: "description", title: "Descripción", type: "text" },
            { name: "image", title: "Imagen", type: "image", options: { hotspot: true } },
          ],
          preview: { select: { title: "title", media: "image" } },
        }),
      ],
    }),
    defineField({ name: "animationTitle", title: "Animar título", type: "boolean", group: "legacy" }),
  ],
  orderings: [
    { title: "Orden", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "service", subtitle: "shortDescription", media: "mainImage", parent: "parent.service" },
    prepare: ({ title, subtitle, media, parent }) => ({
      title: parent ? `${parent} › ${title}` : title,
      subtitle,
      media,
    }),
  },
});

/** Unicidad del slug entre hermanos (mismo padre), no globalmente. */
function isUniqueWithinParent(slug: string, context: SlugValidationContext) {
  const { document, getClient } = context;
  const client = getClient({ apiVersion: API_VERSION });
  const id = document?._id?.replace(/^drafts\./, "") ?? "";
  const parentRef = (document?.parent as { _ref?: string } | undefined)?._ref ?? null;

  const query = `!defined(*[
    _type == "service" &&
    !(_id in [$draft, $published]) &&
    slug.current == $slug &&
    ( ($parentRef == null && !defined(parent)) || parent._ref == $parentRef )
  ][0]._id)`;

  return client.fetch<boolean>(query, {
    draft: `drafts.${id}`,
    published: id,
    slug,
    parentRef,
  });
}
