# Consentimiento de cookies — Star Grow (CookieYes Free)

Infraestructura reutilizable de consentimiento por **categorías**, con CookieYes
(plan gratuito, $0) como fuente de verdad.

## Arquitectura

```
Consent system (CookieYes)
        │
        ├── necessary   (siempre activa)
        ├── functional  → Calendly, (futuro: YouTube, Maps, fuentes)
        ├── analytics   → (futuro: Google Analytics, GTM, Clarity, Hotjar)
        └── marketing   → (futuro: Meta Pixel, Google Ads)
```

Los servicios se registran en `src/app/lib/consent/consent.config.ts`
(Service Registry). Un servicio **nunca** implementa su propia lógica de
consentimiento: se envuelve con `<ConsentGate>`.

```tsx
<ConsentGate category={categoryForService("calendly")} fallback={<Placeholder />}>
  <CalendlyIframe />
</ConsentGate>
```

## Archivos

| Ruta | Rol |
| --- | --- |
| `src/app/lib/consent/consent.config.ts` | Categorías, Service Registry, clave CookieYes |
| `src/app/lib/consent/consent.service.ts` | Lee estado (cookie/global), API de escritura, evento `ckyConsentUpdated` |
| `src/app/components/consent/ConsentProvider.tsx` | Contexto React con `hasConsent`, `allowCategory`, `openSettings` |
| `src/app/components/consent/ConsentGate.tsx` | Gate por categoría |
| `src/app/components/consent/RevisitConsentButton.tsx` | Reabre preferencias (footer) |
| `src/app/components/consent/ConsentSettingsDialog.tsx` | Panel dev-only (sin CookieYes) |
| `src/app/components/consent/calendly.tsx` | Placeholder de Calendly bloqueado |

## Setup (una sola vez)

1. Crear cuenta gratuita en https://www.cookieyes.com
2. Crear el sitio y copiar la clave del dashboard (Settings → Implementation).
3. Definirla en `.env.local` (y en las env vars de Vercel):

   ```env
   NEXT_PUBLIC_COOKIEYES_CLIENT_KEY="TU_CLAVE"
   ```

4. Configurar en el dashboard de CookieYes:
   - **Banner**: plantilla clara (GDPR opt-in). En el plan Free no hay colores/CSS
     personalizados ni se puede quitar el branding de CookieYes (es de pago).
   - **Categories**: activar `Strictly Necessary`, `Functional`, `Analytics`,
     `Marketing`.
   - **iFrame blocking**: añadir `calendly.com` → categoría `Functional`
     (bloqueo automático del iframe hasta el consentimiento).
   - **Revisit consent button**: activar (disponible en Free).

## Cómo funciona el flujo

1. **Primera visita**: sin cookie `cookieyes-consent` → el banner de CookieYes se
   muestra; `ConsentGate` bloquea Calendly y muestra el placeholder.
2. **Aceptar todas** → CookieYes escribe la cookie y dispara `ckyConsentUpdated` →
   el Provider actualiza el estado → `ConsentGate` monta el iframe (sin reload).
3. **Rechazar opcionales** → solo `necessary` → `/cotizar` sigue funcional con el
   placeholder (WhatsApp / Email / "Permitir Calendly y continuar").
4. **Cambiar luego** → "Configuración de cookies" (footer o placeholder) →
   `ckyConsentShow()` abre el centro de preferencias de CookieYes.

La app lee el consentimiento desde:

- `window.ckyConsent` (global de CookieYes),
- la cookie `cookieyes-consent` (formato JSON `{... "functional": "yes" ...}`),
- respaldo **dev-only** (`localStorage`) cuando no hay clave configurada y
  `NODE_ENV !== "production"`.

La escritura SIEMPRE es vía la API de CookieYes
(`ckyConsentUpdate`, `ckyConsentAccept`, `ckyConsentReject`). Nunca escribimos
la cookie de CookieYes directamente.

## Agregar un servicio nuevo (p. ej. Google Analytics)

1. Registrar el servicio en `consent.config.ts`:

   ```ts
   googleAnalytics: { name: "Google Analytics", category: "analytics" },
   ```

2. Cargarlo (o montarlo) solo si la categoría está permitida:

   ```tsx
   <ConsentGate category="analytics">
     <GoogleAnalyticsScript />
   </ConsentGate>
   ```

Repite el mismo patrón para Clarity (`analytics`), Meta Pixel/Google Ads
(`marketing`), YouTube (`functional`). **El sistema central no cambia.**

## SSR / Hydration

El Provider solo toca APIs del navegador en `useEffect`; en el primer render el
estado es `null` (todo bloqueado) y se resuelve tras el mount → sin
`window is not defined` ni hydration mismatch. El script de CookieYes se carga
con `next/script` (`beforeInteractive`) en el root layout.

## Limitaciones del plan Free (confirmadas en cookieyes.com/pricing)

Incluido: auto-bloqueo de cookies, bloqueo de iframes, control granular de
categorías, botón de revisita, consent log, Google Consent Mode v2, GTM.
No incluido (solo de pago): colores/CSS personalizados del banner, quitar el
branding de CookieYes, plantillas popup, multi-idioma, geo-targeting,
escaneos programados. Límites Free: 100 páginas/escaneo, 5 escaneos/mes,
5.000 pageviews/mes.
