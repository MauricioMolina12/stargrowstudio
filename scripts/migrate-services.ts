/**
 * Siembra la taxonomía de servicios en Sanity (padres → hijos).
 *
 * - Crea primero los servicios padre y luego los hijos (con referencia al padre).
 * - Idempotente: `createOrReplace` con `_id` determinista; se puede correr N veces.
 * - Assets deduplicados por nombre de archivo (no re-sube imágenes ya existentes).
 * - Limpia documentos `service-*` de la migración anterior (opt-out con KEEP_ORPHANS=1).
 *
 * Uso:
 *   node --env-file=.env.local --import tsx scripts/migrate-services.ts
 *   npm run migrate:services
 *
 * Requiere en .env.local: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 * SANITY_API_WRITE_TOKEN.
 */
import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

/* ───────────────────────── Configuración ───────────────────────── */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Faltan variables de entorno: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN.\n" +
      "Ejecuta: node --env-file=.env.local --import tsx scripts/migrate-services.ts"
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-10-01", useCdn: false });
const PUBLIC_DIR = path.resolve(process.cwd(), "public");

/* ───────────────────────── Tipos de la semilla ───────────────────────── */

type Tech = { name: string; image?: string };
type FaqItem = { question: string; answer: string };
type SeedService = {
  slug: string;
  service: string;
  iconName: string;
  shortDescription: string;
  heroHeading?: string;
  heroSubheading?: string;
  fullDescription: string[];
  benefits: { title: string; description: string; iconName: string }[];
  features: { title: string; description: string }[];
  process: { step: number; title: string; description: string }[];
  cta: { heading: string; description: string; label: string; href: string };
  seo: { metaTitle: string; metaDescription: string };
  faq?: FaqItem[];
  mainImage?: string;
  techs?: Tech[];
  children?: SeedService[];
};

