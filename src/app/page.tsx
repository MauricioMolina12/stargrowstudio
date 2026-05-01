
/*** ICONS ***/
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
} from "lucide-react";


/*** DATA ***/
import banners from "@/app/data/JSON/banners.json";
import servicesData from "@/app/data/JSON/services.json";


/*** COMPONENTS ***/
import Banner from "./components/shared/Banner";
import MeetingModal from "./components/shared/MeetingModal";
import Grid from "./components/shared/Grid/Grid";
import InfoCards from "./components/shared/InfoCards";
import TitleBox from "./components/shared/TitleBox/TitleBox";
import ServiceCard from "./components/shared/ServiceCard/ServiceCard";
import Accordion from "./components/shared/Accordion/Accordion";
import ScrollStackSection from "./components/shared/ScrollStackSection/ScrollStackSection";
import TestimonialForm from "./components/shared/Testimonials/TestimonialForm";



/*** HOOKS ***/
import { useIntersectionObserver } from "@/app/hooks/useIntersectionObserver";
import { useMeeting } from "./context/MeetingContext";
import { sanityFetch } from "@/sanity/lib/sanity.fetch";
import { BannerTypes } from "./types/banner";


/*** QUERIES ***/
import { HOME_BANNER, HOME_SERVICES } from "@/sanity/lib/queries/banner.queries";
import { Faqs } from "./types/faqs";
import { FAQS_HOME } from "@/sanity/lib/queries/faqs.queries";
import Contact from "./components/sections/Contact";
import ContentCard from "./components/shared/ContentCard";
import { Employee } from "./types/empleoyees";
import { ACTIVE_EMPLOYEES } from "@/sanity/lib/queries/employees.queries";
import Carousel from "./components/shared/Carousel/Carousel";
import { Sector } from "./types/sectors";
import { SECTORS_QUERY } from "@/sanity/lib/queries/sectors.queries";
import { TESTIMONIALS_QUERY } from "@/sanity/lib/queries/testimonials.queries";
import TestimonialsSection from "./components/shared/Testimonials/TestimonialsSection";
import { Testimonial } from "./types/testimonials";

// STEPS MAP DATA
const iconMap: Record<string, any> = {
  Search,
  Calendar,
  PenTool,
  Laptop,
  Rocket,
  BarChart3,
};


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

const SECTORS = [
  {
    name: "Startup",
    image: "/img/sectors/startup.jpg",
    description: "Soluciones ágiles para negocios en crecimiento.",
  },
  {
    name: "Empresa de servicios",
    image: "/img/sectors/services.jpg",
    description: "Digitalización de procesos y experiencia cliente.",
  },
  {
    name: "Ecommerce",
    image: "/img/sectors/ecommerce.jpg",
    description: "Plataformas optimizadas para conversión.",
  },
  {
    name: "Educación",
    image: "/img/sectors/education.jpg",
    description: "Experiencias de aprendizaje digitales.",
  },
  {
    name: "Inmobiliario y construcción",
    image: "/img/sectors/construction.jpg",
    description: "Gestión, visibilidad y ventas digitales.",
  },
  {
    name: "Salud",
    image: "/img/sectors/health.jpg",
    description:
      "Soluciones digitales claras, confiables y enfocadas en el usuario.",
  },
];




