import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

export default function PendingPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-8 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

            <div className="w-full max-w-lg text-center space-y-8 relative z-10 p-8 rounded-3xl border border-white/5 bg-black/20 backdrop-blur-xl">
                <div className="flex justify-center">
                    <div className="h-24 w-24 rounded-full bg-yellow-500/20 flex items-center justify-center animate-pulse">
                        <Clock className="h-12 w-12 text-yellow-500" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Ödeme Bekleniyor</h1>
                    <p className="text-muted-foreground text-lg">
                        Ödemeniz işlem görüyor. Bu işlem bankanıza bağlı olarak birkaç dakika sürebilir.
                    </p>
                </div>

                <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-4">
                    <p className="text-sm text-yellow-200/80">
                        Lütfen sayfayı kapatmayın veya yenilemeyin. İşlem tamamlandığında otomatik olarak yönlendirileceksiniz.
                    </p>
                </div>

                <div className="pt-4">
                    <Button variant="outline" className="w-full" size="lg" asChild>
                        <Link href="/panel/siparisler">Siparişlerime Git</Link>
                    </Button>
                </div>
            </div>
        </main>
    )
}
