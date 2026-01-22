"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface ImageModalProps {
    imageSrc: string
    imageAlt: string
    isOpen: boolean
    onClose: () => void
}

export function ImageModal({ imageSrc, imageAlt, isOpen, onClose }: ImageModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose()
            }
        }
        if (isOpen) {
            window.addEventListener("keydown", handleEscape)
        }
        return () => {
            window.removeEventListener("keydown", handleEscape)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Kapat"
            >
                <X className="h-6 w-6 text-white" />
            </button>
            <div
                className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                />
            </div>
        </div>
    )
}
