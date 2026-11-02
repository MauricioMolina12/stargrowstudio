"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { Newsreader } from "next/font/google";
import { ArrowRight as IconArrowRight, ArrowUp as IconArrowUp } from "lucide-react";
import Link from "next/link";

import { BlogHero } from "./components/BlogHero";
import { ArticleCard } from "./components/ArticleCard";
import { FeaturedArticleCard } from "./components/FeaturedArticleCard";
import { MiniArticleCard } from "./components/MiniArticleCard";
import { FinalCTA } from "./components/BlogCTA";
import { useInView } from "../hooks/useInView";
import type { PostListItem, BlogFilters } from "./types";
import "./styles/animations.css";

const newsreader = Newsreader({
  variable: "--font-editorial",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

type BlogPageClientProps = {
  initialPosts: PostListItem[];
  categories: { title: string; slug: string }[];
  error: boolean;
};

function SectionReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function BlogPageClient({ initialPosts, categories, error }: BlogPageClientProps) {
  const [filters, setFilters] = useState<BlogFilters>({ sort: "recent" });
  const [activeCategory, setActiveCategory] = useState<string | undefined>();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Sincroniza ?categoria= de la URL al montar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("categoria");
      if (cat) setActiveCategory(cat);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 800);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredPosts = useMemo(() => {
    let result = [...initialPosts];

    if (activeCategory) {
      result = result.filter((p) =>
        p.categories?.some((c) => c.slug === activeCategory)
      );
    }

    if (filters.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q) ||
          p.categories?.some((c) => c.title.toLowerCase().includes(q))
      );
    }

    switch (filters.sort) {
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.publishedAt ?? 0).getTime() -
            new Date(b.publishedAt ?? 0).getTime()
        );
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        result.sort(
          (a, b) =>
            new Date(b.publishedAt ?? 0).getTime() -
            new Date(a.publishedAt ?? 0).getTime()
        );
    }

    return result;
  }, [initialPosts, activeCategory, filters]);

  const handleFiltersChange = useCallback((newFilters: BlogFilters) => {
    setFilters(newFilters);
  }, []);

  const handleCategoryChange = useCallback((slug: string | undefined) => {
    setActiveCategory(slug);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ sort: "recent" });
    setActiveCategory(undefined);
  }, []);

  // Error state
  if (error) {
    return (
      <main className={`${newsreader.variable} min-h-screen bg-[var(--color-background)]`}>
        <BlogHero
          filters={filters}
          onFiltersChange={handleFiltersChange}
          totalPosts={0}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        <div className="container-app py-16 text-center">
          <div className="mx-auto max-w-md rounded-2xl border border-red-200 bg-red-50 p-8 dark:border-red-900 dark:bg-red-950/20">
            <h2 className="text-lg font-semibold text-red-600 dark:text-red-400">
              Error al cargar artículos
            </h2>
            <p className="mt-2 text-sm text-red-500 dark:text-red-400/80">
              No pudimos conectar con el servidor. Intenta recargar la página más tarde.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Reintentar
            </button>
          </div>
        </div>
      </main>
    );
  }

  const isFiltering = Boolean(activeCategory || filters.query || (filters.sort && filters.sort !== "recent"));
  const featuredPost = filteredPosts[0];
  const sidebarPosts = filteredPosts.slice(1, 4);

  return (
    <main className={`${newsreader.variable} min-h-screen bg-[var(--color-background)] pb-20`}>
      {/* Cabecera Editorial con buscador y filtros */}
      <BlogHero
        filters={filters}
        onFiltersChange={handleFiltersChange}
        totalPosts={initialPosts.length}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Sin resultados al filtrar */}
      {initialPosts.length > 0 && filteredPosts.length === 0 && (
        <div className="container-app py-16 text-center anim-fade-up">
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-white-to-primary)] p-8">
            <h2 className="font-editorial text-xl font-bold text-[var(--color-primary-to-white)]">
              No encontramos artículos
            </h2>
            <p className="mt-2 text-sm text-[var(--color-dark-gray)]">
              {filters.query
                ? `No hay resultados para "${filters.query}". Intenta con otra palabra clave.`
                : activeCategory
                  ? "No hay artículos en esta categoría todavía."
                  : "Aún no hay artículos publicados."}
            </p>
            <button
              onClick={resetFilters}
              className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-bright)]"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      )}

      {/* Estado vacío inicial */}
      {initialPosts.length === 0 && !error && (
        <div className="container-app py-16 text-center anim-fade-up">
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-white-to-primary)] p-8">
            <h2 className="font-editorial text-xl font-bold text-[var(--color-primary-to-white)]">
              Aún no hay artículos publicados
            </h2>
            <p className="mt-2 text-sm text-[var(--color-dark-gray)]">
              Vuelve pronto para leer contenido exclusivo sobre transformación digital, branding y diseño UX/UI.
            </p>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      {filteredPosts.length > 0 && (
        <div className="container-app pt-10 lg:pt-12">
          {/* Portada Destacada + Columna Editorial (cuando no hay búsqueda activa) */}
          {!isFiltering && featuredPost && (
            <section aria-label="Portada editorial" className="mb-16">
              <SectionReveal>
                <div className="mb-6 flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-primary-bright)]">
                      Edición Principal
                    </span>
                    <h2 className="font-editorial mt-0.5 text-2xl font-bold tracking-tight text-[var(--color-primary-to-white)] sm:text-3xl">
                      Destacados de la semana
                    </h2>
                  </div>
                  <span className="hidden text-xs font-medium text-[var(--color-dark-gray)] sm:block">
                    Lecturas seleccionadas por nuestro equipo
                  </span>
                </div>
              </SectionReveal>

              {/* Grid 62% / 38% con alturas idénticas (lg:items-stretch) */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,62%)_minmax(0,38%)] lg:items-stretch">
                {/* Columna izquierda: Artículo principal */}
                <div className="min-w-0 h-full">
                  <FeaturedArticleCard post={featuredPost} index={0} />
                </div>

                {/* Columna derecha: Lecturas esenciales */}
                {sidebarPosts.length > 0 && (
                  <aside
                    className="flex h-full min-w-0 flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-white-to-primary)] p-5 sm:p-6"
                    aria-label="Lecturas esenciales"
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3.5">
                        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-primary-to-white)]">
                          En esta edición
                        </h3>
                        <span className="text-[11px] font-medium text-[var(--color-dark-gray)]">
                          Top {sidebarPosts.length} lecturas
                        </span>
                      </div>

                      <div className="flex flex-col divide-y divide-[var(--color-border)]">
                        {sidebarPosts.map((post, i) => (
                          <div key={post._id} className="py-4 first:pt-4 last:pb-2">
                            <MiniArticleCard post={post} index={i + 1} />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 border-t border-[var(--color-border)] pt-4 flex items-center justify-between">
                      <span className="text-xs text-[var(--color-dark-gray)]">
                        ¿Buscas asesoría personalizada?
                      </span>
                      <Link
                        href="/cotizar"
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-primary-bright)] transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-bright)]"
                      >
                        Conversemos
                        <IconArrowRight size={14} aria-hidden="true" />
                      </Link>
                    </div>
                  </aside>
                )}
              </div>
            </section>
          )}

          {/* Catálogo completo en cuadrícula simétrica de 3 columnas */}
          <section aria-label="Todas las publicaciones">
            <SectionReveal>
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-t border-[var(--color-border)] pt-8">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-primary-bright)]">
                    Archivo Editorial
                  </span>
                  <h2 className="font-editorial mt-0.5 text-2xl font-bold tracking-tight text-[var(--color-primary-to-white)] sm:text-3xl">
                    {activeCategory
                      ? categories.find((c) => c.slug === activeCategory)?.title ?? "Artículos"
                      : filters.query
                        ? `Resultados para "${filters.query}"`
                        : "Todas las publicaciones"}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-[var(--color-dark-gray)]">
                    Mostrando {filteredPosts.length}{" "}
                    {filteredPosts.length === 1 ? "artículo" : "artículos"}
                  </span>
                  {isFiltering && (
                    <button
                      onClick={resetFilters}
                      className="cursor-pointer rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-bright)] transition-colors hover:border-[var(--color-primary-bright)] hover:bg-[var(--color-primary-tint)]"
                    >
                      Restablecer
                    </button>
                  )}
                </div>
              </div>
            </SectionReveal>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
              {filteredPosts.map((post, i) => (
                <ArticleCard key={post._id} post={post} index={i} />
              ))}
            </div>
          </section>

          {/* CTA Final simétrico */}
          <div className="mt-16">
            <FinalCTA />
          </div>
        </div>
      )}

      {/* Botón volver arriba */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-lg transition-all duration-300 hover:bg-[var(--color-secondary)] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] anim-fade-in"
          aria-label="Volver arriba"
        >
          <IconArrowUp size={18} aria-hidden="true" />
        </button>
      )}
    </main>
  );
}
