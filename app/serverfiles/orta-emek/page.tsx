"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Check, Loader2 } from "lucide-react"
import Link from "next/link"
import { FilteredSystemsView } from "@/components/systems/filtered-systems-view"
import { supabase } from "@/lib/supabase"
import { convertToYouTubeEmbed } from "@/lib/youtube-utils"

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

export default function OrtaEmekPage() {
    const [packageData, setPackageData] = useState<ServerFilePackage | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPackageData()
    }, [])

    const fetchPackageData = async () => {
        try {
            const { data, error } = await supabase
                .from('server_file_packages')
                .select('*')
                .eq('package_type', 'orta-emek')
                .eq('active', true)
                .single()

            if (error) throw error
            setPackageData(data)
        } catch (err) {
            console.error('Error fetching package data:', err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-background pt-32 pb-16">
                <div className="container-width max-w-7xl mx-auto">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                </div>
            </main>
        )
    }

    const pkg = packageData || {
        title: "1-99 ORTA EMEK",
        subtitle: "Teklif Alınız",
        features: ["Orta seviye zorluk", "1-99 seviye aralığı", "Optimize edilmiş deneyim"],
        youtube_url: null
    }
    return (
        <main className="min-h-screen bg-background pt-32 pb-16">
            <div className="container-width max-w-7xl mx-auto">
                <Link href="/serverfiles" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Geri Dön</span>
                </Link>

                <Card className="glass-card p-8 md:p-12 rounded-3xl mb-8">
                    <div className="mb-8">
                        <span className="text-xs font-black tracking-[0.2em] text-blue-400 uppercase">
                            1-99 OLDSCHOOL
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-white mt-2 tracking-tight">
                            {pkg.subtitle || "Teklif Alınız"}
                        </h1>
                        <p className="text-lg text-muted-foreground mt-4">
                            Oldschool deneyim sunan, optimize edilmiş server files paketi.
                        </p>
                    </div>

                    <div className="space-y-4 mb-8">
                        {pkg.features && pkg.features.length > 0 ? (
                            pkg.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-4 text-white/90">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border border-blue-500/50 bg-blue-500/10">
                                        <Check className="w-3 h-3 text-blue-400" strokeWidth={3} />
                                    </div>
                                    <span className="text-base font-medium">{feature}</span>
                                </div>
                            ))
                        ) : (
                            <>
                                <div className="flex items-center gap-4 text-white/90">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border border-blue-500/50 bg-blue-500/10">
                                        <Check className="w-3 h-3 text-blue-400" strokeWidth={3} />
                                    </div>
                                    <span className="text-base font-medium">Orta seviye zorluk</span>
                                </div>
                                <div className="flex items-center gap-4 text-white/90">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border border-blue-500/50 bg-blue-500/10">
                                        <Check className="w-3 h-3 text-blue-400" strokeWidth={3} />
                                    </div>
                                    <span className="text-base font-medium">1-99 seviye aralığı</span>
                                </div>
                                <div className="flex items-center gap-4 text-white/90">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border border-blue-500/50 bg-blue-500/10">
                                        <Check className="w-3 h-3 text-blue-400" strokeWidth={3} />
                                    </div>
                                    <span className="text-base font-medium">Optimize edilmiş deneyim</span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* YouTube Video */}
                    {(() => {
                        const embedUrl = convertToYouTubeEmbed(pkg.youtube_url)
                        console.log('YouTube URL:', pkg.youtube_url, '→ Embed URL:', embedUrl)
                        return embedUrl ? (
                            <div className="aspect-video rounded-lg border border-zinc-700/50 mb-8 overflow-hidden bg-zinc-900">
                                <iframe
                                    src={embedUrl}
                                    title={`${pkg.title} Video`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    loading="lazy"
                                    className="w-full h-full"
                                    frameBorder="0"
                                />
                            </div>
                        ) : (
                            <div className="aspect-video bg-zinc-800/50 rounded-lg border border-zinc-700/50 flex items-center justify-center mb-8">
                                <p className="text-sm text-muted-foreground">
                                    {pkg.youtube_url ? `Geçersiz YouTube URL: ${pkg.youtube_url}` : 'YouTube Video'}
                                </p>
                            </div>
                        )
                    })()}

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                            <Link href="/iletisim">Teklif Al</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/serverfiles">Tüm Paketler</Link>
                        </Button>
                    </div>
                </Card>

                {/* Paket Sistemleri */}
                <FilteredSystemsView packageType="orta-emek" />
            </div>
        </main>
    )
}
