import { defineType, defineField } from "sanity";

/** Catálogo de tecnologías. Referenciado por proyectos y servicios. */
export const technology = defineType({
  name: "technology",
  title: "Tecnología",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Texto alternativo" }],
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Frontend", value: "frontend" },
          { title: "Backend", value: "backend" },
          { title: "Mobile", value: "mobile" },
          { title: "Cloud / DevOps", value: "cloud" },
          { title: "CMS", value: "cms" },
          { title: "Design", value: "design" },
          { title: "Data / AI", value: "data" },
          { title: "Herramientas", value: "tools" },
          { title: "Infraestructura", value: "infrastructure" },
          { title: "Otra", value: "other" },
        ],
      },
    }),
    defineField({
      name: "officialUrl",
      title: "URL oficial",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
    }),
  ],
  orderings: [
    { title: "Orden", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Nombre", name: "nameAsc", by: [{ field: "name", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "logo" },
  },
});