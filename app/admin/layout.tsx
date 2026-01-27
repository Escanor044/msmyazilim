"use client"

import { redirect, usePathname } from "next/navigation"
import { Shield, LayoutDashboard, Database, FileText, LogOut, Loader2, Users, Package, Server, Scale } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session && pathname !== "/admin/login") {
            redirect("/admin/login")
            return
        }

        // Admin email kontrolü - sadece belirli email ile giriş yapılabilir
        if (session?.user?.email) {
            const allowedAdminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL
            if (allowedAdminEmail && session.user.email.toLowerCase() !== allowedAdminEmail.toLowerCase()) {
                await supabase.auth.signOut()
                redirect("/admin/login")
                return
            }
        }

        setLoading(false)
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        redirect("/admin/login")
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    // Only render layout wrapper for non-login pages
    if (pathname === "/admin/login") {
        return <>{children}</>
    }

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-black/20 p-6 flex flex-col gap-8">
                <div className="flex items-center gap-2 px-2">
                    <Shield className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">Admin Panel</span>
                </div>

                <nav className="flex flex-col gap-2 flex-1">
                    <Link
                        href="/admin"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-white transition-colors"
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/referanslar"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-white transition-colors"
                    >
                        <Users className="h-4 w-4" />
                        Referanslar
                    </Link>
                    <Link
                        href="/admin/paketler"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-white transition-colors"
                    >
                        <Package className="h-4 w-4" />
                        Paketler
                    </Link>
                    <Link
                        href="/admin/server-files-packages"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-white transition-colors"
                    >
                        <Server className="h-4 w-4" />
                        Server Files Paketleri
                    </Link>
                    <Link
                        href="/admin/hakkimizda"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-white transition-colors"
                    >
                        <FileText className="h-4 w-4" />
                        Hakkımızda
                    </Link>
                    <Link
                        href="/admin/yasal-sayfalar"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-white transition-colors"
                    >
                        <Scale className="h-4 w-4" />
                        Yasal Sayfalar
                    </Link>
                </nav>

                <div className="space-y-2 mt-auto">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-white transition-colors"
                    >
                        <FileText className="h-4 w-4" />
                        Siteye Dön
                    </Link>
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 px-4 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={handleLogout}
                    >
                        <LogOut className="h-4 w-4" />
                        Çıkış Yap
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
