import type { PortableTextBlock } from "@portabletext/types";

type BlockInput =
  | {
      kind?: "block";
      style?: "normal" | "h2" | "h3" | "h4" | "blockquote";
      listItem?: "bullet" | "number";
      level?: number;
      children: { text: string; marks?: string[] }[];
    }
  | {
      kind: "image";
      url: string;
      alt: string;
      caption: string;
      browserUrl?: string;
      badge?: string;
      liveHref?: string;
      caseStudyHref?: string;
    };

function buildPortableText(blocks: BlockInput[]): PortableTextBlock[] {
  return blocks.map((b, i) => {
    const key = `web-blk-${i.toString().padStart(3, "0")}`;
    if (b.kind === "image") {
      return {
        _type: "image",
        _key: key,
        url: b.url,
        alt: b.alt,
        caption: b.caption,
        browserUrl: b.browserUrl,
        badge: b.badge,
        liveHref: b.liveHref,
        caseStudyHref: b.caseStudyHref,
      } as unknown as PortableTextBlock;
    }

    return {
      _type: "block",
      _key: key,
      style: b.style ?? "normal",
      markDefs: [],
      ...(b.listItem ? { listItem: b.listItem, level: b.level ?? 1 } : {}),
      children: b.children.map((c, j) => ({
        _type: "span",
        _key: `web-spn-${i.toString().padStart(3, "0")}-${j}`,
        text: c.text,
        marks: c.marks ?? [],
      })),
    } as PortableTextBlock;
  });
}

const p = (text: string): BlockInput => ({ children: [{ text }] });
const h2 = (text: string): BlockInput => ({ style: "h2", children: [{ text }] });
const h3 = (text: string): BlockInput => ({ style: "h3", children: [{ text }] });
const strong = (text: string): BlockInput => ({ children: [{ text, marks: ["strong"] }] });
const li = (text: string): BlockInput => ({ listItem: "bullet", children: [{ text }] });
const oli = (text: string): BlockInput => ({ listItem: "number", children: [{ text }] });
const blockquote = (text: string): BlockInput => ({ style: "blockquote", children: [{ text }] });
const img = (opts: {
  url: string;
  alt: string;
  caption: string;
  browserUrl?: string;
  badge?: string;
  liveHref?: string;
  caseStudyHref?: string;
}): BlockInput => ({
  kind: "image",
  ...opts,
});

export const COMO_HACER_UNA_PAGINA_WEB_SLUG = "como-hacer-una-pagina-web";

export const COMO_HACER_UNA_PAGINA_WEB_MAIN_IMAGE = {
  url: "/img/blog/como-hacer-una-pagina-web/opera-hero.png",
  browserUrl: "operasas.com",
  badge: "Caso Real · Star Grow Studio",
  alt: "Hero principal del sitio web corporativo de Opera S.A.S. (operasas.com) diseñado y desarrollado por Star Grow Studio",
  caption:
    "Caso real desarrollado por Star Grow Studio: Hero principal de Opera S.A.S. (operasas.com), con buscador interactivo (Ctrl+K), propuesta de valor inmediata y doble ruta de conversión.",
};

