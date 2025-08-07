'use client';

import { useIntersectionObserver } from "@/app/hooks/useIntersectionObserver";
import { useEffect, useState } from "react";


const tabs: { label: string; key: string }[] = [
    {
        label: 'Desarrollo',
        key: 'development'
    },
    {
        label: 'Diseño',
        key: 'design'
    },
    {
        label: 'Consultoría',
        key: 'consulting'
    },
    {
        label: 'Marketing',
        key: 'marketing'
    }
]

type Plan = {
    category: string;
    name: string;
    tier: string;
    priceOld?: string;
    priceNew: string;
    description: string;
    features: {
        included: string[];
        excluded: string[];
    };
};

type Tab = {
    label: string;
    key: string;
}


let plans: Plan[] = [
    {
        category: "development",
        name: "Plan Web Express",
        tier: "Básico",
        priceOld: "1.800.000",
        priceNew: "1.600.000",
        description:
            "Pequeños negocios, emprendedores, freelancers que necesitan una presencia online rápida y profesional.",
        features: {
            included: [
                "Diseño basado en plantilla responsiva.",
                "Hasta 5 secciones/páginas estáticas.",
                "Carga inicial de contenido proporcionado por el cliente.",
                "Formulario de contacto básico.",
                "Configuración de dominio y alojamiento (asesoramiento).",
                "Optimización SEO básica y velocidad de carga inicial.",
                "Una ronda de revisiones y garantía de 30 días post-lanzamiento.",
            ],
            excluded: [
                "Diseño UI/UX a medida o identidad de marca.",
                "Creación de contenido (textos, imágenes, videos).",
                "Funcionalidades de e-commerce o gestión de usuarios.",
                "Mantenimiento y actualizaciones continuas.",
            ],
        },
    },
    {
        category: "development",
        name: "Plan Web Pro",
        tier: "Popular",
        priceOld: "3.200.000",
        priceNew: "2.700.000",
        description:
            "Empresas en crecimiento que buscan una web personalizada, optimizada y con funcionalidades avanzadas.",
        features: {
            included: [
                "Diseño UI/UX personalizado y adaptado a tu marca.",
                "Hasta 12 secciones/páginas dinámicas.",
                "Carga y optimización de contenido inicial.",
                "Formularios avanzados de contacto y cotización.",
                "Integración con redes sociales y Google Analytics.",
                "SEO avanzado y optimización de velocidad.",
                "2 rondas de revisiones y garantía de 60 días post-lanzamiento.",
                "Soporte técnico prioritario durante 2 meses.",
            ],
            excluded: [
                "E-commerce completo o gestión de usuarios.",
                "Creación de contenido multimedia profesional.",
                "Mantenimiento anual incluido.",
            ],
        },
    },
    {
        category: "development",
        name: "Plan Web Elite",
        tier: "Premium",
        priceOld: "6.000.000",
        priceNew: "4.800.000",
        description:
            "Grandes empresas o proyectos que requieren soluciones a medida, integración de sistemas y soporte continuo.",
        features: {
            included: [
                "Diseño UI/UX exclusivo y branding completo.",
                "Sitio web ilimitado en secciones y funcionalidades.",
                "Desarrollo de módulos personalizados (e-commerce, membresías, etc.).",
                "Integración con APIs y sistemas externos.",
                "Creación de contenido profesional (textos, imágenes, videos).",
                "SEO profesional y campañas de marketing digital iniciales.",
                "Soporte y mantenimiento durante 1 año.",
                "Capacitación personalizada para tu equipo.",
                "Actualizaciones y mejoras continuas.",
                "Consultoría estratégica mensual.",
                "Dominio y hosting premium incluidos el primer año.",
            ],
            excluded: [],
        },
    },

    // DISEÑO
    {
        category: "design",
        name: "Branding Express",
        tier: "Básico",
        priceNew: "900.000",
        description:
            "Identidad visual básica para emprendimientos y marcas personales.",
        features: {
            included: [
                "Logo básico (una versión).",
                "Paleta de colores y tipografía recomendada.",
                "Entrega en formato digital listo para uso.",
            ],
            excluded: [
                "Manual de marca completo.",
                "Diseño de piezas para redes sociales.",
                "Identidad visual avanzada o storytelling visual.",
            ],
        },
    },
    {
        category: "design",
        name: "Branding Pro",
        tier: "Popular",
        priceNew: "1.800.000",
        description:
            "Branding profesional con entregables completos para negocios en crecimiento.",
        features: {
            included: [
                "Diseño de logo profesional con variantes.",
                "Manual de marca completo.",
                "Tipografías, iconografía, patrones gráficos.",
                "Diseño de tarjetas de presentación.",
                "Diseño de piezas para redes sociales.",
            ],
            excluded: [
                "Plantillas corporativas (pitch, presentaciones, etc).",
                "Animaciones de logo o brand book interactivo.",
            ],
        },
    },
    {
        category: "design",
        name: "Branding Elite",
        tier: "Premium",
        priceNew: "3.200.000",
        description: "Diseño de marca completo + material de marketing visual.",
        features: {
            included: [
                "Todo lo del plan Pro.",
                "Kit de marca digital e impreso.",
                "Presentación corporativa editable.",
                "Plantillas para pitch y redes sociales.",
                "Storytelling visual y consultoría creativa.",
            ],
            excluded: [],
        },
    },

    // CONSULTORÍA
    {
        category: "consulting",
        name: "Consultoría Inicial",
        tier: "Básico",
        priceNew: "1.200.000",
        description: "Diagnóstico digital y recomendaciones puntuales.",
        features: {
            included: [
                "Análisis de presencia digital.",
                "Benchmark con competidores.",
                "Informe de recomendaciones.",
            ],
            excluded: ["Plan de acción detallado.", "Seguimiento posterior."],
        },
    },
    {
        category: "consulting",
        name: "Consultoría Estratégica",
        tier: "Popular",
        priceNew: "2.400.000",
        description: "Auditoría digital + roadmap estratégico.",
        features: {
            included: [
                "Todo lo del plan básico.",
                "Workshops de descubrimiento.",
                "Plan de acción a 3-6 meses.",
                "Reunión de seguimiento mensual.",
            ],
            excluded: [
                "Implementación de herramientas.",
                "Consultoría legal o financiera.",
            ],
        },
    },
    {
        category: "consulting",
        name: "Consultoría Integral",
        tier: "Premium",
        priceNew: "4.800.000",
        description: "Acompañamiento 360º en procesos tecnológicos y digitales.",
        features: {
            included: [
                "Todo lo del plan estratégico.",
                "Acompañamiento continuo.",
                "Revisión y análisis de métricas.",
                "Consultoría especializada mensual.",
                "Soporte en implementación técnica.",
            ],
            excluded: [],
        },
    },

    // MARKETING
    {
        category: "marketing",
        name: "Marketing Starter",
        tier: "Básico",
        priceNew: "1.000.000",
        description: "Lanzamiento digital con campañas base.",
        features: {
            included: [
                "Configuración de redes y perfiles.",
                "1 campaña publicitaria (meta o Google).",
                "Diseño de 4 posts iniciales.",
            ],
            excluded: ["Manejo mensual de redes.", "Análisis y reportes de campaña."],
        },
    },
    {
        category: "marketing",
        name: "Marketing Pro",
        tier: "Popular",
        priceNew: "2.200.000",
        description: "Gestión mensual de campañas y analítica.",
        features: {
            included: [
                "Todo lo del Starter.",
                "Gestión de redes sociales (hasta 2).",
                "Campañas mensuales (meta/Google).",
                "Informe mensual de resultados.",
                "Optimización de campañas y segmentación.",
            ],
            excluded: [
                "Creación de contenido audiovisual profesional.",
                "Email marketing o CRM.",
            ],
        },
    },
    {
        category: "marketing",
        name: "Marketing 360",
        tier: "Premium",
        priceNew: "4.000.000",
        description: "Estrategia, contenido, pauta y reporting integral.",
        features: {
            included: [
                "Todo lo del Pro.",
                "Producción de contenido profesional (videos, fotos).",
                "Email marketing, newsletters y automatización.",
                "Consultoría y análisis mensual.",
                "Optimización multicanal.",
            ],
            excluded: [],
        },
    },
]



