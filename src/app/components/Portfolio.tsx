import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface Project {
    name: string;
    category: string;
    image: string;
    description: string;
    techs?: { image: string; name: string }[]
}

const projects: Project[] = [
    {
        name: 'Renta GO',
        category: 'web',
        image: '/projects/rentago.jpg',
        description: 'Renta Go es un proyecto innovador de renta de autos diseñado para ofrecer una experiencia rápida, confiable y 100% digital. La plataforma permite a los usuarios alquilar vehículos de forma sencilla y rápida.',
        techs: [
            { image: '/techs/angular.png', name: 'Angular' },
            { image: '/techs/nodejs.png', name: 'Node JS' },
            { image: '/techs/mysql.png', name: 'MySQL' },
        ]
    },
    {
        name: 'Mercadatos SAS BIC',
        category: 'web',
        image: '/projects/mercadatos.png',
        description: "Mercadatos SAS BIC es una empresa especializada en gestión documental, dedicada a optimizar la forma en que las organizaciones administran, protegen y transforman su información.",
        techs: [
            { image: '/techs/angular.png', name: 'Angular' }
        ]
    },
    {
        name: 'Software Programación Lineal',
        category: 'web',
        image: '/projects/PL-software.png',
        description: 'Aplicación desarrollada en Vue para resolver problemas de programación lineal, permitiendo a los usuarios modelar, visualizar y optimizar soluciones de manera intuitiva y eficiente.',
        techs: [
            { image: '/techs/vue.png', name: 'Vue' },
            { image: '/techs/python.png', name: 'Python' },
        ]
    },
    {
        name: 'Vehicle care',
        category: 'design',
        image: '/projects/vehicleCare.png',
        description: 'Vehicle Care es el diseño de una aplicación móvil enfocada en la gestión integral del mantenimiento vehicular. Está pensada para ayudar a los usuarios a llevar el control de sus vehículos de forma sencilla, eficiente y completamente digital.',
        techs: [
            { image: '/techs/figma.png', name: 'Figma' },
        ]
    }
];

const tabs = [
    { name: 'App webs', filterKey: 'web' },
    { name: 'App móviles', filterKey: 'mobile' },
    { name: 'Diseños', filterKey: 'design' }
];

export default function Portfolio() {
    const [currentTab, setCurrentTab] = useState('web');
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);

    useIntersectionObserver('.parallax', { threshold: 0.4 }, 'all');


    useEffect(() => {
        setFilteredProjects(projects.filter(p => p.category === currentTab));
    }, [currentTab]);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;
        const handleScroll = () => {
            const tolerance = 3;
            const scrollLeft = slider.scrollLeft;
            const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
            setIsAtStart(scrollLeft <= tolerance);
            setIsAtEnd(scrollLeft + tolerance >= maxScrollLeft);
        };
        slider.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => slider.removeEventListener('scroll', handleScroll);
    }, [filteredProjects]);

    const scrollSlider = (direction: 'left' | 'right') => {
        const value = direction === 'left' ? -300 : 300;
        sliderRef.current?.scrollBy({ left: value, behavior: 'smooth' });
    };


    return (
        <section className="w-full lg:w-[70%] lg:mx-auto lg:my-0 py-20 dark:bg-[#121245]">
            <div className="w-full max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <span className="parallax text-[var(--color-primary)] text-lg font-medium">Nuestro portafolio</span>
                    <h1 className="parallax text-2xl xl:text-3xl font-bold text-[var(--color-black)] dark:text-[var(--color-yellow)] mt-4">
                        <span className="text-[var(--color-primary)]">Proyectos que transforman ideas</span> en soluciones reales y efectivas 📁
                    </h1>
                </div>

                {/* Tabs */}
                <div className="flex items-center justify-center lg:justify-start gap-6 mb-6 overflow-x-auto overflow-y-hidden parallax">
                    {tabs.map(tab => (
                        <button
                            key={tab.filterKey}
                            onClick={() => setCurrentTab(tab.filterKey)}
                            className="cursor-pointer text-gray-600 text-[1rem]" style={{
                                color: currentTab === tab.filterKey ? 'var(--color-primary)' : 'initial',
                                fontWeight: currentTab === tab.filterKey ? 'bold' : '300'
                            }}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* Slider */}
                <div className="relative px-4">
                    <div ref={sliderRef} className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth">
                        {filteredProjects.map((project, index) => (
                            <div key={index} className="parallax min-w-[350px] max-w-[350px] flex-shrink-0 rounded-xl overflow-hidden bg-white border border-[var(--color-gray)]">
                                <figure className="h-[200px] overflow-hidden">
                                    <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                                </figure>
                                <div className="p-4 flex flex-col gap-3">
                                    <h2 className="font-bold text-lg text-[var(--color-primary)]">{project.name}</h2>
                                    <p className="text-sm text-[var(--color-dark-gray)] leading-relaxed">{project.description}</p>
                                </div>
                                {project.techs && (
                                    <div className='px-4 flex flex-col gap-2'>
                                        <h4 className='text-[var(--color-dark)] font-semibold text-[.95rem]'>Tecnologías usadas</h4>
                                        <div className='flex items-center gap-2'>
                                            {project.techs?.map((tech, idx) => (
                                                <figure key={idx} className='flex flex-col items-center gap-2'>
                                                    <img className='bg-gray-50 rounded-[10px] p-[2px] w-7 object-cover' src={tech.image} alt={`Imagen de: ` + tech.name} />
                                                    <figcaption className='text-[var(--color-dark-gray)] text-[.8rem]'>{tech.name}</figcaption>
                                                </figure>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Slider Buttons */}
                    <button
                        onClick={() => scrollSlider('left')}
                        disabled={isAtStart}
                        className={`cursor-pointer absolute top-1/2 left-2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[var(--color-primary)] text-white rounded-lg ${isAtStart ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <span className="material-symbols-outlined">arrow_left</span>
                    </button>
                    <button
                        onClick={() => scrollSlider('right')}
                        disabled={isAtEnd}
                        className={`cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[var(--color-primary)] text-white rounded-lg ${isAtEnd ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <span className="material-symbols-outlined">arrow_right</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
