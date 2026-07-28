# Auditoría UX Móvil – Vista de Detalle de Proyecto

> **Fecha:** Julio 2026  
> **Dispositivo objetivo:** 320px–430px  
> **Principios aplicados:** Material Design, HIG (Apple), NN Group, Laws of UX, WCAG 2.2  
> **Página analizada:** `/proyectos/[slug]`

---

## Resumen Ejecutivo

La vista de detalle de proyecto tiene una arquitectura visual sólida con hero impactante, secciones narrativas claras y un scroll-gallery premium. Sin embargo, se detectaron **8 problemas prioritarios** que afectan la experiencia móvil, siendo el más crítico la superposición del watermark en la sección "El reto" y touch targets insuficientes en múltiples componentes interactivos.

---

## 1. HeroSection

### 1.1 CTA buttons: touch targets insuficientes
**Ubicación:** `HeroSection.tsx` línea 67  
**Problema:** `px-6 py-3 text-sm` → ~36px de altura total  
**Causa:** `py-3` es 12px + font-size de 14px = ~36px  
**Solución:**  
```tsx
className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold min-h-[44px] transition-all duration-300"
```
**Beneficio:** Touch targets accesibles para ambos CTAs del hero  
**Prioridad:** Alta  
**Impacto:** Los CTAs del hero son críticos para conversión. En móvil, 36px está muy por debajo del estándar de 44px.

### 1.2 Breadcrumb sobre imagen del hero
**Ubicación:** `page.tsx` línea 49 y `HeroSection.tsx`  
**Problema:** El breadcrumb está posicionado `absolute top-0` con `py-4`. El hero tiene textos que pueden quedar detrás del breadcrumb en viewports pequeños.  
**Causa:** El breadcrumb usa position absolute sin un z-index stacking claro respecto al hero. El hero tiene `z-10` en su contenido, el breadcrumb tiene `z-20`.  
**Solución:** Agregar padding-top al contenido del hero equivalente a la altura del breadcrumb (~56px):  
```tsx
// En HeroSection.tsx, agregar pt-14 al contenedor de contenido
className="relative z-10 w-full max-w-[1390px] mx-auto px-[clamp(1rem,3vw,2rem)] pb-16 md:pb-24 pt-14"
```
**Beneficio:** El título del hero no se superpone con el breadcrumb en ningún viewport  
**Prioridad:** Alta  
**Impacto:** En móviles pequeños, el texto del hero queda parcialmente oculto detrás del breadcrumb

---

## 2. ChallengeSection ("El reto")

### 2.1 Watermark absolut posicionado superpone contenido en móvil ⚠️
**Ubicación:** `ChallengeSection.tsx` líneas 14-24  
**Problema:** El span con el texto "RETO" usa `absolute top-1/2 -translate-y-1/2` con `text-[clamp(6rem,15vw,14rem)]`. En móvil, cuando el contenido es poco, el watermark se superpone al texto del párrafo.
**Causa:** El watermark está centrado verticalmente en la sección (`top-1/2 -translate-y-1/2`) con un font-size enorme (15vw = ~56px en 375px, pero con el clamp mínimo de 6rem = 96px). En móvil, la sección `py-20` (80px padding) + contenido puede ser solo ~200px de alto, y el texto de 96px ocupa casi la mitad. Al estar centrado, se superpone al contenido visible.
**Solución:** 
```scss
// En mobile, reducir tamaño del watermark y opacity aún más
// Opción 1: Reducir tamaño en móvil
@media (max-width: 768px) {
  .challenge-watermark span {
    font-size: clamp(3rem, 10vw, 5rem) !important;
    opacity: 0.03; // más sutil
  }
}

// Opción 2 (recomendada): Envolver en un contenedor con overflow-hidden
// y posicionar el watermark en un rincón en lugar de centrado
```
**Solución recomendada en código:** Envolver el watermark en un contenedor y cambiar positioning en móvil:
```tsx
{/* Watermark */}
<div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
  <span
    className="block text-[clamp(6rem,15vw,14rem)] font-bold leading-none tracking-[-0.06em] text-center
               absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
               md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
               max-md:top-0 max-md:left-0 max-md:translate-x-0 max-md:translate-y-0 max-md:mt-4 max-md:ml-4"
    style={{ color: `color-mix(in srgb, var(--color-primary) 5%, transparent)` }}
  >
    {watermark}
  </span>
</div>
```
**Beneficio:** El watermark no interfiere con la legibilidad del contenido en móvil  
**Prioridad:** Alta  
**Impacto:** El usuario menciona específicamente que el título "El reto" se superpone al párrafo. Este es el bug más visible.

