"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FilteredSystemsView } from "@/components/systems/filtered-systems-view"
import { supabase } from "@/lib/supabase"
import { Loader2 } from "lucide-react"

interface ServerFilePackage {
    id: number
    package_type: 'orta-emek' | 'hard-emek' | 'files-105'
    title: string
    subtitle: string
    features: string[]
    link: string
    youtube_url: string | null
    badge_text: string | null
    badge_color: string | null
    active: boolean
    sort_order: number
}

export default function ServerFilesPage() {
    const [activePackage, setActivePackage] = useState<string | null>(null)
    const [packages, setPackages] = useState<ServerFilePackage[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPackages()
    }, [])

    const fetchPackages = async () => {
        try {
            const { data, error } = await supabase
                .from('server_file_packages')
                .select('*')
                .eq('active', true)
                .order('sort_order', { ascending: true })

            if (error) {
                console.error('Error fetching server file packages:', error)
            } else {
                setPackages(data || [])
            }
        } catch (error) {
            console.error('Error fetching server file packages:', error)
        } finally {
            setLoading(false)
        }
    }

    const getBadgeStyles = (color: string | null) => {
        switch (color) {
            case 'blue':
                return 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 border-blue-400/30'
            case 'amber':
                return 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 border-amber-400/30'
            case 'green':
                return 'bg-gradient-to-r from-green-600 via-green-500 to-green-600 border-green-400/30'
            case 'red':
                return 'bg-gradient-to-r from-red-600 via-red-500 to-red-600 border-red-400/30'
            default:
                return 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 border-blue-400/30'
        }
    }

    return (
        <div className="min-h-screen pt-32 pb-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                        Server Files
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Sunucunuzu rakiplerinizden ayıracak modern, performanslı ve oyuncu dostu sistemler.
                    </p>
                </div>

                {/* Server Files Cards */}
                <section className="py-8">
                    {loading ? (
                        <div className="flex items-center justify-center py-24">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : packages.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {packages.map((pkg) => (
                                <div 
                                    key={pkg.id}
                                    className="group cursor-pointer"
                                    onClick={() => setActivePackage(activePackage === pkg.package_type ? null : pkg.package_type)}
                                >
                                    <div className={`relative w-full h-full rounded-xl p-8 md:p-10 border-2 transition-all duration-300 bg-gradient-to-b from-blue-950/40 to-[#020617] ${
                                        activePackage === pkg.package_type 
                                            ? "border-blue-500 shadow-[0_0_60px_-15px_rgba(59,130,246,0.8)]" 
                                            : "border-blue-500/60 hover:border-blue-500 hover:shadow-[0_0_60px_-15px_rgba(59,130,246,0.5)]"
                                    }`}>
                                        {/* Badge */}
                                        {pkg.badge_text && (
                                            <div className={`absolute -top-5 left-1/2 -translate-x-1/2 ${getBadgeStyles(pkg.badge_color)} text-white text-[10px] md:text-[11px] font-black px-6 md:px-8 py-2 md:py-2.5 rounded-full shadow-lg border z-50 whitespace-nowrap`}>
                                                {pkg.badge_text}
                                            </div>
                                        )}

                                        <div className="flex flex-col h-full">
                                            <div className="mb-6">
                                                <span className="text-xs font-black tracking-[0.2em] text-blue-400 uppercase">
                                                    {pkg.title}
                                                </span>
                                                <h3 className="text-3xl md:text-4xl font-black text-white mt-2 tracking-tight">
                                                    {pkg.subtitle}
                                                </h3>
                                            </div>

                                            <div className="space-y-3 md:space-y-4 flex-grow mb-6">
                                                {pkg.features && pkg.features.length > 0 ? (
                                                    pkg.features.map((feature, idx) => (
                                                        <div key={idx} className="flex items-center gap-3 md:gap-4 text-white/80">
                                                            <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center border border-blue-500/50 bg-blue-500/10">
                                                                <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                                                </svg>
                                                            </div>
                                                            <span className="text-sm font-medium">{feature}</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-sm text-muted-foreground">Özellik eklenmemiş</p>
                                                )}
                                            </div>

                                            <Link 
                                                href={pkg.link} 
                                                className="w-full py-4 md:py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm tracking-[0.2em] rounded-xl shadow-[0_15px_35px_-5px_rgba(37,99,235,0.5)] transition-all duration-300 transform hover:scale-[1.02] uppercase mb-6 block text-center"
                                            >
                                                Detayları Gör
                                            </Link>

                                            {/* YouTube Video */}
                                            {pkg.youtube_url ? (
                                                <div className="aspect-video rounded-lg border border-zinc-700/50 overflow-hidden">
                                                    <iframe
                                                        src={pkg.youtube_url}
                                                        title={`${pkg.title} Video`}
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        className="w-full h-full"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="aspect-video bg-zinc-800/50 rounded-lg border border-zinc-700/50 flex items-center justify-center">
                                                    <p className="text-sm text-muted-foreground">YouTube Video</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Cam Efekti Yansıması */}
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-500/5 via-transparent to-white/5 pointer-events-none" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 text-muted-foreground">
                            <p>Henüz paket eklenmemiş.</p>
                            <p className="text-sm mt-2">Admin panelden paket ekleyebilirsiniz.</p>
                        </div>
                    )}
                </section>

                {/* Paket Sistemleri Bölümleri */}
                <div className="space-y-24">
                    {/* 1-99 Orta Emek Sistemleri */}
                    <section id="orta-emek-systems" className="scroll-mt-24">
                        <div className="mb-12 text-center space-y-4">
                            <div className="inline-flex items-center gap-4 mb-2">
                                <div className="h-px w-20 bg-gradient-to-r from-transparent via-blue-500 to-blue-500"></div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-b from-white via-blue-100 to-white bg-clip-text text-transparent">
                                    1-99 Orta Emek Paketi
                                </h2>
                                <div className="h-px w-20 bg-gradient-to-l from-transparent via-blue-500 to-blue-500"></div>
                            </div>
                            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                                Bu pakette bulunan tüm sistemler ve özellikler admin panelden yönetilmektedir.
                            </p>
                        </div>
                        <FilteredSystemsView packageType="orta-emek" />
                    </section>

                    {/* 1-99 Hard Emek Sistemleri */}
                    <section id="hard-emek-systems" className="scroll-mt-24">
                        <div className="mb-12 text-center space-y-4">
                            <div className="inline-flex items-center gap-4 mb-2">
                                <div className="h-px w-20 bg-gradient-to-r from-transparent via-blue-500 to-blue-500"></div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-b from-white via-blue-100 to-white bg-clip-text text-transparent">
                                    1-99 Hard Emek Paketi
                                </h2>
                                <div className="h-px w-20 bg-gradient-to-l from-transparent via-blue-500 to-blue-500"></div>
                            </div>
                            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                                Bu pakette bulunan tüm sistemler ve özellikler admin panelden yönetilmektedir.
                            </p>
                        </div>
                        <FilteredSystemsView packageType="hard-emek" />
                    </section>

                    {/* 1-105 Files Sistemleri */}
                    <section id="files-105-systems" className="scroll-mt-24">
                        <div className="mb-12 text-center space-y-4">
                            <div className="inline-flex items-center gap-4 mb-2">
                                <div className="h-px w-20 bg-gradient-to-r from-transparent via-blue-500 to-blue-500"></div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-b from-white via-blue-100 to-white bg-clip-text text-transparent">
                                    1-105 Files Paketi
                                </h2>
                                <div className="h-px w-20 bg-gradient-to-l from-transparent via-blue-500 to-blue-500"></div>
                            </div>
                            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                                Bu pakette bulunan tüm sistemler ve özellikler admin panelden yönetilmektedir.
                            </p>
                        </div>
                        <FilteredSystemsView packageType="files-105" />
                    </section>
                </div>
            </div>
        </div>
    )
}
