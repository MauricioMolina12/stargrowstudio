import Link from 'next/link';
import { Mail, MapPin, Instagram } from 'lucide-react';
import RevisitConsentButton from '@/app/components/consent/RevisitConsentButton';

import type { ServiceNavGroup } from '@/sanity/types/service';

type FooterLink = { label: string; href: string; action?: 'consent' };
type Props = {
  /** Servicios (padres + hijos) para las columnas. Vienen de Sanity. */
  services?: ServiceNavGroup[];
};

const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.52 3.48A11.8 11.8 0 0 0 12.04 0C5.4 0 0 5.4 0 12.04c0 2.12.56 4.19 1.62 6.01L0 24l6.12-1.6a12 12 0 0 0 5.92 1.51h.01C18.64 23.91 24 18.55 24 11.96c0-3.2-1.25-6.21-3.48-8.48ZM12.05 21.9h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.63.95.97-3.54-.24-.37a9.88 9.88 0 0 1-1.52-5.31C2.22 6.57 6.57 2.22 12.04 2.22c2.63 0 5.1 1.03 6.96 2.89a9.77 9.77 0 0 1 2.88 6.95c0 5.46-4.36 9.84-9.83 9.84Zm5.4-7.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.47.13-.62.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.48s1.08 2.87 1.23 3.07c.15.2 2.13 3.26 5.16 4.57.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
  </svg>
);

const COMPANY_LINKS: FooterLink[] = [
  { label: 'Artículos', href: '/blog' },
  { label: 'Nuestra historia', href: '/our-history' },
  { label: 'Preguntas frecuentes', href: '/faq' },
  { label: 'Planes', href: '/#planes' },
  { label: 'Portafolio', href: '/portafolio' },
];

const CONTACT_BUTTONS = [
  {
    icon: Instagram,
    label: 'Instagram (@stargrowstudio)',
    href: 'https://www.instagram.com/stargrowstudio/',
  },
  {
    icon: WhatsAppIcon,
    label: 'WhatsApp (+57 300 385 6084)',
    href: 'https://wa.me/573003856084',
  },
  {
    icon: Mail,
    label: 'Correo electrónico (stargrowstudio@gmail.com)',
    href: 'mailto:stargrowstudio@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Ubicación (Barranquilla, Atlántico)',
    href: 'https://www.google.com/maps/search/?api=1&query=Barranquilla+Atlantico',
  },
];

const LEGAL: FooterLink[] = [
  { label: 'Privacidad', href: '/privacidad' },
  { label: 'Términos y condiciones', href: '/terminos-y-condiciones' },
  // { label: 'Preferencias de cookies', href: '#', action: 'consent' },
];

const linkClass =
  'text-sm text-[var(--color-dark-gray)] transition-colors hover:text-[var(--color-primary-bright)]';
const headingClass = 'mb-4 text-sm font-bold text-[var(--color-primary-to-white)]';

const Footer = ({ services }: Props) => {
  const year = new Date().getFullYear();
  const columns = services ?? [];

  return (
    <footer className="w-full border-t border-[var(--color-gray)] bg-[var(--color-white-to-primary)]">
      <div className="container-app py-12 lg:py-16">
        {/* Bloque principal: Columna de marca (con iconos cuadrados redondeados) + Columnas de enlaces */}
        <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12 lg:gap-8">
          {/* Columna izquierda: Logo + Descripción + Botones de redes/contacto */}
          <div className="lg:col-span-4 lg:pr-6">
            <Link href="/" className="inline-flex items-center gap-3">
              <img
                src="/img/logo.png"
                alt="Star Grow Studio"
                className="h-7 w-auto object-contain dark:hidden"
              />
              <img
                src="/img/logo-white.png"
                alt="Star Grow Studio"
                className="hidden h-7 w-auto object-contain dark:block"
              />
              <span className="flex flex-col leading-snug text-[18px] font-extrabold tracking-tight text-[var(--color-primary-to-white)]">
                STAR GROW{' '}
                <span className="font-light tracking-[0.3em] text-[10px] text-[var(--color-dark-gray)]">
                  STUDIO
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-dark-gray)]">
              Estrategia, diseño UI/UX y desarrollo de software a medida para transformar y hacer
              crecer tu negocio digital.
            </p>

            {/* Fila de iconos cuadrados redondeados estilo referencia */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              {CONTACT_BUTTONS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    title={item.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-dark-gray)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-primary-bright)] hover:text-[var(--color-primary-bright)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-bright)]"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Columnas derechas: Empresa + Servicios */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 xl:grid-cols-5">
            <div>
              <h3 className={headingClass}>Empresa</h3>
              <ul className="space-y-3">
                {COMPANY_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {columns.map((svc) => (
              <div key={svc.slug}>
                <span className={`${headingClass} block`}>{svc.service}</span>
                <ul className="space-y-3">
                  {svc.children?.map((child) => (
                    <li key={child.slug}>
                      <Link href={`/services/${child.path}`} className={linkClass}>
                        {child.service}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Barra inferior: Copyright + Legales */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--color-gray)] pt-6 md:flex-row">
          <span className="text-xs text-[var(--color-dark-gray)]">
            © {year} Star Grow Studio. Todos los derechos reservados.
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {LEGAL.map((l) =>
              l.action === 'consent' ? (
                <RevisitConsentButton
                  key={l.label}
                  label={l.label}
                  className="text-sm text-[var(--color-dark-gray)] min-h-[44px] inline-flex items-center transition-colors hover:text-[var(--color-primary-to-white)]"
                />
              ) : (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-sm text-[var(--color-dark-gray)] min-h-[44px] inline-flex items-center transition-colors hover:text-[var(--color-primary-to-white)]"
                >
                  {l.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
