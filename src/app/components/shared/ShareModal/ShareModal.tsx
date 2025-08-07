'use client'

import { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'

interface ShareModalProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
}

export const ShareModal = ({ isOpen, onClose, children }: ShareModalProps) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        isOpen ? document.body.classList.add('dark-body') : document.body.classList.remove('dark-body')
        return () => {
            document.body.classList.remove('dark-body')
            setMounted(false)}
    }, [])

    if (!mounted || !isOpen) return null

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6 pt-18">
            <div
                className="absolute inset-0 z-0"
                onClick={onClose}
            />
            <div className="relative z-10 bg-white rounded-xl shadow-xl p-6 w-full max-w-6xl overflow-y-auto max-h-[80vh]">
                {children}
            </div>
        </div>,
        document.body
    )
}
