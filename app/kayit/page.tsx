import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShieldCheck } from "lucide-react"

export default function RegisterPage() {
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
                        <h1 className="text-2xl font-bold tracking-tight">Kayıt Ol</h1>
                        <p className="text-muted-foreground">Profesyonel hizmet için hesabınızı oluşturun.</p>
                    </div>

                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Ad</label>
                                <Input placeholder="Adınız" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Soyad</label>
                                <Input placeholder="Soyadınız" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">E-Posta</label>
                            <Input type="email" placeholder="mail@ornek.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Telefon</label>
                            <Input placeholder="0555..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Şifre</label>
                            <Input type="password" />
                        </div>

                        <div className="text-xs text-muted-foreground">
                            Kayıt olarak <Link href="#" className="underline">Kullanım Şartları</Link>'nı kabul etmiş olursunuz.
                        </div>

                        <Button className="w-full" size="lg">Hesap Oluştur</Button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground">
                        Zaten hesabınız var mı?{" "}
                        <Link href="/giris" className="text-primary hover:underline font-medium">
                            Giriş Yap
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right - Visual */}
            <div className="hidden lg:flex relative bg-black items-center justify-center p-12 overflow-hidden border-l border-white/5">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-black z-0" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

                <div className="relative z-10 max-w-lg text-center space-y-4">
                    <h2 className="text-3xl font-bold text-white">Metin2 Sektöründe Lider</h2>
                    <p className="text-white/60 leading-relaxed">
                        Yüzlerce referans ve mutlu müşteri ile projenizin arkasındaki güç olmaya hazırız.
                    </p>
                </div>
            </div>
        </main>
    )
}
