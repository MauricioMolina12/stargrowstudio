'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'left' | 'right';
}

export default function Dropdown({
  trigger,
  children,
  align = 'left',
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        close();
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <div onClick={toggle} className="cursor-pointer select-none">
        {trigger}
      </div>

      {open && (
        <div
          className={`
            absolute z-50 mt-2 min-w-[180px] rounded-lg bg-white
            shadow-lg ring-1 ring-black/5
            ${align === 'right' ? 'right-0' : 'left-0'}
          `}
        >
          {children}
        </div>
      )}
    </div>
  );
}
