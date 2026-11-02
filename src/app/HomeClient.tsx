'use client'
// Icons
import {
  Search,
  Calendar,
  PenTool,
  Laptop,
  Rocket,
  BarChart3,
  Code,
  Smartphone,
  PieChart,
  Database,
  Megaphone,
  Palette,
} from "lucide-react";

// Components
import AboutUs from "./components/shared/AboutUs/index"
import Plans from "./components/shared/Plans";
import MeetingModal from "./components/shared/MeetingModal";
import Contact from "./components/Contact";
import ModalMessage from "./components/shared/modalMessage";
import Grid from "./components/shared/Grid";
import TrustSection from "./components/shared/TrustSection";
import ComparisonSection from "./components/shared/ComparisonSection";
import OurHistory from "./components/shared/OurHistory";

// Interfaces
import { Plan } from "./types/plans";

// Hooks
import { useIntersectionObserver } from "@/app/hooks/useIntersectionObserver";
import { useMeeting } from "./context/MeetingContext";
import { useEffect, useState } from "react";
import TabsNav from "./components/shared/TabsNav";
import InfoCards from "./components/shared/InfoCards";
import DetailsPanel from "./components/shared/DetailsPanel";
import ModernAppsSection from "./components/shared/ModernAppsSection";

const steps = [
  {
    icon: { component: Search, color: "text-blue-500" },
    title: "Descubrimiento",
    description:
      "Analizamos a fondo tus necesidades, objetivos y el perfil de tu público. En esta etapa recopilamos información clave que nos permitirá comprender el contexto de tu negocio y definir las oportunidades de crecimiento.",
  },
  {
    icon: { component: Calendar, color: "text-green-500" },
    title: "Estrategia y Planificación",
    description:
      "Definimos metas claras y construimos un plan estratégico a la medida de tu proyecto. Establecemos prioridades, recursos y tiempos para asegurar que cada acción esté orientada a alcanzar los resultados esperados.",
  },
  {
    icon: { component: PenTool, color: "text-purple-500" },
    title: "Diseño Creativo",
    description:
      "Creamos piezas visuales atractivas y coherentes con tu identidad de marca. Nuestro equipo se enfoca en transmitir tus valores de manera impactante y generar experiencias memorables para tus usuarios.",
  },
  {
    icon: { component: Laptop, color: "text-orange-500" },
    title: "Desarrollo & Producción",
    description:
      "Transformamos las ideas en soluciones digitales funcionales. Ya sea un sitio web, un e-commerce o una aplicación, implementamos tecnologías modernas con un enfoque en calidad, usabilidad y escalabilidad.",
  },
  {
    icon: { component: Rocket, color: "text-pink-500" },
    title: "Lanzamiento y Activación",
    description:
      "Publicamos tu proyecto en los canales adecuados y activamos campañas para alcanzar a tu audiencia. Nos aseguramos de que la implementación sea fluida y que el impacto inicial sea fuerte y positivo.",
  },
  {
    icon: { component: BarChart3, color: "text-indigo-500" },
    title: "Medición y Optimización",
    description:
      "Evaluamos el rendimiento a través de métricas clave y analizamos los resultados obtenidos. Con base en los datos, realizamos ajustes estratégicos para optimizar el impacto y potenciar el crecimiento continuo.",
  },
];


const services = [
  {
    icon: { component: Code, color: "text-cyan-500" },
    title: "Desarrollo de software a medida",
    slug: "desarrollo-software",
    description:
      "Diseñamos y desarrollamos aplicaciones web adaptadas a las necesidades de tu negocio, con tecnologías modernas, escalables y seguras.",
  },
  {
    icon: { component: Smartphone, color: "text-green-600" },
    title: "Desarrollo de apps móviles",
    slug: "desarrollo-apps",
    description:
      "Creamos aplicaciones móviles nativas e híbridas con un alto rendimiento y experiencia de usuario fluida, disponibles en iOS y Android.",
  },
  {
    icon: { component: PieChart, color: "text-yellow-500" },
    title: "Análisis de datos y visualización",
    slug: "analisis-datos",
    description:
      "Transformamos tus datos en información clara y accionable mediante dashboards interactivos, reportes inteligentes y visualizaciones atractivas.",
  },
  {
    icon: { component: Database, color: "text-blue-700" },
    title: "Arquitectura y gestión de bases de datos",
    slug: "bases-datos",
    description:
      "Diseñamos, optimizamos y administramos bases de datos eficientes y seguras, garantizando integridad, escalabilidad y alto rendimiento.",
  },
  {
    icon: { component: Megaphone, color: "text-red-500" },
    title: "Consultoría en transformación digital",
    slug: "consultoria-transformacion",
    description:
      "Acompañamos a tu empresa en la adopción de nuevas tecnologías y procesos digitales, maximizando la productividad y la innovación.",
  },
  {
    icon: { component: Palette, color: "text-purple-600" },
    title: "Diseño UX/UI centrado en el usuario",
    slug: "diseno-ux-ui",
    description:
      "Creamos interfaces modernas, accesibles y enfocadas en el usuario, generando experiencias digitales memorables y funcionales.",
  },
];


