"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  Instagram,
  ExternalLink,
  Heart,
  Bookmark,
  MessageCircle,
  Share2,
  Check,
  Sparkles,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { extractInstagramShortcode } from "./instagramUtils";

type InstagramQuickBadgeProps = {
  instagramUrl: string;
  label?: string;
};

/**
 * Píldora interactiva para la barra superior del artículo o proyecto.
 */
export function InstagramQuickBadge({
  instagramUrl,
  label = "Ver en Instagram",
}: InstagramQuickBadgeProps) {
  const handleScrollOrOpen = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const showcase = document.getElementById("instagram-showcase");
    if (showcase) {
      e.preventDefault();
      showcase.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <a
      href={instagramUrl}
      onClick={handleScrollOrOpen}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-white-to-primary)] px-3.5 py-1.5 text-xs font-semibold text-[var(--color-primary-to-white)] transition-all duration-300 hover:border-[var(--color-primary-bright)] hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-bright)]"
      aria-label="Ver publicación relacionada en Instagram"
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white transition-transform duration-300 group-hover:scale-110">
        <Instagram size={11} aria-hidden="true" />
      </span>
      <span>{label}</span>
    </a>
  );
}

type InstagramPostShowcaseProps = {
  instagramUrl: string;
  title: string;
  context?: "article" | "project";
  defaultExpanded?: boolean;
};

/**
 * Componente interactivo para enlazar y previsualizar el post de Instagram
 * asociado a un artículo de blog o caso de éxito, sin bordes superiores extra
 * ni scroll interno en el iframe, y alineado al contenedor padre.
 */
