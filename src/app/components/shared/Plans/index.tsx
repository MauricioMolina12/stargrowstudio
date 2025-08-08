'use client';

import { Plan } from "@/app/types/plans";

type PlansProps = {
    plansView: Plan[]
};

export default function Plans({ plansView }: PlansProps) {
    return (
        <>
            {plansView.map((plan) => (
                <div
                    key={plan.name}
                    className={`parallax relative snap-start w-[340px] flex-shrink-0 rounded-2xl overflow-hidden border ${plan.tier === "Premium"
                        ? "bg-[var(--color-primary)] text-white border-none"
                        : "bg-[#FAFBFF] text-[var(--color-secondary)] border-gray-100 border-2"
                        }`}>
                    <div className="relative p-6 flex flex-col justify-between h-full">
                        {/* Cinta en la esquina */}
                        <div className="absolute top-0 right-0 w-[120px] h-[120px] overflow-hidden">
                            <span className="absolute w-[180px] py-1 text-xs font-bold text-center bg-[var(--color-yellow-light)] text-black rotate-45 top-[30px] right-[-45px]">
                                {plan.tier}
                            </span>
                        </div>

                        <h2 className="text-lg font-semibold mb-2">{plan.name}</h2>

                        {/* Precios */}
                        <div className="flex flex-col items-start py-4">
                            {plan.priceOld && (
                                <p className={`text-xs line-through text-gray-400 ${plan.tier === "Premium" ? 'text-white' : 'initial'}`}>${plan.priceOld}</p>
                            )}
                            <p className={`text-[30px] font-bold ${plan.tier === "Premium" ? 'text-[var(--color-yellow-light)]' : 'text-[var(--color-primary)]'} `}>
                                ${plan.priceNew}
                                <span className="text-sm font-normal text-white"> <span className={`font-semibold ${plan.tier === 'Premium' ? 'text-white' : 'text-gray-700'}`}>(COP)</span></span>
                            </p>
                        </div>

                        <p className="text-sm mb-4 text-justify leading-relaxed">{plan.description}</p>

                        <hr className="text-gray-200 mb-3" />

                        <ul className="list-none text-left text-sm mb-6 space-y-1">
                            {plan.features.included.map((feature, i) => (
                                <li key={`i-${i}`} className={`'flex items-center text-neutral-800' ${plan.tier === 'premium' ? 'text-gray-50' : 'initial'}`}>
                                    <span className="text-green-400 font-bold text-lg mr-2">✔</span>
                                    {feature}
                                </li>
                            ))}
                            {plan.features.excluded.map((feature, i) => (
                                <li key={`e-${i}`} className="flex items-center text-neutral-800 line-through">
                                    <span className="text-red-400 font-bold text-lg mr-2">✕</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => console.log("Solicitado", plan.name)}
                            className="cursor-pointer bg-[var(--color-yellow-light)] text-black font-medium p-4 rounded-[10px] mt-auto hover:bg-[#ffd76b] transition-colors"
                        >
                            Solicitar este servicio
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}
