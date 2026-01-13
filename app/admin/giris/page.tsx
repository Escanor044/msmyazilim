import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShieldAlert } from "lucide-react"

export default function AdminLoginPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-8 bg-zinc-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

            <div className="w-full max-w-sm space-y-8 relative z-10">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-xl bg-red-900/20 text-red-500 border border-red-500/20 mb-4 shadow-[0_0_30px_-10px_rgba(220,38,38,0.5)]">
                        <ShieldAlert className="h-8 w-8" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Yönetici Girişi</h1>
                    <p className="text-zinc-400">
                        Sadece yetkili personel erişebilir. IP adresiniz kayıt altına alınmaktadır.
                    </p>
                </div>

                <form className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Kullanıcı Adı</label>
                        <Input className="bg-zinc-900/50 border-zinc-800 focus:border-red-500/50" placeholder="admin" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Şifre</label>
                        <Input type="password" className="bg-zinc-900/50 border-zinc-800 focus:border-red-500/50" />
                    </div>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20" size="lg" asChild>
                        <Link href="/admin">Panele Eriş</Link>
                    </Button>
                </form>

                <p className="text-center text-xs text-zinc-600">
                    Yetkisiz erişim denemeleri yasal işlem gerektirir.<br />
                    System ID: ADMIN-SECURE-92
                </p>
            </div>
        </main>
    )
}
