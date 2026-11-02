"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useInView } from "../../hooks/useInView";
import "../styles/animations.css";

/**
 * Contextual CTA placed inside the article column.
 * UX: Symmetrical, non-intrusive, value-first editorial callout.
 */
export function InlineCTA() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <aside
      ref={ref}
      className={`w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      role="complementary"
      aria-label="Llamado a la acción"
    >
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex items-start gap-4 sm:items-center">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary-tint)] text-[var(--color-primary-bright)]">
            <Sparkles size={20} aria-hidden="true" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-primary-bright)]">
              Consultoría Estratégica
            </span>
            <h3 className="mt-0.5 font-editorial text-lg font-bold text-[var(--color-primary-to-white)] sm:text-xl">
              ¿Listo para transformar tu negocio?
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-[var(--color-dark-gray)]">
              Conversemos sobre cómo ayudarte a alcanzar tus objetivos con tecnología, diseño y estrategia digital.
            </p>
          </div>
        </div>
        <Link
          href="/cotizar"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[var(--color-secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        >
          Agendar diagnóstico
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}

/**
 * Final CTA shown after the article content.
 * UX: Symmetrical editorial card aligned with the reading column.
 */
export function FinalCTA() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`w-full overflow-hidden rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] p-8 text-center text-white sm:p-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
      role="complementary"
      aria-label="Contáctanos"
    >
      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">
        Star Grow Studio
      </span>
      <h2 className="mt-2 font-editorial text-2xl font-bold leading-tight sm:text-3xl">
        Hagamos realidad tu próximo proyecto digital
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
        Combinamos estrategia, diseño y tecnología para crear soluciones digitales que impulsan tu negocio. Sin compromiso.
      </p>
      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/cotizar"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--color-primary)] shadow-sm transition-all duration-300 hover:bg-white/90 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Solicita una consultoría gratuita
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <Link
          href="/proyectos"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Ver proyectos
        </Link>
      </div>
    </section>
  );
}
