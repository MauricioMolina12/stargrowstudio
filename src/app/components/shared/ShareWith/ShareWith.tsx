'use client';

import { usePathname } from 'next/navigation';
import { Copy } from 'lucide-react';
import { useState } from 'react';
import { ENV_TEST } from '../../../../../environments/env.dev';


const Networks = [
  {
    name: 'LinkedIn',
    icon: '/img/logos/linkedin.svg',
    url: 'https://www.linkedin.com/sharing/share-offsite/?url='
  },
  {
    name: 'X',
    icon: '/img/logos/x.svg',
    url: 'https://twitter.com/intent/tweet?url='
  }
];

export default function ShareWith() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const fullUrl = typeof window !== 'undefined' ? `${ENV_TEST.domain}${pathname}` : `${ENV_TEST.domain}${pathname}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Error copiando URL:', err);
    }
  };

  return (
    <section className="flex flex-col gap-2">
      <span className="text-sm text-gray-500 font-medium">
        Compartir:
      </span>

      <div className="flex items-center gap-4" aria-label="Compartir página">

        {Networks.map(network => (
          <a
            key={network.name}
            href={`${network.url}${encodeURIComponent(fullUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
            title={`Compartir en ${network.name}`}
          >
            <img src={network.icon} alt={network.name} className="w-6 h-6" />
          </a>
        ))}

        <button
          onClick={handleCopy}
          className="transition-transform hover:scale-110 flex items-center justify-center w-6 h-6 cursor-pointer"
          title="Copiar enlace"
        >
          <Copy size={24} className="text-gray-700" />
        </button>

        {copied && (
          <span className="text-xs text-white bg-green-500 rounded-[10px] p-3 ml-2 absolute bottom-4 right-4">
            Copiado!
          </span>
        )}
      </div>
    </section>
  );
}
