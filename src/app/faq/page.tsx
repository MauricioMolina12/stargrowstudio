import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Preguntas frecuentes | Star Grow Studio",
  description: "Resolvemos las dudas más comunes sobre nuestros servicios.",
};

// Placeholder editable. Más adelante esto puede salir de Sanity.
const FAQS = [
  {
    q: "¿Qué servicios ofrece Star Grow Studio?",
    a: "Desarrollo de software, diseño UI/UX, fotografía y consultoría empresarial. Podemos combinar varias disciplinas en un mismo proyecto.",
  },
  {
    q: "¿Cuánto cuesta un proyecto?",
    a: "Depende del alcance. Tenemos planes de referencia en la sección de Precios y podemos armar una propuesta a tu medida tras una reunión inicial.",
  },
  {
    q: "¿Cuánto tarda un proyecto en estar listo?",
    a: "Varía según la complejidad. Un sitio web sencillo puede tomar pocas semanas; un producto a medida, algunos meses. Definimos tiempos claros al inicio.",
  },
  {
    q: "¿Trabajan con clientes fuera de la ciudad o del país?",
    a: "Sí. Trabajamos de forma remota y coordinamos reuniones por videollamada sin problema.",
  },
  {
    q: "¿Ofrecen soporte después de entregar el proyecto?",
    a: "Sí, incluimos periodos de garantía y ofrecemos planes de mantenimiento y soporte continuo.",
  },
];

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 lg:py-16">
      <header className="mb-10 flex flex-col items-center text-center">
        <span className="text-lg font-medium text-[var(--color-primary-bright)]">Preguntas frecuentes</span>
        <h1 className="mt-3 max-w-2xl text-3xl font-bold text-[var(--color-primary-to-white)] lg:text-4xl">
          Todo lo que necesitas saber
        </h1>
      </header>

      <div className="flex flex-col gap-4">
        {FAQS.map((item) => (
          <details
            key={item.q}
            className="group rounded-xl border border-[var(--color-gray)] bg-[var(--color-white-to-primary)] p-5"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-[15px] font-semibold text-[var(--color-primary-to-white)] [&::-webkit-details-marker]:hidden">
              {item.q}
              <span className="text-[var(--color-primary-bright)] transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-dark-gray)]">{item.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-[var(--color-gray)] p-8 text-center">
        <h2 className="text-lg font-semibold text-[var(--color-primary-to-white)]">
          ¿No encuentras tu respuesta?
        </h2>
        <Link
          href="/cotizar"
          className="rounded-lg bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-secondary)]"
        >
          Agenda una reunión
        </Link>
      </div>
    </main>
  );
}
