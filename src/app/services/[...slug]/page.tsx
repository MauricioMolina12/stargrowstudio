import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight, FolderKanban } from "lucide-react";
import type { CSSProperties } from "react";

import { getServiceByPath, getServiceSlugParams } from "@/sanity/data/services";
import { getProjectsByService } from "@/sanity/data/projects";
import type { ServiceDetail } from "@/sanity/types/service";
import { PortableTextRenderer } from "@/sanity/portableText";
import { getIcon } from "@/app/components/layout/nav/iconMap";
import { resolveServiceMeta } from "@/app/components/shared/ServicesSection/serviceMeta";
import SliderAutomatic from "@/app/components/shared/SliderAutomatic";
import { FaqSection } from "@/app/components/services/FaqSection";

type Params = { slug: string[] };

/** Revalidate cada 5 minutos en background (ISR). */
export const revalidate = 300;

/* ─────── Estilos de hero personalizados por servicio ─────── */

interface HeroStyle {
  /** Desplazamiento horizontal de la imagen (CSS `left`) */
  left?: string;
  /** Transformación aplicada a la imagen */
  transform?: string;
  /** Gradiente superpuesto sobre la imagen (overlay) */
  gradient?: string;
  /** Máscara CSS para difuminar bordes (mask-image) */
  mask?: string;
}

/**
 * Mapa de estilos individuales por slug de servicio.
 * Para agregar un nuevo servicio solo añade una entrada aquí.
 * Si no hay entrada, se usan los valores por defecto.
 */
const heroStylesBySlug: Record<string, HeroStyle> = {
  "desarrollo-de-software": {
    left: "clamp(30px, 8vw, 150px)",
    transform: "scale(clamp(1.15, 0.8vw + 0.4rem, 1.85))",
    gradient:
      "linear-gradient(135deg, transparent 60%, #FAFAFA 100%), linear-gradient(90deg, transparent 70%, #FAFAFA 100%)",
  },
  eventos: {
    left: "clamp(20px, 5vw, 60px)",
    transform: "scale(clamp(1.15, 0.8vw + 0.4rem, 1.85))",
    mask: "radial-gradient(ellipse 80% 75% at 50% 50%, black 40%, black 70%, transparent 100%)",
    gradient:
      "radial-gradient(ellipse 100% 90% at 50% 50%, transparent 60%, #FAFAFA 100%)",
  },
};

/** Obtiene los estilos de hero para un slug dado (fallback a vacío). */
function getHeroStyle(slug: string): HeroStyle {
  return heroStylesBySlug[slug] ?? {};
}

/* ────────────────────────────────────────────────────────── */

