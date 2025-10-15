'use client';

import { LucideIcon } from "lucide-react";
import { Children, ReactNode } from "react";

type Items = {
    value: string;
    icon: LucideIcon;
}

type Text = {
    color: string;
    label: string;
    fontSize: string;
}

type Props = {
    tag?: Text;
    title?: Text;
    description?: Text;
    items?: Items[];
    bgCard?: string;
    children?: ReactNode;
}
const ServiceCard = ({ tag, title, description, items, bgCard = '#FFFFFF', children }: Props) => {
    return (
        <main className="w-full h-full flex flex-col p-4 rounded-2xl gap-4" style={{ background: bgCard }}>

            <header className="header w-full flex items-center justify-between">
                {tag && (
                    <span className={`p-2 rounded-3xl bg-[var(--neutral--100)] ${tag.fontSize}`} style={{ color: tag.color }}>{tag.label}</span>
                )}
            </header>

            <h4 className={`${title?.fontSize}`} style={{ color: title?.color }}>{title?.label}</h4>

            <p className={`${description?.fontSize}`} style={{ color: description?.color }}>{description?.label}</p>

            {children}
        </main>
    )
}

export default ServiceCard