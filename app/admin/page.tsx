"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Database, Users, ArrowRight, Loader2, Tag, Package, FileText, Settings } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        systems: 0,
        references: 0,
        categories: 0,
        referenceTypes: 0,
        packages: 0,
        packageTypes: {
            ortaEmek: 0,
            hardEmek: 0,
            files105: 0
        }
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            // Sistemler
            const { count: systemsCount } = await supabase
                .from('systems')
                .select('*', { count: 'exact', head: true })

            // Referanslar
            const { count: referencesCount } = await supabase
                .from('references')
                .select('*', { count: 'exact', head: true })

            // Kategoriler
            const { count: categoriesCount } = await supabase
                .from('system_categories')
                .select('*', { count: 'exact', head: true })

            // Reference Types
            let referenceTypesCount = 0
            try {
                const { count } = await supabase
                    .from('reference_types')
                    .select('*', { count: 'exact', head: true })
                referenceTypesCount = count || 0
            } catch {
                referenceTypesCount = 0
            }

            // Packages
            const { count: packagesCount } = await supabase
                .from('packages')
                .select('*', { count: 'exact', head: true })
                .eq('active', true)

            // Package Types
            const { count: ortaEmekCount } = await supabase
                .from('systems')
                .select('*', { count: 'exact', head: true })
                .eq('package_type', 'orta-emek')

            const { count: hardEmekCount } = await supabase
                .from('systems')
                .select('*', { count: 'exact', head: true })
                .eq('package_type', 'hard-emek')

            const { count: files105Count } = await supabase
                .from('systems')
                .select('*', { count: 'exact', head: true })
                .eq('package_type', 'files-105')

            setStats({
                systems: systemsCount || 0,
                references: referencesCount || 0,
                categories: categoriesCount || 0,
                referenceTypes: referenceTypesCount || 0,
                packages: packagesCount || 0,
                packageTypes: {
                    ortaEmek: ortaEmekCount || 0,
                    hardEmek: hardEmekCount || 0,
                    files105: files105Count || 0
                }
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
            <div>
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-muted-foreground">Veritabanı yapılarınızın genel görünümü</p>
            </div>

            {/* Ana İstatistikler */}
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
                        href="/admin/server-files-packages"
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

                {/* Categories Card */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 hover:border-blue-500/50 transition-colors group">
                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-blue-500/20 rounded-lg text-blue-500 group-hover:scale-110 transition-transform">
                            <Tag className="h-6 w-6" />
                        </div>
                        <span className="text-3xl font-bold">{stats.categories}</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Sistem Kategorileri</h3>
                        <p className="text-muted-foreground text-sm">Sistem kategorileri.</p>
                    </div>
                    <Link
                        href="/admin/server-files-packages"
                        className="flex items-center text-sm text-blue-500 hover:text-blue-400 transition-colors font-medium"
                    >
                        Yönet <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Packages Card */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 hover:border-purple-500/50 transition-colors group">
                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-purple-500/20 rounded-lg text-purple-500 group-hover:scale-110 transition-transform">
                            <Package className="h-6 w-6" />
                        </div>
                        <span className="text-3xl font-bold">{stats.packages}</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Paketler</h3>
                        <p className="text-muted-foreground text-sm">Ana sayfa paket seçenekleri.</p>
                    </div>
                    <Link
                        href="/admin/paketler"
                        className="flex items-center text-sm text-purple-500 hover:text-purple-400 transition-colors font-medium"
                    >
                        Yönet <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Server Files Paketleri */}
            <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Package className="h-6 w-6 text-primary" />
                    Server Files Paketleri
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">1-99 Orta Emek</span>
                            <span className="text-2xl font-bold text-primary">{stats.packageTypes.ortaEmek}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Sistem sayısı</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">1-99 Hard Emek</span>
                            <span className="text-2xl font-bold text-primary">{stats.packageTypes.hardEmek}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Sistem sayısı</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">1-105 Files</span>
                            <span className="text-2xl font-bold text-primary">{stats.packageTypes.files105}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Sistem sayısı</p>
                    </div>
                </div>
            </div>

            {/* Diğer Yapılar */}
            <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Settings className="h-6 w-6 text-primary" />
                    Diğer Yapılar
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-purple-500" />
                                <div>
                                    <h3 className="font-semibold">Referans Tipleri</h3>
                                    <p className="text-xs text-muted-foreground">Kategori sayısı</p>
                                </div>
                            </div>
                            <span className="text-2xl font-bold">{stats.referenceTypes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
