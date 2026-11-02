'use client';

import { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import { Send, Mail, MapPin } from "lucide-react";

type ContactProps = {
    onFeedback?: (message: string, isSuccess: boolean) => void;
};

const inputClass =
    "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-input)] px-4 py-3.5 text-sm text-[var(--color-dark)] outline-none transition placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary-bright)] focus:ring-2 focus:ring-[var(--color-primary-bright)]/20 min-h-[48px]";
const labelClass = "mb-1.5 block text-sm font-semibold text-[var(--color-dark)]";

const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.52 3.48A11.8 11.8 0 0 0 12.04 0C5.4 0 0 5.4 0 12.04c0 2.12.56 4.19 1.62 6.01L0 24l6.12-1.6a12 12 0 0 0 5.92 1.51h.01C18.64 23.91 24 18.55 24 11.96c0-3.2-1.25-6.21-3.48-8.48ZM12.05 21.9h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.63.95.97-3.54-.24-.37a9.88 9.88 0 0 1-1.52-5.31C2.22 6.57 6.57 2.22 12.04 2.22c2.63 0 5.1 1.03 6.96 2.89a9.77 9.77 0 0 1 2.88 6.95c0 5.46-4.36 9.84-9.83 9.84Zm5.4-7.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.47.13-.62.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.48s1.08 2.87 1.23 3.07c.15.2 2.13 3.26 5.16 4.57.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
);

const CHANNELS = [
    { icon: Mail, label: "Email", value: "stargrowstudio@gmail.com", href: "mailto:stargrowstudio@gmail.com" },
    { icon: WhatsAppIcon, label: "WhatsApp", value: "+57 300 385 6084", href: "https://wa.me/573003856084" },
    { icon: MapPin, label: "Ubicación", value: "Barranquilla, Atlántico", href: "https://www.google.com/maps/search/?api=1&query=Barranquilla+Atlantico" },
];

export default function Contact({ onFeedback }: ContactProps) {
    const [loading, setLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!formRef.current) return;
        const form = formRef.current;

        const name = form['user_name']?.value?.trim();
        const email = form['user_email']?.value?.trim();
        const message = form['message']?.value?.trim();

        if (!name || !email || !message) {
            onFeedback?.('Por favor, completa nombre, correo y mensaje.', false);
            setLoading(false);
            return;
        }

        emailjs
            .sendForm('service_xslmv6z', 'template_dq8i1ve', formRef.current, 'uPc_1b-H7ARojULwh')
            .then(
                () => {
                    formRef.current?.reset();
                    setLoading(false);
                    onFeedback?.('Mensaje enviado correctamente', true);
                },
                (error) => {
                    console.error('Error:', error);
                    onFeedback?.('Hubo un error al enviar el mensaje', false);
                    setLoading(false);
                },
            );
    };

    return (
        <div className="bg-hatch w-full overflow-hidden">
            <div className="container-app py-20">
                {/* Encabezado */}
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--color-primary-bright)]">
                    Contacto
                </p>
                <h2 className="section-heading mt-3 text-3xl font-[600] text-[var(--color-primary-bright)] lg:text-3xl">
                    Nos encantaría poder impulsarte
                </h2>
                <p className="mt-3 max-w-xl text-[var(--color-dark-gray)]">
                    Cuéntanos sobre tu proyecto y te responderemos lo antes posible.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Información de contacto */}
                    <div className="rounded-2xl border border-[var(--color-gray)] bg-[var(--color-surface)] p-6 lg:p-8">
                        <h3 className="text-xl font-bold text-[var(--color-dark)]">Información de contacto</h3>
                        <p className="mt-3 text-sm leading-relaxed text-[var(--color-dark-gray)]">
                            Disponible para nuevos proyectos, colaboraciones y alianzas.
                            Escríbenos por el canal que prefieras.
                        </p>

                        <ul className="mt-8 space-y-5">
                            {CHANNELS.map((c) => {
                                const Icon = c.icon;
                                return (
                                    <li key={c.label}>
                                        <a
                                            href={c.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center gap-4"
                                        >
                                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary-bright)] transition-colors group-hover:bg-[var(--color-primary)]/20">
                                                <Icon size={18} />
                                            </span>
                                            <span>
                                                <span className="block text-sm font-semibold text-[var(--color-dark)]">{c.label}</span>
                                                <span className="block text-xs text-[var(--color-dark-gray)]">{c.value}</span>
                                            </span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Formulario */}
                    <form
                        ref={formRef}
                        onSubmit={sendEmail}
                        className="rounded-2xl border border-[var(--color-gray)] bg-[var(--color-surface)] p-6 lg:col-span-2 lg:p-8"
                    >
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label htmlFor="name" className={labelClass}>Nombre</label>
                                <input id="name" name="user_name" type="text" placeholder="Tu nombre" className={inputClass} />
                            </div>
                            <div>
                                <label htmlFor="email" className={labelClass}>Email</label>
                                <input id="email" name="user_email" type="email" placeholder="tucorreo@email.com" className={inputClass} />
                            </div>
                        </div>

                        <div className="mt-5">
                            <label htmlFor="subject" className={labelClass}>Asunto</label>
                            <input id="subject" name="user_subject" type="text" placeholder="Asunto del mensaje" className={inputClass} />
                        </div>

                        <div className="mt-5">
                            <label htmlFor="message" className={labelClass}>Mensaje</label>
                            <textarea id="message" name="user_message" rows={6} placeholder="Cuéntanos sobre tu proyecto..." className={`${inputClass} resize-none`} />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-6 cursor-pointer min-w-[200px] inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[#8b8bf5] px-6 py-3.5 font-semibold text-white min-h-[48px] transition-opacity hover:opacity-90 active:scale-[0.97] disabled:opacity-60"
                        >
                            {loading ? (
                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                            ) : (
                                <><Send size={16} /> Enviar mensaje</>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
