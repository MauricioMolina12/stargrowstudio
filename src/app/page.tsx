'use client'
import Image from "next/image";

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
  Check,
  CheckCheck,
} from "lucide-react";

// Data JSON
import banners from "@/app/data/JSON/banners.json";
import stepsData from "@/app/data/JSON/steps.json";
import servicesData from "@/app/data/JSON/services.json";
import plans from "@/app/data/JSON/plans.json";


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
import { Plan } from "./types/plans";


// Hooks
import { useComponentMeeting } from "./hooks/useComponentMeeting";
import { useIntersectionObserver } from "@/app/hooks/useIntersectionObserver";
import { useMeeting } from "./context/MeetingContext";
import { useEffect, useState } from "react";
import TabsNav from "./components/shared/TabsNav";
import InfoCards from "./components/shared/InfoCards";
import DetailsPanel from "./components/shared/DetailsPanel";
import ModernAppsSection from "./components/shared/ModernAppsSection";
import TitleBox from "./components/shared/TitleBox";
import ScrollStackSection from "./components/shared/ScrollStackSection";
import ContentCard from "./components/shared/ContentCard";
import ServiceCard from "./components/shared/ServiceCard";


// STEPS MAP DATA
const iconMap: Record<string, any> = {
  Search,
  Calendar,
  PenTool,
  Laptop,
  Rocket,
  BarChart3,
};

const steps = stepsData.map((step) => ({
  ...step,
  icon: { component: iconMap[step.icon], color: step.color },
}));


// SERVICES MAP DATA
const icons: Record<string, any> = {
  Code,
  Smartphone,
  PieChart,
  Database,
  Megaphone,
  Palette,
};

const services = servicesData.map(service => ({
  ...service,
  icon: { component: icons[service.icon], color: service.color }
}));




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


const projects = [
  {
    name: '🚀 Desarrollo web a medida',
    image: '/img/how-create-website.png',
    description: 'Creamos sitios y apps web potentes, rápidos y listos para escalar tu negocio.'
  },
  {
    name: '📱 Apps móviles modernas',
    image: '/img/how-create-website.png',
    description: 'Diseñamos experiencias nativas e híbridas que conectan con tus usuarios.'
  },
];

