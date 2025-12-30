// hooks/useContent.ts
"use client";

import { useEffect, useState } from "react";
import { ContentEntry } from "../lib/content.server";

export function useContent<T>(type: string, slugs: string[]) {
  const [entries, setEntries] = useState<ContentEntry<T>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const params = new URLSearchParams({
        type,
        slugs: slugs.join(","),
      });

      const res = await fetch(`/api/content?${params}`);
      const json = await res.json();

      setEntries(json.entries); // ← entries completos
      setLoading(false);
    }

    load();
  }, [type, slugs.join(",")]);

  return { entries, loading };
}
