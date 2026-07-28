# Auditoría UX Móvil – Star Grow Studio

> **Fecha:** Julio 2026  
> **Dispositivo objetivo:** 320px–430px  
> **Principios aplicados:** Material Design, HIG (Apple), NN Group, Laws of UX, WCAG 2.2

---

## Resumen Ejecutivo

La versión móvil del sitio tiene una base sólida con un sistema de diseño incipiente (variables CSS, container-app, section-heading), pero presenta oportunidades de mejora significativas en espaciado, jerarquía visual, touch targets y ritmo de scroll. No se detectaron problemas críticos de funcionalidad, pero sí múltiples detalles que, corregidos, elevarían la experiencia de "buena" a "premium".

**Problemas principales detectados:**
1. Touch targets por debajo de 44px en múltiples componentes
2. Padding lateral inconsistente entre secciones
3. Hero section excesivamente larga en móvil (100vh + contenido)
4. Cards de planes más anchas que la pantalla en 320px
5. Falta de ritmo visual con bloques de texto largos sin descansos
6. Contraste insuficiente en algunos textos secundarios

---

## 1. Navegación (NavBar)

### 1.1 Touch targets del menú móvil
**Problema:** Los items del menú móvil tienen `py-2` (8px). Con un font-size de `0.92rem` (~14.7px), la altura total del touch target es ~31px.  
**Por qué afecta:** WCAG 2.2 y HIG recomiendan mínimo 44px para objetivos táctiles. Dificulta la precisión con el pulgar.  
**Solución:** Cambiar a `py-3` (12px) para alcanzar ~39px, o usar `min-h-[44px]` con `flex items-center`.  
**Beneficio:** Reducción de errores de navegación, especialmente en menús expandidos.  
**Prioridad:** Alta  

### 1.2 Botón "Cotizar ahora" en móvil
**Problema:** `padding: py-2.5` (10px) con font-size `0.9rem` (~14.4px). Altura total ~34px. Margen superior `mt-2`.  
**Por qué afecta:** Por debajo del mínimo de 44px. En un CTA principal, cualquier fricción reduce conversión.  
**Solución:** `min-h-[44px]` con `py-3` (12px). Aumentar el área táctil sin cambiar el padding visual usando un pseudo-elemento o `min-h`.  
**Beneficio:** Mayor facilidad para cotizar desde móvil, incremento en tasa de conversión.  
**Prioridad:** Alta  

### 1.3 Hamburguesa icono
**Problema:** El botón hamburguesa mide `h-5 w-7` (20×28px). Las barras son de 3px.  
**Por qué afecta:** Área táctil menor a 44×44px recomendada. Usuarios con pulgares grandes o en movimiento pueden fallar al pulsar.  
**Solución:** Aumentar a `min-h-[44px] min-w-[44px]` manteniendo el icono centrado internamente. Usar `p-2` para expandir el área clickeable.  
**Beneficio:** Mejora ergonómica inmediata, especialmente en dispositivos pequeños.  
**Prioridad:** Media  

### 1.4 Distancia entre items del menú
**Problema:** Los items usan `gap-1` (4px) entre sí.  
**Por qué afecta:** Al hacer scroll con el pulgar, es fácil pulsar el item equivocado si están muy juntos.  
**Solución:** Aumentar a `gap-2` (8px) o `gap-1.5` (6px).  
**Beneficio:** Navegación más precisa y cómoda.  
**Prioridad:** Media  

### 1.5 Cierre del menú al seleccionar
**Problema:** El menú móvil es un dropdown que ocupa toda la pantalla (`max-h-[calc(100vh-4rem)]`), pero al seleccionar una opción se cierra correctamente (usa `closeAll`). OK.  
**Oportunidad:** Agregar un overlay semitransparente detrás del menú para mejorar el contraste visual y enfocar la atención.  
**Beneficio:** Claridad visual, el usuario sabe que está en un "modal" de navegación.  
**Prioridad:** Baja  

---

## 2. Hero Section (Banner)

