'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useInView } from '@/app/hooks/useInView';
import { useRouter } from 'next/navigation';

interface Project {
  name: string;
  category: string;
  image: string;
  description: string;
  slug?: string;
  techs?: { image: string; name: string }[];
}

type ProjectSize = 'hero' | 'featured' | 'standard' | 'thumbnail';

interface SizedProject extends Project {
  size: ProjectSize;
}

const projects: SizedProject[] = [
  {
    name: 'Renta GO',
    category: 'web',
    image: '/projects/rentago.jpg',
    description: 'Plataforma digital de renta de autos con experiencia 100% digital.',
    slug: 'renta-go',
    size: 'hero',
    techs: [
      { image: '/techs/angular.png', name: 'Angular' },
      { image: '/techs/nodejs.png', name: 'Node JS' },
    ],
  },
  {
    name: 'Mercadatos SAS BIC',
    category: 'web',
    image: '/projects/mercadatos.png',
    description: 'Gestión documental inteligente para empresas en transformación.',
    slug: 'mercadatos',
    size: 'featured',
    techs: [{ image: '/techs/angular.png', name: 'Angular' }],
  },
  {
    name: 'Software Programación Lineal',
    category: 'web',
    image: '/projects/PL-software.png',
    description: 'Resolver problemas de optimización con interfaz intuitiva.',
    slug: 'programacion-lineal',
    size: 'standard',
    techs: [
      { image: '/techs/vue.png', name: 'Vue' },
      { image: '/techs/python.png', name: 'Python' },
    ],
  },
  {
    name: 'Vehicle Care',
    category: 'design',
    image: '/projects/vehicleCare.png',
    description: 'Diseño UX/UI para gestión integral de mantenimiento vehicular.',
    slug: 'vehicle-care',
    size: 'standard',
    techs: [{ image: '/techs/figma.png', name: 'Figma' }],
  },
];

const staggerDelay = (i: number) => `${i * 120}ms`;