export const COMO_HACER_UNA_PAGINA_WEB_BODY: PortableTextBlock[] = buildPortableText([
  h2("Por qué aprender a estructurar una página web es una habilidad clave en el mundo B2B"),
  p(
    "En el ecosistema empresarial actual, más del 75 % de los compradores corporativos investigan a fondo a un proveedor antes de agendar la primera reunión comercial. Tu página web no es un folleto informativo estático: es tu vendedor más constante, tu carta de presentación técnica y el centro donde convergen tu marca, tu producto y tu estrategia comercial."
  ),
  p(
    "Sin embargo, cuando una empresa decide crear o renovar su sitio web, suele cometer el error de empezar por el final: elegir colores, buscar plantillas o contratar desarrollo sin haber definido qué problema de negocio debe resolver la plataforma. El resultado suele ser una web atractiva en apariencia, pero incapaz de retener usuarios o generar oportunidades comerciales."
  ),
  p(
    "En esta guía práctica paso a paso aprenderás cómo construimos páginas y plataformas web profesionales en Star Grow Studio, analizando capturas reales de proyectos desarrollados por nuestro equipo —como el ecosistema digital de Opera S.A.S. (operasas.com) y la plataforma Star Grow Events— para que puedas aplicar cada principio en tu propia empresa."
  ),

  h2("Fase 1: Estrategia y propósito antes de escribir una sola línea de código"),
  p(
    "Antes de abrir Figma o escribir código, toda página web exitosa comienza respondiendo preguntas de negocio. Una web sin dirección estratégica es como construir un edificio sin planos arquitectónicos."
  ),
  h3("1. Define el objetivo primario de conversión"),
  p(
    "No todas las páginas web persiguen la misma meta. En entornos B2B, debes definir con precisión cuál es la acción principal que esperas de un visitante cualificado:"
  ),
  li("Generación de reuniones consultivas o diagnósticos estratégicos (ideal para servicios corporativos y consultoría)."),
  li("Solicitudes de cotización técnica o demostraciones de producto (común en empresas multiservicios, industriales y SaaS B2B)."),
  li("Captación de leads mediante recursos educativos descargables o herramientas interactivas."),
  li("Validación de autoridad y credibilidad para respaldar procesos de licitación o compras corporativas."),

  h3("2. Conoce a tu comprador B2B y respalda tu promesa con datos"),
  p(
    "A diferencia del consumidor final (B2C), quien suele decidir por impulso emocional, el comprador B2B toma decisiones racionales y compartidas. En una misma compra suelen intervenir perfiles técnicos (que evalúan capacidad operativa, tecnología y cumplimiento), perfiles financieros (que analizan retorno de inversión) y directivos (que buscan mitigar riesgos)."
  ),
  img({
    url: "/img/blog/como-hacer-una-pagina-web/opera-subpage-1.png",
    browserUrl: "operasas.com/about-us",
    badge: "Estrategia & Autoridad B2B",
    liveHref: "https://www.operasas.com/about-us",
    caseStudyHref: "/proyectos/opera-multiservicios",
    alt: "Sección Quiénes Somos de Opera S.A.S. mostrando métricas de respaldo y trayectoria empresarial",
    caption:
      "En proyectos B2B como Opera S.A.S., la narrativa institucional se respalda de inmediato con indicadores verificables (+5 años de experiencia, +250 espacios intervenidos y 99,6 % de satisfacción) y sellos de cumplimiento.",
  }),
  blockquote(
    "Una gran página web B2B no intenta hablarle a todo el mundo: responde con precisión a las objeciones de quien tiene el problema que tu empresa resuelve mejor que nadie."
  ),

  h2("Fase 2: Arquitectura de información y mapa del sitio"),
  p(
    "La arquitectura de información es el arte de organizar el contenido para que cualquier usuario encuentre lo que busca en menos de tres clics. Cuando un visitante entra a tu web y no entiende qué haces o dónde están tus soluciones, abandona la página en cuestión de segundos."
  ),
  h3("La estructura esencial de una web corporativa de alto rendimiento"),
  oli("Página de Inicio (Home): Funciona como un distribuidor estratégico. Presenta la propuesta de valor, destaca las soluciones principales, muestra prueba social y dirige al visitante hacia las páginas de profundidad."),
  oli("Páginas de Servicios o Soluciones: Cada línea de negocio importante merece su propio espacio. Agrupar diez servicios distintos en una sola lista genérica diluye tu posicionamiento en buscadores (SEO) y confunde al comprador."),
  oli("Casos de Éxito (Portafolio con contexto): Más que mostrar logotipos o capturas aisladas, explica el reto del cliente, la solución implementada y el impacto alcanzado."),
  oli("Centro de Recursos / Blog Educativo: El espacio donde demuestras criterio experto, respondes dudas reales del mercado y atraes tráfico orgánico cualificado."),
  oli("Página de Contacto o Cotización: Un flujo limpio, sin distracciones, donde el usuario pueda iniciar una conversación comercial en menos de un minuto."),
  img({
    url: "/img/blog/como-hacer-una-pagina-web/opera-propuesta.png",
    browserUrl: "operasas.com/#solutions",
    badge: "Arquitectura de Información",
    liveHref: "https://www.operasas.com/",
    caseStudyHref: "/proyectos/opera-multiservicios",
    alt: "Catálogo modular de soluciones empresariales en el sitio web de Opera S.A.S.",
    caption:
      "Arquitectura modular en Opera S.A.S.: diseñamos una cuadrícula limpia donde cada servicio explica su beneficio concreto y ofrece un acceso directo («Solicitar asesoría») además de un buscador global con atajo Ctrl+K en la cabecera.",
  }),

  h2("Fase 3: Copywriting y narrativa de valor"),
  p(
    "Uno de los errores más frecuentes al hacer una página web es diseñar primero los cuadros vacíos (con texto «Lorem ipsum») y redactar los textos al final. En un proyecto profesional ocurre exactamente al revés: el diseño se construye alrededor del mensaje."
  ),
  h3("La regla de los 5 segundos en el Hero"),
  p(
    "El primer bloque visible de tu página (conocido como «Above the Fold» o «Hero») debe responder tres preguntas en menos de cinco segundos:"
  ),
  li("¿Qué hace exactamente tu empresa?"),
  li("¿Para qué tipo de clientes u organizaciones trabaja?"),
  li("¿Cuál es el siguiente paso lógico si quiero avanzar?"),
  h3("Contrasta tu propuesta de valor frente al mercado"),
  p(
    "En mercados competitivos, el comprador B2B suele tener varias pestañas abiertas comparando proveedores. Si tu página web le ayuda a entender con honestidad y claridad por qué tu modelo de trabajo es superior —sin obligarlo a adivinar—, multiplicas tu tasa de conversión."
  ),
  img({
    url: "/img/blog/como-hacer-una-pagina-web/opera-contacto.png",
    browserUrl: "operasas.com",
    badge: "Diferenciación Competitiva",
    liveHref: "https://www.operasas.com/",
    caseStudyHref: "/proyectos/opera-multiservicios",
    alt: "Tabla comparativa de valor en el sitio web de Opera S.A.S. frente a proveedores tradicionales",
    caption:
      "Copywriting estratégico en acción: en el sitio de Opera S.A.S. incluimos una matriz comparativa directa («Lo que otras empresas cobran por separado, con Opera lo tienes incluido») que resuelve objeciones de precio antes de la llamada comercial.",
  }),

  h2("Fase 4: Diseño UI/UX con propósito comercial"),
  p(
    "El diseño de interfaz (UI) y la experiencia de usuario (UX) no consisten en agregar animaciones innecesarias que ralenticen la lectura. En el entorno corporativo, el buen diseño es aquel que transmite orden, solvencia técnica y facilidad de uso."
  ),
  h3("1. Haz visible tu proceso de trabajo para eliminar la fricción"),
  p(
    "Uno de los mayores frenos en la contratación de servicios B2B es la incertidumbre: el cliente no sabe qué pasará después de dejar sus datos. Mostrar una línea de tiempo numerada con las etapas de trabajo reduce esa ansiedad y proyecta madurez operativa."
  ),
  img({
    url: "/img/blog/como-hacer-una-pagina-web/opera-proceso.png",
    browserUrl: "operasas.com/#experiencia",
    badge: "UX & Claridad Operativa",
    liveHref: "https://www.operasas.com/",
    caseStudyHref: "/proyectos/opera-multiservicios",
    alt: "Sección de proceso paso a paso en el sitio web de Opera S.A.S.",
    caption:
      "Diseño UX enfocado en confianza: la sección «Así transformamos cada espacio» en Opera S.A.S. guía visualmente al usuario por las 4 etapas del servicio (Solicitud, Evaluación, Ejecución y Seguimiento) junto a un llamado a la acción contextual.",
  }),
  h3("2. Diseño Mobile-First y formularios sin fricción"),
  p(
    "Más de la mitad de las primeras visitas a sitios corporativos ocurren desde dispositivos móviles. Cada campo adicional o mal adaptado en un formulario móvil reduce la probabilidad de que el usuario complete el registro. Diseña flujos limpios, con indicadores de progreso claros y ayudas contextuales en cada campo."
  ),
  img({
    url: "/img/blog/como-hacer-una-pagina-web/star-grow-events-gallery-1.png",
    badge: "Mobile UX · Star Grow Events",
    caseStudyHref: "/proyectos/star-grow-events",
    alt: "Interfaz móvil de registro e inscripción de Star Grow Events diseñada por Star Grow Studio",
    caption:
      "Caso real — Star Grow Events: interfaz móvil diseñada por Star Grow Studio para el registro de asistentes corporativos, con barra de progreso en tiempo real, microcopys de ayuda y validación instantánea.",
  }),

  h2("Fase 5: Elección tecnológica: ¿plantilla genérica o desarrollo a medida?"),
  p(
    "Elegir la tecnología adecuada define cuánto tiempo durará tu inversión y qué tan rápido cargará tu sitio. No existe una única respuesta para todas las empresas, pero sí criterios claros para decidir con inteligencia."
  ),
  strong("Cuándo una plantilla o constructor visual se queda corto"),
  p(
    "Los constructores visuales tradicionales suelen acumular decenas de complementos (plugins) de terceros. Con el tiempo, esto provoca tiempos de carga lentos, vulnerabilidades de seguridad, limitaciones de diseño y costos ocultos de mantenimiento."
  ),
  strong("Por qué las empresas modernas apuestan por arquitecturas Headless y desarrollo a medida"),
  p(
    "Tanto en el ecosistema web de Opera S.A.S. como en la plataforma Star Grow Events y en nuestro propio portal corporativo utilizamos arquitecturas modernas basadas en Next.js, TypeScript, Tailwind CSS y gestores de contenido Headless (como Sanity CMS) o motores transaccionales a medida. Esta combinación ofrece ventajas decisivas:"
  ),
  li("Velocidad instantánea: Las páginas se pre-renderizan y se sirven desde redes de distribución global (CDN), logrando tiempos de carga inferiores a un segundo."),
  li("Autonomía editorial: Tu equipo de marketing o comercial puede publicar artículos, actualizar servicios o subir nuevos casos de éxito desde un panel intuitivo sin tocar código."),
  li("Escalabilidad hacia software a medida: Tu sitio web puede evolucionar hacia paneles administrativos en tiempo real, portales de clientes, cotizadores interactivos o integraciones con tu CRM/ERP."
  ),
  img({
    url: "/img/blog/como-hacer-una-pagina-web/star-grow-events-gallery-2.png",
    badge: "Software a Medida · Star Grow Events",
    caseStudyHref: "/proyectos/star-grow-events",
    alt: "Panel administrativo en modo oscuro de la plataforma Star Grow Events en un MacBook Pro",
    caption:
      "Evolución hacia producto digital: panel de control en tiempo real de Star Grow Events, desarrollado a medida por Star Grow Studio para gestionar inscripciones, control de acceso con QR, métricas de asistencia y operación multisucursal.",
  }),

  h2("Fase 6: SEO técnico, rendimiento y lista de verificación antes de publicar"),
  p(
    "Publicar la página web es apenas el punto de partida. Para que tu sitio sea encontrado en Google y ofrezca una experiencia impecable en móviles y computadores, revisa siempre esta lista de control técnico:"
  ),
  li("Core Web Vitals en verde: Optimiza imágenes en formatos modernos (WebP/AVIF), carga tipografías sin bloqueo de renderizado y minimiza el JavaScript innecesario."),
  li("Estructura semántica de encabezados: Cada página debe tener un único título H1 claro y subtítulos H2 y H3 jerarquizados que respondan a las búsquedas reales de tus clientes."),
  li("Metadatos y Open Graph: Configura títulos SEO, descripciones atractivas e imágenes de previsualización para que cada enlace compartido en LinkedIn, WhatsApp o correo luzca impecable."),
  li("Datos estructurados (Schema.org): Implementa marcado JSON-LD para que los motores de búsqueda y asistentes de inteligencia artificial comprendan quién es tu organización, qué servicios ofreces y qué artículos publicas."),
  li("Medición y analítica: Instala eventos de conversión para saber exactamente qué páginas visitan tus usuarios antes de enviarte un mensaje o solicitar una cotización."),

  h2("Conclusión: Una página web no se termina, evoluciona con tu negocio"),
  p(
    "Aprender cómo hacer una página web profesional implica cambiar la mentalidad de «entregable único» por la de «activo vivo de crecimiento». Las empresas que lideran sus sectores revisan continuamente cómo interactúan sus usuarios, publican nuevo conocimiento en su blog, documentan sus casos de éxito más recientes y refinan su mensaje conforme evoluciona el mercado."
  ),
  p(
    "En Star Grow Studio combinamos estrategia de marca, diseño UI/UX e ingeniería de software a medida para construir plataformas web rápidas, elegantes y enfocadas en resultados reales —como lo hicimos junto a Opera S.A.S., Star Grow Events y cada uno de nuestros aliados—. Si quieres crear tu primera plataforma corporativa o transformar tu sitio actual en un verdadero motor de crecimiento, conversemos."
  ),
]);