### 2.2 Sticky left column en móvil
**Ubicación:** `ChallengeSection.tsx` línea 29  
**Problema:** `className="sticky top-24"` se aplica en todos los viewports, pero en móvil (grid 1 columna) el contenido se apila verticalmente, por lo que `sticky` no tiene sentido y puede causar comportamientos extraños.  
**Causa:** `sticky` en un elemento que no tiene un contenedor padre con overflow visible y altura definida puede hacer que el elemento se comporte como `relative`.  
**Solución:** Condicionar sticky solo para desktop:
```tsx
className="md:sticky md:top-24"
```
**Beneficio:** Comportamiento predecible en móvil, el contenido fluye naturalmente  
**Prioridad:** Media  
**Impacto:** En móvil puede causar que el indicador visual se comporte erráticamente durante el scroll

### 2.3 Espaciado entre título y contenido en móvil
**Ubicación:** `ChallengeSection.tsx` línea 27  
**Problema:** `gap-10 md:gap-16` (40px). En móvil, con 40px de gap entre el título "El reto" y el párrafo, hay demasiado espacio.  
**Causa:** El gap es el mismo para móvil y desktop.  
**Solución:**
```tsx
className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-start"
```
**Beneficio:** Relación visual más cercana entre el título y su contenido  
**Prioridad:** Media  
**Impacto:** El usuario ve "El reto" y tiene que desplazarse demasiado para ver el contenido asociado

---

## 3. ExecutiveSummarySection

### 3.1 Gap excesivo en móvil
**Ubicación:** `ExecutiveSummarySection.tsx` línea 16  
**Problema:** `gap-10 md:gap-16` (40px) entre texto e imagen. En móvil, al apilarse verticalmente, 40px es mucho espacio.  
**Solución:** Reducir gap en mobile:
```tsx
className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center"
```
**Prioridad:** Baja  
**Impacto:** Separación visual demasiado grande entre contenido relacionado

### 3.2 Aspect ratio de imagen en móvil
**Ubicación:** `ExecutiveSummarySection.tsx` línea 26  
**Problema:** `aspect-[4/3]` en todos los viewports. En móvil, una imagen 4:3 puede ocupar demasiado espacio vertical.  
**Solución:** Usar aspect ratio más adecuado para móvil:
```tsx
className="relative aspect-[16/10] md:aspect-[4/3] overflow-hidden rounded-2xl"
```
**Prioridad:** Baja  
**Impacto:** La imagen ocupa ~75% del viewport en móvil, desplazando el texto

---

## 4. Contexto del Proyecto (page.tsx)

### 4.1 Layout grid en móvil
**Ubicación:** `page.tsx` línea 74  
**Problema:** `grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12`. En móvil, 3 secciones (Cliente, Timeline, Tags) se apilan con 32px de gap.  
**Análisis:** El layout es correcto para móvil. Cada sección ocupa 100% del ancho.  
**Observación:** OK, no hay problemas.  
**Prioridad:** Ninguna

