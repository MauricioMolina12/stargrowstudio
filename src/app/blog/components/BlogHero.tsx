"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useCallback } from "react";
import type { BlogFilters } from "../types";
import "../styles/animations.css";

type BlogHeroProps = {
  filters: BlogFilters;
  onFiltersChange: (filters: BlogFilters) => void;
  totalPosts: number;
  categories: { title: string; slug: string }[];
  activeCategory: string | undefined;
  onCategoryChange: (slug: string | undefined) => void;
};

export function BlogHero({
  filters,
  onFiltersChange,
  totalPosts,
  categories,
  activeCategory,
  onCategoryChange,
}: BlogHeroProps) {
  const handleSearch = useCallback(
    (value: string) => {
      onFiltersChange({ ...filters, query: value || undefined });
    },
    [filters, onFiltersChange]
  );

  const handleSortCycle = useCallback(() => {
    const sorts: NonNullable<BlogFilters["sort"]>[] = ["recent", "oldest", "title"];
    const currentIndex = sorts.indexOf(filters.sort ?? "recent");
    const nextSort = sorts[(currentIndex + 1) % sorts.length];
    onFiltersChange({ ...filters, sort: nextSort });
  }, [filters, onFiltersChange]);

  const sortLabel =
    filters.sort === "oldest"
      ? "Más antiguos"
      : filters.sort === "title"
        ? "Orden A–Z"
        : "Más recientes";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-primary-tint)]/70 to-transparent pt-6 dark:from-[var(--color-primary)]/10 lg:pt-10">
      <div className="container-app">
        {/* Barra superior de cabecera estilo editorial */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-dark-gray)]">
          <span>Star Grow Studio · Editorial</span>
          <span>
            {totalPosts} {totalPosts === 1 ? "artículo publicado" : "artículos publicados"}
          </span>
        </div>

        {/* Titular principal simétrico */}
        <div className="mx-auto max-w-3xl py-10 text-center anim-fade-up lg:py-14">
          <span className="inline-block rounded-full bg-[var(--color-primary)]/10 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-primary-bright)]">
            Revista Digital & Perspectivas B2B
          </span>

          <h1 className="font-editorial mt-4 text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[var(--color-primary-to-white)] sm:text-5xl lg:text-[3.4rem]">
            Ideas y estrategia para la{" "}
            <span className="bg-gradient-to-r from-[var(--color-text-grad-from)] to-[var(--color-text-grad-to)] bg-clip-text text-transparent">
              transformación digital
            </span>
          </h1>

          <p className="font-editorial mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-dark-gray)] sm:text-lg">
            Análisis a fondo sobre branding estratégico, diseño de producto UX/UI, tecnología y crecimiento empresarial.
          </p>
        </div>

        {/* Barra simétrica de categorías, búsqueda y ordenamiento */}
        <div className="flex flex-col gap-4 border-y border-[var(--color-border)] py-3.5 lg:flex-row lg:items-center lg:justify-between">
          {/* Pestañas de categorías */}
          <div
            className="flex flex-wrap items-center gap-2"
            role="tablist"
            aria-label="Filtrar por categoría"
          >
            <button
              role="tab"
              aria-selected={!activeCategory}
              onClick={() => onCategoryChange(undefined)}
              className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-bright)] ${
                !activeCategory
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "border border-[var(--color-border)] bg-[var(--color-white-to-primary)] text-[var(--color-dark-gray)] hover:border-[var(--color-primary-bright)] hover:text-[var(--color-primary-bright)]"
              }`}
            >
              Todos ({totalPosts})
            </button>
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onCategoryChange(isSelected ? undefined : cat.slug)}
                  className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-bright)] ${
                    isSelected
                      ? "bg-[var(--color-primary)] text-white shadow-sm"
                      : "border border-[var(--color-border)] bg-[var(--color-white-to-primary)] text-[var(--color-dark-gray)] hover:border-[var(--color-primary-bright)] hover:text-[var(--color-primary-bright)]"
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>

          {/* Buscador y selector de orden alineados a la derecha */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex-1 sm:w-64 sm:flex-initial">
              <Search
                size={15}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-dark-gray)]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={filters.query ?? ""}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Buscar artículo..."
                className="w-full rounded-full border border-[var(--color-border)] bg-[var(--color-white-to-primary)] py-1.5 pl-9 pr-8 text-xs text-[var(--color-primary-to-white)] transition-all duration-200 placeholder:text-[var(--color-dark-gray)] hover:border-[var(--color-primary-bright)] focus:border-[var(--color-primary-bright)] focus:outline-none"
                aria-label="Buscar artículos del blog"
              />
              {filters.query && (
                <button
                  onClick={() => handleSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-[var(--color-dark-gray)] hover:text-[var(--color-primary-bright)]"
                  aria-label="Limpiar búsqueda"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            <button
              onClick={handleSortCycle}
              className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-white-to-primary)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-dark-gray)] transition-colors hover:border-[var(--color-primary-bright)] hover:text-[var(--color-primary-bright)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-bright)]"
              aria-label={`Ordenar artículos: ${sortLabel}`}
            >
              <SlidersHorizontal size={13} aria-hidden="true" />
              <span>{sortLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
