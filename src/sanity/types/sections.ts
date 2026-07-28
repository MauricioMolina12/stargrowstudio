import type { PortableTextBlock } from "@portabletext/types";

/* ─────────── Base ─────────── */

type SectionBase = {
  _key: string;
  _type: string;
};

/* ─────────── Hero ─────────── */

export type SectionHero = SectionBase & {
  _type: "section.hero";
  heading?: string;
  subheading?: string;
  image?: string;
  ctas?: { label: string; href: string; style: "primary" | "secondary" }[];
};

/* ─────────── Union type ─────────── */

export type ProjectSection = SectionHero; // Se extenderá al agregar más tipos de sección

/* ─────────── Team Member ─────────── */

export type TeamMember = {
  name: string;
  role: string;
  image?: string;
  linkedin?: string;
};

/* ─────────── Deliverable ─────────── */

export type Deliverable = {
  title: string;
  description?: string;
  iconName?: string;
};

/* ─────────── Gallery Item ─────────── */

export type GalleryItem = {
  image: string;
  alt?: string;
  title?: string;
  description?: string;
  category?: string;
};

/* ─────────── Project Status / Visibility ─────────── */

export type ProjectStatus = "draft" | "inProgress" | "completed" | "maintenance" | "archived";
export type ProjectVisibility = "public" | "private" | "featured" | "internal";

export type ServiceRef = {
  _id: string;
  service: string;
  slug: string;
  path: string;
  iconName?: string;
};