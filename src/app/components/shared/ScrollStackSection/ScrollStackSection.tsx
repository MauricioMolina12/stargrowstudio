'use client';

import React, { ReactNode, useEffect, useRef } from "react";

type Props = {
    children?: ReactNode;
};

export default function ScrollStackSection({ children }: Props) {
    const sectionRefs = useRef<HTMLDivElement[]>([]);
    const sections = React.Children.toArray(children);

    useEffect(() => {
        // Batch DOM updates and reduce observer noise: only toggle when section is at least 50% visible
        const toAdd: HTMLElement[] = [];
        const toRemove: HTMLElement[] = [];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    const index = sectionRefs.current.indexOf(entry.target as HTMLDivElement);
                    const prev = sectionRefs.current[index - 1] as HTMLElement | undefined;

                    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                        if (prev && !prev.classList.contains("stack-covered")) toAdd.push(prev);
                    } else {
                        if (prev && prev.classList.contains("stack-covered")) toRemove.push(prev);
                    }
                });

                if (toAdd.length || toRemove.length) {
                    requestAnimationFrame(() => {
                        toAdd.forEach(el => el.classList.add("stack-covered"));
                        toRemove.forEach(el => el.classList.remove("stack-covered"));
                        toAdd.length = 0;
                        toRemove.length = 0;
                    });
                }
            },
            {
                threshold: [0, 0.5],
            }
        );

        sectionRefs.current.forEach(el => el && observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section
            className="relative w-full"
            style={{ height: `${sections.length * 100}vh` }}
        >
            {sections.map((child, index) => (
                <div
                    key={index}
                    ref={(el) => {
                        if (el) sectionRefs.current[index] = el;
                    }}
                    className="stack-slide sticky top-0 h-screen flex items-center justify-center overflow-hidden rounded-2xl"
                    style={{ zIndex: sections.length + index, willChange: "transform, opacity" }}
                >
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                        {child}
                    </div>
                </div>
            ))}
        </section>
    );
}
