"use client";

import "../styles/animations.css";

export function FeaturedSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-[20px] border border-[var(--color-gray)] bg-[var(--color-white-to-primary)]"
      aria-hidden="true"
    >
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr]">
        <div className="aspect-video md:aspect-auto md:min-h-[280px] skeleton-shimmer" />
        <div className="space-y-3 p-6">
          <div className="h-4 w-24 rounded-full skeleton-shimmer" />
          <div className="h-7 w-4/5 rounded skeleton-shimmer" />
          <div className="h-4 w-3/5 rounded skeleton-shimmer" />
          <div className="h-3 w-full rounded skeleton-shimmer" />
          <div className="h-3 w-2/3 rounded skeleton-shimmer" />
          <div className="flex items-center gap-3 pt-4">
            <div className="h-6 w-6 rounded-full skeleton-shimmer" />
            <div className="h-3 w-24 rounded skeleton-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div
      className="rounded-[20px] border border-[var(--color-gray)] bg-[var(--color-white-to-primary)] p-5"
      aria-hidden="true"
    >
      <div className="mb-4 h-4 w-32 rounded skeleton-shimmer" />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3.5">
            <div className="aspect-[4/3] w-24 shrink-0 rounded-xl skeleton-shimmer sm:w-28" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-16 rounded-full skeleton-shimmer" />
              <div className="h-4 w-full rounded skeleton-shimmer" />
              <div className="h-3 w-2/3 rounded skeleton-shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BlogGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-[20px] border border-[var(--color-gray)] bg-[var(--color-white-to-primary)]"
          aria-hidden="true"
        >
          <div className="aspect-video skeleton-shimmer" />
          <div className="space-y-3 p-5">
            <div className="h-3 w-20 rounded skeleton-shimmer" />
            <div className="h-5 w-full rounded skeleton-shimmer" />
            <div className="h-5 w-3/4 rounded skeleton-shimmer" />
            <div className="h-3 w-full rounded skeleton-shimmer" />
            <div className="h-3 w-2/3 rounded skeleton-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ArticleSkeleton() {
  return (
    <div className="mx-auto max-w-3xl" aria-hidden="true">
      <div className="mb-8 h-4 w-32 rounded skeleton-shimmer" />
      <div className="mb-6 flex gap-2">
        <div className="h-6 w-16 rounded-full skeleton-shimmer" />
        <div className="h-6 w-20 rounded-full skeleton-shimmer" />
      </div>
      <div className="mb-4 h-10 w-full rounded skeleton-shimmer" />
      <div className="mb-4 h-10 w-2/3 rounded skeleton-shimmer" />
      <div className="mb-8 flex items-center gap-4">
        <div className="h-10 w-10 rounded-full skeleton-shimmer" />
        <div className="space-y-2">
          <div className="h-3 w-24 rounded skeleton-shimmer" />
          <div className="h-3 w-32 rounded skeleton-shimmer" />
        </div>
      </div>
      <div className="mb-10 aspect-video rounded-[20px] skeleton-shimmer" />
      <div className="space-y-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`h-4 rounded skeleton-shimmer ${
              i % 3 === 0 ? "w-full" : i % 3 === 1 ? "w-5/6" : "w-4/6"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function ArticleCardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-[20px] border border-[var(--color-gray)] bg-[var(--color-white-to-primary)]"
      aria-hidden="true"
    >
      <div className="aspect-video skeleton-shimmer" />
      <div className="space-y-3 p-5">
        <div className="flex items-center gap-2">
          <div className="h-3 w-16 rounded skeleton-shimmer" />
          <div className="h-1 w-1 rounded-full skeleton-shimmer" />
          <div className="h-3 w-20 rounded skeleton-shimmer" />
        </div>
        <div className="h-5 w-full rounded skeleton-shimmer" />
        <div className="h-5 w-4/5 rounded skeleton-shimmer" />
        <div className="h-3 w-full rounded skeleton-shimmer" />
        <div className="flex items-center gap-2 pt-2">
          <div className="h-6 w-6 rounded-full skeleton-shimmer" />
          <div className="h-3 w-24 rounded skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}