/** Pre-genera todas las rutas de servicio (padres e hijos) en build. */
export async function generateStaticParams() {
  try {
    const params = await getServiceSlugParams();
    return params.map(({ segments }) => ({ slug: segments }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceByPath(slug);
  if (!service) return { title: "Servicio no encontrado" };

  const title = service.seo?.metaTitle || `${service.service} | Star Grow Studio`;
  const description = service.seo?.metaDescription || service.shortDescription;
  const ogImage = service.seo?.ogImage || service.mainImage || undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = await getServiceByPath(slug);
  if (!service) notFound();

  const { slug: serviceSlug, parent } = service;
  const accent = resolveServiceMeta(parent?.slug ?? serviceSlug).accent;
  const heroStyle = getHeroStyle(serviceSlug);

  return (
    <main className="w-full bg-[var(--color-light)]">
      <ServiceHero service={service} accent={accent} heroStyle={heroStyle} />

      <div className="container-app flex flex-col gap-20 py-20 md:gap-28 md:py-28">
        {service.fullDescription && (
          <section className="grid gap-10 lg:grid-cols-[1fr_280px]">
            <div className="max-w-3xl text-[var(--color-dark)]">
              <PortableTextRenderer value={service.fullDescription} />
            </div>
            <aside className="hidden lg:flex lg:flex-col gap-6">
              <DescriptionSidebar service={service} accent={accent} />
            </aside>
          </section>
        )}

        <Benefits service={service} accent={accent} />
        <Features service={service} accent={accent} />
        <Process service={service} accent={accent} />
        {service.faq?.length ? <FaqSection faq={service.faq} accent={accent} /> : null}
        <SubServices service={service} accent={accent} />
      </div>

      {service.techs && service.techs.length > 0 && (
        <section className="w-full py-8">
          <header className="mb-6 flex flex-col items-center gap-2 px-4 text-center">
            <span className="text-sm text-[var(--color-primary-bright)]">
              Adaptamos la tecnología a tu proyecto, no al revés.
            </span>
            <h2 className="text-3xl font-bold lg:text-4xl">Nuestras tecnologías</h2>
          </header>
          <SliderAutomatic
            items={service.techs
              .filter((t) => t.image)
              .map((t) => ({ name: t.name, image: t.image as string }))}
          />
        </section>
      )}

      <RelatedProjects serviceId={service._id} accent={accent} />

      <FinalCta service={service} />
    </main>
  );
}

/* ─────────────────────────── Secciones ─────────────────────────── */

function ServiceHero({
  service,
  accent,
  heroStyle,
}: {
  service: ServiceDetail;
  accent: string;
  heroStyle: HeroStyle;
}) {
  const Icon = getIcon(service.iconName ?? undefined);
  const heading = service.hero?.heading || service.service;
  const subheading = service.hero?.subheading || service.shortDescription;
  const image = service.hero?.image || service.mainImage;
  const ctas =
    service.hero?.ctas && service.hero.ctas.length > 0
      ? service.hero.ctas.map((cta) => ({
          ...cta,
          href: cta.href || "/cotizar",
        }))
      : [{ label: "Solicitar diagnóstico", href: "/cotizar", style: "primary" as const }];

  const hasCustomStyle = Object.keys(heroStyle).length > 0;
  const maskStyle: CSSProperties | undefined = heroStyle.mask
    ? ({ WebkitMaskImage: heroStyle.mask, maskImage: heroStyle.mask } as CSSProperties)
    : undefined;

  return (
    <section className="w-full border-b border-[var(--color-border-subtle)]">
      <div className="container-app grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2">
        <div>
          <Breadcrumb service={service} />
          <span
            className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)`, color: accent }}
          >
            <Icon className="h-6 w-6" strokeWidth={1.75} />
          </span>
          <h1 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-[var(--color-dark)]">
            {heading}
          </h1>
          <p className="mt-5 max-w-xl text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed text-[var(--color-dark-gray)]">
            {subheading}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {ctas.map((cta, i) => {
              const primary = cta.style !== "secondary";
              return (
                <Link
                  key={i}
                  href={cta.href}
                  className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                    primary
                      ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)]"
                      : "border border-[var(--color-border-subtle)] text-[var(--color-dark)] hover:border-[var(--color-primary-bright)]"
                  }`}
                >
                  {cta.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>
        </div>

        {image && (
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            style={maskStyle}
          >
            {/* Overlay con gradiente si el servicio lo define */}
            {heroStyle.gradient && (
              <div
                className="pointer-events-none absolute inset-0 z-10"
                style={{ background: heroStyle.gradient }}
              />
            )}

            <Image
              src={image}
              alt={service.hero?.imageAlt || service.mainImageAlt || service.service}
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-contain"
              style={{
                left: heroStyle.left ?? 0,
                transform: heroStyle.transform ?? "scale(clamp(1.15, 0.8vw + 0.8rem, 1.85))",
              }}
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}

function Breadcrumb({ service }: { service: ServiceDetail }) {
  return (
    <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-1.5 text-sm text-[var(--color-dark-gray)]">
      <Link href="/" className="hover:text-[var(--color-primary-bright)]">
        Inicio
      </Link>
      {/* {service.parent && (
        <>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/services/${service.parent.path}`} prefetch={true} className="hover:text-[var(--color-primary-bright)]">
            {service.parent.service}
          </Link>
        </>
      )} */}
      <ChevronRight className="h-3.5 w-3.5" />
      <span className="font-medium text-[var(--color-dark)]">{service.service}</span>
    </nav>
  );
}

function SectionHeading({ eyebrow, title, accent }: { eyebrow: string; title: string; accent: string }) {
  return (
    <header className="mb-10 max-w-2xl">
      <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>
        {eyebrow}
      </span>
      <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-tight text-[var(--color-dark)]">
        {title}
      </h2>
    </header>
  );
}

function Benefits({ service, accent }: { service: ServiceDetail; accent: string }) {
  if (!service.benefits?.length) return null;
  return (
    <section>
      <SectionHeading eyebrow="Beneficios" title="Lo que ganas" accent={accent} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {service.benefits.map((b, i) => {
          const Icon = getIcon(b.iconName ?? undefined);
          return (
            <article key={i} className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6">
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)`, color: accent }}
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 text-base font-bold text-[var(--color-dark)]">{b.title}</h3>
              {b.description && (
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-dark-gray)]">{b.description}</p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Features({ service, accent }: { service: ServiceDetail; accent: string }) {
  if (!service.features?.length) return null;
  return (
    <section>
      <SectionHeading eyebrow="Características" title="Qué incluye" accent={accent} />
      <div className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
        {service.features.map((f, i) => (
          <div key={i} className="flex items-start gap-3 border-b border-[var(--color-border-subtle)] pb-5">
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: `color-mix(in srgb, ${accent} 14%, transparent)`, color: accent }}
            >
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
            <div>
              <h3 className="text-[0.95rem] font-semibold text-[var(--color-dark)]">{f.title}</h3>
              {f.description && (
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-dark-gray)]">{f.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Process({ service, accent }: { service: ServiceDetail; accent: string }) {
  if (!service.process?.length) return null;
  return (
    <section>
      <SectionHeading eyebrow="Proceso" title="Cómo trabajamos" accent={accent} />
      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {service.process.map((p, i) => (
          <li key={i} className="relative rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6">
            <span className="text-3xl font-bold" style={{ color: accent }}>
              {String(p.step ?? i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-base font-bold text-[var(--color-dark)]">{p.title}</h3>
            {p.description && (
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-dark-gray)]">{p.description}</p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

function SubServices({ service, accent }: { service: ServiceDetail; accent: string }) {
  if (!service.children?.length) return null;
  return (
    <section>
      <SectionHeading eyebrow="Explora" title="Servicios relacionados" accent={accent} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {service.children.map((child) => {
          const Icon = getIcon(child.iconName ?? undefined);
          return (
            <Link
              key={child.slug}
              href={`/services/${child.path}`}
              prefetch={true}
              className="group flex flex-col rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)`, color: accent }}
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 text-base font-bold text-[var(--color-dark)]">{child.service}</h3>
              {child.shortDescription && (
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-dark-gray)]">
                  {child.shortDescription}
                </p>
              )}
              <span
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: accent }}
              >
                Ver más
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function DescriptionSidebar({ service, accent }: { service: ServiceDetail; accent: string }) {
  const Icon = getIcon(service.iconName ?? undefined);
  return (
    <div className="sticky top-24 flex flex-col gap-6">
      {/* Tarjeta del servicio */}
      <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6">
        <span
          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)`, color: accent }}
        >
          <Icon className="h-7 w-7" strokeWidth={1.75} />
        </span>
        <h3 className="mt-5 text-lg font-bold text-[var(--color-dark)]">{service.service}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-dark-gray)]">
          {service.shortDescription}
        </p>
        {service.badge && (
          <span
            className="mt-4 inline-block rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)`, color: accent }}
          >
            {service.badge}
          </span>
        )}
      </div>

      {/* CTA rápida */}
      <Link
        href="/cotizar"
        className="group flex items-center justify-between rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-5 transition-all duration-300 hover:border-[var(--color-primary-bright)]"
      >
        <span className="text-sm font-semibold text-[var(--color-dark)]">¿Hablamos?</span>
        <ArrowRight className="h-4 w-4 text-[var(--color-primary-bright)] transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

async function RelatedProjects({ serviceId, accent }: { serviceId: string; accent: string }) {
  const projects = await getProjectsByService(serviceId);
  if (!projects.length) return null;

  return (
    <section className="w-full border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)] py-16">
      <div className="container-app">
        <header className="mb-10 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>
            Casos de éxito
          </span>
          <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-tight text-[var(--color-dark)]">
            Proyectos relacionados
          </h2>
        </header>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Link
              key={p._id}
              href={`/proyectos/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-24px_rgba(0,0,0,0.22)]"
            >
              {p.cover ? (
                <div className="aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.cover}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center bg-[var(--color-hover)]">
                  <FolderKanban className="h-10 w-10 text-[var(--color-dark-gray)]/20" strokeWidth={1} />
                </div>
              )}
              <div className="flex flex-col gap-1.5 p-5">
                {p.client && (
                  <span className="text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: accent }}>
                    {p.client.name}
                  </span>
                )}
                <h3 className="text-base font-bold text-[var(--color-dark)]">{p.name}</h3>
                <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: accent }}>
                  Ver caso de éxito
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ service }: { service: ServiceDetail }) {
  const cta = service.cta;
  const heading = cta?.heading || `¿Listo para avanzar con ${service.service}?`;
  const description = cta?.description || "Cuéntanos tu caso y te proponemos el siguiente paso, sin compromiso.";
  const label = cta?.label || "Solicitar diagnóstico";
  const href = cta?.href || "/cotizar";

  return (
    <section className="w-full border-t border-[var(--color-border-subtle)] bg-[var(--color-primary)]/[0.04]">
      <div className="container-app flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center md:py-16">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--color-dark)]">{heading}</h2>
          <p className="mt-2 max-w-xl text-[var(--color-dark-gray)]">{description}</p>
        </div>
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-primary)] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[var(--color-secondary)]"
        >
          {label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}