### 2.1 Altura excesiva en móvil
**Problema:** `height: 100vh` en móvil (92vh base). Con el contenido vertical (descripción arriba, slider abajo), el banner ocupa toda la pantalla + el slider de imágenes.  
**Por qué afecta:** El usuario ve ~60% de texto y necesita hacer scroll inmediato para ver el slider. Sensación de desequilibrio vertical. La ley de **Jakob's Law** sugiere que los usuarios esperan ver contenido relevante sin scroll excesivo.  
**Solución:** Reducir a `min-h-[85vh]` o `min-h-screen` y permitir que el contenido respire dentro de ese espacio, sin forzar el 100% exacto. Considerar apilar texto e imágenes en lugar de partirlos 50/50.  
**Beneficio:** Ritmo visual más natural, el usuario ve el valor completo del hero de un vistazo.  
**Prioridad:** Alta  

### 2.2 CTA buttons: tamaño y separación
**Problema:** `padding: 10px 16px` (8px 12px en ≤380px). `white-space: nowrap` puede causar overflow en textos largos. Gap entre botones: `gap: 10px`.  
**Por qué afecta:** Touch target ~30-34px, por debajo de 44px WCAG. En 320px, los botones pueden salirse del contenedor si el texto es largo.  
**Solución:**  
- `min-h-[44px]` con `padding: 12px 20px`  
- Reemplazar `white-space: nowrap` por `white-space: normal` con ancho flexible  
- Aumentar gap entre botones a 12px  
**Beneficio:** Touch targets accesibles, sin riesgo de overflow, mejor ergonomía.  
**Prioridad:** Alta  

### 2.3 Jerarquía visual del título
**Problema:** `font-size: clamp(1.4rem, 4.5vw, 1.8rem)` (≈22-29px). `line-height: 1.3`. El título tiene dos líneas con colores distintos.  
**Por qué afecta:** En móvil, la jerarquía es aceptable pero el tamaño podría ser mayor para ser impactante. La línea de "El crecimiento que buscas" y "empieza con tecnología que transforma" tienen pesos similares.  
**Solución:** Aumentar a `clamp(1.6rem, 5vw, 2rem)` en móvil y dar más peso (800) a la primera línea. La segunda línea (color primario) puede ser ligeramente menor.  
**Beneficio:** Mayor impacto emocional al cargar la página.  
**Prioridad:** Media  

### 2.4 Lista de beneficios en hero
**Problema:** `max-width: 90%` + `padding: 0 10px`. Cada item tiene `margin-block: 6px`.  
**Por qué afecta:** El 90% sumado al padding inconsistente con container-padding crea desalineación con el resto de la sección.  
**Solución:** Usar `width: 100%` y respetar el padding del contenedor padre. Aumentar separación entre items a 10px.  
**Beneficio:** Alineación perfecta con el sistema de diseño del sitio.  
**Prioridad:** Media  

### 2.5 Slider de imágenes en móvil
**Problema:** Ocupa 25-30% del alto del banner (en móvil). Espacio considerable para un carrusel decorativo.  
**Por qué afecta:** Espacio que podría usarse para que el contenido principal respire mejor. El slider tiene poco valor funcional en móvil.  
**Solución:** Reducir a 20-22% del alto, o considerar cambiar el slider por una imagen estática de respaldo. Simplificar animaciones en móvil.  
**Beneficio:** Más espacio para el contenido relevante, carga más rápida.  
**Prioridad:** Media  

---

## 3. Sección "Nuestros Servicios" (ServicesSection)

### 3.1 Padding vertical excesivo
**Problema:** `py-24 md:py-32` → 96px de padding vertical en móvil (48px arriba + 48px abajo). Más el `mb-16 md:mb-20` del header (64px).  
**Por qué afecta:** Hay ~160px de espaciado vertical antes de que empiece el contenido real de las cards. Demasiado aire que puede hacer que el usuario sienta que la página "no avanza".  
**Solución:** Reducir a `py-16 md:py-24` (64px). Reducir `mb-16` a `mb-12` (48px).  
**Beneficio:** Mejor ritmo de scroll, el contenido aparece más rápido.  
**Prioridad:** Media  

