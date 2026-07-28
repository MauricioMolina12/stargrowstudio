'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useInView } from '@/app/hooks/useInView';
import type { ProjectListItem } from '@/sanity/types/project';

type Props = {
  projects: ProjectListItem[];
};

/** Acento por proyecto para dar identidad visual única. */
const PROJECT_ACCENTS: Record<string, string> = {
  'opera-multiservicios': '#5656b5',
};

const DEFAULT_ACCENT = '#5656b5';

const staggerDelay = (i: number) => `${i * 120}ms`;

export default function GalleryWalk({ projects }: Props) {
  const { ref, inView } = useInView<HTMLElement>();

  if (!projects.length) return null;

  return (
    <section
      id="casos-de-exito"
      ref={ref}
      aria-labelledby="gallery-heading"
      className="w-full bg-white overflow-hidden"
    >
      {/* Header */}
      <div className="container-app py-16 md:py-20">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
          Casos de éxito
        </span>
        <h2
          id="gallery-heading"
          className="mt-4 max-w-3xl font-bold leading-[1.08] tracking-tight section-heading text-[var(--color-dark)]"
        >
          Historias de{' '}
          <span className="text-[var(--color-primary)]">transformación digital</span>
        </h2>
        <p className="mt-4 max-w-xl text-[clamp(0.95rem,1.2vw,1.1rem)] leading-relaxed text-[var(--color-dark-gray)]">
          Cada proyecto representa una empresa que evolucionó. Conoce sus historias.
        </p>
      </div>

      {/* ── DESKTOP: Editorial spread grid (lg+) ── */}
      <div className="hidden lg:block container-app pb-20">
        <div className="grid grid-cols-4 gap-5 auto-rows-[minmax(220px,auto)]">
          {projects.map((project, i) => {
            const accent = PROJECT_ACCENTS[project.slug] ?? DEFAULT_ACCENT;

            // Primer proyecto: hero (2×2) si solo hay 1, o si hay más
            if (i === 0) {
              return (
                <div
                  key={project._id}
                  className={`col-span-2 row-span-2 transition-all duration-700 ease-out ${
                    inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: staggerDelay(i) }}
                >
                  <EditorialHero project={project} accent={accent} />
                </div>
              );
            }

            // Segundo proyecto: featured (2×1, lado derecho del hero)
            if (i === 1) {
              return (
                <div
                  key={project._id}
                  className={`col-span-2 transition-all duration-700 ease-out ${
                    inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: staggerDelay(i) }}
                >
                  <EditorialFeatured project={project} accent={accent} />
                </div>
              );
            }

            // Tercer proyecto: standard (1 columna)
            if (i === 2) {
              return (
                <div
                  key={project._id}
                  className={`col-span-1 transition-all duration-700 ease-out ${
                    inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: staggerDelay(i) }}
                >
                  <EditorialStandard project={project} accent={accent} />
                </div>
              );
            }

            // Cuarto proyecto: standard (1 columna)
            if (i === 3) {
              return (
                <div
                  key={project._id}
                  className={`col-span-1 transition-all duration-700 ease-out ${
                    inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: staggerDelay(i) }}
                >
                  <EditorialStandard project={project} accent={accent} />
                </div>
              );
            }

            // Resto: thumbnail cards en fila
            return (
              <div
                key={project._id}
                className={`col-span-1 transition-all duration-700 ease-out ${
                  inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: staggerDelay(i % 4) }}
              >
                <EditorialThumb project={project} accent={accent} />
              </div>
            );
          })}
        </div>

        {/* CTA ver todos */}
        <div className="mt-12 text-center">
          <Link
            href="/proyectos"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-7 py-3.5 text-sm font-semibold text-white min-h-[44px] transition-all duration-300 hover:bg-[var(--color-secondary)] active:scale-[0.97]"
          >
            Ver todos los proyectos
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* ── MOBILE/TABLET: Lista vertical editorial (< lg) ── */}
      <div className="container-app pb-16 lg:hidden">
        <div className="flex flex-col gap-6">
          {projects.map((project, i) => {
            const accent = PROJECT_ACCENTS[project.slug] ?? DEFAULT_ACCENT;
            return (
              <div
                key={project._id}
                className={`transition-all duration-700 ease-out ${
                  inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: staggerDelay(i) }}
              >
                <EditorialMobile project={project} accent={accent} />
              </div>
            );
          })}
        </div>

        {/* CTA ver todos */}
        <div className="mt-10 text-center">
          <Link
            href="/proyectos"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-7 py-3.5 text-sm font-semibold text-white min-h-[44px] transition-all duration-300 hover:bg-[var(--color-secondary)] active:scale-[0.97]"
          >
            Ver todos los proyectos
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   Editorial Block Variants
   ═══════════════════════════════════════════════ */

/* ── Hero: imagen grande + texto superpuesto ── */
function EditorialHero({ project, accent }: { project: ProjectListItem; accent: string }) {
  const imageUrl = project.seoLogo || project.cover;
  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className="group relative block w-full h-full min-h-[440px] rounded-2xl overflow-hidden bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={project.name}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0" style={{ backgroundColor: `color-mix(in srgb, ${accent} 15%, black)` }} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-7">
        <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50 mb-2">
          {project.client?.name || 'Proyecto'}
        </span>
        <h3 className="text-2xl font-bold text-white leading-tight">{project.name}</h3>
        {project.summary && (
          <p className="mt-1.5 text-sm text-white/70 max-w-md line-clamp-2">{project.summary}</p>
        )}
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-all duration-300 group-hover:gap-2.5">
          Ver caso de éxito
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

/* ── Featured: texto + imagen lado a lado ── */
function EditorialFeatured({ project, accent }: { project: ProjectListItem; accent: string }) {
  const imageUrl = project.seoLogo || project.cover;
  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className="group relative w-full min-h-[210px] rounded-2xl overflow-hidden bg-white border border-black/[0.06] flex items-stretch focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] hover:shadow-[0_8px_25px_-12px_rgba(0,0,0,0.12)] transition-all duration-500"
    >
      <div className="flex-1 p-6 flex flex-col justify-center">
        <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.15em] mb-1.5" style={{ color: accent }}>
          {project.client?.name || 'Proyecto'}
        </span>
        <h3 className="text-lg font-bold text-[var(--color-dark)] leading-snug">{project.name}</h3>
        {project.summary && (
          <p className="mt-1 text-sm text-[var(--color-dark-gray)] line-clamp-2">{project.summary}</p>
        )}
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-2.5" style={{ color: accent }}>
          Ver caso
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
      {imageUrl && (
        <div className="w-[180px] shrink-0 overflow-hidden">
          <img
            src={imageUrl}
            alt={project.name}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
    </Link>
  );
}

/* ── Standard: vertical compacto ── */
function EditorialStandard({ project, accent }: { project: ProjectListItem; accent: string }) {
  const imageUrl = project.seoLogo || project.cover;
  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className="group relative block w-full min-h-[280px] rounded-2xl overflow-hidden bg-[var(--color-dark)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={project.name}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0" style={{ backgroundColor: `color-mix(in srgb, ${accent} 15%, black)` }} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50 mb-1.5">
          {project.client?.name || 'Proyecto'}
        </span>
        <h3 className="text-base font-bold text-white leading-snug">{project.name}</h3>
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-white/80 transition-all duration-300 group-hover:gap-2">
          Ver caso
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}

/* ── Thumbnail: compacto para proyectos extra ── */
function EditorialThumb({ project, accent }: { project: ProjectListItem; accent: string }) {
  const imageUrl = project.seoLogo || project.cover;
  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className="group relative block w-full aspect-[4/3] rounded-xl overflow-hidden bg-[var(--color-dark)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={project.name}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0" style={{ backgroundColor: `color-mix(in srgb, ${accent} 20%, black)` }} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-sm font-bold text-white leading-snug">{project.name}</h3>
        <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-white/70">
          Ver caso
          <ArrowRight className="h-2.5 w-2.5" />
        </span>
      </div>
    </Link>
  );
}

/* ── Mobile: bloque vertical 16:9 ── */
function EditorialMobile({ project, accent }: { project: ProjectListItem; accent: string }) {
  const imageUrl = project.seoLogo || project.cover;
  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className="group relative block w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[var(--color-dark)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] active:scale-[0.98] transition-all duration-300"
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={project.name}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0" style={{ backgroundColor: `color-mix(in srgb, ${accent} 15%, black)` }} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50 mb-1">
          {project.client?.name || 'Proyecto'}
        </span>
        <h3 className="text-lg md:text-xl font-bold text-white leading-tight">{project.name}</h3>
        {project.summary && (
          <p className="mt-1 text-sm text-white/70 line-clamp-1">{project.summary}</p>
        )}
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-all duration-300 group-hover:gap-2.5">
          Ver caso de éxito
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}