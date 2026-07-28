'use client';

import Link from 'next/link';
import { ArrowRight, Code2, BarChart3, HeartHandshake } from 'lucide-react';
import { useInView } from '@/app/hooks/useInView';

const pillars = [
  {
    id: '01',
    icon: Code2,
    title: 'Excelencia Técnica',
    description: 'Arquitecturas modulares, seguras y preparadas para escalar sin reescrituras costosas.',
    tags: ['Escalabilidad', 'Rendimiento', 'Calidad', 'Seguridad'],
  },
  {
    id: '02',
    icon: BarChart3,
    title: 'Impacto de Negocio',
    description: 'Cada decisión técnica responde a un objetivo medible: más conversión, menos costos, mejor experiencia.',
    tags: ['Resultados', 'Eficiencia', 'Conversión', 'Datos'],
  },
  {
    id: '03',
    icon: HeartHandshake,
    title: 'Relación a Largo Plazo',
    description: 'Te acompañamos desde el descubrimiento hasta la evolución continua del producto.',
    tags: ['Transparencia', 'Soporte', 'Confianza', 'Continuidad'],
  },
];

const staggerDelays = ['0ms', '100ms', '200ms'];

const accent = 'var(--color-primary)';

export default function TrustSection() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className="w-full bg-white py-20 md:py-28"
      aria-labelledby="trust-heading"
    >
      <div className="container-app">
        {/* ── Eyebrow + Headline ── */}
        <header className="mb-14 md:mb-20">
          <span
            className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            Por qué Star Grow Studio
          </span>
          <h2
            id="trust-heading"
            className={`section-heading max-w-3xl text-[var(--color-dark)] transition-all duration-700 ease-out ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            Construimos relaciones,{' '}
            <span style={{ color: accent }}>no solo código</span>
          </h2>
        </header>

        {/* ── Three blocks ── */}
        <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <PillarBlock
              key={pillar.id}
              pillar={pillar}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* ── Trust CTA ── */}
        <div
          className={`mt-16 flex flex-col items-center justify-between gap-6 rounded-2xl border border-black/[0.06] bg-[var(--color-light)] px-8 py-7 text-center transition-all duration-700 delay-500 ease-out md:mt-24 md:flex-row md:text-left ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[var(--color-dark)]">+120</span>
            <span className="text-[var(--color-dark-gray)]">
              proyectos entregados con resultados medibles
            </span>
          </div>
          <Link
            href="/cotizar"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3.5 text-sm font-semibold text-white min-h-[44px] transition-all duration-300 hover:bg-[var(--color-secondary)] active:scale-[0.97]"
          >
            Hablemos de tu proyecto
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Pillar block ─────────── */

function PillarBlock({
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
      className={`flex flex-col gap-4 transition-all duration-700 ease-out ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: staggerDelays[index] }}
    >
      {/* Accent bar */}
      <div className="h-1 w-10 rounded-full" style={{ backgroundColor: accent }} />

      {/* Icon + number row */}
      <div className="flex items-center gap-3">
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold"
          style={{
            backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)`,
            color: accent,
          }}
        >
          {pillar.id}
        </span>
        {/* <Icon className="h-5 w-5" style={{ color: accent }} strokeWidth={1.5} /> */}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-[var(--color-dark)]">{pillar.title}</h3>

      {/* Description — max 2 lines */}
      <p className="text-sm leading-relaxed text-[var(--color-dark-gray)] line-clamp-2">
        {pillar.description}
      </p>

      {/* Tags */}
      <div className="mt-1 flex flex-wrap gap-1.5">
        {pillar.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-black/[0.08] px-2.5 py-1 text-[0.7rem] font-medium text-[var(--color-dark-gray)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}