### 3.2 Cards de servicio en móvil
**Problema:** En móvil (grid 1 columna), las cards usan `p-6 md:p-7` o `gap-4 p-6`. La variante `hero` usa `p-8 md:p-10` y en móvil el icono grande de 64×64px.  
**Por qué afecta:** El padding lateral de 24px (p-6) total es 48px. Con container-padding de 16px, el espacio total de padding es 80px en una pantalla de 375px, dejando solo 295px para contenido. Las cards se ven comprimidas.  
**Solución:** Reducir padding lateral a `px-5` (20px) en móvil para cards compact. En hero card, considerar apilar verticalmente en lugar de row.  
**Beneficio:** Mejor uso del espacio horizontal, texto más legible.  
**Prioridad:** Media  

### 3.3 Texto de descripción
**Problema:** `line-clamp-3` en compact corta el texto a 3 líneas. En hero: `max-w-md` (~448px) que en móvil es básicamente todo el ancho.  
**Por qué afecta:** En móvil el line-clamp puede cortar información importante.  
**Solución:** Aumentar a `line-clamp-4` o `line-clamp-none` en móvil y dejar que el contenido fluya. Revisar que todos los textos tengan el largo adecuado para móvil.  
**Beneficio:** Usuarios móviles ven suficiente información para decidir si explorar.  
**Prioridad:** Baja  

### 3.4 CTA "Solicitar diagnóstico"
**Problema:** `px-6 py-3` (24×12px). Touch target ~36px.  
**Por qué afecta:** Por debajo de 44px WCAG.  
**Solución:** `min-h-[44px]` y ajustar padding.  
**Beneficio:** Cumplimiento WCAG, mejor experiencia táctil.  
**Prioridad:** Alta  

---

## 4. Portafolio (Portfolio)

### 4.1 Slider horizontal en móvil
**Problema:** El slider horizontal con `no-scrollbar` funciona, pero los botones de navegación son `w-10 h-10` (40×40px). Están posicionados `left-2 / right-2`.  
**Por qué afecta:** Botones de 40px por debajo de 44px. Además, en móvil los botones se superponen al contenido porque están en posición absoluta.  
**Solución:**  
- Aumentar botones a `min-w-[44px] min-h-[44px]`  
- En móvil, considerar ocultar los botones y usar solo el scroll horizontal nativo (más natural en dispositivos táctiles)  
- Agregar indicadores de scroll (dots) para mostrar al usuario que hay más contenido  
**Beneficio:** Navegación más natural en móvil, sin elementos UI que obstruyan.  
**Prioridad:** Media  

### 4.2 Tabs de categorías
**Problema:** Los tabs son un componente que viene de `TabsNav`. No se ve el código, pero en móvil los tabs pueden desbordar si tienen muchos.  
**Sugerencia:** Verificar que los tabs sean desplazables horizontalmente en móvil.  
**Prioridad:** Baja  

---

## 5. Planes y Precios

### 5.1 Cards más anchas que la pantalla
**Problema:** Las cards tienen `w-[340px]` fijo. En 320px, con container-padding de 16px por lado, el espacio disponible es 288px. La card de 340px desborda.  
**Por qué afecta:** El usuario debe hacer scroll horizontal para ver el contenido completo. Fricción severa en dispositivos pequeños.  
**Solución:**  
- Cambiar a `w-full` en móvil con `max-w-[340px]`  
- O usar `min-w-[280px]` con un contenedor de scroll horizontal  
- En móvil (<480px), forzar cards a ancho completo del viewport con padding  
**Beneficio:** Legibilidad total sin scroll horizontal forzado.  
**Prioridad:** Alta  

### 5.2 Cinta de tier (esquina)
**Problema:** La cinta usa `w-[120px] h-[120px]` con texto rotado 45°. En móvil esto ocupa espacio y puede solaparse con el título.  
**Por qué afecta:** Puede cubrir contenido importante como el nombre del plan o el precio. Dificulta la legibilidad.  
**Solución:** En móvil, reemplazar por un badge inline arriba a la derecha (sin rotación), o reducir el tamaño del ribbon.  
**Beneficio:** Claridad visual, no se oculta información.  
**Prioridad:** Media  

### 5.3 Botón "Solicitar este servicio"
**Problema:** `p-4` (16px) y `rounded-2xl`. El botón es full-width, lo cual es bueno, pero el padding vertical de 16px da ~32px + font = ~48px. OK.  
**Observación:** Touch target OK.  
**Prioridad:** Ninguna  

