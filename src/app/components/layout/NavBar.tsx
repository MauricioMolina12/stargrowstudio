'use client';

import { useActiveSection } from "@/app/hooks/useActiveSection";
import useDarkMode from "@/app/hooks/useDarkMode";
import Link from "next/link";
import { ActivitySquare, BarChart3, ChevronRight, Database, DatabaseBackup, DatabaseZap, GaugeCircle, Glasses, Layers, LayoutTemplate, Lightbulb, Link2, MonitorSmartphone, MousePointerClick, Palette, Pencil, PieChart, Rocket, ScrollText, SearchCheck, ServerCog, Settings, Settings2, Share2, Shield, ShieldCheck, Sliders, Smartphone, TrendingUp, Users, Wrench } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { WorkflowIcon } from "lucide-react";
import { useActiveClassScroll } from "@/app/hooks/useScrollNav";
import { usePathname } from 'next/navigation';
import { useState } from "react";
import { useMeeting } from "@/app/context/MeetingContext";
import { ShareModal } from "../shared/ShareModal/ShareModal";
import { CardLinkList } from "../shared/CardLinkList/CardLinkList";
import { useIsDesktop } from "@/app/hooks/useIsDesktop";
import { useRouter } from "next/navigation";
import ContentCard from "../shared/ContentCard";

const navItems: { label: string, href: string, path?: string, isDropdown?: boolean }[] = [
  { label: "Precios", href: "#servicios" },
  { label: "Servicios", href: "#servicios", isDropdown: true },
  { label: "Explorar", href: "#nosotros", isDropdown: true },
];