### 4.2 Tags y servicios: touch targets
**Ubicación:** `page.tsx` líneas 136-148  
**Problema:** Los tags tienen `px-2.5 py-1 text-[11px]` (~20px altura). Los enlaces de servicios tienen `px-3 py-1 text-[11px]` (~22px altura).  
**Causa:** Elementos visuales no interactivos (tags) OK, pero los enlaces de servicios SÍ son interactivos y tienen ~22px.  
**Solución:**
```tsx
// Para los enlaces de servicios (línea 142):
className="inline-flex items-center gap-1 rounded-full border border-[var(--color-primary)]/20 px-3 py-1.5 text-[11px] font-medium text-[var(--color-primary)] min-h-[32px] transition-colors hover:bg-[var(--color-primary)]/5"
```
**Prioridad:** Media  
**Impacto:** Los enlaces de servicios son difíciles de pulsar con precisión en móvil

---

## 5. Deliverables Section

### 5.1 Padding de cards en móvil
**Ubicación:** `page.tsx` línea 165  
**Problema:** `p-6` (24px padding). Con `gap-4` (16px) entre cards. En 320px, cada card tiene ~272px de ancho.  
**Análisis:** El padding es adecuado, el gap también. No hay problemas de desbordamiento.  
**Observación:** OK  
**Prioridad:** Ninguna

### 5.2 Tamaño de título en cards
**Ubicación:** `page.tsx` línea 170  
**Problema:** `text-base font-bold` (16px) para títulos de entregables. `text-sm` (14px) para descripciones.  
**Análisis:** Jerarquía aceptable.  
**Observación:** OK  
**Prioridad:** Ninguna

---

## 6. Technologies Section

### 6.1 Cards de tecnología en móvil
**Ubicación:** `page.tsx` líneas 188-200  
**Problema:** `grid-cols-2 sm:grid-cols-4` con `gap-3`. En 320px, 2 columnas con gap de 12px dan ~144px por card. El padding `p-4` (16px) + texto puede comprimirse.  
**Solución:** En móvil muy pequeño, considerar reducir padding:
```tsx
className="flex flex-col items-center gap-2 rounded-xl border border-black/[0.06] bg-[var(--color-light)] p-3 md:p-4"
```
**Beneficio:** Las cards no se ven apretadas en 320px  
**Prioridad:** Baja

---

## 7. ScrollGallery

### 7.1 Altura completa en móvil
**Ubicación:** `ScrollGallery.tsx` línea 64  
**Problema:** `className="sticky top-0 w-full h-screen overflow-hidden"`. En móvil, `h-screen` (100vh) puede causar que la imagen se vea muy recortada o que el contenido textual quede fuera de la pantalla.  
**Causa:** 100vh en móvil puede ser mayor que el viewport real debido a las barras del navegador.  
**Solución:** Usar `100dvh` (dynamic viewport height) cuando esté disponible:
```tsx
className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden"
```
**Beneficio:** La imagen ocupa exactamente el viewport visible, sin scroll extra  
**Prioridad:** Media  
**Impacto:** En Safari móvil, 100vh incluye la barra de direcciones, causando que la imagen se vea más grande de lo esperado

### 7.2 Posición del texto sobre imagen
**Ubicación:** `ScrollGallery.tsx` líneas 80-83  
**Problema:** `bottom-12 left-8` (48px desde abajo, 32px desde izquierda). En móvil, el texto puede quedar muy cerca del borde inferior si la imagen es muy vertical.  
**Solución:**
```tsx
className="absolute bottom-16 left-6 md:bottom-16 md:left-12 lg:left-16 max-w-xl ..."
```
**Beneficio:** Más espacio entre el texto y el borde inferior en móvil  
**Prioridad:** Baja

---

## 8. GallerySlider

### 8.1 Botones de navegación: touch targets
**Ubicación:** `GallerySlider.tsx` línea 107  
**Problema:** `h-10 w-10` (40×40px). Por debajo de 44px.  
**Solución:**
```tsx
className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 min-h-[44px] min-w-[44px] rounded-full bg-white/90 ..."
```
**Prioridad:** Alta  
**Impacto:** Los botones de navegación del slider son difíciles de pulsar, especialmente en movimiento