### 5.4 Precios y texto
**Problema:** `text-[30px]` para el precio. El span de " (COP)" está en `text-sm font-normal text-white` con `text-black` inline.  
**Por qué afecta:** Contraste pobre si el fondo no es blanco puro. Puede ser confuso.  
**Solución:** Asegurar que "COP" tenga contraste suficiente. Considerar hacerlo más sutil.  
**Prioridad:** Baja  

---

## 6. Trust Section (Por qué Star Grow Studio)

### 6.1 Padding y espaciado
**Problema:** `py-20 md:py-28` (80px). `mb-14 md:mb-20` (56px). Espaciado generoso pero adecuado.  
**Observación:** Bien.  
**Prioridad:** Ninguna  

### 6.2 Touch targets en tags
**Problema:** Los tags (`rounded-full border px-2.5 py-1 text-[0.7rem]`) son de ~20-24px de alto.  
**Por qué afecta:** Son elementos visuales, no interactivos, por lo que no necesitan ser touch targets. OK.  
**Prioridad:** Ninguna  

### 6.3 CTA final "Hablemos de tu proyecto"
**Problema:** `px-6 py-3 text-sm` (24×12px, 14px font). Touch target ~34px.  
**Por qué afecta:** Por debajo de 44px.  
**Solución:** `min-h-[44px]` con `py-3.5` (14px).  
**Beneficio:** CTA accesible, más conversiones.  
**Prioridad:** Alta  

### 6.4 Contador +120
**Problema:** En móvil, el contador y el texto están en la misma línea: `flex items-baseline gap-2`. El texto "proyectos entregados con resultados medibles" es largo.  
**Por qué afecta:** En 320px, el texto puede partirse en varias líneas y perder legibilidad.  
**Solución:** En móvil, apilar verticalmente: el contador arriba, el texto debajo.  
**Beneficio:** Legibilidad garantizada en todos los anchos.  
**Prioridad:** Baja  

---

## 7. Acerca de (AboutUs - en HomeClient)

### 7.1 Imagen y texto en columna
**Problema:** La sección usa `flex-col lg:flex-row`. En móvil la imagen va arriba (250×250px) y el texto abajo con `gap-2.5`.  
**Observación:** El layout es correcto para móvil.  
**Prioridad:** Ninguna  

### 7.2 Título
**Problema:** `text-3xl font-bold` (30px). `lg:w-[70%] lg:text-4xl`. En móvil es 30px, aceptable.  
**Observación:** OK  
**Prioridad:** Ninguna  

### 7.3 Botón "Agenda tu cita"
**Problema:** `p-4` (16px) y `w-fit`. Touch target: ~32px + font ≈ 50px. OK.  
**Observación:** Bien  
**Prioridad:** Ninguna  

---

## 8. Pasos del Proceso (Grid en HomeClient)

### 8.1 Títulos y subtítulos
**Problema:** Título grande con `text-3xl text-center`. Subtítulo `text-[var(--color-primary-to-white)]`.  
**Observación:** No se ve el código del Grid desde HomeClient, pero los steps se renderizan dentro de Grid.  
**Prioridad:** Ninguna  

### 8.2 Calls to action en article
**Problema:** `h-[250px] lg:h-[170px]` → En móvil 250px de alto para la call-to-action. Mucho espacio para un CTA simple.  
**Por qué afecta:** Ocupa demasiado espacio vertical para el valor que aporta.  
**Solución:** Reducir a `min-h-[200px]` en móvil y apilar contenido verticalmente. El botón "Solicitar una cita" puede ser más compacto.  
**Beneficio:** Mejor ritmo de scroll.  
**Prioridad:** Baja  

### 8.3 Botón "Solicitar una cita"
**Problema:** `p-3` (12px) y `text-nowrap`. Touch target ~36px.  
**Por qué afecta:** Bordeando el mínimo recomendado.  
**Solución:** `min-h-[44px]`  
**Beneficio:** Consistencia con el resto del sitio.  
**Prioridad:** Media  

---

## 9. Contacto

### 9.1 Formulario: inputs
**Problema:** `px-4 py-3` (16×12px). Touch target ~32px + 14px font = 36px total.  
**Por qué afecta:** Por debajo de 44px. Los inputs de formulario son puntos críticos de fricción.  
**Solución:** `py-3.5` (14px) o `min-h-[44px]` con flex centrado.  
**Beneficio:** Mayor facilidad para escribir en móvil, menos errores.  
**Prioridad:** Alta  

