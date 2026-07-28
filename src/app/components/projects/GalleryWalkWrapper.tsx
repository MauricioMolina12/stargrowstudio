import { getProjects } from "@/sanity/data/projects";
import GalleryWalk from "./GalleryWalk";

/** Wrapper Server Component: carga los proyectos y los pasa al cliente. */
export default async function GalleryWalkWrapper() {
  const projects = await getProjects();
  return <GalleryWalk projects={projects} />;
}