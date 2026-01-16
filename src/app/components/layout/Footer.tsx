'use client';
import { LucideIcon, Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';


type Link = {
    label: string;
    href: string;
    path?: string;
    icon?: LucideIcon;
}

type Column = {
    title: string;
    links: Link[];
}


type Service = {
    label: string;
    slug: string;
}

const Footer = () => {
    const router = useRouter();
    const [today, setToday] = useState(0);

    function detailsService(Service: Service) {
        router.push(`/services/${Service.slug}`);
    }


    useEffect(() => {
        setToday(new Date().getFullYear());
    }, [])

    const Columns: Column[] = [
        {
            title: 'Sobre nosotros',
            links: [
                // { label: 'Sobre Star Grow', href: '' },
                // { label: 'Nuestra historia', href: '' },
                { label: 'Artículos', href: '/articles' },
                // { label: 'Empleos', href: '' },
                // { label: 'Testimonios', href: '' },
            ]
        },
        {
            title: 'Productos y servicios',
            links: [
                { label: 'Planes', href: '' },
            ]
        },
        {
            title: 'Contacto',
            links: [
                {
                    label: 'stargrowstudio@gmail.com',
                    href: 'mailto:stargrowstudio@gmail.com',
                    icon: Mail
                },
                {
                    label: '+57 300 385 6084',
                    href: 'tel:+573003856084',
                    icon: Phone
                },
                {
                    label: 'Barranquilla, Atlántico',
                    href: 'https://www.google.com/maps/search/?api=1&query=Barranquilla+Atlántico',
                    icon: MapPin
                },
            ]
        }

    ];


    const payments_methods: string[] = [
        '/img/payments-methods/davivienda.png',
        '/img/payments-methods/bancolombia.png',
        '/img/payments-methods/mastercard.png',
        // '/img/payments-methods/visa.svg',
    ]

    return (
        <footer className="w-full bg-[var(--color-light)] flex flex-col justify-center gap-6 w-full p-4 px-8">
            <header className="header flex items-center justify-between">
                <figure className='flex items-center gap-2'>
                    <img src="/logo.png" alt="logo" className="w-8 h-8 object-contain" />
                    <figcaption className="flex flex-col">
                        <h3 className="text-xl font-bold text-[var(--color-primary)]">STAR GROW</h3>
                        <small className="tracking-[10px] text-[10px] text-[var(--color-primary)]">STUDIO</small>
                    </figcaption>
                </figure>
                <span className="text-[.8rem]">Transformación digital que realmente funciona</span>
            </header>
            <hr className="border-gray-200" />
            <div className="links flex items-center justify-between">
                <div className="grid grid-cols-3 w-2/4">
                    {Columns.map((col, idx) => (
                        <div key={idx} className="flex flex-col gap-2">
                            <h3 className="font-semibold text-sm">{col.title}</h3>

                            <ul className="flex flex-col gap-1">
                                {col.links.map((link, index) => {
                                    const Icon = link.icon;

                                    const isInternal = link.href.startsWith("/");

                                    return (
                                        <li key={index} className="text-sm text-gray-500 cursor-pointer flex items-center gap-2">
                                            {Icon && (
                                                <div className="p-2 bg-white rounded-xl">
                                                    <Icon size={16} className="text-[var(--color-primary)] flex-shrink-0" />
                                                </div>
                                            )}

                                            {isInternal ? (
                                                <Link href={link.href} className="hover:underline">
                                                    {link.label}
                                                </Link>
                                            ) : (
                                                <a href={link.href} className="hover:underline">
                                                    {link.label}
                                                </a>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="networks">
                    <div className="flex items-center">
                        {payments_methods.map((pay, idx) => (
                            <figure key={idx} className="w-16 h-10 flex items-center justify-center">
                                <img
                                    src={pay}
                                    alt="payment-method"
                                    className="w-full h-full object-contain"
                                />
                            </figure>

                        ))}
                    </div>
                </div>
            </div>
            <hr className="border-gray-200" />
            <div className="terms-conditions flex items-center justify-between w-full">
                <span className="text-xs">
                    © {today} Star Grow Studio. Todos los derechos reservados.
                </span>
                <div className="grid grid-cols-3 gap-3">
                    <Link href="/legal/cookies-policy" className="text-xs">
                        Política de cookies
                    </Link>
                    <Link href="/legal/terms-of-service" className="text-xs">
                        Términos de servicio
                    </Link>
                    <Link href="/legal/privacy-policy" className="text-xs">
                        Politica de privacidad
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
