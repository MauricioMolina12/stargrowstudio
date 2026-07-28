'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { ChevronDown, ChevronRight, FolderKanban, HelpCircle, Rocket, ArrowRight, Search } from "lucide-react";

import { useIsDesktop } from "@/app/hooks/useIsDesktop";
import type { ServiceNavGroup } from "@/sanity/types/service";
import { getIcon } from "./nav/iconMap";
import { useKeyboardShortcut } from "@/app/hooks/useKeyboardShortcut";
import SearchModal from "@/app/components/search/SearchModal";

type Props = {
  services?: ServiceNavGroup[];
};

const EXPLORE_LINKS = [
  { icon: FolderKanban, title: "Portafolio", description: "Proyectos y casos que hemos hecho realidad.", href: "/portafolio" },
  { icon: HelpCircle, title: "Preguntas frecuentes", description: "Resolvemos las dudas más comunes.", href: "/faq" },
  { icon: Rocket, title: "Nuestra historia", description: "Quiénes somos y cómo trabajamos.", href: "/our-history" },
];

const EXPLORE_FEATURED = {
  title: "¿Cómo hacer una página web?",
  description: "Guía práctica con todo lo que debes saber antes de lanzar tu sitio.",
  image: "/img/how-create-website.png",
  href: "/blog/como-hacer-una-pagina-web",
};

const SERVICE_ACCENTS: Record<string, string> = {
  "desarrollo-de-software": "#5656b5",
  "diseno": "#c026d3",
  "fotografia": "#ea580c",
  "consultoria": "#0d9488",
};
const DEFAULT_ACCENT = "#5656b5";

const routeStyles: Record<string, { nav: string; logo: string; text: string }> = {
  "/privacy-policy": {
    nav: "bg-[var(--color-primary)] border-transparent",
    logo: "/logo-white.png",
    text: "text-white",
  },
};

const defaultStyle = {
  nav: "bg-[var(--color-white-to-primary)]/80 backdrop-blur-md border-[var(--color-gray)]",
  logo: "/logo.png",
  text: "text-[var(--color-primary-to-white)]",
};

