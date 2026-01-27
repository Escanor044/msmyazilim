"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Monitor, Swords, Shield, Database, Settings, Crown, Eye, Smartphone, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
// import { systems } from "@/lib/systems-data" // Old hardcoded data
import { supabase } from "@/lib/supabase"

interface System {
    id: number
    name: string
    category: string
    desc: string // Short description
    included: boolean
    image: string
}

interface Category {
    id: number
    name: string
    slug: string
    sort_order: number
}

export function SystemsView() {
    const [activeTab, setActiveTab] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [systems, setSystems] = useState<System[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true)

            // Fetch categories
            const { data: categoriesData } = await supabase
                .from('system_categories')
                .select('*')
                .order('sort_order', { ascending: true })

            if (categoriesData) {
                setCategories(categoriesData)
            }

            // Fetch systems
            const { data, error } = await supabase
                .from('systems')
                .select('*')
                .order('id', { ascending: true }) // Order by ID or creation specific order? 

            if (error) {
                console.error("Error fetching systems:", error)
                setError("Sistemler yüklenirken bir sorun oluştu.")
            } else {
                setSystems(data || [])
            }
            setLoading(false)
        }

        fetchData()
    }, [])

    const filteredSystems = systems.filter(sys => {
        const matchesCategory = activeTab === "all" || sys.category === activeTab
        const matchesSearch = sys.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (sys.desc && sys.desc.toLowerCase().includes(searchQuery.toLowerCase()))
        return matchesCategory && matchesSearch
    })

    if (loading) {
        return (
            <div className="flex justify-center items-center py-24">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
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

    return (
        <div className="space-y-8">
            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-black/20 p-4 rounded-xl border border-white/5">
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                    <button
                        onClick={() => setActiveTab("all")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                            activeTab === "all"
                                ? "bg-primary text-white"
                                : "bg-white/5 text-muted-foreground hover:bg-white/10"
                        )}
                    >
                        <Monitor className="h-4 w-4" />
                        Tümü
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.slug)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                                activeTab === cat.slug
                                    ? "bg-primary text-white"
                                    : "bg-white/5 text-muted-foreground hover:bg-white/10"
                            )}
                        >
                            <Settings className="h-4 w-4" />
                            {cat.name}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Sistem ara..."
                        className="pl-9 bg-black/40 border-white/10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSystems.map((system) => (
                    <div
                        key={system.id}
                        className="group relative rounded-xl bg-card border hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col h-full"
                    >
                        {/* Image Section */}
                        {system.image ? (
                            <Link
                                href={`/sistemler/${system.id}`}
                                className="relative w-full aspect-video overflow-hidden bg-black/20 block"
                            >
                                <img
                                    src={system.image}
                                    alt={system.name}
                                    className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-3 right-3 z-10">
                                    {system.included ? (
                                        <span className="px-2 py-1 rounded text-[10px] font-bold bg-green-500/90 text-white shadow-sm backdrop-blur-sm border border-green-400/20">
                                            PAKETE DAHİL
                                        </span>
                                    ) : (
                                        <span className="px-2 py-1 rounded text-[10px] font-bold bg-yellow-500/90 text-white shadow-sm backdrop-blur-sm border border-yellow-400/20">
                                            EKSTRA
                                        </span>
                                    )}
                                </div>
                            </Link>
                        ) : (
                            <Link
                                href={`/sistemler/${system.id}`}
                                className="relative w-full aspect-video overflow-hidden bg-black/20 block flex items-center justify-center"
                            >
                                <Monitor className="h-12 w-12 text-muted-foreground/50" />
                                <div className="absolute top-3 right-3 z-10">
                                    {system.included ? (
                                        <span className="px-2 py-1 rounded text-[10px] font-bold bg-green-500/90 text-white shadow-sm backdrop-blur-sm border border-green-400/20">
                                            PAKETE DAHİL
                                        </span>
                                    ) : (
                                        <span className="px-2 py-1 rounded text-[10px] font-bold bg-yellow-500/90 text-white shadow-sm backdrop-blur-sm border border-yellow-400/20">
                                            EKSTRA
                                        </span>
                                    )}
                                </div>
                            </Link>
                        )}

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1 border-t border-white/5 bg-black/40">
                            <div className="flex items-start gap-4 mb-3">
                                <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <Settings className="h-5 w-5" />
                                </div>
                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{system.name}</h3>
                            </div>

                            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">{system.desc}</p>

                            <div className="flex flex-col gap-2 mt-auto">
                                <Button
                                    asChild
                                    size="sm"
                                    className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 gap-2"
                                >
                                    <Link href={`/sistemler/${system.id}`}>
                                        <Eye className="h-3.5 w-3.5" />
                                        İncele
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className="w-full bg-secondary/50 hover:bg-secondary/70 text-secondary-foreground border border-white/10 gap-2"
                                >
                                    <Link
                                        href={`https://wa.me/905551404633?text=${encodeURIComponent(`Merhaba, ${system.name} hakkında bilgi almak istiyorum.`)}`}
                                        target="_blank"
                                    >
                                        <Smartphone className="h-3.5 w-3.5" />
                                        WhatsApp ile Bilgi Al
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {!loading && filteredSystems.length === 0 && (
                <div className="text-center py-24 text-muted-foreground">
                    Aradığınız kriterlere uygun sistem bulunamadı.
                </div>
            )}
        </div>
    )
}
