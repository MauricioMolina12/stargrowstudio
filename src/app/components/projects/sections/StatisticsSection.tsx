import type { SectionProps } from "../SectionRenderer";

export function StatisticsSection({ data }: SectionProps) {
  const items = data.items as { metric?: string; label?: string; description?: string }[] | undefined;

  if (!items?.length) return null;

  return (
    <section className="w-full py-20 md:py-28 bg-[var(--color-primary)]">
      <div className="container-app">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {items.map((item, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-none">
                {item.metric}
              </p>
              <p className="mt-3 text-sm md:text-base font-semibold text-white/80">
                {item.label}
              </p>
              {item.description && (
                <p className="mt-1 text-xs md:text-sm text-white/50 max-w-[180px] mx-auto">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}