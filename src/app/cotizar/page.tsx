'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarClock, CheckCircle2 } from "lucide-react";
import ConsentGate from "@/app/components/consent/ConsentGate";
import { CalendlyBlockedCard } from "@/app/components/consent/calendly";
import { categoryForService } from "@/app/lib/consent/consent.config";

// URL del agendador (Calendly conectado a Google Calendar).
// Parámetros para que se vea nativo: sin banner de cookies, sin detalles del
// evento (menos scroll) y con los colores de la marca.
const SCHEDULER_URL =
  "https://calendly.com/molinamau37/nueva-reunion" +
  "?hide_event_type_details=1&hide_gdpr_banner=1&background_color=ffffff&text_color=1e1e1e&primary_color=5656b5";

const BENEFITS = [
  "Reunión sin costo de 30 minutos.",
  "Entendemos tu proyecto y objetivos.",
  "Recibes una propuesta a tu medida.",
];

// Categoría de consentimiento de Calendly (definida en el service registry).
const CALENDLY_CATEGORY = categoryForService("calendly");

export default function CotizarPage() {
  const [isLoading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(window.navigator.onLine);
    updateOnlineStatus();
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 lg:py-16">
      <Link
        href="/"
        className="mb-8 flex w-fit items-center gap-1 text-sm font-medium text-[var(--color-primary-bright)] hover:underline"
      >
        <ArrowLeft size={16} /> Volver al inicio
      </Link>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Columna informativa */}
        <section className="flex flex-col gap-5 lg:w-[38%] lg:pt-4">
          <span className="flex w-fit items-center gap-2 rounded-full bg-[var(--color-primary-tint)] px-3 py-1 text-sm font-medium text-[var(--color-primary-bright)]">
            <CalendarClock size={16} /> Agenda una reunión
          </span>

          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-primary-to-white)]">
            Hablemos de tu proyecto
          </h1>
          <p className="text-[var(--color-dark-gray)]">
            Elige el día y la hora que mejor te convenga. La reunión queda en
            nuestro calendario y recibirás la confirmación por correo.
          </p>

          <ul className="flex flex-col gap-3">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[var(--color-primary-bright)]" />
                <span className="text-[var(--color-primary-to-white)]">{b}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Agendador (compacto, integrado) — solo se carga si Calendly está permitido */}
        <section className="relative flex-1 overflow-hidden rounded-2xl border border-[var(--color-gray)] bg-[var(--color-surface)]">
          <ConsentGate
            category={CALENDLY_CATEGORY}
            fallback={<CalendlyBlockedCard minHeight={640} />}
          >
            {isOnline ? (
              <iframe
                src={SCHEDULER_URL}
                title="Agendador de reuniones"
                className="w-full"
                style={{
                  border: "none",
                  height: 640,
                  opacity: isLoading ? 0 : 1,
                  transition: "opacity 0.3s ease-in-out",
                }}
                onLoad={() => setLoading(false)}
              />
            ) : (
              <div className="flex h-[640px] items-center justify-center p-8 text-center text-[var(--color-dark-gray)]">
                Necesitas conexión a internet para ver el agendador.
              </div>
            )}

            {isOnline && isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface)]">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--color-gray)] border-t-[var(--color-primary)]" />
              </div>
            )}
          </ConsentGate>
        </section>
      </div>
    </main>
  );
}
