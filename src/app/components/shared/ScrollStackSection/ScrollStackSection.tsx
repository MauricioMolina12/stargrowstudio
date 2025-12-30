'use client';

import React, { ReactNode, useEffect, useRef } from "react";

type Props = {
    children?: ReactNode;
};

export default function ScrollStackSection({ children }: Props) {
    const sectionRefs = useRef<HTMLDivElement[]>([]);
    const sections = React.Children.toArray(children);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    const index = sectionRefs.current.indexOf(
                        entry.target as HTMLDivElement
                    );

                    if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                        const current = sectionRefs.current[index];
                        const prev = sectionRefs.current[index - 1];
                        if (prev != current) {
                            if (prev) prev.classList.add("stack-covered");
                        }
                    }

                    if (!entry.isIntersecting || entry.intersectionRatio < 0.1) {
                        const prev = sectionRefs.current[index - 1];
                        if (prev) prev.classList.remove("stack-covered");
                    }
                });
            },
            {
                threshold: [0, 0.1, 0.2],
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
                    style={{ zIndex: sections.length + index }}
                >
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                        {child}
                    </div>
                </div>
            ))}
        </section>
    );
}
