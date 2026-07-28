'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { filterIndex } from '@/sanity/services/search.service';
import { fetchSearchIndex } from '@/app/api/search-index/action';
import type { SearchIndex, SearchResult } from '@/sanity/services/search.service';

const RECENT_KEY = 'sg_recent_searches';
const MAX_RECENT = 5;

export function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSearch(query: string) {
  try {
    const recent = getRecentSearches().filter((s) => s !== query);
    recent.unshift(query);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
  } catch {
    // localStorage no disponible
  }
}

interface UseSearchReturn {
  query: string;
  results: SearchResult[];
  loading: boolean;
  recent: string[];
  setQuery: (q: string) => void;
  search: () => Promise<void>;
  clearRecent: () => void;
}

export function useGlobalSearch(): UseSearchReturn {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const indexRef = useRef<SearchIndex | null>(null);

  // Cargar recientes al montar
  useEffect(() => {
    setRecent(getRecentSearches());
  }, []);

  const search = useCallback(async () => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      return;
    }

    // Load index from server (Server Action → Sanity with token)
    if (!indexRef.current) {
      setLoading(true);
      try {
        indexRef.current = await fetchSearchIndex();
      } catch {
        indexRef.current = null;
        setResults([]);
        setLoading(false);
        return;
      }
      setLoading(false);
    }

    // Filter client-side (instant)
    const filtered = filterIndex(indexRef.current, trimmed);
    setResults(filtered);

    // Save to recent searches if there are results
    if (filtered.length > 0) {
      saveSearch(trimmed);
      setRecent(getRecentSearches());
    }
  }, [query]);

  const clearRecent = useCallback(() => {
    try {
      localStorage.removeItem(RECENT_KEY);
      setRecent([]);
    } catch {
      // ignore
    }
  }, []);

  return { query, results, loading, recent, setQuery, search, clearRecent };
}