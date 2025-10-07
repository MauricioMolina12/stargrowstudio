import { Check } from "lucide-react";


type content = {
    title: string;
    items: string[];
    image: string;
    styles?: any;
}

type DetailsProps = {
    content: content
}


export default function DetailsPanel({ content }: DetailsProps) {
    return (
        <section className="flex flex-col lg:flex-row justify-between items-center w-full">
            <div className="p-4 lg:w-1/2 lg:p-0 flex flex-col gap-4">
                <h2
                    className="text-4xl font-bold mb-4"
                    style={{ color: content.styles?.colorTitle ?? "#222" }}
                >
                    {content.title}
                </h2>

                <ul
                    className="space-y-3 flex flex-col gap-3"
                    style={{ color: content.styles?.colorItems ?? "text-gray-700" }}
                >
                    {content.items?.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                            <Check className="text-green-500 w-[1rem] h-[1rem]" />
                            <span className="text-xl">{item}</span>
                        </li>
                    ))}
                </ul>


            </div>

            <figure className="lg:w-1/2 mx-auto flex items-center justify-end rounded-[inherit]">
                <img
                    src={content.image}
                    alt={content.title}
                    className="lg:w-[85%] lg:h-[85%] object-contain"
                />
            </figure>

        </section>
    )
}
