'use client';

import { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';


interface AccordionProps {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
}

export default function Accordion({
    title,
    children,
    defaultOpen = false,
}: AccordionProps) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-b-gray-200 py-4">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 text-left cursor-pointer">
                <span className="text-[1rem] lg:text-lg font-medium text-gray-900">
                    {title}
                </span>

                <ChevronDown
                    className={`
                        h-8 w-8 lg:h-6 lg:w-6 text-gray-600
                        transition-transform duration-200
                        ${open ? 'rotate-180' : ''}
                    `}
                />
            </button>

            <div
                className={`
                        grid overflow-hidden transition-all duration-300 ease-in-out
                        ${open ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'}
                        `}>
                <div className="overflow-hidden text-gray-600 text-sm leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
}
