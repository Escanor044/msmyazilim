import Link from "next/link"
import { ShieldCheck, LayoutDashboard, Server, Package, ShoppingCart, LifeBuoy, Settings, LogOut, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const textClass = "text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Genel Bakış", href: "/panel" },
    { icon: Server, label: "Paketlerim", href: "/panel/paketlerim" },
    { icon: ShoppingCart, label: "Siparişlerim", href: "/panel/siparisler" },
    { icon: Package, label: "Faturalar", href: "/panel/faturalar" },
    { icon: LifeBuoy, label: "Destek Talepleri", href: "/panel/destek" },
    { icon: Settings, label: "Ayarlar", href: "/panel/ayarlar" },
]

export default function PanelLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen grid lg:grid-cols-[280px_1fr] bg-background">
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col border-r border-white/5 bg-black/20 backdrop-blur-xl">
                <div className="h-16 flex items-center px-6 border-b border-white/5">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <ShieldCheck className="h-5 w-5" />
                        </div>
                        <span className="font-bold text-lg">MSM<span className="text-primary">Panel</span></span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
                        <LogOut className="h-4 w-4" />
                        Çıkış Yap
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col min-h-screen">
                <header className="h-16 flex items-center justify-between px-4 lg:px-8 border-b border-white/5 bg-black/20 backdrop-blur-sm lg:bg-transparent">
                    <div className="lg:hidden flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white">
                            <ShieldCheck className="h-5 w-5" />
                        </div>
                        <span className="font-bold">MSM Panel</span>
                    </div>

                    <div className="hidden lg:block text-sm text-muted-foreground">
                        Hoşgeldin, <span className="text-foreground font-semibold">Ahmet Yılmaz</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5 text-muted-foreground" />
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
                        </Button>
                        <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/20 flex items-center justify-center text-primary">
                            <span className="font-bold text-xs">AY</span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 lg:p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
