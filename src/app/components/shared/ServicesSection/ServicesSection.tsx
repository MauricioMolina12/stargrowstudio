import { getServices } from '@/sanity/data/services';
import type { ServiceSummary } from '@/sanity/types/service';
import ServicesSectionClient from './ServicesSection.client';

/** Servicios de primer nivel para el bento del home. Solo desde Sanity. */
export default async function ServicesSection() {
  let services: ServiceSummary[] = [];
  try {
    services = await getServices();
  } catch {
    services = [];
  }

  return <ServicesSectionClient services={services} />;
}
