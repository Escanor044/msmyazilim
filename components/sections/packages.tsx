"use client"

import { useRef, useState, useCallback, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const N = 6
const RADIUS = 280
const DEG = Math.PI / 180
/** 6 kart tek düzlemde yarım daire: slot 0 merkez (0°), diğerleri ±90° yayında */
const ARC_STEP = 30
const CARD_W = 208
const CARD_H = 272

const packages = [
    {
        name: "STARTER",
        price: "Teklif Alınız",
        description: "İlk adım için minimal kurulum.",
        features: [
            "Metin2 Temel Dosyalar",
            "Kurulum Rehberi",
            "7 Gün Teknik Destek",
            "Discord Destek"
        ],
        cta: "Paket Detayı",
        link: "/files",
        popular: false
    },
    {
        name: "BASIC",
        price: "Teklif Alınız",
        description: "Başlangıç seviyesi projeler için ideal.",
        features: [
            "Metin2 Altyapı Dosyaları",
            "Temel Sistemler",
            "Ücretsiz Kurulum",
            "1 Ay Teknik Destek",
            "Saldırı Koruması (Basic)",
            "Discord Rolü"
        ],
        cta: "Paket Detayı",
        link: "/files",
        popular: false
    },
    {
        name: "PRO",
        price: "Teklif Alınız",
        description: "Büyüyen sunucular ve profesyonel yönetim.",
        features: [
            "Her Şey Basic Pakette +",
            "Gelişmiş Sistemler & UI",
            "Performans Optimizasyonu",
            "3 Ay Teknik Destek",
            "Gelişmiş Anti-Cheat",
            "Özel Web Panel Teması",
            "Haftalık Yedekleme"
        ],
        cta: "Satın Al",
        link: "/odeme?paket=pro",
        popular: true
    },
    {
        name: "PREMIUM",
        price: "Teklif Alınız",
        description: "Büyük projeler ve kurumsal çözümler.",
        features: [
            "Her Şey Pro Pakette +",
            "VIP Sistemler & Özel Mapler",
            "Source Dosyaları (Opsiyonel)",
            "Sınırsız Teknik Destek",
            "Premium Anti-Cheat & Koruma",
            "Mobil Uygulama Entegrasyonu",
            "Reklam Danışmanlığı",
            "7/24 Acil Durum Hattı"
        ],
        cta: "Satın Al",
        link: "/odeme?paket=premium",
        popular: false
    },
    {
        name: "BUSINESS",
        price: "Teklif Alınız",
        description: "Kurumsal sunucular için tam çözüm.",
        features: [
            "Her Şey Premium Pakette +",
            "Özel Geliştirme",
            "Öncelikli Destek",
            "Özel Entegrasyonlar",
            "Yedekleme & Monitoring",
            "API Erişimi"
        ],
        cta: "Satın Al",
        link: "/odeme?paket=business",
        popular: false
    },
    {
        name: "ULTIMATE",
        price: "Teklif Alınız",
        description: "En üst düzey paket, sınırsız imkânlar.",
        features: [
            "Her Şey Business Pakette +",
            "Tam Özelleştirme",
            "7/24 Özel Danışman",
            "Kaynak Kod Hakları",
            "Öncelikli Güncellemeler",
            "Özel Eğitim & Dokümantasyon"
        ],
        cta: "Satın Al",
        link: "/odeme?paket=ultimate",
        popular: false
    }
]

function useCarouselPositions(selected: number) {
    return useMemo(() => {
        const out: Array<{
            x: number
            y: number
            z: number
            rotateY: number
            scale: number
            opacity: number
            filter: string
            zIndex: number
            isCenter: boolean
        }> = []
        for (let i = 0; i < N; i++) {
            const slot = (i - selected + N) % N
            const angleDeg = slot === 0 ? 0 : slot <= 2 ? slot * ARC_STEP : (slot - N) * ARC_STEP
            const angle = angleDeg * DEG
            const isCenter = slot === 0
            out.push({
                x: RADIUS * Math.sin(angle),
                y: 0,
                z: RADIUS * Math.cos(angle),
                rotateY: -angleDeg,
                scale: isCenter ? 1 : 0.9,
                opacity: 1,
                filter: "blur(0px)",
                zIndex: isCenter ? 50 : 20 + slot,
                isCenter
            })
        }
        return out
    }, [selected])
}

export function Packages() {
    const [selected, setSelected] = useState(0)
    const touchStart = useRef(0)
    const touchEnd = useRef(0)
    const positions = useCarouselPositions(selected)

    const select = useCallback((i: number, e?: React.MouseEvent) => {
        if (e && (e.target as HTMLElement).closest("a")) return
        if (i === selected) return
        setSelected(i)
    }, [selected])

    const prev = useCallback(() => setSelected((s) => (s - 1 + N) % N), [])
    const next = useCallback(() => setSelected((s) => (s + 1) % N), [])

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStart.current = e.touches[0].clientX
        touchEnd.current = e.touches[0].clientX
    }, [])

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        touchEnd.current = e.touches[0].clientX
    }, [])

    const handleTouchEnd = useCallback(() => {
        const diff = touchStart.current - touchEnd.current
        if (Math.abs(diff) < 50) return
        if (diff > 0) next()
        else prev()
    }, [next, prev])

    return (
        <section className="py-14 md:py-16 bg-black/20 relative">
            <div className="container-width">
                <div className="text-center max-w-xl mx-auto mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Paket Seçenekleri</h2>
                    <p className="text-sm text-muted-foreground">
                        Bütçenize ve ihtiyaçlarınıza uygun paketi seçin, sunucunuzu hemen kuralım.
                    </p>
                </div>

                <div
                    className="relative flex items-center justify-center min-h-[360px] md:min-h-[380px] overflow-visible touch-pan-x px-3 md:px-6 pt-2"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{ perspective: 1000 }}
                >
                    <button
                        type="button"
                        onClick={prev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-[60] size-9 rounded-full bg-slate-800/80 border border-white/20 flex items-center justify-center text-white hover:bg-slate-700/80 hover:border-white/30 transition-colors"
                        aria-label="Önceki paket"
                    >
                        <ChevronLeft className="size-4" />
                    </button>
                    <button
                        type="button"
                        onClick={next}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-[60] size-9 rounded-full bg-slate-800/80 border border-white/20 flex items-center justify-center text-white hover:bg-slate-700/80 hover:border-white/30 transition-colors"
                        aria-label="Sonraki paket"
                    >
                        <ChevronRight className="size-4" />
                    </button>

                    {/* Neon grid floor (kare kare) under cards */}
                    <div
                        className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
                        aria-hidden
                    >
                        <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(100%,800px)] h-40 rounded-t-xl border border-indigo-500/30"
                            style={{
                                background: "linear-gradient(180deg, rgba(15,23,42,0.96) 0%, rgba(15,23,42,0.99) 100%)",
                                boxShadow: "inset 0 0 80px rgba(99,102,241,0.15), 0 0 40px rgba(99,102,241,0.2)"
                            }}
                        />
                        <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(100%,800px)] h-40 rounded-t-xl opacity-90"
                            style={{
                                backgroundImage: "linear-gradient(to right, rgba(99,102,241,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,102,241,0.6) 1px, transparent 1px)",
                                backgroundSize: "20px 20px",
                                boxShadow: "inset 0 0 60px rgba(99,102,241,0.12), 0 0 32px rgba(99,102,241,0.3)"
                            }}
                        />
                        <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(100%,800px)] h-28 rounded-t-full opacity-60"
                            style={{
                                background: "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(99,102,241,0.45) 0%, transparent 70%)"
                            }}
                        />
                    </div>

                    <div
                        className="relative w-full max-w-[680px] md:max-w-[760px] h-[320px] md:h-[340px] mx-auto flex items-center justify-center"
                        style={{ perspective: 1000, transformStyle: "preserve-3d" }}
                    >
                        {Array.from({ length: N }, (_, i) => {
                                const p = positions[i]
                                const pkg = packages[i]
                                const isActive = p.isCenter

                                return (
                                    <motion.div
                                        key={i}
                                        role="button"
                                        tabIndex={isActive ? 0 : -1}
                                        onClick={(e) => select(i, e)}
                                        onKeyDown={(e) => {
                                            if (!isActive) return
                                            if (e.key === "ArrowLeft") prev()
                                            if (e.key === "ArrowRight") next()
                                        }}
                                        className="absolute cursor-pointer flex items-center justify-center"
                                        style={{
                                            left: "50%",
                                            top: "50%",
                                            width: CARD_W,
                                            maxWidth: "85vw",
                                            transformStyle: "preserve-3d",
                                            zIndex: p.zIndex
                                        }}
                                        initial={false}
                                        animate={{
                                            x: p.x - CARD_W / 2,
                                            y: p.y - CARD_H / 2,
                                            z: p.z,
                                            rotateY: p.rotateY,
                                            scale: p.scale,
                                            opacity: p.opacity,
                                            filter: p.filter
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 120,
                                            damping: 24,
                                            mass: 0.8
                                        }}
                                    >
                                        <div
                                            className={`relative w-[192px] md:w-[208px] rounded-xl p-4 md:p-5 border-2 backdrop-blur-md transition-colors ${
                                                isActive
                                                    ? "bg-slate-950/90 border-indigo-500/80 ring-2 ring-indigo-400/60 ring-offset-2 ring-offset-slate-950"
                                                    : "bg-slate-900/85 border-slate-400/40 hover:border-slate-300/50"
                                            }`}
                                            style={{
                                                boxShadow: isActive
                                                    ? "0 0 24px rgba(99,102,241,0.5), 0 0 48px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
                                                    : "inset 0 1px 0 rgba(255,255,255,0.06)"
                                            }}
                                        >
                                            {pkg.popular && (
                                                <div
                                                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[9px] font-bold text-white uppercase tracking-wide transition-all ${
                                                        isActive
                                                            ? "bg-gradient-to-r from-indigo-500 via-primary to-indigo-600 shadow-[0_0_16px_rgba(99,102,241,0.7)]"
                                                            : "bg-slate-700/60 text-slate-300"
                                                    }`}
                                                >
                                                    EN ÇOK TERCİH EDİLEN
                                                </div>
                                            )}

                                            <div className={isActive ? "" : "select-none pointer-events-none"}>
                                                <div className="mb-3">
                                                    <h3 className="text-sm font-bold tracking-wide text-white">{pkg.name}</h3>
                                                    <div className="mt-2 flex items-baseline gap-1">
                                                        <span className="text-lg font-bold text-white">{pkg.price}</span>
                                                    </div>
                                                    <p className="mt-1.5 text-xs text-slate-400 leading-snug line-clamp-2">{pkg.description}</p>
                                                </div>

                                                <ul className="space-y-2 mb-4">
                                                    {pkg.features.slice(0, 5).map((feature, j) => (
                                                        <li key={j} className="flex items-start gap-2 text-xs text-slate-300">
                                                            <div
                                                                className={`mt-0.5 h-4 w-4 rounded-full flex items-center justify-center shrink-0 transition-all ${
                                                                    isActive && pkg.popular
                                                                        ? "bg-indigo-500 text-white shadow-[0_0_10px_rgba(99,102,241,0.8)] ring-2 ring-indigo-400/50"
                                                                        : isActive
                                                                          ? "bg-indigo-500/90 text-white"
                                                                          : "bg-slate-600/50 text-slate-400"
                                                                }`}
                                                            >
                                                                <Check className="h-2.5 w-2.5" strokeWidth={2.5} />
                                                            </div>
                                                            <span className="leading-snug break-words">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                {isActive ? (
                                                    pkg.popular ? (
                                                        <Link
                                                            href={pkg.link}
                                                            className="flex h-9 w-full items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white shadow-[0_0_12px_rgba(99,102,241,0.4)] hover:bg-indigo-500 transition-colors"
                                                        >
                                                            {pkg.cta}
                                                        </Link>
                                                    ) : (
                                                        <Button
                                                            className="w-full h-9 text-sm font-medium border-white/30 bg-transparent text-white hover:bg-white/10"
                                                            variant="outline"
                                                            asChild
                                                        >
                                                            <Link href={pkg.link}>{pkg.cta}</Link>
                                                        </Button>
                                                    )
                                                ) : (
                                                    <div className="h-9 w-full rounded-lg bg-slate-800 border border-slate-600/60" aria-hidden />
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                    </div>
                </div>

                <p className="text-center text-xs text-muted-foreground mt-4">
                    6 farklı paket · Ok tuşları veya noktalardan seçebilirsiniz
                </p>
                <div className="flex justify-center items-center gap-1.5 mt-2">
                    {Array.from({ length: N }, (_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setSelected(i)}
                            className={`rounded-full transition-all duration-300 ${i === selected ? "h-2.5 w-2.5 bg-primary shadow-[0_0_10px_rgba(99,102,241,0.6)]" : "h-1.5 w-1.5 bg-white/40 hover:bg-white/55"}`}
                            aria-label={`Paket ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
