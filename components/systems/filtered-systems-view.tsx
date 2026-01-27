"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Monitor, Settings, Eye, Smartphone, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"

interface System {
    id: number
    name: string
    category: string
    desc: string
    included: boolean
    image: string
    package_type?: string | null // "orta-emek", "hard-emek", "files-105" veya null
}

interface FilteredSystemsViewProps {
    packageType?: string // "orta-emek", "hard-emek", "files-105"
    categoryFilter?: string // Category slug to filter by
}

export function FilteredSystemsView({ packageType, categoryFilter }: FilteredSystemsViewProps) {
    const [systems, setSystems] = useState<System[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            // Fetch systems
            const { data, error } = await supabase
                .from('systems')
                .select('*')
                .order('id', { ascending: true })

            if (error) {
                console.error("Error fetching systems:", error)
                setError("Sistemler yüklenirken bir sorun oluştu.")
            } else {
                let filtered = data || []

                // Filter by category if provided
                if (categoryFilter) {
                    filtered = filtered.filter(sys => sys.category === categoryFilter)
                }

                // Filter by package type if provided
                if (packageType) {
                    filtered = filtered.filter(sys => sys.package_type === packageType)
                }

                setSystems(filtered)
            }
            setLoading(false)
        }

        fetchData()
    }, [categoryFilter, packageType])

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center py-24 space-y-4">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-primary/10 blur-2xl animate-pulse"></div>
                    </div>
                    <Loader2 className="h-12 w-12 animate-spin text-primary relative z-10" />
                </div>
                <p className="text-muted-foreground text-sm">Sistemler yükleniyor...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-red-400 gap-4">
                <AlertCircle className="h-12 w-12" />
                <p>{error}</p>
                <Button variant="outline" onClick={() => window.location.reload()}>Tekrar Dene</Button>
            </div>
        )
    }

    if (systems.length === 0) {
        return (
            <div className="relative py-24 px-6">
                <div className="max-w-md mx-auto text-center space-y-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 rounded-full bg-primary/10 blur-3xl"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-primary/20 flex items-center justify-center backdrop-blur-sm">
                                <Settings className="h-12 w-12 text-primary/50" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-foreground">Henüz Sistem Eklenmemiş</h3>
                        <p className="text-muted-foreground">
                            Bu paket için sistemler admin panelden eklendikçe burada görünecektir.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {systems.map((system) => (
                    <div
                        key={system.id}
                        className="group relative rounded-xl bg-gradient-to-b from-blue-950/40 to-[#020617] border-2 border-blue-500/60 hover:border-blue-500 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.4)] transition-all duration-300 overflow-hidden flex flex-col h-full backdrop-blur-sm"
                    >
                        {/* Image Section */}
                        {system.image ? (
                            <Link
                                href={`/sistemler/${system.id}`}
                                className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-blue-950/60 to-black/40 block"
                            >
                                <img
                                    src={system.image}
                                    alt={system.name}
                                    className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-110 p-4"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent pointer-events-none"></div>
                                <div className="absolute top-3 right-3 z-10">
                                    {system.included ? (
                                        <span className="px-3 py-1.5 rounded-full text-[10px] font-black bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg backdrop-blur-sm border border-green-400/30 uppercase tracking-wider">
                                            PAKETE DAHİL
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1.5 rounded-full text-[10px] font-black bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg backdrop-blur-sm border border-amber-400/30 uppercase tracking-wider">
                                            EKSTRA
                                        </span>
                                    )}
                                </div>
                            </Link>
                        ) : (
                            <Link
                                href={`/sistemler/${system.id}`}
                                className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-blue-950/60 to-black/40 block flex items-center justify-center"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
                                    <Monitor className="h-16 w-16 text-primary/40 relative z-10" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent pointer-events-none"></div>
                                <div className="absolute top-3 right-3 z-10">
                                    {system.included ? (
                                        <span className="px-3 py-1.5 rounded-full text-[10px] font-black bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg backdrop-blur-sm border border-green-400/30 uppercase tracking-wider">
                                            PAKETE DAHİL
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1.5 rounded-full text-[10px] font-black bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg backdrop-blur-sm border border-amber-400/30 uppercase tracking-wider">
                                            EKSTRA
                                        </span>
                                    )}
                                </div>
                            </Link>
                        )}

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1 border-t border-blue-500/20 bg-gradient-to-b from-transparent to-[#020617]/40">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                    <Settings className="h-6 w-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors leading-tight">{system.name}</h3>
                                </div>
                            </div>

                            <p className="text-sm text-white/70 line-clamp-2 leading-relaxed mb-6 min-h-[2.5rem]">{system.desc || "Sistem açıklaması"}</p>

                            <div className="flex flex-col gap-2.5 mt-auto">
                                <Button
                                    asChild
                                    size="sm"
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white border-0 shadow-[0_4px_14px_0_rgba(59,130,246,0.4)] hover:shadow-[0_6px_20px_0_rgba(59,130,246,0.5)] gap-2 font-semibold transition-all duration-300"
                                >
                                    <Link href={`/sistemler/${system.id}`}>
                                        <Eye className="h-4 w-4" />
                                        Detayları İncele
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    variant="outline"
                                    className="w-full bg-transparent hover:bg-white/5 text-white/80 hover:text-white border-white/20 hover:border-white/30 gap-2 transition-all duration-300"
                                >
                                    <Link
                                        href={`https://wa.me/905551404633?text=${encodeURIComponent(`Merhaba, ${system.name} hakkında bilgi almak istiyorum.`)}`}
                                        target="_blank"
                                    >
                                        <Smartphone className="h-4 w-4" />
                                        WhatsApp ile İletişim
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Glow Effect */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}
