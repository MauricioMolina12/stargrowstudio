'use client';

import { LucideIcon, ArrowUpRight } from "lucide-react";
import { Children, ReactNode } from "react";

type Items = {
    value: string;
    icon: LucideIcon;
}

type Text = {
    color: string;
    label: string;
    fontSize: string;
    fontWeight?: string;
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
        <main className="w-full h-full flex flex-col justify-between rounded-2xl gap-4 pt-9" style={{ background: bgCard }}>

            {tag && (
                <header className="header w-full flex items-center justify-between pb-2 px-8">
                        <span className={`py-1 px-3 rounded-3xl bg-[var(--neutral--100)] ${tag.fontSize}`} style={{ color: tag.color }}>{tag.label}</span>
                        <ArrowUpRight className={`text-[${title?.color}]`}/>
                </header>
            )}

            <h4 className={`${title?.fontSize} px-8 flex-1/2 ${title?.fontWeight}`} style={{ color: title?.color }}>{title?.label}</h4>

            <p className={`${description?.fontSize} px-8 flex-1/2 ${description?.fontWeight}`} style={{ color: description?.color }}>{description?.label}</p>

            {children}
        </main>
    )
}

export default ServiceCard