import Link from "next/link"
import { ShieldCheck, LayoutDashboard, ShoppingBag, MessageSquare, Users, Settings, LogOut, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

const sidebarItems = [
    { icon: LayoutDashboard, label: "Genel Bakış", href: "/admin" },
    { icon: ShoppingBag, label: "Siparişler", href: "/admin/siparisler" },
    { icon: MessageSquare, label: "Destek", href: "/admin/destek" },
    { icon: Users, label: "Üyeler", href: "/admin/uyeler" },
    { icon: Settings, label: "Ayarlar", href: "/admin/ayarlar" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen grid lg:grid-cols-[260px_1fr] bg-zinc-950 text-foreground">
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col border-r border-white/5 bg-zinc-900/20 backdrop-blur-xl">
                <div className="h-16 flex items-center px-6 border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-500/20">
                            <ShieldCheck className="h-5 w-5" />
                        </div>
                        <span className="font-bold text-lg text-white">MSM<span className="text-red-500">Admin</span></span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-white/5 mb-2">
                        <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xs">AD</div>
                        <div className="overflow-hidden">
                            <div className="text-sm font-medium text-white truncate">Root Admin</div>
                            <div className="text-xs text-zinc-500 truncate">Sistem Yöneticisi</div>
                        </div>
                    </div>
                    <button className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors">
                        <LogOut className="h-3 w-3" />
                        Güvenli Çıkış
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col min-h-screen">
                <header className="h-16 flex items-center justify-between px-4 lg:px-8 border-b border-white/5 bg-zinc-900/20 backdrop-blur-sm lg:bg-transparent">
                    <div className="lg:hidden flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-red-600 flex items-center justify-center text-white">
                            <ShieldCheck className="h-5 w-5" />
                        </div>
                        <span className="font-bold text-white">Admin Panel</span>
                    </div>

                    <div className="hidden lg:block text-sm text-zinc-500 decoration-wavy">
                        Yönetim Modu: <span className="text-green-500 font-medium">Aktif</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative text-zinc-400 hover:text-white">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        </Button>
                    </div>
                </header>

                <main className="flex-1 p-4 lg:p-8 overflow-auto bg-black/20">
                    {children}
                </main>
            </div>
        </div>
    )
}
