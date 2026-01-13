import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShieldCheck, ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-8 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

            <div className="w-full max-w-sm space-y-8 relative z-10">
                <div className="text-center space-y-4">
                    <Link href="/" className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-indigo-600 text-white shadow-lg shadow-primary/20">
                        <ShieldCheck className="h-7 w-7" />
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">Şifremi Unuttum</h1>
                    <p className="text-muted-foreground">
                        Hesabınıza kayıtlı e-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
                    </p>
                </div>

                <form className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">E-Posta</label>
                        <Input type="email" placeholder="mail@ornek.com" className="bg-background/50 backdrop-blur-sm" />
                    </div>
                    <Button className="w-full" size="lg">Sıfırlama Bağlantısı Gönder</Button>
                </form>

                <p className="text-center text-sm">
                    <Link href="/giris" className="text-muted-foreground hover:text-foreground flex items-center justify-center gap-2 transition-colors">
                        <ArrowLeft className="h-4 w-4" /> Giriş sayfasına dön
                    </Link>
                </p>
            </div>
        </main>
    )
}
