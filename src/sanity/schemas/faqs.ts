import { defineType, defineField } from "sanity";

export const Faqs = defineType({
    name: "faqs",
    title: "Faqs",
    type: "document",
    fields: [
        defineField({
            name: "question",
            title: "Question",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "answer",
            title: "Answer",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "locations",
            title: "Locations",
            type: "array",
            validation: (Rule) => Rule.required().min(1),
            of: [{ type: "string" }],
            options: {
                list: [
                    { title: "Home", value: "home" },
                ],
            },
        }),
    ],
});
