"use client";

import { useEffect, useRef, useState } from "react";
import { sanityFetch } from "@/sanity/lib/sanity.fetch";
import { SEARCH_ARTICLES } from "@/sanity/lib/queries/articles.queries";
import { ArticlesType } from "@/app/types/articles";
import { SearchIcon, Clock, X } from "lucide-react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

const STORAGE_KEY = "articles_search_history";
const MAX_HISTORY = 5;

function getSearchHistory(): string[] {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveSearchQuery(query: string) {
    if (typeof window === "undefined") return;

    const history = getSearchHistory().filter((q) => q !== query);
    const updated = [query, ...history].slice(0, MAX_HISTORY);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}


export default function ArticlesSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<ArticlesType[]>([]);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(-1);


    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setHistory(getSearchHistory());
    }, []);

    useEffect(() => {
        setActiveIndex(-1);
    }, [query, results, history]);



    useEffect(() => {
        if (!query || query.length < 2) {
            setResults([]);
            return;
        }

        const timeout = setTimeout(async () => {
            setLoading(true);

            const data = await sanityFetch<ArticlesType[]>({
                query: SEARCH_ARTICLES,
                params: { search: `*${query}*` },
            });

            setResults(data);
            setLoading(false);

            saveSearchQuery(query);
            setHistory(getSearchHistory());
        }, 400);

        return () => clearTimeout(timeout);
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const items = query ? results : history;
        if (!items.length) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setActiveIndex((prev) =>
                    prev < items.length - 1 ? prev + 1 : 0
                );
                break;

            case "ArrowUp":
                e.preventDefault();
                setActiveIndex((prev) =>
                    prev > 0 ? prev - 1 : items.length - 1
                );
                break;

            case "Enter":
                e.preventDefault();
                if (activeIndex === -1) return;

                if (query) {
                    const article = results[activeIndex];
                    window.location.href = `/articles/${article.slug}`;
                } else {
                    const value = history[activeIndex];
                    setQuery(value);
                    setOpen(true);
                }
                break;

            case "Escape":
                setOpen(false);
                break;
        }
    };


    const clearHistory = () => {
        localStorage.removeItem("articles_search_history");
        setHistory([]);
    };

    return (
        <div ref={containerRef} className="relative w-full lg:w-[320px]">

            <div className="relative">
                <SearchIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
                    size={18}
                />

                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder="Buscar artículos..."
                    className="
                        w-full h-11 pl-11 pr-4
                        rounded-xl
                        bg-white/80 backdrop-blur
                        border border-gray-200
                        text-sm
                        placeholder:text-gray-400
                        focus:outline-none
                        transition-all
                          "
                />
            </div>

            {open && (query || history.length > 0) && (
                <div
                    className="
            absolute top-[calc(100%+10px)] left-0 w-full
            rounded-xl
            bg-white/90 backdrop-blur-xl
            border border-gray-200
            shadow-[0_10px_30px_rgba(0,0,0,0.08)]
            z-30
            max-h-[420px]
            overflow-auto
          "
                >
                    {!query && history.length > 0 && (
                        <div className="p-3">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-gray-400">Búsquedas recientes</p>

                                <button
                                    onClick={clearHistory}
                                    className="text-xs text-gray-400 hover:text-red-500 transition"
                                >
                                    Limpiar
                                </button>
                            </div>

                            <ul className="flex flex-col gap-1">
                                {history.map((item, index) => (
                                    <li
                                        key={item}
                                        onClick={() => {
                                            setQuery(item);
                                            setOpen(true);
                                        }}
                                        className={`
                                            flex items-center gap-2
                                            px-3 py-2 rounded-lg
                                            text-sm cursor-pointer
                                            transition
                                            ${activeIndex === index
                                                ? "bg-[#5656B5]/10 text-[#5656B5]"
                                                : "text-gray-700 hover:bg-[#5656B5]/5"
                                            }
                                            `}
                                    >

                                        <Clock size={14} className="text-gray-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {query && (
                        <>
                            {loading && (
                                <div className="p-4 text-sm text-gray-500">
                                    Buscando resultados…
                                </div>
                            )}

                            {!loading && results.length === 0 && (
                                <div className="p-4 text-sm text-gray-500">
                                    No se encontraron artículos
                                </div>
                            )}

                            {!loading &&
                                results.map((article, index) => (
                                    <Link
                                        key={article._id}
                                        href={`/articles/${article.slug}`}
                                        className={`
                                                flex gap-4 items-start
                                                px-4 py-3
                                                transition-colors
                                                ${activeIndex === index
                                                ? "bg-[#5656B5]/10"
                                                : "hover:bg-[#5656B5]/5"
                                            }
                                            `}>

                                        {article.coverImage && (
                                            <img
                                                src={urlFor(article.coverImage).url()}
                                                alt={article.title}
                                                className="
                          w-14 h-14
                          object-cover
                          rounded-lg
                          flex-shrink-0
                        "
                                            />
                                        )}

                                        <div className="flex flex-col gap-1">
                                            <h4 className="text-sm font-medium text-gray-900">
                                                {article.title}
                                            </h4>
                                            {article.excerpt && (
                                                <p className="text-xs text-gray-500 line-clamp-2">
                                                    {article.excerpt}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
