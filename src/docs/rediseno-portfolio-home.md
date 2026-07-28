# Propuesta de Rediseño – Sección Proyectos del Home

> **Fecha:** Julio 2026  
> **Rol:** Creative Director / Senior UX/UI Designer  
> **Referencias:** Awwwards, Linear, Vercel, Active Theory, Dogstudio

---

## 1. Análisis Crítico de la Implementación Actual

### Problemas detectados en `Portfolio.tsx` + `ContentCard`

| Problema | Causa | Impacto |
|----------|-------|---------|
| **Una card visible a la vez** | `min-w-[350px]` fijo en un slider horizontal de 70% ancho | El usuario debe hacer scroll/clic para ver cada proyecto. Baja densidad de información. |
| **Espacio vertical ineficiente** | Cada card mide 200px de imagen + padding + texto = ~400px de alto | En escritorio, 1 proyecto ocupa toda la pantalla |
| **Slider con flechas poco intuitivo** | Los botones de navegación compiten con el scroll nativo | Confusión en usuario: ¿deslizo con el mouse o uso las flechas? |
| **Información redundante** | Nombre del proyecto, descripción larga y tecnologías en cada card | Demasiado texto para un vistazo rápido. El detalle debería estar en la página de proyecto, no en el home |
| **Tabs horizontales** | Filtran por categoría pero ocultan proyectos | El usuario no ve todos los proyectos disponibles, solo los de 1 categoría |
| **Diseño genérico** | Card blanca con borde, sombra, imagen rectangular | Se ve como cualquier portafolio de plantilla |
| **Sin jerarquía visual** | Todos los proyectos tienen el mismo tamaño y peso | No hay proyecto destacado ni flujo narrativo |
| **Desktop = Móvil** | El diseño es idéntico en todos los viewports | No aprovecha el espacio de escritorio |

### Conclusión del análisis

La sección actual ocupa ~500px de alto en el home para mostrar **1 solo proyecto**. Con 4 proyectos totales (y solo 1-3 visibles según el tab activo), la densidad de información es extremadamente baja. El usuario interactúa más con el slider que con el contenido de los proyectos.

---

## 2. Conceptos Propuestos

---

### CONCEPTO A: "Editorial Spread"

**Filosofía:** Inspirado en revistas de diseño como *Wallpaper\**, *Kinfolk* y *Monocle*. Los proyectos se presentan como spreads editoriales con composiciones asimétricas, alternando tamaños, imágenes recortadas y tipografía superpuesta.

**Distribución del contenido:**

```
┌──────────────────────────────────────┐
│  [EYEBROW] Proyectos destacados      │
├──────────────────────────────────────┤
│                                      │
│  ┌────────────┐  ┌────────────────┐  │
│  │            │  │                │  │
│  │   IMAGEN   │  │  "Renta GO"    │  │
│  │   GRANDE   │  │  Una plataforma│  │
│  │            │  │  de movilidad  │  │
│  │            │  │  [Ver caso] →  │  │
│  └────────────┘  └────────────────┘  │
│                                      │
│  ┌────────────────┐  ┌────────────┐  │
│  │ "Mercadatos"   │  │            │  │
│  │ Gestión doc.   │  │   IMAGEN   │  │
│  │ [Ver caso] →   │  │   PEQUEÑA  │  │
│  └────────────────┘  └────────────┘  │
│                                      │
│  ┌──────┐ ┌──────┐ ┌──────────────┐ │
│  │ IMG  │ │ IMG  │ │ "VehicleCare"│ │
│  │ 1:1  │ │ 1:1  │ │ Diseño app   │ │
│  └──────┘ └──────┘ └──────────────┘ │
│                                      │
└──────────────────────────────────────┘
```

**Flujo del usuario:**
1. El usuario escanea visualmente composiciones asimétricas
2. Los proyectos más grandes (destacados) captan atención primero
3. Cada bloque mezcla imagen + texto como editorial
4. El ojo sigue un patrón en Z: proyecto grande → texto → mediano → miniaturas

