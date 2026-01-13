import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShieldCheck } from "lucide-react"

export default function LoginPage() {
    return (
        <main className="min-h-screen grid lg:grid-cols-2 bg-background">
            {/* Left - Form */}
            <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-sm space-y-6">
                    <Link href="/" className="flex items-center gap-2 group mb-8">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <span className="font-bold text-xl">MSM<span className="text-primary">Yazılım</span></span>
                    </Link>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold tracking-tight">Tekrar Hoşgeldiniz</h1>
                        <p className="text-muted-foreground">Devam etmek için hesabınıza giriş yapın.</p>
                    </div>

                    <form className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">E-Posta</label>
                            <Input type="email" placeholder="mail@ornek.com" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">Şifre</label>
                                <Link href="/sifremi-unuttum" className="text-xs text-primary hover:underline">
                                    Şifremi unuttum?
                                </Link>
                            </div>
                            <Input type="password" />
                        </div>
                        <Button className="w-full" size="lg" asChild>
                            <Link href="/panel">Giriş Yap</Link>
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-muted/20" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">veya</span>
                        </div>
                    </div>

                    <p className="text-center text-sm text-muted-foreground">
                        Hesabınız yok mu?{" "}
                        <Link href="/kayit" className="text-primary hover:underline font-medium">
                            Hemen Kayıt Olun
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right - Visual */}
            <div className="hidden lg:flex relative bg-black items-center justify-center p-12 overflow-hidden border-l border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-black z-0" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

                <div className="relative z-10 max-w-lg text-center space-y-4">
                    <h2 className="text-3xl font-bold text-white">Güvenli Yönetim Paneli</h2>
                    <p className="text-white/60 leading-relaxed">
                        Siparişlerinizi takip edin, destek talebi oluşturun ve lisanslarınızı tek bi yerden yönetin.
                    </p>
                </div>
            </div>
        </main>
    )
}