export default async function Home() {


  /*** BANNER QUERIES ***/
  const banner = await sanityFetch<BannerTypes>({
    query: HOME_BANNER,
  })

  const banners_services = await sanityFetch<BannerTypes>({
    query: HOME_SERVICES
  })


  /*** FAQS QUERIES ***/
  const faqs = await sanityFetch<Faqs[]>({
    query: FAQS_HOME
  })


  /*** EMPLEOYEES QUERIES ***/
  const employees = await sanityFetch<Employee[]>({
    query: ACTIVE_EMPLOYEES
  });


  /*** SECTORS QUERIES ***/
  const sectors = await sanityFetch<Sector[]>({
    query: SECTORS_QUERY
  });

  const testimonials = await sanityFetch<Testimonial[]>({
    query: TESTIMONIALS_QUERY
  });



  const empleoyeesOrdered = employees.sort((a, b) => a.order - b.order);

  const newBanner = banners.filter((_, index) => index != 0);

  return (
    <>
      <main className="flex flex-col gap-12">

        <section id="hero-banner" className="h-[70dvh] bg-white lg:h-[calc(100vh-56px)] border-b border-[#E4E4E4]">
          <div className="wrapper w-full h-full flex flex-col items-center justify-center lg:justify-between lg:gap-0 p-4 pb-0">
            <div className="titles h-[90%] lg:h-1/2 w-full flex flex-col lg:items-center justify-center gap-6">
              <h2 className="text-4xl lg:text-5xl lg:max-w-[60%] lg:text-center text-[#5656b5]">Construimos productos digitales que <span className="font-semibold">impulsan tu negocio</span></h2>
              <span className="text-[#666666]">Creamos soluciones integrales a medida que simplifican tus procesos y potencian tu crecimiento digital.</span>
              <button className="px-6 py-5 lg:py-3 bg-[#5656b5] text-white rounded-lg hover:bg-[#4a4ab0] transition-colors duration-300 cursor-pointer">Solicitar asesoría</button>
            </div>
            <div className="image h-1/2 oveflow-hidden w-full flex flex-col justify-end">
              <img className="w-full h-fit lg:h-full object-contain" src="img/hero-banner/mockup mac.png" alt="macbook-mockup" />
            </div>
          </div>
        </section>

        <section id="HighlightCards" className="flex flex-col gap-2 lg:p-6">
          <div className="cards__content grid lg:grid-cols-2 p-4 gap-6 w-full lg:max-w-11/12 lg:mx-auto">
            <ServiceCard
              title={{ label: 'Planes y precios', fontSize: 'text-3xl', color: 'var(--color-white)', fontWeight: 'font-semibold' }}
              description={{ label: 'Diseñamos y desarrollamos aplicaciones web adaptadas a las necesidades de tu negocio.', fontSize: 'text-[1rem]', color: 'var(--color-white)', fontWeight: 'font-light' }}
              bgCard="var(--color-primary)"
            >
              <div className="px-8 pb-9 font-light text-[var(--color-white)] flex-1/2">
                <p className="">Desde</p>
                <p><span className="font-medium">COP $490.000</span>/mes</p>
              </div>

            </ServiceCard>
            <ServiceCard
              title={{ label: 'Da vida a tu idea digital', fontSize: 'text-3xl', color: 'var(--color-white)', fontWeight: 'font-semibold' }}
              description={{ label: 'Cuéntanos qué quieres crear: un sitio web, una app, una marca o una plataforma completa.', fontSize: 'text-[1rem]', color: 'var(--color-white)', fontWeight: 'font-light' }}
              bgCard="var(--color-primary)"
            >
              <div className="px-8 pb-9 font-light text-[var(--color-white)] italic flex-1/2">
                <p>Desde una idea, hasta un producto real.</p>
              </div>

            </ServiceCard>

          </div>

        </section>



        <section id="cards" className="bg-[var(--meteorite--50)] lg:p-8 flex flex-col gap-2">
          <TitleBox title={{ left: 'Haz que tu marca', main: 'hable', right: 'por ti' }} tag="Creatividad"></TitleBox>
          <div className="cards__content grid lg:grid-cols-2 lg:max-w-11/12 p-4 gap-6 lg:mx-auto">

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

              <figure className="relative w-full before:absolute 
                    before:bottom-0 before:right-0 before:top-30 before:left-0 before:rounded-xl before:bg-[var(--color-primary)]
                    after:absolute after:bottom-0 after:top-[-20px] after:right-0 after:w-[60%] after:rounded-xl after:bg-[linear-gradient(110deg,_var(--color-primary)_60%,_var(--meteorite--400)_60%)]">
                <img
                  src="/img/hero-banner/Figma-cap.png"
                  alt="figma view"
                  className="object-cover ml-auto w-4/5 h-full rounded-xl relative z-30"
                />
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

              <figure className="relative w-full 
                    before:absolute before:bottom-0 before:right-0 before:top-30 before:left-0 before:rounded-xl before:bg-[var(--primary--700)]
                    after:absolute after:bottom-0 after:top-[-20px] after:right-0 after:w-[60%] after:rounded-xl after:bg-[linear-gradient(110deg,_var(--primary--700)_60%,_var(--meteorite--200)_60%)]">
                <img src="/img/hero-banner/Ilustrator-cap.png" alt="ilustrator view" className="object-cover ml-auto w-4/5 h-full rounded-xl relative z-30" />
              </figure>

            </ServiceCard>

          </div>
        </section>

        <section id="banner" className="h-screen">
          <Banner
            banners={banners_services}
          />
        </section>

        <ScrollStackSection>
          <div className="relative flex-1 flex justify-center items-center w-full bg-white h-screen border border-gray-200">
            <div className="absolute inset-0 flex flex-col lg:flex-row-reverse items-center justify-center lg:justify-between gap-6 lg:gap-0 p-4 lg:max-w-11/12 lg:mx-auto">
              <figure className="w-full lg:w-1/2 lg:h-full flex items-center justify-center rounded-2xl">
                <img className="w-full h-full  lg:h-3/5 lg:w-4/5 object-cover lg:object-contain aspect-video" src="img/process_methodology.png" alt="imagen dev" />
              </figure>
              <div className="flex flex-col justify-center gap-3 lg:w-1/2 lg:h-full">
                <span className="bg-[var(--primary--100)] text-[var(--color-primary-to-white)] font-medium p-1 px-3 rounded-2xl w-fit">Proceso claro y eficiente</span>
                <h2 className="text-4xl">Un método simple que garantiza resultados</h2>
                <p>Trabajamos con un proceso probado de 3 pasos: <strong>estrategia, diseño y desarrollo, seguido de lanzamiento y optimización.</strong>Esto nos permite entregar proyectos rápidos, sin errores y alineados con tus objetivos comerciales, con comunicación constante y transparencia total.</p>
              </div>
            </div>
          </div>
          <div className="relative flex-1 flex justify-center items-center w-full bg-white h-screen border border-gray-200">
            <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 lg:gap-4 p-4">
              <figure className="w-full lg:w-1/2 lg:h-full flex items-center justify-center rounded-2xl">
                <img className="w-full h-full  lg:h-3/5 lg:w-4/5 object-cover lg:object-contain aspect-video" src="img/process_methodology.png" alt="imagen dev" />
              </figure>
              <div className="flex flex-col justify-center gap-3 lg:w-1/2 lg:h-full">
                <span className="bg-[var(--primary--100)] text-[var(--color-primary-to-white)] font-medium p-1 px-3 rounded-2xl w-fit">Resultados que se notan</span>
                <h2 className="text-4xl">Tu crecimiento digital empieza aquí</h2>
                <p>Somos el equipo digital que tu empresa necesita: diseño + desarrollo + estrategia + contenido visual. Con nosotros tendrás una marca sólida, una plataforma funcional y una presencia digital profesional que genera confianza, conversiones y crecimiento real.</p>
              </div>
            </div>
          </div>
          <div className="relative flex-1 flex justify-center items-center w-full bg-white h-screen border border-gray-200">
            <div className="absolute inset-0 flex flex-col lg:flex-row-reverse items-center justify-center lg:justify-between gap-6 lg:gap-0 p-4 lg:max-w-11/12 lg:mx-auto">
              <figure className="w-full lg:w-1/2 lg:h-full flex items-center justify-center rounded-2xl">
                <img className="w-full h-full  lg:h-3/5 lg:w-4/5 object-cover lg:object-contain aspect-video" src="img/img_lx2p5lx2p5lx2p5l 1.png" alt="imagen dev" />
              </figure>
              <div className="flex flex-col justify-center gap-3 lg:w-1/2 lg:h-full">
                <span className="bg-[var(--primary--100)] text-[var(--color-primary-to-white)] font-medium p-1 px-3 rounded-2xl w-fit">Productos digitales completos</span>
                <h2 className="text-4xl">Construimos tu producto digital desde la idea hasta el lanzamiento</h2>
                <p>Creamos soluciones digitales integrales para empresas: desarrollo de software, diseño de landing pages, branding, consultoría estratégica y fotografía profesional. Te acompañamos en cada etapa para convertir tu visión en un producto real, funcional y rentable.</p>
              </div>
            </div>
          </div>
        </ScrollStackSection>

        <section id="testimonials">
          <TitleBox title={{ left: 'Lo que dicen nuestros clientes', right: 'es nuestra mejor carta' }} tag="Testimonios"></TitleBox>
          <TestimonialsSection testimonials={testimonials}></TestimonialsSection>
        </section>

        <section id="our-sectors" className="p-4">
          <TitleBox
            title={{ left: "Creamos productos digitales para distintos tipos de negocio" }}
            tag="Adaptabilidad"
          />

          <div
            className="
              flex 
              flex-col 
              lg:flex-row 
              gap-4 
              px-4 
              lg:px-16 
              h-auto 
              lg:h-[420px]
            "
          >
            {sectors.map((sector) => (
              <div
                key={sector._id}
                className="
                  relative 
                  flex-1 
                  transition-all 
                  duration-500 
                  ease-out 
                  hover:flex-[2.5] 
                  group 
                  cursor-pointer 
                  overflow-hidden 
                  rounded-xl
                "
                style={{
                  backgroundImage: `url(${sector.coverImage?.asset?.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >

                <div
                  className="
                    absolute 
                    inset-0 
                    bg-black/40 
                    opacity-0 
                    group-hover:opacity-100 
                    transition-opacity 
                    duration-300 
                    z-10
                  "
                />

                <div
                  className="
                    absolute 
                    bottom-4 
                    left-4 
                    right-4 
                    opacity-0 
                    group-hover:opacity-100 
                    transition-opacity 
                    duration-300 
                    z-20
                  "
                >
                  <h3 className="text-white font-semibold text-2xl">
                    {sector.name}
                  </h3>

                  <p className="text-xs text-gray-200 leading-snug">
                    {sector.shortDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>



        {/* <section id="our-team" className="p-4">
          <TitleBox title={{ left: "Nuestra gente" }} tag="Trabajo en equipo" />

          <div className="lg:w-[90%] lg:mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {empleoyeesOrdered.map((emp, idx) => (

                <div className="rounded-2xl" key={idx}>
                  <ContentCard content={{ name: emp?.alias ?? '', image: emp?.avatar ?? '', description: emp?.job ?? '' }}></ContentCard>
                </div>
              ))
              }
            </div>
          </div>
        </section> */}

        <section id="testimonials-form">
          <TestimonialForm></TestimonialForm>
        </section>

        <section id="faqs" className="w-full min-h-[fit-content] py-[50px] flex flex-col items-center justify-center gap-3">
          <TitleBox title={{ left: 'Preguntas frecuentes' }} tag="Atención al cliente"></TitleBox>
          <div className="dropdowns flex flex-col gap-6 lg:max-w-1/2 px-4">
            {faqs.map((faq, idx) => (
              <Accordion key={idx} title={faq.question}>
                <p className="text-[1rem]">
                  {faq.answer}
                </p>
              </Accordion>
            ))}
          </div>
        </section>

        <section id="contacto" className="grid-bg-diagonal">
          <Contact />
        </section>

      </main>
    </>
  );
}
