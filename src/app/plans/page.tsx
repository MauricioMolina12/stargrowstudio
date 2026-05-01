'use client'

import { useState } from "react";
import Tabs from "../components/shared/Tabs/Tabs";
import PricingCard from "./components/PlansCard";

export default function Plans() {

    const [category, setCategory] = useState('Software');

    

    return (
        <>
            <main className="flex flex-col gap-2 pb-2">

                <section id="hero-banner" className="h-[70dvh] bg-white lg:h-[calc(100vh-56px)] border-b border-[#E4E4E4]">
                    <div className="wrapper w-full h-full flex flex-col items-center justify-center lg:gap-0 p-4 pb-0">
                        <div className="titles w-full flex flex-col lg:items-center justify-center gap-6">
                            <h2 className="text-4xl lg:text-5xl lg:max-w-[60%] lg:text-center text-[#5656b5]">Planes diseñados para tu <span className="font-semibold">crecimiento</span></h2>
                            <span className="text-[#666666]">Elige el plan que mejor se adapta a tus objetivos</span>
                            <div className="flex align-center justify-center gap-4">
                                <button className="px-6 py-5 lg:py-3 bg-[#5656b5] text-white rounded-lg hover:bg-[#4a4ab0] transition-colors duration-300 cursor-pointer">Agendar llamada</button>
                                <button className="px-6 py-5 lg:py-3 bg-white text-[#5656b5] rounded-lg border border-gray-200 transition-colors duration-300 cursor-pointer">Ver planes</button>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="plans-cards flex items-center justify-center gap-6">

                    <Tabs
                        options={['Software', 'Diseño', 'Fotografía', 'Consultoría']}
                        value={category}
                        onChange={setCategory}
                    />
                </div>
                {/* <PricingCard
                        title="Pro Plan"
                        description="Unlock powerful AI tools to create your content."
                        price={99}
                        badge="Popular"
                        highlighted={true}
                        buttonText="Adquirir plan"
                        onSelect={() => console.log("Pro selected")}
                        features={[
                            { label: "01 User Access", included: true },
                            { label: "Advanced Analytics", included: true },
                            { label: "Priority Support", included: true },
                            { label: "Custom Branding", included: false },
                        ]}
                    /> */}
            </main>
        </>
    );
}
