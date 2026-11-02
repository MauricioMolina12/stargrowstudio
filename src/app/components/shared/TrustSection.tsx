'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Code2,
  BarChart3,
  HeartHandshake,
  Compass,
  Layers,
  Cpu,
} from 'lucide-react';
import { useInView } from '@/app/hooks/useInView';

const identityDimensions = [
  {
    icon: Compass,
    title: 'Estrategia & Branding',
    detail: 'Marcas memorables con propósito comercial.',
  },
  {
    icon: Layers,
    title: 'Diseño UI/UX',
    detail: 'Interfaces intuitivas que retienen y convierten.',
  },
  {
    icon: Cpu,
    title: 'Software a Medida',
    detail: 'Tecnología rápida, segura y lista para escalar.',
  },
];

const pillars = [
  {
    id: '01',
    icon: Code2,
    title: 'Excelencia Técnica',
    description: 'Arquitecturas modulares y seguras para crecer sin reescrituras.',
    tags: ['Escalabilidad', 'Rendimiento', 'Seguridad'],
  },
  {
    id: '02',
    icon: BarChart3,
    title: 'Impacto de Negocio',
    description: 'Diseñamos para lograr más conversión, eficiencia y retorno.',
    tags: ['Conversión', 'ROI', 'Datos'],
  },
  {
    id: '03',
    icon: HeartHandshake,
    title: 'Socio a Largo Plazo',
    description: 'Te acompañamos desde la idea inicial hasta la evolución continua.',
    tags: ['Transparencia', 'Soporte', 'Continuidad'],
  },
];

const staggerDelays = ['0ms', '100ms', '200ms'];

export default function TrustSection() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className="w-full bg-[var(--color-surface)] py-20 md:py-28"
      aria-labelledby="trust-heading"
    >
      <div className="container-app">
        {/* ── Bloque 1: ¿Qué es Star Grow Studio? (Directo y conciso) ── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div
            className={`lg:col-span-6 transition-all duration-700 ease-out ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary-bright)]">
              ¿Qué es Star Grow Studio?
            </span>

            <h2
              id="trust-heading"
              className="section-heading mt-3 text-[var(--color-primary-to-white)]"
            >
              Construimos relaciones,{' '}
              <span className="text-[var(--color-primary-bright)]">no solo código.</span>
            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--color-dark-gray)] sm:text-lg">
              Somos un estudio de transformación digital que une{' '}
              <strong className="font-semibold text-[var(--color-primary-to-white)]">
                marca, diseño UI/UX y desarrollo de software
              </strong>{' '}
              en un solo equipo para impulsar tu negocio.
            </p>
          </div>

          {/* Tarjeta compacta de 3 disciplinas */}
          <div
            className={`lg:col-span-6 transition-all duration-700 delay-150 ease-out ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {identityDimensions.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-light)] p-5"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary-bright)]">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-[var(--color-primary-to-white)]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs leading-snug text-[var(--color-dark-gray)]">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Bloque 2: Por qué Star Grow Studio (3 Pilares cortos) ── */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-3 md:items-stretch">
          {pillars.map((pillar, i) => (
            <PillarCard
              key={pillar.id}
              pillar={pillar}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* ── Barra inferior de respaldo + CTA ── */}
        <div
          className={`mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-[var(--color-primary)]/15 bg-[var(--color-light)] px-7 py-6 text-center transition-all duration-700 delay-300 ease-out md:mt-14 md:flex-row md:px-9 md:text-left ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-baseline gap-2.5">
            <span className="text-3xl font-bold tracking-tight text-[var(--color-primary-to-white)]">
              +120
            </span>
            <span className="text-sm font-medium text-[var(--color-dark-gray)]">
              proyectos entregados con resultados medibles
            </span>
          </div>
          <Link
            href="/cotizar"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white min-h-[44px] shadow-xs transition-all duration-300 hover:bg-[var(--color-secondary)] active:scale-[0.97]"
          >
            Hablemos de tu proyecto
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Tarjeta de Pilar Concisa ─────────── */

function PillarCard({
  pillar,
  index,
  inView,
}: {
  pillar: (typeof pillars)[number];
  index: number;
  inView: boolean;
}) {
  const Icon = pillar.icon;

  return (
    <article
      className={`group flex h-full flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-light)] p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[var(--color-primary-bright)]/35 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: staggerDelays[index] }}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-primary)]/12 text-xs font-bold text-[var(--color-primary-bright)]">
            {pillar.id}
          </span>
          <Icon className="h-5 w-5 text-[var(--color-primary-bright)]" strokeWidth={1.75} />
        </div>

        <h3 className="mt-4 text-base font-bold text-[var(--color-primary-to-white)]">
          {pillar.title}
        </h3>

        <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-dark-gray)]">
          {pillar.description}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5 border-t border-[var(--color-border-subtle)] pt-3.5">
        {pillar.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-dark-gray)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
