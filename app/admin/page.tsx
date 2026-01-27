"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Database, Users, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        systems: 0,
        references: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const { count: systemsCount } = await supabase
                .from('systems')
                .select('*', { count: 'exact', head: true })

            const { count: referencesCount } = await supabase
                .from('references')
                .select('*', { count: 'exact', head: true })

            setStats({
                systems: systemsCount || 0,
                references: referencesCount || 0
            })
        } catch (error) {
            console.error('Error fetching stats:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return (
        <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    )

    return (
        <div className="p-8 space-y-8 text-foreground">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Systems Card */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 hover:border-primary/50 transition-colors group">
                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-primary/20 rounded-lg text-primary group-hover:scale-110 transition-transform">
                            <Database className="h-6 w-6" />
                        </div>
                        <span className="text-3xl font-bold">{stats.systems}</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Sistemler</h3>
                        <p className="text-muted-foreground text-sm">Aktif satışta olan sistemler.</p>
                    </div>
                    <Link
                        href="/admin/sistemler"
                        className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                        Yönet <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* References Card */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 hover:border-white/20 transition-colors group">
                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-green-500/20 rounded-lg text-green-500 group-hover:scale-110 transition-transform">
                            <Users className="h-6 w-6" />
                        </div>
                        <span className="text-3xl font-bold">{stats.references}</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Referanslar</h3>
                        <p className="text-muted-foreground text-sm">Mutlu müşteri referansları.</p>
                    </div>
                    <Link
                        href="/admin/referanslar"
                        className="flex items-center text-sm text-green-500 hover:text-green-400 transition-colors font-medium"
                    >
                        Yönet <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