const NavBar = ({ services }: Props) => {
  const pathname = usePathname();
  const isDesktop = useIsDesktop();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  useKeyboardShortcut(openSearch);

  const style = routeStyles[pathname] ?? defaultStyle;
  const menuServices = services ?? [];

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openOn = (key: string) => {
    if (!isDesktop) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(key);
  };
  const closeOn = () => {
    if (!isDesktop) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 200);
  };
  const toggleMobile = (key: string) => {
    if (!isDesktop) setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const closeAll = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(null);
    setMobileOpen(false);
  };

  const isActive = (href: string) => pathname === href;

  const linkClass = (active = false) =>
    `flex w-full items-center justify-between gap-1 rounded-lg px-3 py-2.5 text-[0.92rem] font-medium transition-colors min-h-[44px] lg:w-auto ${
      active
        ? "text-[var(--color-primary)] lg:bg-[var(--color-primary-tint)]"
        : `${style.text} hover:bg-[var(--color-primary-tint)] hover:text-[var(--color-primary)]`
    }`;

  return (
    <nav className={`w-full sticky top-0 left-0 z-50 border-b ${style.nav}`}>
      <div className="container-app flex h-16 items-center">
        {/* Logo - left */}
        <Link href="/" onClick={closeAll} className="flex shrink-0 items-center gap-2.5">
          <img src={style.logo} alt="Star Grow Studio" className="h-8 w-auto object-contain" />
          <span className={`hidden whitespace-nowrap text-lg font-bold tracking-tight sm:inline ${style.text}`}>
            Star Grow Studio
          </span>
        </Link>

        {/* Search input - center (desktop only) */}
        <button
          onClick={openSearch}
          className="mx-auto hidden h-9 w-full max-w-md items-center gap-2.5 rounded-full border border-black/[0.08] bg-black/[0.03] px-4 text-left text-[0.85rem] text-[var(--color-dark-gray)] transition-colors hover:border-black/[0.15] hover:bg-black/[0.05] lg:flex"
          aria-label="Abrir buscador (Ctrl+K)"
        >
          <Search className="h-4 w-4 shrink-0" strokeWidth={1.5} />
          <span className="flex-1 truncate">Buscar servicios, proyectos...</span>
          <kbd className="shrink-0 rounded-md border border-black/[0.08] px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-dark-gray)]">
            Ctrl+K
          </kbd>
        </button>

        {/* Mobile menu + hamburger */}
        <button
          aria-label="Abrir menú"
          onClick={() => setMobileOpen((p) => !p)}
          className="ml-auto flex min-h-[44px] min-w-[44px] items-center justify-center lg:hidden"
        >
          <div className="flex h-5 w-7 flex-col justify-between">
            <span className={`h-[3px] w-full rounded bg-[var(--color-primary)] transition-all duration-300 ${mobileOpen ? "translate-y-[8px] rotate-45" : ""}`} />
            <span className={`h-[3px] w-full rounded bg-[var(--color-primary)] transition-all duration-300 ${mobileOpen ? "scale-0 opacity-0" : ""}`} />
            <span className={`h-[3px] w-full rounded bg-[var(--color-primary)] transition-all duration-300 ${mobileOpen ? "-translate-y-[8px] -rotate-45" : ""}`} />
          </div>
        </button>

        {/* Desktop nav links + mobile dropdown */}
        <ul
          className={`
            absolute left-0 top-full max-h-[calc(100vh-4rem)] w-full flex-col gap-1 overflow-y-auto border-b border-[var(--color-gray)] bg-[var(--color-white-to-primary)] p-4
            lg:static lg:flex lg:max-h-none lg:w-auto lg:flex-row lg:items-center lg:gap-1 lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:ml-4
            ${mobileOpen ? "flex" : "hidden"}
            lg:flex
          `}
        >
          {/* Mobile search button (visible only in mobile menu) */}
          <li className="lg:hidden">
            <button
              onClick={openSearch}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-3 text-[0.92rem] font-medium text-[var(--color-primary-to-white)] min-h-[44px] transition-colors hover:bg-[var(--color-primary-tint)]"
            >
              <Search className="h-4 w-4" strokeWidth={1.5} />
              Buscar servicios, proyectos...
            </button>
          </li>

          <li className="lg:static" onMouseEnter={() => openOn("servicios")} onMouseLeave={closeOn}>
            <button onClick={() => toggleMobile("servicios")} className={linkClass(openDropdown === "servicios")}>
              Servicios
              <ChevronDown size={16} className={`transition-transform duration-300 ${openDropdown === "servicios" ? "rotate-180" : ""}`} />
            </button>
            {openDropdown === "servicios" && (
              <div onMouseEnter={() => openOn("servicios")} onMouseLeave={closeOn} className="lg:fixed lg:inset-x-0 lg:top-16 lg:border-y lg:border-[var(--color-gray)] lg:bg-[var(--color-white-to-primary)]">
                <div className="container-app grid grid-cols-1 gap-x-8 gap-y-6 py-4 sm:grid-cols-2 lg:grid-cols-4 lg:py-8">
                  {menuServices.map((svc) => {
                    const accent = SERVICE_ACCENTS[svc.slug] ?? DEFAULT_ACCENT;
                    return (
                      <div key={svc.slug}>
                        <Link href={`/services/${svc.path}`} onClick={closeAll} className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide" style={{ color: accent }}>
                          {svc.service}
                        </Link>
                        <ul className="space-y-0.5">
                          {svc.children?.map((child) => {
                            const Icon = getIcon(child.iconName ?? undefined);
                            return (
                              <li key={child.slug}>
                                <Link href={`/services/${child.path}`} onClick={closeAll} className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-black/[0.04]">
                                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${accent}1a`, color: accent }}>
                                    <Icon size={16} />
                                  </span>
                                  <span>
                                    <span className="flex items-center gap-2">
                                      <span className="text-[13px] font-semibold text-[var(--color-primary-to-white)]">{child.service}</span>
                                      {child.badge && <span className="rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ backgroundColor: `${accent}1a`, color: accent }}>{child.badge}</span>}
                                    </span>
                                    <span className="block text-[12px] leading-snug text-[var(--color-dark-gray)]">{child.shortDescription}</span>
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </li>

          <li className="relative" onMouseEnter={() => openOn("explorar")} onMouseLeave={closeOn}>
            <button onClick={() => toggleMobile("explorar")} className={linkClass(openDropdown === "explorar")}>
              Explorar
              <ChevronDown size={16} className={`transition-transform duration-300 ${openDropdown === "explorar" ? "rotate-180" : ""}`} />
            </button>
            {openDropdown === "explorar" && (
              <div onMouseEnter={() => openOn("explorar")} onMouseLeave={closeOn} className="lg:absolute lg:right-0 lg:top-full lg:pt-3">
                <div className="flex flex-col gap-4 rounded-xl border border-[var(--color-gray)] bg-[var(--color-white-to-primary)] p-4 lg:w-[560px] lg:flex-row">
                  <ul className="flex-1 space-y-1">
                    {EXPLORE_LINKS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.href}>
                          <Link href={item.href} onClick={closeAll} className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-[var(--color-primary-tint)]">
                            <Icon size={18} className="mt-0.5 shrink-0 text-[var(--color-primary)]" />
                            <span>
                              <span className="block text-[13px] font-semibold text-[var(--color-primary-to-white)]">{item.title}</span>
                              <span className="block text-[12px] leading-snug text-[var(--color-dark-gray)]">{item.description}</span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <Link href={EXPLORE_FEATURED.href} onClick={closeAll} className="group flex flex-col overflow-hidden rounded-xl border border-[var(--color-gray)] transition-colors hover:border-[var(--color-primary)] lg:w-[240px]">
                    <figure className="h-28 overflow-hidden bg-[var(--color-gray)]">
                      <img src={EXPLORE_FEATURED.image} alt={EXPLORE_FEATURED.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </figure>
                    <div className="flex flex-col gap-1 p-3">
                      <span className="text-[13px] font-semibold text-[var(--color-primary-to-white)]">{EXPLORE_FEATURED.title}</span>
                      <span className="text-[12px] leading-snug text-[var(--color-dark-gray)]">{EXPLORE_FEATURED.description}</span>
                      <span className="mt-1 flex items-center gap-1 text-[12px] font-medium text-[var(--color-primary)]">Leer más <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" /></span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </li>

          <li className="mt-3 lg:mt-0 lg:ml-3">
            <Link href="/cotizar" onClick={closeAll} className="flex items-center justify-center gap-1.5 rounded-full bg-[var(--color-primary)] px-6 py-3 text-[0.9rem] font-semibold text-white min-h-[44px] transition-colors hover:bg-[var(--color-secondary)] active:scale-[0.97] lg:py-2">
              Cotizar ahora
              <ChevronRight size={16} />
            </Link>
          </li>
        </ul>
      </div>

      {searchOpen && <SearchModal onClose={closeSearch} />}
    </nav>
  );
};

export default NavBar;