export default function EditorialPortfolio() {
  const { ref, inView } = useInView<HTMLElement>();
  const router = useRouter();

  return (
    <section
      ref={ref}
      aria-labelledby="portfolio-heading"
      className="w-full bg-white py-20 md:py-28 overflow-hidden"
    >
      <div className="container-app">
        {/* Header */}
        <header className="mb-12 md:mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)] mb-3">
            Proyectos destacados
          </span>
          <h2
            id="portfolio-heading"
            className="section-heading text-[var(--color-dark)] max-w-2xl"
          >
            Casos de éxito que{' '}
            <span className="text-[var(--color-primary)]">transforman negocios</span>
          </h2>
        </header>

        {/* ── DESKTOP: Grid editorial asimétrico (lg+) ── */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-5 lg:auto-rows-[minmax(220px,auto)]">
          {projects.map((project, i) => (
            <div
              key={project.name}
              className={`transition-all duration-700 ease-out ${
                inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              } ${
                project.size === 'hero'
                  ? 'col-span-2 row-span-2'
                  : project.size === 'featured'
                  ? 'col-span-2'
                  : 'col-span-1'
              }`}
              style={{ transitionDelay: staggerDelay(i) }}
            >
              <EditorialBlockDesktop project={project} router={router} />
            </div>
          ))}
        </div>

        {/* ── MOBILE/TABLET: Lista editorial vertical (< lg) ── */}
        <div className="flex flex-col gap-6 lg:hidden">
          {projects.map((project, i) => (
            <div
              key={project.name}
              className={`transition-all duration-700 ease-out ${
                inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: staggerDelay(i) }}
            >
              <EditorialBlockMobile project={project} router={router} />
            </div>
          ))}
        </div>

        {/* CTA final */}
        <div className="mt-14 md:mt-20 text-center">
          <Link
            href="/portafolio"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-7 py-3.5 text-sm font-semibold text-white min-h-[44px] transition-all duration-300 hover:bg-[var(--color-secondary)] active:scale-[0.97]"
          >
            Ver todos los proyectos
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   Desktop Editorial Block
   ═══════════════════════════════════════════════ */

function EditorialBlockDesktop({
  project,
  router,
}: {
  project: SizedProject;
  router: ReturnType<typeof useRouter>;
}) {
  const isHero = project.size === 'hero';
  const isFeatured = project.size === 'featured';

  const handleClick = () => {
    // Usar slug si existe, sino usar el nombre en lowercase
    const slug = project.slug || project.name.toLowerCase().replace(/\s+/g, '-');
    router.push(`/proyectos/${slug}`);
  };

  // Hero: imagen grande + texto superpuesto
  if (isHero) {
    return (
      <button
        onClick={handleClick}
        className="group relative w-full h-full min-h-[440px] rounded-2xl overflow-hidden bg-[var(--color-dark)] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
      >
        <img
          src={project.image}
          alt={project.name}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-7">
          <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50 mb-2">
            {project.category === 'web' ? 'Desarrollo Web' : 'Diseño UX/UI'}
          </span>
          <h3 className="text-2xl font-bold text-white leading-tight">{project.name}</h3>
          <p className="mt-1.5 text-sm text-white/70 max-w-md line-clamp-2">{project.description}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-all duration-300 group-hover:gap-2.5">
            Ver caso de estudio
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </button>
    );
  }

  // Featured: imagen derecha, texto izquierda
  if (isFeatured) {
    return (
      <button
        onClick={handleClick}
        className="group relative w-full min-h-[210px] rounded-2xl overflow-hidden bg-white border border-black/[0.06] text-left flex items-stretch focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] hover:shadow-[0_8px_25px_-12px_rgba(0,0,0,0.12)] transition-all duration-500"
      >
        <div className="flex-1 p-6 flex flex-col justify-center">
          <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-primary)] mb-1.5">
            {project.category === 'web' ? 'Desarrollo Web' : 'Diseño UX/UI'}
          </span>
          <h3 className="text-lg font-bold text-[var(--color-dark)] leading-snug">{project.name}</h3>
          <p className="mt-1 text-sm text-[var(--color-dark-gray)] line-clamp-2">{project.description}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] transition-all duration-300 group-hover:gap-2.5">
            Ver caso
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
        <div className="w-[180px] shrink-0 overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </button>
    );
  }

  // Standard: vertical compacto
  return (
    <button
      onClick={handleClick}
      className="group relative w-full min-h-[280px] rounded-2xl overflow-hidden bg-[var(--color-dark)] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
    >
      <img
        src={project.image}
        alt={project.name}
        className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50 mb-1.5">
          {project.category === 'web' ? 'Web' : 'Diseño'}
        </span>
        <h3 className="text-base font-bold text-white leading-snug">{project.name}</h3>
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-white/80 transition-all duration-300 group-hover:gap-2">
          Ver caso
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </button>
  );
}

/* ═══════════════════════════════════════════════
   Mobile Editorial Block
   ═══════════════════════════════════════════════ */

function EditorialBlockMobile({
  project,
  router,
}: {
  project: SizedProject;
  router: ReturnType<typeof useRouter>;
}) {
  const handleClick = () => {
    const slug = project.slug || project.name.toLowerCase().replace(/\s+/g, '-');
    router.push(`/proyectos/${slug}`);
  };

  return (
    <button
      onClick={handleClick}
      className="group relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[var(--color-dark)] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] active:scale-[0.98] transition-all duration-300"
    >
      <img
        src={project.image}
        alt={project.name}
        className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50 mb-1">
          {project.category === 'web' ? 'Desarrollo Web' : 'Diseño UX/UI'}
        </span>
        <h3 className="text-lg md:text-xl font-bold text-white leading-tight">{project.name}</h3>
        <p className="mt-1 text-sm text-white/70 line-clamp-1">{project.description}</p>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-all duration-300 group-hover:gap-2.5">
          Ver caso de estudio
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </button>
  );
}