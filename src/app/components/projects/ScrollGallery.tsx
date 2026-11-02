'use client';

import { useIsDesktop } from '@/app/hooks/useIsDesktop';
import MobileGalleryCarousel from './MobileGalleryCarousel';
import { useInView } from '@/app/hooks/useInView';

type GalleryItem = {
  image?: string;
  alt?: string;
  title?: string;
  description?: string;
  category?: string;
};

type Props = {
  items: GalleryItem[];
};

/**
 * ScrollGallery renders differently based on viewport:
 * - Desktop (≥1024px): stacking/pinned sections with scroll-reveal layers
 * - Mobile/tablet (<1024px): horizontal carousel with swipe, autoplay, touch controls
 *
 * This component is the sole entry point — the stacking effect code is
 * completely untouched and only rendered on desktop viewports.
 */
export default function ScrollGallery({ items }: Props) {
  const isDesktop = useIsDesktop(1024);

  if (!items.length) return null;

  return (
    <>
      {isDesktop ? (
        <DesktopScrollGallery items={items} />
      ) : (
        <MobileGalleryCarousel items={items} />
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════
   DESKTOP-ONLY: original stacking/pinned sections
   Completely untouched — same code as before.
   ═══════════════════════════════════════════════ */

function DesktopScrollGallery({ items }: { items: GalleryItem[] }) {
  return (
    <section className="w-full bg-[var(--color-surface)]">
      {/* Header */}
      <div className="container-app py-16 md:py-20">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary-bright)]">
          Galería del proyecto
        </span>
        <h2 className="mt-4 max-w-2xl text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold leading-[1.08] tracking-tight text-[var(--color-dark)]">
          Imágenes del{' '}
          <span className="text-[var(--color-primary-bright)]">caso de estudio</span>
        </h2>
      </div>

      {/* Scrollable layers — stacking effect */}
      <div className="relative">
        {items.map((item, i) => (
          <DesktopGalleryLayer
            key={i}
            item={item}
            index={i}
            total={items.length}
          />
        ))}
      </div>
    </section>
  );
}

/* ─────────── Single sticky layer (desktop) ─────────── */

function DesktopGalleryLayer({
  item,
  index,
  total,
}: {
  item: GalleryItem;
  index: number;
  total: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="sticky top-0 w-full h-screen overflow-hidden"
      style={{ zIndex: index }}
    >
      {item.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.image}
          alt={item.alt || item.title || `Imagen ${index + 1}`}
          className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-1000 ease-out ${
            inView ? 'scale-100 opacity-100' : 'scale-[1.05] opacity-0'
          }`}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

      <div
        className={`absolute bottom-12 left-8 md:bottom-16 md:left-12 lg:left-16 max-w-xl transition-all duration-700 delay-300 ease-out ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        {item.category && (
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50 mb-2">
            {item.category}
          </span>
        )}
        {item.title && (
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.1] tracking-tight">
            {item.title}
          </h3>
        )}
        {item.description && (
          <p className="mt-3 max-w-lg text-sm md:text-base text-white/70 leading-relaxed">
            {item.description}
          </p>
        )}
        <span className="mt-4 inline-block text-sm font-medium text-white/40">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}