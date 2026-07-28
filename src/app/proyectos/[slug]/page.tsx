import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight, CalendarClock, Building2, Tag, Briefcase, User } from "lucide-react";
import ScrollGallery from "@/app/components/projects/ScrollGallery";
import { getProjectBySlug, getProjectSlugs } from "@/sanity/data/projects";
import SectionRenderer from "@/app/components/projects/SectionRenderer";

/** Desactivar caché para que los datos de Sanity (imágenes, etc.) se vean siempre frescos. */
export const revalidate = 0;

type Params = { slug: string };

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Proyecto no encontrado" };
  const title = project.seo?.metaTitle || `${project.name} | Caso de Éxito | Star Grow Studio`;
  const description = project.seo?.metaDescription || project.summary || "";
  return { title, description, openGraph: { title, description, images: project.cover ? [{ url: project.cover }] : undefined } };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const accent = "var(--color-primary)";

  // Duration
  let durationLabel = "";
  if (project.durationStart && project.durationEnd) {
    const start = new Date(project.durationStart);
    const end = new Date(project.durationEnd);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    if (months >= 12) { const y = Math.floor(months / 12); durationLabel = `${y} año${y > 1 ? "s" : ""}`; }
    else if (months > 0) { durationLabel = `${months} mes${months > 1 ? "es" : ""}`; }
    else { durationLabel = "Menos de 1 mes"; }
  }

  return (
    <main className="w-full bg-[var(--color-light)]">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="absolute top-0 left-0 right-0 z-20 py-4">
        <div className="container-app">
          <div className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/proyectos" className="hover:text-white transition-colors">Casos de éxito</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/80 font-medium">{project.name}</span>
          </div>
        </div>
      </nav>

      {/* Narrative sections */}
      {project.sections?.length ? (
        <SectionRenderer sections={project.sections} project={{ name: project.name, slug: project.slug, accent, cover: project.cover, gallery: project.gallery }} />
      ) : null}

      {/* Gallery — scroll reveal layers */}
      {project.gallery && project.gallery.length > 0 && (
        <ScrollGallery items={project.gallery} />
      )}

      {/* Contexto del proyecto — editorial composition */}
      <section className="w-full border-t border-black/[0.06] bg-white">
        <div className="container-app py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            {/* Cliente — protagonista */}
            {project.client && (
              <div className="md:col-span-5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-dark-gray)]">Cliente</span>
                <div className="mt-3 flex items-center gap-4">
                  {/* Logo from SEO → Open Graph Image, or client.logo, or fallback icon */}
                  {project.seo?.ogImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.seo.ogImage}
                      alt={project.client.name}
                      className="h-14 w-14 rounded-xl object-contain bg-white border border-black/[0.06] p-2"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-[var(--color-primary)]" strokeWidth={1.5} />
                    </div>
                  )}
                  <div>
                    <p className="text-lg font-bold text-[var(--color-dark)]">{project.client.name}</p>
                    {project.industry && <p className="text-sm text-[var(--color-dark-gray)]">{project.industry.name}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Timeline — año + duración */}
            <div className="md:col-span-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-dark-gray)]">Timeline</span>
              <div className="mt-3 space-y-2">
                {project.year && (
                  <div className="flex items-center gap-3">
                    <CalendarClock className="h-4 w-4 text-[var(--color-dark-gray)]" strokeWidth={1.5} />
                    <span className="text-sm font-medium text-[var(--color-dark)]">{project.year}</span>
                  </div>
                )}
                {durationLabel && (
                  <div className="flex items-center gap-3">
                    <CalendarClock className="h-4 w-4 text-[var(--color-dark-gray)]" strokeWidth={1.5} />
                    <span className="text-sm font-medium text-[var(--color-dark)]">{durationLabel}</span>
                  </div>
                )}
                {/* Rol — siempre presente aunque el equipo sea pequeño */}
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-[var(--color-dark-gray)]" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-[var(--color-dark)]">
                    {project.team?.length === 1
                      ? `Liderado por ${project.team[0].name}`
                      : project.team?.length
                        ? `Equipo de ${project.team.length} personas`
                        : "Project Manager + Desarrollo + Diseño"}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags & Servicios */}
            <div className="md:col-span-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-dark-gray)]">Etiquetas</span>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags?.map((tag, i) => (
                  <span key={i} className="rounded-full border border-black/[0.08] px-2.5 py-1 text-[11px] font-medium text-[var(--color-dark-gray)]">{tag}</span>
                ))}
              </div>
              {project.services && project.services.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.services.filter((s): s is NonNullable<typeof s> => s != null && !!s.path).map((svc) => (
                    <Link key={svc._id} href={`/services/${svc.path}`} className="inline-flex items-center gap-1 rounded-full border border-[var(--color-primary)]/20 px-3 py-1 text-[11px] font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)]/5">
                      <Briefcase className="h-3 w-3" strokeWidth={1.5} />
                      {svc.service}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables — timeline / project journey */}
      {project.deliverables && project.deliverables.length > 0 && (
        <section className="w-full border-t border-black/[0.06] bg-[var(--color-light)] py-16 md:py-20">
          <div className="container-app">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-dark-gray)] mb-10">
              Entregables del proyecto
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.deliverables.map((d, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl border border-black/[0.06] bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_-12px_rgba(0,0,0,0.15)]"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-dark-gray)]">
                    {"· "}{(i + 1).toString().padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-base font-bold text-[var(--color-dark)]">{d.title}</h3>
                  {d.description && (
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-dark-gray)]">{d.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technologies — con logos */}
      {project.stack && project.stack.length > 0 && (
        <section className="w-full border-t border-black/[0.06] bg-white py-14">
          <div className="container-app">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-dark-gray)] mb-6">
              Tecnologías utilizadas
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
              {project.stack.map((tech) => (
                <div key={tech._id} className="flex flex-col items-center gap-2 rounded-xl border border-black/[0.06] bg-[var(--color-light)] p-4">
                  {tech.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={tech.logo} alt={tech.name} className="h-8 w-8 object-contain" />
                  ) : (
                    <div className="h-8 w-8 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-[var(--color-primary)]">{tech.name.charAt(0)}</span>
                    </div>
                  )}
                  <span className="text-[11px] font-medium text-[var(--color-dark)] text-center">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA — "¿Tu empresa necesita una transformación digital similar?" */}
      <section className="w-full bg-[var(--color-primary)] py-20 md:py-28">
        <div className="container-app text-center">
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold text-white max-w-2xl mx-auto leading-[1.08] tracking-tight">
            ¿Tu empresa necesita una<br />
            <span className="text-white/80">transformación digital similar?</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            El caso de Opera demuestra que una transformación digital completa es posible en plazos ajustados y con resultados profesionales. Si tu empresa está lista para dar el siguiente paso, conversemos sobre cómo podemos ayudarte a construir tu propio ecosistema digital.
          </p>
          <Link
            href="/cotizar"
            className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-semibold text-[var(--color-primary)] transition-all duration-300 hover:bg-white/90 hover:shadow-lg"
          >
            Iniciar conversación
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}