### 9.2 Botón "Enviar mensaje"
**Problema:** `px-6 py-3` (24×12px) → ~36px touch target.  
**Por qué afecta:** Mismo problema que otros CTAs.  
**Solución:** `min-h-[44px]`  
**Beneficio:** Consistencia y accesibilidad.  
**Prioridad:** Alta  

### 9.3 Cards de información de contacto
**Problema:** `p-6 lg:p-8` (24px). Los iconos tienen `h-11 w-11` (44×44px).  
**Observación:** Bien, los iconos cumplen 44px.  
**Prioridad:** Ninguna  

### 9.4 Gap entre canales de contacto
**Problema:** `space-y-5` (20px).  
**Observación:** Adecuado.  
**Prioridad:** Ninguna  

### 9.5 Contraste del texto secundario
**Problema:** `text-[var(--color-dark-gray)]` que es `#929292`.  
**Por qué afecta:** El contraste de #929292 sobre fondo #FAFAFA es aproximadamente 3:1, por debajo del 4.5:1 requerido por WCAG AA para texto normal.  
**Solución:** Oscurecer el color a `#6b6b6b` o superior para alcanzar 4.5:1 de contraste.  
**Beneficio:** Legibilidad para usuarios con baja visión.  
**Prioridad:** Alta  

---

## 10. Footer

### 10.1 Columnas en móvil
**Problema:** `grid grid-cols-2 gap-8` → 2 columnas con 32px de gap. En 320px, cada columna tiene ~120px.  
**Por qué afecta:** Los textos de servicios pueden cortarse o verse apretados en 120px de ancho.  
**Solución:** En móvil (<480px), cambiar a `grid-cols-1` y mostrar en lista vertical. O mantener 2 columnas pero reducir gap a 16px.  
**Beneficio:** Legibilidad del contenido del footer.  
**Prioridad:** Media  

### 10.2 Iconos de contacto (redes)
**Problema:** `h-9 w-9` (36×36px).  
**Por qué afecta:** Por debajo de 44px para elementos táctiles.  
**Solución:** Aumentar a `h-11 w-11` (44×44px) o agregar padding interno que expanda el área táctil.  
**Beneficio:** Touch targets accesibles.  
**Prioridad:** Alta  

### 10.3 Enlaces legales
**Problema:** `text-xs` → 12px font. Touch targets de ~16-18px.  
**Por qué afecta:** Extremadamente pequeños para interacción táctil.  
**Solución:** Aumentar a `text-sm` (14px) con `min-h-[44px]` o padding vertical suficiente.  
**Beneficio:** Accesibilidad en enlaces legales, que suelen ser requeridos.  
**Prioridad:** Media  

### 10.4 Separación entre secciones del footer
**Problema:** Las secciones están separadas por bordes con `py-6`, `py-10`, `pt-6`.  
**Observación:** Espaciado adecuado.  
**Prioridad:** Ninguna  

---

## 11. Problemas Transversales

### 11.1 Container padding inconsistente
**Problema:** Algunas secciones usan `container-app` que tiene `padding-inline: clamp(1rem, 3vw, 2rem)`. Otras secciones (Banner) usan su propio sistema con `max-width: 90%` + `padding-inline: 10px`.  
**Por qué afecta:** El contenido del banner está desalineado con el resto del sitio. En móvil, el banner tiene ~36px de padding lateral total vs 32-56px del resto.  
**Solución:** Unificar todas las secciones para usar `container-app`. En el banner, reemplazar los paddings manuales por el sistema de contenedor.  
**Beneficio:** Consistencia visual perfecta en todo el sitio.  
**Prioridad:** Alta  

### 11.2 Ritmo de scroll entre secciones
**Problema:** `main` tiene `scroll-snap-type: y mandatory` y las secciones tienen gap de `gap-12` (48px). Algunas secciones tienen padding vertical de 80-96px, otras de 48px.  
**Por qué afecta:** La falta de un ritmo uniforme hace que el scroll no se sienta fluido. La ley de **Hick's Law** sugiere que la uniformidad reduce la carga cognitiva.  
**Solución:** Estandarizar el padding vertical de secciones a `py-16 md:py-20` (64-80px) en todo el sitio. Mantener gap consistente.  
**Beneficio:** Ritmo predecible, el usuario sabe qué esperar al hacer scroll.  
**Prioridad:** Alta  