const Plans = () => {
    const [tabActive, setTab] = useState('development');
    const [plansView, setPlansView] = useState<Plan[]>([]);

    useIntersectionObserver('.parallax', { threshold: 0.4 }, 'all');


    useEffect(() => {
        setTabActive('development');
    }, []);


    function setTabActive(tab: string) {
        const filtered = plans.filter((plan) => plan.category === tab);
        setPlansView(filtered);
        setTab(tab);
    }

    return (
        <main className="w-full min-h-[100vh] py-12 px-4 lg:w-4/5 lg:mx-auto lg:my-0">
            <header className="w-full flex flex-col items-center justify-center">
                <span className="parallax text-[var(--color-primary-to-white)]">Planes a tu medida</span>
                <h1 className="parallax text-3xl text-center font-bold lg:w-[70%] lg:text-4xl"><span className="text-[var(--color-primary-to-white)]">Diseñamos el éxito juntos:</span> Explora nuestras soluciones flexibles 📈</h1>
            </header>
            <nav className="tabs w-full h-20 overflow-x-auto flex items-center gap-4 p-2">
                {tabs.map((tab) => (
                    <button key={tab.key} onClick={() => setTabActive(tab.key)} className="parallax relative cursor-pointer text-gray-600 text-[1rem]" style={{
                        color: tabActive === tab.key ? 'var(--color-primary)' : 'initial',
                        fontWeight: tabActive === tab.key ? 'bold' : '300'
                    }}
                    >{tab.label}
                        {tabActive === tab.key && (
                            <span className="line-active absolute left-0 bottom-0 w-full h-0.5 bg-[var(--color-primary)]"></span>
                        )}
                    </button>
                ))}
            </nav>
            <section className="w-full overflow-x-auto lg:overflow-y-hidden py-8">
                <div className="flex gap-4 px-4 min-w-full snap-x snap-mandatory scroll-smooth">
                    {plansView.map((plan) => (
                        <div
                            key={plan.name}
                            className={`parallax relative snap-start w-[340px] flex-shrink-0 rounded-2xl overflow-hidden border ${plan.tier === "Premium"
                                ? "bg-[var(--color-primary)] text-white border-none"
                                : "bg-[#FAFBFF] text-[var(--color-secondary)] border-gray-100 border-2"
                                }`}>
                            <div className="relative p-6 flex flex-col justify-between h-full">
                                {/* Cinta en la esquina */}
                                <div className="absolute top-0 right-0 w-[120px] h-[120px] overflow-hidden">
                                    <span className="absolute w-[180px] py-1 text-xs font-bold text-center bg-[var(--color-yellow-light)] text-black rotate-45 top-[30px] right-[-45px]">
                                        {plan.tier}
                                    </span>
                                </div>

                                <h2 className="text-lg font-semibold mb-2">{plan.name}</h2>

                                {/* Precios */}
                                <div className="flex flex-col items-center py-4">
                                    {plan.priceOld && (
                                        <p className={`text-xs line-through text-gray-400 ${plan.tier === "Premium" ? 'text-white' : 'initial'}`}>${plan.priceOld}</p>
                                    )}
                                    <p className="text-xl font-bold text-[var(--color-yellow-light)]">
                                        ${plan.priceNew}
                                        <span className="text-sm font-normal text-white"> <span className={`font-semibold ${plan.tier === 'Premium' ? 'text-white' : 'text-gray-700'}`}>(COP)</span></span>
                                    </p>
                                </div>

                                <p className="text-sm mb-4 text-justify leading-relaxed">{plan.description}</p>


                                <ul className="list-none text-left text-sm mb-6 space-y-1">
                                    {plan.features.included.map((feature, i) => (
                                        <li key={`i-${i}`} className={`'flex items-center text-gray-700' ${plan.tier === 'premium' ? 'text-gray-50' : 'initial'}`}>
                                            <span className="text-green-400 font-bold text-lg mr-2">✔</span>
                                            {feature}
                                        </li>
                                    ))}
                                    {plan.features.excluded.map((feature, i) => (
                                        <li key={`e-${i}`} className="flex items-center text-gray-400 line-through">
                                            <span className="text-red-400 font-bold text-lg mr-2">✕</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => console.log("Solicitado", plan.name)}
                                    className="cursor-pointer bg-[var(--color-yellow-light)] text-black font-medium px-4 py-2 rounded-full mt-auto hover:bg-[#ffd76b] transition-colors"
                                >
                                    Solicitar este servicio
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


        </main>
    )
}

export default Plans;