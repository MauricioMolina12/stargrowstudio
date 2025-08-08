'use client'
import Image from "next/image";


// Components
import Banner from "./components/shared/Banner";
import OurServices from "./components/OurServices";
import AboutUs from "./components/shared/AboutUs/index"
import Plans from "./components/shared/Plans";
import MeetingModal from "./components/shared/MeetingModal";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import InternetStatus from "./components/layout/InternetStatus";
import ModalMessage from "./components/shared/modalMessage";
import Grid from "./components/shared/Grid"; 

// Interfaces 
import { Services } from "./types/Services";
import { Plan } from "./types/plans";

// Hooks
import { useComponentMeeting } from "./hooks/useComponentMeeting";
import { useIntersectionObserver } from "@/app/hooks/useIntersectionObserver";
import { useMeeting } from "./context/MeetingContext";
import { useEffect, useState } from "react";
import TabsNav from "./components/shared/TabsNav";
import InfoCards from "./components/shared/InfoCards";

const banners: Services[] = [
  {
    image: "img/software.png",
    alt: "Desarrollador",
    service: "Desarrollo de software a medida",
    icon: "/icons/computer.png",
    title: {
      main: "Transforma tu idea en software real.",
      second: "Creamos soluciones que hacen la diferencia.",
    },
    subtitle: "Desarrollamos tecnología con propósito, visión y estrategia.",
  },
  {
    image: "img/powerbi.png",
    alt: "Analista de datos",
    service: "Análisis de datos y visualización",
    icon: "/icons/analisis.png",
    title: {
      main: "Convierte tus datos en decisiones inteligentes.",
      second: "Te ayudamos a entender lo que importa.",
    },
    subtitle:
      "Diseñamos dashboards y reportes personalizados para impulsar tu crecimiento.",
  },
  {
    image: "img/bases-de-datos.webp",
    alt: "Bases de datos",
    service: "Arquitectura y gestión de bases de datos",
    icon: "/icons/basesdedatos.png",
    title: {
      main: "Tu información siempre segura y accesible.",
      second: "Optimizamos el corazón de tu sistema.",
    },
    subtitle:
      "Diseñamos estructuras de datos eficientes, escalables y preparadas para el futuro.",
  },
  {
    image: "img/consultoria.webp",
    alt: "Consultoría",
    service: "Consultoría en transformación digital",
    icon: "/icons/consultoria.png",
    title: {
      main: "¿No sabes por dónde empezar?",
      second: "Te guiamos paso a paso.",
    },
    subtitle:
      "Analizamos, proponemos y ejecutamos estrategias tecnológicas adaptadas a tus objetivos.",
  },
  {
    image: "img/design.webp",
    alt: "Diseño",
    service: "Diseño UX/UI centrado en el usuario",
    icon: "/icons/diseño.png",
    title: {
      main: "Haz que tu producto enamore a primera vista.",
      second: "Diseñamos experiencias memorables.",
    },
    subtitle:
      "Combinamos estética y funcionalidad para conectar con tu audiencia desde el primer clic.",
  },
];

const steps = [
  {
    icon: "icons/search.gif",
    title: "Descubrimiento",
    description:
      "Analizamos tus necesidades, objetivos y público. Esta etapa es clave para entender tu marca y definir el rumbo correcto.",
  },
  {
    icon: "icons/calendar.gif",
    title: "Estrategia y Planificación",
    description:
      "Definimos objetivos claros y un plan estratégico para guiar tu proyecto con éxito.",
  },
  {
    icon: "icons/draw.gif",
    title: "Diseño Creativo",
    description:
      "Nuestro equipo diseña piezas visuales impactantes: desde tu logotipo hasta contenido para redes.",
  },
  {
    icon: "icons/laptop-settings.gif",
    title: "Desarrollo & Producción",
    description:
      "Construimos tu sitio web, e-commerce o app, y creamos contenido audiovisual de alta calidad.",
  },
  {
    icon: "icons/rocket.gif",
    title: "Lanzamiento y Activación",
    description:
      "Ponemos en marcha tu proyecto en redes, campañas publicitarias, mailing, SEO y más.",
  },
  {
    icon: "icons/chart-rounded.gif",
    title: "Medición y Optimización",
    description:
      "Monitorizamos resultados y ajustamos estrategias para lograr impacto y crecimiento constante.",
  },
]