### 11.3 Jerarquía tipográfica
**Problema:** Los títulos de sección tienen `--section-heading-size: clamp(1.4rem, 2.4vw, 2rem)` (≈22-32px). Los subtítulos varían entre secciones.  
**Por qué afecta:** En móvil, 22px para un título H2 puede ser pequeño. La diferencia entre H1 (30px en AboutUs) y H2 (22px) es poca.  
**Solución:** Aumentar jerarquía:
- H1 (hero): `clamp(1.8rem, 5vw, 2.5rem)` 
- H2 (secciones): `clamp(1.5rem, 3vw, 2rem)`
- H3 (cards): `clamp(1.1rem, 2vw, 1.3rem)`
- Body: `clamp(0.875rem, 1.5vw, 1rem)` (14-16px)
**Beneficio:** Pirámide visual clara, el usuario identifica instantáneamente qué es importante.  
**Prioridad:** Alta  

### 11.4 Touch targets generales
**Problema:** Múltiples botones e inputs con touch targets entre 30-36px.  
**Por qué afecta:** No cumplen la recommendation de 44px de WCAG 2.2 / HIG.  
**Solución:** Auditoría global de todos los elementos interactivos: botones, links, inputs, iconos. Aplicar `min-h-[44px] min-w-[44px]` usando una clase utilitaria `.touch-target` o `@layer utilities`.  
**Beneficio:** El sitio cumple con estándares de accesibilidad, mejorando la experiencia para todos los usuarios.  
**Prioridad:** Alta  

### 11.5 Contraste de color secundario
**Problema:** `--color-dark-gray: #929292` se usa extensamente en textos de descripción.  
**Por qué afecta:** Contraste insuficiente (~3:1) para WCAG AA. Textos de 14-16px necesitan 4.5:1 mínimo.  
**Solución:** Cambiar a `#6b6b6b` o `#757575`.  
**Beneficio:** Legibilidad en todos los contextos de iluminación.  
**Prioridad:** Alta  

### 11.6 Anchor links y scroll-padding
**Problema:** `section:not(#contacto) { scroll-padding-top: 400px }`.  
**Por qué afecta:** 400px en móvil es enorme. Al navegar por anchor links, el contenido queda desplazado hacia abajo excesivamente.  
**Solución:** En móvil, reducir a `80px` (altura del navbar).  
**Beneficio:** Navegación precisa con anchor links.  
**Prioridad:** Alta  

---

## 12. Micro UX y Animaciones

### 12.1 Estados hover (sin efecto en móvil)
**Problema:** Múltiples hover states (`hover:bg`, `hover:scale`, `hover:shadow`) que no tienen equivalente `active:` en móvil.  
**Por qué afecta:** En táctil, no hay hover. El usuario no recibe feedback visual inmediato al tocar.  
**Solución:** Agregar `active:` states equivalentes: `active:scale-[0.98]`, `active:opacity-80`.  
**Beneficio:** Feedback visual táctil premium, sensación de respuesta inmediata.  
**Prioridad:** Media  

### 12.2 Transiciones de scroll reveal
**Problema:** Las secciones usan `translate-y-8 opacity-0 → translate-y-0 opacity-100` con delays escalonados.  
**Observación:** Bien implementado. Sugerencia: reducir delay máximo a 400ms en móvil para que el contenido aparezca más rápido.  
**Beneficio:** Percepción de velocidad mejorada.  
**Prioridad:** Baja  

### 12.3 Loading states
**Problema:** El formulario de contacto tiene spinner, OK. Pero no se detectan skeleton loaders para contenido dinámico.  
**Sugerencia:** Agregar skeleton loaders para las cards de servicios y proyectos mientras cargan.  
**Prioridad:** Baja  

### 12.4 Parallax en móvil
**Problema:** El banner tiene parallax scroll (`translateY(${scrollY * 0.1}px)`).  
**Por qué afecta:** En móvil, el parallax puede causar jank (tirones) y sensación de lentitud. El efecto es apenas perceptible.  
**Solución:** Deshabilitar parallax en móvil (<768px) usando un media query o condición `window.innerWidth`.  
**Beneficio:** Rendimiento más suave, menor consumo de batería.  
**Prioridad:** Media  

