"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Link, Linkedin, Twitter, Check, Share2 } from "lucide-react";
import "../styles/animations.css";

type ShareArticleProps = {
  title: string;
  slug: string;
};

export function ShareArticle({ title, slug }: ShareArticleProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const url = typeof window !== "undefined"
    ? `${window.location.origin}/blog/${slug}`
    : `/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  // Close on click outside
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [url]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--color-gray)] bg-[var(--color-white-to-primary)] px-4 py-2 text-sm font-medium text-[var(--color-dark-gray)] transition-all duration-300 hover:border-[var(--color-primary-bright)] hover:text-[var(--color-primary-bright)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-bright)]"
        aria-label="Compartir artículo"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Share2 size={16} aria-hidden="true" />
        <span className="hidden sm:inline">Compartir</span>
      </button>

      {open && (
        <div
          ref={menuRef}
          className="dropdown-enter absolute right-0 top-full z-40 mt-2 w-48 overflow-hidden rounded-xl border border-[var(--color-gray)] bg-[var(--color-white-to-primary)] shadow-lg"
          role="menu"
        >
          <div className="p-2">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-dark-gray)] transition-colors hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              <Linkedin size={18} />
              LinkedIn
            </a>

            <a
              href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-dark-gray)] transition-colors hover:bg-[var(--color-hover)] hover:text-[var(--color-foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-bright)]"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              <Twitter size={18} />
              X (Twitter)
            </a>

            <button
              onClick={() => {
                handleCopy();
                // Don't close on copy, show success state
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-dark-gray)] transition-colors hover:text-[var(--color-primary-bright)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-bright)]"
              role="menuitem"
            >
              {copied ? (
                <>
                  <Check size={18} className="text-green-500" />
                  <span className="text-green-500">Copiado</span>
                </>
              ) : (
                <>
                  <Link size={18} />
                  Copiar enlace
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}