export function InstagramPostShowcase({
  instagramUrl,
  title,
  context = "article",
  defaultExpanded = true,
}: InstagramPostShowcaseProps) {
  const [showEmbed, setShowEmbed] = useState(defaultExpanded);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  // Altura dinámica reportada por el postMessage oficial de Instagram para evitar scroll interno
  const [iframeHeight, setIframeHeight] = useState<number>(860);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const parsed = extractInstagramShortcode(instagramUrl);
  const embedUrl = parsed
    ? `https://www.instagram.com/${parsed.type}/${parsed.code}/embed/`
    : null;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (typeof event.origin === "string" && !event.origin.includes("instagram.com")) {
        return;
      }
      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (
          data &&
          data.type === "MEASURE" &&
          data.details &&
          typeof data.details.height === "number" &&
          data.details.height > 300
        ) {
          setIframeHeight(Math.ceil(data.details.height) + 4);
        }
      } catch {
        // Ignorar mensajes que no sean JSON de Instagram
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(instagramUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  }, [instagramUrl]);

  const contextLabel =
    context === "project"
      ? "Showcase Visual en Instagram"
      : "Carrusel Resumen en Instagram";

  const contextDescription =
    context === "project"
      ? "Explora el desglose visual de este caso de éxito en nuestro feed de Instagram, desliza las piezas clave del proyecto y cuéntanos qué te parece en los comentarios."
      : "Transformamos las ideas clave de este artículo en un carrusel visual listo para guardar y compartir con tu equipo en Instagram.";

  /* ── Layout para Proyectos: alineado al grid de 12 columnas de .container-app ── */
  if (context === "project") {
    return (
      <div
        id="instagram-showcase"
        aria-label="Publicación relacionada en Instagram"
        className="w-full"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Columna izquierda (5 cols): información e interacción alineada con el resto del proyecto */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-dark-gray)]">
              {contextLabel}
            </span>

            <div className="mt-4 flex items-center gap-3.5">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[2px] transition-transform duration-300 hover:scale-105"
                aria-label="Ver en Instagram"
              >
                <span className="flex h-full w-full items-center justify-center rounded-full bg-[var(--color-surface)]">
                  <Instagram size={20} className="text-[#dc2743]" aria-hidden="true" />
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-primary)] text-white ring-2 ring-[var(--color-surface)]">
                  <Sparkles size={9} aria-hidden="true" />
                </span>
              </a>

              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#dc2743]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#dc2743]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#dc2743] animate-pulse" />
                  Post Interactivo
                </span>
                <h3 className="mt-1 text-xl font-bold leading-snug text-[var(--color-primary-to-white)]">
                  @stargrowstudio
                </h3>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[var(--color-dark-gray)]">
              {contextDescription}
            </p>

            {/* Acciones de interacción */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setLiked((prev) => !prev)}
                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
                  liked
                    ? "bg-[#dc2743]/15 text-[#dc2743]"
                    : "border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-[var(--color-dark-gray)] hover:border-[#dc2743]/40 hover:text-[#dc2743]"
                }`}
                aria-pressed={liked}
              >
                <Heart
                  size={14}
                  className={liked ? "fill-[#dc2743] text-[#dc2743] scale-110 transition-transform" : ""}
                  aria-hidden="true"
                />
                <span>{liked ? "¡Te gusta!" : "Me gusta"}</span>
              </button>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSaved(true)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
                  saved
                    ? "bg-[var(--color-primary-tint)] text-[var(--color-primary-bright)]"
                    : "border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-[var(--color-dark-gray)] hover:border-[var(--color-primary-bright)] hover:text-[var(--color-primary-bright)]"
                }`}
              >
                <Bookmark size={14} className={saved ? "fill-current" : ""} aria-hidden="true" />
                <span>Guardar post</span>
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-3.5 py-2 text-xs font-semibold text-[var(--color-dark-gray)] transition-colors hover:border-[var(--color-primary-bright)] hover:text-[var(--color-primary-bright)]"
              >
                <MessageCircle size={14} aria-hidden="true" />
                <span>Comentar</span>
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-3.5 py-2 text-xs font-semibold text-[var(--color-dark-gray)] transition-colors hover:border-[var(--color-primary-bright)] hover:text-[var(--color-primary-bright)]"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-green-600" aria-hidden="true" />
                    <span className="text-green-600">Copiado</span>
                  </>
                ) : (
                  <>
                    <Share2 size={14} aria-hidden="true" />
                    <span>Copiar link</span>
                  </>
                )}
              </button>
            </div>

            {liked && (
              <div className="mt-4 flex items-center justify-between rounded-xl bg-[#dc2743]/10 px-4 py-2.5 text-xs font-medium text-[#dc2743]">
                <span>¡Gracias! Déjanos tu ❤️ directamente en Instagram.</span>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline hover:no-underline"
                >
                  Ir al post →
                </a>
              </div>
            )}

            <div className="mt-6">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-300 hover:opacity-95 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-bright)]"
              >
                <Instagram size={15} aria-hidden="true" />
                Abrir en Instagram
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Columna derecha (7 cols): carrusel embebido sin scroll interno */}
          {embedUrl && (
            <div className="lg:col-span-7 w-full overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-white">
              <iframe
                ref={iframeRef}
                src={embedUrl}
                title={`Publicación de Instagram: ${title}`}
                scrolling="no"
                className="block w-full border-0 overflow-hidden"
                style={{ height: `${iframeHeight}px` }}
                loading="lazy"
                allow="encrypted-media"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── Layout para Artículos de Blog: 100% alineado a la columna de 740px ── */
  return (
    <section
      id="instagram-showcase"
      aria-label="Publicación relacionada en Instagram"
      className="my-8 w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6"
    >
      {/* Cabecera de cuenta e invitación */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3.5">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[2px] transition-transform duration-300 hover:scale-105"
            aria-label="Ver en Instagram"
          >
            <span className="flex h-full w-full items-center justify-center rounded-full bg-[var(--color-surface)]">
              <Instagram size={18} className="text-[#dc2743]" aria-hidden="true" />
            </span>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-primary)] text-white ring-2 ring-[var(--color-surface)]">
              <Sparkles size={9} aria-hidden="true" />
            </span>
          </a>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-primary-bright)]">
                {contextLabel}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#dc2743]/10 px-2 py-0.5 text-[10px] font-semibold text-[#dc2743]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#dc2743] animate-pulse" />
                Post Interactivo
              </span>
            </div>
            <h3 className="font-editorial mt-0.5 text-lg font-bold leading-snug text-[var(--color-primary-to-white)]">
              @stargrowstudio · ¡Velo y guárdalo en Instagram!
            </h3>
          </div>
        </div>

        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-300 hover:opacity-95 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-bright)]"
        >
          <Instagram size={15} aria-hidden="true" />
          Abrir en Instagram
          <ExternalLink size={13} aria-hidden="true" />
        </a>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-[var(--color-dark-gray)]">
        {contextDescription}
      </p>

      {/* Barra de micro-interacción social */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3.5 py-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setLiked((prev) => !prev)}
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
              liked
                ? "bg-[#dc2743]/15 text-[#dc2743]"
                : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-dark-gray)] hover:border-[#dc2743]/40 hover:text-[#dc2743]"
            }`}
            aria-pressed={liked}
          >
            <Heart
              size={13}
              className={liked ? "fill-[#dc2743] text-[#dc2743] scale-110 transition-transform" : ""}
              aria-hidden="true"
            />
            <span>{liked ? "¡Te gusta!" : "Me gusta"}</span>
          </button>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setSaved(true)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
              saved
                ? "bg-[var(--color-primary-tint)] text-[var(--color-primary-bright)]"
                : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-dark-gray)] hover:border-[var(--color-primary-bright)] hover:text-[var(--color-primary-bright)]"
            }`}
          >
            <Bookmark size={13} className={saved ? "fill-current" : ""} aria-hidden="true" />
            <span>Guardar post</span>
          </a>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--color-dark-gray)] transition-colors hover:border-[var(--color-primary-bright)] hover:text-[var(--color-primary-bright)]"
          >
            <MessageCircle size={13} aria-hidden="true" />
            <span className="hidden sm:inline">Comentar</span>
          </a>

          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--color-dark-gray)] transition-colors hover:border-[var(--color-primary-bright)] hover:text-[var(--color-primary-bright)]"
          >
            {copied ? (
              <>
                <Check size={13} className="text-green-600" aria-hidden="true" />
                <span className="text-green-600">Link copiado</span>
              </>
            ) : (
              <>
                <Share2 size={13} aria-hidden="true" />
                <span>Copiar link</span>
              </>
            )}
          </button>
        </div>

        {embedUrl && (
          <button
            type="button"
            onClick={() => setShowEmbed((prev) => !prev)}
            className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-primary-bright)] transition-colors hover:underline"
            aria-expanded={showEmbed}
          >
            <Eye size={14} aria-hidden="true" />
            <span>{showEmbed ? "Ocultar vista previa" : "Ver carrusel aquí"}</span>
            {showEmbed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        )}
      </div>

      {liked && (
        <div className="mt-3 flex items-center justify-between rounded-lg bg-[#dc2743]/10 px-4 py-2 text-xs font-medium text-[#dc2743]">
          <span>
            ¡Gracias! Apóyanos dejando tu ❤️ directamente en la publicación de Instagram.
          </span>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline hover:no-underline"
          >
            Ir al post →
          </a>
        </div>
      )}

      {/* Embed interactivo al 100% del ancho de la columna, sin scroll interno */}
      {embedUrl && showEmbed && (
        <div className="mt-5 w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-white">
          <iframe
            ref={iframeRef}
            src={embedUrl}
            title={`Publicación de Instagram: ${title}`}
            scrolling="no"
            className="block w-full border-0 overflow-hidden"
            style={{ height: `${iframeHeight}px` }}
            loading="lazy"
            allow="encrypted-media"
          />
        </div>
      )}
    </section>
  );
}
