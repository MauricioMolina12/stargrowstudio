'use client';

import { usePathname } from 'next/navigation';
import { ENV_TEST } from '../../../../../environments/env.dev';


const AIS = [
    {
        name: 'ChatGPT',
        icon: '/img/logos/chatgpt.svg',
        url: 'https://chat.openai.com/?q='
    },
    {
        name: 'Gemini',
        icon: '/img/logos/gemini.svg',
        url: 'https://gemini.google.com/?q='
    },
    {
        name: 'Claude',
        icon: '/img/logos/claude.svg',
        url: 'https://claude.ai/new?q='
    }
];

export default function SummarizeWithAI() {
    const pathname = usePathname();

    const fullUrl = typeof window !== 'undefined' ? `Resumir el contenido en: ${window.location.origin}${pathname}` : `Resumir el contenido en: ${ENV_TEST.domain}${pathname}`;

    return (
        <section className="flex flex-col gap-2">
            <span className="text-sm text-gray-500 font-medium">
                Resumir con:
            </span>

            <div className="flex items-center gap-4" aria-label='Resumir página con IA'>
                {AIS.map(ai => {
                    const Icon = ai.icon;
                    return (
                        <a
                            key={ai.name}
                            href={`${ai.url}${encodeURIComponent(fullUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-transform hover:scale-110"
                            title={`Resumir con ${ai.name}`}
                        >
                            <img src={Icon} alt={`Imagen de: ${ai.name}`} />
                        </a>
                    );
                })}
            </div>
        </section>
    );
}
