'use client';

import { useActiveSection } from "@/app/hooks/useActiveSection";
import useDarkMode from "@/app/hooks/useDarkMode";
import Link from "next/link";
import { ActivitySquare, BarChart3, BookOpen, ChevronRight, Database, DatabaseBackup, DatabaseZap, GaugeCircle, Glasses, Layers, LayoutTemplate, Lightbulb, Link2, MonitorSmartphone, MousePointerClick, Palette, Pencil, PieChart, Rocket, ScrollText, SearchCheck, ServerCog, Settings, Settings2, Share2, Shield, ShieldCheck, Sliders, Smartphone, TrendingUp, Users, Wrench } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { WorkflowIcon } from "lucide-react";
import { useActiveClassScroll } from "@/app/hooks/useScrollNav";
import { usePathname } from 'next/navigation';
import { useState } from "react";
import { useMeeting } from "@/app/context/MeetingContext";
import { ShareModal } from "../shared/ShareModal/ShareModal";
import { CardLinkList, Item } from "../shared/CardLinkList/CardLinkList";
import { useIsDesktop } from "@/app/hooks/useIsDesktop";
import { useRouter } from "next/navigation";
import ContentCard from "../shared/ContentCard";
import { Category } from "@/app/types/category";
import resolveIcon from "@/app/utils/functions/resolveIcon";

interface routeStyles {
  navClass: string,
  logo: string,
  textClass: string
  menuClass?: string
  itemsMenuClass?: string
  ctaClassText?: string
  ctaClassBg?: string
}

const navItems: { label: string, path?: string, isDropdown?: boolean }[] = [
  // { label: "Precios" },
  { label: "Servicios", isDropdown: true },
  { label: "Explorar", isDropdown: true },
];

const routeStyles: Record<string, routeStyles> = {
  "/": {
    navClass: "bg-[#ffffff] text-[#5656B5]",
    logo: "/logo.png",
    textClass: "text-[#5656B5]",
    menuClass: "bg-white",
    itemsMenuClass: "text-[#5656B5]",
    ctaClassBg: "bg-[var(--color-primary)]",
    ctaClassText: "text-[var(--color-white)]"
  },
  "/legal/privacy-policy": {
    navClass: "bg-[#5656B5] text-white",
    logo: "/logo-white.png",
    textClass: "text-white",
    menuClass: "bg-[var(--color-primary)]",
    itemsMenuClass: "text-white",
    ctaClassBg: "bg-white",
    ctaClassText: "text-[var(--color-primary)]"
  },
  "/legal/terms-of-service": {
    navClass: "bg-[#5656B5] text-white",
    logo: "/logo-white.png",
    textClass: "text-white",
    menuClass: "bg-[var(--color-primary)]",
    itemsMenuClass: "text-white",
    ctaClassBg: "bg-white",
    ctaClassText: "text-[var(--color-primary)]"
  },
  "/legal/cookies-policy": {
    navClass: "bg-[#5656B5] text-white",
    logo: "/logo-white.png",
    textClass: "text-white",
    menuClass: "bg-[var(--color-primary)]",
    itemsMenuClass: "text-white",
    ctaClassBg: "bg-white",
    ctaClassText: "text-[var(--color-primary)]"
  },
  "/terms": {
    navClass: "bg-black text-white",
    logo: "/logo-white.png",
    textClass: "text-white",
  },
  "/about-us": {
    navClass: "bg-gray-100 text-gray-900",
    logo: "/logo.png",
    textClass: "text-gray-900",
  },
};

const defaultStyle = {
  navClass: "bg-[var(--color-white-to-primary)] text-[var(--color-primary-to-white)]",
  logo: "/logo.png",
  textClass: "text-[var(--color-primary-to-white)]",
  menuClass: "bg-transparent",
  itemsMenuClass: "text-gray-500",
  ctaClassBg: "bg-[var(--color-primary)]",
  ctaClassText: "text-white"
};

