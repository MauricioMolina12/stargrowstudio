'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

function formatSlug(slug: string) {
  const decoded = decodeURIComponent(slug).replace(/-/g, ' ');
  return decoded.charAt(0).toUpperCase() + decoded.slice(1).toLowerCase();
}

export default function Breadcrumbs() {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav
      aria-label="Breadcrumb"
      className="overflow-x-auto max-w-full no-scrollbar relative"
      style={{
        WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
        maskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
      }}
    >
      <div className="flex items-center gap-2 whitespace-nowrap text-sm text-[var(--color-dark-gray)]">
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-black transition-colors"
          aria-label="Home"
        >
          <Home size={16} className="text-[var(--color-primary)]" />
        </Link>

        {segments.map((segment, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/');
          const isLast = index === segments.length - 1;

          const displayName = formatSlug(segment);

          return (
            <div key={href} className="flex items-center gap-2">
              <ChevronRight size={16} />

              {isLast ? (
                <span className="font-medium text-[var(--color-primary)]">
                  {displayName}
                </span>
              ) : (
                <Link href={href} className="hover:text-black transition-colors">
                  {displayName}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
