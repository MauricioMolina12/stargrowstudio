
import { sanityFetch } from "@/sanity/fetch";
import {
  projectsQuery,
  projectBySlugQuery,
  projectSlugsQuery,
  projectsByServiceQuery,
} from "@/sanity/queries";
import type { ProjectListItem, ProjectDetail } from "@/sanity/types/project";

const TAG = "project";

/** Listado de proyectos públicos. */
export function getProjects() {
  return sanityFetch<ProjectListItem[]>({ query: projectsQuery, tags: [TAG] });
}

/** Detalle completo de proyecto por slug. */
export async function getProjectBySlug(slug: string) {
  const project = await sanityFetch<ProjectDetail | null>({
    query: projectBySlugQuery,
    params: { slug },
    revalidate: 0,
  });

  // if (process.env.NODE_ENV === "development") {
  //   console.log("[getProjectBySlug]", slug, {
  //     cover: project?.cover,
  //     ogImage: project?.seo?.ogImage,
  //     sections: project?.sections?.map((s) => s._type),
  //   });
  // }

  return project;
}

/** Slugs de todos los proyectos públicos (para generateStaticParams). */
export function getProjectSlugs() {
  return sanityFetch<string[]>({ query: projectSlugsQuery, tags: [TAG] });
}

/** Proyectos relacionados a un servicio (para landing de servicio). */
export function getProjectsByService(serviceId: string) {
  return sanityFetch<ProjectListItem[]>({
    query: projectsByServiceQuery,
    params: { serviceId },
    tags: [TAG],
  });
}