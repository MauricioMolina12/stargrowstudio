import ServicesSection from "./components/shared/ServicesSection";
import { getProjects } from "@/sanity/data/projects";
import GalleryWalk from "./components/projects/GalleryWalk";
import HomeClient from "./HomeClient";

export default async function Home() {
  const projects = await getProjects();
  return (
    <HomeClient
      servicesSection={<ServicesSection />}
      galleryWalk={<GalleryWalk projects={projects} />}
    />
  );
}