'use client';

import { useRef, useState } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import emailjs from '@emailjs/browser';
import { SendHorizontal } from "lucide-react";
import { useToast } from "../shared/Toast/ToastProvider";

type ContactProps = {
    onFeedback?: (message: string, isSuccess: boolean) => void;
};


export default function Contact({ onFeedback }: ContactProps) {
    const { showToast } = useToast();

    useIntersectionObserver('.parallax', { threshold: 0.4 }, 'all');
    const [loading, setLoading] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!formRef.current) return;

        const form = formRef.current;

        const name = form['user_name']?.value?.trim();
        const email = form['user_email']?.value?.trim();
        const message = form['user_message']?.value?.trim();
        const company = form['user_company']?.value?.trim();

        if (!name || !email || !message) {
            showToast('Por favor, completa todos los campos requeridos.', 'warning', 3000);
            setLoading(false);
            return;
        }

        emailjs
            .sendForm(
                'service_xslmv6z',
                'template_dq8i1ve',
                formRef.current,
                'uPc_1b-H7ARojULwh'
            )
            .then(
                () => {
                    formRef.current?.reset();
                    setLoading(false);
                    showToast('¡Mensaje enviado correctamente! Nos contactaremos en 24 horas.', 'success', 4000);
                },
                (error) => {
                    console.error('Error:', error);
                    setLoading(false);
                    showToast('Hubo un error al enviar el mensaje. Intenta de nuevo.', 'error', 4000);
                },
            );
    };

    return (
        <div className="w-full h-auto lg:mx-auto lg:my-0 lg:p-4 flex flex-col lg:flex-row items-center gap-4">
            {/* <TitleBox title={{ left: 'Contacto' }} tag="Comunicación"></TitleBox> */}
            <form ref={formRef} onSubmit={sendEmail} className="flex flex-col lg:w-2/4 gap-2 lg:mx-auto lg:my-0 p-4 lg:p-10 box-border bg-white lg:rounded-2xl">
                <header className="header flex flex-col gap-2">
                    <div className="flex items-start gap-2">
                        {/* <img src="/logo.png" alt="logo" className="w-8 h-8 object-contain" /> */}
                        {/* <div className="flex flex-col">
                            <h3 className="text-xl font-bold text-[var(--color-primary)]">STAR GROW</h3>
                            <small className="tracking-[10px] text-[10px] text-[var(--color-primary)]">STUDIO</small>
                        </div> */}
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-semibold text-[var(--color-dark)]">Nos encantaría poder ayudar</h2>
                        <p className="text-[var(--color-dark)] text-[.8rem]">Somos una agencia de servicio completo con expertos listos para ayudarte. Nos pondremos en contacto contigo en 24 horas</p>
                    </div>
                </header>
                <div className="forms flex flex-col">
                    <div className="form w-full h-1/2">
                        <div className="username w-full flex flex-col lg:flex-row items-center justify-between gap-3">
                            <div className="name w-full flex flex-col py-4">
                                <label htmlFor="name" className="text-[var(--color-dark)] font-medium text-[.9rem]">Nombre</label>
                                <input name="user_name" placeholder="Ej: Mauricio Molina" className="placeholder:text-[.8rem] pl-4 rounded-[6px] h-6 py-6 w-full border-none bg-gray-100" type="text" id="name" />
                            </div>
                            <div className="email w-full flex flex-col py-4">
                                <label htmlFor="email" className="text-[var(--color-dark)] font-medium text-[.9rem]">Correo</label>
                                <input name="user_email" placeholder="Ej: example@gmail.com" className="placeholder:text-[.8rem] pl-4 rounded-[6px] h-6 py-6 w-full border-none bg-gray-100" type="email" id="email" />
                            </div>
                        </div>
                    </div>
                    <div className="form w-full h-1/2">
                        <div className="businness w-full flex flex-col items-center justify-between">
                            <div className="entity w-full flex flex-col py-4">
                                <label htmlFor="entity" className="text-[var(--color-dark)] text-[.9rem] font-medium">Empresa <span>(Opcional)</span></label>
                                <input name="user_company" placeholder="Ej: Star Grow Studio" className="placeholder:text-[.8rem] pl-4 rounded-[6px] h-6 py-6 w-full border-none bg-gray-100" type="text" id="entity" />
                            </div>
                            <div className="message w-full flex flex-col py-4">
                                <label htmlFor="message" className="text-[var(--color-dark)] text-[.9rem] font-medium">Mensaje</label>
                                <textarea name="user_message" placeholder="Ej: Hola, necesito crear una landing..." className="resize-none placeholder:text-[.8rem] pl-4 pt-4 rounded-[6px] h-[150px] w-full border-none bg-gray-100" id="message" ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="button-submit w-full">
                        <button type="submit" disabled={loading} className="flex justify-center items-center w-full h-full bg-[var(--color-primary)] text-[var(--color-white)] font-medium py-4 rounded-[6px] cursor-pointer hover:bg-[var(--color-secondary)] disabled:opacity-70 transition gap-2">
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Enviando...</span>
                                </>
                            ) : (
                                <>
                                    <span>Enviar</span>
                                    <SendHorizontal size={18} />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
            <div className="lg:w-2/4 h-full">
               <figure>
                  <img src="img/hero-banner/contact-us/macbook-mockup.png" alt="macbook-mockup" />
               </figure>
            </div>
        </div>
    )
}