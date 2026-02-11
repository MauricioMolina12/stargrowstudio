import { defineType, defineField } from 'sanity';

export const Sector = defineType({
  name: 'sector',
  title: 'Sector',
  type: 'document',

  fields: [

    defineField({
      name: 'name',
      title: 'Nombre del sector',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'coverImage',
      title: 'Imagen principal',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'hoverImage',
      title: 'Imagen secundaria (opcional)',
      description: 'Imagen alternativa para hover o animaciones',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'themeColor',
      title: 'Color del sector',
      type: 'string',
      description: 'Usado para overlays, badges o fondos (hex o CSS var)',
      initialValue: 'var(--color-primary)',
    }),

    defineField({
      name: 'shortDescription',
      title: 'Descripción corta',
      type: 'string',
      description: 'Texto breve para cards (máx. 120 caracteres)',
      validation: Rule => Rule.required().max(120),
    }),

    defineField({
      name: 'highlight',
      title: 'Sector destacado',
      type: 'boolean',
      description: 'Hace que el sector se destaque visualmente',
      initialValue: false,
    }),

    defineField({
      name: 'problem',
      title: 'Problema principal del sector',
      type: 'text',
      rows: 3,
      description: 'Qué dificultades suelen tener las empresas de este sector',
    }),

    defineField({
      name: 'solution',
      title: 'Nuestra solución',
      type: 'text',
      rows: 3,
      description: 'Cómo resolvemos ese problema con productos digitales',
    }),

    defineField({
      name: 'services',
      title: 'Servicios aplicables',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ej: UX/UI, Ecommerce, Automatización, Branding',
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta title',
          type: 'string',
          validation: Rule => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta description',
          type: 'text',
          rows: 2,
          validation: Rule => Rule.max(160),
        }),
      ],
    }),

    defineField({
      name: 'order',
      title: 'Orden de visualización',
      type: 'number',
      description: 'Controla el orden en el frontend',
    }),

    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      options: {
        list: [
          { title: 'Borrador', value: 'draft' },
          { title: 'Publicado', value: 'published' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'shortDescription',
      media: 'coverImage',
    },
  },
});
