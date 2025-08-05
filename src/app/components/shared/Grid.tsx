'use client';

import { useMeeting } from "../../context/MeetingContext";
import { useComponentMeeting } from "../../hooks/useComponentMeeting";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

type card = {
    title: string;
    icon?: string;
    description?: string;
    items?: string[];
}

type Props = {
    title: { main: string; left: string; right: string };
    subtitle: string;
    cards: card[];
    showMeetingCall?: boolean;
    showSteps?: boolean;
};

const Grid = ({ title, subtitle, cards, showMeetingCall = true, showSteps = true }: Props) => {

    useIntersectionObserver('.parallax', { threshold: 0.4 }, 'all');
    const { show } = useMeeting();

    return (
        <div className="w-full h-auto lg:max-w-[70%] lg:mx-auto lg:my-0 lg:py-6">
            <aside className="w-full h-1/2 flex flex-col items-center justify-center gap-2.5 p-4 parallax">
                <span className="text-[var(--color-primary-to-white)]">{subtitle}</span>
                <h1 className="text-3xl text-center font-bold lg:w-[70%] lg:text-4xl">{title.left} <span className="text-[var(--color-primary-to-white)]">{title.main} </span>{title.right}</h1>
            </aside>
            <main className="w-full h-1/2 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 lg:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] p-4">
                {cards.map((card, index) => (
                    <div key={index} className="item parallax bg-[var(--color-white)] w-full h-[240px] rounded-2xl relative flex flex-col justify-center gap-4 p-4">
                        {showSteps && (
                            <span className="absolute top-[-10px] left-[-10px] bg-[var(--color-primary)] text-white p-3 [clip-path:circle()]">
                                {index + 1}
                            </span>
                        )}
                        {card.icon && (
                            <img className="w-10 h-10 bg-gray-100 p-2 rounded-2xl" src={card.icon} alt={`Icono de: ${card.title}`} />
                        )}
                        <h2 className="text-[1rem] font-[600] text-[var(--color-dark)] dark:text-white">{card.title}</h2>
                        {card.description && (
                            <p className="text-[var(--color-dark-gray)] text-[.9rem]">{card.description}</p>
                        )}
                        {card.items && (
                            <ul className="flex flex-col gap-2">
                                {card.items.map((item) => (
                                    <p key={item} className="text-[var(--color-dark-gray)] text-[.9rem]">{item}</p>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </main>
            {showMeetingCall && (
                <article className="call-action w-full h-[250px] lg:h-[170px] p-4 parallax">
                    <div className="inner w-full h-full p-3 rounded-xl bg-[var(--color-primary)] flex flex-col lg:flex-row justify-between lg:items-center items-start">
                        <div className="description w-full h-1/2 flex flex-col gap-3">
                            <h2 className="text-white font-bold text-[1.3rem]">¿Estás listo para llevar tu proyecto al siguiente nivel?</h2>
                            <p className="text-gray-200">Contáctanos hoy mismo y comencemos a trabajar juntos en tu próximo proyecto</p>
                        </div>
                        <button className="cursor-pointer w-fit bg-white p-3 text-nowrap rounded-[10px] font-medium text-[var(--color-primary)]" onClick={show}>Solicitar una cita</button>
                    </div>
                </article>
            )}
        </div>
    )
}

export default Grid;