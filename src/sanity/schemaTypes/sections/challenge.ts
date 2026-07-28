import { defineField, defineType } from "sanity";

export const sectionChallenge = defineType({
  name: "section.challenge",
  title: "El Reto",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Título", type: "string" }),
    defineField({ name: "content", title: "Descripción del reto", type: "blockContent" }),
  ],
  preview: { select: { title: "heading" } },
});