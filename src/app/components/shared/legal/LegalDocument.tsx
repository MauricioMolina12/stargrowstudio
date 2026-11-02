import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import RevisitConsentButton from "@/app/components/consent/RevisitConsentButton";
import type { LegalBlock, LegalDoc } from "./legalTypes";

/**
 * Renderiza enlaces ligeros con sintaxis `[texto](url)` dentro de párrafos y
 * listas. Los enlaces externos (http/https) abren en una pestaña nueva.
 */
function renderInline(text: string): ReactNode {
  const parts = text.split(/\[([^\]]+)\]\(([^)]+)\)/);
  return parts.map((part, i) => {
    if (i % 3 === 1) {
      const href = parts[i + 1];
      const external = href.startsWith("http");
      return (
        <a
          key={i}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="font-medium text-[var(--color-primary-bright)] underline decoration-[var(--color-primary-bright)]/30 underline-offset-2 transition-colors hover:decoration-[var(--color-primary-bright)]"
        >
          {part}
        </a>
      );
    }
    if (i % 3 === 2) return null;
    return part;
  });
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.kind) {
    case "paragraph":
      return <p>{renderInline(block.text)}</p>;
    case "list":
      return (
        <ul className="list-disc space-y-2 pl-5 marker:text-[var(--color-primary-bright)]">
          {block.items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    case "note":
      return (
        <p className="rounded-xl border border-[var(--color-primary)]/15 bg-[var(--color-primary-tint)]/70 px-4 py-3 text-sm leading-relaxed text-[var(--color-dark)]">
          {renderInline(block.text)}
        </p>
      );
    case "consentButton":
      return (
        <div>
          <RevisitConsentButton
            label={block.label}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
          />
        </div>
      );
    default:
      return null;
  }
}

/**
 * Presentación editorial/legal reutilizable: encabezado, índice de contenidos
 * (sticky en desktop, colapsable en móvil) y secciones numeradas con anclas.
 */
export default function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <main className="w-full bg-[var(--color-light)]">
      {/* ── Encabezado ── */}
      <section className="border-b border-[var(--color-gray)] bg-[var(--color-white-to-primary)]">
        <div className="container-app py-14 md:py-20">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-primary-bright)]">
            {doc.eyebrow}
          </span>
          <h1 className="section-heading mt-3 max-w-3xl text-[var(--color-dark)]">
            {doc.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[clamp(0.95rem,1.2vw,1.05rem)] leading-relaxed text-[var(--color-dark-gray)]">
            {doc.intro}
          </p>
          <p className="mt-6 inline-flex items-center rounded-full border border-[var(--color-primary-bright)]/15 bg-[var(--color-primary-tint)]/60 px-4 py-1.5 text-xs font-semibold text-[var(--color-primary-bright)]">
            Última actualización: {doc.updatedAt}
          </p>
        </div>
      </section>

      <div className="container-app py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* ── Índice de contenidos (desktop) ── */}
          <aside className="hidden lg:block">
            <nav aria-label="Contenido" className="sticky top-24">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-primary-bright)]">
                Contenido
              </p>
              <ol className="mt-4 space-y-1 border-l border-[var(--color-gray)]">
                {doc.sections.map((section, i) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex min-h-[44px] items-center gap-3 rounded-r-lg border-l-2 border-transparent px-3 text-sm font-medium text-[var(--color-dark-gray)] transition-colors hover:border-[var(--color-primary-bright)] hover:bg-[var(--color-primary-tint)]/50 hover:text-[var(--color-primary-bright)]"
                    >
                      <span className="w-6 shrink-0 text-xs font-bold text-[var(--color-primary-bright)]">
                        {i + 1}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          {/* ── Contenido ── */}
          <div className="min-w-0 max-w-3xl">
            {/* Índice de contenidos (móvil) */}
            <details className="group mb-10 rounded-xl border border-[var(--color-gray)] bg-[var(--color-white-to-primary)] lg:hidden">
              <summary className="flex min-h-[48px] cursor-pointer items-center justify-between gap-3 px-4 py-3 text-sm font-bold text-[var(--color-dark)] [&::-webkit-details-marker]:hidden">
                Contenido
                <ChevronDown
                  className="h-4 w-4 text-[var(--color-primary-bright)] transition-transform duration-300 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <ol className="space-y-0.5 border-t border-[var(--color-gray)] p-2">
                {doc.sections.map((section, i) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 text-sm font-medium text-[var(--color-dark-gray)] transition-colors hover:bg-[var(--color-primary-tint)] hover:text-[var(--color-primary-bright)]"
                    >
                      <span className="w-6 shrink-0 text-xs font-bold text-[var(--color-primary-bright)]">
                        {i + 1}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            <div className="flex flex-col gap-12">
              {doc.sections.map((section, i) => (
                <section
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`${section.id}-title`}
                  className="scroll-mt-28"
                >
                  <h2
                    id={`${section.id}-title`}
                    className="flex items-baseline gap-3 text-xl font-bold tracking-tight text-[var(--color-dark)] md:text-2xl"
                  >
                    <span className="text-[var(--color-primary-bright)]">{i + 1}.</span>
                    {section.title}
                  </h2>
                  <div className="mt-4 flex flex-col gap-4 text-[0.95rem] leading-relaxed text-[var(--color-dark-gray)]">
                    {section.blocks.map((block, j) => (
                      <Block key={j} block={block} />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <Link
              href="/"
              className="mt-14 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-[var(--color-primary-bright)] hover:underline"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

