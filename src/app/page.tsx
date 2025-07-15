'use client'
import Image from "next/image";


// Components
import Banner from "./components/shared/Banner";
import OurServices from "./components/OurServices";
import AboutUs from "./components/shared/AboutUs/index"
import OurWay from "./components/OurWay";
import Plans from "./components/shared/Plans";
import MeetingModal from "./components/shared/MeetingModal";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import InternetStatus from "./components/layout/InternetStatus";
import ModalMessage from "./components/shared/modalMessage";

// Interfaces
import { BannerInterface } from "./types/Banner";

// Hooks
import { useComponentMeeting } from "./hooks/useComponentMeeting";
import { useMeeting } from "./context/MeetingContext";
import { useEffect, useState } from "react";

export default function Home() {
  const banners: BannerInterface[] = [
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

  const [modalInfo, setModalInfo] = useState<{ message: string; isSuccess: boolean } | null>(null);
  const { isVisible } = useMeeting();

  const [isOnline, setIsOnline] = useState<boolean>(typeof window !== "undefined" ? navigator.onLine : true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleContactFeedback = (message: string, isSuccess: boolean) => {
    setModalInfo({ message, isSuccess });
    setTimeout(() => setModalInfo(null), 4000);
  };

  return (
    <>
      {isOnline ? (

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
            <OurServices />
          </section>
          <section id="nosotros">
            <AboutUs />
          </section>
          <section id="progreso">
            <OurWay />
          </section>
          <section id="planes">
            <Plans />
          </section>
          <section id="portafolio">
            <Portfolio />
          </section>
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
      ) :
        <InternetStatus isOnline={isOnline} />
      }
    </>
  );
}
