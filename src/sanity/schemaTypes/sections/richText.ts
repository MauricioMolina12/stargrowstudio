import { defineField, defineType } from "sanity";

export const sectionRichText = defineType({
  name: "section.richText",
  title: "Texto Enriquecido",
  type: "object",
  fields: [
    defineField({ name: "content", title: "Contenido", type: "blockContent" }),
  ],
  preview: { prepare: () => ({ title: "Texto Enriquecido" }) },
});