### 8.2 Dots de navegación: touch targets
**Ubicación:** `GallerySlider.tsx` línea 126  
**Problema:** Los dots individuales tienen `h-1.5 w-1.5` (6×6px). El área clickeable es extremadamente pequeña.  
**Causa:** No hay padding que expanda el área táctil del botón.  
**Solución:** Agregar padding expansivo manteniendo el dot pequeño visualmente:
```tsx
<button
  key={i}
  onClick={() => goTo(i, i > current ? 'right' : 'left')}
  className={`flex items-center justify-center p-2 rounded-full transition-all duration-500 focus:outline-none ${
    i === current
      ? 'w-auto'
      : 'w-auto'
  }`}
  aria-label={`Ir a imagen ${i + 1}`}
>
  <span className={`block rounded-full transition-all duration-500 ${
    i === current
      ? 'h-1.5 w-6 bg-white'
      : 'h-1.5 w-1.5 bg-white/40 hover:bg-white/60'
  }`} />
</button>
```
**Beneficio:** Área táctil de 44×44px con dot visual de 6px  
**Prioridad:** Media  
**Impacto:** Los dots son casi imposibles de pulsar con precisión en móvil

---

## 9. StatisticsSection

### 9.1 Layout en móvil
**Ubicación:** `StatisticsSection.tsx` línea 11  
**Problema:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12`. En móvil, 1 columna con 32px de gap. Las estadísticas se apilan verticalmente.  
**Análisis:** Layout correcto. Pero en 320px, el `max-w-[180px]` de la descripción está bien.  
**Observación:** OK  
**Prioridad:** Ninguna

---

## 10. CTA Final (page.tsx)

### 10.1 Botón CTA
**Ubicación:** `page.tsx` línea 219  
**Problema:** `px-8 py-4` (32×16px) → ~48px de altura.  
**Análisis:** OK, cumple 44px.  
**Prioridad:** Ninguna

### 10.2 Padding vertical excesivo
**Ubicación:** `page.tsx` línea 208  
**Problema:** `py-20 md:py-28` (80px). En móvil, con título, párrafo largo y botón, la sección ocupa ~400px de alto.  
**Solución:** Reducir en móvil:
```tsx
className="w-full bg-[var(--color-primary)] py-16 md:py-28"
```
**Prioridad:** Baja  
**Impacto:** Menos ritmo visual, el usuario tarda más en llegar al siguiente contenido

---

## 11. Problemas Transversales

### 11.1 Padding lateral inconsistente
**Ubicación:** `ChallengeSection.tsx` vs `ExecutiveSummarySection.tsx`  
**Problema:** ChallengeSection usa `container-app`. ExecutiveSummarySection también. HeroSection usa su propio `px-[clamp(1rem,3vw,2rem)]` que es idéntico a container-app.  
**Observación:** Bien, todos usan el mismo sistema.  
**Prioridad:** Ninguna

### 11.2 Secciones sin separación visible
**Ubicación:** Entre `ExecutiveSummarySection` y `ChallengeSection`  
**Problema:** Ambas secciones comienzan sin padding-top (solo tienen `w-full`). No hay separación vertical entre ellas.  
**Causa:** ExecutiveSummarySection no tiene `py-*` ni `mb-*`. ChallengeSection tiene `py-20 md:py-28`.  
**Solución:** Agregar `py-16 md:py-20` a ExecutiveSummarySection:
```tsx
// ExecutiveSummarySection.tsx línea 14
<section className="w-full py-16 md:py-20">
```
**Beneficio:** Ritmo visual consistente entre todas las secciones narrativas  
**Prioridad:** Alta  
**Impacto:** Las secciones se pegan unas a otras, creando una experiencia visual pobre

### 11.3 RichTextSection sin padding
**Ubicación:** `RichTextSection.tsx`  
**Problema:** Solo tiene `max-w-3xl mx-auto` sin padding vertical. El contenido puede quedar pegado a las secciones adyacentes.  
**Solución:**
```tsx
<section className="w-full py-16 md:py-20">
  <div className="container-app max-w-3xl mx-auto">
    <PortableTextRenderer value={content} />
  </div>
