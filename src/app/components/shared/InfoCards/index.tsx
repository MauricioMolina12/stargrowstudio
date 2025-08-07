'use client';

import { cardGrid } from "@/app/types/cards"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useIntersectionObserver } from "@/app/hooks/useIntersectionObserver";

type InfoCardsProps = {
  cards: cardGrid[];
  showSteps?: boolean;
}

export default function InfoCards ({cards, showSteps = true }: InfoCardsProps) {
  const router = useRouter();
  useIntersectionObserver('.parallax', { threshold: 0.4 }, 'all');  

  const [loadingDetails, setLoadingDetails] = useState<{ [key: string]: boolean }>({});

  function detailsService(service: cardGrid) {
    router.push(`/services/${service.slug}`);
    setLoadingDetails((prev) => ({ ...prev, [String(service.slug)]: true }));
    setTimeout(() => {
      setLoadingDetails((prev) => ({ ...prev, [String(service.slug)]: false }));
    }, 3000);
  }

  useIntersectionObserver('.service-card', { threshold: 0.4 }, 'all');

  return (
    <>
        {cards.map((card, index) => (
          <div key={index} className="item parallax bg-[var(--color-white)] w-full rounded-2xl relative flex flex-col justify-center gap-4 p-4">
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

              {card.slug && (
                  <button onClick={() => detailsService(card)} className="cursor-pointer mt-2 text-[var(--color-primary)] flex items-center gap-1 font-medium transition-colors text-[0.9rem]">
                      Leer más
                      {!loadingDetails[card.slug] ? (
                      <span className="material-symbols-outlined">arrow_forward</span>
                      ) : <div className="loader w-5 h-5 border border-white border-t-[var(--color-primary)] rounded-[50%] animate-spin"></div>
                      }
                  </button>
              )}
          </div>
        ))}
    </>
  )
}