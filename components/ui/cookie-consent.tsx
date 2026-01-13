"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cookie, X } from "lucide-react"

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check local storage for consent
        const consent = localStorage.getItem("cookie_consent")
        if (!consent) {
            // Show with a slight delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1500)
            return () => clearTimeout(timer)
        }
    }, [])

    const acceptCookies = () => {
        localStorage.setItem("cookie_consent", "true")
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-50 animate-in slide-in-from-bottom-4 fade-in duration-500">
            <div className="bg-background/80 backdrop-blur-xl border border-primary/20 p-6 rounded-2xl shadow-2xl max-w-sm ml-auto relative">
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
                >
                    <X className="h-4 w-4" />
                </button>

                <div className="flex items-start gap-4">
                    <div className="bg-primary/20 p-2 rounded-lg text-primary shrink-0">
                        <Cookie className="h-6 w-6" />
                    </div>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-bold text-base mb-1">Çerez Tercihleri</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Size daha iyi bir deneyim sunmak için çerezleri kullanıyoruz.
                                <Link href="/sozlesmeler/gizlilik" className="text-primary hover:underline ml-1">
                                    Gizlilik Politikası
                                </Link>
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" onClick={acceptCookies} className="flex-1">Kabul Et</Button>
                            <Button size="sm" variant="outline" onClick={() => setIsVisible(false)} className="flex-1">Reddet</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
