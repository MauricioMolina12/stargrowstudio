'use client';

import { useState } from "react";
import clsx from "clsx";
import useDarkMode from "../hooks/useDarkMode";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useRouter } from "next/navigation";

interface Service {
  icon: string;
  name: string;
  slug: string;
  description: string;
  loading?: boolean;
}

const services: Service[] = [
  {
    icon: "icons/code.gif",
    name: "Desarrollo de software a medida",
    slug: "desarrollo-software",
    description: "Creamos aplicaciones web adaptadas a tus necesidades y objetivos.",
  },
  {
    icon: "icons/mobile2.gif",
    name: "Desarrollo de apps móviles",
    slug: "desarrollo-apps",
    description: "Creamos aplicaciones móviles adaptadas a tus necesidades y objetivos.",
  },
  {
    icon: "icons/chart.gif",
    name: "Análisis de datos y visualización",
    slug: "analisis-datos",
    description: "Convierte tus datos en decisiones inteligentes con dashboards personalizados.",
  },
  {
    icon: "icons/bdd.gif",
    name: "Arquitectura y gestión de bases de datos",
    slug: "bases-datos",
    description: "Optimizamos la estructura de datos para asegurar rendimiento y escalabilidad.",
  },
  {
    icon: "icons/megaphone.gif",
    name: "Consultoría en transformación digital",
    slug: "consultoria-transformacion",
    description: "Te guiamos paso a paso hacia una transformación tecnológica estratégica.",
  },
  {
    icon: "icons/design.gif",
    name: "Diseño UX/UI centrado en el usuario",
    slug: "diseno-ux-ui",
    description: "Creamos experiencias digitales memorables que conectan con tu audiencia.",
  },
];


export default function OurServices() {
  const router = useRouter();
  const { isDark } = useDarkMode();
  const [loadingDetails, setLoadingDetails] = useState<{ [key: string]: boolean }>({});


  function detailsService(service: Service) {
    router.push(`/services/${service.slug}`);
    setLoadingDetails((prev) => ({ ...prev, [service.slug]: true }));
    setTimeout(() => {
      setLoadingDetails((prev) => ({ ...prev, [service.slug]: false }));
    }, 3000);
  }

  useIntersectionObserver('.service-card', { threshold: 0.4 }, 'all');

  

  return (
    <section
      className={clsx(
        "w-full lg:max-w-[70%] lg:mx-auto lg:my-0 py-12 px-4 transition-colors duration-500"
      )}
    >
      <div className="w-full flex justify-center mb-8"></div>
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <span className="text-[var(--color-primary-to-white)]">Nuestros servicios</span>
        <h1 className="text-3xl text-center font-bold lg:w-[70%] lg:text-4xl">Impulsa tu negocio con nuestros servicios <span className="text-[var(--color-primary-to-white)]"> estrella ✨</span></h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-1 w-full">
          {services.map((service) => (
            <div
              key={service.name}
              className="service-card bg-white dark:bg-[#1e1e1e] rounded-lg p-6 flex flex-col items-start justify-between gap-4 transform transition duration-700 opacity-0 translate-y-10 scale-95"
            >
              <img
                src={`/${service.icon}`}
                alt={service.name}
                width={40}
                height={40}
                className="object-contain bg-gray-100 p-1 rounded-2xl"
              />
              <h2 className="text-[1rem] font-[600] text-[var(--color-dark)] dark:text-white">
                {service.name}
              </h2>
              <p className="text-[var(--color-dark-gray)] dark:text-gray-300 text-sm">
                {service.description}
              </p>

              <button onClick={() => detailsService(service)} className="cursor-pointer mt-2 text-[var(--color-primary)] flex items-center gap-1 font-medium transition-colors text-[0.9rem]">
                Leer más
                {!loadingDetails[service.slug] ? (
                  <span className="material-symbols-outlined">arrow_forward</span>
                ) : <div className="loader w-5 h-5 border border-white border-t-[var(--color-primary)] rounded-[50%] animate-spin"></div>
                }
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
