import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import TabsNav from './shared/TabsNav';
import ContentCard from './shared/ContentCard';

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
    { label: 'App webs', key: 'web' },
    { label: 'App móviles', key: 'mobile' },
    { label: 'Diseños', key: 'design' }
];

export default function Portfolio() {
    const [tabActive, setTab] = useState('web');
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);

    useIntersectionObserver('.parallax', { threshold: 0.4 }, 'all');


    useEffect(() => {
        setFilteredProjects(projects.filter(p => p.category === tabActive));
    }, [tabActive]);

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
        <section className="w-full lg:w-[70%] lg:mx-auto lg:my-0">
            <div className="w-full max-w-6xl mx-auto">
                {/* Tabs */}
                <TabsNav tabs={tabs} tabActive={tabActive} setTabActive={setTab} />

                {/* Slider */}
                <div className="relative px-4">
                    <div ref={sliderRef} className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth">
                        <ContentCard contents={filteredProjects} ></ContentCard>
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
