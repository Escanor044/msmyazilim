import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShieldCheck } from "lucide-react"

export default function ResetPasswordPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-8 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

            <div className="w-full max-w-sm space-y-8 relative z-10">
                <div className="text-center space-y-4">
                    <Link href="/" className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-indigo-600 text-white shadow-lg shadow-primary/20">
                        <ShieldCheck className="h-7 w-7" />
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">Yeni Şifre Belirle</h1>
                    <p className="text-muted-foreground">
                        Hesabınız için yeni bir güçlü şifre belirleyin.
                    </p>
                </div>

                <form className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Yeni Şifre</label>
                        <Input type="password" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Yeni Şifre (Tekrar)</label>
                        <Input type="password" />
                    </div>

                    <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                        <li>En az 8 karakter</li>
                        <li>En az 1 büyük harf</li>
                        <li>En az 1 rakam</li>
                    </ul>

                    <Button className="w-full" size="lg">Şifreyi Güncelle</Button>
                </form>
            </div>
        </main>
    )
}
