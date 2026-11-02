'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useInView } from '@/app/hooks/useInView';
import { resolveServiceMeta } from './serviceMeta';
import ServiceCard, { type ServiceVariant } from './ServiceCard';
import type { ServiceSummary } from '@/sanity/types/service';


const BENTO_LAYOUT = [
  'sm:col-span-2 lg:col-span-2 lg:row-start-1',
  'lg:col-start-3 lg:row-start-1',
  'lg:col-start-1 lg:row-start-2',
  'sm:col-span-2 lg:col-span-2 lg:col-start-2 lg:row-start-2',
];

const BENTO_VARIANTS: ServiceVariant[] = ['hero', 'compact', 'compact', 'wide'];

export default function ServicesSectionClient({ services }: { services: ServiceSummary[] }) {
  const header = useInView<HTMLDivElement>();

  if (!services.length) return null;

  const ordered = [...services].sort(
    (a, b) => resolveServiceMeta(a.slug).priority - resolveServiceMeta(b.slug).priority
  );

  const isBento = ordered.length === 4;

  const gridClass = isBento
    ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:auto-rows-[minmax(210px,auto)]'
    : 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3';

  return (
    <section
      id="servicios"
      aria-labelledby="servicios-title"
      className="w-full bg-[var(--color-light)]"
    >
      <div className="container-app py-16 md:py-24">
        {/* ── Encabezado ── */}
        <header
          ref={header.ref}
          data-visible={header.inView}
          className="mb-16 max-w-2xl translate-y-6 opacity-0 transition-all duration-700 ease-out data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 md:mb-20"
        >
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary-bright)]">
            Nuestros servicios
          </span>
          <h2
            id="servicios-title"
            className="section-heading text-[var(--color-dark)]"
          >
            No entregamos servicios sueltos.{' '}
            <span className="text-[var(--color-primary-bright)]">Resolvemos retos de negocio.</span>
          </h2>
          <p className="mt-5 max-w-xl text-[clamp(0.95rem,1.2vw,1.1rem)] leading-relaxed text-[var(--color-dark-gray)]">
            Del software a la estrategia: un solo equipo que cubre todo tu ecosistema digital y
            responde por el resultado.
          </p>
        </header>

        {/* ── Bento de servicios ── */}
        <div className={gridClass}>
          {ordered.map((service, i) => (
            <ServiceCard
              key={service.slug}
              service={service}
              index={i}
              variant={isBento ? BENTO_VARIANTS[i] : 'compact'}
              className={isBento ? BENTO_LAYOUT[i] : ''}
            />
          ))}
        </div>

        {/* ── CTA de cierre ── */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-[var(--color-primary)]/10 bg-[var(--color-primary)]/[0.04] p-8 md:mt-20 md:flex-row md:items-center md:p-10">
          <div>
            <p className="text-lg font-semibold text-[var(--color-dark)]">
              ¿No sabes qué servicio necesitas?
            </p>
            <p className="mt-1 text-sm text-[var(--color-dark-gray)]">
              Diagnosticamos tu caso y te decimos por dónde empezar, sin compromiso.
            </p>
          </div>
          <Link
            href="/cotizar"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3.5 text-sm font-semibold text-white min-h-[44px] shadow-sm transition-all duration-300 hover:bg-[var(--color-secondary)] hover:shadow-md active:scale-[0.97]"
          >
            Solicitar diagnóstico
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}
