import type { SchemaTypeDefinition } from "sanity";

import { blockContent } from "./blockContent";
import { seo } from "./seo";
import { author } from "./author";
import { category } from "./category";
import { post } from "./post";
import { project } from "./project";
import { service } from "./service";
import { client } from "./client";
import { industry } from "./industry";
import { technology } from "./technology";
import { sectionTypes } from "./sections";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documentos
  post,
  project,
  service,
  author,
  category,
  client,
  industry,
  technology,

  // Objetos reutilizables
  blockContent,
  seo,

  // Secciones del Section Builder (objetos, no documentos)
  ...sectionTypes,
];

export const schema = { types: schemaTypes };