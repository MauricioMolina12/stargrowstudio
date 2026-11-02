import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FolderKanban } from "lucide-react";
import { getProjects } from "@/sanity/data/projects";

export const metadata: Metadata = {
  title: "Casos de Éxito | Star Grow Studio",
  description:
    "Conoce los proyectos que hemos transformado: desde branding y diseño hasta desarrollo de software y consultoría estratégica.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="w-full bg-[var(--color-light)]">
      <section className="w-full border-b border-[var(--color-border-subtle)]">
        <div className="container-app py-16 md:py-24">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary-bright)]">
            Casos de éxito
          </span>
          <h1 className="mt-4 text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-[1.08] tracking-tight text-[var(--color-dark)]">
            Proyectos que transforman{' '}
            <span className="text-[var(--color-primary-bright)]">ideas en resultados</span>
          </h1>
        </div>
      </section>

      <div className="container-app py-16 md:py-24">
        {projects.length === 0 ? (
          <p className="text-[var(--color-dark-gray)]">Próximamente...</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project._id}
                href={`/proyectos/${project.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-24px_rgba(0,0,0,0.22)]"
              >
                {project.cover ? (
                  <div className="aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.cover}
                      alt={project.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[16/10] items-center justify-center bg-[var(--color-primary)]/5">
                    <FolderKanban className="h-12 w-12 text-[var(--color-primary-bright)]/20" strokeWidth={1} />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-2 p-6">
                  {project.client && (
                    <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-primary-bright)]">
                      {project.client.name}
                    </span>
                  )}
                  <h2 className="text-lg font-bold text-[var(--color-dark)]">{project.name}</h2>
                  {project.summary && (
                    <p className="text-sm leading-relaxed text-[var(--color-dark-gray)] line-clamp-2">
                      {project.summary}
                    </p>
                  )}
                  <div className="mt-auto flex items-center gap-2 pt-2">
                    <span className="text-sm font-semibold text-[var(--color-primary-bright)]">
                      Ver caso de éxito
                    </span>
                    <ArrowRight className="h-4 w-4 text-[var(--color-primary-bright)] transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}