const NavBar = () => {
  const activeSection = useActiveSection(navItems);
  const activeClassScroll = useActiveClassScroll()
  const pathname = usePathname();

  const [stateSideBar, setStateSideBar] = useState(false);
  const [openModal, setOpenModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);


  const { show, isVisible } = useMeeting();
  const isDesktop = useIsDesktop();
  const router = useRouter();

  const projects = [
    {
      name: '¿Como hacer una página web?',
      image: '/img/how-create-website.png',
      description: 'Renta Go es un proyecto innovador de renta de autos diseñado para ofrecer una experiencia rápida, confiable y 100% digital. La plataforma permite a los usuarios alquilar vehículos de forma sencilla y rápida.',
    },
  ];



  const toggleSideBar = () => setStateSideBar((prev) => !prev);


  return (
    <nav className="w-full sticky left-0 top-0 bg-[var(--color-white-to-primary)] z-50">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-6 py-3">

        {/* Logo y nombre */}
        <header className="w-full lg:w-fit flex justify-between items-center">
          <Link href={'/'}>
            <figure className="flex items-center gap-3">
              <img
                className="h-8 w-auto object-contain"
                src={"/logo.png"}
                alt="logo sgs"
              />
              <figcaption className="text-[var(--color-primary-to-white)] font-bold text-lg whitespace-nowrap">
                Star Grow Studio
              </figcaption>
            </figure>
          </Link>
          <button
            className="w-[30px] h-[20px] flex flex-col justify-between lg:hidden group z-[60]" onClick={toggleSideBar}>
            <span
              className={`
                w-full h-[4px] rounded-2xl transition-all duration-300 ease-in-out
                ${'bg-[var(--color-primary)]'}
                ${stateSideBar ? 'rotate-45 translate-y-[8px]' : ''}
              `}></span>

            <span
              className={`
                w-[70%] h-[4px] rounded-2xl transition-all duration-300 ease-in-out
                ${'bg-[var(--color-primary)]'}
                ${stateSideBar ? 'opacity-0 scale-0' : ''}`}></span>

            <span
              className={`
                w-full h-[4px] rounded-2xl transition-all duration-300 ease-in-out
                ${'bg-[var(--color-primary)]'}
                ${stateSideBar ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
          </button>
        </header>

        {/* Navegación */}
        <ul
          className={`
            absolute left-0 top-full z-40 w-full bg-[var(--color-white-to-primary)]
            transition-all duration-500 ease-in-out
            transform lg:transform-none
            ${stateSideBar ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-5 pointer-events-none max-h-0'}
            p-6 lg:p-0 flex-col lg:flex lg:flex-row lg:items-center lg:justify-center
            lg:static lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto lg:max-h-full
            gap-4 lg:mt-0 lg:w-[70%] lg:gap-6 overflow-hidden
          `}
        >
          {navItems.map((item) => (
            <li
              key={item.href}
              className="mb-10 flex justify-between items-center w-full lg:w-auto lg:m-0"
              onClick={() => {
                if (item.isDropdown) {
                  setSelectedItem(item.label);
                  setOpenModal(prev => !prev);
                } else {
                  router.push(item.href);
                }
              }}

            >
              <Link
                href="#"
                className="flex items-center gap-2 lg:text-[0.9rem] text-gray-500 transition-all"
              >
                {item.label}
                {item.isDropdown && (
                  <ChevronDown
                    className={`hidden lg:block w-5 h-5 text-gray-500 transform transition-transform duration-300 ${openModal && selectedItem === item.label ? 'rotate-180' : ''}`}
                  />
                )}
              </Link>



              {(stateSideBar || isDesktop) && (
                <ShareModal isOpen={openModal} onClose={() => {
                  setOpenModal(false);
                  setSelectedItem(null);
                }}>
                  {selectedItem === "Servicios" && (
                    <div className="flex flex-col lg:flex-row items-start gap-3 w-fit">
                      <div className="flex flex-col gap-3 w-full lg:w-auto">
                        <CardLinkList
                          title="Desarrollo de software a medida"
                          index={0}
                          openIndex={openIndex}
                          setOpenIndex={setOpenIndex}
                          items={[
                            {
                              icon: <LayoutTemplate />,
                              title: "Desarrollo de sitios web a medida",
                              description: "Creamos sitios únicos adaptados a tus objetivos de negocio.",
                              highlight: true,
                              badge: "Personalizado",
                            },
                            {
                              icon: <MonitorSmartphone />,
                              title: "Aplicaciones web progresivas (PWA)",
                              description: "Apps web que funcionan sin conexión y se instalan como móviles.",
                            },
                            {
                              icon: <Share2 />,
                              title: "Integraciones con APIs",
                              description: "Conectamos tu software con servicios externos y automatizaciones.",
                            },
                            {
                              icon: <Sliders />,
                              title: "Sistemas de gestión (CMS / ERP)",
                              description: "Paneles administrativos personalizados para gestionar tu negocio.",
                            },
                            {
                              icon: <Wrench />,
                              title: "Optimización y mantenimiento",
                              description: "Mejoramos rendimiento, seguridad y escalabilidad de tu proyecto.",
                            },
                          ]}
                        />
                        <CardLinkList
                          title="Desarrollo de apps móviles"
                          index={1}
                          openIndex={openIndex}
                          setOpenIndex={setOpenIndex}
                          items={[
                            {
                              icon: <Smartphone />,
                              title: "Desarrollo de apps móviles a medida",
                              description: "Creamos apps nativas o híbridas adaptadas a tus necesidades.",
                              highlight: true,
                              badge: "Personalizado",
                            },
                            {
                              icon: <MonitorSmartphone />,
                              title: "Aplicaciones web progresivas (PWA)",
                              description: "Apps web que funcionan sin conexión y se instalan como móviles.",
                            },
                            {
                              icon: <Link2 />,
                              title: "Integraciones con APIs",
                              description: "Conectamos tu app con servicios externos y automatizaciones.",
                            },
                            {
                              icon: <Settings />,
                              title: "Sistemas de gestión móviles (CMS / ERP)",
                              description: "Apps para administrar procesos desde cualquier dispositivo.",
                            },
                            {
                              icon: <ShieldCheck />,
                              title: "Optimización y mantenimiento",
                              description: "Mejoramos rendimiento, seguridad y escalabilidad de tu app.",
                            },
                          ]}
                        />
                      </div>
                      <div className="flex flex-col gap-3 w-full lg:w-auto">
                        <CardLinkList title="Análisis de datos y visualización"
                          index={2}
                          openIndex={openIndex}
                          setOpenIndex={setOpenIndex}
                          items={[
                            {
                              icon: <BarChart3 />,
                              title: "Visualización de dashboards",
                              description: "Creamos paneles interactivos para entender tus métricas en tiempo real.",
                              highlight: true,
                              badge: "Interactivo",
                            },
                            {
                              icon: <PieChart />,
                              title: "Informes personalizados",
                              description: "Generamos reportes detallados con KPIs relevantes para tu negocio.",
                            },
                            {
                              icon: <Database />,
                              title: "Procesamiento de datos",
                              description: "Transformamos datos en bruto en información útil para la toma de decisiones.",
                            },
                            {
                              icon: <ActivitySquare />,
                              title: "Modelos de predicción",
                              description: "Utilizamos estadísticas y machine learning para anticipar comportamientos.",
                            },
                            {
                              icon: <SearchCheck />,
                              title: "Análisis exploratorio",
                              description: "Detectamos patrones, tendencias y oportunidades ocultas en tus datos.",
                            },
                          ]}
                        ></CardLinkList>
                        <CardLinkList title="Arquitectura y gestión de bases de datos"
                          index={3}
                          openIndex={openIndex}
                          setOpenIndex={setOpenIndex}
                          items={[
                            {
                              icon: <Database />,
                              title: "Diseño de bases de datos escalables",
                              description: "Estructuramos tus datos para soportar crecimiento, consultas rápidas y seguridad.",
                              highlight: true,
                              badge: "Escalable",
                            },
                            {
                              icon: <ServerCog />,
                              title: "Administración y monitoreo",
                              description: "Monitoreamos el rendimiento y aseguramos disponibilidad constante.",
                            },
                            {
                              icon: <DatabaseBackup />,
                              title: "Backups y recuperación de datos",
                              description: "Implementamos estrategias de respaldo seguras y automatizadas.",
                            },
                            {
                              icon: <Shield />,
                              title: "Seguridad y control de acceso",
                              description: "Gestionamos permisos, cifrado y protección ante amenazas.",
                            },
                            {
                              icon: <DatabaseZap />,
                              title: "Migración de datos",
                              description: "Movemos tus datos entre sistemas sin pérdida ni interrupciones.",
                            },
                          ]}
                        ></CardLinkList>
                      </div>
                      <div className="flex flex-col gap-3 w-full lg:w-auto">
                        <CardLinkList title="Consultoría en transformación digital"
                          index={4}
                          openIndex={openIndex}
                          setOpenIndex={setOpenIndex}
                          items={[
                            {
                              icon: <Lightbulb />,
                              title: "Estrategia digital personalizada",
                              description: "Analizamos tu negocio y trazamos un plan digital enfocado en resultados.",
                              highlight: true,
                              badge: "Estrategia",
                            },
                            {
                              icon: <ActivitySquare />,
                              title: "Automatización de procesos",
                              description: "Reducimos tareas manuales con herramientas digitales eficientes.",
                            },
                            {
                              icon: <Layers />,
                              title: "Integración de tecnología emergente",
                              description: "Adoptamos IA, blockchain o IoT según tus necesidades y objetivos.",
                            },
                            {
                              icon: <Users />,
                              title: "Capacitación de equipos",
                              description: "Entrenamos a tu equipo para adaptarse y aprovechar el cambio tecnológico.",
                            },
                            {
                              icon: <TrendingUp />,
                              title: "Medición de impacto digital",
                              description: "Evaluamos resultados y adaptamos la estrategia continuamente.",
                            },
                          ]}
                        ></CardLinkList>
                        <CardLinkList title="Diseño UX/UI centrado en el usuario"
                          index={5}
                          openIndex={openIndex}
                          setOpenIndex={setOpenIndex}
                          items={[
                            {
                              icon: <Palette />,
                              title: "Diseño de interfaces intuitivas",
                              description: "Creamos experiencias limpias, accesibles y visualmente atractivas.",
                              highlight: true,
                              badge: "Usabilidad",
                            },
                            {
                              icon: <MousePointerClick />,
                              title: "Prototipado y validación",
                              description: "Validamos ideas con prototipos navegables antes de desarrollarlas.",
                            },
                            {
                              icon: <ScrollText />,
                              title: "Arquitectura de la información",
                              description: "Organizamos contenido de forma clara y lógica para los usuarios.",
                            },
                            {
                              icon: <GaugeCircle />,
                              title: "Optimización de experiencia",
                              description: "Analizamos el comportamiento del usuario y mejoramos el recorrido.",
                            },
                            {
                              icon: <Glasses />,
                              title: "Accesibilidad digital",
                              description: "Diseñamos interfaces inclusivas para todos los usuarios.",
                            },
                          ]}

                        ></CardLinkList>
                      </div>
                    </div>
                  )}

                  {selectedItem === "Explorar" && (
                    <div className="flex flex-col lg:flex-row gap-3 w-fit">
                      <CardLinkList
                        index={6}
                        openIndex={openIndex}
                        setOpenIndex={setOpenIndex}
                        items={[
                          {
                            icon: <Pencil />,
                            title: "Blog",
                            description: "Nuestras últimas noticias y actualizaciones.",
                          },
                          {
                            icon: <Settings2 />,
                            title: "Funciones y herramientas",
                            description: "Últimos lanzamientos y funciones de productos.",
                          },
                          {
                            icon: <Rocket />,
                            title: "Nuestra historia",
                            description: "Quienes somos.",
                          },
                        ]}
                      ></CardLinkList>
                      <ContentCard contents={projects}></ContentCard>
                    </div>
                  )}
                </ShareModal>
              )}

              {/* Solo visible en móviles */}
              <ChevronRight className="w-5 h-5 text-[var(--color-primary)] lg:hidden" />
            </li>
          ))}

          {/* Botón */}
          <li className="w-full lg:w-auto lg:ml-auto">
            <button onClick={show} className="cursor-pointer w-full lg:w-auto lg:ml-auto lg:p-3 lg:text-[.9rem] p-4 text-[1.1rem] font-medium text-white bg-[var(--color-primary)] rounded-[10px] text-nowrap">
              {!isVisible ?
                <span>Cotizar ahora</span>
                : <div className="loader w-5 h-5 border border-white border-t-[var(--color-primary)] rounded-[50%] animate-spin"></div>}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
