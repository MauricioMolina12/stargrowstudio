'use client';

import { useState } from 'react';
import { ArrowRight, Check, Minus, CircleDot, Sparkles } from 'lucide-react';
import { useInView } from '@/app/hooks/useInView';

export type ComparisonStatus = 'full' | 'partial' | 'limited';

export type CompetitorKey = 'starGrow' | 'agencies' | 'freelancers' | 'softwareHouses';

export type ComparisonCell = {
  status: ComparisonStatus;
  note: string;
};

export type ComparisonRow = {
  id: string;
  criterion: string;
  values: Record<CompetitorKey, ComparisonCell>;
};

export type AlternativeColumn = {
  key: CompetitorKey;
  title: string;
  shortTitle: string;
  subtitle: string;
  highlighted?: boolean;
};

/**
 * Configuración editable de columnas y criterios comparativos con micro-textos directos.
 */
export const COMPARISON_COLUMNS: AlternativeColumn[] = [
  {
    key: 'starGrow',
    title: 'Star Grow Studio',
    shortTitle: 'Star Grow Studio',
    subtitle: 'Estrategia + Diseño + Código',
    highlighted: true,
  },
  {
    key: 'agencies',
    title: 'Agencias digitales tradicionales',
    shortTitle: 'Agencias tradicionales',
    subtitle: 'Foco publicitario',
  },
  {
    key: 'freelancers',
    title: 'Freelancers',
    shortTitle: 'Freelancers',
    subtitle: 'Trabajo independiente',
  },
  {
    key: 'softwareHouses',
    title: 'Empresas de software convencionales',
    shortTitle: 'Software convencional',
    subtitle: 'Foco solo en código',
  },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    id: '01',
    criterion: 'Desarrollo de software a medida',
    values: {
      starGrow: { status: 'full', note: '100% a medida' },
      agencies: { status: 'limited', note: 'Plantillas / CMS' },
      freelancers: { status: 'partial', note: 'Según perfil' },
      softwareHouses: { status: 'full', note: 'A medida' },
    },
  },
  {
    id: '02',
    criterion: 'Diseño UI/UX integrado al desarrollo',
    values: {
      starGrow: { status: 'full', note: 'Integrado nativo' },
      agencies: { status: 'partial', note: 'Sin ingeniería' },
      freelancers: { status: 'partial', note: 'Por separado' },
      softwareHouses: { status: 'limited', note: 'Solo funcional' },
    },
  },
  {
    id: '03',
    criterion: 'Estrategia e identidad de marca',
    values: {
      starGrow: { status: 'full', note: 'Visión 360°' },
      agencies: { status: 'full', note: 'Foco campañas' },
      freelancers: { status: 'partial', note: 'Piezas sueltas' },
      softwareHouses: { status: 'limited', note: 'No incluido' },
    },
  },
  {
    id: '04',
    criterion: 'Acompañamiento durante todo el proyecto',
    values: {
      starGrow: { status: 'full', note: 'De inicio a fin' },
      agencies: { status: 'partial', note: 'Por entregas' },
      freelancers: { status: 'partial', note: 'Según agenda' },
      softwareHouses: { status: 'partial', note: 'Por hitos' },
    },
  },
  {
    id: '05',
    criterion: 'Soluciones adaptadas a las necesidades del negocio',
    values: {
      starGrow: { status: 'full', note: 'Orientadas a ROI' },
      agencies: { status: 'partial', note: 'Métricas de alcance' },
      freelancers: { status: 'partial', note: 'Por encargo' },
      softwareHouses: { status: 'partial', note: 'Alcance cerrado' },
    },
  },
  {
    id: '06',
    criterion: 'Comunicación directa con el equipo',
    values: {
      starGrow: { status: 'full', note: 'Directa con expertos' },
      agencies: { status: 'limited', note: 'Vía ejecutivos' },
      freelancers: { status: 'full', note: 'Trato 1 a 1' },
      softwareHouses: { status: 'partial', note: 'Vía gestores' },
    },
  },
  {
    id: '07',
    criterion: 'Integración de disciplinas creativas y tecnológicas',
    values: {
      starGrow: { status: 'full', note: 'Un solo equipo' },
      agencies: { status: 'partial', note: 'Terceriza código' },
      freelancers: { status: 'limited', note: '1 sola área' },
      softwareHouses: { status: 'limited', note: 'Solo ingeniería' },
    },
  },
  {
    id: '08',
    criterion: 'Capacidad de construir soluciones escalables',
    values: {
      starGrow: { status: 'full', note: 'Alta escalabilidad' },
      agencies: { status: 'limited', note: 'Corto plazo' },
      freelancers: { status: 'limited', note: 'Capacidad limitada' },
      softwareHouses: { status: 'full', note: 'Alta escalabilidad' },
    },
  },
];

