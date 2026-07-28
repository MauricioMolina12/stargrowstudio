import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

import type { ServiceNavGroup } from '@/sanity/types/service';

type FooterLink = { label: string; href: string };
type Props = {
  /** Servicios (padres + hijos) para las columnas. Vienen de Sanity. */
  services?: ServiceNavGroup[];
};

const COMPANY_LINKS: FooterLink[] = [
  { label: 'Artículos', href: '/blog' },
  { label: 'Nuestra historia', href: '/our-history' },
  { label: 'Preguntas frecuentes', href: '/faq' },
  { label: 'Planes', href: '/#planes' },
  { label: 'Portafolio', href: '/portafolio' },
];

const CONTACT = [
  { icon: Mail, label: 'stargrowstudio@gmail.com', href: 'mailto:stargrowstudio@gmail.com' },
  { icon: Phone, label: '+57 300 385 6084', href: 'https://wa.me/573003856084' },
  {
    icon: MapPin,
    label: 'Barranquilla, Atlántico',
    href: 'https://www.google.com/maps/search/?api=1&query=Barranquilla+Atlantico',
  },
];

const LEGAL: FooterLink[] = [
  { label: 'Política de cookies', href: '#' },
  { label: 'Términos de servicio', href: '#' },
  { label: 'Política de privacidad', href: '/privacy-policy' },
];

const linkClass =
  'text-sm text-[var(--color-dark-gray)] transition-colors hover:text-[var(--color-primary-to-white)]';
const headingClass = 'mb-4 text-sm font-bold text-[var(--color-primary-to-white)]';

const Footer = ({ services }: Props) => {
  const year = new Date().getFullYear();
  const columns = services ?? [];

  return (
    <footer className="w-full border-t border-[var(--color-gray)] bg-[var(--color-white-to-primary)]">
      <div className="container-app py-12">
        {/* Marca + tagline */}
        <div className="flex flex-col items-start justify-between gap-5 border-b border-[var(--color-gray)] pb-8 md:flex-row md:items-center">
          <Link href="/" className="flex items-center gap-3">
            <img src="/img/logo.png" alt="Star Grow Studio" className="h-7 w-auto object-contain" />
            <span className="flex flex-col leading-snug text-[18px] font-extrabold tracking-tight text-[var(--color-primary-to-white)]">
              STAR GROW{' '}
              <span className="font-light tracking-[0.3em] text-[10px] text-[var(--color-dark-gray)]">STUDIO</span>
            </span>
          </Link>
          <p className="text-sm text-[var(--color-dark-gray)] md:text-right">
            Transformación digital{' '}
            <span className="font-semibold text-[var(--color-primary-to-white)]">que realmente funciona</span>
          </p>
        </div>

        {/* Columnas: una por servicio (subservicios de la nav) + Empresa */}
        <div className="grid grid-cols-2 gap-8 py-10 md:grid-cols-3 xl:grid-cols-5">
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
              <Link href={`/services/${svc.path}`} className={`${headingClass} block hover:opacity-80`}>
                {svc.service}
              </Link>
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

        {/* Contacto (fila horizontal) */}
        <div className="flex flex-col gap-4 border-t border-[var(--color-gray)] py-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
          {CONTACT.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--color-gray)] text-[var(--color-primary-to-white)] transition-colors group-hover:border-[var(--color-primary)]">
                  <Icon size={16} />
                </span>
                <span className={linkClass}>{c.label}</span>
              </a>
            );
          })}
        </div>

        {/* Barra inferior */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--color-gray)] pt-6 md:flex-row">
          <span className="text-xs text-[var(--color-dark-gray)]">
            © {year} Star Grow Studio. Todos los derechos reservados.
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {LEGAL.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm text-[var(--color-dark-gray)] min-h-[44px] inline-flex items-center transition-colors hover:text-[var(--color-primary-to-white)]"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;