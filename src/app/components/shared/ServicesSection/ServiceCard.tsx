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
  'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] ' +
  'bg-white transition-[transform,box-shadow] duration-500 ease-out ' +
  'hover:-translate-y-1 hover:shadow-[0_10px_30px_-24px_rgba(0,0,0,0.22)] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 ' +
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
    transitionDelay: `${index * 90}ms`,
  } as React.CSSProperties;

  const IconChip = ({ big = false }: { big?: boolean }) => (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-xl transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100 ${
        big ? 'h-12 w-12' : 'h-11 w-11'
      }`}
      style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)' }}
    >
      <Icon className={big ? 'h-6 w-6' : 'h-5 w-5'} strokeWidth={1.75} />
    </span>
  );

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

  /* Visual reutilizable: imagen si existe; si no, panel de tinte sólido con marca de agua. */
  const Visual = ({ className: c = '' }: { className?: string }) => (
    <div className={`relative overflow-hidden ${c}`}>
      {service.image ? (
        <img
          src={service.image}
          alt={service.alt || service.service}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:group-hover:scale-100"
          loading="lazy"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 8%, white)' }}
        >
          <Icon
            className="absolute -bottom-4 -right-3 h-40 w-40 opacity-[0.08]"
            style={{ color: 'var(--accent)' }}
            strokeWidth={1}
          />
        </div>
      )}
    </div>
  );

  /* ── HERO ── servicio núcleo: horizontal (texto + visual), tamaño contenido. */
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
        <div className="relative z-10 flex flex-col gap-5 p-8 md:flex-1 md:p-10">
          <div className="flex items-center justify-between gap-3">
            <IconChip big />
            <span
              className="rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em]"
              style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)' }}
            >
              {meta.eyebrow}
            </span>
          </div>

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
                  className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium text-[var(--color-dark-gray)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}

          <ExploreLink />
        </div>

        <div className="flex min-h-[180px] items-center justify-center md:w-[42%]">
          <div
            className="flex h-32 w-32 items-center justify-center rounded-3xl md:h-40 md:w-40"
            style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 10%, white)' }}
          >
            <Icon className="h-16 w-16 md:h-20 md:w-20" style={{ color: 'var(--accent)' }} strokeWidth={1.25} />
          </div>
        </div>
      </Link>
    );
  }

  /* ── WIDE ── banda ancha (Consultoría): layout horizontal. */
  if (variant === 'wide') {
    return (
      <Link
        ref={ref}
        href={`/services/${service.path}`}
        data-visible={inView}
        style={style}
        className={`${BASE} !flex-row items-center justify-between gap-6 p-6 md:p-8 ${className}`}
        aria-label={`Explorar ${service.service}`}
      >
        <div className="flex items-start gap-4 md:items-center">
          <IconChip />
          <div>
            <Eyebrow />
            <h3 className="mt-1 text-lg font-bold tracking-tight text-[var(--color-dark)] md:text-xl">
              {service.service}
            </h3>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-[var(--color-dark-gray)]">
              {service.shortDescription}
            </p>
          </div>
        </div>
        <span
          className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold sm:inline-flex"
          style={{ color: 'var(--accent)' }}
        >
          Explorar
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
        </span>
      </Link>
    );
  }

  /* ── COMPACT ── tarjeta mediana, guiada por icono. */
  return (
    <Link
      ref={ref}
      href={`/services/${service.slug}`}
      data-visible={inView}
      style={style}
      className={`${BASE} gap-4 p-6 md:p-7 ${className}`}
      aria-label={`Explorar ${service.service}`}
    >
      <IconChip />
      <div>
        <Eyebrow />
        <h3 className="mt-1 text-lg font-bold tracking-tight text-[var(--color-dark)]">
          {service.service}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-dark-gray)] line-clamp-3">
          {service.shortDescription}
        </p>
      </div>
      <ExploreLink />
    </Link>
  );
}
