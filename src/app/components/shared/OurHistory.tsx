'use client';

import { useInView } from '@/app/hooks/useInView';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';

const stagger = {
  label: 'transition-all duration-700 ease-out',
  heading: 'transition-all duration-700 delay-100 ease-out',
  body: 'transition-all duration-700 delay-200 ease-out',
  blockquote: 'transition-all duration-700 delay-300 ease-out',
  coda: 'transition-all duration-700 delay-400 ease-out',
};

const hidden = 'translate-y-6 opacity-0';
const visible = 'translate-y-0 opacity-100';

export default function OurHistory() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className="w-full bg-[var(--color-light)] py-24 md:py-32 overflow-hidden"
      aria-labelledby="history-heading"
    >
      <div className="container-app">
        {/* ── Header ── */}
        <div className="mb-16 md:mb-20">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary-bright)]">
            Nuestra historia
          </span>
        </div>

        {/* ════════════════════════════════════════
           ACTO I – El origen
           ════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center mb-24 md:mb-32">
          {/* Imagen conceptual */}
          <div className="lg:col-span-2">
            <div
              className={`aspect-square rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 flex items-center justify-center transition-all duration-1000 ease-out ${
                inView ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
            >
              <div className="relative w-48 h-48">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-[var(--color-primary)]/20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[var(--color-primary)]/30" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--color-primary)]" />
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" fill="none">
                  <path
                    d="M20 180 Q 60 120 100 100 Q 140 80 180 20"
                    stroke="var(--color-primary)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.3"
                  />
                  <path
                    d="M20 20 Q 60 80 100 100 Q 140 120 180 180"
                    stroke="var(--color-primary)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.3"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className="lg:col-span-3">
            <span
              className={`text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-dark-gray)] ${stagger.label} ${
                inView ? visible : hidden
              }`}
            >
              Acto I · El origen
            </span>
            <h2
              id="history-heading"
              className={`mt-4 text-[clamp(1.8rem,3vw,2.5rem)] font-bold leading-[1.08] tracking-tight text-[var(--color-dark)] ${stagger.heading} ${
                inView ? visible : hidden
              }`}
            >
              Dos personas,{' '}
              <span className="text-[var(--color-primary-bright)]">una visión</span>
            </h2>
            <div
              className={`mt-6 space-y-4 text-[clamp(0.95rem,1.1vw,1.05rem)] leading-relaxed text-[var(--color-dark-gray)] ${stagger.body} ${
                inView ? visible : hidden
              }`}
            >
              <p>
                Star Grow Studio no nació en una reunión de junta directiva. Nació en una
                conversación entre dos personas que venían de mundos radicalmente distintos.
              </p>
              <p>
                Uno venía del código, la arquitectura de software, la infraestructura digital y
                el diseño de experiencias. El otro venía de la estrategia empresarial, la
                consultoría organizacional y el desarrollo de negocio.
              </p>
              <p>
                Ambos habían visto el mismo problema una y otra vez:{' '}
                <strong className="text-[var(--color-dark)]">
                  la tecnología y la estrategia casi nunca se sentaban en la misma mesa.
                </strong>
              </p>
            </div>

            {/* Pull quote */}
            <blockquote
              className={`mt-8 pl-5 border-l-2 border-[var(--color-primary)] ${stagger.blockquote} ${
                inView ? visible : hidden
              }`}
            >
              <p className="text-[1.05rem] md:text-[1.15rem] leading-relaxed text-[var(--color-dark)] font-medium italic">
                &ldquo;No queríamos ser una agencia más. Queríamos ser el puente entre lo que
                una empresa necesita y lo que la tecnología puede hacer realidad.&rdquo;
              </p>
              <cite className="mt-2 block text-sm text-[var(--color-dark-gray)] not-italic">
                — Fundadores de Star Grow Studio
              </cite>
            </blockquote>
          </div>
        </div>

        {/* Separador */}
        <div className="w-full h-px bg-[var(--color-gray)] mb-24 md:mb-32" />

        {/* ════════════════════════════════════════
           ACTO II – El propósito
           ════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center mb-24 md:mb-32">
          {/* Texto */}
          <div className="lg:col-span-3 lg:order-1">
            <span
              className={`text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-dark-gray)] ${stagger.label} ${
                inView ? visible : hidden
              }`}
            >
              Acto II · El propósito
            </span>
            <h2
              className={`mt-4 text-[clamp(1.8rem,3vw,2.5rem)] font-bold leading-[1.08] tracking-tight text-[var(--color-dark)] ${stagger.heading} ${
                inView ? visible : hidden
              }`}
            >
              Tecnología con{' '}
              <span className="text-[var(--color-primary-bright)]">propósito</span>
            </h2>
            <div
              className={`mt-6 space-y-4 text-[clamp(0.95rem,1.1vw,1.05rem)] leading-relaxed text-[var(--color-dark-gray)] ${stagger.body} ${
                inView ? visible : hidden
              }`}
            >
              <p>
                No desarrollamos software por desarrollar software. Una aplicación bien diseñada
                no sirve de nada si no resuelve un problema real de negocio.
              </p>
              <p>
                Trabajamos con emprendimientos que dan sus primeros pasos, con medianas empresas
                listas para escalar y con grandes organizaciones que necesitan transformarse sin
                detener su operación.
              </p>
              <p>
                A cada una le ofrecemos lo mismo:{' '}
                <strong className="text-[var(--color-dark)]">
                  soluciones digitales que no solo funcionan, sino que transforman la manera en
                  que hacen negocio.
                </strong>
              </p>
            </div>
          </div>

          {/* Imagen / Icono visual */}
          <div className="lg:col-span-2 lg:order-2">
            <div
              className={`aspect-[4/3] rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/8 to-transparent flex items-center justify-center border border-[var(--color-gray)] transition-all duration-1000 ease-out ${
                inView ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
            >
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-primary)]/10 mb-4">
                  <TrendingUp className="h-8 w-8 text-[var(--color-primary-bright)]" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-semibold text-[var(--color-dark)]">Resultados medibles</p>
                <p className="text-xs text-[var(--color-dark-gray)] mt-1">
                  Cada línea de código con impacto real
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="w-full h-px bg-[var(--color-gray)] mb-24 md:mb-32" />

        {/* ════════════════════════════════════════
           ACTO III – La promesa (manifiesto)
           ════════════════════════════════════════ */}
        <div className="max-w-2xl mx-auto text-center mb-24 md:mb-32">
          <span
            className={`text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-dark-gray)] ${stagger.label} ${
              inView ? visible : hidden
            }`}
          >
            Acto III · La promesa
          </span>
          <h2
            className={`mt-8 text-[clamp(1.6rem,2.5vw,2.2rem)] font-bold leading-[1.15] tracking-tight text-[var(--color-dark)] ${stagger.heading} ${
              inView ? visible : hidden
            }`}
          >
            Cada empresa tiene una historia distinta.
            <br />
            <span className="text-[var(--color-primary-bright)]">
              Cada historia merece una solución distinta.
            </span>
          </h2>
          <div
            className={`mt-8 space-y-4 text-[clamp(0.9rem,1.1vw,1rem)] leading-relaxed text-[var(--color-dark-gray)] max-w-lg mx-auto ${stagger.body} ${
              inView ? visible : hidden
            }`}
          >
            <p>
              No creemos en plantillas. Creemos en entender profundamente cada negocio para
              construir soluciones que realmente se adapten a sus necesidades.
            </p>
            <p>No entregamos productos. Construimos relaciones.</p>
            <p>
              No buscamos clientes. Buscamos{' '}
              <strong className="text-[var(--color-dark)]">aliados estratégicos</strong>.
            </p>
          </div>
          <div
            className={`mt-10 ${stagger.coda} ${inView ? visible : hidden}`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-primary-bright)]">
              STAR GROW STUDIO
            </p>
            <p className="mt-1 text-[11px] text-[var(--color-dark-gray)] italic">
              Haciendo crecer estrellas
            </p>
          </div>
        </div>

        {/* ════════════════════════════════════════
           Cierre
           ════════════════════════════════════════ */}
        <div
          className={`max-w-lg mx-auto text-center pt-12 border-t border-[var(--color-gray)] ${stagger.coda} ${
            inView ? visible : hidden
          }`}
        >
          <h3 className="text-lg font-bold text-[var(--color-dark)]">
            Detrás de cada proyecto hay personas
          </h3>
          <p className="mt-2 text-sm text-[var(--color-dark-gray)]">
            Conoce a quienes hacen posible que la tecnología y la estrategia trabajen juntas.
          </p>
          <Link
            href="/our-history"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-7 py-3.5 text-sm font-semibold text-white min-h-[44px] transition-all duration-300 hover:bg-[var(--color-secondary)] active:scale-[0.97]"
          >
            Conoce al equipo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}