**Ventajas:**
- Alta densidad de información: 3-4 proyectos visibles sin scroll
- Ritmo visual dinámico y premium
- Cada proyecto tiene personalidad (tamaño variable según importancia)
- Se siente como contenido curado, no como lista

**Desventajas:**
- Requiere diseño editorial cuidadoso para mantener equilibrio
- Las imágenes deben tener buena calidad para verse a diferentes escalas
- Puede ser complejo de mantener si los proyectos cambian frecuentemente

**Complejidad:** Media  
**Impacto visual:** Alto  
**Impacto conversión:** Alto — los CTAs "Ver caso" están integrados naturalmente

---

### CONCEPTO B: "Scroll Narrative"

**Filosofía:** Inspirado en storytelling visual de estudios como *Active Theory* y *Locomotive*. Cada proyecto se revela progresivamente durante el scroll, combinando imagen y texto en un layout que evoluciona.

**Distribución del contenido:**

```
[Scroll reveal] → Imagen cubre 60% viewport
                   Texto superpuesto en esquina
                   ↓ scroll
[Scroll reveal] → Imagen 50% + texto 50% lado a lado
                   ↓ scroll
[Scroll reveal] → Tipografía grande como hero
                   Imagen emerge desde abajo
                   ↓ scroll
[Scroll reveal] → Grid de 3 miniaturas con hover
```

**Flujo del usuario:**
1. El usuario hace scroll y cada proyecto "aparece" con una transición
2. El layout cambia en cada bloque: no hay repetición
3. El proyecto más importante tiene la imagen más grande
4. El último bloque es una grid rápida de proyectos secundarios

**Ventajas:**
- Experiencia inmersiva durante el scroll
- Cada proyecto se siente único (layout diferente)
- El scroll natural es la interacción principal
- Sensación de descubrimiento continuo

**Desventajas:**
- Más alto verticalmente que el Concepto A (aunque menos que el actual)
- Las animaciones deben ser sutiles para no afectar rendimiento
- Los usuarios que hacen scroll rápido pueden saltarse proyectos

**Complejidad:** Alta (animaciones + intersection observer)  
**Impacto visual:** Muy alto  
**Impacto conversión:** Medio — el usuario está en modo exploración

---

### CONCEPTO C: "Mosaic Navigator"

**Filosofía:** Inspirado en portafolios de fotografía de autor y grids de *Vercel* / *Linear*. Una composición tipo mosaico donde los proyectos se muestran en piezas rectangulares de proporciones variables (horizontal, vertical, cuadrado, panorama). 

**Distribución del contenido:**

```
┌──────────────────────────────────────┐
│  Proyectos  [All] [Web] [Design]     │ (tabs minimalistas inline)
├──────────────────────────────────────┤
│                                      │
│  ┌────────────────────┐ ┌──────────┐ │
│  │                    │ │          │ │
│  │   PANORAMA (2:1)   │ │ CUADRADO │ │
│  │   Proyecto dest.   │ │ 1:1      │ │
│  │                    │ │          │ │
│  ├──────────┐ ┌───────┤ └──────────┘ │
│  │ VERTICAL │ │HORIZ. │              │
│  │ 2:3      │ │3:2    │              │
│  └──────────┘ └───────┘              │
│                                      │
│  ┌──────────┐ ┌──────────┐ ┌──────┐ │
│  │ 1:1      │ │ 1:1      │ │ 1:1  │ │
│  └──────────┘ └──────────┘ └──────┘ │
│                                      │
│  [Ver todos los proyectos] →         │
└──────────────────────────────────────┘
```

**Flujo del usuario:**
1. El usuario ve un mosaico visualmente rico con proporciones variadas
2. Los proyectos destacados ocupan más espacio (panorama)
3. Los proyectos secundarios son cuadrados pequeños
4. Al hacer hover, la imagen se escala ligeramente y aparece el nombre + CTA
5. Los tabs cambian la composición del mosaico

**Ventajas:**
- Máxima densidad de información: 6-8 proyectos visibles
- Las proporciones variables crean ritmo visual natural
- Funciona como galería de arte: cada proyecto tiene su "marco"
- El hover revela información sin saturar

