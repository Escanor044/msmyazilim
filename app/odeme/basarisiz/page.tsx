import Link from "next/link"
import { Button } from "@/components/ui/button"
import { XCircle, RefreshCw } from "lucide-react"

export default function FailedPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-8 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

            <div className="w-full max-w-lg text-center space-y-8 relative z-10 p-8 rounded-3xl border border-white/5 bg-black/20 backdrop-blur-xl">
                <div className="flex justify-center">
                    <div className="h-24 w-24 rounded-full bg-red-500/20 flex items-center justify-center animate-in zoom-in duration-500">
                        <XCircle className="h-12 w-12 text-red-500" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Ödeme Başarısız</h1>
                    <p className="text-muted-foreground text-lg">
                        İşlem sırasında bir hata oluştu veya ödeme bankanız tarafından onaylanmadı.
                    </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-left">
                    <h3 className="font-bold text-red-400 mb-2">Olası Nedenler:</h3>
                    <ul className="text-sm text-red-300 space-y-1 list-disc pl-4">
                        <li>Yetersiz bakiye</li>
                        <li>İnternet işlem limiti yetersiz</li>
                        <li>Kartın online ödemeye kapalı olması</li>
                        <li>3D Secure doğrulamasının yapılamaması</li>
                    </ul>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                    <Button className="w-full" size="lg" asChild>
                        <Link href="/odeme"><RefreshCw className="mr-2 h-4 w-4" /> Tekrar Dene</Link>
                    </Button>
                    <Button variant="outline" className="w-full" size="lg" asChild>
                        <Link href="/iletisim">Destek Al</Link>
                    </Button>
                </div>
            </div>
        </main>
    )
}
