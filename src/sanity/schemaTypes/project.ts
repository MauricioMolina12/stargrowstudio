import { defineType, defineField, defineArrayMember } from "sanity";
import { sectionTypes } from "./sections";

/**
 * Proyecto / Caso de éxito.
 *
 * Centro del ecosistema: se relaciona con servicios, tecnologías, industria,
 * cliente, posts y otros proyectos mediante referencias normalizadas.
 *
 * Los campos legacy (serviceLine, summary, description, stack antiguo)
 * se mantienen temporalmente para no romper datos existentes.
 * Serán eliminados en una fase posterior de limpieza.
 */
export const project = defineType({
  name: "project",
  title: "Proyecto (Caso de éxito)",
  type: "document",
  groups: [
    { name: "main", title: "General", default: true },
    { name: "relations", title: "Relaciones" },
    { name: "content", title: "Contenido" },
    { name: "meta", title: "Metadatos" },
    { name: "seo", title: "SEO" },
    { name: "legacy", title: "Legado", hidden: true },
  ],
  fields: [
    /* ── General ── */
    defineField({
      name: "name",
      title: "Nombre del proyecto",
      type: "string",
      group: "main",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "main",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Portada",
      type: "image",
      group: "main",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Texto alternativo" }],
    }),
    defineField({
      name: "client",
      title: "Cliente",
      type: "reference",
      group: "main",
      to: [{ type: "client" }],
      description: "Referencia al cliente. Un cliente puede tener múltiples proyectos.",
    }),

    /* ── Relaciones (grupo "Relaciones") ── */
    defineField({
      name: "services",
      title: "Servicios relacionados",
      description: "¿Qué servicios de Star Grow Studio participaron en este proyecto?",
      type: "array",
      group: "relations",
      of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })],
    }),
    defineField({
      name: "stack",
      title: "Tecnologías",
      description: "Tecnologías utilizadas en el proyecto (desde el catálogo).",
      type: "array",
      group: "relations",
      of: [defineArrayMember({ type: "reference", to: [{ type: "technology" }] })],
    }),
    defineField({
      name: "industry",
      title: "Industria",
      description: "Industria principal del proyecto.",
      type: "reference",
      group: "relations",
      to: [{ type: "industry" }],
    }),
    defineField({
      name: "relatedPosts",
      title: "Artículos relacionados",
      description: "Insights / blog posts relacionados con este proyecto.",
      type: "array",
      group: "relations",
      of: [defineArrayMember({ type: "reference", to: [{ type: "post" }] })],
    }),
    defineField({
      name: "relatedProjects",
      title: "Proyectos relacionados",
      description: "Otros proyectos similares o complementarios.",
      type: "array",
      group: "relations",
      of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })],
    }),
    defineField({
      name: "tags",
      title: "Etiquetas",
      description: "Tags libres para filtrado y búsqueda.",
      type: "array",
      group: "relations",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    /* ── Contenido (Section Builder) ── */
    defineField({
      name: "sections",
      title: "Secciones del caso de éxito",
      description:
        "Construye la narrativa del proyecto agregando bloques. Puedes reordenarlos, duplicarlos o eliminarlos.",
      type: "array",
      group: "content",
      of: sectionTypes.map((s) => defineArrayMember(s)),
    }),

    /* ── Contenido: Gallery mejorada ── */
    defineField({
      name: "gallery",
      title: "Galería",
      description: "Cada imagen puede incluir título, descripción y categoría.",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "galleryItem",
          fields: [
            defineField({
              name: "image",
              title: "Imagen",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "alt", title: "Texto alternativo", type: "string" }),
            defineField({ name: "title", title: "Título", type: "string" }),
            defineField({ name: "description", title: "Descripción", type: "text", rows: 2 }),
            defineField({
              name: "category",
              title: "Categoría",
              type: "string",
              options: {
                list: [
                  { title: "Branding", value: "branding" },
                  { title: "UI", value: "ui" },
                  { title: "Dashboard", value: "dashboard" },
                  { title: "Responsive", value: "responsive" },
                  { title: "Wireframes", value: "wireframes" },
                  { title: "Mobile", value: "mobile" },
                  { title: "Fotografía", value: "photography" },
                  { title: "Logo", value: "logo" },
                  { title: "Otra", value: "other" },
                ],
              },
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "category", media: "image" },
          },
        }),
      ],
    }),
    defineField({
      name: "deliverables",
      title: "Entregables",
      description: "Lista de lo que se entregó en este proyecto.",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "deliverable",
          fields: [
            defineField({ name: "title", title: "Título", type: "string" }),
            defineField({ name: "description", title: "Descripción", type: "text", rows: 2 }),
            defineField({ name: "iconName", title: "Icono (lucide-react)", type: "string" }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),

    /* ── Metadatos ── */
    defineField({
      name: "status",
      title: "Estado",
      type: "string",
      group: "meta",
      options: {
        list: [
          { title: "Borrador", value: "draft" },
          { title: "En progreso", value: "inProgress" },
          { title: "Completado", value: "completed" },
          { title: "Mantenimiento", value: "maintenance" },
          { title: "Archivado", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "completed",
    }),
    defineField({
      name: "visibility",
      title: "Visibilidad",
      type: "string",
      group: "meta",
      options: {
        list: [
          { title: "Público", value: "public" },
          { title: "Privado", value: "private" },
          { title: "Destacado", value: "featured" },
          { title: "Interno", value: "internal" },
        ],
        layout: "radio",
      },
      initialValue: "public",
    }),
    defineField({
      name: "year",
      title: "Año",
      type: "number",
      group: "meta",
      validation: (Rule) => Rule.min(2000).max(2100),
    }),
    defineField({
      name: "url",
      title: "Enlace al proyecto",
      description: "URL del proyecto en vivo (si aplica).",
      type: "url",
      group: "meta",
    }),
    defineField({
      name: "durationStart",
      title: "Fecha de inicio",
      type: "date",
      group: "meta",
    }),
    defineField({
      name: "durationEnd",
      title: "Fecha de finalización",
      type: "date",
      group: "meta",
    }),
    defineField({
      name: "team",
      title: "Equipo involucrado",
      description: "Personas que participaron en el proyecto.",
      type: "array",
      group: "meta",
      of: [
        defineArrayMember({
          type: "object",
          name: "teamMember",
          fields: [
            defineField({ name: "name", title: "Nombre", type: "string" }),
            defineField({
              name: "role",
              title: "Rol",
              type: "string",
              options: {
                list: [
                  { title: "Project Manager", value: "pm" },
                  { title: "UX Designer", value: "ux" },
                  { title: "UI Designer", value: "ui" },
                  { title: "Frontend Developer", value: "frontend" },
                  { title: "Backend Developer", value: "backend" },
                  { title: "Full Stack Developer", value: "fullstack" },
                  { title: "QA", value: "qa" },
                  { title: "Branding Designer", value: "branding" },
                  { title: "Photographer", value: "photographer" },
                  { title: "Content Strategist", value: "content" },
                  { title: "Marketing", value: "marketing" },
                  { title: "Consultor", value: "consultant" },
                  { title: "Otro", value: "other" },
                ],
              },
            }),
            defineField({
              name: "image",
              title: "Foto",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
          ],
          preview: { select: { title: "name", subtitle: "role", media: "image" } },
        }),
      ],
    }),
    defineField({
      name: "featured",
      title: "Destacado",
      type: "boolean",
      group: "meta",
      initialValue: false,
    }),

    /* ── SEO ── */
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),

    /* ── Legacy (compat, se eliminará después de migración) ── */
    defineField({
      name: "clientName",
      title: "Cliente (legacy)",
      type: "string",
      group: "legacy",
      hidden: true,
      description: "Campo legacy. Usar la referencia a Client en su lugar.",
    }),
    defineField({
      name: "serviceLine",
      title: "Línea de servicio (legacy)",
      type: "string",
      group: "legacy",
      hidden: true,
      options: {
        list: [
          { title: "Desarrollo de software", value: "software" },
          { title: "Diseño UI/UX", value: "design" },
          { title: "Fotografía", value: "photography" },
          { title: "Consultoría empresarial", value: "consulting" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "summary",
      title: "Resumen (legacy)",
      type: "text",
      rows: 3,
      group: "legacy",
      hidden: true,
    }),
    defineField({
      name: "description",
      title: "Descripción detallada (legacy)",
      type: "blockContent",
      group: "legacy",
      hidden: true,
    }),
    defineField({
      name: "legacyStack",
      title: "Tecnologías (legacy)",
      type: "array",
      group: "legacy",
      hidden: true,
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],

  orderings: [
    { title: "Año, reciente", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
    { title: "Nombre", name: "nameAsc", by: [{ field: "name", direction: "asc" }] },
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "client.name",
      media: "cover",
      status: "status",
    },
    prepare: ({ title, subtitle, media, status }) => ({
      title,
      subtitle: subtitle ? `${subtitle}${status ? ` · ${status}` : ""}` : status,
      media,
    }),
  },
});