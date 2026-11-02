"use client";

import { useEffect, useState } from "react";
import {
  CONSENT_CATEGORIES,
  ConsentCategory,
  DEFAULT_CONSENT,
} from "@/app/lib/consent/consent.config";
import {
  acceptAll,
  getConsentState,
  rejectOptionals,
  updateConsent,
} from "@/app/lib/consent/consent.service";

const CATEGORY_LABELS: Record<ConsentCategory, { title: string; description: string }> = {
  necessary: {
    title: "Cookies necesarias",
    description: "Imprescindibles para el funcionamiento del sitio. Siempre activas.",
  },
  functional: {
    title: "Cookies funcionales",
    description: "Permiten funciones como agendar reuniones (Calendly) o ver contenido embebido.",
  },
  analytics: {
    title: "Cookies de analítica",
    description: "Miden cómo se usa el sitio para mejorarlo (Google Analytics, Clarity, etc.).",
  },
  marketing: {
    title: "Cookies de marketing",
    description: "Publicidad y seguimiento de conversiones (Meta Pixel, Google Ads, etc.).",
  },
};

type Props = { open: boolean; onClose: () => void };

/**
 * Panel de preferencias SOLO para el respaldo dev (cuando CookieYes no está
 * configurado). Con CookieYes activo, `openConsentSettings()` abre el centro
 * de preferencias de CookieYes y este panel nunca se muestra.
 */
export function ConsentSettingsDialog({ open, onClose }: Props) {
  const [draft, setDraft] = useState<Record<ConsentCategory, boolean>>({ ...DEFAULT_CONSENT });

  useEffect(() => {
    if (!open) return;
    const current = getConsentState();
    setDraft({
      necessary: true,
      functional: current?.functional ?? false,
      analytics: current?.analytics ?? false,
      marketing: current?.marketing ?? false,
    });
  }, [open]);

  if (!open) return null;

  const toggle = (category: ConsentCategory) => {
    if (category === "necessary") return;
    setDraft((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const save = () => {
    (Object.keys(draft) as ConsentCategory[]).forEach((cat) => {
      if (cat !== "necessary") updateConsent(cat, draft[cat]);
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Configuración de cookies"
      className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/50 p-4"
    >
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-[var(--color-surface-elevated)] shadow-2xl">
        <div className="border-b border-[var(--color-gray)] p-6 pb-4">
          <h2 className="text-lg font-bold text-[var(--color-dark)]">Configuración de cookies</h2>
          <p className="mt-1 text-sm text-[var(--color-dark-gray)]">
            Elige qué categorías de cookies permites. Puedes cambiarlo cuando quieras.
          </p>
        </div>

        <ul className="max-h-[50vh] space-y-1 overflow-y-auto p-6">
          {CONSENT_CATEGORIES.map((cat) => {
            const label = CATEGORY_LABELS[cat];
            const checked = draft[cat];
            const locked = cat === "necessary";
            return (
              <li
                key={cat}
                className="flex items-start justify-between gap-4 rounded-xl p-3 hover:bg-[var(--color-primary-tint)]/50"
              >
                <div>
                  <p className="text-sm font-semibold text-[var(--color-dark)]">{label.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-[var(--color-dark-gray)]">
                    {label.description}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={checked}
                  disabled={locked}
                  onClick={() => toggle(cat)}
                  className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 ${
                    locked
                      ? "cursor-not-allowed bg-[var(--color-dark-gray)]/40"
                      : checked
                        ? "bg-[var(--color-primary)]"
                        : "bg-[var(--color-gray)]"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      checked ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col gap-2.5 border-t border-[var(--color-gray)] p-6 pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => {
              rejectOptionals();
              onClose();
            }}
            className="min-h-[44px] rounded-full border border-[var(--color-gray)] px-5 py-2.5 text-sm font-semibold text-[var(--color-dark)] transition-colors hover:border-[var(--color-primary)]"
          >
            Rechazar opcionales
          </button>
          <button
            type="button"
            onClick={() => {
              acceptAll();
              onClose();
            }}
            className="min-h-[44px] rounded-full border border-[var(--color-gray)] px-5 py-2.5 text-sm font-semibold text-[var(--color-primary-bright)] transition-colors hover:border-[var(--color-primary-bright)]"
          >
            Aceptar todas
          </button>
          <button
            type="button"
            onClick={save}
            className="min-h-[44px] rounded-full bg-[var(--color-primary)] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-secondary)]"
          >
            Guardar preferencias
          </button>
        </div>
      </div>
    </div>
  );
}
