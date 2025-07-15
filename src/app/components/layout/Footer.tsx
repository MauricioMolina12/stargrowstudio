'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";


type Link = {
    label: string;
    href: string;
    path?: string;
}

type Service = {
    label: string;
    slug: string;
}

const Footer = () => {
    const router = useRouter();
    const year = new Date().getFullYear();


    function detailsService(Service: Service) {
        router.push(`/services/${Service.slug}`);
    }


    const links: Link[] = [
        { label: "Inicio", href: "#inicio", path: '' },
        { label: "Servicios", href: "#servicios" },
        { label: "Nosotros", href: "#nosotros" },
        { label: "Progreso", href: "#progreso" },
        { label: "Planes", href: "#planes" },
        { label: "Portafolio", href: "#portafolio" },
        { label: "Contacto", href: "#contacto" },
    ];

    const services: Service[] = [
        { label: 'Desarrollo de software a su medida', slug: 'desarrollo-software' },
        { label: 'Desarrollo de apps móviles', slug: 'desarrollo-apps' },
        { label: 'Análisis de datos y visualización', slug: 'analisis-datos' },
        { label: 'Arquitectura y gestión de bases de datos', slug: 'bases-datos' },
        { label: 'Consultoría en transformación digital', slug: 'consultoria-transformacion' },
        { label: 'Diseño UX/UI centrado en el usuario', slug: 'diseno-ux-ui' }
    ]

    return (
        <footer className="w-full bg-[var(--color-primary)] text-[var(--color-light)] relative flex flex-col justify-center pt-10 pb-24 xl:pb-16">
            <div className="w-[90%] mx-auto flex flex-col xl:flex-row gap-10">

                {/* Branding */}
                <div className="flex flex-col gap-4 w-full xl:w-1/4 border-b xl:border-none pb-6">
                    <figure className="flex items-center gap-3 w-fit h-fit">
                        <img src="/img/logo-white.png" alt="logo-stargrowstudio" width={26} height={26} />
                        <figcaption className="text-white font-semibold text-xl whitespace-nowrap">
                            Star Grow Studio
                        </figcaption>
                    </figure>
                    <p className="text-[.8rem] text-[var(--color-light)] leading-7 max-w-[80%]">
                        Diseñamos y desarrollamos soluciones digitales que impulsan tu crecimiento. Síguenos en nuestras redes sociales y mantente conectado.
                    </p>
                </div>

                {/* Servicios */}
                <div className="flex flex-col gap-3 w-full xl:w-1/4 border-b xl:border-none pb-6">
                    <h3 className="font-bold text-[var(--color-light)]">Servicios</h3>
                    {services.map((service,index) => (
                        <span key={index} onClick={() => detailsService(service)} className="text-sm text-[var(--color-light)] hover:underline cursor-pointer">{service.label}</span>
                    ))}
                </div>

                {/* Enlaces rápidos */}
                <div className="flex flex-col gap-3 w-full xl:w-1/4 border-b xl:border-none pb-6">
                    <h3 className="font-bold text-[var(--color-light)]">Enlaces rápidos</h3>
                    {links.map((link) => (
                        <Link href={link.href} key={link.href} className="text-sm lg:pl-3 font-medium text-[var(--color-light)] hover:underline">-{link.label}</Link>
                    ))}
                </div>

                {/* Contacto */}
                <div className="flex flex-col gap-3 w-full xl:w-1/4 border-b xl:border-none pb-6">
                    <h3 className="font-bold text-[var(--color-light)]">Contacto</h3>
                    <div className="flex items-center gap-3 text-white">
                        <span className="material-symbols-outlined">email</span>
                        <a href="mailto:jstargrowstudio@gmai.com" className="text-sm hover:underline">jstargrowstudio@gmai.com</a>
                    </div>
                    <div className="flex items-center gap-3 text-white">
                        <span className="material-symbols-outlined">phone</span>
                        <a
                            href="https://wa.me/573008236761"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm hover:underline">
                            +57 3008236761
                        </a>
                    </div>
                    <div className="flex items-center gap-3 text-white">
                        <span className="material-symbols-outlined">place</span>
                        <a
                            href="https://www.google.com/maps/search/?api=1&query=Calle+27+%7B-05,+Sabanalarga,+Atlántico"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm hover:underline">
                            Calle 27 #7B-05
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="w-full bg-[var(--color-secondary)] py-4 absolute bottom-0 left-0">
                <div className="w-[90%] mx-auto flex flex-col xl:flex-row items-center justify-between gap-3">
                    <span className="text-[var(--color-white)] text-center">
                        © {year} StarGrowStudio. Todos los derechos reservados.
                    </span>
                    <div className="flex gap-4">
                        <a href="#" className="text-sm text-[var(--color-light)] hover:underline">Política de privacidad</a>
                        <a href="#" className="text-sm text-[var(--color-light)] hover:underline">Términos de servicio</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
