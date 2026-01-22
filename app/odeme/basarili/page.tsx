import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-8 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-lg text-center space-y-8 relative z-10 p-8 rounded-3xl border border-white/5 bg-black/20 backdrop-blur-xl">
                <div className="flex justify-center">
                    <div className="h-24 w-24 rounded-full bg-green-500/20 flex items-center justify-center animate-in zoom-in duration-500">
                        <CheckCircle className="h-12 w-12 text-green-500" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Ödeme Başarılı!</h1>
                    <p className="text-muted-foreground text-lg">
                        Siparişiniz başarıyla alındı. Kurulum süreciniz otomatik olarak başlatılmıştır.
                    </p>
                </div>

                <div className="bg-white/5 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Sipariş No</span>
                        <span className="font-mono font-bold">#SIP-29384</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tutar</span>
                        <span className="font-bold">25.000 ₺</span>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                    <Button className="w-full" size="lg" asChild>
                        <Link href="/panel">Panele Git</Link>
                    </Button>
                    <Button variant="outline" className="w-full" size="lg" asChild>
                        <Link href="/">Ana Sayfaya Dön</Link>
                    </Button>
                </div>
            </div>
        </main>
    )
}
