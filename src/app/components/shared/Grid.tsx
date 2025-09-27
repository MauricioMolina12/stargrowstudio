'use client';

import { ReactNode } from "react";
import { useMeeting } from "../../context/MeetingContext";



type Props = {
    title: { main: string; left: string; right: string };
    subtitle: string;
    showMeetingCall?: boolean;
    children?: ReactNode; // <-- Add this line
    showSteps?: boolean
};

const Grid = ({ title, subtitle, showMeetingCall = true, children}: Props) => {
    const { show } = useMeeting();

    return (
        <div className="w-full h-auto lg:max-w-[70%] lg:mx-auto lg:my-0 lg:py-6">
            <aside className="w-full h-1/2 flex flex-col items-center justify-center gap-2.5 p-4 parallax">
                <span className="text-[var(--color-primary-to-white)]">{subtitle}</span>
                <h1 className="text-3xl text-center font-bold lg:w-[70%] lg:text-4xl">{title.left} <span className="text-[var(--color-primary-to-white)]">{title.main} </span>{title.right}</h1>
            </aside>
            <main className="w-full mx-auto h-1/2 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 lg:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] p-4 2xl:w-6xl ">
                {children}
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