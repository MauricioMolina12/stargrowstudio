'use client'

import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft } from 'lucide-react'
import clsx from 'clsx'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const ShareModal = ({ isOpen, onClose, children }: ShareModalProps) => {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      requestAnimationFrame(() => setAnimateIn(true))
    } else {
      setAnimateIn(false)
      const timeout = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  if (!mounted || !isVisible) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className="fixed w-full lg:mx-auto lg:my-0 inset-0 top-[40px] z-50 flex items-start justify-center lg:p-6 transition-opacity"
    >
      <div
        className={clsx(
          "border w-fit border-gray-100 relative z-10 bg-white lg:rounded-xl p-6 max-w-6xl overflow-y-auto max-h-[100vh] lg:max-h-[80vh] transform transition-transform duration-300",
          {
            'translate-x-0 opacity-100': animateIn,
            '-translate-x-full opacity-0': !animateIn,
          }
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="flex items-center justify-start text-[12px] cursor-pointer bg-[var(--color-primary)] p-2 rounded-[10px] text-white mb-2.5 lg:hidden"
        >
          <ChevronLeft size={13} />
          <span className="font-semibold">Atrás</span>
        </button>
        {children}
      </div>
    </div>,
    document.body
  )
}
