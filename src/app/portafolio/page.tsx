import type { Metadata } from "next";
import Link from "next/link";
import { FolderKanban } from "lucide-react";

import { getProjects, type ProjectListItem } from "@/sanity/data/projects";
import { imageUrl } from "@/sanity/image";

export const metadata: Metadata = {
  title: "Portafolio | Star Grow Studio",
  description: "Proyectos y casos de éxito de Star Grow Studio.",
};

const SERVICE_LINE_LABEL: Record<string, string> = {
  software: "Desarrollo de software",
  design: "Diseño UI/UX",
  photography: "Fotografía",
  consulting: "Consultoría",
};

export default async function PortfolioPage() {
  let projects: ProjectListItem[] = [];
  try {
    projects = await getProjects();
  } catch {
    projects = [];
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <header className="mb-10 flex flex-col items-center text-center">
        <span className="text-lg font-medium text-[var(--color-primary-bright)]">Nuestro portafolio</span>
        <h1 className="mt-3 max-w-2xl text-3xl font-bold text-[var(--color-primary-to-white)] lg:text-4xl">
          Proyectos que transforman ideas en soluciones reales
        </h1>
      </header>

      {projects.length === 0 ? (
        <div className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-2xl border border-dashed border-[var(--color-gray)] p-12 text-center">
          <FolderKanban size={40} className="text-[var(--color-primary-bright)]" />
          <h2 className="text-lg font-semibold text-[var(--color-primary-to-white)]">
            Aún no hay proyectos publicados
          </h2>
          <p className="text-sm text-[var(--color-dark-gray)]">
            Publica tus proyectos desde el{" "}
            <Link href="/studio" className="font-medium text-[var(--color-primary-bright)] hover:underline">
              panel de contenido
            </Link>{" "}
            y aparecerán aquí automáticamente.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <li
              key={p._id}
              className="overflow-hidden rounded-2xl border border-[var(--color-gray)] bg-[var(--color-white-to-primary)]"
            >
              <figure className="aspect-video overflow-hidden bg-[var(--color-gray)]">
                {p.cover && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageUrl(p.cover, 600)}
                    alt={p.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </figure>
              <div className="flex flex-col gap-2 p-5">
                {p.serviceLine && (
                  <span className="w-fit rounded-full bg-[var(--color-primary-tint)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-primary-bright)]">
                    {SERVICE_LINE_LABEL[p.serviceLine] ?? p.serviceLine}
                  </span>
                )}
                <h2 className="text-lg font-bold text-[var(--color-primary-to-white)]">{p.name}</h2>
                {p.summary && (
                  <p className="text-sm text-[var(--color-dark-gray)]">{p.summary}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