export const COMO_HACER_UNA_PAGINA_WEB_POST = {
  _id: `post.${COMO_HACER_UNA_PAGINA_WEB_SLUG}`,
  title:
    "Cómo hacer una página web profesional paso a paso: Guía estratégica y técnica para empresas B2B",
  slug: COMO_HACER_UNA_PAGINA_WEB_SLUG,
  excerpt:
    "Aprende cómo planificar, estructurar, diseñar y desarrollar una página web corporativa con ejemplos reales de proyectos creados por Star Grow Studio.",
  publishedAt: "2026-07-20T12:00:00Z",
  instagramUrl: undefined as string | undefined,
  readingTime: 9,
  mainImage: COMO_HACER_UNA_PAGINA_WEB_MAIN_IMAGE,
  author: {
    name: "Star Grow Studio",
    slug: "star-grow-studio",
    role: "Agencia de Transformación Digital",
    bio: "En Star Grow Studio transformamos negocios a través del diseño, la tecnología y la estrategia digital. Ayudamos a empresas a crecer con soluciones de software a medida, diseño UX/UI, branding y desarrollo web.",
  },
  categories: [
    { title: "Desarrollo Web", slug: "desarrollo-web" },
    { title: "Diseño UX/UI", slug: "diseno-ux-ui" },
    { title: "Marketing Digital", slug: "marketing-digital" },
  ],
  body: COMO_HACER_UNA_PAGINA_WEB_BODY,
  seo: {
    metaTitle:
      "Cómo hacer una página web profesional paso a paso (Guía B2B con casos reales) | Star Grow Studio",
    metaDescription:
      "Guía práctica con casos reales (Opera S.A.S., Star Grow Events) para crear una página web empresarial de alto rendimiento: estrategia, arquitectura, copywriting, UI/UX y tecnología.",
    ogTitle:
      "Cómo hacer una página web profesional paso a paso: Guía estratégica y técnica B2B",
    ogDescription:
      "Descubre las 6 fases para planificar, diseñar y desarrollar una página web corporativa con ejemplos reales desarrollados por Star Grow Studio.",
    ogImage: COMO_HACER_UNA_PAGINA_WEB_MAIN_IMAGE,
  },
};
