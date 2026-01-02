'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-sm text-[var(--color-dark-gray)]"
    >
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-black transition-colors"
        aria-label="Home"
      >
        <Home size={16} className='text-[var(--color-primary)]' />
      </Link>

      {segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/');
        const isLast = index === segments.length - 1;

        return (
          <div key={href} className="flex items-center gap-2">
            <ChevronRight size={16} />

            {isLast ? (
              <span className="font-medium capitalize text-[var(--color-primary)]">
                {decodeURIComponent(segment)}
              </span>
            ) : (
              <Link
                href={href}
                className="capitalize hover:text-black transition-colors"
              >
                {decodeURIComponent(segment)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