const services = [
  {
    icon: "icons/code.gif",
    title: "Desarrollo de software a medida",
    slug: "desarrollo-software",
    description: "Creamos aplicaciones web adaptadas a tus necesidades y objetivos.",
  },
  {
    icon: "icons/mobile2.gif",
    title: "Desarrollo de apps móviles",
    slug: "desarrollo-apps",
    description: "Creamos aplicaciones móviles adaptadas a tus necesidades y objetivos.",
  },
  {
    icon: "icons/chart.gif",
    title: "Análisis de datos y visualización",
    slug: "analisis-datos",
    description: "Convierte tus datos en decisiones inteligentes con dashboards personalizados.",
  },
  {
    icon: "icons/bdd.gif",
    title: "Arquitectura y gestión de bases de datos",
    slug: "bases-datos",
    description: "Optimizamos la estructura de datos para asegurar rendimiento y escalabilidad.",
  },
  {
    icon: "icons/megaphone.gif",
    title: "Consultoría en transformación digital",
    slug: "consultoria-transformacion",
    description: "Te guiamos paso a paso hacia una transformación tecnológica estratégica.",
  },
  {
    icon: "icons/design.gif",
    title: "Diseño UX/UI centrado en el usuario",
    slug: "diseno-ux-ui",
    description: "Creamos experiencias digitales memorables que conectan con tu audiencia.",
  },
];


// Tabs for Plans
const plans: Plan[] = [
  {
      category: "development",
      name: "Plan Web Express",
      tier: "Básico",
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
          excluded: [
              "Diseño UI/UX a medida o identidad de marca.",
              "Creación de contenido (textos, imágenes, videos).",
              "Funcionalidades de e-commerce o gestión de usuarios.",
              "Mantenimiento y actualizaciones continuas.",
          ],
      },
  },
  {
      category: "development",
      name: "Plan Web Pro",
      tier: "Popular",
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
          excluded: [
              "E-commerce completo o gestión de usuarios.",
              "Creación de contenido multimedia profesional.",
              "Mantenimiento anual incluido.",
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
          excluded: [],
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
          excluded: [
              "Manual de marca completo.",
              "Diseño de piezas para redes sociales.",
              "Identidad visual avanzada o storytelling visual.",
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
          excluded: [
              "Plantillas corporativas (pitch, presentaciones, etc).",
              "Animaciones de logo o brand book interactivo.",
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
          excluded: ["Plan de acción detallado.", "Seguimiento posterior."],
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
          excluded: [
              "Implementación de herramientas.",
              "Consultoría legal o financiera.",
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
          excluded: ["Manejo mensual de redes.", "Análisis y reportes de campaña."],
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
          excluded: [
              "Creación de contenido audiovisual profesional.",
              "Email marketing o CRM.",
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

export default function Home() {

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
      <main>
        <section id="inicio">
          <Banner
            banners={banners}
            defaultCallActions={[
              { label: "Contactar", actionKey: "contactar" },
              { label: "Más info", actionKey: "info" },
            ]}
            isDynamic
          />
        </section>
        <section id="servicios">
          {/* <OurServices></OurServices> */}
          <Grid subtitle="Nuestros Servicios" title={{ main: 'estrella', left: 'Impulsa tu negocio con nuestros servicios', right: '✨' }} showMeetingCall={false}>
            <InfoCards cards={services} showSteps={false} />
          </Grid>
        </section>
        <section id="nosotros">
          <AboutUs />
        </section>
        <section id="progreso">
          <Grid  subtitle="Como conectamos" title={{ main: 'camino', left: 'Nuestro', right: 'hacia proyectos que brillan 🛣️✨' }}>
            <InfoCards cards={steps} />
          </Grid>
        </section>
        <section id="planes">
           <main className="w-full min-h-[100vh] py-12 px-4 lg:w-4/5 lg:mx-auto lg:my-0">
              <header className="w-full flex flex-col items-center justify-center">
                  <span className="parallax text-[var(--color-primary-to-white)]">Planes a tu medida</span>
                  <h1 className="parallax text-3xl text-center font-bold lg:w-[70%] lg:text-4xl"><span className="text-[var(--color-primary-to-white)]">Diseñamos el éxito juntos:</span> Explora nuestras soluciones flexibles 📈</h1>
              </header>
              
              <TabsNav tabs={planTabs} tabActive={planTabActive} setTabActive={setTabActive} />
              
              <section className="w-full overflow-x-auto lg:overflow-y-hidden py-8">
                  <div className="flex justify-start gap-4 px-4 min-w-full snap-x snap-mandatory scroll-smooth">                      
                    <Plans plansView={plansView} />
                  </div>
              </section>
          </main>
        </section>
        <section id="portafolio">
          <Portfolio />
        </section>
        <section id="contacto" className="bg-[#5656b5] bg-ribbon">
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
