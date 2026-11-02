'use client';

import { Moon, Sun } from 'lucide-react';
import { useDarkModeContext } from '@/app/context/darkModeContext';

type Props = {
  className?: string;
};

/**
 * Alternador de tema (☀/🌙). Accesible: aria-label dinámico, foco visible y
 * target táctil ≥ 44px. No altera el layout ni el responsive.
 */
export default function ThemeToggle({ className = '' }: Props) {
  const { isDark, toggleDarkMode } = useDarkModeContext();
  const label = isDark ? 'Activar modo claro' : 'Activar modo oscuro';

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      aria-label={label}
      title={label}
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-hover)] text-[var(--color-primary-to-white)] transition-colors duration-300 hover:bg-[var(--color-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-bright)] focus-visible:ring-offset-2 ${className}`}
    >
      {isDark ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
