import { defineType, defineField } from "sanity";

export const Employee = defineType({
    name: "employee",
    title: "Employee",
    type: "document",

    fields: [
        defineField({
            name: "fullname",
            type: "string",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "alias",
            type: "string",
        }),

        defineField({
            name: "department",
            type: "string",
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: "avatar",
            type: "image",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "bio",
            type: "string",
        }),
        defineField({
            name: "email",
            type: "string",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "job",
            type: "string",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'isActive',
            title: 'Active',
            type: 'boolean',
            initialValue: true
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
        })

    ],
});
