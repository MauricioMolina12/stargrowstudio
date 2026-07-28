import { defineType, defineArrayMember } from "sanity";

/**
 * Contenido enriquecido (Portable Text): cuerpo de artículos de blog y descripciones largas.
 * Soporta párrafos, encabezados, listas, citas, enlaces e imágenes intercaladas.
 */
export const blockContent = defineType({
  title: "Contenido",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Cita", value: "blockquote" },
      ],
      lists: [
        { title: "Viñetas", value: "bullet" },
        { title: "Numerada", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Negrita", value: "strong" },
          { title: "Cursiva", value: "em" },
          { title: "Código", value: "code" },
        ],
        annotations: [
          {
            title: "Enlace",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Texto alternativo" },
        { name: "caption", type: "string", title: "Pie de foto" },
      ],
    }),
  ],
});
