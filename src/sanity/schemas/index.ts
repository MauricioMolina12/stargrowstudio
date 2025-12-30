import { type SchemaTypeDefinition } from 'sanity'
import { Banner } from './banner'
import { Faqs } from './faqs'
import { Category } from './category'
import { Employee } from './employee'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Banner, Faqs, Category, Employee],
}
