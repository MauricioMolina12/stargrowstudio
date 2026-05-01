import { type SchemaTypeDefinition } from 'sanity'
import { Banner } from './banner'
import { Faqs } from './faqs'
import { Category } from './category'
import { Employee } from './employee'
import { Topic } from './topic'
import { Article } from './article'
import { Sector } from './sectors'
import { Testimonial } from './testimonials'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Banner, Faqs, Category, Employee, Topic, Article, Sector, Testimonial],
}
