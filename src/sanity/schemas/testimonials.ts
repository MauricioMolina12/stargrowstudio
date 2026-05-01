import { defineType, defineField } from 'sanity';


export const Testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "role",
      title: "Cargo",
      type: "string",
    }),

    defineField({
      name: "company",
      title: "Empresa",
      type: "string",
    }),

    defineField({
      name: "photo",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "content",
      title: "Testimonio",
      type: "text",
      validation: Rule => Rule.required().max(300),
    }),

    defineField({
      name: "status",
      title: "Estado",
      type: "string",
      options: {
        list: [
          { title: "Pendiente", value: "pending" },
          { title: "Aprobado", value: "approved" },
        ],
        layout: "radio",
      },
      initialValue: "pending",
    }),
  ],
});