// Tabs for Plans
const plans: Plan[] = [
  {
    category: "development",
    name: "Plan Web Express",
    tier: "-78%",
    priceOld: "1.800.000",
    priceNew: "1.600.000",
    description:
      "Pequeños negocios, emprendedores, freelancers que necesitan una presencia online rápida y profesional.",
    features: {
      included: [
        "Diseño basado en plantilla responsiva.",
        "Hasta 5 secciones/páginas estáticas.",
        "Carga inicial de contenido proporcionado por el cliente.",
        "Formulario de contacto básico.",
        "Configuración de dominio y alojamiento (asesoramiento).",
        "Optimización SEO básica y velocidad de carga inicial.",
        "Una ronda de revisiones y garantía de 30 días post-lanzamiento.",
      ],
    },
  },
  {
    category: "development",
    name: "Plan Web Pro",
    tier: "-75%",
    priceOld: "3.200.000",
    priceNew: "2.700.000",
    description:
      "Empresas en crecimiento que buscan una web personalizada, optimizada y con funcionalidades avanzadas.",
    features: {
      included: [
        "Diseño UI/UX personalizado y adaptado a tu marca.",
        "Hasta 12 secciones/páginas dinámicas.",
        "Carga y optimización de contenido inicial.",
        "Formularios avanzados de contacto y cotización.",
        "Integración con redes sociales y Google Analytics.",
        "SEO avanzado y optimización de velocidad.",
        "2 rondas de revisiones y garantía de 60 días post-lanzamiento.",
        "Soporte técnico prioritario durante 2 meses.",
      ],
    },
  },
  {
    category: "development",
    name: "Plan Web Elite",
    tier: "Premium",
    priceOld: "6.000.000",
    priceNew: "4.800.000",
    description:
      "Grandes empresas o proyectos que requieren soluciones a medida, integración de sistemas y soporte continuo.",
    features: {
      included: [
        "Diseño UI/UX exclusivo y branding completo.",
        "Sitio web ilimitado en secciones y funcionalidades.",
        "Desarrollo de módulos personalizados (e-commerce, membresías, etc.).",
        "Integración con APIs y sistemas externos.",
        "Creación de contenido profesional (textos, imágenes, videos).",
        "SEO profesional y campañas de marketing digital iniciales.",
        "Soporte y mantenimiento durante 1 año.",
        "Capacitación personalizada para tu equipo.",
        "Actualizaciones y mejoras continuas.",
        "Consultoría estratégica mensual.",
        "Dominio y hosting premium incluidos el primer año.",
      ],
    },
  },

  // DISEÑO
  {
    category: "design",
    name: "Branding Express",
    tier: "Básico",
    priceNew: "900.000",
    description:
      "Identidad visual básica para emprendimientos y marcas personales.",
    features: {
      included: [
        "Logo básico (una versión).",
        "Paleta de colores y tipografía recomendada.",
        "Entrega en formato digital listo para uso.",
      ],
    },
  },
  {
    category: "design",
    name: "Branding Pro",
    tier: "Popular",
    priceNew: "1.800.000",
    description:
      "Branding profesional con entregables completos para negocios en crecimiento.",
    features: {
      included: [
        "Diseño de logo profesional con variantes.",
        "Manual de marca completo.",
        "Tipografías, iconografía, patrones gráficos.",
        "Diseño de tarjetas de presentación.",
        "Diseño de piezas para redes sociales.",
      ],
    },
  },
  {
    category: "design",
    name: "Branding Elite",
    tier: "Premium",
    priceNew: "3.200.000",
    description: "Diseño de marca completo + material de marketing visual.",
    features: {
      included: [
        "Todo lo del plan Pro.",
        "Kit de marca digital e impreso.",
        "Presentación corporativa editable.",
        "Plantillas para pitch y redes sociales.",
        "Storytelling visual y consultoría creativa.",
      ],
      excluded: [],
    },
  },

  // CONSULTORÍA
  {
    category: "consulting",
    name: "Consultoría Inicial",
    tier: "Básico",
    priceNew: "1.200.000",
    description: "Diagnóstico digital y recomendaciones puntuales.",
    features: {
      included: [
        "Análisis de presencia digital.",
        "Benchmark con competidores.",
        "Informe de recomendaciones.",
      ],
    },
  },
  {
    category: "consulting",
    name: "Consultoría Estratégica",
    tier: "Popular",
    priceNew: "2.400.000",
    description: "Auditoría digital + roadmap estratégico.",
    features: {
      included: [
        "Todo lo del plan básico.",
        "Workshops de descubrimiento.",
        "Plan de acción a 3-6 meses.",
        "Reunión de seguimiento mensual.",
      ],
    },
  },
  {
    category: "consulting",
    name: "Consultoría Integral",
    tier: "Premium",
    priceNew: "4.800.000",
    description: "Acompañamiento 360º en procesos tecnológicos y digitales.",
    features: {
      included: [
        "Todo lo del plan estratégico.",
        "Acompañamiento continuo.",
        "Revisión y análisis de métricas.",
        "Consultoría especializada mensual.",
        "Soporte en implementación técnica.",
      ],
      excluded: [],
    },
  },

  // MARKETING
  {
    category: "marketing",
    name: "Marketing Starter",
    tier: "Básico",
    priceNew: "1.000.000",
    description: "Lanzamiento digital con campañas base.",
    features: {
      included: [
        "Configuración de redes y perfiles.",
        "1 campaña publicitaria (meta o Google).",
        "Diseño de 4 posts iniciales.",
      ],
    },
  },
  {
    category: "marketing",
    name: "Marketing Pro",
    tier: "Popular",
    priceNew: "2.200.000",
    description: "Gestión mensual de campañas y analítica.",
    features: {
      included: [
        "Todo lo del Starter.",
        "Gestión de redes sociales (hasta 2).",
        "Campañas mensuales (meta/Google).",
        "Informe mensual de resultados.",
        "Optimización de campañas y segmentación.",
      ],
    },
  },
  {
    category: "marketing",
    name: "Marketing 360",
    tier: "Premium",
    priceNew: "4.000.000",
    description: "Estrategia, contenido, pauta y reporting integral.",
    features: {
      included: [
        "Todo lo del Pro.",
        "Producción de contenido profesional (videos, fotos).",
        "Email marketing, newsletters y automatización.",
        "Consultoría y análisis mensual.",
        "Optimización multicanal.",
      ],
      excluded: [],
    },
  },
]