export default function Home() {


  // State for active tab and plans view
  const [planTabActive, setPlanTab] = useState('development');
  const [plansView, setPlansView] = useState<Plan[]>([]);
  const [order, setOrder] = useState([0, 1, 2, 3]);


  useIntersectionObserver('.parallax', { threshold: 0.4 }, 'all');

  useEffect(() => {
    setTabActive('development');
  }, []);

  function setTabActive(tab: string) {
    const filtered = plans.filter((plan) => plan.category === tab);
    setPlansView(filtered);
    setPlanTab(tab);
  }

  const [modalInfo, setModalInfo] = useState<{ message: string; isSuccess: boolean } | null>(null);
  const { isVisible } = useMeeting();


  const handleContactFeedback = (message: string, isSuccess: boolean) => {
    setModalInfo({ message, isSuccess });
    setTimeout(() => setModalInfo(null), 4000);
  };
  const handleClick = (clickedIndex?: number) => {
    setOrder((prev) => {
      if (typeof clickedIndex === "number") {
        const newOrder = [...prev];
        const [clicked] = newOrder.splice(clickedIndex, 1);
        newOrder.push(clicked);
        return newOrder;
      }
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };


  const positions = [
    { top: "0px", left: "0px" },
    { top: "-10px", left: "10px" },
    { top: "-40px", left: "20px" },
    { top: "-80px", left: "30px" },
  ];

  return (
    <>
      <main className="flex flex-col">
        <section id="inicio">
          <Banner
            fallbackBanner={banners[0]}
            defaultCallActions={[
              { label: "Contactar", actionKey: "contactar" },
              { label: "Más info", actionKey: "info" },
            ]}
          />
        </section>






        <section id="cards" className="bg-[var(--meteorite--50)] p-8 flex flex-col gap-2">
          <TitleBox title={{ left: 'Haz que tu marca hable por ti', main: '', right: '' }} tag="Creatividad" description="''" ></TitleBox>
          <div className="cards__content flex flex-col lg:flex-row items-center justify-between p-4 gap-6">
            <ServiceCard
              tag={{ label: 'Producto digital', color: 'var(--color-dark)', fontSize: 'text-[.8rem]' }}
              title={{ label: 'Crea experiencias digitales que enamoran', color: 'var(--color-dark)', fontSize: 'text-4xl' }}
              description={{ label: 'Diseñamos interfaces intuitivas y funcionales que hacen que tus usuarios disfruten cada interacción con tu producto.', color: 'var(--color-dark)', fontSize: 'text-[clamp(12px, 1vw, 14px)]' }}
            >
              <ul className="flex flex-col p-6 gap-2 text-[.8rem]">
                <li className="flex gap-2">
                  <Check className="text-[var(--color-primary-to-white)]"></Check>
                  <span>Investigación y arquitectura de información</span>
                </li>
                <li className="flex gap-2">
                  <Check className="text-[var(--color-primary-to-white)]"></Check>
                  <span>Diseño centrado en el usuario (UX/UI)</span>
                </li>

                <li className="flex gap-2">
                  <Check className="text-[var(--color-primary-to-white)]"></Check>
                  <span>Prototipado y pruebas de usabilidad</span>
                </li>
              </ul>

              <figure className="w-full">
                <img src="/img/hero-banner/Figma-cap.png" alt="figma view" className="object-cover w-full h-full" />

              </figure>

            </ServiceCard>
            <ServiceCard
              tag={{ label: 'Identidad visual', color: 'var(--color-dark)', fontSize: 'text-[.8rem]' }}
              title={{ label: 'Construye una marca que deje huella', color: 'var(--color-white)', fontSize: 'text-4xl' }}
              description={{ label: 'Desde el logotipo hasta los colores y la tipografía, damos vida a una identidad visual coherente que refleje la esencia de tu marca.', color: 'var(--color-white)', fontSize: 'text-[clamp(12px, 1vw, 14px)]' }}
              bgCard="var(--color-primary-to-white)"
            >
              <ul className="flex flex-col p-6 gap-2  text-[.8rem]">
                <li className="flex gap-2">
                  <Check className="text-[var(--color-white)]"></Check>
                  <span className="text-white">Creación de logotipo y sistema visual</span>
                </li>
                <li className="flex gap-2">
                  <Check className="text-[var(--color-white)]"></Check>
                  <span className="text-white">Manual de marca y paleta cromática</span>
                </li>

                <li className="flex gap-2">
                  <Check className="text-[var(--color-white)]"></Check>
                  <span className="text-white">Diseño para redes, web y presentaciones</span>
                </li>
              </ul>

              <figure className="w-full">
                <img src="/img/hero-banner/Ilustrator-cap.png" alt="ilustrator view" className="object-cover w-full h-full" />

              </figure>

            </ServiceCard>
          </div>
        </section>



        <section id="servicios">
          <Grid subtitle="Nuestros Servicios" title={{ main: 'estrella', left: 'Impulsa tu negocio con nuestros servicios', right: '' }} showMeetingCall={false}>
            <InfoCards cards={services} showSteps={false} />
          </Grid>
        </section>
        <section id="nosotros">
          <AboutUs />
        </section>
        <section id="progreso">
          <Grid subtitle="Como conectamos" title={{ main: 'camino', left: 'Nuestro', right: 'hacia proyectos que brillan' }}>
            <InfoCards cards={steps} />
          </Grid>
        </section>
        <section id="planes">
          <main className="w-full min-h-[100vh] py-12 px-4 lg:w-4/5 lg:mx-auto lg:my-0">
            <TitleBox title={{ left: 'Diseñamos el éxito juntos:', main: 'Explora nuestras soluciones flexibles', right: '' }} tag="Planes a tu medida" description="''" ></TitleBox>

            <TabsNav tabs={planTabs} tabActive={planTabActive} setTabActive={setTabActive} />

            <section className="w-full overflow-x-auto lg:overflow-y-hidden">
              <div className="flex justify-start gap-4 px-4 min-w-full snap-x snap-mandatory scroll-smooth 2xl:justify-center 2xl:gap-10">
                <Plans plansView={plansView} />
              </div>
            </section>
          </main>
        </section>

        <section id="support" className="flex mx-auto my-0 items-center justify-center bg-[var(--light-blue--200)]">
          <div className="wrapper lg:pl-[3rem]">
            <DetailsPanel content={{
              styles: { colorTitle: "var(--color-primary-to-white)", colorItems: "var(--color-primary-to-white)" },
              image: '/img/web-image-1.jpg',
              title: 'Soluciones digitales completas para hacer crecer tu marca',
              items: [
                'Desarrollo web y móvil adaptado a tus necesidades.',
                'Diseño UX/UI centrado en la experiencia del usuario.',
                'Estrategias digitales que impulsan tu crecimiento.'
              ]
            }}></DetailsPanel>
          </div>
        </section>

        <ScrollStackSection>
          <div className="relative flex-1 flex justify-center items-center w-full bg-white">
            <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 lg:gap-0 p-4">
              <figure className="w-full lg:w-1/2 lg:h-full flex items-center justify-center rounded-2xl">
                <img className="w-full h-full  lg:h-3/5 lg:w-4/5 object-cover lg:object-contain aspect-video" src="img/hero-banner/desarrollo/watch.png" alt="imagen dev" />
              </figure>
              <div className="flex flex-col justify-center gap-3 lg:w-1/2 lg:h-full">
                <span className="bg-[var(--meteorite--400)] text-white p-1 px-2 rounded-2xl w-fit">Impulsa tu presencia digital con Star Grow Studio</span>
                <h2 className="text-6xl">Creamos experiencias que hacen crecer tu negocio.</h2>
                <p>Tan solo describe tu idea y el Creador de páginas web con IA se encargará del diseño, de las imágenes y del texto. Después, utiliza el editor de arrastrar y soltar para personalizar. Ya tengas una tienda online o un blog, estarás online en un abrir y cerrar de ojos.</p>
              </div>
            </div>
          </div>
          <div className="relative flex-1 flex justify-center items-center w-full bg-white">
            <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 lg:gap-0 p-4">
              <div className="w-full lg:w-1/2 h-full flex items-center justify-center">
                <div className="relative w-1/2 h-1/2 [perspective:1000px]">
                  {order.map((cardIndex, i) => {
                    const project = projects[cardIndex];
                    if (!project) return null;

                    const isFront = i === 0;
                    const rotateY = isFront ? 0 : (i % 2 === 0 ? -6 : 6);
                    const translateY = (i - 1) * -10;

                    return (
                      <div
                        key={`${cardIndex}-${i}`}
                        className="absolute transition-all duration-800 ease-[cubic-bezier(0.33,1,0.68,1)] cursor-pointer"
                        style={{
                          transform: `
                            translateY(${translateY}px)
                            rotateY(${rotateY}deg)
                            scale(${isFront ? 1 : 0.92})
                          `,
                          zIndex: order.length - i,
                        }}
                        onClick={() => handleClick(i)}
                      >
                        <ContentCard content={project} />
                      </div>
                    );
                  })}
                </div>
              </div>




              <div className="flex flex-col justify-center gap-3 lg:w-1/2 lg:h-full">
                {/* <span className="bg-[var(--meteorite--400)] text-white p-1 px-2 rounded-2xl w-fit">Creador de página web</span> */}
                <h2 className="text-6xl">Servicios que impulsan tu crecimiento</h2>
                <p>Desde la idea hasta el lanzamiento, te acompañamos en cada paso con soluciones digitales que destacan.</p>
              </div>
            </div>
          </div>
          <div className="relative flex-1 flex justify-center items-center w-full bg-white">
            <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 lg:gap-0 p-4">
              <figure className="w-full lg:w-1/2 lg:h-full flex items-center justify-center rounded-2xl">
                <img className="w-full h-full  lg:h-3/5 lg:w-4/5 object-cover lg:object-contain aspect-video" src="img/hero-banner/desarrollo/airpods.jpg" alt="imagen dev" />
              </figure>
              <div className="flex flex-col justify-center gap-3 lg:w-1/2 lg:h-full">
                <span className="bg-[var(--meteorite--400)] text-white p-1 px-2 rounded-2xl w-fit">Creador de página web</span>
                <h2 className="text-6xl">Crea tu sitio web en minutos</h2>
                <p>Tan solo describe tu idea y el Creador de páginas web con IA se encargará del diseño, de las imágenes y del texto. Después, utiliza el editor de arrastrar y soltar para personalizar. Ya tengas una tienda online o un blog, estarás online en un abrir y cerrar de ojos.</p>
              </div>
            </div>
          </div>
        </ScrollStackSection>



        <section id="portafolio" className="py-4">
          <TitleBox title={{ left: 'Resultados que', main: 'hablan', right: 'por nosotros' }} tag="Nuestro portafolio" description="''" ></TitleBox>
          <Portfolio />
        </section>

        <section
          id="section-mobile"
          className="w-full h-fit flex flex-col gap-2.5 items-center justify-center pt-8 relative overflow-hidden">
          <ModernAppsSection item={{ image: '/img/mockup-mobile.png', name: 'Apps que transforman tu día', gradient: true }}></ModernAppsSection>
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
