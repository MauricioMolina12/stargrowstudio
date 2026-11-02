"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowUp, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { ReadingProgress } from "../components/ReadingProgress";
import { ShareArticle } from "../components/ShareArticle";
import { InlineCTA, FinalCTA } from "../components/BlogCTA";
import "../styles/animations.css";
import type { ReactNode } from "react";

type ArticleDetailClientProps = {
  post: {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    mainImage?: unknown;
    publishedAt?: string;
    readingTime?: number;
    categories?: { title: string; slug: string }[];
    author?: { name: string; role?: string };
  };
  readingTime: number;
  ogImageUrl?: string;
  fontClassName?: string;
  children: ReactNode;
};

export function ArticleDetailClient({
  post,
  fontClassName = "",
  children,
}: ArticleDetailClientProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className={`${fontClassName} min-h-screen bg-[var(--color-background)] pb-20`}>
      <ReadingProgress />

      {/* Columna editorial unificada y simétrica */}
      <div className="container-app">
        <div className="mx-auto w-full max-w-[740px]">
          {children}

          {/* Share + Navigation section */}
          <div className="mt-10 border-y border-[var(--color-border)] py-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-sm font-bold text-[var(--color-primary-to-white)]">
                  ¿Te resultó útil este artículo?
                </h3>
                <p className="mt-0.5 text-xs text-[var(--color-dark-gray)] sm:text-sm">
                  Compártelo con tu equipo o continúa explorando nuestras publicaciones.
                </p>
              </div>
              <ShareArticle title={post.title} slug={post.slug} />
            </div>
          </div>

          {/* Navigation row */}
          <div className="mt-6 flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-dark-gray)] transition-colors hover:text-[var(--color-primary-bright)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-bright)]"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              Volver al blog
            </Link>
            <Link
              href="/cotizar"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-primary-bright)] transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-bright)]"
            >
              Hablar con un especialista
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>

          {/* CTAs alineados exactamente al mismo ancho de columna */}
          <div className="mt-10 space-y-8">
            <InlineCTA />
            <FinalCTA />
          </div>
        </div>
      </div>

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-lg transition-all duration-300 hover:bg-[var(--color-secondary)] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] anim-fade-in"
          aria-label="Volver arriba"
        >
          <ArrowUp size={18} aria-hidden="true" />
        </button>
      )}
    </main>
  );
}
