'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2, FileText, FolderKanban, Lightbulb, Code2, ArrowRight } from 'lucide-react';
import { useGlobalSearch } from '@/app/hooks/useSearch';
import type { SearchResult } from '@/sanity/services/search.service';
import { getIcon } from '@/app/components/layout/nav/iconMap';

type CategoryKey = 'Servicios' | 'Casos de éxito' | 'Insights' | 'Tecnologías';

const CATEGORY_ICONS: Record<CategoryKey, typeof FileText> = {
  Servicios: FolderKanban,
  'Casos de éxito': FileText,
  Insights: Lightbulb,
  Tecnologías: Code2,
};

const CATEGORY_ORDER: CategoryKey[] = ['Servicios', 'Casos de éxito', 'Insights', 'Tecnologías'];

export default function SearchModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { query, results, loading, recent, setQuery, search, clearRecent } = useGlobalSearch();
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const grouped = useMemo(() => {
    const g: Record<string, SearchResult[]> = {};
    for (const cat of CATEGORY_ORDER) g[cat] = [];
    const seen = new Set<string>();
    for (const item of results) {
      const key = `${item.category}-${item._id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const cat = item.category as CategoryKey;
      if (g[cat]) g[cat].push(item);
    }
    return g;
  }, [results]);

  const flatItems = useMemo(() => {
    const flat: SearchResult[] = [];
    for (const cat of CATEGORY_ORDER) flat.push(...grouped[cat]);
    return flat;
  }, [grouped]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => { search(); }, 250);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query, search]);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((p) => (p < flatItems.length - 1 ? p + 1 : 0));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((p) => (p > 0 ? p - 1 : flatItems.length - 1));
    }
    if (e.key === 'Enter' && activeIndex >= 0 && flatItems[activeIndex]) {
      e.preventDefault();
      router.push(`/${flatItems[activeIndex].path}`);
      onClose();
    }
  }, [flatItems, activeIndex, router, onClose]);

  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return;
    const el = listRef.current.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  useEffect(() => { setActiveIndex(-1); }, [results]);

  return (
    <>
      {/* Overlay sutil que oscurece el fondo */}
      <div
        className="fixed inset-0 z-[100]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal centrado horizontalmente, debajo del navbar */}
      <div className="fixed inset-x-0 top-16 z-[101] flex justify-center px-4">
        <div
          className="w-full max-w-[680px] bg-[var(--color-surface-elevated)] rounded-xl shadow-[0_25px_60px_-12px_rgba(0,0,0,0.3)] border border-[var(--color-border-subtle)] overflow-hidden"
          onKeyDown={handleKeyDown}
        >
          {/* Input row */}
          <div className="flex items-center gap-3 px-5 py-4">
            <Search className="h-5 w-5 shrink-0 text-[var(--color-dark-gray)]" strokeWidth={1.5} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar servicios, proyectos, tecnologías o artículos..."
              className="flex-1 bg-transparent text-[0.95rem] text-[var(--color-dark)] placeholder:text-[var(--color-dark-gray)] outline-none"
              aria-label="Buscar"
            />
            {loading && <Loader2 className="h-4 w-4 animate-spin text-[var(--color-primary-bright)]" strokeWidth={2} />}
            <kbd className="hidden shrink-0 rounded-md border border-[var(--color-border-subtle)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-dark-gray)] sm:inline-block">
              ESC
            </kbd>
          </div>

          {/* Separator */}
          {flatItems.length > 0 || query.trim() ? (
            <div className="border-t border-[var(--color-border-subtle)]" />
          ) : null}

          {/* Results */}
          <div ref={listRef} className="max-h-[55vh] overflow-y-auto px-3 py-3" role="listbox" aria-label="Resultados">
          {/* Hint state — no query yet - show recent searches */}
          {!query.trim() && !loading && flatItems.length === 0 && (
            <>
              {recent.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between px-2 py-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-dark-gray)]">
                      Búsquedas recientes
                    </span>
                    <button
                      onClick={clearRecent}
                      className="text-[11px] text-[var(--color-dark-gray)] hover:text-[var(--color-primary-bright)] transition-colors"
                    >
                      Limpiar
                    </button>
                  </div>
                  {recent.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => setQuery(r)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[0.9rem] text-[var(--color-dark)] transition-colors hover:bg-[var(--color-hover)]"
                    >
                      <Search className="h-4 w-4 shrink-0 text-[var(--color-dark-gray)]" strokeWidth={1.5} />
                      <span className="truncate">{r}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 py-14 text-center">
                  <Search className="h-8 w-8 text-[var(--color-dark-gray)]" strokeWidth={1} />
                  <p className="text-sm font-medium text-[var(--color-dark)]">Busca en todo el sitio</p>
                  <p className="max-w-xs text-xs text-[var(--color-dark-gray)]">Servicios, casos de éxito, artículos y tecnologías que usamos</p>
                </div>
              )}
            </>
          )}

            {/* Loading state */}
            {loading && flatItems.length === 0 && (
              <div className="flex flex-col items-center gap-3 py-14 text-center">
                <Loader2 className="h-6 w-6 animate-spin text-[var(--color-primary-bright)]" strokeWidth={2} />
                <p className="text-sm text-[var(--color-dark-gray)]">Buscando...</p>
              </div>
            )}

            {/* Empty state */}
            {query.trim() && !loading && flatItems.length === 0 && (
              <div className="flex flex-col items-center gap-2 py-14 text-center">
                <Search className="h-8 w-8 text-[var(--color-dark-gray)]" strokeWidth={1} />
                <p className="text-sm font-medium text-[var(--color-dark)]">Sin resultados</p>
                <p className="text-xs text-[var(--color-dark-gray)]">Intenta con otros términos o palabras clave</p>
              </div>
            )}

            {/* Results grouped by category */}
            {flatItems.length > 0 && CATEGORY_ORDER.map((category) => {
              const items = grouped[category];
              if (!items.length) return null;
              const CategoryIcon = CATEGORY_ICONS[category];
              const startIndex = flatItems.indexOf(items[0]);
              return (
                <div key={category} role="group" aria-label={category}>
                  <div className="flex items-center gap-2 px-2 py-2">
                    <CategoryIcon className="h-3.5 w-3.5 text-[var(--color-dark-gray)]" strokeWidth={1.5} />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-dark-gray)]">
                      {category}
                    </span>
                  </div>
                  {items.map((item, i) => (
                    <SearchItem
                      key={`${item._id}-${category}`}
                      item={item}
                      isActive={activeIndex === startIndex + i}
                      index={startIndex + i}
                      onSelect={onClose}
                    />
                  ))}
                </div>
              );
            })}
          </div>

          {/* Footer hints */}
          <div className="flex items-center gap-4 border-t border-[var(--color-border-subtle)] px-5 py-2.5 text-[11px] text-[var(--color-dark-gray)]">
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-[var(--color-border-subtle)] px-1.5 py-0.5 text-[10px] font-medium">↑↓</kbd> Navegar
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-[var(--color-border-subtle)] px-1.5 py-0.5 text-[10px] font-medium">↵</kbd> Abrir
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-[var(--color-border-subtle)] px-1.5 py-0.5 text-[10px] font-medium">Esc</kbd> Cerrar
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────── Search item ─────────── */

function SearchItem({ item, isActive, index, onSelect }: {
  item: SearchResult;
  isActive: boolean;
  index: number;
  onSelect: () => void;
}) {
  const router = useRouter();
  const Icon = item.iconName ? getIcon(item.iconName) : FolderKanban;

  return (
    <button
      data-index={index}
      role="option"
      aria-selected={isActive}
      onClick={() => { router.push(`/${item.path}`); onSelect(); }}
      className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
        isActive ? 'bg-[var(--color-primary)]/8' : 'hover:bg-[var(--color-hover)]'
      }`}
    >
      <span
        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
        style={{
          backgroundColor: isActive ? 'color-mix(in srgb, var(--color-primary) 14%, transparent)' : 'var(--color-hover)',
          color: isActive ? 'var(--color-primary-bright)' : 'var(--color-dark-gray)',
        }}
      >
        <Icon className="h-4 w-4" strokeWidth={1.5} />
      </span>
      <div className="min-w-0 flex-1">
        <span className="block truncate text-[0.9rem] font-medium text-[var(--color-dark)]">{item.title}</span>
        {item.description && (
          <span className="mt-0.5 line-clamp-1 block text-[0.8rem] text-[var(--color-dark-gray)]">{item.description}</span>
        )}
      </div>
      <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--color-dark-gray)]" strokeWidth={1.5} />
    </button>
  );
}