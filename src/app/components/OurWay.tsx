'use client';

import { useMeeting } from "../context/MeetingContext";
import { useComponentMeeting } from "../hooks/useComponentMeeting";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const OurWay = () => {

    const steps: { icon?: string; title: string; description: string; }[] = [
        {
            icon: "icons/search.png",
            title: "Descubrimiento",
            description:
                "Analizamos tus necesidades, objetivos y público. Esta etapa es clave para entender tu marca y definir el rumbo correcto.",
        },
        {
            icon: "icons/calendar.png",
            title: "Estrategia y Planificación",
            description:
                "Definimos objetivos claros y un plan estratégico para guiar tu proyecto con éxito.",
        },
        {
            icon: "icons/design.png",
            title: "Diseño Creativo",
            description:
                "Nuestro equipo diseña piezas visuales impactantes: desde tu logotipo hasta contenido para redes.",
        },
        {
            icon: "icons/computer.png",
            title: "Desarrollo & Producción",
            description:
                "Construimos tu sitio web, e-commerce o app, y creamos contenido audiovisual de alta calidad.",
        },
        {
            icon: "icons/cohete.png",
            title: "Lanzamiento y Activación",
            description:
                "Ponemos en marcha tu proyecto en redes, campañas publicitarias, mailing, SEO y más.",
        },
        {
            icon: "icons/analisis.png",
            title: "Medición y Optimización",
            description:
                "Monitorizamos resultados y ajustamos estrategias para lograr impacto y crecimiento constante.",
        },
    ]


    useIntersectionObserver('.parallax', { threshold: 0.4 }, 'all');
    const { show } = useMeeting();

    return (
        <div className="w-full h-auto min-h-[100vh] lg:max-w-[70%] lg:mx-auto lg:my-0">
            <aside className="w-full h-1/2 flex flex-col items-center justify-center gap-2.5 p-4 parallax">
                <span className="text-[var(--color-primary-to-white)]">Como conectamos</span>
                <h1 className="text-3xl text-center font-bold lg:w-[70%] lg:text-4xl">Nuestro<span className="text-[var(--color-primary-to-white)]"> camino </span>hacia proyectos que brillan 🛣️✨</h1>
            </aside>
            <main className="w-full h-1/2 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 lg:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] p-4">
                {steps.map((step, index) => (
                    <div key={index} className="item parallax bg-[var(--color-white)] w-full h-[240px] rounded-2xl relative flex flex-col justify-center gap-4 p-4">
                        <span className="absolute top-[-10px] left-[-10px] bg-[var(--color-primary)] text-white p-3 [clip-path:circle()]">
                            {index + 1}
                        </span>
                        <img className="w-10 h-10 bg-gray-100 p-2 rounded-2xl" src={step.icon} alt={`Icono de: ${step.title}`} />
                        <h2 className="text-[1rem] font-[600] text-[var(--color-dark)] dark:text-white">{step.title}</h2>
                        <p className="text-[var(--color-dark-gray)] text-[.9rem]">{step.description}</p>
                    </div>
                ))}
            </main>
            <article className="call-action w-full h-[250px] lg:h-[170px] p-4 parallax">
                <div className="inner w-full h-full p-3 rounded-xl bg-[var(--color-primary)] flex flex-col lg:flex-row justify-between lg:items-center items-start">
                    <div className="description w-full h-1/2 flex flex-col gap-3">
                        <h2 className="text-white font-bold text-[1.3rem]">¿Estás listo para llevar tu proyecto al siguiente nivel?</h2>
                        <p className="text-gray-200">Contáctanos hoy mismo y comencemos a trabajar juntos en tu próximo proyecto</p>
                    </div>
                    <button className="cursor-pointer w-fit bg-white p-3 text-nowrap rounded-[10px] font-medium text-[var(--color-primary)]" onClick={show}>Solicitar una cita</button>
                </div>
            </article>
        </div>
    )
}

export default OurWay;