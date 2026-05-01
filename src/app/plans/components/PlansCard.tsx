"use client";

import { Check } from "lucide-react";
import clsx from "clsx";

export interface PricingFeature {
  label: string;
  included: boolean;
}

export interface PricingCardProps {
  title: string;
  description: string;
  price: number;
  currency?: string;
  period?: string;
  badge?: string;
  highlighted?: boolean; 
  disabled?: boolean;
  features: PricingFeature[];
  buttonText: string;
  onSelect?: () => void;
}

export default function PricingCard({
  title,
  description,
  price,
  currency = "$",
  period = "Per user / month",
  badge,
  highlighted = false,
  disabled = false,
  features,
  buttonText,
  onSelect,
}: PricingCardProps) {
  return (
    <div
      className={clsx(
        "relative flex flex-col rounded-2xl border p-8 transition-all duration-300",
        highlighted
          ? "bg-[#c9c9ea] shadow-xl scale-105"
          : "bg-white shadow-sm",
        disabled && "opacity-60 pointer-events-none"
      )}
    >
      {badge && (
        <span className="absolute top-4 right-4 text-xs font-semibold bg-white/70 px-3 py-1 rounded-full">
          {badge}
        </span>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-bold">
          {currency}
          {price}
        </span>
        <p className="text-sm text-gray-500 mt-1">{period}</p>
      </div>

      <button
        onClick={onSelect}
        className={clsx(
          "w-full py-3 rounded-lg font-medium transition",
          highlighted
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
        )}
      >
        {buttonText}
      </button>

      <div className="mt-8">
        <h4 className="font-semibold mb-4">Features</h4>
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
              <Check
                size={16}
                className={clsx(
                  feature.included
                    ? "text-indigo-600"
                    : "text-gray-300"
                )}
              />
              <span
                className={clsx(
                  !feature.included && "text-gray-400 line-through"
                )}
              >
                {feature.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}