---

## 13. Rendimiento Percibido

### 13.1 Imágenes sin lazy loading optimizado
**Problema:** Las imágenes en banner y servicios usan `loading="lazy"` en algunas pero no en todas.  
**Sugerencia:** Asegurar que todas las imágenes below-the-fold tengan `loading="lazy"`. Las imágenes del hero (above-the-fold) deben tener `loading="eager"` o `fetchpriority="high"`.  
**Prioridad:** Media  

### 13.2 Animaciones en scroll costosas
**Problema:** El parallax en el banner dispara re-renders en cada evento de scroll.  
**Por qué afecta:** En móviles de gama media-baja, esto causa jank.  
**Solución:** Usar `will-change: transform` (ya está) pero deshabilitar en móvil.  
**Prioridad:** Media  

### 13.3 Botones con gradientes
**Problema:** El botón de enviar en contacto usa `bg-gradient-to-r`.  
**Observación:** Las gradients tienen buen rendimiento en CSS moderno. OK.  
**Prioridad:** Ninguna  

---

## 14. Checklist de Dispositivos Responsive

| Componente | 320px | 360px | 375px | 390px | 414px | 430px |
|-----------|-------|-------|-------|-------|-------|-------|
| NavBar | ⚠️ Menú items pequeños | ⚠️ Igual | ⚠️ Igual | ⚠️ Igual | ⚠️ Igual | ⚠️ Igual |
| Banner Hero | ⚠️ Botones pequeños | ⚠️ Botones pequeños | ✅ | ✅ | ✅ | ✅ |
| Services Cards | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Portfolio | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Plans & Prices | ❌ Cards desbordan | ⚠️ Justo | ✅ | ✅ | ✅ | ✅ |
| Trust Section | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Contact | ⚠️ Inputs pequeños | ⚠️ Igual | ⚠️ Igual | ⚠️ Igual | ⚠️ Igual | ⚠️ Igual |
| Footer | ⚠️ Columnas apretadas | ✅ | ✅ | ✅ | ✅ | ✅ |

✅ = Funciona correctamente  
⚠️ = Tiene problemas menores de espaciado/touch  
❌ = No funciona correctamente  

---

## 15. Priorización de Correcciones

### 🔴 Alta Prioridad (Impacto directo en UX y accesibilidad)

