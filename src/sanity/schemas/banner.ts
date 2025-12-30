import { defineType, defineField } from "sanity";

export const Banner = defineType({
  name: "banner",
  title: "Banner",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        { name: "main", type: "string" },
        { name: "second", type: "string" },
      ],
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
    defineField({
      name: "list",
      title: "Items",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "callAction",
      title: "Call Action",
      type: "object",
      fields: [
        { name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() },
        { name: "actionKey", title: "Action Key", type: "string", validation: (Rule) => Rule.required() },
      ]
    }),
    defineField({
      name: "bgColor",
      title: "background Color",
      type: "string"
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
          { title: "Service", value: "service" },
        ],
      },
    }),
  ],
});
