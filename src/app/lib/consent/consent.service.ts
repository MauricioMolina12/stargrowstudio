/**
 * Capa de acceso al estado de consentimiento.
 *
 * Fuente de verdad: CookieYes.
 *   - Estado:  cookie `cookieyes-consent` y/o global `window.ckyConsent`.
 *   - Cambios: evento `ckyConsentUpdated` (se dispara al aceptar/rechazar/cambiar).
 *   - Escritura: API oficial de CookieYes (`ckyConsentUpdate`, `ckyConsentAccept`,
 *     `ckyConsentReject`). NUNCA escribimos la cookie de CookieYes directamente.
 *
 * Respaldo dev-only: si NO hay clave CookieYes configurada en desarrollo, se usa
 * un almacenamiento local para poder probar el flujo. En producción solo existe
 * CookieYes; si falta la clave, los terceros permanecen bloqueados (seguro).
 */

import {
  CONSENT_CATEGORIES,
  CONSENT_COOKIE_NAME,
  COOKIEYES_CLIENT_KEY,
  ConsentCategory,
  ConsentMap,
  DEFAULT_CONSENT,
  FALLBACK_STORAGE_KEY,
  categoryForService,
  type ConsentServiceId,
} from "./consent.config";

/** Evento interno del respaldo dev (equivalente a `ckyConsentUpdated`). */
export const FALLBACK_CHANGE_EVENT = "stargrow:consent:change";
/** Evento interno del respaldo dev para abrir el panel de preferencias. */
export const FALLBACK_OPEN_SETTINGS_EVENT = "stargrow:consent:open-settings";

/* ── Helpers de navegador ─────────────────────────────────────────────────── */

function canUseBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function getCookie(name: string): string | null {
  if (!canUseBrowser()) return null;
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

/** Normaliza el JSON de CookieYes (yes/no) o el global (yes/no|true/false). */
function applyYesNoToMap(raw: Record<string, unknown> | null | undefined): ConsentMap | null {
  if (!raw || typeof raw !== "object") return null;
  const map: ConsentMap = { ...DEFAULT_CONSENT };
  let found = false;
  for (const cat of CONSENT_CATEGORIES) {
    const value = raw[cat];
    if (value === "yes" || value === true) {
      map[cat] = true;
      found = true;
    } else if (value === "no" || value === false) {
      map[cat] = false;
      found = true;
    }
  }
  return found ? map : null;
}

/* ── Lectura de la fuente de verdad (CookieYes) ───────────────────────────── */

/** Lee la cookie `cookieyes-consent` que escribe CookieYes. */
export function readConsentCookie(): ConsentMap | null {
  const raw = getCookie(CONSENT_COOKIE_NAME);
  if (!raw) return null;
  try {
    return applyYesNoToMap(JSON.parse(raw) as Record<string, unknown>);
  } catch {
    return null;
  }
}

/** Lee el global `window.ckyConsent` expuesto por el script de CookieYes. */
export function readCkyConsentGlobal(): ConsentMap | null {
  if (!canUseBrowser()) return null;
  const cky = (window as unknown as { ckyConsent?: Record<string, unknown> }).ckyConsent;
  return applyYesNoToMap(cky);
}

/* ── Respaldo dev-only ────────────────────────────────────────────────────── */

/** ¿Está activo el respaldo? Solo en desarrollo y sin clave CookieYes. */
export function fallbackEnabled(): boolean {
  return !COOKIEYES_CLIENT_KEY && process.env.NODE_ENV !== "production";
}

function readFallback(): ConsentMap | null {
  if (!canUseBrowser() || !fallbackEnabled()) return null;
  try {
    const raw = window.localStorage.getItem(FALLBACK_STORAGE_KEY);
    return raw ? applyYesNoToMap(JSON.parse(raw) as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

function writeFallback(map: ConsentMap): void {
  if (!canUseBrowser() || !fallbackEnabled()) return;
  try {
    window.localStorage.setItem(FALLBACK_STORAGE_KEY, JSON.stringify(map));
    window.dispatchEvent(new CustomEvent(FALLBACK_CHANGE_EVENT));
  } catch {
    /* almacenamiento no disponible: se ignora */
  }
}

/* ── API pública ──────────────────────────────────────────────────────────── */

/**
 * Estado actual de consentimiento normalizado (todas las categorías).
 * Orden: global de CookieYes → cookie de CookieYes → respaldo dev.
 * `null` = primera visita / sin decisión guardada.
 */
export function getConsentState(): ConsentMap | null {
  return readCkyConsentGlobal() ?? readConsentCookie() ?? readFallback();
}

/** ¿Está permitida una categoría? `necessary` siempre lo está. */
export function hasConsent(category: ConsentCategory): boolean {
  if (category === "necessary") return true;
  return getConsentState()?.[category] ?? false;
}

/** ¿Está permitido un servicio concreto? (usa el service registry). */
export function hasServiceConsent(serviceId: ConsentServiceId): boolean {
  return hasConsent(categoryForService(serviceId));
}

/** Actualiza una categoría usando la API de CookieYes (`ckyConsentUpdate`). */
export function updateConsent(category: ConsentCategory, value: boolean): void {
  if (!canUseBrowser()) return;
  const cky = window as unknown as {
    ckyConsentUpdate?: (consent: Record<string, string>) => void;
  };
  if (typeof cky.ckyConsentUpdate === "function") {
    cky.ckyConsentUpdate({ [category]: value ? "yes" : "no" });
    return;
  }
  if (fallbackEnabled()) {
    const next = getConsentState() ?? { ...DEFAULT_CONSENT };
    next[category] = value;
    writeFallback(next);
  }
}

/** Acepta todas las categorías (`ckyConsentAccept`). */
export function acceptAll(): void {
  if (!canUseBrowser()) return;
  const cky = window as unknown as { ckyConsentAccept?: () => void };
  if (typeof cky.ckyConsentAccept === "function") {
    cky.ckyConsentAccept();
    return;
  }
  if (fallbackEnabled()) {
    writeFallback({ ...DEFAULT_CONSENT, functional: true, analytics: true, marketing: true });
  }
}

/** Rechaza las categorías opcionales (`ckyConsentReject`). */
export function rejectOptionals(): void {
  if (!canUseBrowser()) return;
  const cky = window as unknown as { ckyConsentReject?: () => void };
  if (typeof cky.ckyConsentReject === "function") {
    cky.ckyConsentReject();
    return;
  }
  if (fallbackEnabled()) {
    writeFallback({ ...DEFAULT_CONSENT });
  }
}

/**
 * Reabre el centro de preferencias. Con CookieYes usa `ckyConsentShow()`;
 * en el respaldo dev dispara un evento para abrir el panel local.
 */
export function openConsentSettings(): void {
  if (!canUseBrowser()) return;
  const cky = window as unknown as { ckyConsentShow?: () => void };
  if (typeof cky.ckyConsentShow === "function") {
    cky.ckyConsentShow();
    return;
  }
  if (fallbackEnabled()) {
    window.dispatchEvent(new CustomEvent(FALLBACK_OPEN_SETTINGS_EVENT));
  }
}

/** Se suscribe a los cambios de consentimiento (CookieYes + respaldo dev). */
export function subscribeToConsentChanges(callback: () => void): () => void {
  if (!canUseBrowser()) return () => {};
  window.addEventListener("ckyConsentUpdated", callback);
  window.addEventListener(FALLBACK_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("ckyConsentUpdated", callback);
    window.removeEventListener(FALLBACK_CHANGE_EVENT, callback);
  };
}
