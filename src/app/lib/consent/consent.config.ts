/**
 * Configuración central del sistema de consentimiento de cookies (CookieYes).
 *
 * ── Categorías de consentimiento ─────────────────────────────────────────────
 *   necessary   → siempre activas (el sitio no funciona sin ellas).
 *   functional  → servicios que mejoran la experiencia (agendadores, embeds).
 *   analytics   → medición y análisis de audiencia.
 *   marketing   → publicidad y seguimiento de conversión.
 *
 * CookieYes Free soporta "Strictly Necessary" + hasta 3 categorías adicionales,
 * por lo que `functional`, `analytics` y `marketing` cubren el plan gratuito.
 */

export const CONSENT_CATEGORIES = [
  "necessary",
  "functional",
  "analytics",
  "marketing",
] as const;

export type ConsentCategory = (typeof CONSENT_CATEGORIES)[number];

/** Estado normalizado de consentimiento: categoría → permitida (sí/no). */
export type ConsentMap = Record<ConsentCategory, boolean>;

/**
 * ── Service Registry ─────────────────────────────────────────────────────────
 * Centraliza TODOS los servicios de terceros y su categoría de consentimiento.
 * Para agregar un servicio nuevo SOLO se añade una entrada aquí; el sistema
 * central (ConsentProvider / ConsentGate) no cambia.
 *
 * Ya registrados (futuros) para que no haya que tocar nada más adelante:
 *   googleAnalytics  → analytics
 *   googleTagManager → analytics
 *   microsoftClarity → analytics
 *   metaPixel        → marketing
 *   googleAds        → marketing
 *   youtube          → functional
 */
export const CONSENT_SERVICES = {
  calendly: { name: "Calendly", category: "functional" as const },
  googleAnalytics: { name: "Google Analytics", category: "analytics" as const },
  googleTagManager: { name: "Google Tag Manager", category: "analytics" as const },
  microsoftClarity: { name: "Microsoft Clarity", category: "analytics" as const },
  metaPixel: { name: "Meta Pixel", category: "marketing" as const },
  googleAds: { name: "Google Ads", category: "marketing" as const },
  youtube: { name: "YouTube", category: "functional" as const },
} as const;

export type ConsentServiceId = keyof typeof CONSENT_SERVICES;

/** Categoría de un servicio registrado (usa el registry, no valores sueltos). */
export function categoryForService(serviceId: ConsentServiceId): ConsentCategory {
  return CONSENT_SERVICES[serviceId].category;
}

/* ── CookieYes ─────────────────────────────────────────────────────────────── */

/** ID del <script> de CookieYes (se usa en el root layout). */
export const COOKIEYES_SCRIPT_ID = "cookieyes";

/**
 * Clave pública del sitio en CookieYes. Se obtiene en el dashboard de CookieYes
 * (Settings → Implementation) y se define en .env.local:
 *
 *   NEXT_PUBLIC_COOKIEYES_CLIENT_KEY="tu-clave"
 */
export const COOKIEYES_CLIENT_KEY = process.env.NEXT_PUBLIC_COOKIEYES_CLIENT_KEY;

/** URL pública del script del banner (solo si la clave está configurada). */
export const COOKIEYES_SCRIPT_URL = COOKIEYES_CLIENT_KEY
  ? `https://cdn-cookieyes.com/client_data/${COOKIEYES_CLIENT_KEY}/script.js`
  : null;

/**
 * Cookie donde CookieYes guarda el consentimiento (formato JSON:
 * { consentid, necessary: "yes", functional: "yes", analytics: "no", ... }).
 * Aquí SOLO se lee; la escritura la realiza siempre CookieYes vía su API.
 */
export const CONSENT_COOKIE_NAME = "cookieyes-consent";

/**
 * Almacenamiento de respaldo SOLO para desarrollo local (cuando no hay clave
 * CookieYes configurada). En producción jamás se utiliza.
 */
export const FALLBACK_STORAGE_KEY = "stargrow.consent.fallback";

/** Estado inicial seguro: nada opcional cargado hasta que exista consentimiento. */
export const DEFAULT_CONSENT: ConsentMap = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};