function StatusIndicator({
  status,
  highlighted = false,
}: {
  status: ComparisonStatus;
  highlighted?: boolean;
}) {
  if (status === 'full') {
    return (
      <span
        className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
          highlighted
            ? 'bg-[var(--color-primary)] text-white shadow-xs'
            : 'bg-[var(--color-primary)]/12 text-[var(--color-primary-bright)]'
        }`}
        aria-label="Incluido completamente"
      >
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>
    );
  }

  if (status === 'partial') {
    return (
      <span
        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-dark-gray)]"
        aria-label="Alcance parcial"
      >
        <CircleDot className="h-3.5 w-3.5 opacity-75" strokeWidth={1.8} />
      </span>
    );
  }

  return (
    <span
      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-subtle)] bg-transparent text-[var(--color-dark-gray)]/50"
      aria-label="Alcance limitado"
    >
      <Minus className="h-3.5 w-3.5" strokeWidth={1.8} />
    </span>
  );
}

export default function ComparisonSection() {
  const { ref, inView } = useInView<HTMLElement>();
  const [mobileCompetitor, setMobileCompetitor] = useState<Exclude<CompetitorKey, 'starGrow'>>('agencies');

  const competitors = COMPARISON_COLUMNS.filter(
    (col): col is AlternativeColumn & { key: Exclude<CompetitorKey, 'starGrow'> } =>
      col.key !== 'starGrow'
  );

  const activeMobileCol =
    competitors.find((c) => c.key === mobileCompetitor) ?? competitors[0];

  return (
    <section
      ref={ref}
      id="why-star-grow"
      aria-labelledby="comparison-heading"
      className="w-full bg-[var(--color-light)] py-20 md:py-28"
    >
      <div className="container-app">
        {/* ── Header Corto y Directo ── */}
        <header
          className={`mb-12 max-w-2xl transition-all duration-700 ease-out md:mb-16 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary-bright)]">
            La diferencia Star Grow
          </span>

          <h2
            id="comparison-heading"
            className="section-heading mt-3 text-[var(--color-primary-to-white)]"
          >
            Más que una agencia.{' '}
            <span className="text-[var(--color-primary-bright)]">Tu socio de crecimiento.</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[var(--color-dark-gray)]">
            Estrategia, diseño y tecnología en un mismo lugar para hacer avanzar tu negocio.
          </p>
        </header>

        {/* ── Vista Desktop (lg+): Tabla Comparativa Limpia ── */}
        <div
          className={`hidden lg:block transition-all duration-700 delay-150 ease-out ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div
            role="table"
            aria-label="Comparativa entre Star Grow Studio y otras alternativas"
            className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_20px_60px_-35px_rgba(86,86,181,0.12)]"
          >
            {/* Cabecera de columnas */}
            <div
              role="row"
              className="grid grid-cols-[1.4fr_1.1fr_1fr_1fr_1fr] border-b border-[var(--color-border)]"
            >
              <div role="columnheader" className="flex flex-col justify-end p-6">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-dark-gray)]">
                  Criterios clave
                </span>
              </div>

              {COMPARISON_COLUMNS.map((col) => (
                <div
                  key={col.key}
                  role="columnheader"
                  className={`relative flex flex-col justify-between p-6 ${
                    col.highlighted
                      ? 'border-x border-[var(--color-primary)]/20 bg-[var(--color-primary)]/[0.05] dark:bg-[var(--color-primary)]/[0.12]'
                      : 'border-l border-[var(--color-border-subtle)]'
                  }`}
                >
                  {col.highlighted && (
                    <div
                      className="absolute inset-x-0 top-0 h-1 bg-[var(--color-primary)]"
                      aria-hidden="true"
                    />
                  )}

                  <div>
                    {col.highlighted && (
                      <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-[var(--color-primary)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                        <Sparkles className="h-3 w-3" />
                        Recomendado
                      </span>
                    )}

                    <h3
                      className={`text-sm font-bold leading-snug ${
                        col.highlighted
                          ? 'text-[var(--color-primary-to-white)]'
                          : 'text-[var(--color-dark)]'
                      }`}
                    >
                      {col.title}
                    </h3>
                  </div>

                  <p className="mt-1 text-[11px] text-[var(--color-dark-gray)]">
                    {col.subtitle}
                  </p>
                </div>
              ))}
            </div>

            {/* Filas de criterios */}
            <div role="rowgroup" className="divide-y divide-[var(--color-border-subtle)]">
              {COMPARISON_ROWS.map((row) => (
                <div
                  key={row.id}
                  role="row"
                  className="grid grid-cols-[1.4fr_1.1fr_1fr_1fr_1fr] items-center transition-colors duration-200 hover:bg-[var(--color-hover)]/50"
                >
                  <div role="rowheader" className="flex items-center gap-3 px-6 py-4">
                    <span className="text-[11px] font-bold text-[var(--color-primary-bright)]/65">
                      {row.id}
                    </span>
                    <span className="text-sm font-semibold text-[var(--color-primary-to-white)]">
                      {row.criterion}
                    </span>
                  </div>

                  {COMPARISON_COLUMNS.map((col) => {
                    const cell = row.values[col.key];
                    return (
                      <div
                        key={col.key}
                        role="cell"
                        className={`flex items-center gap-2.5 px-6 py-4 h-full ${
                          col.highlighted
                            ? 'border-x border-[var(--color-primary)]/20 bg-[var(--color-primary)]/[0.035] dark:bg-[var(--color-primary)]/[0.09]'
                            : 'border-l border-[var(--color-border-subtle)]'
                        }`}
                      >
                        <StatusIndicator
                          status={cell.status}
                          highlighted={col.highlighted}
                        />
                        <span
                          className={`text-xs ${
                            col.highlighted
                              ? 'font-semibold text-[var(--color-primary-to-white)]'
                              : 'text-[var(--color-dark-gray)]'
                          }`}
                        >
                          {cell.note}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Vista Mobile & Tablet (< lg) ── */}
        <div
          className={`lg:hidden transition-all duration-700 delay-150 ease-out ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="mb-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-dark-gray)]">
              Comparar frente a:
            </span>
            <div
              role="tablist"
              aria-label="Seleccionar alternativa para comparar"
              className="mt-2.5 flex flex-wrap gap-2"
            >
              {competitors.map((comp) => {
                const active = comp.key === mobileCompetitor;
                return (
                  <button
                    key={comp.key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setMobileCompetitor(comp.key)}
                    className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 min-h-[38px] ${
                      active
                        ? 'bg-[var(--color-primary)] text-white shadow-xs'
                        : 'border border-[var(--color-border)] bg-[var(--color-light)] text-[var(--color-dark-gray)]'
                    }`}
                  >
                    {comp.shortTitle}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {COMPARISON_ROWS.map((row) => {
              const sgCell = row.values.starGrow;
              const compCell = row.values[mobileCompetitor];

              return (
                <article
                  key={row.id}
                  className="flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-xs font-bold text-[var(--color-primary-bright)]">
                      {row.id}
                    </span>
                    <h3 className="text-sm font-bold text-[var(--color-primary-to-white)]">
                      {row.criterion}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 rounded-xl border border-[var(--color-primary)]/25 bg-[var(--color-primary)]/[0.06] p-2.5 dark:bg-[var(--color-primary)]/[0.14]">
                      <StatusIndicator status={sgCell.status} highlighted />
                      <div className="min-w-0">
                        <span className="block text-[10px] font-bold text-[var(--color-primary-bright)]">
                          Star Grow
                        </span>
                        <span className="block truncate text-xs font-semibold text-[var(--color-primary-to-white)]">
                          {sgCell.note}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-light)] p-2.5">
                      <StatusIndicator status={compCell.status} />
                      <div className="min-w-0">
                        <span className="block truncate text-[10px] font-medium text-[var(--color-dark-gray)]">
                          {activeMobileCol.shortTitle}
                        </span>
                        <span className="block truncate text-xs text-[var(--color-dark-gray)]">
                          {compCell.note}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ── CTA Final Corto ── */}
        <div
          className={`mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[var(--color-primary)]/15 bg-[var(--color-surface)] px-7 py-6 text-center transition-all duration-700 delay-300 ease-out md:mt-14 md:flex-row md:px-9 md:text-left ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <p className="text-lg font-bold tracking-tight text-[var(--color-primary-to-white)] md:text-xl">
            Construyamos algo con propósito.
          </p>

          <a
            href="#contacto"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white min-h-[44px] shadow-xs transition-all duration-300 hover:bg-[var(--color-secondary)] active:scale-[0.97]"
          >
            Empezar ahora
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
          </a>
        </div>
      </div>
    </section>
  );
}
