"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ConsentCategory, ConsentMap } from "@/app/lib/consent/consent.config";
import {
  FALLBACK_OPEN_SETTINGS_EVENT,
  fallbackEnabled,
  getConsentState,
  openConsentSettings,
  subscribeToConsentChanges,
  updateConsent,
} from "@/app/lib/consent/consent.service";
import { ConsentSettingsDialog } from "./ConsentSettingsDialog";

type ConsentContextValue = {
  /** Estado normalizado. `null` = primera visita / sin decisión guardada. */
  state: ConsentMap | null;
  hasConsent: (category: ConsentCategory) => boolean;
  /** Permite una categoría al instante (p. ej. "Permitir Calendly y continuar"). */
  allowCategory: (category: ConsentCategory) => void;
  /** Reabre el centro de preferencias (CookieYes) o el panel de respaldo dev. */
  openSettings: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

/**
 * Provee a toda la app el estado de consentimiento desde la fuente central
 * (CookieYes). Solo toca APIs del navegador en `useEffect`, para no romper
 * SSR ni generar hydration mismatch: en el primer render el estado es `null`
 * (todo bloqueado) y se resuelve tras montar.
 */
export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ConsentMap | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    setState(getConsentState());
    return subscribeToConsentChanges(() => setState(getConsentState()));
  }, []);

  useEffect(() => {
    if (!fallbackEnabled()) return;
    const open = () => setSettingsOpen(true);
    window.addEventListener(FALLBACK_OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(FALLBACK_OPEN_SETTINGS_EVENT, open);
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      state,
      hasConsent: (category) =>
        category === "necessary" ? true : Boolean(state?.[category]),
      allowCategory: (category) => updateConsent(category, true),
      openSettings: () => openConsentSettings(),
    }),
    [state]
  );

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {fallbackEnabled() && (
        <ConsentSettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      )}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent debe usarse dentro de <ConsentProvider>");
  }
  return ctx;
}
