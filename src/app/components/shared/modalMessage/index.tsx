'use client';

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

type MessageProps = {
    message: string;
    isSuccess: boolean;
};

const ModalMessage = ({ message, isSuccess }: MessageProps) => {
    const [visible, setVisible] = useState(false);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        // Trigger entrance animation
        requestAnimationFrame(() => setVisible(true));

        // Start exit animation 300ms before auto-dismiss (4s total)
        const exitTimer = setTimeout(() => {
            setExiting(true);
        }, 3700);

        const hideTimer = setTimeout(() => {
            setVisible(false);
            setExiting(false);
        }, 4000);

        return () => {
            clearTimeout(exitTimer);
            clearTimeout(hideTimer);
        };
    }, [message]);

    if (!visible && !exiting) return null;

    return (
        <div
            className={`
                fixed top-5 right-5 z-[9999] max-w-sm w-full
                transition-all duration-700 ease-out
                ${visible && !exiting ? "translate-x-0 opacity-100" : "translate-x-[150%] opacity-0"}
            `}
        >
            <div
                className={`
                    relative overflow-hidden rounded-full shadow-xl
                    ${isSuccess
                        ? "bg-emerald-50 text-emerald-900"
                        : "bg-red-50 text-red-900"
                    }
                `}
            >

                <div className="flex items-center gap-3 px-5 py-3.5">
                    {/* Icon */}
                    <span className="shrink-0">
                        {isSuccess ? (
                            <CheckCircle size={20} className="text-emerald-500" />
                        ) : (
                            <XCircle size={20} className="text-red-500" />
                        )}
                    </span>

                    {/* Message */}
                    <p className="text-sm leading-snug font-medium flex-1">{message}</p>

                    {/* Close button */}
                    <button
                        onClick={() => setExiting(true)}
                        className={`
                            shrink-0 rounded-full p-1 transition-colors
                            ${isSuccess
                                ? "text-emerald-400 hover:bg-emerald-100 hover:text-emerald-600"
                                : "text-red-400 hover:bg-red-100 hover:text-red-600"
                            }
                        `}
                        aria-label="Cerrar"
                    >
                        <X size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalMessage;
