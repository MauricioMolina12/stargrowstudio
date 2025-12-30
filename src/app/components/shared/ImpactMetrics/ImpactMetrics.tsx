type Metrics = {
    value: string;
    description: string;
};

type Props = {
    Config: {
        imageBg?: string;
        title?: string;
        metrics?: Metrics[];
    };
};

const ImpactMetrics = ({ Config }: Props) => {
    const { imageBg, title, metrics = [] } = Config;

    return (
        <section
            className="relative w-full h-full bg-[var(--color-primary)] bg-no-repeat bg-cover bg-center">
            <div className="relative w-full h-[350px] bg-cover bg-center bg-no-repeat flex items-center px-4">
                <h2 className="relative z-10 text-white text-3xl md:text-[3rem] font-semibold leading-tight max-w-3xl">
                    {title}
                </h2>
            </div>

            <div className="p-4">
                <div className="w-full bg-white py-12 px-6 md:px-10 -mt-10 relative z-10 rounded-2xl box-border">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center p-4">
                        {metrics.map((metric, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <span className="text-4xl font-bold text-[var(--color-primary)]">{metric.value}</span>
                                <p className="text-gray-600 text-sm mt-2 max-w-[180px]">{metric.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

    );
};

export default ImpactMetrics;