</section>
```
**Prioridad:** Media  
**Impacto:** Misma falta de ritmo visual que el punto 11.2

### 11.4 Contraste de textos secundarios
**Ubicación:** Global en la página  
**Problema:** `text-[var(--color-dark-gray)]` que ahora es `#6b6b6b` (corregido en el CSS global).  
**Observación:** Ya corregido en la fase anterior de la auditoría.  
**Prioridad:** Ninguna (ya corregido)

---

## 12. Checklist de Dispositivos Responsive

| Componente | 320px | 360px | 375px | 390px | 414px | 430px |
|-----------|-------|-------|-------|-------|-------|-------|
| HeroSection | ⚠️ Breadcrumb overlap | ⚠️ Breadcrumb overlap | ✅ | ✅ | ✅ | ✅ |
| Breadcrumb | ⚠️ Padding-top necesario | ⚠️ Ídem | ✅ | ✅ | ✅ | ✅ |
| ChallengeSection | ❌ Watermark solapa texto | ❌ Watermark solapa | ⚠️ Leve | ⚠️ Leve | ✅ | ✅ |
| ExecutiveSummary | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Context (Client/Timeline) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Context (Tags/Services) | ⚠️ Touch targets pequeños | ⚠️ Ídem | ⚠️ Ídem | ✅ | ✅ | ✅ |
| Deliverables | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Technologies | ⚠️ Cards comprimidas | ✅ | ✅ | ✅ | ✅ | ✅ |
| GallerySlider arrows | ❌ 40px touch targets | ❌ Ídem | ❌ Ídem | ❌ Ídem | ⚠️ | ⚠️ |
| GallerySlider dots | ❌ 6px touch targets | ❌ Ídem | ❌ Ídem | ❌ Ídem | ❌ Ídem | ❌ Ídem |
| ScrollGallery | ⚠️ 100vh issue | ⚠️ Ídem | ⚠️ Ídem | ✅ | ✅ | ✅ |
| StatisticsSection | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| CTA Final | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

✅ = Funciona correctamente  
⚠️ = Tiene problemas menores  
❌ = No funciona correctamente / problema significativo  

---

## 13. Priorización de Correcciones

### 🔴 Alta Prioridad

| # | Problema | Componente | Solución | Esfuerzo |
|---|----------|-----------|----------|----------|
| 1 | Watermark "RETO" superpone contenido | ChallengeSection | Cambiar positioning y tamaño en móvil | Bajo |
| 2 | Breadcrumb superpone hero content | HeroSection | Agregar `pt-14` al contenedor de contenido | Bajo |
| 3 | CTA buttons hero: touch targets 36px | HeroSection | `min-h-[44px]` + `py-3.5` | Bajo |
| 4 | Gallery slider arrows: 40px < 44px | GallerySlider | `h-11 w-11 min-h-[44px]` | Bajo |
| 5 | Secciones sin padding vertical (ExecutiveSummary, RichText) | Múltiples | Agregar `py-16 md:py-20` | Bajo |

### 🟡 Media Prioridad

| # | Problema | Componente | Solución | Esfuerzo |
|---|----------|-----------|----------|----------|
| 6 | Dots del slider: 6px touch targets | GallerySlider | Envolver en span con padding | Bajo |
| 7 | Sticky column innecesario en móvil | ChallengeSection | `md:sticky md:top-24` | Bajo |
| 8 | Gap excesivo título-contenido en móvil | ChallengeSection | `gap-6 md:gap-16` | Bajo |
| 9 | Servicios en contexto: touch targets pequeños | page.tsx | `min-h-[32px]` + `py-1.5` | Bajo |
| 10 | ScrollGallery 100vh vs 100dvh | ScrollGallery | `h-[100dvh]` | Bajo |

### 🟢 Baja Prioridad

| # | Problema | Componente | Solución | Esfuerzo |
|---|----------|-----------|----------|----------|
| 11 | Tech cards padding en 320px | page.tsx | `p-3 md:p-4` | Bajo |
| 12 | CTA final padding vertical | page.tsx | `py-16 md:py-28` | Bajo |
| 13 | ExecutiveSummary aspect ratio | ExecutiveSummarySection | `aspect-[16/10] md:aspect-[4/3]` | Bajo |
| 14 | ScrollGallery bottom position | ScrollGallery | `bottom-16 left-6` | Bajo |

