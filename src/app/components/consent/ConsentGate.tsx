"use client";

import type { ReactNode } from "react";
import type { ConsentCategory } from "@/app/lib/consent/consent.config";
import { useConsent } from "./ConsentProvider";

type ConsentGateProps = {
  /** Categoría de consentimiento requerida para renderizar `children`. */
  category: ConsentCategory;
  /** Contenido que se carga SOLO si la categoría está permitida. */
  children: ReactNode;
  /** Contenido alternativo mientras la categoría NO esté permitida. */
  fallback?: ReactNode;
};

/**
 * <ConsentGate category="functional" fallback={<Placeholder />}>
 *   <Calendly />
 * </ConsentGate>
 *
 * El componente que usa el servicio NO implementa lógica de consentimiento:
 * la decisión viene de la fuente central (CookieYes) a través del Provider.
 * Cuando el usuario cambia su consentimiento, este componente re-renderiza
 * automáticamente (sin recargar la página).
 */
export default function ConsentGate({ category, children, fallback = null }: ConsentGateProps) {
  const { hasConsent } = useConsent();
  return <>{hasConsent(category) ? children : fallback}</>;
}
