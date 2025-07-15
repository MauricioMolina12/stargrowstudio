'use client';

import { useMeeting } from "@/app/context/MeetingContext";
import { useComponentMeeting } from "@/app/hooks/useComponentMeeting";
import { useEffect, useState } from "react";

let isOnline = window.navigator.onLine;
function updateOnlineStatus() {
    isOnline = window.navigator.onLine;
}

const MeetingModal = () => {

    const { hide } = useMeeting();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        document.body.style.overflow = "hidden";
        setLoading(true);

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <>
            <style jsx>{`
            .loader {
                border-width: 4px;
                border-style: solid;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            `}</style>


            <main className="overlay w-full h-[100vh] fixed top-0 left-0 bg-[rgba(0,0,0,0.8)] z-[1000] flex flex-col items-center justify-center">
                <button onClick={hide} className="close absolute top-5 right-5 bg-red-500 text-white rounded-[100%] p-1 w-8 h-8 cursor-pointer z-[1100]">X</button>
                <section className="w-full h-[100vh] lg:w-1/2 lg:h-4/5 bg-white lg:rounded-2xl relative">
                    {isOnline && (
                        <iframe
                            src="https://calendly.com/molinamau37/nueva-reunion?primary_color=5656b5"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            scrolling="no"
                            onLoad={() => setLoading(false)}
                            style={{
                                border: "none",
                                minWidth: 320,
                                borderRadius: "16px",
                                opacity: isLoading ? 0 : 1,
                                pointerEvents: isLoading ? "none" : "auto",
                                transition: "opacity 0.3s ease-in-out",
                            }}
                        ></iframe>
                    ) }

                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white rounded-2xl z-10">
                            <div className="loader w-10 h-10 border border-white border-t-[var(--color-primary)] rounded-[50%] animate-spin"></div>
                        </div>
                    )}
                </section>

            </main >
        </>
    );
}

export default MeetingModal;

