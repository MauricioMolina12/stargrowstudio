import ServicesSection from "./components/shared/ServicesSection";
import { getProjects } from "@/sanity/data/projects";
import GalleryWalk from "./components/projects/GalleryWalk";
import BannerSection from "./components/shared/Banner/BannerSection";
import HomeClient from "./HomeClient";

export default async function Home() {
  const projects = await getProjects();
  return (
    <HomeClient
      banner={<BannerSection />}
      servicesSection={<ServicesSection />}
      galleryWalk={<GalleryWalk projects={projects} />}
    />
  );
}