const planTabs: { label: string; key: string }[] = [
  {
    label: 'Desarrollo',
    key: 'development'
  },
  {
    label: 'Diseño',
    key: 'design'
  },
  {
    label: 'Consultoría',
    key: 'consulting'
  },
  {
    label: 'Marketing',
    key: 'marketing'
  }
]

export default function HomeClient({ banner, servicesSection, galleryWalk }: { banner: React.ReactNode; servicesSection: React.ReactNode; galleryWalk: React.ReactNode }) {

  // State for active tab and plans view
  const [planTabActive, setPlanTab] = useState('development');
  const [plansView, setPlansView] = useState<Plan[]>([]);

  useIntersectionObserver('.parallax', { threshold: 0.4 }, 'all');

  useEffect(() => {
    setTabActive('development');
  }, []);

  function setTabActive(tab: string) {
    const filtered = plans.filter((plan) => plan.category === tab);
    setPlansView(filtered);
    setPlanTab(tab);
  }

  // Modal Info
  const [modalInfo, setModalInfo] = useState<{ message: string; isSuccess: boolean } | null>(null);
  const { isVisible } = useMeeting();

  // const [isOnline, setIsOnline] = useState<boolean>(typeof window !== "undefined" ? navigator.onLine : true);

  // useEffect(() => {
  //   const handleOnline = () => setIsOnline(true);
  //   const handleOffline = () => setIsOnline(false);

  //   window.addEventListener("online", handleOnline);
  //   window.addEventListener("offline", handleOffline);

  //   return () => {
  //     window.removeEventListener("online", handleOnline);
  //     window.removeEventListener("offline", handleOffline);
  //   };
  // }, []);


  const handleContactFeedback = (message: string, isSuccess: boolean) => {
    setModalInfo({ message, isSuccess });
    setTimeout(() => setModalInfo(null), 4000);
  };

  return (
    <>
      <main className="flex flex-col gap-8 md:gap-12">
        <section id="inicio">
          {banner}
        </section>
        
        <section id="services">
          {servicesSection}
        </section>

        <section id="casos-de-exito">
          {galleryWalk}
        </section>

        <section id="why-star-grow-studio">
          <TrustSection />
        </section>

        <ComparisonSection />

        <section id="contacto">
          <Contact onFeedback={handleContactFeedback} />
        </section>

        {modalInfo && (
          <ModalMessage
            message={modalInfo.message}
            isSuccess={modalInfo.isSuccess}
          />
        )}

        {isVisible && <MeetingModal />}
      </main>
    </>
  );
}
