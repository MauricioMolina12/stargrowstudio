import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/sanity/types/service";

type Props = {
  faq: FaqItem[];
  accent: string;
};

export function FaqSection({ faq, accent }: Props) {
  if (!faq?.length) return null;

  return (
    <section>
      <header className="mb-10 max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>
          FAQ
        </span>
        <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-tight text-[var(--color-dark)]">
          Preguntas frecuentes
        </h2>
      </header>
      <div className="mx-auto max-w-3xl space-y-3">
        {faq.map((item, i) => (
          <details
            key={i}
            className="group overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] [&[open]>summary_.chevron]:rotate-180"
          >
            <summary className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left text-[0.95rem] font-semibold text-[var(--color-dark)] transition-colors hover:bg-[var(--color-hover)] list-none">
              {item.question}
              <ChevronDown
                className="chevron h-4 w-4 shrink-0 text-[var(--color-dark-gray)] transition-transform duration-300"
                strokeWidth={2}
              />
            </summary>
            <div className="border-t border-[var(--color-border-subtle)] px-6 py-4 text-sm leading-relaxed text-[var(--color-dark-gray)]">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}