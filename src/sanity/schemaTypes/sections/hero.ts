import { defineField, defineType, defineArrayMember } from "sanity";

export const sectionHero = defineType({
  name: "section.hero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Título", type: "string" }),
    defineField({ name: "subheading", title: "Subtítulo", type: "text", rows: 2 }),
    defineField({
      name: "image",
      title: "Imagen de fondo",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Texto alternativo" }],
    }),
    defineField({
      name: "ctas",
      title: "Botones",
      type: "array",
      of: [
        defineArrayMember({
          name: "cta",
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
        }),
      ],
    }),
  ],
  preview: { select: { title: "heading" } },
});
