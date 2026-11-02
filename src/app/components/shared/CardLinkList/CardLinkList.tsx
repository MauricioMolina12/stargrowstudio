'use client'

import React from 'react'

interface Item {
  icon: React.ReactNode
  title: string
  description: string
  cta?: () => void
  highlight?: boolean
  badge?: string
}

interface CardLinkListProps {
  title?: string
  items: Item[]
  index: number
  openIndex: number | null
  setOpenIndex: (index: number | null) => void
  onItemClick?: () => void 
}

export const CardLinkList = ({
  title,
  items,
  index,
  openIndex,
  setOpenIndex,
  onItemClick
}: CardLinkListProps) => {
  const isGrouped = !!title
  const isOpen = openIndex === index

  const handleToggle = () => {
    setOpenIndex(isOpen ? null : index)
  }

  const handleClick = (cta?: () => void) => {
    cta?.()
    onItemClick?.() // 🔥 cerrar modal
  }

  return (
    <div>
      {title && (
        <h3 className="font-semibold text-sm text-[var(--color-muted)] mb-4 hidden lg:block">
          {title}
        </h3>
      )}

      {/* Versión escritorio */}
      <ul className="hidden lg:block space-y-3">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="p-3 rounded-md cursor-pointer hover:bg-[var(--color-primary-tint)]"
            onClick={() => handleClick(item.cta)}
          >
            <div className="flex items-start gap-3">
              {item.icon}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[12px]">
                    {item.title}
                  </span>
                  {item.badge && (
                    <span className="text-xs bg-[var(--color-primary-tint)] text-[var(--color-primary-bright)] px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-[12px] text-[var(--color-muted)]">{item.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Versión móvil */}
      <div className={`${isGrouped ? 'block lg:hidden' : 'block'} space-y-3`}>
        {isGrouped ? (
          <div className="rounded-md border border-[var(--color-border)] p-3">
            <button
              onClick={handleToggle}
              className="w-full text-left font-semibold text-sm text-[var(--color-foreground)] cursor-pointer"
            >
              {title}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? 'max-h-screen mt-3' : 'max-h-0'
              }`}
            >
              <ul className="space-y-3">
                {items.map((item, idx) => (
                  <li
                    key={idx}
                    className="p-2 rounded-md cursor-pointer hover:bg-[var(--color-primary-tint)]"
                    onClick={() => handleClick(item.cta)}
                  >
                    <div className="flex items-start gap-3">
                      {item.icon}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[12px]">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="text-xs bg-[var(--color-primary-tint)] text-[var(--color-primary-bright)] px-2 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[12px] text-[var(--color-muted)]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <ul className="space-y-3 lg:hidden">
            {items.map((item, idx) => (
              <li
                key={idx}
                className="p-3 rounded-md cursor-pointer hover:bg-[var(--color-primary-tint)]"
                onClick={() => handleClick(item.cta)}
              >
                <div className="flex items-start gap-3">
                  {item.icon}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[12px]">
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="text-xs bg-[var(--color-primary-tint)] text-[var(--color-primary-bright)] px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-[var(--color-muted)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