const NavBar = ({ servicesList }: { servicesList: Category[] }) => {
  // const activeSection = useActiveSection(navItems);
  const activeClassScroll = useActiveClassScroll()
  const pathname = usePathname();

  const [stateSideBar, setStateSideBar] = useState(false);
  const [openModal, setOpenModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const currentStyle = routeStyles[pathname] ?? defaultStyle;

  const navClass = `w-full sticky left-0 top-0 z-50 ${currentStyle.navClass}`;
  const { show, isVisible } = useMeeting();
  const isDesktop = useIsDesktop();
  const router = useRouter();

  const project = {
    name: '¿Como hacer una página web?',
    image: '/img/how-create-website.png',
    description: 'Renta Go es un proyecto innovador de renta de autos diseñado para ofrecer una experiencia rápida, confiable y 100% digital. La plataforma permite a los usuarios alquilar vehículos de forma sencilla y rápida.',
  }

  const services = servicesList
    .filter(service => !service.parent)
    .map(parentService => ({
      ...parentService,
      children: servicesList
        .filter(s => s.parent?._ref === parentService._id)
        .toSorted((a, b) => b.order - a.order)
        .map(child => ({
          ...child,
          icon: resolveIcon(child.icon),
        })),
    }));


  const toggleSideBar = () => setStateSideBar((prev) => !prev);


  return (
    <nav className={navClass}>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-3 lg:px-6 py-3 max-w-11/12 my-0 mx-auto">

        {/* Logo y nombre */}
        <header className="w-full lg:w-fit flex justify-between items-center">
          <Link href={'/'}>
            <figure className="flex items-center gap-3">
              <img
                className="h-8 w-auto object-contain"
                src={currentStyle.logo}
                alt="logo sgs"
              />
              <figcaption
                className={`${currentStyle.textClass} font-bold text-lg whitespace-nowrap hidden sm:block `}
              >
                Star Grow Studio
              </figcaption>
            </figure>
            

          </Link>
          <button
            className="w-[30px] h-[20px] flex flex-col justify-between lg:hidden group z-[60]" onClick={toggleSideBar}>
            <span
              className={`
                w-full h-[4px] rounded-2xl  duration-300 ease-in-out
                ${'bg-[var(--color-primary)]'}
                ${stateSideBar ? 'rotate-45 translate-y-[8px]' : ''}
              `}></span>

            <span
              className={`
                w-[70%] h-[4px] rounded-2xl  duration-300 ease-in-out
                ${'bg-[var(--color-primary)]'}
                ${stateSideBar ? 'opacity-0 scale-0' : ''}`}></span>

            <span
              className={`
                w-full h-[4px] rounded-2xl  duration-300 ease-in-out
                ${'bg-[var(--color-primary)]'}
                ${stateSideBar ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
          </button>
        </header>

        {/* Navegación */}
        <ul
          className={`
              absolute left-0 top-full z-40 w-full
              ${currentStyle.menuClass} 
              transform lg:transform-none
              ${stateSideBar
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-5 pointer-events-none max-h-0"}
              p-6 lg:p-0 flex-col lg:flex lg:flex-row lg:items-center lg:justify-center
              lg:static lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto lg:max-h-full
              gap-4 lg:mt-0 lg:w-[70%] lg:gap-6 
            `}
        >

          {navItems.map((item, idx) => (
            <li
              key={idx}
              className={`mb-10 flex justify-between items-center w-full lg:w-auto lg:m-0`}
              onMouseEnter={() => {
                if (item.isDropdown) {
                  setSelectedItem(item.label);
                  setOpenModal(prev => !prev);
                }
                // else {
                //   router.push(item.href);
                // }
              }}
              onMouseLeave={() => {
                if (item.isDropdown) {
                  setSelectedItem(null);
                  setOpenModal(false);
                }
              }}

            >
              <Link
                href="#"
                className={`flex items-center gap-2 lg:text-[0.9rem] ${currentStyle.itemsMenuClass}`}
              >
                {item.label}
                {item.isDropdown && (
                  <ChevronDown
                    className={`hidden lg:block w-5 h-5 ${currentStyle.itemsMenuClass} transform transition-transform duration-300 ${openModal && selectedItem === item.label ? 'rotate-180' : ''}`}
                  />
                )}
              </Link>



              {(stateSideBar || isDesktop) && openModal && selectedItem === item.label && (
                <ShareModal isOpen={openModal} onClose={() => {
                  setOpenModal(false);
                  setSelectedItem(null);
                }}>
                  {selectedItem === "Servicios" && (
                    <div className={`flex flex-col lg:flex-row items-start gap-3 w-fit`}>
                      {services.map((service) => (
                        <CardLinkList 
                          title={service.title}
                          key={service.order}
                          index={parseInt(service._id)}
                          items={service.children as Item[]}
                          setOpenIndex={setOpenIndex}
                          openIndex={openIndex}
                        />
                      ))}

                      
                    </div>
                  )}

                  {selectedItem === "Explorar" && (
                    <div className="flex flex-col lg:flex-row gap-3 w-fit">
                      <CardLinkList
                        index={6}
                        openIndex={openIndex}
                        setOpenIndex={setOpenIndex}
                        onItemClick={() => {
                          setOpenModal(false)
                          setSelectedItem(null)
                        }}
                        items={[
                          {
                            icon: <BookOpen/>,
                            title: "Articulos",
                            description: "Explora nuestros artículos sobre desarrollo web, apps móviles y más.",
                            href: '/articles'
                          }
                          // {
                          //   icon: <Pencil />,
                          //   title: "Blog",
                          //   description: "Nuestras últimas noticias y actualizaciones.",
                          // },
                          // {
                          //   icon: <Settings2 />,
                          //   title: "Funciones y herramientas",
                          //   description: "Últimos lanzamientos y funciones de productos.",
                          // },
                          // {
                          //   icon: <Rocket />,
                          //   title: "Nuestra historia",
                          //   description: "Quienes somos.",
                          //   cta: () => router.push('/our-history')
                          // },
                        ]}
                      ></CardLinkList>
                      {/* <ContentCard content={project}></ContentCard> */}
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
            <Link href={'#contacto'} className={`cursor-pointer w-full lg:w-auto lg:ml-auto lg:p-3 lg:text-[.9rem] p-4 text-[1.1rem] font-medium ${currentStyle.ctaClassText} ${currentStyle.ctaClassBg} rounded-[10px] text-nowrap`}>  
              Cotizar ahora
                
            </Link>
            {/* <button onClick={show} className={`cursor-pointer w-full lg:w-auto lg:ml-auto lg:p-3 lg:text-[.9rem] p-4 text-[1.1rem] font-medium ${currentStyle.ctaClassText} ${currentStyle.ctaClassBg} rounded-[10px] text-nowrap`}>
              {!isVisible ?
                <span>Cotizar ahora</span>
                : <div className="loader w-5 h-5 border border-white border-t-[var(--color-primary)] rounded-[50%] animate-spin"></div>}
            </button> */}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
