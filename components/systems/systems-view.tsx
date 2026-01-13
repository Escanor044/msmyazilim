"use client"

import { useState } from "react"
import { Search, Monitor, Swords, Shield, Database, Settings, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const systems = [
    // PvP Systems
    { id: 1, name: "Gelişmiş Arena", category: "pvp", desc: "Bahisli 1-1 VS turnuva sistemi.", included: false },
    { id: 2, name: "Lonca İstatistik", category: "pvp", desc: "Detaylı lonca savaşı istatistikleri.", included: true },
    { id: 3, name: "Kill Efektleri", category: "pvp", desc: "Özel kill efektleri ve sesleri.", included: true },

    // PvM Systems
    { id: 4, name: "Zindan Takip", category: "pvm", desc: "Zindan cooldown ve girenleri görme.", included: true },
    { id: 5, name: "Patron Takip", category: "pvm", desc: "Boss doğma süreleri ve lokasyonları.", included: true },
    { id: 6, name: "Otomatik Av", category: "pvm", desc: "Gelişmiş legal bot sistemi.", included: false },

    // QoL Systems
    { id: 7, name: "Hızlı Biyolog", category: "qol", desc: "Tek tıkla biyolog teslim etme.", included: true },
    { id: 8, name: "Uzaktan NPC", category: "qol", desc: "Map farketmeksizin market açma.", included: true },
    { id: 9, name: "Toplu Sandık", category: "qol", desc: "Tek seferde binlerce sandık açımı.", included: true },

    // Admin Systems
    { id: 10, name: "Ban Paneli", category: "admin", desc: "Oyun içi gelişmiş ban arayüzü.", included: true },
    { id: 11, name: "Event Yöneticisi", category: "admin", desc: "Tek tıkla event başlatma/bitirme.", included: true },
    { id: 12, name: "Item Kopyalama", category: "admin", desc: "Oyuncu envanterinden item kopyalama.", included: true },
]

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
                    <div key={system.id} className="group relative p-6 rounded-xl bg-card border hover:border-primary/50 transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <Settings className="h-5 w-5" />
                            </div>
                            {system.included ? (
                                <span className="px-2 py-1 rounded text-[10px] font-bold bg-green-500/10 text-green-500 border border-green-500/20">
                                    PAKETE DAHİL
                                </span>
                            ) : (
                                <span className="px-2 py-1 rounded text-[10px] font-bold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                                    EKSTRA
                                </span>
                            )}
                        </div>

                        <h3 className="text-lg font-bold mb-2">{system.name}</h3>
                        <p className="text-sm text-muted-foreground">{system.desc}</p>
                    </div>
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
