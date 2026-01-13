"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Server Files", href: "/files" },
    { name: "Sistemler", href: "/sistemler" },
    { name: "Referanslar", href: "/referanslar" },
    { name: "S.S.S.", href: "/sss" },
    { name: "İletişim", href: "/iletisim" },
]

export function Header() {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
    const pathname = usePathname()




    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-background/80 backdrop-blur-lg border-b border-white/5 py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container-width flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all">
                        <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-xl leading-none tracking-tight">
                            MSM<span className="text-primary">Yazılım</span>
                        </span>
                        <span className="text-[10px] text-muted-foreground font-medium tracking-widest uppercase">
                            Metin2 Çözümleri
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary relative py-1",
                                pathname === item.href
                                    ? "text-primary"
                                    : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                            {pathname === item.href && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/giris">Giriş Yap</Link>
                    </Button>
                    <Button size="sm" asChild className="bg-primary hover:bg-primary/90">
                        <Link href="/kayit">Kayıt Ol</Link>
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-muted-foreground hover:text-foreground"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/5 p-4 flex flex-col gap-4 animate-in slide-in-from-top-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-base font-medium p-2 rounded-lg hover:bg-white/5 transition-colors",
                                pathname === item.href
                                    ? "text-primary bg-primary/10"
                                    : "text-muted-foreground"
                            )}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="h-px bg-white/10 my-2" />
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" asChild>
                            <Link href="/giris">Giriş Yap</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/kayit">Kayıt Ol</Link>
                        </Button>
                    </div>
                </div>
            )}
        </header>
    )
}
