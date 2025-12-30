'use client';
import React, { useState } from 'react';

type Props = {
    item: { name: string; image: string, gradient?: boolean };
};

const ModernAppsSection = ({ item }: Props) => {
    return (
        <div className="relative flex flex-col items-center gap-6 py-6 w-full overflow-hidden lg:py-4">
            <h2 className="sm:text-[1.5rem] lg:text-[3rem] font-bold z-10 text-[var(--color-primary)] parallax">
                {item.name}
            </h2>

            <img
                src={item.image}
                alt="mobile-mockup"
                className="w-[85%] h-[85%] object-cover parallax"
            />
            {item.gradient && (
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white via-white/70 to-transparent"></div>
            )}
        </div>
    );
};

export default ModernAppsSection;
