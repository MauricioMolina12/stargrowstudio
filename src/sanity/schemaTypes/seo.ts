import { defineType, defineField } from "sanity";

/** Objeto reutilizable de metadatos SEO para posts y proyectos. */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta título",
      description: "Máximo 60 caracteres. Google suele mostrar entre 50 y 60.",
      type: "string",
      validation: (Rule) => Rule.max(60).warning("Superaste los 60 caracteres recomendados."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta descripción",
      description: "Máximo 160 caracteres. Recomendado entre 150 y 160 para un snippet completo.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(160).warning("Superaste los 160 caracteres recomendados."),
    }),
    defineField({
      name: "ogImage",
      title: "Imagen para compartir (Open Graph)",
      description: "1200×630px recomendado. Se usa en redes sociales y previews de enlaces.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "ogTitle",
      title: "Título para Open Graph (opcional)",
      description: "Si se deja vacío, se usará el Meta título.",
      type: "string",
    }),
    defineField({
      name: "ogDescription",
      title: "Descripción para Open Graph (opcional)",
      description: "Si se deja vacío, se usará la Meta descripción.",
      type: "text",
      rows: 2,
    }),
  ],
});
