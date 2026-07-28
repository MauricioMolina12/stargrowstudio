'use client';

import { useEffect } from 'react';

/** Escucha Ctrl+K (Windows/Linux) o ⌘+K (Mac) para ejecutar un callback. */
export function useKeyboardShortcut(callback: () => void) {
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        callback();
      }
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [callback]);
}