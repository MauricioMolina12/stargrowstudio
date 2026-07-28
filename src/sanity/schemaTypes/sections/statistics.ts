import { defineField, defineType, defineArrayMember } from "sanity";

export const sectionStatistics = defineType({
  name: "section.statistics",
  title: "Estadísticas / Resultados",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Título", type: "string" }),
    defineField({
      name: "items",
      title: "Indicadores",
      type: "array",
      of: [defineArrayMember({
        type: "object",
        fields: [
          { name: "metric", title: "Métrica (valor numérico)", type: "string" },
          { name: "label", title: "Etiqueta", type: "string" },
          { name: "description", title: "Descripción", type: "text", rows: 2 },
        ],
        preview: { select: { title: "label", subtitle: "metric" } },
      })],
    }),
  ],
  preview: { select: { title: "heading" } },
});