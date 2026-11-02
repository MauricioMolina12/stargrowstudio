'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useInView } from '@/app/hooks/useInView';
import { resolveServiceMeta } from './serviceMeta';
import type { ServiceSummary } from '@/sanity/types/service';

export type ServiceVariant = 'hero' | 'compact' | 'wide';

interface ServiceCardProps {
  service: ServiceSummary;
  variant: ServiceVariant;
  /** Índice para escalonar (stagger) el reveal on-scroll. */
  index: number;
  /** Clases de posición dentro del bento (col/row span). */
  className?: string;
}

/* Clases compartidas. Hover minimalista: solo una elevación sutil, sin borde ni gradientes. */
const BASE =
  'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] ' +
  'bg-[var(--color-surface)] transition-[transform,box-shadow] duration-500 ease-out ' +
  'hover:-translate-y-1 hover:shadow-[0_10px_30px_-24px_rgba(0,0,0,0.22)] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-bright)] focus-visible:ring-offset-2 ' +
  'motion-reduce:transition-none motion-reduce:hover:translate-y-0 ' +
  // reveal on-scroll
  'translate-y-6 opacity-0 [transition-property:transform,box-shadow,opacity] ' +
  'data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100 ' +
  'motion-reduce:translate-y-0 motion-reduce:opacity-100';

export default function ServiceCard({ service, variant, index, className = '' }: ServiceCardProps) {
  const { ref, inView } = useInView<HTMLAnchorElement>();
  const meta = resolveServiceMeta(service.slug);
  const Icon = meta.icon;

  const style = {
    '--accent': meta.accent,
    '--accent-soft': meta.soft,
    transitionDelay: `${index * 90}ms`,
  } as React.CSSProperties;

  const Eyebrow = () => (
    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--accent)' }}>
      {meta.eyebrow}
    </span>
  );

  const ExploreLink = () => (
    <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
      Explorar servicio
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
    </span>
  );

  /* ── COVER ── contenedor para la portada: fondo pastel (tinte del servicio) + icono
     en el acento de la línea. En tarjetas verticales va arriba; en horizontales, a la derecha. */
  const Cover = ({ big = false, className = '' }: { big?: boolean; className?: string }) => (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden bg-[var(--accent-soft)] ${className}`}
      aria-hidden="true"
    >
      <Icon
        className={`text-[var(--accent)] ${big ? 'h-24 w-24 md:h-28 md:w-28' : 'h-16 w-16 md:h-20 md:w-20'}`}
        strokeWidth={1}
      />
    </div>
  );

  if (variant === 'hero') {
    return (
      <Link
        ref={ref}
        href={`/services/${service.path}`}
        data-visible={inView}
        style={style}
        className={`${BASE} md:flex-row ${className}`}
        aria-label={`Explorar ${service.service}`}
      >
        {/* Contenido. En móvil (vertical) queda debajo del cover; en desktop va a la izquierda. */}
        <div className="order-2 relative z-10 flex flex-col gap-5 p-8 md:order-1 md:flex-1 md:p-10">
          <span
            className="w-fit rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em]"
            style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)' }}
          >
            {meta.eyebrow}
          </span>

          <div>
            <h3 className="text-2xl font-bold tracking-tight text-[var(--color-dark)]">
              {service.service}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--color-dark-gray)] md:text-[0.95rem]">
              {service.shortDescription}
            </p>
          </div>

          {service.list && service.list.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {service.list.slice(0, 3).map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-[var(--color-border-subtle)] px-3 py-1 text-xs font-medium text-[var(--color-dark-gray)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}

          <ExploreLink />
        </div>

        {/* Portada: bg = color del servicio + icono blanco, a la derecha en horizontal. */}
        <Cover big className="order-1 min-h-[200px] w-full md:order-2 md:min-h-0 md:w-[42%]" />
      </Link>
    );
  }

  if (variant === 'wide') {
    return (
      <Link
        ref={ref}
        href={`/services/${service.path}`}
        data-visible={inView}
        style={style}
        className={`${BASE} sm:flex-row sm:items-stretch ${className}`}
        aria-label={`Explorar ${service.service}`}
      >
        <div className="order-2 flex flex-1 flex-col gap-4 p-6 sm:order-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:p-8">
          <div>
            <Eyebrow />
            <h3 className="mt-1 text-lg font-bold tracking-tight text-[var(--color-dark)] md:text-xl">
              {service.service}
            </h3>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-[var(--color-dark-gray)]">
              {service.shortDescription}
            </p>
          </div>
          <span
            className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold sm:inline-flex"
            style={{ color: 'var(--accent)' }}
          >
            Explorar
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
          </span>
        </div>

        <Cover big className="order-1 min-h-[140px] w-full sm:order-2 sm:min-h-0 sm:w-32 md:w-40" />
      </Link>
    );
  }

  return (
    <Link
      ref={ref}
      href={`/services/${service.slug}`}
      data-visible={inView}
      style={style}
      className={`${BASE} ${className}`}
      aria-label={`Explorar ${service.service}`}
    >
      {/* Portada: bg = color del servicio + icono blanco, arriba en vertical. */}
      <Cover className="aspect-[16/9] w-full shrink-0" />

      <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
        <Eyebrow />
        <div>
          <h3 className="text-lg font-bold tracking-tight text-[var(--color-dark)]">
            {service.service}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-dark-gray)] line-clamp-3">
            {service.shortDescription}
          </p>
        </div>
        <ExploreLink />
      </div>
    </Link>
  );
}