---

## 14. Soluciones Técnicas Detalladas

### 14.1 Fix Watermark ChallengeSection
```tsx
// En ChallengeSection.tsx, reemplazar el div del watermark:
{/* Watermark con overflow-hidden y posición ajustada para móvil */}
<div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
  <span
    className="
      block font-bold leading-none tracking-[-0.06em] text-center
      text-[clamp(3rem,10vw,14rem)]
      md:text-[clamp(6rem,15vw,14rem)]
      absolute top-0 left-0 translate-x-0 translate-y-0 mt-4 ml-4
      md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:mt-0 md:ml-0
    "
    style={{ color: `color-mix(in srgb, var(--color-primary) 5%, transparent)` }}
  >
    {watermark}
  </span>
</div>
```

### 14.2 Fix Breadcrumb + Hero Padding
```tsx
// En HeroSection.tsx, línea 47:
className="relative z-10 w-full max-w-[1390px] mx-auto px-[clamp(1rem,3vw,2rem)] pb-16 md:pb-24 pt-14 md:pt-0"
```

### 14.3 Fix GallerySlider Navigation
```tsx
// Botones de navegación (línea 107):
className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 min-h-[44px] min-w-[44px] rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all duration-300 hover:bg-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"

// Dots (línea 126-136):
<button
  key={i}
  onClick={() => goTo(i, i > current ? 'right' : 'left')}
  className="flex items-center justify-center p-2 rounded-full transition-all duration-500 focus:outline-none"
  aria-label={`Ir a imagen ${i + 1}`}
>
  <span className={`block rounded-full transition-all duration-500 ${
    i === current
      ? 'h-1.5 w-6 bg-white'
      : 'h-1.5 w-1.5 bg-white/40 hover:bg-white/60'
  }`} />
</button>
```

### 14.4 Fix ExecutiveSummary + RichText Padding
```tsx
// ExecutiveSummarySection.tsx - agregar padding:
<section className="w-full py-16 md:py-20">

// RichTextSection.tsx - agregar padding + container-app:
<section className="w-full py-16 md:py-20">
  <div className="container-app">
    <div className="max-w-3xl mx-auto">
      <PortableTextRenderer value={content} />
    </div>
  </div>
</section>
```

---

## 15. Resumen de Cambios por Archivo

| Archivo | Cambios |
|---------|---------|
| `HeroSection.tsx` | Agregar `pt-14` al contenedor; `min-h-[44px]` en CTAs |
| `ChallengeSection.tsx` | Watermark repositioned + reduced size en móvil; sticky condicional; gap reducido |
| `ExecutiveSummarySection.tsx` | Agregar `py-16 md:py-20`; gap reducido en móvil; aspect ratio |
| `RichTextSection.tsx` | Agregar `py-16 md:py-20` + container-app |
| `page.tsx` (proyectos/[slug]) | `min-h-[32px]` en enlaces de servicios; `p-3 md:p-4` en tech cards; `py-16 md:py-28` en CTA |
| `GallerySlider.tsx` | Arrows a 44px; dots con padding expansivo |
| `ScrollGallery.tsx` | `100dvh` fallback; bottom position ajustado |

---

## Conclusión

La vista de detalle de proyecto está bien estructurada pero tiene problemas específicos que degradan la experiencia móvil:

1. **El bug más crítico** (mencionado por el usuario) es el **watermark "RETO"** en ChallengeSection que se superpone al contenido en móvil debido a su positioning absoluto centrado y tamaño excesivo.
2. **Touch targets** en HeroSection CTAs y GallerySlider arrows están por debajo de 44px.
3. **Falta de padding vertical** en ExecutiveSummarySection y RichTextSection rompe el ritmo visual entre secciones narrativas.

Todos los fixes son cambios localizados de bajo riesgo que no afectan la identidad visual ni el layout en desktop.