'use client'
import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

/** Clave de persistencia (compatible con la preferencia guardada previamente). */
export const THEME_STORAGE_KEY = "theme";

function canUseBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

/** Aplica la clase `.dark` al <html> según el tema. */
function applyTheme(theme: Theme): void {
  if (!canUseBrowser()) return;
  document.documentElement.classList.toggle("dark", theme === "dark");
}

/** Preferencia explícita guardada (null si nunca se seleccionó). */
function getStoredTheme(): Theme | null {
  if (!canUseBrowser()) return null;
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    /* almacenamiento no disponible */
  }
  return null;
}

/** Preferencia del sistema operativo / navegador. */
function getSystemTheme(): Theme {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

/**
 * Hook central del tema.
 *
 * - Persistencia: localStorage (`theme` = "dark" | "light").
 * - Sin preferencia guardada → se usa la preferencia del sistema y se sigue
 *   escuchando sus cambios.
 * - Preferencia explícita del usuario → siempre tiene prioridad.
 * - Anti-flash: el script inline en el <head> del layout ya aplica la clase
 *   `.dark` antes de pintar; aquí solo se sincroniza el estado de React.
 * - Sin hydration mismatch: durante SSR `isDark` es `false` y se resuelve en
 *   el efecto posterior al montaje.
 */
export default function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = getStoredTheme();
    const initial = stored ?? getSystemTheme();
    applyTheme(initial);
    setIsDark(initial === "dark");

    // Si el usuario NO tiene preferencia explícita, sigue los cambios del sistema.
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (!getStoredTheme()) {
        const next: Theme = e.matches ? "dark" : "light";
        applyTheme(next);
        setIsDark(next === "dark");
      }
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const setTheme = useCallback((theme: Theme) => {
    const root = document.documentElement;
    // Transición breve de tema (se quita sola tras ~300ms).
    root.classList.add("theme-transition");
    applyTheme(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* almacenamiento no disponible */
    }
    setIsDark(theme === "dark");
    window.setTimeout(() => root.classList.remove("theme-transition"), 300);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setTheme(isDark ? "light" : "dark");
  }, [isDark, setTheme]);

  return { isDark, toggleDarkMode, setTheme };
}

