import React, { ReactNode } from "react";

type Props = {
    children?: ReactNode;
};

export default function ScrollStackSection({ children }: Props) {
    const sections = React.Children.toArray(children);

    return (
        <section className="relative w-full h-[300vh]">
            {sections.map((child, index) => (
                <div
                    key={index}
                    className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
                    style={{
                        zIndex: index + 6, boxShadow: index !== 0 ? '0 -4px 10px -4px rgba(0,0,0,0.3)' : ''
                    }}
                >
                    <div
                        className="absolute inset-0"
                        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                    ></div>

                    <div className="relative z-[2] flex flex-col items-center justify-center w-full h-full">
                        {child}
                    </div>
                </div>
            ))}
        </section>
    );
}
