"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { supabase } from "@/lib/supabase"
import { Loader2, Server } from "lucide-react"

interface Reference {
    id: number
    name: string
    type: string
    online_count: number
    image_url: string | null
}

export default function ReferencesPage() {
    const [references, setReferences] = useState<Reference[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchReferences()
    }, [])

    const fetchReferences = async () => {
        try {
            const { data, error } = await supabase
                .from('references')
                .select('*')
                .order('id', { ascending: false })

            if (error) throw error
            setReferences(data || [])
        } catch (error) {
            console.error('Error fetching references:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-background">
            <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-transparent border-b border-white/5">
                <div className="container-width text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Referanslarımız</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Bizi tercih eden yüzlerce mutlu müşteriden bazıları.
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="container-width">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : references.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            Henüz referans eklenmemiş.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {references.map((item) => (
                                <div key={item.id} className="group glass-card p-6 rounded-2xl flex flex-col gap-4">
                                    <div className="h-40 w-full bg-black/40 rounded-lg flex items-center justify-center border border-white/5 group-hover:border-primary/50 transition-colors relative overflow-hidden">
                                        {item.image_url ? (
                                            <>
                                                <img
                                                    src={item.image_url}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                                            </>
                                        ) : (
                                            <>
                                                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                                                <Server className="h-12 w-12 text-white/20 group-hover:text-white/40 transition-colors" />
                                            </>
                                        )}
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-bold text-lg">{item.name}</h3>
                                            <span className="text-xs text-green-500 font-mono bg-green-500/10 px-2 py-1 rounded">+{item.online_count} Online</span>
                                        </div>

                                        <p className="text-sm text-muted-foreground">{item.type}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}