**Desventajas:**
- En móvil, el mosaico debe simplificarse a 2 columnas
- Las imágenes panorámicas pueden ser difíciles de conseguir
- Requiere sistema de proporciones predefinidas

**Complejidad:** Media-baja  
**Impacto visual:** Alto  
**Impacto conversión:** Alto — muchos proyectos visibles = más clics potenciales

---

## 3. Recomendación Final

### 🏆 Concepto Recomendado: **"Editorial Spread" (Concepto A)**

**Razones:**

1. **Mayor densidad de información** — 3-4 proyectos visibles sin scroll, vs 1 del actual
2. **Identidad diferenciadora** — Ningún portafolio común usa layouts editoriales asimétricos
3. **Ritmo visual premium** — La alternancia de tamaños crea jerarquía natural
4. **Fácil implementación en Tailwind** — Grid asimétrico con col-span y row-span
5. **Excelente adaptación responsive** — En móvil, colapsa a lista vertical con mismo estilo editorial
6. **CTAs naturales** — "Ver caso" integrado como parte del diseño editorial
7. **Escalable** — Nuevos proyectos se agregan fácilmente asignándoles un tamaño

### Diferenciación vs Conceptos B y C:

| Factor | A (Editorial) | B (Scroll Narrative) | C (Mosaic) |
|--------|---------------|---------------------|------------|
| Densidad info | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Personalidad | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Rendimiento | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Mobile first | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| Implementación | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Mantenibilidad | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 4. Implementación Técnica Recomendada (Concepto A)

### Estructura de datos

```ts
type ProjectDisplay = {
  name: string;
  image: string;
  description: string;
  slug: string;
  techs?: { image: string; name: string }[];
  /** Tamaño editorial: 'hero' | 'featured' | 'standard' | 'thumbnail' */
  size: 'hero' | 'featured' | 'standard' | 'thumbnail';
}
```

### Layout en Tailwind

```tsx
// Desktop: grid asimétrico editorial
<div className="grid grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]">
  {/* Proyecto hero - ocupa 2 columnas + 2 filas */}
  <div className="col-span-2 row-span-2">
    <EditorialBlock project={projects[0]} variant="hero" />
  </div>
  {/* Proyecto featured - ocupa 2 columnas, 1 fila (lado derecho) */}
  <div className="col-span-2">
    <EditorialBlock project={projects[1]} variant="featured" />
  </div>
  {/* 2 proyectos estándar - cada uno 2 columnas */}
  <div className="col-span-2 md:col-span-2 lg:col-span-1">
    <EditorialBlock project={projects[2]} variant="standard" />
  </div>
  <div className="col-span-2 md:col-span-2 lg:col-span-1">
    <EditorialBlock project={projects[3]} variant="standard" />
  </div>
</div>
```

### Mobile

```tsx
// Móvil: lista editorial vertical con el mismo estilo
<div className="flex flex-col gap-6">
  {projects.map((project) => (
    <EditorialBlockMobile key={project.name} project={project} />
  ))}
</div>
```

### Animaciones (opcionales, mejoran percepción premium)

- **Reveal on scroll**: `translateY(40px) → translateY(0)` con `opacity 0 → 1`
- **Hover**: La imagen escala 1.02x y el texto cambia de color del CTA
- **Stagger**: Cada bloque aparece con 100ms de retraso respecto al anterior
- **Image loading**: `loading="lazy"` + placeholder con color del primary al 5%

### Estimación de altura en escritorio

| Estado actual | Concepto A |
|--------------|------------|
| ~500px (1 proyecto) | ~420px (4 proyectos) |
| Slider horizontal | Sin slider, todo visible |
| Sin jerarquía | Jerarquía editorial clara |

---

## 5. Conclusión

El Concepto A (Editorial Spread) transforma la sección de proyectos de un slider genérico a una composición editorial premium que maximiza la densidad de información, crea jerarquía visual natural y establece una identidad diferenciadora para Star Grow Studio. 

La implementación es directa con Tailwind CSS grid asimétrico, no requiere librerías externas, y se adapta elegantemente a móvil. El impacto visual y de conversión son altos con un esfuerzo de implementación medio.