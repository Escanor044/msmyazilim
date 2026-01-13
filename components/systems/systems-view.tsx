"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Monitor, Swords, Shield, Database, Settings, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { systems } from "@/lib/systems-data"

const categories = [
    { id: "all", name: "Tümü", icon: Monitor },
    { id: "pvp", name: "PvP Sistemleri", icon: Swords },
    { id: "pvm", name: "PvM Sistemleri", icon: Database },
    { id: "qol", name: "Oyun Konforu", icon: Crown },
    { id: "admin", name: "Yönetim", icon: Shield },
]

export function SystemsView() {
    const [activeTab, setActiveTab] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")

    const filteredSystems = systems.filter(sys => {
        const matchesCategory = activeTab === "all" || sys.category === activeTab
        const matchesSearch = sys.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sys.desc.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="space-y-8">
            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-black/20 p-4 rounded-xl border border-white/5">
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                                activeTab === cat.id
                                    ? "bg-primary text-white"
                                    : "bg-white/5 text-muted-foreground hover:bg-white/10"
                            )}
                        >
                            <cat.icon className="h-4 w-4" />
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
                    <Link
                        key={system.id}
                        href={`/sistemler/${system.id}`}
                        className="group relative rounded-xl bg-card border hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col h-full"
                    >
                        {/* Image Section */}
                        {system.image && (
                            <div className="relative h-48 w-full overflow-hidden bg-black/20">
                                <img
                                    src={system.image}
                                    alt={system.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1 border-t border-white/5 bg-black/40">
                            <div className="flex items-start gap-4 mb-3">
                                <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <Settings className="h-5 w-5" />
                                </div>
                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{system.name}</h3>
                            </div>

                            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{system.desc}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {filteredSystems.length === 0 && (
                <div className="text-center py-24 text-muted-foreground">
                    Aradığınız kriterlere uygun sistem bulunamadı.
                </div>
            )}
        </div>
    )
}
