'use client';
import React, { useState } from 'react';

type Props = {
    items: { name: string; image: string }[];
};

const SliderAutomatic = ({ items }: Props) => {
    const [pausedFirst, setPausedFirst] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const duplicatedItems = [...items, ...items];

    return (
        <div className="relative flex flex-col items-center gap-6 py-6 w-full overflow-hidden lg:py-4">
            <div
                className="slider-container w-[90vw] lg:w-[70vw] max-w-[1200px] overflow-hidden mask-gradient"
                onMouseEnter={() => setPausedFirst(true)}
                onMouseLeave={() => {
                    setPausedFirst(false)
                    setHoveredIndex(null);
                }}>
                <div className={`slider flex whitespace-nowrap gap-10 animate-slide-left ${pausedFirst ? 'paused' : ''}`}>
                    {duplicatedItems.map((item, index) => {
                        const isHovered = hoveredIndex !== null;
                        const isCurrent = hoveredIndex === index;

                        return (
                            <img
                                key={`slide-${index}`}
                                src={item.image}
                                alt={item.name}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={`
                                w-[60px] h-[60px] aspect-[16/9] object-contain rounded-lg transition-transform duration-300 
                                ${isHovered && !isCurrent ? 'grayscale opacity-50' : ''} 
                                ${isCurrent ? 'scale-[1.1] z-10' : ''}`}
                            />
                        );
                    })}
                    {duplicatedItems.map((item, index) => {
                        const isHovered = hoveredIndex !== null;
                        const isCurrent = hoveredIndex === index;

                        return (
                            <img
                                key={`slide-${index}`}
                                src={item.image}
                                alt={item.name}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={`
                                w-[60px] h-[60px] aspect-[16/9] object-contain rounded-lg transition-transform duration-300 
                                ${isHovered && !isCurrent ? 'grayscale opacity-50' : ''} 
                                ${isCurrent ? 'scale-[1.1] z-10' : ''}`}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SliderAutomatic;
