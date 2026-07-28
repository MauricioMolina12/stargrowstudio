import { defineType, defineField } from "sanity";

/** Cliente corporativo. Un cliente puede tener múltiples proyectos. */
export const client = defineType({
  name: "client",
  title: "Cliente",
  type: "document",
  groups: [
    { name: "main", title: "General", default: true },
    { name: "contact", title: "Contacto" },
    { name: "social", title: "Redes sociales" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
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
      name: "logo",
      title: "Logo",
      type: "image",
      group: "main",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Texto alternativo" }],
    }),
    defineField({
      name: "website",
      title: "Sitio web",
      type: "url",
      group: "main",
    }),
    defineField({
      name: "industry",
      title: "Industria",
      type: "reference",
      group: "main",
      to: [{ type: "industry" }],
    }),
    defineField({
      name: "location",
      title: "Ubicación",
      type: "string",
      group: "main",
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 3,
      group: "main",
    }),
    defineField({
      name: "status",
      title: "Estado",
      type: "string",
      group: "main",
      options: {
        list: [
          { title: "Activo", value: "active" },
          { title: "Inactivo", value: "inactive" },
          { title: "Ocasional", value: "occasional" },
        ],
        layout: "radio",
      },
      initialValue: "active",
    }),
    defineField({
      name: "contactName",
      title: "Nombre de contacto",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactEmail",
      title: "Correo de contacto",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactPhone",
      title: "Teléfono de contacto",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "twitter",
      title: "Twitter / X",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "instagram",
      title: "Instagram",
      type: "url",
      group: "social",
    }),
  ],
  orderings: [
    { title: "Nombre", name: "nameAsc", by: [{ field: "name", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "industry", media: "logo" },
  },
});