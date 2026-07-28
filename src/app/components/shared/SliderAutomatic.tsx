import Image from "next/image";

type Props = {
    items: { name: string; image: string }[];
};

const SliderAutomatic = ({ items }: Props) => {
    /**
     * Se duplica el array para crear el efecto continuo de carrusel infinito.
     * En vez de renderizar ambos arrays en el DOM (como estaba antes), se usa
     * CSS animation con `infinite` y `translate(-50%)` para aprovechar la
     * duplicación sin necesidad de dos bucles de render.
     */
    const duplicatedItems = [...items, ...items];

    return (
        <div className="relative flex flex-col items-center gap-6 py-6 w-full overflow-hidden lg:py-4">
            <div className="slider-container w-[90vw] lg:w-[70vw] max-w-[1200px] overflow-hidden mask-gradient">
                <div className="slider flex whitespace-nowrap gap-10 animate-slide-left">
                    {duplicatedItems.map((item, index) => (
                        <div
                            key={`slide-${index}`}
                            className="relative w-[60px] h-[60px] shrink-0"
                        >
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="60px"
                                className="object-contain rounded-lg"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SliderAutomatic;