| # | Problema | Sección | Esfuerzo | Impacto |
|---|----------|---------|----------|---------|
| 1 | Touch targets < 44px (general) | Todo el sitio | Medio | Alto |
| 2 | Contraste insuficiente (#929292) | Global | Bajo | Alto |
| 3 | Cards de planes desbordan en 320px | Plans | Bajo | Alto |
| 4 | Padding lateral inconsistente (Banner) | Banner | Bajo | Alto |
| 5 | Scroll-padding 400px en móvil | Global | Bajo | Alto |
| 6 | CTA buttons pequeños (Hero, Trust, Contact) | Múltiples | Bajo | Alto |
| 7 | Inputs de formulario pequeños | Contact | Bajo | Alto |
| 8 | Iconos de contacto en footer pequeños | Footer | Bajo | Alto |

### 🟡 Media Prioridad (Mejora significativa)

| # | Problema | Sección | Esfuerzo | Impacto |
|---|----------|---------|----------|---------|
| 9 | Hero section demasiado alta | Banner | Medio | Medio |
| 10 | Ritmo de scroll inconsistente | Global | Medio | Medio |
| 11 | Jerarquía tipográfica plana | Global | Medio | Medio |
| 12 | Botones de slider de portafolio pequeños | Portfolio | Bajo | Medio |
| 13 | Parallax en móvil (rendimiento) | Banner | Bajo | Medio |
| 14 | Footer columnas apretadas en 320px | Footer | Bajo | Medio |
| 15 | Estados active táctiles ausentes | Global | Bajo | Medio |
| 16 | Distancia entre items del menú móvil | NavBar | Bajo | Medio |

### 🟢 Baja Prioridad (Detalles premium)

| # | Problema | Sección | Esfuerzo | Impacto |
|---|----------|---------|----------|---------|
| 17 | Loading skeletons para contenido dinámico | Global | Alto | Bajo |
| 18 | Cinta de plans solapa contenido | Plans | Bajo | Bajo |
| 19 | Overlay del menú móvil | NavBar | Bajo | Bajo |
| 20 | Contador +120 en Trust Section | Trust | Bajo | Bajo |
| 21 | Reducir delay de animaciones en móvil | Global | Bajo | Bajo |

---

## 16. Recomendaciones por Principio

### Material Design
- **Elevación:** Las cards de servicio usan `hover:shadow`. Aplicar elevación estándar de 1dp-2dp en móvil.
- **Touch targets:** Todos los elementos interactivos deben ser ≥ 48×48dp (≈44px).
- **Motion:** Usar `cubic-bezier(0.2, 0, 0, 1)` (easing estándar de Material) en lugar de `ease-out`.

### Human Interface Guidelines (Apple)
- **Ergonomía del pulgar:** Zona de interacción principal en la mitad inferior de la pantalla. Los CTAs principales deben estar en esta zona.
- **Tamaño mínimo táctil:** 44×44pt.
- **Contraste:** Relación de contraste ≥ 4.5:1 para texto normal, ≥ 3:1 para texto grande.

### Nielsen Norman Group
- **Escaneabilidad:** Los usuarios escanean en patrón F en móvil. Los títulos deben ser impactantes, los subtítulos claros.
- **Jakob's Law:** Los usuarios pasan la mayor parte del tiempo en otros sitios. Seguir patrones conocidos (logo a la izquierda, menú hamburguesa, CTA visible).
- **Law of Proximity:** Elementos relacionados deben estar cerca (grupos de iconos + texto en servicios).

### Laws of UX
- **Hick's Law:** Reducir opciones visibles. En el menú móvil, agrupar por categorías.
- **Fitts's Law:** Botones CTA grandes y cerca del pulgar. El "Cotizar ahora" debe ser el más fácil de alcanzar.
- **Miller's Law:** No mostrar más de 7±2 items simultáneos en listas.

### WCAG 2.2
- **2.5.8 Target Size (AA):** Objetivos táctiles ≥ 24×24px, con excepciones.
- **2.5.8 Target Size (AAA):** Objetivos táctiles ≥ 44×44px.
- **1.4.3 Contrast (AA):** Texto normal ≥ 4.5:1, texto grande ≥ 3:1.
- **1.4.11 Non-text Contrast:** Componentes UI deben tener contraste ≥ 3:1.

---

## 17. Resumen de Cambios Prioritarios

### Cambios inmediatos (< 1 hora)
1. Aumentar contraste de `--color-dark-gray` de `#929292` a `#6b6b6b` (1 línea de CSS)
2. Reducir `scroll-padding-top` en móvil a 80px (1 regla CSS)
3. Agregar `min-h-[44px]` a botones CTA principales (Hero, Trust, Contact)
4. Cambiar cards de plans de `w-[340px]` a `w-full max-w-[340px]`
5. Aumentar iconos de footer de 36px a 44px

### Cambios de medio plazo (< 1 día)
1. Unificar padding lateral usando solo `container-app`
2. Estandarizar padding vertical de secciones a 64-80px
3. Implementar estados `active:` táctiles en botones y links
4. Aumentar touch targets de inputs de formulario a 44px
5. Mejorar jerarquía tipográfica global

### Cambios a futuro (1-2 días)
1. Rediseñar layout del banner en móvil (apilar, reducir altura)
2. Agregar skeleton loaders
3. Optimizar imágenes con lazy loading estratégico
4. Deshabilitar parallax en móvil
5. Mejorar columnas del footer en 320px

---

## Conclusión

Star Grow Studio tiene una base de diseño sólida y profesional. Los problemas detectados son en su mayoría ajustes finos de espaciado, tamaño táctil y consistencia. Con las correcciones propuestas, la experiencia móvil pasará de ser "funcional" a "premium", alineándose con el estándar de agencias tecnológicas de alto nivel.

El cambio de mayor impacto con menor esfuerzo es la **estandarización de touch targets a 44px** en todo el sitio, seguido de la **mejora del contraste del texto secundario**. Ambos son cambios puramente CSS que no afectan la identidad visual pero transforman la experiencia de uso.