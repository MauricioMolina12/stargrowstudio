"use client";

import { CalendarClock, Mail, MessageCircle } from "lucide-react";
import { useConsent } from "./ConsentProvider";

/** Datos de contacto reales de Star Grow (mismos que en Contact.tsx / Footer). */
const WHATSAPP_URL = "https://wa.me/573003856084";
const EMAIL_URL = "mailto:stargrowstudio@gmail.com";

type CalendlyBlockedCardProps = {
  /** Altura mínima para que el placeholder calce con el espacio del iframe. */
  minHeight?: number;
};

/**
 * Placeholder profesional que se muestra en /cotizar (y en el modal de reunión)
 * cuando la categoría `functional` (Calendly) NO está permitida.
 *
 * Incluye:
 *  - "Permitir Calendly y continuar": otorga consentimiento y carga el iframe
 *    al instante (sin recargar la página).
 *  - Alternativas de contacto reales: WhatsApp y Email.
 *  - Acceso directo a "Configuración de cookies".
 */
export function CalendlyBlockedCard({ minHeight = 640 }: CalendlyBlockedCardProps) {
  const { allowCategory, openSettings } = useConsent();

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-5 bg-[var(--color-surface)] p-6 text-center sm:p-10"
      style={{ minHeight }}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary-tint)] text-[var(--color-primary-bright)]">
        <CalendarClock size={26} />
      </span>

      <div className="max-w-md">
        <h2 className="text-xl font-bold tracking-tight text-[var(--color-dark)] sm:text-2xl">
          Agenda una reunión
        </h2>
        {/* <p className="mt-2 text-sm leading-relaxed text-[var(--color-dark-gray)]">
          Para mostrar nuestro calendario necesitamos cargar un servicio externo
          (Calendly). Puedes permitirlo ahora, o contactarnos directamente.
        </p> */}
      </div>

      {/* <div className="flex w-full max-w-sm flex-col gap-2.5">
        <button
          type="button"
          onClick={() => allowCategory("functional")}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[var(--color-secondary)] active:scale-[0.97]"
        >
          Permitir Calendly y continuar
        </button>
      </div> */}

      <div className="w-full max-w-sm">
        <div className="mb-3 flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-[var(--color-dark-gray)]">
          <span className="h-px flex-1 bg-[var(--color-gray)]" />
          O contáctanos directamente
          <span className="h-px flex-1 bg-[var(--color-gray)]" />
        </div>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:brightness-95 active:scale-[0.97]"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
          <a
            href={EMAIL_URL}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full border border-[var(--color-gray)] px-5 py-3 text-sm font-semibold text-[var(--color-primary-bright)] transition-all duration-300 hover:border-[var(--color-primary-bright)] active:scale-[0.97]"
          >
            <Mail size={18} />
            Email
          </a>
        </div>
      </div>

      <button
        type="button"
        onClick={openSettings}
        className="text-xs font-medium text-[var(--color-dark-gray)] underline-offset-4 transition-colors hover:text-[var(--color-primary-bright)] hover:underline"
      >
        Configuración de cookies
      </button>
    </div>
  );
}
