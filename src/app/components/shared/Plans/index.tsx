'use client';

import { Plan } from "@/app/types/plans";
import clsx from "clsx";
import { CheckCircle } from "lucide-react";

type PlansProps = {
    plansView: Plan[]
};

export default function Plans({ plansView }: PlansProps) {
    return (
        <>
            {plansView.map((plan) => (
                <div
                    key={plan.name}
                    className={`parallax relative snap-start bg-[#FAFBFF] w-[340px] flex-shrink-0 rounded-2xl overflow-hidden border-2  ${plan.tier === "Premium"
                        ? "border-[var(--color-primary)] after:content-[''] after:absolute after:inset-0 after:bg-[var(--color-primary)] after:opacity-10 after:-z-10"
                        : "border-gray-100"
                        }`}>
                    <div className="relative p-6 flex flex-col justify-between h-full">
                        {/* Cinta en la esquina */}
                        <div className="absolute top-0 right-0 w-[120px] h-[120px] overflow-hidden">
                            <span className={`absolute w-[180px] py-1 text-xs font-bold text-center ${plan.tier.toLowerCase() === "premium" ? "text-black" : "text-white"} rotate-45 top-[30px] right-[-45px] ${plan.tier.toLowerCase() === "premium" ? "bg-[var(--color-yellow-light)]" : "bg-[var(--color-primary)]"}`}>
                                {plan.tier}
                            </span>
                        </div>

                        <h2 className="text-lg font-semibold mb-2">{plan.name}</h2>

                        {/* Precios */}
                        <div className="flex flex-col items-start py-4">
                            {plan.priceOld && (
                                <p className={`text-xs line-through text-gray-400`}>${plan.priceOld}</p>
                            )}
                            <p className={`text-[30px] font-bold text-[var(--color-primary)]`}>
                                ${plan.priceNew}
                                <span className="text-sm font-normal text-white"> <span className="text-black">(COP)</span></span>
                            </p>
                        </div>

                        <p className="text-[12px] mb-4 text-justify leading-relaxed">{plan.description}</p>

                        <hr className="text-gray-200 mb-3" />

                        <ul className="list-none text-left text-sm mb-6 space-y-1 flex flex-col gap-3">
                            {plan.features.included.map((feature, i) => (
                                <li
                                    key={`i-${i}`}
                                    className={`flex items-center gap-2 text-neutral-800 ${plan.tier === "premium" ? "text-gray-50" : ""
                                        }`}>
                                    <CheckCircle
                                        className="text-green-500 w-[15px] h-[15px] flex-shrink-0"
                                    />
                                    <span className="text-sm leading-tight">{feature}</span>
                                </li>
                            ))}

                            {plan.features.excluded && plan.features.excluded.map((feature, i) => (
                                <li key={`e-${i}`} className="flex items-center text-neutral-800 line-through">
                                    <span className="text-red-400 font-bold text-lg mr-2">✕</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => console.log("Solicitado", plan.name)}
                            className="cursor-pointer bg-[var(--color-primary)] text-white font-medium p-4 rounded-2xl mt-auto  transition-colors"
                        >
                            Solicitar este servicio
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}
