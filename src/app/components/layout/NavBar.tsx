'use client';

import { useActiveSection } from "@/app/hooks/useActiveSection";
import useDarkMode from "@/app/hooks/useDarkMode";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useActiveClassScroll } from "@/app/hooks/useScrollNav";
import { usePathname } from 'next/navigation';
import { useState } from "react";
import { useMeeting } from "@/app/context/MeetingContext";


const navItems: { label: string, href: string, path?: string }[] = [
  { label: "Inicio", href: "#inicio", path: '' },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Progreso", href: "#progreso" },
  { label: "Planes", href: "#planes" },
  { label: "Portafolio", href: "#portafolio" },
  { label: "Contacto", href: "#contacto" },
];

const NavBar = () => {
  const { isDark } = useDarkMode();
  const activeSection = useActiveSection(navItems);
  const activeClassScroll = useActiveClassScroll()
  const pathname = usePathname();
  const [stateSideBar, setStateSideBar] = useState(false);
  const { show, isVisible } = useMeeting();


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
                src={isDark ? "/logo-white.png" : "/logo.png"}
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
                ${isDark ? 'bg-white' : 'bg-[var(--color-primary)]'}
                ${stateSideBar ? 'rotate-45 translate-y-[8px]' : ''}
              `}></span>

            <span
              className={`
                w-full h-[4px] rounded-2xl transition-all duration-300 ease-in-out
                ${isDark ? 'bg-white' : 'bg-[var(--color-primary)]'}
                ${stateSideBar ? 'opacity-0 scale-0' : ''}`}></span>

            <span
              className={`
                w-full h-[4px] rounded-2xl transition-all duration-300 ease-in-out
                ${isDark ? 'bg-white' : 'bg-[var(--color-primary)]'}
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
            >
              <Link
                href={`${pathname === "/" ? "" : "/"}${item.href}`}
                className={`lg:text-[0.9rem]  transition-all ${activeSection === item.label
                  ? "text-[var(--color-primary-to-white)] font-bold"
                  : "text-gray-400 hover:text-[var(--color-primary)]"
                  }`}
              >
                {item.label}
              </Link>

              {/* Solo visible en móviles */}
              <ChevronRight className="w-5 h-5 text-[var(--color-primary)] lg:hidden" />
            </li>
          ))}

          {/* Botón */}
          <li className="w-full lg:w-auto lg:ml-auto">
            <button onClick={show} className="cursor-pointer w-full lg:w-auto lg:ml-auto lg:p-3 lg:text-[.9rem] p-4 text-[1.1rem] font-medium text-white bg-[var(--color-primary)] rounded-md text-nowrap">
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
