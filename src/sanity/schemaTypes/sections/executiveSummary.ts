import { defineField, defineType } from "sanity";

export const sectionExecutiveSummary = defineType({
  name: "section.executiveSummary",
  title: "Resumen Ejecutivo",
  type: "object",
  fields: [
    defineField({ name: "content", title: "Contenido", type: "blockContent" }),
  ],
  preview: { select: { title: "content" }, prepare: () => ({ title: "Resumen Ejecutivo" }) },
});