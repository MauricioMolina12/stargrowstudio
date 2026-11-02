import { getChildServices } from "@/sanity/data/services";
import type { BannerService } from "@/sanity/types/service";
import Banner from "./index";

/**
 * Wrapper Server Component: carga los servicios hijos desde Sanity (una sola
 * consulta, cacheada con tag "service") y se los pasa al carrusel del Banner.
 */
export default async function BannerSection() {
  let services: BannerService[] = [];
  try {
    services = await getChildServices();
  } catch {
    services = [];
  }
  return <Banner services={services} />;
}
