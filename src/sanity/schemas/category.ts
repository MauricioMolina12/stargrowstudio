import { defineType, defineField } from "sanity";

export const Category = defineType({
    name: "category",
    title: "Category",
    type: "document",

    fields: [
        defineField({
            name: "title",
            type: "string",
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: "title",
            },
        }),

        defineField({
            name: "description",
            type: "text",
        }),

        defineField({
            name: "icon",
            type: "string",
            description: "Nombre del icono (ej: lucide-react)",
        }),

        defineField({
            name: "images",
            title: "Images",
            type: "array",
            of: [{ type: "image" }],
        }),

        defineField({
            name: "parent",
            title: "Parent category",
            type: "reference",
            to: [{ type: "category" }],
            description: "Vacío = categoría principal",
        }),

        defineField({
            name: "order",
            type: "number",
            description: "Orden visual",
        }),

        defineField({
            name: "badge",
            type: "string",
            description: "Tag personalizada"
        })
    ],
});
