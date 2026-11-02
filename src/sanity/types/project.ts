import type { PortableTextBlock } from "@portabletext/types";
import type { ClientSummary } from "./client";
import type { TechnologySummary } from "./technology";
import type { IndustrySummary } from "./industry";
import type { ProjectSection, TeamMember, Deliverable, GalleryItem, ProjectStatus, ProjectVisibility, ServiceRef } from "./sections";
import type { SeoMeta } from "./service";

/** Resultado de la consulta de listado de proyectos. */
export type ProjectListItem = {
  _id: string;
  name: string;
  slug: string;
  client?: ClientSummary | null;
  cover?: string;
  seoLogo?: string;
  summary?: string;
  year?: number;
  featured?: boolean;
  status?: ProjectStatus;
  visibility?: ProjectVisibility;
  serviceLine?: string;
  seo?: SeoMeta | null;
};

/** Proyecto completo para la página de detalle. */
export type ProjectDetail = {
  _id: string;
  name: string;
  slug: string;
  client: ClientSummary | null;
  services: ServiceRef[];
  stack: TechnologySummary[];
  industry: IndustrySummary | null;
  relatedPosts: { _id: string; title: string; slug: string }[];
  relatedProjects: ProjectListItem[];
  tags: string[];
  sections: ProjectSection[];
  gallery: GalleryItem[];
  deliverables: Deliverable[];
  status: ProjectStatus;
  visibility: ProjectVisibility;
  year: number | null;
  url: string | null;
  instagramUrl?: string | null;
  durationStart: string | null;
  durationEnd: string | null;
  team: TeamMember[];
  featured: boolean;
  seo: SeoMeta | null;
  cover: string | null;

  // Legacy (hasta migración):
  summary: string | null;
  description: PortableTextBlock[] | null;
  serviceLine: string | null;
};