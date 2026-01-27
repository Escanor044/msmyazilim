"use client"

import React, { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Package {
    id: number
    title: string
    description: string | null
    price: string
    features: string[]
    button_text: string
    link: string
    recommended: boolean
    glow_color: string | null
    sort_order: number
    active: boolean
}

function getCardStyles(
    cardIndex: number,
    currentIndex: number,
    totalCards: number
): { x: number; z: number; rotateY: number; opacity: number; scale: number; zIndex: number; filter: string; skewY: number } {
    const diff = (cardIndex - currentIndex + totalCards) % totalCards
    const normalizedDiff = diff > totalCards / 2 ? diff - totalCards : diff

    if (normalizedDiff === 0) {
        return {
            x: 0,
            z: 0,
            scale: 1.15,
            opacity: 1,
            rotateY: 0,
            skewY: 0,
            zIndex: 100,
            filter: "blur(0px)"
        }
    } else if (normalizedDiff === 1) {
        return {
            x: 435,
            z: -20,
            scale: 0.9,
            opacity: 2,
            rotateY: 30,
            skewY: 6,
            zIndex: 80,
            filter: "blur(0.8px)"
        }
    } else if (normalizedDiff === -1) {
        return {
            x: -435,
            z: -20,
            scale: 0.9,
            opacity: 2,
            rotateY: -30,
            skewY: -6,
            zIndex: 80,
            filter: "blur(0.8px)"
        }
    } else {
        return { x: 0, z: -600, opacity: 0, scale: 0.5, zIndex: 60, rotateY: 0, skewY: 0, filter: "blur(10px)" }
    }
}

export default function PricingCards3D() {
    const [packages, setPackages] = useState<Package[]>([])
    const [loading, setLoading] = useState(true)
    const [index, setIndex] = useState(0)
    const totalCards = packages.length

    useEffect(() => {
        fetchPackages()
        
        // Her 30 saniyede bir güncelle (opsiyonel - gerçek zamanlı güncelleme için)
        const interval = setInterval(() => {
            fetchPackages()
        }, 30000) // 30 saniye

        return () => clearInterval(interval)
    }, [])

    const fetchPackages = async () => {
        try {
            setLoading(true)
            console.log('🔄 Fetching packages from Supabase...')
            
            const { data, error } = await supabase
                .from('packages')
                .select('*')
                .eq('active', true)
                .order('sort_order', { ascending: true })

            if (error) {
                console.error('❌ Error fetching packages:', error)
                setPackages([])
            } else {
                console.log('✅ Packages fetched successfully:', data?.length || 0, 'packages')
                console.log('📦 Packages data:', data)
                const packagesData = data || []
                
                // Veri formatını kontrol et ve düzelt
                const formattedPackages = packagesData.map(pkg => ({
                    ...pkg,
                    features: Array.isArray(pkg.features) ? pkg.features : [],
                    glow_color: pkg.glow_color || "rgba(59, 130, 246, 0.5)"
                }))
                
                setPackages(formattedPackages)
                
                // Önerilen paketi bul ve onunla başla
                const recommendedIndex = formattedPackages.findIndex(p => p.recommended)
                if (recommendedIndex >= 0) {
                    setIndex(recommendedIndex)
                    console.log('⭐ Starting with recommended package:', formattedPackages[recommendedIndex].title)
                } else {
                    setIndex(0)
                }
            }
        } catch (error) {
            console.error('❌ Error fetching packages:', error)
            setPackages([])
        } finally {
            setLoading(false)
        }
    }

    const rotateTo = useCallback((newIndex: number) => {
        setIndex(newIndex)
    }, [])

    const nextCard = useCallback(() => {
        setIndex((prev) => (prev + 1) % totalCards)
    }, [totalCards])

    const prevCard = useCallback(() => {
        setIndex((prev) => (prev - 1 + totalCards) % totalCards)
    }, [totalCards])

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") prevCard()
            if (e.key === "ArrowRight") nextCard()
        }
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [prevCard, nextCard])

    if (loading) {
        return (
            <section className="relative min-h-screen w-full bg-[#020617] flex flex-col items-center justify-center overflow-hidden py-24">
                <div className="flex flex-col items-center justify-center gap-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-muted-foreground">Paketler yükleniyor...</p>
                </div>
            </section>
        )
    }

    if (packages.length === 0) {
        return (
            <section className="relative min-h-screen w-full bg-[#020617] flex flex-col items-center justify-center overflow-hidden py-24">
                <div className="text-center text-muted-foreground">
                    <p>Henüz paket eklenmemiş.</p>
                    <p className="text-sm mt-2">Admin panelden paket ekleyebilirsiniz.</p>
                </div>
            </section>
        )
    }

    return (
        <section
            className="relative min-h-screen w-full bg-[#020617] flex flex-col items-center justify-center overflow-hidden py-24"
            style={{ perspective: 1500, transformStyle: "preserve-3d" }}
        >
            {/* 1. ARKA PLAN EFEKTLERİ (ATMOSFER) */}
            <div className="absolute inset-0 z-0">
                {/* Görseldeki morumsu sağ üst parlama */}
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
                {/* Görseldeki mavi sol alt parlama */}
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
            </div>

            {/* 2. 3D YATAY ZEMİN (GRID) */}
            <div
                className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[300%] max-w-[300vw] h-[1200px] opacity-30 pointer-events-none z-0"
                style={{
                    background: `linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
                    backgroundSize: "4rem 4rem",
                    transform: "rotateX(82deg)",
                    transformOrigin: "bottom center",
                    maskImage: "radial-gradient(ellipse at center, black 25%, transparent 80%)",
                    WebkitMaskImage: "radial-gradient(ellipse at center, black 15%, transparent 80%)"
                }}
                aria-hidden
            />

            {/* BAŞLIK */}
            <div className="relative z-20 text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tighter italic">
                    PAKET SEÇENEKLERİ
                </h2>
                <p className="text-blue-400/60 font-medium tracking-[0.3em] text-xs uppercase">
                    Premium Services & Quality
                </p>
            </div>

            {/* 3. KART SAHNESİ */}
            <div
                className="relative w-full max-w-7xl h-[650px] flex items-end justify-center pb-16 z-50"
                style={{ transformStyle: "preserve-3d" }}
            >
                {packages.length > 0 && packages.map((pkg, i) => {
                    const { x, z, rotateY, opacity, scale, zIndex, filter, skewY } = getCardStyles(i, index, totalCards)
                    const isActive = i === index

                    return (
                        <motion.div
                            key={pkg.id}
                            onClick={() => rotateTo(i)}
                            initial={false}
                            animate={{ x, z, rotateY, opacity, scale, zIndex, skewY }}
                            transition={{ type: "spring", stiffness: 400, damping: 35, mass: 0.5 }}
                            style={{
                                boxShadow: isActive && pkg.recommended 
                                    ? `0 0 20px rgba(37, 99, 235, 0.3), 0 0 0 2px rgba(37, 99, 235, 0.4)`
                                    : isActive 
                                    ? `0 0 60px -15px ${pkg.glow_color || "rgba(59, 130, 246, 0.5)"}` 
                                    : "none",
                                transformStyle: "preserve-3d",
                                filter
                            }}
                            className={`absolute w-[380px] md:w-[400px] h-[520px] md:h-[560px] rounded-xl p-8 md:p-10 border-2 transition-all duration-300 cursor-pointer ${
                                isActive && pkg.recommended
                                    ? "bg-gradient-to-b from-blue-950/40 to-[#020617] border-blue-500"
                                    : isActive
                                    ? "bg-gradient-to-b from-blue-950/40 to-[#020617] border-blue-500/60"
                                    : "bg-white/[0.01] border-white/5"
                            }`}
                        >
                            
                            {/* ÜSTTEKİ IŞIKLI BADGE (EN ÇOK TERCİH EDİLEN) */}
                            {pkg.recommended && isActive && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white text-[10px] md:text-[11px] font-black px-6 md:px-8 py-2 md:py-2.5 rounded-full shadow-lg border border-blue-400/30 z-50 whitespace-nowrap">
                                    EN ÇOK TERCİH EDİLEN
                                </div>
                            )}

                            <div className="flex flex-col h-full">
                                <div className="mb-6 md:mb-8">
                                    <span
                                        className={`text-[10px] md:text-xs font-black tracking-[0.2em] ${
                                            isActive ? "text-blue-400" : "text-gray-600"
                                        }`}
                                    >
                                        {pkg.title}
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-black text-white mt-2 tracking-tight">
                                        {pkg.price}
                                    </h3>
                                    {pkg.description && (
                                        <p className="text-sm text-white/60 mt-2 italic">
                                            {pkg.description}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-3 md:space-y-4 flex-grow mb-6">
                                    {(pkg.features || []).map((feature, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex items-center gap-3 md:gap-4 text-white/80 group ${
                                                !isActive && "opacity-50"
                                            }`}
                                        >
                                            <div
                                                className={`flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center border transition-colors ${
                                                    isActive
                                                        ? "border-blue-500/50 bg-blue-500/10"
                                                        : "border-white/10"
                                                }`}
                                            >
                                                <Check
                                                    className={`w-2.5 h-2.5 md:w-3 md:h-3 ${
                                                        isActive ? "text-blue-400" : "text-gray-600"
                                                    }`}
                                                    strokeWidth={3}
                                                />
                                            </div>
                                            <span className="text-xs md:text-sm font-medium tracking-wide italic">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* BUTON EFEKTİ */}
                                {isActive ? (
                                    <Link
                                        href={pkg.link}
                                        onClick={(e) => e.stopPropagation()}
                                        className={`w-full py-4 md:py-5 rounded-lg font-black text-xs md:text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center ${
                                            pkg.recommended
                                                ? "bg-blue-600 text-white shadow-[0_10px_25px_-5px_rgba(37,99,235,0.5)] hover:scale-[1.02] hover:bg-blue-500"
                                                : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                                        }`}
                                    >
                                        {pkg.button_text}
                                    </Link>
                                ) : (
                                    <div
                                        className="w-full py-4 md:py-5 rounded-lg bg-white/5 text-gray-500 border border-white/5 uppercase tracking-widest text-xs md:text-sm font-black flex items-center justify-center opacity-70"
                                        aria-hidden
                                    >
                                        {pkg.button_text}
                                    </div>
                                )}
                            </div>

                            {/* KARTIN İÇİNDEKİ HAFİF YANSIMA (Görseldeki cam efekti için) */}
                            {isActive && (
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-500/10 via-transparent to-white/5 pointer-events-none" />
                            )}
                        </motion.div>
                    )
                })}
            </div>

            {/* NAVİGASYON OKLARI (h.jpg tarzı) */}
            <div className="relative z-30 mt-12 flex items-center justify-center gap-8 md:gap-10">
                <motion.button
                    type="button"
                    onClick={prevCard}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-blue-500 transition-all text-xl md:text-2xl bg-white/5"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Önceki paket"
                >
                    ‹
                </motion.button>
                <div className="flex items-center gap-2 md:gap-3">
                    {packages.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setIndex(i)}
                            className={`rounded-full transition-all duration-300 ${
                                i === index ? "h-2.5 w-8 md:w-10 bg-blue-500" : "h-2 w-2 bg-gray-600 hover:bg-gray-500"
                            }`}
                            aria-label={`Paket ${i + 1}`}
                        />
                    ))}
                </div>
                <motion.button
                    type="button"
                    onClick={nextCard}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-blue-500 transition-all text-xl md:text-2xl bg-white/5"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Sonraki paket"
                >
                    ›
                </motion.button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
                {totalCards} farklı paket · Ok tuşları veya noktalardan seçebilirsiniz
            </p>
        </section>
    )
}