/* ───────────────────────── Helpers de contenido ───────────────────────── */

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Convierte párrafos de texto plano en bloques de Portable Text con keys deterministas. */
const portableText = (paragraphs: string[]) =>
  paragraphs.map((text, i) => ({
    _type: "block",
    _key: `blk-${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `spn-${i}`, text, marks: [] }],
  }));

const defaultCta = (name: string) => ({
  heading: `Convierte ${name} en una ventaja competitiva para tu negocio`,
  description:
    "Conversemos sobre tu proyecto: te explicaremos cómo nuestro enfoque y metodología pueden ayudarte a alcanzar resultados medibles, sin compromiso.",
  label: "Agendar diagnóstico gratuito",
  href: "/cotizar",
});

/* ───────────────────────── Assets idempotentes ───────────────────────── */

const assetCache = new Map<string, string>();

function imageRef(assetId: string) {
  return { _type: "image", asset: { _type: "reference", _ref: assetId } };
}

/** Sube una imagen local reutilizando el asset si ya existe (por nombre de archivo). */
async function uploadImage(publicPath?: string) {
  if (!publicPath) return undefined;
  const filePath = path.join(PUBLIC_DIR, publicPath.replace(/^\//, ""));

  if (assetCache.has(filePath)) return imageRef(assetCache.get(filePath)!);
  if (!existsSync(filePath)) {
    console.warn(`  ⚠ Imagen no encontrada, se omite: ${publicPath}`);
    return undefined;
  }

  const filename = path.basename(filePath);
  const existing = await client.fetch<string | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    { filename }
  );
  if (existing) {
    assetCache.set(filePath, existing);
    return imageRef(existing);
  }

  const asset = await client.assets.upload("image", await readFile(filePath), { filename });
  assetCache.set(filePath, asset._id);
  console.log(`  ↑ subida: ${publicPath}`);
  return imageRef(asset._id);
}

const techArray = (techs?: Tech[]) =>
  Promise.all(
    (techs ?? []).map(async (t) => ({
      _type: "object",
      _key: slugify(t.name),
      name: t.name,
      image: await uploadImage(t.image),
    }))
  );

/* ───────────────────────── Semilla (taxonomía) ───────────────────────── */

const DEV_TECHS: Tech[] = [
  { name: "React", image: "/techs/react.png" },
  { name: "Next.js", image: "/techs/next.png" },
  { name: "TypeScript", image: "/techs/typescript.png" },
  { name: "Angular", image: "/techs/angular.png" },
  { name: "Vue", image: "/techs/vue.png" },
  { name: "MongoDB", image: "/techs/mongo.webp" },
  { name: "SQL Server", image: "/techs/sqlserver.png" },
];

const MOBILE_TECHS: Tech[] = [
  { name: "Flutter", image: "/techs/flutter.png" },
  { name: "React Native", image: "/techs/react.png" },
  { name: "Swift", image: "/techs/swift.png" },
  { name: "Kotlin", image: "/techs/kotlin.png" },
  { name: "Ionic", image: "/techs/ionic.png" },
];

const DESIGN_TECHS: Tech[] = [
  { name: "Figma", image: "/techs/figma.png" },
  { name: "Adobe XD", image: "/techs/Adobe_XD.png" },
  { name: "Illustrator", image: "/techs/Adobe_Illustrator.png" },
  { name: "Photoshop", image: "/techs/Adobe_Photoshop.png" },
];

const SEED: SeedService[] = [
  {
    slug: "desarrollo-de-software",
    service: "Desarrollo de Software",
    iconName: "Code",
    shortDescription:
      "Transformamos procesos manuales y sistemas dispersos en una plataforma digital unificada que impulsa el crecimiento de tu negocio.",
    heroHeading: "Software a la medida que impulsa tu negocio",
    heroSubheading:
      "Dejamos atrás planillas, procesos manuales y sistemas aislados. Construimos plataformas digitales escalables, seguras y diseñadas para crecer contigo, no para limitarte.",
    fullDescription: [
      "En Star Grow Studio no escribimos código por escribir código. Construimos soluciones digitales que resuelven problemas reales de negocio: reducir costos operativos, automatizar procesos críticos, unificar información dispersa y abrir nuevas fuentes de ingreso.",
      "Cada proyecto comienza con un descubrimiento profundo de tu operación. Entendemos cómo funciona tu negocio hoy, qué te duele, qué te frena y hacia dónde quieres ir. Solo entonces diseñamos una solución a tu medida, con arquitecturas modernas que garantizan rendimiento, seguridad y capacidad de escalar sin tener que reescribir todo desde cero.",
      "Trabajamos en iteraciones cortas con entregas continuas de valor. No esperamos meses para mostrarte resultados. Desde la primera semana verás avances concretos, y cada entrega estará lista para usarse en producción. Nuestro equipo combina experiencia en ingeniería de software, diseño de producto y estrategia de negocio para garantizar que cada línea de código aporte valor medible a tu empresa.",
      "Nos diferenciamos porque no solo construimos software: acompañamos a tu equipo durante todo el ciclo de vida del producto, desde la concepción hasta la operación y el soporte continuo. Somos un socio tecnológico, no un proveedor transaccional.",
    ],
    benefits: [
      {
        title: "Operaciones más eficientes",
        description:
          "Automatizamos procesos manuales y centralizamos la información para que tu equipo dedique menos tiempo a tareas repetitivas y más a lo que realmente importa.",
        iconName: "Zap",
      },
      {
        title: "Decisiones basadas en datos",
        description:
          "Tu operación genera datos que hoy no estás aprovechando. Los unificamos, los estructuramos y los ponemos al servicio de tu toma de decisiones con paneles y reportes en tiempo real.",
        iconName: "BarChart3",
      },
      {
        title: "Escalabilidad sin fricción",
        description:
          "Arquitecturas modulares y desacopladas que crecen contigo. Cuando tu negocio se expanda, tu software estará listo para soportarlo sin costosas reescrituras ni migraciones traumáticas.",
        iconName: "TrendingUp",
      },
      {
        title: "Seguridad desde el diseño",
        description:
          "Protegemos tu información y la de tus clientes con prácticas de seguridad integradas desde la arquitectura, no agregadas al final. Cumplimiento, cifrado y auditoría en cada capa.",
        iconName: "ShieldCheck",
      },
      {
        title: "Menor time-to-market",
        description:
          "Entregamos valor funcional desde las primeras semanas. Nuestro enfoque iterativo acelera el lanzamiento sin sacrificar calidad, permitiéndote capturar oportunidades antes que la competencia.",
        iconName: "Rocket",
      },
    ],
    features: [
      {
        title: "Plataformas web a medida",
        description:
          "Sistemas transaccionales, portales corporativos, marketplaces y cualquier plataforma web que necesites para operar o hacer crecer tu negocio. Construidas con tecnologías modernas, optimizadas para rendimiento y conversión.",
      },
      {
        title: "Integraciones y APIs",
        description:
          "Conectamos tus sistemas actuales con nuevas soluciones y servicios externos. Eliminamos silos de información y creamos un ecosistema digital coherente donde todos tus datos fluyen sin fricción.",
      },
      {
        title: "Automatización de procesos",
        description:
          "Identificamos tareas repetitivas, cuellos de botella y procesos manuales que consumen tiempo y recursos. Los automatizamos para que tu equipo se concentre en actividades de alto valor estratégico.",
      },
      {
        title: "Modernización de sistemas legacy",
        description:
          "Migración progresiva de sistemas antiguos a arquitecturas modernas sin interrumpir tu operación. Mejoramos rendimiento, seguridad y mantenibilidad mientras proteges tu inversión existente.",
      },
      {
        title: "DevOps y despliegue continuo",
        description:
          "Automatizamos la construcción, prueba y despliegue de tu software. Entregamos actualizaciones con frecuencia, de forma confiable y sin tiempos de inactividad que afecten tu operación.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Descubrimiento y diagnóstico",
        description:
          "Realizamos sesiones de descubrimiento con tu equipo para entender tu negocio, tus procesos actuales, tus dolores y tus oportunidades. Entregamos un diagnóstico claro con recomendaciones priorizadas por impacto.",
      },
      {
        step: 2,
        title: "Arquitectura y planificación",
        description:
          "Diseñamos la arquitectura técnica y definimos el plan de entregas por iteraciones. Cada iteración tiene un objetivo de negocio claro y entregables concretos que puedas ver y validar.",
      },
      {
        step: 3,
        title: "Construcción iterativa",
        description:
          "Desarrollamos en ciclos cortos de dos semanas. Al final de cada ciclo recibes una versión funcional del producto que puedes probar y darnos retroalimentación. Así nos aseguramos de que siempre vas por buen camino.",
      },
      {
        step: 4,
        title: "Pruebas y aseguramiento de calidad",
        description:
          "Cada entrega pasa por pruebas automatizadas y manuales: funcionales, de rendimiento, seguridad y usabilidad. No liberamos código que no cumpla con nuestros estándares de calidad.",
      },
      {
        step: 5,
        title: "Despliegue y puesta en producción",
        description:
          "Coordinamos el lanzamiento con tu equipo, migramos datos si es necesario y nos aseguramos de que todo funcione correctamente en producción. Te acompañamos durante las primeras semanas de operación.",
      },
      {
        step: 6,
        title: "Soporte y evolución continua",
        description:
          "Una vez en producción, monitoreamos el rendimiento, corregimos incidencias y priorizamos mejoras. El software evoluciona con tu negocio, no se queda estático. Estamos contigo en el largo plazo.",
      },
    ],
    cta: defaultCta("tu visión digital"),
    seo: {
      metaTitle:
        "Desarrollo de Software a Medida para Empresas | Star Grow Studio",
      metaDescription:
        "Transformamos procesos manuales en plataformas digitales escalables. Automatización, integraciones y software a medida que impulsa resultados de negocio. Solicita diagnóstico gratuito.",
    },
    faq: [
      {
        question: "¿Cuánto tiempo toma desarrollar un software a medida?",
        answer:
          "Depende de la complejidad del proyecto, pero trabajamos en iteraciones de dos semanas. En el primer ciclo ya tendrás funcionalidades funcionando. Un proyecto completo puede tomar de 3 a 6 meses, dependiendo del alcance.",
      },
      {
        question: "¿Qué pasa si ya tengo sistemas funcionando?",
        answer:
          "No partimos de cero. Analizamos tu infraestructura actual y te proponemos la mejor estrategia: integrar, migrar progresivamente o reconstruir según el estado de tus sistemas y tus objetivos de negocio.",
      },
      {
        question: "¿Trabajan con tecnologías específicas o se adaptan?",
        answer:
          "Nos adaptamos. Seleccionamos las tecnologías más adecuadas para cada proyecto según los requisitos de escalabilidad, rendimiento, mantenibilidad y el ecosistema técnico de tu empresa.",
      },
      {
        question: "¿Ofrecen soporte después del lanzamiento?",
        answer:
          "Sí, el soporte continuo es parte de nuestra propuesta. Monitoreamos la operación, atendemos incidencias y priorizamos evoluciones. Creemos en relaciones de largo plazo, no en proyectos transaccionales.",
      },
    ],
    mainImage: "/img/devices.png",
    children: [
      {
        slug: "desarrollo-web",
        service: "Desarrollo Web",
        iconName: "LayoutTemplate",
        shortDescription:
          "Plataformas web de alto rendimiento que convierten visitantes en clientes y procesos en ventajas competitivas.",
        heroHeading: "Tu presencia digital como motor de crecimiento",
        heroSubheading:
          "Más allá de un sitio bonito: construimos plataformas web optimizadas para conversión, velocidad y SEO, que generan resultados medibles para tu negocio.",
        fullDescription: [
          "Tu sitio web o plataforma no es un gasto de marketing: es el canal más importante de tu negocio. Es donde tus clientes te encuentran, te evalúan y deciden si confían en ti. Por eso no construimos páginas genéricas. Diseñamos y desarrollamos experiencias web que comunican tu propuesta de valor, generan confianza y convierten visitantes en clientes.",
          "Trabajamos con tecnologías modernas como Next.js, React y TypeScript para garantizar velocidad de carga, rendimiento en Core Web Vitals y una experiencia impecable en cualquier dispositivo. Pero la tecnología es solo el medio. Nuestro verdadero valor está en cómo alineamos cada decisión técnica con tus objetivos de negocio: aumentar conversiones, mejorar el posicionamiento orgánico, reducir la tasa de rebote o facilitar la gestión de contenido.",
          "Desde landing pages diseñadas para campañas específicas hasta plataformas complejas con gestión de contenido, autenticación, paneles de administración y flujos transaccionales. Cada proyecto es diferente y cada solución se construye a la medida de tus necesidades.",
        ],
        benefits: [
          {
            title: "Mayor tasa de conversión",
            description:
              "Cada elemento de tu sitio está diseñado para guiar al usuario hacia la acción que importa: comprar, cotizar, registrarse o contactarte. Medimos y optimizamos continuamente.",
            iconName: "MousePointerClick",
          },
          {
            title: "Velocidad que Google premia",
            description:
              "Cumplimos con los estándares Core Web Vitals. Sitios rápidos que cargan en menos de 2 segundos, mejoran tu posicionamiento en buscadores y retienen a los usuarios.",
            iconName: "Gauge",
          },
          {
            title: "SEO desde la arquitectura",
            description:
              "No agregamos SEO al final. La estructura del sitio, el marcado semántico, los datos estructurados y la optimización de contenido se integran desde el diseño inicial.",
            iconName: "Search",
          },
          {
            title: "Experiencia consistente en todos los dispositivos",
            description:
              "Tu sitio se ve y funciona perfectamente en móvil, tablet y escritorio. Más del 60% del tráfico B2B viene de dispositivos móviles. No podemos permitirnos una mala experiencia ahí.",
            iconName: "MonitorSmartphone",
          },
          {
            title: "Escalabilidad sin límites",
            description:
              "Desde una landing page hasta una plataforma con millones de visitas mensuales. La arquitectura está preparada para crecer contigo sin necesidad de reconstruir.",
            iconName: "TrendingUp",
          },
        ],
        features: [
          {
            title: "Landing pages de alto impacto",
            description:
              "Páginas optimizadas para campañas específicas con diseño persuasivo, carga ultrarrápida y llamados a la acción estratégicos. Ideales para lanzamientos, promociones o generación de leads.",
          },
          {
            title: "Plataformas corporativas",
            description:
              "Sitios web completos con gestión de contenido (CMS headless), multilenguaje, blogs, portales de clientes y áreas privadas. Tu equipo puede actualizar el contenido sin depender de nosotros.",
          },
          {
            title: "E-commerce y plataformas transaccionales",
            description:
              "Tiendas online, simuladores, cotizadores y cualquier flujo transaccional que necesite tu negocio. Integrados con pasarelas de pago, inventarios y sistemas logísticos.",
          },
          {
            title: "Optimización de rendimiento",
            description:
              "Auditoría y mejora de velocidad de carga, optimización de imágenes, lazy loading, caching inteligente y CDN. Resultado: mejor experiencia de usuario y mejor posicionamiento.",
          },
          {
            title: "Analítica y tracking",
            description:
              "Integración con herramientas de analítica web, mapas de calor, seguimiento de conversiones y embudos. Datos para tomar decisiones informadas sobre tu sitio.",
          },
        ],
        process: [
          {
            step: 1,
            title: "Estrategia y wireframes",
            description:
              "Definimos objetivos, audiencia y estructura del sitio. Creamos wireframes que muestran el flujo de navegación y la jerarquía de contenido antes de escribir una línea de código.",
          },
          {
            step: 2,
            title: "Diseño visual",
            description:
              "Diseñamos interfaces limpias y profesionales alineadas con tu identidad de marca. Prototipos interactivos que puedes navegar y aprobar antes del desarrollo.",
          },
          {
            step: 3,
            title: "Desarrollo y optimización",
            description:
              "Implementamos con tecnologías modernas garantizando velocidad, SEO, accesibilidad y compatibilidad entre navegadores. Cada componente se prueba y optimiza.",
          },
          {
            step: 4,
            title: "Lanzamiento y monitoreo",
            description:
              "Desplegamos en producción, configuramos monitoreo de rendimiento y analítica. Te acompañamos en los primeros días para asegurar que todo funcione correctamente.",
          },
        ],
        cta: defaultCta("tu sitio web"),
        seo: {
          metaTitle:
            "Desarrollo Web Corporativo | Plataformas de Alto Rendimiento | Star Grow Studio",
          metaDescription:
            "Sitios web y plataformas optimizadas para conversión, velocidad SEO y experiencia de usuario. Landing pages, portales corporativos y e-commerce a medida. Solicita diagnóstico.",
        },
        faq: [
          {
            question: "¿Cuánto cuesta desarrollar un sitio web corporativo?",
            answer:
              "Depende de la complejidad y funcionalidades. Un sitio corporativo básico con CMS puede tomar de 4 a 6 semanas. Una plataforma transaccional o portal complejo puede requerir 2 a 4 meses. Te damos un presupuesto preciso después de entender tu proyecto.",
          },
          {
            question: "¿Puedo actualizar el contenido yo mismo?",
            answer:
              "Sí. Implementamos CMS headless (Sanity, Strapi o el que prefieras) para que tu equipo pueda modificar textos, imágenes y contenido sin conocimientos técnicos. Nosotros nos encargamos de la parte técnica.",
          },
          {
            question: "¿El sitio será responsive?",
            answer:
              "Absolutamente. Todos nuestros sitios se diseñan y desarrollan con enfoque mobile-first. Se ven y funcionan perfectamente en móviles, tablets y escritorios.",
          },
          {
            question: "¿Ofrecen mantenimiento después del lanzamiento?",
            answer:
              "Sí. Ofrecemos planes de mantenimiento que incluyen actualizaciones de seguridad, monitoreo de rendimiento, soporte técnico y mejoras evolutivas. Tu sitio siempre estará actualizado y funcionando al máximo.",
          },
        ],
        techs: DEV_TECHS,
      },
      {
        slug: "aplicaciones-moviles",
        service: "Aplicaciones Móviles",
        iconName: "Smartphone",
        shortDescription:
          "Apps nativas e híbridas que conectan tu negocio con tus clientes donde sea que estén, con experiencias fluidas y alto rendimiento.",
        heroHeading: "Tu negocio en el bolsillo de tus clientes",
        heroSubheading:
          "Aplicaciones móviles que ofrecen experiencias rápidas, intuitivas y confiables. Conectamos tu marca con tus usuarios donde pasan la mayor parte de su tiempo: en el móvil.",
        fullDescription: [
          "Hoy tus clientes viven en el móvil. Compran, se informan, se comunican y toman decisiones desde la palma de su mano. Si tu negocio no está ahí con una experiencia fluida y valiosa, estás perdiendo oportunidades todos los días.",
          "Desarrollamos aplicaciones móviles que combinan rendimiento nativo con eficiencia de desarrollo. Elegimos la tecnología adecuada para cada proyecto: nativo (Swift, Kotlin) cuando el rendimiento máximo es crítico, o híbrido (Flutter, React Native) cuando el time-to-market y la cobertura multiplataforma son prioridad.",
          "Pero desarrollar la app es solo el inicio. Te acompañamos en todo el ciclo: desde la validación de la idea con prototipos navegables, hasta la publicación en App Store y Google Play, pasando por las pruebas de calidad, la optimización de rendimiento y la estrategia de adopción.",
          "Cada app que construimos está diseñada para funcionar incluso sin conexión, sincronizar datos cuando haya red disponible y ofrecer una experiencia que haga que tus usuarios vuelvan. No se trata de tener una app, se trata de que tus clientes la usen y la valoren.",
        ],
        benefits: [
          {
            title: "Llega a tus clientes donde están",
            description:
              "El 70% del tiempo digital se consume en móvil. Una app bien diseñada mantiene tu marca presente en la pantalla principal de tus clientes, con notificaciones push y acceso instantáneo.",
            iconName: "Smartphone",
          },
          {
            title: "Experiencia fluida y rápida",
            description:
              "Sin tiempos de carga de navegador, sin fricciones. Una app nativa o híbrida bien optimizada ofrece una experiencia mucho más rápida y fluida que cualquier sitio web móvil.",
            iconName: "Zap",
          },
          {
            title: "Multiplataforma, un solo desarrollo",
            description:
              "Con Flutter o React Native cubrimos iOS y Android con una sola base de código. Menos costos de desarrollo y mantenimiento, sin sacrificar rendimiento ni experiencia de usuario.",
            iconName: "Layers",
          },
          {
            title: "Desconexión y sincronización inteligente",
            description:
              "Tu app funciona incluso sin conexión a internet. Los datos se sincronizan automáticamente cuando hay red. Esto es crítico para sectores como logística, retail o servicios de campo.",
            iconName: "WifiOff",
          },
          {
            title: "Publicación y cumplimiento",
            description:
              "Gestionamos todo el proceso de publicación en App Store y Google Play, incluyendo el cumplimiento de políticas, certificados y requisitos técnicos. Tu app en las tiendas sin complicaciones.",
            iconName: "CheckCircle",
          },
        ],
        features: [
          {
            title: "Apps nativas iOS y Android",
            description:
              "Swift para iOS y Kotlin para Android cuando el proyecto exige el máximo rendimiento, acceso completo a APIs del dispositivo y experiencias pulidas al detalle.",
          },
          {
            title: "Apps multiplataforma con Flutter y React Native",
            description:
              "Una sola base de código para ambas plataformas. Ideal para proyectos con time-to-market ajustado, presupuesto optimizado y necesidades de rendimiento equilibradas.",
          },
          {
            title: "Prototipado y validación",
            description:
              "Antes de desarrollar, creamos prototipos navegables para validar la idea, la experiencia de usuario y las funcionalidades con usuarios reales. Reducimos riesgos y costos de cambios tardíos.",
          },
          {
            title: "Notificaciones push y engagement",
            description:
              "Implementamos estrategias de notificaciones inteligentes para aumentar la retención y el engagement. Segmentación, personalización y automatización de mensajes.",
          },
          {
            title: "Backend y APIs para móvil",
            description:
              "Construimos o integramos el backend que necesita tu app: autenticación, sincronización, almacenamiento, pagos, geolocalización y cualquier servicio que requieras.",
          },
        ],
        process: [
          {
            step: 1,
            title: "Validación de la idea",
            description:
              "Definimos el propósito de la app, el público objetivo y las funcionalidades clave. Creamos un prototipo navegable para validar la propuesta de valor antes de invertir en desarrollo.",
          },
          {
            step: 2,
            title: "Diseño de experiencia móvil",
            description:
              "Diseñamos interfaces adaptadas al contexto móvil: navegación con una mano, gestos nativos, tamaño de objetivos táctiles y optimización para diferentes tamaños de pantalla.",
          },
          {
            step: 3,
            title: "Desarrollo iterativo",
            description:
              "Construimos la app en ciclos cortos con versiones de prueba (TestFlight para iOS, Play Console para Android) para que puedas ver el progreso y dar retroalimentación constante.",
          },
          {
            step: 4,
            title: "Pruebas en dispositivos reales",
            description:
              "Probamos la app en una matriz de dispositivos reales para garantizar compatibilidad, rendimiento y ausencia de errores críticos. Incluimos pruebas de usabilidad con usuarios reales.",
          },
          {
            step: 5,
            title: "Publicación y lanzamiento",
            description:
              "Preparamos todos los assets, cumplimos con las políticas de cada tienda, gestionamos la revisión y publicamos. Te acompañamos en la estrategia de lanzamiento y adopción inicial.",
          },
        ],
        cta: defaultCta("tu aplicación móvil"),
        seo: {
          metaTitle:
            "Desarrollo de Apps Móviles para Empresas | Star Grow Studio",
          metaDescription:
            "Apps nativas e híbridas (iOS/Android) de alto rendimiento. Prototipado, desarrollo, publicación y soporte. Transforma la experiencia móvil de tus clientes. Solicita diagnóstico.",
        },
        faq: [
          {
            question: "¿Debo elegir app nativa o híbrida?",
            answer:
              "Depende de tus prioridades. Nativa es mejor cuando necesitas máximo rendimiento, animaciones complejas o acceso profundo a hardware del dispositivo. Híbrida con Flutter o React Native es ideal para llegar rápido a ambas plataformas con menor costo. Analizamos tu caso y te recomendamos la mejor opción.",
          },
          {
            question: "¿Cuánto cuesta mantener una app en las tiendas?",
            answer:
              "La membresía anual de Apple Developer cuesta $99/año y la cuenta de Google Play es $25 (pago único). El mantenimiento técnico depende de las actualizaciones que necesites, pero ofrecemos planes flexibles.",
          },
          {
            question: "¿La app funcionará sin conexión a internet?",
            answer:
              "Sí, diseñamos las apps con capacidades offline. Los datos se almacenan localmente y se sincronizan cuando hay conexión. Esto es especialmente útil para apps de campo, logística o consulta de catálogos.",
          },
          {
            question: "¿Cuánto tiempo toma desarrollar una app?",
            answer:
              "Una app simple puede tomar de 2 a 3 meses. Una app con funcionalidades complejas como pagos, geolocalización, chat o integraciones puede tomar de 4 a 6 meses. Te damos un cronograma preciso después de la fase de descubrimiento.",
          },
        ],
        techs: MOBILE_TECHS,
      },
      {
        slug: "sistemas-empresariales",
        service: "Sistemas Empresariales",
        iconName: "Building2",
        shortDescription:
          "Integramos y automatizamos tu operación con sistemas internos que centralizan información, eliminan silos y potencian la toma de decisiones.",
        heroHeading: "Ordena, automatiza y haz crecer tu operación",
        heroSubheading:
          "Tu empresa genera datos en todos lados. Nosotros los unificamos en un solo sistema que te da visibilidad, control y la capacidad de decidir con información confiable.",
        fullDescription: [
          "A medida que las empresas crecen, la información se dispersa: hojas de cálculo, correos, sistemas aislados, procesos manuales que dependen de personas clave. Llega un punto en que esta fragmentación frena el crecimiento. Ahí es donde intervenimos.",
          "Construimos sistemas empresariales que centralizan la información, automatizan procesos y dan visibilidad en tiempo real de lo que está pasando en tu operación. ERPs adaptados a tu negocio no genéricos, CRMs que tu equipo realmente usa, paneles de control con indicadores clave y flujos de aprobación que eliminan cuellos de botella.",
          "No imponemos una metodología rígida ni te obligamos a cambiar tu forma de trabajar. Analizamos tus procesos actuales, identificamos lo que funciona y lo que no, y diseñamos un sistema que se adapta a tu operación, no al revés. Implementamos por módulos priorizados para que veas resultados desde el primer mes.",
          "Nuestro enfoque incluye capacitación y acompañamiento para asegurar la adopción real. No sirve de nada tener el mejor sistema si tu equipo no lo usa. Por eso trabajamos con tus usuarios desde el diseño hasta la puesta en marcha.",
        ],
        benefits: [
          {
            title: "Visibilidad total de tu operación",
            description:
              "Un solo lugar donde convergen ventas, inventarios, finanzas, producción y recursos humanos. Sabes exactamente qué está pasando en cada área sin depender de informes manuales ni preguntarle a nadie.",
            iconName: "Eye",
          },
          {
            title: "Automatización de procesos críticos",
            description:
              "Eliminamos tareas manuales, aprobaciones en papel y procesos que dependen de correos interminables. Flujos automatizados que reducen errores, aceleran tiempos y liberan a tu equipo.",
            iconName: "Workflow",
          },
          {
            title: "Decisiones basadas en datos, no en corazonadas",
            description:
              "Paneles de control en tiempo real con indicadores clave de negocio: ventas, rentabilidad, productividad, inventarios. Datos confiables para tomar decisiones estratégicas con confianza.",
            iconName: "BarChart3",
          },
          {
            title: "Escalabilidad sin reemplazos",
            description:
              "Cuando tu negocio crezca, tu sistema crece contigo. Arquitectura modular que permite agregar nuevas funcionalidades, sucursales o líneas de negocio sin tener que cambiar de sistema.",
            iconName: "TrendingUp",
          },
          {
            title: "Reducción de costos operativos",
            description:
              "Menos tiempo en tareas administrativas, menos errores por procesos manuales, menos dependencia de hojas de cálculo. La eficiencia operativa se traduce directamente en ahorro de costos.",
            iconName: "DollarSign",
          },
        ],
        features: [
          {
            title: "ERP a medida",
            description:
              "Gestión de inventarios, compras, ventas, finanzas y producción. No un ERP genérico que te obliga a cambiar tu operación, sino un sistema diseñado para tu negocio específico.",
          },
          {
            title: "CRM adaptado a tu ciclo de ventas",
            description:
              "Gestión de clientes, oportunidades, cotizaciones y seguimiento. Configurado para tu proceso de ventas real, no para un modelo genérico que no se ajusta a cómo vendes.",
          },
          {
            title: "Paneles de control y reportería",
            description:
              "Dashboards ejecutivos con indicadores en tiempo real. Reportes automáticos que se actualizan sin intervención manual. Datos que tu equipo directivo puede consultar cuando quiera.",
          },
          {
            title: "Flujos de aprobación automatizados",
            description:
              "Órdenes de compra, solicitudes de gastos, aprobaciones de crédito, autorizaciones. Flujos configurables que eliminan cuellos de botella y dan trazabilidad completa.",
          },
          {
            title: "Integración con sistemas existentes",
            description:
              "Conectamos tu nuevo sistema con las herramientas que ya usas: contabilidad, facturación electrónica, bancos, plataformas de pago, e-commerce y más. Sin reemplazar lo que funciona.",
          },
        ],
        process: [
          {
            step: 1,
            title: "Diagnóstico de procesos",
            description:
              "Mapeamos tu operación actual: procesos, sistemas, flujos de información, puntos de dolor y oportunidades de mejora. Entregamos un diagnóstico detallado con recomendaciones priorizadas.",
          },
          {
            step: 2,
            title: "Diseño del sistema por módulos",
            description:
              "Definimos la arquitectura del sistema y priorizamos los módulos a construir según impacto y urgencia. Cada módulo resuelve un problema específico y entrega valor medible.",
          },
          {
            step: 3,
            title: "Construcción y pruebas con usuarios reales",
            description:
              "Desarrollamos cada módulo involucrando a los usuarios finales desde el inicio. Pruebas con datos reales y retroalimentación continua para asegurar que el sistema resuelve el problema.",
          },
          {
            step: 4,
            title: "Capacitación y adopción",
            description:
              "Capacitamos a tu equipo en el uso del sistema. Creamos manuales, videos y sesiones prácticas. Medimos la adopción y hacemos ajustes hasta que el equipo use el sistema de forma natural.",
          },
          {
            step: 5,
            title: "Acompañamiento continuo",
            description:
              "Monitoreamos el uso, atendemos dudas y priorizamos mejoras. El sistema evoluciona con tu negocio. Estamos contigo en el largo plazo, no solo hasta el lanzamiento.",
          },
        ],
        cta: defaultCta("tu sistema empresarial"),
        seo: {
          metaTitle:
            "Sistemas Empresariales a Medida (ERP/CRM) | Star Grow Studio",
          metaDescription:
            "Automatización y centralización de operaciones con sistemas empresariales a medida. ERP, CRM, paneles de control e integraciones. Transforma tu operación. Agenda diagnóstico.",
        },
        faq: [
          {
            question: "¿Cuánto tiempo toma implementar un sistema empresarial?",
            answer:
              "Depende de los módulos que necesites. Un módulo simple puede estar listo en 4 a 6 semanas. Una implementación completa con múltiples módulos puede tomar de 4 a 8 meses. Trabajamos por fases para que veas resultados desde el principio.",
          },
          {
            question: "¿Qué pasa si ya uso un ERP o CRM genérico?",
            answer:
              "Analizamos tu situación. A veces es mejor integrar y extender lo que ya tienes. Otras veces, construir un sistema a medida que se adapte perfectamente a tu operación. Te recomendamos la mejor opción sin sesgo.",
          },
          {
            question: "¿Cómo aseguran que el equipo adopte el sistema?",
            answer:
              "Involucramos a los usuarios desde el diseño del sistema. Capacitamos, creamos documentación y medimos la adopción. Si detectamos resistencia, ajustamos la estrategia. No damos por terminado el proyecto hasta que el sistema se use de forma natural.",
          },
          {
            question: "¿El sistema puede integrarse con mi facturación electrónica y bancos?",
            answer:
              "Sí. Diseñamos el sistema para integrarse con servicios externos: facturación electrónica (SAT, DIAN o tu entidad local), pasarelas de pago, bancos, plataformas logísticas y cualquier API que necesites.",
          },
        ],
      },
    ],
  },
  {
    slug: "diseno",
    service: "Diseño",
    iconName: "Palette",
    shortDescription:
      "Diseñamos experiencias digitales claras, coherentes y centradas en el usuario que aumentan la conversión y fortalecen tu marca.",
    heroHeading: "Diseño que conecta, convence y convierte",
    heroSubheading:
      "No se trata solo de que se vea bien. Se trata de que funcione. Interfaces que guían, experiencias que fidelizan y marcas que se recuerdan. Diseñamos con el usuario y el negocio en el centro.",
    fullDescription: [
      "Un buen diseño no es cuestión de gusto estético: es una ventaja competitiva. Cuando tu interfaz es clara, tu usuario encuentra lo que busca sin fricción. Cuando tu marca es coherente, genera confianza. Cuando la experiencia es fluida, la conversión aumenta.",
      "En Star Grow Studio diseñamos con metodología. Investigamos a tus usuarios para entender sus necesidades, sus frustraciones y su contexto. Diseñamos prototipos que validamos con personas reales antes de escribir código. Construimos sistemas de diseño que garantizan consistencia en todos tus puntos de contacto digitales.",
      "Trabajamos de la mano con equipos de desarrollo para asegurar que lo diseñado se implemente fielmente. No entregamos archivos de Figma y desaparecemos: acompañamos la implementación para garantizar que el resultado final coincida con la visión de diseño.",
      "Creamos identidades de marca memorables, interfaces limpias y accesibles, flujos de usuario que reducen la fricción y aumentan la conversión. Cada decisión de diseño está respaldada por datos, investigación y principios de usabilidad probados.",
    ],
    benefits: [
      {
        title: "Aumento de conversión",
        description:
          "Un diseño centrado en el usuario y optimizado para la acción puede aumentar las tasas de conversión entre un 20% y un 200%. Cada elemento está pensado para guiar al usuario hacia el objetivo.",
        iconName: "MousePointerClick",
      },
      {
        title: "Consistencia multiplataforma",
        description:
          "Tu marca se ve, siente y comunica igual en web, móvil, email y redes sociales. Sistemas de diseño que garantizan coherencia visual y de experiencia en todos los canales.",
        iconName: "Grid3x3",
      },
      {
        title: "Decisiones basadas en evidencia",
        description:
          "No diseñamos por intuición. Investigamos, prototipamos y probamos con usuarios reales. Cada decisión de diseño está respaldada por datos y validación, no por opiniones.",
        iconName: "ClipboardList",
      },
      {
        title: "Menos costos de desarrollo",
        description:
          "Un diseño bien pensado y validado antes del desarrollo reduce drásticamente los costos de cambios y correcciones. Detectar un problema en un prototipo cuesta 100 veces menos que corregirlo en producción.",
        iconName: "DollarSign",
      },
      {
        title: "Accesibilidad e inclusión",
        description:
          "Diseñamos para que todos puedan usar tu producto, incluyendo personas con discapacidades visuales, motoras o cognitivas. No solo es ético: amplía tu mercado y cumple con regulaciones.",
        iconName: "Accessibility",
      },
    ],
    features: [
      {
        title: "Diseño de interfaces (UI)",
        description:
          "Pantallas limpias, atractivas y funcionales. Sistemas de componentes reutilizables, paletas de color consistentes, tipografía clara y atención al detalle en cada píxel.",
      },
      {
        title: "Diseño de experiencia (UX)",
        description:
          "Flujos de usuario claros, arquitectura de información bien estructurada, navegación intuitiva. Investigación, mapas de empatía, customer journeys y pruebas de usabilidad.",
      },
      {
        title: "Sistemas de diseño",
        description:
          "Bibliotecas completas de componentes y patrones de diseño que garantizan consistencia y aceleran el desarrollo. Documentados, versionados y fáciles de mantener.",
      },
      {
        title: "Prototipado interactivo",
        description:
          "Prototipos navegables en alta fidelidad que simulan la experiencia real del producto. Ideales para validar ideas con stakeholders, inversionistas o usuarios antes de desarrollar.",
      },
      {
        title: "Research y validación con usuarios",
        description:
          "Entrevistas, pruebas de usabilidad, tests A/B, análisis de métricas. Investigación cualitativa y cuantitativa para tomar decisiones informadas y reducir riesgos.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Investigación y descubrimiento",
        description:
          "Entrevistamos a stakeholders y usuarios, analizamos la competencia, revisamos métricas existentes. Entregamos un reporte con hallazgos, oportunidades y recomendaciones estratégicas.",
      },
      {
        step: 2,
        title: "Arquitectura y flujos",
        description:
          "Definimos la estructura del producto: mapa del sitio, flujos de usuario, wireframes. Validamos la lógica de navegación y la jerarquía de contenido antes de diseñar visualmente.",
      },
      {
        step: 3,
        title: "Diseño visual y prototipado",
        description:
          "Creamos el diseño visual completo y prototipos interactivos de alta fidelidad. Iteramos contigo hasta tener una versión que cumpla con los objetivos de negocio y las necesidades de usuario.",
      },
      {
        step: 4,
        title: "Validación con usuarios",
        description:
          "Probamos los prototipos con usuarios reales. Identificamos puntos de fricción, áreas de mejora y validamos que la solución resuelva el problema planteado. Iteramos según los hallazgos.",
      },
      {
        step: 5,
        title: "Acompañamiento en implementación",
        description:
          "Entregamos los archivos de diseño y acompañamos al equipo de desarrollo durante la implementación. Revisamos que el resultado final coincida con el diseño aprobado.",
      },
    ],
    cta: defaultCta("tu producto digital"),
    seo: {
      metaTitle:
        "Diseño UI/UX y Branding para Empresas | Star Grow Studio",
      metaDescription:
        "Diseño de interfaces, experiencia de usuario e identidad de marca. Investigación, prototipado, sistemas de diseño y validación con usuarios. Aumenta tu conversión con diseño estratégico.",
    },
    faq: [
      {
        question: "¿Cuál es la diferencia entre UI y UX?",
        answer:
          "UX (User Experience) se enfoca en cómo se siente y funciona el producto: flujos, estructura, facilidad de uso. UI (User Interface) se enfoca en cómo se ve: colores, tipografía, iconos, estilo visual. Ambos son complementarios y trabajan juntos para crear productos que son tanto funcionales como atractivos.",
      },
      {
        question: "¿Necesito diseño si ya tengo una agencia de marketing?",
        answer:
          "Depende. Si tu agencia cubre diseño digital con research, prototipado y pruebas, quizás no. Pero muchas agencias se enfocan en branding y comunicación, no en diseño de producto digital. Nosotros nos especializamos en diseñar experiencias digitales funcionales basadas en datos y validación con usuarios.",
      },
      {
        question: "¿Cuánto cuesta diseñar un producto digital?",
        answer:
          "Depende de la complejidad. Un diseño de app simple puede costar desde $5,000. Un sistema de diseño completo para una plataforma compleja puede costar $20,000 o más. Te damos un presupuesto preciso después de entender tu proyecto.",
      },
      {
        question: "¿Trabajan con equipos de desarrollo externos?",
        answer:
          "Sí. Acompañamos a equipos de desarrollo internos o externos durante la implementación. Entregamos archivos de diseño organizados, especificaciones y assets. También podemos recomendarte equipos de desarrollo con los que hemos trabajado.",
      },
    ],
    mainImage: "/img/design-figma.png",
    children: [
      {
        slug: "ui",
        service: "UI",
        iconName: "PenTool",
        shortDescription:
          "Interfaces limpias, accesibles y visualmente atractivas que comunican tu marca y guían al usuario hacia la acción.",
        heroHeading: "Interfaces que comunican, no solo decoran",
        heroSubheading:
          "Cada color, cada espacio, cada tipografía comunica algo. Diseñamos interfaces que hablan el lenguaje de tu marca y guían al usuario de forma natural hacia lo que importa.",
        fullDescription: [
          "El diseño UI es mucho más que hacer que las cosas se vean bonitas. Es comunicar jerarquía, guiar la atención, facilitar la comprensión y generar confianza a través de lo visual. Una interfaz bien diseñada hace que el usuario sienta que el producto es fácil, confiable y profesional.",
          "Diseñamos interfaces con sistemas de componentes reutilizables que garantizan consistencia en toda la aplicación. Cada botón, cada formulario, cada tarjeta está pensado para ser funcional, accesible y estéticamente coherente.",
          "Trabajamos con herramientas modernas como Figma, donde construimos bibliotecas de componentes que tu equipo de desarrollo puede implementar con precisión. No diseñamos páginas sueltas, diseñamos sistemas que escalan.",
        ],
        benefits: [
          {
            title: "Consistencia visual total",
            description:
              "Todos los elementos de tu interfaz siguen los mismos patrones y principios de diseño. El usuario aprende una vez y sabe cómo usar cualquier parte del producto.",
            iconName: "Grid3x3",
          },
          {
            title: "Accesibilidad para todos",
            description:
              "Contraste suficiente, tamaños de fuente legibles, objetivos táctiles accesibles, navegación por teclado. Diseñamos para que todos puedan usar tu producto.",
            iconName: "Glasses",
          },
          {
            title: "Sistemas de diseño escalables",
            description:
              "Bibliotecas de componentes documentadas y versionadas. Cuando necesites agregar una nueva funcionalidad, el diseño ya está definido. Escalas sin perder consistencia.",
            iconName: "Component",
          },
          {
            title: "Identidad de marca integrada",
            description:
              "Tu interfaz refleja los valores y la personalidad de tu marca. No es genérica: es única y se siente como tuya en cada píxel.",
            iconName: "Sparkles",
          },
        ],
        features: [
          {
            title: "Sistemas de diseño (Design Systems)",
            description:
              "Bibliotecas completas de componentes UI con especificaciones detalladas: estados, variantes, comportamientos. Documentación para que tu equipo desarrolle de forma consistente.",
          },
          {
            title: "Diseño visual de productos",
            description:
              "Paletas de color, tipografía, iconografía, espaciado, sombras, animaciones. El lenguaje visual completo de tu producto, aplicado de forma coherente en todas las pantallas.",
          },
          {
            title: "Bibliotecas en Figma",
            description:
              "Componentes organizados, auto-layout, variantes, prototipado interactivo. Archivos que tu equipo de diseño y desarrollo puede usar como fuente única de verdad.",
          },
          {
            title: "Guías de estilo y especificaciones",
            description:
              "Documentación detallada de cada componente, incluyendo medidas, colores, comportamientos y ejemplos de uso. Tu equipo de desarrollo implementa con precisión.",
          },
        ],
        process: [
          {
            step: 1,
            title: "Definición del sistema visual",
            description:
              "Establecemos la dirección de arte: moodboards, referencias, paleta de color, tipografía. Aprobamos la dirección visual antes de diseñar componentes.",
          },
          {
            step: 2,
            title: "Construcción de componentes",
            description:
              "Diseñamos cada componente del sistema: botones, inputs, tarjetas, modales, tabs, navegación. Cada componente con todas sus variantes y estados.",
          },
          {
            step: 3,
            title: "Aplicación a pantallas clave",
            description:
              "Aplicamos el sistema de diseño a las pantallas principales del producto. Verificamos que los componentes funcionen juntos en contexto real y hacemos ajustes.",
          },
          {
            step: 4,
            title: "Documentación y entrega",
            description:
              "Documentamos el sistema de diseño, exportamos assets y entregamos especificaciones. Acompañamos al equipo de desarrollo en la implementación inicial.",
          },
        ],
        cta: defaultCta("tu interfaz de usuario"),
        seo: {
          metaTitle:
            "Diseño UI Profesional | Sistemas de Diseño e Interfaces | Star Grow Studio",
          metaDescription:
            "Interfaces limpias, accesibles y consistentes. Sistemas de diseño escalables, componentes reutilizables y bibliotecas Figma. Diseño UI que comunica tu marca y guía al usuario.",
        },
        faq: [
          {
            question: "¿Qué es un sistema de diseño?",
            answer:
              "Es una biblioteca completa de componentes visuales (botones, formularios, tipografía, colores) con reglas claras de uso. Garantiza que todo el producto se vea y comporte de manera consistente, acelera el desarrollo y facilita el mantenimiento.",
          },
          {
            question: "¿Trabajan con mi equipo de desarrollo existente?",
            answer:
              "Sí. Diseñamos pensando en la implementación. Entregamos componentes en Figma con especificaciones claras, medidas exactas y código CSS/Tailwind referencial. Acompañamos a tu equipo en las primeras integraciones.",
          },
        ],
        techs: DESIGN_TECHS,
      },
      {
        slug: "ux",
        service: "UX",
        iconName: "Route",
        shortDescription:
          "Investigamos, diseñamos y validamos experiencias de usuario que reducen la fricción y aumentan la satisfacción y retención.",
        heroHeading: "Experiencias que tus usuarios amarán usar",
        heroSubheading:
          "Un producto fácil de usar no es un lujo: es una necesidad competitiva. Investigamos a tus usuarios, diseñamos flujos sin fricción y validamos cada decisión antes de invertir en desarrollo.",
        fullDescription: [
          "La experiencia de usuario es la diferencia entre un producto que tus clientes usan todos los días y uno que abandonan después de la primera semana. Un buen UX reduce costos de soporte, aumenta la retención, mejora la conversión y construye lealtad de marca.",
          "Nuestro proceso de UX comienza con investigación: entrevistas, encuestas, análisis de datos existentes y observación del comportamiento del usuario. No asumimos: preguntamos, observamos y validamos.",
          "Con esa información, diseñamos flujos de usuario claros, arquitectura de información bien estructurada y prototipos navegables que probamos con usuarios reales. Iteramos hasta validar que la solución resuelve el problema de forma intuitiva.",
          "Cuando el diseño UX está validado, el desarrollo puede comenzar con confianza. Sabemos que lo que construimos funcionará porque ya lo probamos con las personas que lo van a usar.",
        ],
        benefits: [
          {
            title: "Mayor retención de usuarios",
            description:
              "Un producto fácil de usar hace que los usuarios vuelvan. La fricción es la principal causa de abandono. Identificamos y eliminamos cada punto de fricción en la experiencia.",
            iconName: "Users",
          },
          {
            title: "Reducción de costos de soporte",
            description:
              "Cuando el producto es intuitivo, los usuarios no necesitan ayuda para usarlo. Menos llamadas a soporte, menos tutoriales, menos frustración. Cada dólar invertido en UX ahorra hasta $100 en soporte.",
            iconName: "Headset",
          },
          {
            title: "Decisiones validadas, no suposiciones",
            description:
              "No lanzamos funciones basadas en corazonadas. Cada funcionalidad se valida con usuarios antes de desarrollarse. Reducimos el riesgo de invertir en cosas que nadie va a usar.",
            iconName: "ClipboardList",
          },
          {
            title: "Aumento de conversión",
            description:
              "Un flujo de compra, registro o conversión bien diseñado puede duplicar o triplicar la tasa de conversión. Pequeños cambios en UX tienen impactos enormes en los resultados de negocio.",
            iconName: "TrendingUp",
          },
        ],
        features: [
          {
            title: "Investigación de usuarios",
            description:
              "Entrevistas en profundidad, encuestas, análisis de métricas, mapas de experiencia, estudios diarios. Entendemos quiénes son tus usuarios, qué necesitan y cómo se comportan.",
          },
          {
            title: "Arquitectura de información",
            description:
              "Organización y estructuración del contenido y las funcionalidades del producto. Navegación clara, etiquetado consistente, jerarquías lógicas. El usuario encuentra lo que busca sin esfuerzo.",
          },
          {
            title: "Prototipado interactivo",
            description:
              "Prototipos navegables en baja, media y alta fidelidad. Ideales para validar flujos y funcionalidades con usuarios y stakeholders antes de invertir en desarrollo.",
          },
          {
            title: "Pruebas de usabilidad",
            description:
              "Pruebas moderadas y no moderadas con usuarios reales. Identificamos problemas de usabilidad, puntos de fricción y oportunidades de mejora. Resultados accionables y priorizados.",
          },
          {
            title: "Métrica UX y analítica",
            description:
              "Definición y medición de indicadores clave de experiencia: tiempo de tarea, tasa de éxito, satisfacción (CSAT/NPS), abandono de flujo. Datos para mejorar continuamente.",
          },
        ],
        process: [
          {
            step: 1,
            title: "Research",
            description:
              "Entrevistamos a usuarios y stakeholders, analizamos datos existentes, revisamos la competencia. Entregamos un reporte con hallazgos, perfiles de usuario y oportunidades de mejora.",
          },
          {
            step: 2,
            title: "Definición y estructura",
            description:
              "Definimos flujos de usuario, arquitectura de información y wireframes. Validamos la estructura con el equipo antes de invertir en diseño visual.",
          },
          {
            step: 3,
            title: "Prototipado",
            description:
              "Creamos prototipos navegables que simulan la experiencia del producto. Suficientemente detallados para probar funcionalidad, no necesariamente el diseño visual final.",
          },
          {
            step: 4,
            title: "Validación con usuarios",
            description:
              "Probamos los prototipos con usuarios reales. Observamos, medimos y recogemos retroalimentación. Identificamos qué funciona y qué necesita mejorar.",
          },
          {
            step: 5,
            title: "Iteración y entrega",
            description:
              "Iteramos sobre el diseño basados en los hallazgos de las pruebas. Entregamos especificaciones de UX para el equipo de desarrollo: flujos, comportamientos, reglas de validación.",
          },
        ],
        cta: defaultCta("tu experiencia de usuario"),
        seo: {
          metaTitle:
            "Diseño UX para Empresas | Investigación y Validación | Star Grow Studio",
          metaDescription:
            "Investigación de usuarios, prototipado, pruebas de usabilidad y diseño de experiencias que aumentan retención y conversión. Decisiones validadas con datos, no suposiciones.",
        },
        faq: [
          {
            question: "¿En qué se diferencia UX de UI?",
            answer:
              "UX se enfoca en cómo funciona y se siente el producto: flujos, estructura, facilidad de uso. UI se enfoca en cómo se ve: colores, tipografía, estilo visual. UX viene primero (investigación y estructura), UI después (apariencia visual). Ambos son necesarios para un producto exitoso.",
          },
          {
            question: "¿Cuándo debería invertir en UX?",
            answer:
              "Siempre, pero especialmente antes de comenzar un desarrollo. Arreglar un problema de usabilidad en un prototipo cuesta horas. Arreglarlo después del desarrollo cuesta semanas y dinero. Si estás por empezar un proyecto, el UX es la mejor inversión que puedes hacer.",
          },
        ],
      },
      {
        slug: "branding",
        service: "Branding",
        iconName: "Sparkles",
        shortDescription:
          "Creamos identidades de marca coherentes y memorables que conectan con tu audiencia y te diferencian en el mercado.",
        heroHeading: "Marcas que se recuerdan y eligen",
        heroSubheading:
          "Tu marca no es solo un logo: es cada punto de contacto con tus clientes. Creamos sistemas de identidad visual coherentes, memorables y estratégicamente alineados con tu negocio.",
        fullDescription: [
          "Tu marca es la primera impresión que das al mundo y la huella que dejas en la mente de tus clientes. Es lo que te hace reconocible, lo que te diferencia y lo que comunica tus valores antes de que digas una sola palabra.",
          "Creamos identidades de marca completas: desde el diseño del logotipo hasta el sistema visual completo que se aplica en todos tus puntos de contacto. Paleta de color, tipografía, iconografía, fotografía, tono de comunicación y guías de uso.",
          "Nuestro proceso combina estrategia de marca con excelencia en diseño. No creamos logos bonitos sin contexto: primero entendemos tu posicionamiento, tu audiencia, tu competencia y tus valores. Solo entonces diseñamos un sistema visual que comunica quién eres y por qué importas.",
          "Entregables listos para usar: archivos vectoriales, guías de marca, aplicaciones a soportes digitales y físicos. Tu equipo de marketing y desarrollo tendrá todo lo necesario para aplicar la marca de forma consistente.",
        ],
        benefits: [
          {
            title: "Diferenciación real en tu mercado",
            description:
              "En industrias saturadas, la identidad visual es lo que hace que los clientes te elijan a ti y no a tu competidor. Una marca bien diseñada comunica valor y genera preferencia.",
            iconName: "Gem",
          },
          {
            title: "Confianza y credibilidad",
            description:
              "Una identidad visual profesional y coherente transmite seriedad, experiencia y confiabilidad. Los clientes confían más en marcas que se ven profesionales.",
            iconName: "ShieldCheck",
          },
          {
            title: "Consistencia en todos los canales",
            description:
              "Tu marca se ve igual en tu web, en redes sociales, en presentaciones, en empaques y en tus instalaciones físicas. Consistencia genera reconocimiento y recordación.",
            iconName: "Layers",
          },
          {
            title: "Conexión emocional con tu audiencia",
            description:
              "Una marca bien diseñada no solo comunica información: genera emociones. Cuando los clientes se sienten conectados emocionalmente con tu marca, son más leales y te recomiendan más.",
            iconName: "Heart",
          },
        ],
        features: [
          {
            title: "Estrategia de marca",
            description:
              "Definición de posicionamiento, personalidad de marca, valores, audiencia objetivo y propuesta de valor diferencial. La base estratégica sobre la que se construye la identidad visual.",
          },
          {
            title: "Identidad visual completa",
            description:
              "Logotipo, variantes, paleta de color, tipografía, iconografía, patrones, fotografía. El sistema visual completo que representa tu marca de forma coherente.",
          },
          {
            title: "Manual de marca",
            description:
              "Guía completa de uso de la identidad visual: reglas de aplicación, usos correctos e incorrectos, ejemplos. Tu equipo sabrá exactamente cómo aplicar la marca en cualquier contexto.",
          },
          {
            title: "Aplicaciones de marca",
            description:
              "Diseño de aplicaciones clave: papelería corporativa, presentaciones, plantillas de redes sociales, firmas de correo, merchandising básico. Tu marca lista para usar.",
          },
          {
            title: "Brand guidelines digitales",
            description:
              "Documentación interactiva de la identidad visual, accesible online para todo tu equipo. Incluye especificaciones técnicas para diseñadores y desarrolladores.",
          },
        ],
        process: [
          {
            step: 1,
            title: "Descubrimiento estratégico",
            description:
              "Sesiones de trabajo para entender tu negocio, tu mercado, tu competencia y tus aspiraciones. Definimos el posicionamiento y la personalidad de marca que guiarán el diseño.",
          },
          {
            step: 2,
            title: "Exploración visual",
            description:
              "Desarrollamos múltiples conceptos visuales basados en la estrategia. Moodboards, referencias y direcciones de diseño. Seleccionamos la dirección más prometedora.",
          },
          {
            step: 3,
            title: "Diseño del sistema de identidad",
            description:
              "Desarrollamos el sistema visual completo: logotipo, paleta, tipografía y elementos gráficos. Iteramos contigo hasta tener un sistema que comunique exactamente lo que necesitas.",
          },
          {
            step: 4,
            title: "Documentación y entrega",
            description:
              "Creamos el manual de marca, organizamos los archivos y preparamos todos los entregables. Tu equipo tendrá todo lo necesario para aplicar la marca de forma autónoma.",
          },
        ],
        cta: defaultCta("tu marca"),
        seo: {
          metaTitle:
            "Branding e Identidad Visual Corporativa | Star Grow Studio",
          metaDescription:
            "Creamos identidades de marca completas: logo, paleta, tipografía, manual de marca y aplicaciones. Marcas que conectan, diferencian y generan confianza. Solicita diagnóstico.",
        },
        faq: [
          {
            question: "¿Cuánto tiempo toma crear una identidad de marca?",
            answer:
              "Un proyecto completo de branding puede tomar de 4 a 8 semanas, dependiendo de la complejidad y la cantidad de aplicaciones. Incluye investigación estratégica, diseño, iteración y documentación.",
          },
          {
            question: "¿Incluye diseño de packaging, letreros o materiales impresos?",
            answer:
              "Sí, podemos incluir aplicaciones físicas como packaging, letreros, uniformes o papelería. Lo definimos en el alcance del proyecto según tus necesidades específicas.",
          },
          {
            question: "¿Ya tengo un logo pero quiero actualizarlo. ¿Trabajan con redesign?",
            answer:
              "Sí, hacemos rediseños de marca respetando el valor acumulado de tu identidad actual. Analizamos qué elementos vale la pena mantener y qué necesita evolucionar para seguir siendo relevante.",
          },
        ],
        techs: DESIGN_TECHS,
      },
    ],
  },
  {
    slug: "fotografia",
    service: "Fotografía",
    iconName: "Camera",
    shortDescription:
      "Producimos contenido visual profesional que humaniza tu marca, transmite confianza y convierte miradas en clientes.",
    heroHeading: "Imágenes que cuentan la historia de tu marca",
    heroSubheading:
      "En un mundo donde la primera impresión es visual, tus fotos son tu carta de presentación. Producimos imágenes profesionales que comunican calidad, confianza y el valor de lo que ofreces.",
    fullDescription: [
      "En la economía digital actual, el contenido visual es el factor más importante en la decisión de compra. Un cliente potencial que ve imágenes profesionales de tu producto, tu equipo o tus instalaciones percibe mayor calidad y confianza que uno que ve fotos amateur.",
      "En Star Grow Studio producemos fotografías que cuentan la historia de tu marca. No solo capturamos imágenes: planeamos cada sesión con un propósito claro, alineado con tu estrategia de comunicación y tu identidad visual.",
      "Trabajamos con equipos profesionales, iluminación controlada y técnicas de postproducción que garantizan resultados consistentes y de alta calidad. Cada imagen se entrega optimizada para el canal donde se va a usar: web, redes sociales, catálogos impresos o publicidad.",
      "Ofrecemos fotografía de producto, corporativa, de eventos y lifestyle. Cada especialidad tiene su propio flujo de trabajo y equipo, pero todas comparten nuestro estándar de calidad y enfoque en resultados de negocio.",
    ],
    benefits: [
      {
        title: "Percepción de calidad y confianza",
        description:
          "Las imágenes profesionales elevan la percepción de tu marca. Los clientes asocian la calidad visual con la calidad del producto o servicio. Invertir en fotografía es invertir en la percepción de tu negocio.",
        iconName: "Award",
      },
      {
        title: "Consistencia visual en todos los canales",
        description:
          "Todas tus imágenes siguen el mismo estilo y calidad, desde tu web hasta tus redes sociales y catálogos. Una identidad visual coherente que fortalece tu marca.",
        iconName: "Grid3x3",
      },
      {
        title: "Mayor conversión en e-commerce",
        description:
          "Los productos con fotos profesionales convierten hasta un 30% más que aquellos con fotos amateur. Cada detalle cuenta: iluminación, ángulo, contexto. Hacemos que tus productos se vean irresistibles.",
        iconName: "ShoppingCart",
      },
      {
        title: "Contenido listo para publicar",
        description:
          "Entregamos imágenes editadas, retocadas y optimizadas para cada canal. Web, redes, impresos, publicidad. Ahorras tiempo de edición y producción interna.",
        iconName: "ImageDown",
      },
      {
        title: "Diferenciación competitiva",
        description:
          "Mientras tu competencia usa fotos genéricas de stock, tú muestras imágenes reales de tu equipo, tus productos y tus instalaciones. Autenticidad que genera conexión y confianza.",
        iconName: "Gem",
      },
    ],
    features: [
      {
        title: "Fotografía de producto",
        description:
          "Imágenes profesionales que resaltan cada detalle de tus productos. Fondo blanco para catálogo, lifestyle para contexto de uso, y ángulos múltiples para mostrar cada característica.",
      },
      {
        title: "Fotografía corporativa",
        description:
          "Retratos profesionales de tu equipo, fotos de tus instalaciones y espacios de trabajo. Humaniza tu marca y muestra la cara real de tu empresa.",
      },
      {
        title: "Cobertura de eventos",
        description:
          "Documentación fotográfica completa de eventos corporativos: conferencias, lanzamientos, activaciones de marca, reuniones especiales. No se pierde ningún momento importante.",
      },
      {
        title: "Postproducción profesional",
        description:
          "Revelado, retoque, corrección de color, eliminación de fondos y optimización para cada canal. Cada imagen pasa por un proceso de edición que garantiza calidad consistente.",
      },
      {
        title: "Dirección de arte y styling",
        description:
          "Planificación visual completa de la sesión: concepto, ambientación, utilería, iluminación. Cada sesión tiene una dirección creativa alineada con tu marca.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Brief y planificación",
        description:
          "Definimos el objetivo, el estilo, los entregables y el cronograma. Creamos un moodboard y un plan de tomas para asegurar que todos estamos alineados antes de la sesión.",
      },
      {
        step: 2,
        title: "Preproducción",
        description:
          "Preparamos el set, la iluminación, la utilería y el equipo. Coordinamos talento, locaciones y logística. Todo listo para que la sesión sea eficiente y productiva.",
      },
      {
        step: 3,
        title: "Sesión fotográfica",
        description:
          "Realizamos la captura con equipos profesionales y dirección creativa en tiempo real. Aseguramos variedad de tomas y ángulos para tener opciones en la selección.",
      },
      {
        step: 4,
        title: "Postproducción y entrega",
        description:
          "Seleccionamos, editamos, retocamos y optimizamos las mejores imágenes. Entregamos en los formatos y resoluciones necesarios para cada canal, listas para publicar.",
      },
    ],
    cta: defaultCta("tu contenido visual"),
    seo: {
      metaTitle:
        "Fotografía Profesional para Marcas y Empresas | Star Grow Studio",
      metaDescription:
        "Fotografía de producto, corporativa y de eventos. Imágenes profesionales que elevan la percepción de tu marca y aumentan la conversión. Producción completa con dirección creativa.",
    },
    faq: [
      {
        question: "¿Ofrecen fotografía en estudio o en locación?",
        answer:
          "Ambos. Tenemos un estudio equipado para fotografía de producto y retratos, y también trabajamos en locación para fotografía corporativa, de instalaciones o eventos. Nos adaptamos a lo que necesites.",
      },
      {
        question: "¿Cuántas imágenes entregan por sesión?",
        answer:
          "Depende del tipo de sesión y los entregables acordados. En promedio, para una sesión de producto puedes esperar de 10 a 30 imágenes finales editadas. Para eventos, la cobertura completa puede generar de 100 a 500 imágenes seleccionadas.",
      },
      {
        question: "¿Las imágenes vienen optimizadas para web y redes?",
        answer:
          "Sí. Entregamos las imágenes en alta resolución para impresión y versiones optimizadas para web, redes sociales y e-commerce. Cada formato con el peso, tamaño y resolución adecuados.",
      },
      {
        question: "¿Cuánto tiempo toma la entrega después de la sesión?",
        answer:
          "La postproducción de una sesión estándar toma de 3 a 7 días hábiles. Para proyectos urgentes, podemos acelerar el proceso. Te confirmamos los tiempos exactos en el brief.",
      },
    ],
    children: [
      {
        slug: "producto",
        service: "Producto",
        iconName: "Package",
        shortDescription:
          "Imágenes profesionales de producto que aumentan la percepción de valor y disparan las ventas en tu tienda online y catálogos.",
        heroHeading: "Haz que tus productos se vean tan bien como son",
        heroSubheading:
          "La primera vez que un cliente ve tu producto suele ser en una foto. Haz que esa primera impresión cuente. Fotografía profesional que resalta cada detalle y vende sin palabras.",
        fullDescription: [
          "En el comercio digital, la foto de tu producto es lo más cercano a tenerlo físicamente. Si la imagen no es profesional, el cliente asume que el producto tampoco lo es. Cada pixel importa cuando estás compitiendo por la atención y la confianza del comprador.",
          "Ofrecemos fotografía de producto en estudio con iluminación controlada, fondos profesionales y técnicas que resaltan texturas, colores y detalles. Desde fondo blanco para catálogo hasta imágenes lifestyle que muestran el producto en contexto de uso.",
          "Cada imagen pasa por un proceso de postproducción meticuloso: corrección de color, retoque, eliminación de imperfecciones y optimización para e-commerce. Entregamos imágenes consistentes en estilo y calidad para todo tu catálogo.",
        ],
        benefits: [
          {
            title: "Aumento de ventas en e-commerce",
            description:
              "Los productos con fotos profesionales convierten significativamente más. Una imagen de alta calidad reduce la incertidumbre del comprador y acelera la decisión de compra.",
            iconName: "ShoppingCart",
          },
          {
            title: "Percepción de mayor valor",
            description:
              "Un producto fotografiado profesionalmente se percibe como de mayor calidad y valor. Puedes justificar precios más altos cuando tus imágenes comunican calidad.",
            iconName: "TrendingUp",
          },
          {
            title: "Consistencia en todo el catálogo",
            description:
              "Todas las imágenes de tu catálogo siguen el mismo estilo, iluminación y calidad. Una experiencia visual coherente que fortalece tu marca.",
            iconName: "Grid3x3",
          },
          {
            title: "Listo para cualquier canal",
            description:
              "Cada producto se entrega en múltiples formatos: web, redes sociales, marketplaces, catálogos impresos. Optimizado para cada canal sin perder calidad.",
            iconName: "ImageDown",
          },
        ],
        features: [
          {
            title: "Fondo blanco para catálogo",
            description:
              "El estándar para e-commerce y marketplaces. Iluminación limpia que resalta el producto sin distracciones. Consistente en todo tu catálogo.",
          },
          {
            title: "Fotografía lifestyle",
            description:
              "Producto en contexto de uso. Muestra cómo se ve y se usa en la vida real. Ayuda al cliente a imaginarse usando tu producto.",
          },
          {
            title: "Ángulos múltiples",
            description:
              "Fotos desde diferentes ángulos para mostrar cada detalle del producto. Frontal, lateral, superior, detalle. El cliente ve exactamente lo que va a comprar.",
          },
          {
            title: "Postproducción profesional",
            description:
              "Revelado, corrección de color, retoque, eliminación de imperfecciones, ajuste de fondos. Cada imagen se edita para lucir perfecta.",
          },
        ],
        process: [
          {
            step: 1,
            title: "Brief del producto",
            description:
              "Revisamos los productos, definimos los ángulos necesarios y el estilo de las fotos. Establecemos el cronograma y los entregables.",
          },
          {
            step: 2,
            title: "Montaje e iluminación",
            description:
              "Preparamos el set con la iluminación adecuada para cada tipo de producto. Productos pequeños, grandes, brillantes, mate, transparentes. Cada uno requiere su técnica.",
          },
          {
            step: 3,
            title: "Captura y revisión",
            description:
              "Fotografiamos cada producto con los ángulos acordados. Revisamos calidad y consistencia durante la sesión para asegurar que todo está saliendo bien.",
          },
          {
            step: 4,
            title: "Edición y entrega",
            description:
              "Postproducción completa de todas las imágenes. Entregamos en los formatos acordados, listas para usar en tu tienda online, catálogo o redes sociales.",
          },
        ],
        cta: defaultCta("tu catálogo de productos"),
        seo: {
          metaTitle:
            "Fotografía de Producto Profesional | Star Grow Studio",
          metaDescription:
            "Fotografía de producto profesional para e-commerce y catálogos. Fondo blanco, lifestyle y ángulos múltiples. Aumenta la percepción de valor y las ventas de tus productos.",
        },
        faq: [
          {
            question: "¿Pueden fotografiar productos de cualquier tamaño?",
            answer:
              "Sí. Tenemos equipos y espacio para fotografiar desde productos pequeños como joyería o cosméticos, hasta productos grandes como muebles o equipos industriales.",
          },
          {
            question: "¿Ofrecen fotografías para marketplaces como Amazon o Mercado Libre?",
            answer:
              "Sí. Cumplimos con los requisitos técnicos de cada marketplace: fondo blanco, dimensiones específicas, formatos. Tus productos estarán listos para publicar en cualquier plataforma.",
          },
        ],
      },
      {
        slug: "corporativa",
        service: "Corporativa",
        iconName: "Building2",
        shortDescription:
          "Retratos y espacios que humanizan tu marca, proyectan profesionalismo y generan confianza en tus clientes y talento.",
        heroHeading: "El rostro humano de tu empresa",
        heroSubheading:
          "Detrás de cada marca hay personas. Muéstraselas al mundo. Retratos profesionales y fotos de tus espacios que humanizan tu empresa, generan confianza y atraen talento.",
        fullDescription: [
          "La fotografía corporativa es una de las herramientas más poderosas para humanizar tu marca. Cuando un cliente potencial visita tu web y ve fotos profesionales de tu equipo, percibe una empresa seria, confiable y cercana. Cuando un candidato ve tus espacios de trabajo, se imagina trabajando ahí.",
          "Producimos retratos corporativos consistentes para todo tu equipo: directivos, mandos medios, personal operativo. Un estilo unificado que comunica profesionalismo y pertenencia. También fotografiamos tus instalaciones: oficinas, plantas de producción, salas de reuniones, áreas comunes.",
          "Cada sesión se planifica para minimizar la interrupción de tus operaciones. Trabajamos rápido, de manera organizada y con una dirección clara para que tu equipo se sienta cómodo y las fotos reflejen naturalidad y confianza.",
        ],
        benefits: [
          {
            title: "Humaniza tu marca",
            description:
              "Las personas conectan con personas, no con logos. Mostrar los rostros de tu equipo genera cercanía y confianza con tus clientes potenciales.",
            iconName: "Users",
          },
          {
            title: "Profesionalismo y confianza",
            description:
              "Un directorio de equipo con retratos profesionales transmite seriedad y organización. Los clientes confían más en empresas que muestran quiénes son.",
            iconName: "Handshake",
          },
          {
            title: "Atracción de talento",
            description:
              "Las fotos de tus espacios de trabajo y tu equipo son clave para atraer talento. Los candidatos quieren ver dónde y con quién trabajarían.",
            iconName: "Star",
          },
          {
            title: "Consistencia en comunicaciones",
            description:
              "Todas las fotos de tu equipo y espacios siguen el mismo estilo. Coherentes en tu web, LinkedIn, redes sociales y materiales corporativos.",
            iconName: "Grid3x3",
          },
        ],
        features: [
          {
            title: "Retratos individuales y grupales",
            description:
              "Fotos profesionales de cada miembro del equipo con iluminación consistente y fondo uniforme. Ideales para directorio web, LinkedIn y materiales corporativos.",
          },
          {
            title: "Fotografía de instalaciones",
            description:
              "Imágenes de oficinas, plantas de producción, salas de reuniones, áreas comunes. Muestra tus espacios de trabajo y el ambiente de tu empresa.",
          },
          {
            title: "Sesiones eficientes",
            description:
              "Organizamos las sesiones por bloques para minimizar el impacto en tu operación. Coordinamos horarios, preparamos el set y dirigimos a las personas para sesiones rápidas y productivas.",
          },
          {
            title: "Edición y retoque profesional",
            description:
              "Corrección de color, retoque de piel, fondo consistente. Cada foto se edita para lucir profesional manteniendo la naturalidad.",
          },
        ],
        process: [
          {
            step: 1,
            title: "Planificación",
            description:
              "Definimos las personas a fotografiar, las locaciones, el estilo y el cronograma. Coordinamos logística para que la sesión sea eficiente.",
          },
          {
            step: 2,
            title: "Sesión en sitio",
            description:
              "Vamos a tus instalaciones con el equipo necesario. Montamos el set, fotografiamos a cada persona y capturamos los espacios. Mínima interrupción, máxima eficiencia.",
          },
          {
            step: 3,
            title: "Edición y entrega",
            description:
              "Editamos todas las fotos con estilo consistente. Entregamos en alta resolución y versiones optimizadas para web y redes sociales.",
          },
        ],
        cta: defaultCta("tu imagen corporativa"),
        seo: {
          metaTitle:
            "Fotografía Corporativa Profesional | Retratos e Instalaciones | Star Grow Studio",
          metaDescription:
            "Retratos profesionales de equipo y fotografía de instalaciones. Humaniza tu marca, proyecta confianza y atrae talento con imágenes corporativas de calidad.",
        },
        faq: [
          {
            question: "¿Cuánto tiempo toma una sesión corporativa?",
            answer:
              "Depende de la cantidad de personas. Una sesión para 20 personas puede tomar de 2 a 3 horas. La fotografía de instalaciones agrega 1 a 2 horas adicionales.",
          },
          {
            question: "¿Vienen a nuestras oficinas o vamos a un estudio?",
            answer:
              "Preferimos ir a tus instalaciones para que las fotos reflejen tu entorno real y tu equipo esté en su ambiente natural. También podemos hacer sesiones en estudio si lo prefieres.",
          },
        ],
      },
      {
        slug: "eventos",
        service: "Eventos",
        iconName: "PartyPopper",
        shortDescription:
          "Documentamos tus eventos corporativos con una mirada profesional que captura la energía, los momentos clave y la esencia de tu marca.",
        heroHeading: "Tu evento merece ser recordado",
        heroSubheading:
          "Cada evento corporativo es una inversión en tu marca. Asegúrate de tener imágenes profesionales que capturen los momentos clave, la energía y el impacto de tu evento.",
        fullDescription: [
          "Los eventos corporativos son momentos importantes para tu empresa: lanzamientos, conferencias, activaciones de marca, reuniones especiales. Son inversiones significativas en comunicación y relaciones públicas. Merecen ser documentados con el mismo nivel de profesionalismo con el que fueron planeados.",
          "Ofrecemos cobertura fotográfica completa de eventos corporativos con un enfoque documental pero con mirada editorial. Capturamos no solo los momentos programados (discursos, premiaciones, cortes de listón), sino también la energía, las interacciones espontáneas y la atmósfera del evento.",
          "Trabajamos de manera discreta y profesional, sin interferir en el desarrollo del evento. Nos anticipamos a los momentos clave, estamos en el lugar correcto en el momento correcto, y entregamos un registro visual completo que podrás usar para comunicaciones post-evento, redes sociales, y memoria institucional.",
        ],
        benefits: [
          {
            title: "Registro profesional de tus momentos clave",
            description:
              "No se pierde ningún momento importante. Discursos, premiaciones, lanzamientos, interacciones. Cobertura completa desde la preparación hasta el cierre.",
            iconName: "Camera",
          },
          {
            title: "Contenido para comunicaciones post-evento",
            description:
              "Las fotos de tu evento son contenido valioso para redes sociales, notas de prensa, blogs y memorias institucionales. El evento termina, pero el contenido sigue generando valor.",
            iconName: "Send",
          },
          {
            title: "Discreción y profesionalismo",
            description:
              "Trabajamos sin interferir en el desarrollo del evento. Nos anticipamos a los momentos clave y capturamos sin ser notados. Tu evento fluye naturalmente mientras nosotros documentamos.",
            iconName: "Eye",
          },
          {
            title: "Entrega ágil",
            description:
              "Entregamos las imágenes editadas en un máximo de 48 horas. Para eventos que requieren cobertura en tiempo real, ofrecemos entregas parciales durante el mismo día.",
            iconName: "Clock",
          },
        ],
        features: [
          {
            title: "Cobertura completa del evento",
            description:
              "Desde la preparación y llegada de invitados, hasta el cierre. Cobertura ininterrumpida de todos los momentos importantes del evento.",
          },
          {
            title: "Fotografía de escenario y speakers",
            description:
              "Captura profesional de presentaciones, paneles, discursos y sesiones. Fotos de los speakers en acción con buena iluminación y encuadre.",
          },
          {
            title: "Fotografía social y networking",
            description:
              "Interacciones entre asistentes, networking, momentos espontáneos. La energía y las conexiones que hacen único a tu evento.",
          },
          {
            title: "Entrega digital curada",
            description:
              "Selección y edición de las mejores fotos. Entrega en galería digital privada para compartir con asistentes, o en los formatos que necesites.",
          },
        ],
        process: [
          {
            step: 1,
            title: "Brief y planificación",
            description:
              "Revisamos el programa del evento, identificamos los momentos clave, definimos el estilo y la cobertura. Planificamos la logística para estar en el lugar correcto en cada momento.",
          },
          {
            step: 2,
            title: "Cobertura del evento",
            description:
              "Cobertura fotográfica completa durante todo el evento. Dos fotógrafos para eventos grandes, uno para eventos medianos. Cobertura de todos los momentos clave.",
          },
          {
            step: 3,
            title: "Edición y entrega",
            description:
              "Seleccionamos, editamos y entregamos las mejores fotos en un máximo de 48 horas. Galería digital privada para que elijas y descargues las que necesites.",
          },
        ],
        cta: defaultCta("tu próximo evento"),
        seo: {
          metaTitle:
            "Fotografía de Eventos Corporativos | Star Grow Studio",
          metaDescription:
            "Cobertura fotográfica profesional para eventos corporativos: lanzamientos, conferencias, activaciones. Capturamos los momentos clave con mirada editorial. Entrega ágil en 48 horas.",
        },
        faq: [
          {
            question: "¿Cuántos fotógrafos asignan a un evento?",
            answer:
              "Depende del tamaño y la complejidad del evento. Para eventos pequeños (menos de 50 asistentes) un fotógrafo es suficiente. Para eventos medianos o grandes, recomendamos dos fotógrafos para asegurar cobertura completa.",
          },
          {
            question: "¿Entregan las fotos durante el evento?",
            answer:
              "Ofrecemos entregas parciales durante el evento para cobertura en redes sociales en tiempo real. La entrega completa de todas las fotos editadas se realiza en un máximo de 48 horas.",
          },
        ],
      },
    ],
  },
  {
    slug: "consultoria",
    service: "Consultoría",
    iconName: "Lightbulb",
    shortDescription:
      "Trazamos la hoja de ruta digital de tu empresa para que cada decisión tecnológica genere resultados de negocio medibles.",
    heroHeading: "Decisiones tecnológicas que impulsan tu negocio",
    heroSubheading:
      "No más inversiones tecnológicas sin rumbo. Te ayudamos a diagnosticar tu situación actual, definir una estrategia clara y ejecutarla con métricas que demuestren el impacto en tu negocio.",
    fullDescription: [
      "En un mundo donde la tecnología avanza más rápido que la capacidad de las empresas para adoptarla, tomar decisiones informadas es más crítico que nunca. ¿En qué tecnología invertir? ¿Cuándo hacerlo? ¿Cómo asegurar que genere el retorno esperado?",
      "En Star Grow Studio ofrecemos consultoría tecnológica estratégica para ayudarte a responder estas preguntas. No vendemos tecnología ni tenemos un martillo que busca clavos. Analizamos tu situación particular, tu industria, tu madurez digital y tus objetivos de negocio, y te recomendamos el camino más adecuado.",
      "Nuestros servicios de consultoría cubren desde diagnósticos rápidos de madurez digital hasta hojas de ruta completas de transformación, pasando por auditorías de arquitectura de software, optimización de procesos y acompañamiento en la ejecución.",
      "Lo que nos diferencia es que no solo entregamos informes. Te acompañamos en la implementación, medimos resultados y ajustamos el rumbo según sea necesario. No consideramos un proyecto exitoso hasta que vemos resultados de negocio concretos.",
    ],
    benefits: [
      {
        title: "Estrategia clara y accionable",
        description:
          "No más confusión sobre qué hacer primero. Una hoja de ruta priorizada por impacto de negocio y factibilidad técnica. Sabes exactamente por dónde empezar y qué esperar de cada paso.",
        iconName: "Compass",
      },
      {
        title: "Menos riesgo en inversiones tecnológicas",
        description:
          "Cada recomendación está respaldada por análisis objetivo. Reducimos el riesgo de invertir en tecnología que no se alinea con tus objetivos o que tu organización no está lista para adoptar.",
        iconName: "ShieldCheck",
      },
      {
        title: "Resultados medibles",
        description:
          "Definimos indicadores clave desde el inicio y medimos el impacto real de cada iniciativa. No se trata de implementar tecnología por implementar, se trata de generar resultados de negocio.",
        iconName: "BarChart3",
      },
      {
        title: "Alineación entre negocio y tecnología",
        description:
          "Cerramos la brecha entre lo que el negocio necesita y lo que tecnología entrega. Traducimos objetivos de negocio en requerimientos técnicos claros y viceversa.",
        iconName: "GitMerge",
      },
      {
        title: "Acompañamiento en la ejecución",
        description:
          "No somos consultores que entregan informes y desaparecen. Te acompañamos durante la implementación, ayudamos a resolver obstáculos y nos aseguramos de que los resultados se materialicen.",
        iconName: "Handshake",
      },
    ],
    features: [
      {
        title: "Diagnóstico de madurez digital",
        description:
          "Evaluamos tu situación actual en términos de tecnología, procesos, personas y datos. Identificamos fortalezas, debilidades y oportunidades con una matriz clara de prioridades.",
      },
      {
        title: "Hoja de ruta tecnológica",
        description:
          "Plan estratégico priorizado que define qué iniciativas ejecutar, en qué orden, con qué recursos y qué resultados esperar. Alineado con tus objetivos de negocio y tu capacidad de ejecución.",
      },
      {
        title: "Auditoría de arquitectura de software",
        description:
          "Revisión técnica de tus sistemas actuales: rendimiento, escalabilidad, seguridad, mantenibilidad, deuda técnica. Diagnóstico y recomendaciones para mejorar sin interrumpir la operación.",
      },
      {
        title: "Optimización de procesos",
        description:
          "Identificación de cuellos de botella, procesos manuales ineficientes y oportunidades de automatización. Recomendaciones concretas con análisis de costo-beneficio.",
      },
      {
        title: "Selección de tecnología y proveedores",
        description:
          "Evaluación objetiva de tecnologías, plataformas y proveedores. No tenemos afiliación con ninguna tecnología, por lo que nuestras recomendaciones son imparciales y basadas en tu contexto.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Diagnóstico inicial",
        description:
          "Evaluamos tu situación actual mediante entrevistas, revisión de documentación, análisis de datos y observación de procesos. Entregamos un diagnóstico detallado con hallazgos y recomendaciones preliminares.",
      },
      {
        step: 2,
        title: "Definición de la estrategia",
        description:
          "Desarrollamos una hoja de ruta con iniciativas priorizadas por impacto y factibilidad. Definimos métricas de éxito, recursos necesarios y cronograma estimado.",
      },
      {
        step: 3,
        title: "Validación y ajuste",
        description:
          "Presentamos la estrategia a tu equipo directivo, recogemos retroalimentación y ajustamos. La hoja de ruta final es un documento vivo que refleja el consenso y el compromiso de la organización.",
      },
      {
        step: 4,
        title: "Acompañamiento en ejecución",
        description:
          "Te acompañamos durante la implementación de las primeras iniciativas. Ayudamos a resolver obstáculos, ajustamos el plan según sea necesario y medimos avances contra las métricas definidas.",
      },
      {
        step: 5,
        title: "Revisión y evolución",
        description:
          "Realizamos revisiones periódicas para evaluar avances, celebrar logros y ajustar el rumbo. La estrategia evoluciona con tu negocio y con los cambios del mercado.",
      },
    ],
    cta: defaultCta("tu estrategia digital"),
    seo: {
      metaTitle:
        "Consultoría en Transformación Digital Estratégica | Star Grow Studio",
      metaDescription:
        "Diagnóstico de madurez digital, hojas de ruta tecnológicas, auditoría de arquitectura y acompañamiento en ejecución. Decisiones tecnológicas que generan resultados de negocio medibles.",
    },
    faq: [
      {
        question: "¿Qué diferencia a su consultoría de la de una consultora tradicional?",
        answer:
          "Nosotros no solo diagnosticamos y recomendamos: ejecutamos. Tenemos capacidad técnica para implementar las soluciones que recomendamos. Además, nuestras tarifas son más competitivas que las grandes consultoras porque somos un equipo ágil y enfocado.",
      },
      {
        question: "¿Cuánto dura un proceso de consultoría?",
        answer:
          "Un diagnóstico rápido puede tomar de 2 a 4 semanas. Una hoja de ruta completa puede requerir de 4 a 8 semanas. El acompañamiento en ejecución es continuo y se define según tus necesidades.",
      },
      {
        question: "¿Trabajan con empresas de cualquier tamaño?",
        answer:
          "Sí. Trabajamos desde startups que necesitan definir su stack tecnológico inicial, hasta empresas consolidadas que buscan transformar su operación digital. Adaptamos nuestro enfoque al tamaño y la madurez de cada organización.",
      },
      {
        question: "¿Ofrecen servicios de consultoría remotos?",
        answer:
          "Sí. Trabajamos de forma remota con equipos en toda América Latina. Para diagnósticos y acompañamiento, combinamos sesiones virtuales con visitas presenciales cuando es necesario.",
      },
    ],
    children: [
      {
        slug: "transformacion-digital",
        service: "Transformación Digital",
        iconName: "Rocket",
        shortDescription:
          "Acompañamos a tu empresa en la adopción de tecnologías digitales con foco en las personas, los procesos y los resultados de negocio.",
        heroHeading: "Transforma tu empresa sin perder el rumbo",
        heroSubheading:
          "La transformación digital no es instalar tecnología, es cambiar la forma en que tu empresa opera, compite y crea valor. Te acompañamos en ese cambio con método, no con prisas.",
        fullDescription: [
          "La transformación digital no es un proyecto de TI. Es un cambio profundo en la forma en que tu empresa opera, compite y crea valor. Involucra tecnología, pero también procesos, cultura organizacional y, sobre todo, personas.",
          "Nuestro enfoque de transformación digital combina diagnóstico estratégico, diseño de hoja de ruta y acompañamiento en la ejecución. No creemos en cambios radicales que paralizan la organización. Preferimos transformaciones progresivas, con hitos claros, victorias tempranas y aprendizaje continuo.",
          "Trabajamos con tu equipo para identificar las áreas de mayor oportunidad, priorizar iniciativas por impacto y factibilidad, y ejecutar cambios que generen resultados visibles desde el primer trimestre. Medimos el progreso con indicadores concretos y ajustamos el rumbo según los resultados.",
        ],
        benefits: [
          {
            title: "Cambio real, no solo tecnología",
            description:
              "Nos enfocamos en que las nuevas herramientas se adopten realmente. Trabajamos con las personas, no solo con los sistemas. La adopción es tan importante como la implementación.",
            iconName: "Users",
          },
          {
            title: "Priorización por impacto de negocio",
            description:
              "No todo es urgente ni todo es importante. Priorizamos las iniciativas que generan mayor impacto en tus resultados, no las que suenan más innovadoras.",
            iconName: "ListChecks",
          },
          {
            title: "Resultados desde el primer trimestre",
            description:
              "Diseñamos la hoja de ruta para generar victorias tempranas. Resultados visibles en los primeros 90 días que generan impulso y confianza en el proceso de transformación.",
            iconName: "Rocket",
          },
          {
            title: "Sostenibilidad del cambio",
            description:
              "No buscamos cambios cosméticos que se desvanecen cuando termina el proyecto. Construimos capacidades internas para que tu equipo pueda sostener y continuar la transformación.",
            iconName: "Leaf",
          },
        ],
        features: [
          {
            title: "Diagnóstico de madurez digital",
            description:
              "Evaluamos tu organización en 5 dimensiones: estrategia, procesos, tecnología, personas y datos. Identificamos brechas y oportunidades con una matriz clara de prioridades.",
          },
          {
            title: "Hoja de ruta de transformación",
            description:
              "Plan detallado con iniciativas priorizadas, hitos, recursos necesarios y métricas de éxito. Un roadmap realista que tu equipo directivo puede entender y aprobar.",
          },
          {
            title: "Gestión del cambio",
            description:
              "Estrategia de comunicación, capacitación y acompañamiento para asegurar que las personas adopten las nuevas herramientas y procesos. El cambio organizacional es tan importante como el técnico.",
          },
          {
            title: "Métrica y medición de impacto",
            description:
              "Definición de KPIs para cada iniciativa y medición periódica del avance. Reportes ejecutivos que muestran el progreso y el impacto en resultados de negocio.",
          },
        ],
        process: [
          {
            step: 1,
            title: "Diagnóstico",
            description:
              "Evaluamos tu nivel de madurez digital actual mediante entrevistas, encuestas y análisis de datos. Identificamos las áreas con mayor potencial de mejora.",
          },
          {
            step: 2,
            title: "Diseño de la hoja de ruta",
            description:
              "Priorizamos iniciativas por impacto de negocio y factibilidad técnica. Definimos cronograma, recursos y métricas de éxito para cada fase.",
          },
          {
            step: 3,
            title: "Ejecución y acompañamiento",
            description:
              "Implementamos las primeras iniciativas con tu equipo. Capacitamos, resolvemos obstáculos y medimos avances. Ajustamos el plan según los resultados.",
          },
          {
            step: 4,
            title: "Consolidación y escalamiento",
            description:
              "Una vez que las primeras iniciativas están funcionando, escalamos el modelo a otras áreas de la organización. Construimos capacidades internas para la transformación continua.",
          },
        ],
        cta: defaultCta("tu transformación digital"),
        seo: {
          metaTitle:
            "Transformación Digital Estratégica para Empresas | Star Grow Studio",
          metaDescription:
            "Acompañamiento en transformación digital con enfoque en personas, procesos y resultados. Diagnóstico, hoja de ruta y ejecución. Resultados visibles desde el primer trimestre.",
        },
        faq: [
          {
            question: "¿Cuánto tiempo toma una transformación digital?",
            answer:
              "La transformación digital es un proceso continuo, pero diseñamos la hoja de ruta para generar resultados visibles en los primeros 90 días. El proceso completo puede tomar de 12 a 24 meses dependiendo del tamaño y la complejidad de la organización.",
          },
          {
            question: "¿Qué pasa si mi equipo se resiste al cambio?",
            answer:
              "La resistencia al cambio es normal y esperada. Nuestra metodología incluye estrategias de gestión del cambio: comunicación, capacitación, involucramiento temprano y celebración de victorias tempranas. Trabajamos con la resistencia, no contra ella.",
          },
        ],
      },
      {
        slug: "automatizacion",
        service: "Automatización",
        iconName: "Workflow",
        shortDescription:
          "Identificamos y automatizamos procesos repetitivos para liberar el talento de tu equipo y reducir costos operativos.",
        heroHeading: "Menos trabajo manual, más valor estratégico",
        heroSubheading:
          "Tu equipo talentoso pasa horas en tareas que una máquina podría hacer en segundos. Identificamos qué automatizar y liberamos tiempo para lo que realmente importa: hacer crecer tu negocio.",
        fullDescription: [
          "En toda empresa hay procesos repetitivos que consumen tiempo y recursos valiosos. Tareas que alguien tiene que hacer a diario: generar reportes, consolidar información, enviar correos, actualizar registros. Actividades necesarias pero que no agregan valor estratégico.",
          "Nuestro servicio de automatización identifica estos procesos, diseña flujos automatizados y los implementa con las herramientas adecuadas. No se trata de reemplazar personas, sino de liberar su talento para que se concentren en actividades que realmente requieren su criterio, creatividad y experiencia.",
          "Automatizamos desde tareas simples como la generación automática de reportes hasta flujos complejos que involucran múltiples sistemas: facturación, CRM, email marketing, aprobaciones, notificaciones. Cada automatización se diseña para ser confiable, auditable y fácil de mantener.",
        ],
        benefits: [
          {
            title: "Ahorro de tiempo significativo",
            description:
              "Las tareas que antes tomaban horas ahora se ejecutan en minutos o segundos. Tu equipo recupera tiempo valioso para concentrarse en actividades de alto impacto.",
            iconName: "Clock",
          },
          {
            title: "Reducción de errores humanos",
            description:
              "Los procesos automatizados son consistentes y precisos. Se ejecutan siempre de la misma forma, sin errores por cansancio, distracción o falta de estandarización.",
            iconName: "ShieldCheck",
          },
          {
            title: "Escalabilidad sin aumentar carga",
            description:
              "Cuando tu negocio crece, los procesos automatizados crecen contigo sin necesidad de contratar más personas para tareas repetitivas. La eficiencia escala.",
            iconName: "TrendingUp",
          },
          {
            title: "Traza y auditoría completa",
            description:
              "Cada acción automatizada queda registrada. Sabes qué se ejecutó, cuándo y con qué resultado. Ideal para cumplimiento normativo y auditorías internas.",
            iconName: "Search",
          },
        ],
        features: [
          {
            title: "Automatización de flujos de trabajo",
            description:
              "Diseñamos e implementamos flujos automatizados que conectan personas, sistemas y datos. Aprobaciones, notificaciones, asignaciones y escalamientos sin intervención manual.",
          },
          {
            title: "Integración entre sistemas",
            description:
              "Conectamos tus herramientas actuales para que intercambien información automáticamente. CRM, ERP, email, facturación, bancos. Todo comunicado sin intervención manual.",
          },
          {
            title: "Automatización de reportes",
            description:
              "Reportes que se generan y distribuyen automáticamente en la frecuencia que necesites: diario, semanal, mensual. Sin que nadie tenga que dedicar tiempo a consolidar información.",
          },
          {
            title: "Bots y scripts a medida",
            description:
              "Automatización de tareas específicas con scripts y bots diseñados para tu operación. Desde procesamiento de archivos hasta extracción y transformación de datos.",
          },
          {
            title: "Monitoreo y alertas automatizadas",
            description:
              "Sistemas que monitorean tu operación y envían alertas cuando algo requiere atención. Sin necesidad de que alguien esté revisando constantemente.",
          },
        ],
        process: [
          {
            step: 1,
            title: "Mapeo de procesos",
            description:
              "Identificamos los procesos repetitivos que consumen más tiempo, los que son propensos a errores y los que tienen mayor retorno potencial de automatización.",
          },
          {
            step: 2,
            title: "Diseño de la solución",
            description:
              "Diseñamos el flujo automatizado, seleccionamos las herramientas adecuadas y definimos las reglas de negocio. Nos aseguramos de que la solución sea robusta y mantenible.",
          },
          {
            step: 3,
            title: "Implementación y pruebas",
            description:
              "Construimos la automatización y la probamos exhaustivamente. Verificamos que maneje correctamente todos los casos: normales, excepcionales y de error.",
          },
          {
            step: 4,
            title: "Puesta en marcha y monitoreo",
            description:
              "Ponemos la automatización en producción y monitoreamos su funcionamiento durante las primeras semanas. Ajustamos según sea necesario y documentamos el proceso.",
          },
        ],
        cta: defaultCta("tu automatización"),
        seo: {
          metaTitle:
            "Automatización de Procesos Empresariales | Star Grow Studio",
          metaDescription:
            "Identificamos y automatizamos procesos repetitivos para liberar el talento de tu equipo. Flujos, integraciones, reportes y bots a medida. Reduce costos y errores operativos.",
        },
        faq: [
          {
            question: "¿Qué tipo de procesos se pueden automatizar?",
            answer:
              "Cualquier proceso repetitivo, basado en reglas y que no requiera juicio humano complejo. Ejemplos comunes: generación de reportes, envío de facturas, consolidación de datos, aprobaciones, notificaciones, actualización de registros.",
          },
          {
            question: "¿Se pueden automatizar procesos que usan herramientas que ya tengo?",
            answer:
              "Sí. Trabajamos con las herramientas que ya usas: Excel, Google Sheets, CRM, ERP, correo electrónico, sistemas contables. No necesitas cambiar tus herramientas para automatizar procesos.",
          },
        ],
      },
      {
        slug: "arquitectura-de-software",
        service: "Arquitectura de Software",
        iconName: "Network",
        shortDescription:
          "Diseñamos y auditamos la arquitectura técnica de tus sistemas para garantizar escalabilidad, mantenibilidad y rendimiento.",
        heroHeading: "Bases técnicas sólidas para productos que escalan",
        heroSubheading:
          "Una arquitectura bien diseñada es la diferencia entre un producto que evoluciona con tu negocio y uno que se convierte en un obstáculo. Diseñamos sistemas que crecen contigo.",
        fullDescription: [
          "La arquitectura de software es la base sobre la que se construye todo producto digital. Una buena arquitectura permite agregar funcionalidades rápidamente, escalar sin reescribir, mantener el código con costos predecibles y responder a cambios del mercado sin fricción. Una mala arquitectura hace todo lo contrario: frena el desarrollo, aumenta costos y genera riesgos.",
          "En Star Grow Studio ofrecemos servicios de arquitectura de software: diseño de arquitecturas para nuevos productos, revisión y mejora de sistemas existentes, y acompañamiento técnico para equipos de desarrollo.",
          "Nuestro enfoque es práctico y pragmático. No imponemos patrones o tecnologías por moda. Diseñamos arquitecturas que resuelven problemas reales, que tu equipo puede entender y mantener, y que están alineadas con tus objetivos de negocio y tus restricciones presupuestarias.",
        ],
        benefits: [
          {
            title: "Escalabilidad sin reescrituras",
            description:
              "Una arquitectura bien diseñada crece contigo. Cuando tu producto tenga éxito, podrás escalar sin tener que reescribir todo desde cero. Ahorras años de trabajo y millones en costos.",
            iconName: "TrendingUp",
          },
          {
            title: "Menor costo de mantenimiento",
            description:
              "El código bien estructurado es más fácil de entender, modificar y extender. Tu equipo (o el nuestro) puede hacer cambios más rápido y con menos bugs. El costo de mantenimiento se reduce drásticamente.",
            iconName: "DollarSign",
          },
          {
            title: "Rendimiento predecible",
            description:
              "Diseñamos sistemas con rendimiento predecible bajo carga. Sin sorpresas cuando lleguen las horas pico. Sin caídas en momentos críticos.",
            iconName: "Gauge",
          },
          {
            title: "Seguridad desde los cimientos",
            description:
              "La seguridad no es una capa que se agrega al final. Se integra en la arquitectura desde el diseño: autenticación, autorización, cifrado, auditoría. Sistemas seguros por diseño.",
            iconName: "ShieldCheck",
          },
          {
            title: "Deuda técnica controlada",
            description:
              "Identificamos y medimos la deuda técnica existente, y diseñamos planes para reducirla de forma progresiva. La deuda técnica no desaparece sola, pero se puede gestionar.",
            iconName: "Wrench",
          },
        ],
        features: [
          {
            title: "Diseño de arquitectura para nuevos proyectos",
            description:
              "Definimos la arquitectura completa para tu nuevo producto: patrones, tecnologías, estructura de módulos, base de datos, APIs, despliegue. Una base sólida desde el día uno.",
          },
          {
            title: "Auditoría de arquitectura existente",
            description:
              "Revisamos tus sistemas actuales para identificar problemas de escalabilidad, mantenibilidad, rendimiento y seguridad. Diagnóstico detallado con recomendaciones priorizadas.",
          },
          {
            title: "Modernización y migración",
            description:
              "Estrategias para migrar sistemas legacy a arquitecturas modernas sin interrumpir la operación. Progresivo, seguro y con resultados visibles en cada etapa.",
          },
          {
            title: "Acompañamiento técnico para equipos",
            description:
              "Apoyo continuo a tu equipo de desarrollo: code reviews, definición de estándares, resolución de bloqueos técnicos, mentoring. Tu equipo mejora mientras construye.",
          },
          {
            title: "Arquitectura para la nube",
            description:
              "Diseño de arquitecturas cloud-native optimizadas para AWS, GCP o Azure. Escalabilidad automática, alta disponibilidad, disaster recovery y optimización de costos.",
          },
        ],
        process: [
          {
            step: 1,
            title: "Entendimiento del contexto",
            description:
              "Analizamos tu producto, tu equipo, tus objetivos de negocio y tus restricciones. Entendemos qué estás construyendo, para quién y con qué recursos.",
          },
          {
            step: 2,
            title: "Evaluación o diseño",
            description:
              "Para proyectos existentes: auditoría completa de la arquitectura actual. Para nuevos proyectos: diseño de la arquitectura objetivo con justificación de cada decisión.",
          },
          {
            step: 3,
            title: "Documentación y socialización",
            description:
              "Documentamos la arquitectura de forma clara y accesible: diagramas, decisiones registradas (ADRs), guías para el equipo. La arquitectura no es un misterio, es conocimiento compartido.",
          },
          {
            step: 4,
            title: "Acompañamiento en implementación",
            description:
              "Acompañamos a tu equipo durante la implementación para asegurar que la arquitectura se sigue fielmente. Resolvemos dudas, hacemos code reviews y ajustamos según sea necesario.",
          },
        ],
        cta: defaultCta("tu arquitectura"),
        seo: {
          metaTitle:
            "Arquitectura de Software Profesional | Diseño y Auditoría | Star Grow Studio",
          metaDescription:
            "Diseño de arquitecturas escalables, auditoría de sistemas existentes y acompañamiento técnico. Arquitecturas que evolucionan con tu negocio sin reescrituras costosas.",
        },
        faq: [
          {
            question: "¿Cuándo debería contratar una auditoría de arquitectura?",
            answer:
              "Cuando tu equipo tarda más en desarrollar, cuando el sistema se cae en horas pico, cuando agregar una funcionalidad simple requiere cambios en muchas partes, o cuando estás por embarcarte en un proyecto grande y quieres asegurar una base sólida.",
          },
          {
            question: "¿Qué entregables incluye una consultoría de arquitectura?",
            answer:
              "Diagramas de arquitectura, registro de decisiones (ADRs), documento de arquitectura, recomendaciones priorizadas y, si aplica, plan de migración. Todo documentado para que tu equipo pueda mantenerlo y evolucionarlo.",
          },
        ],
      },
    ],
  },
];

/* ───────────────────────── Construcción de documentos ───────────────────────── */

const parentId = (slug: string) => `service.${slug}`;
const childId = (parentSlug: string, slug: string) => `service.${parentSlug}.${slug}`;

async function buildDoc(
  s: SeedService,
  order: number,
  ids: { _id: string; parentRef?: string }
) {
  const [mainImage, techs] = await Promise.all([uploadImage(s.mainImage), techArray(s.techs)]);

  return {
    _id: ids._id,
    _type: "service",
    service: s.service,
    slug: { _type: "slug", current: s.slug },
    ...(ids.parentRef ? { parent: { _type: "reference", _ref: ids.parentRef } } : {}),
    order,
    featured: order === 0 && !ids.parentRef,
    iconName: s.iconName,
    shortDescription: s.shortDescription,
    fullDescription: portableText(s.fullDescription),
    ...(mainImage ? { mainImage } : {}),
    hero: {
      heading: s.heroHeading ?? "",
      subheading: s.heroSubheading ?? "",
    },
    benefits: s.benefits.map((b, i) => ({ _type: "object", _key: `ben-${i}`, ...b })),
    features: s.features.map((f, i) => ({ _type: "object", _key: `fea-${i}`, ...f })),
    process: s.process.map((p, i) => ({ _type: "object", _key: `pro-${i}`, ...p })),
    cta: s.cta,
    seo: { ...s.seo },
    ...(s.faq?.length
      ? { faq: s.faq.map((f, i) => ({ _type: "object", _key: `faq-${i}`, ...f })) }
      : {}),
    ...(techs.length ? { techs } : {}),
  };
}

async function run() {
  const seededIds = new Set<string>();

  // 1) Padres primero.
  console.log("→ Creando servicios padre...\n");
  for (const [i, parent] of SEED.entries()) {
    const _id = parentId(parent.slug);
    seededIds.add(_id);
    const doc = await buildDoc(parent, i, { _id });
    await client.createOrReplace(doc);
    console.log(`✓ ${parent.service} (${_id})`);
  }

  // 2) Hijos después (ya existe la referencia al padre).
  console.log("\n→ Creando microservicios (hijos)...\n");
  for (const parent of SEED) {
    for (const [i, child] of (parent.children ?? []).entries()) {
      const _id = childId(parent.slug, child.slug);
      seededIds.add(_id);
      const doc = await buildDoc(child, i, { _id, parentRef: parentId(parent.slug) });
      await client.createOrReplace(doc);
      console.log(`  ✓ ${parent.service} › ${child.service} (${_id})`);
    }
  }

  // 3) Limpieza de documentos de la migración anterior (patrón `service-*`).
  if (process.env.KEEP_ORPHANS !== "1") {
    const orphans = await client.fetch<string[]>(
      `*[_type == "service" && _id match "service-*" && !(_id in $ids)]._id`,
      { ids: [...seededIds] }
    );
    if (orphans.length) {
      console.log(`\n→ Eliminando ${orphans.length} documento(s) antiguo(s) (service-*)...`);
      const tx = orphans.reduce((t, id) => t.delete(id), client.transaction());
      await tx.commit();
      orphans.forEach((id) => console.log(`  ✗ eliminado: ${id}`));
    }
  }

  console.log("\nMigración completada ✅");
}

run().catch((err) => {
  console.error("Error en la migración:", err);
  process.exit(1);
});