"use client"

import { useState } from "react"
import { ImageModal } from "./image-modal"

interface SystemImageProps {
    imageSrc: string
    imageAlt: string
}

export function SystemImage({ imageSrc, imageAlt }: SystemImageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <div
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-black/20 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => setIsModalOpen(true)}
            >
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="w-full h-auto max-h-[600px] object-contain object-center"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium bg-black/70 px-4 py-2 rounded-lg backdrop-blur-sm">
                        Büyütmek için tıklayın
                    </div>
                </div>
            </div>
            <ImageModal
                imageSrc={imageSrc}
                imageAlt={imageAlt}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    )
}
