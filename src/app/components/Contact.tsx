'use client';

import { useRef, useState } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import emailjs from '@emailjs/browser';

type ContactProps = {
    onFeedback?: (message: string, isSuccess: boolean) => void;
};


export default function Contact({ onFeedback }: ContactProps) {

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
        const message = form['message']?.value?.trim();
        const company = form['user_company']?.value?.trim();

        if (!name || !email || !message) {
            onFeedback?.('Por favor, completa todos los campos.', false);
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
                    setLoading(false)
                    onFeedback?.('Mensaje enviado correctamente', true);

                },
                (error) => {
                    console.error('Error:', error);
                    onFeedback?.('Hubo un error al enviar el mensaje', false);
                    setLoading(false)
                },
            );
    };

    return (
        <div className="w-full h-auto min-h-[100vh] lg:max-w-[70%] lg:mx-auto lg:my-0">
            <aside className="w-full h-1/2 flex flex-col items-center justify-center gap-2.5 p-4 parallax">
                <span className="text-[var(--color-primary-to-white)] parallax">Contacto</span>
                <h1 className="text-3xl text-center font-bold lg:w-[70%] lg:text-4xl parallax">Contáctanos Aquí ✉️</h1>
            </aside>
            <form ref={formRef} onSubmit={sendEmail} className="flex flex-col lg:w-3/4 lg:mx-auto lg:my-0">
                <div className="forms w-full h-1/2 px-4">
                    <div className="username w-full flex flex-col lg:flex-row items-center justify-between gap-3">
                        <div className="name w-full flex flex-col py-4">
                            <label htmlFor="name" className="parallax text-[var(--color-dark-gray)] font-semibold text-[1rem]">Nombre</label>
                            <input name="user_name" placeholder="Ej: Mauricio Molina" className="parallax placeholder:text-[.8rem] pl-4 rounded-2xl h-6 py-8 w-full border-none bg-gray-100" type="text" id="name" />
                        </div>
                        <div className="email w-full flex flex-col py-4">
                            <label htmlFor="email" className="parallax text-[var(--color-dark-gray)] font-semibold text-[1rem]">Correo</label>
                            <input name="user_email" placeholder="Ej: example@gmail.com" className="parallax placeholder:text-[.8rem] pl-4 rounded-2xl h-6 py-8 w-full border-none bg-gray-100" type="email" id="email" />
                        </div>
                    </div>
                </div>
                <div className="forms w-full h-1/2 px-4">
                    <div className="businness w-full flex flex-col items-center justify-between">
                        <div className="entity w-full flex flex-col py-4">
                            <label htmlFor="entity" className="parallax text-[var(--color-dark-gray)] text-[1rem] font-semibold">Empresa <span>(Opcional)</span></label>
                            <input name="user_company" placeholder="Ej: Star Grow Studio" className="parallax placeholder:text-[.8rem] pl-4 rounded-2xl h-6 py-8 w-full border-none bg-gray-100" type="text" id="entity" />
                        </div>
                        <div className="message w-full flex flex-col py-4">
                            <label htmlFor="message" className="parallax text-[var(--color-dark-gray)] text-[1rem] font-semibold">Mensaje</label>
                            <textarea name="user_message" placeholder="Ej: Hola, necesito crear una landing..." className="parallax resize-none placeholder:text-[.8rem] pl-4 pt-4 rounded-2xl h-[200px] w-full border-none bg-gray-100" id="message" ></textarea>
                        </div>
                    </div>
                </div>
                <div className="button-submit px-4 w-full">
                    <button type="submit" className="parallax flex justify-center items-center w-full lg:w-1/2 lg:ml-auto h-full bg-[var(--color-primary)] text-white py-4 rounded-2xl cursor-pointer">
                        {loading && (
                            <div className="loader w-5 h-5 border border-white border-t-[var(--color-primary)] rounded-[50%] animate-spin"></div>
                        )}
                        {!loading && (
                            <span>Enviar</span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}