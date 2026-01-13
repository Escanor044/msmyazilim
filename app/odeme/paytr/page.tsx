"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, ShieldCheck, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PaytrRedirectPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)

    useEffect(() => {
        // Simulate steps
        const t1 = setTimeout(() => setStep(2), 1500)
        const t2 = setTimeout(() => setStep(3), 3000)

        // Auto redirect after 5s
        const t3 = setTimeout(() => {
            // Only if in real scenario, here we stay or redirect to success for demo
            router.push('/odeme/basarili')
        }, 6000)

        return () => {
            clearTimeout(t1)
            clearTimeout(t2)
            clearTimeout(t3)
        }
    }, [router])

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 p-4">
            <div className="w-full max-w-md text-center space-y-8">
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-4 rounded-xl">
                        {/* PayTR Logo Mock */}
                        <span className="text-2xl font-bold text-blue-900 tracking-wider">PayTR</span>
                    </div>
                </div>

                <div className="space-y-6">
                    <h1 className="text-xl md:text-2xl font-bold text-white">Güvenli Ödeme Sayfasına Yönlendiriliyorsunuz</h1>

                    <div className="flex justify-center">
                        <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    </div>

                    <div className="space-y-3 max-w-xs mx-auto text-sm text-zinc-400">
                        <div className={`transition-all duration-500 flex items-center gap-3 ${step >= 1 ? 'opacity-100 text-green-400' : 'opacity-40'}`}>
                            <ShieldCheck className="h-4 w-4" /> Sipariş oluşturuluyor...
                        </div>
                        <div className={`transition-all duration-500 flex items-center gap-3 ${step >= 2 ? 'opacity-100 text-green-400' : 'opacity-40'}`}>
                            <Lock className="h-4 w-4" /> Güvenli oturum başlatılıyor...
                        </div>
                        <div className={`transition-all duration-500 flex items-center gap-3 ${step >= 3 ? 'opacity-100 text-green-400' : 'opacity-40'}`}>
                            <Loader2 className="h-4 w-4 animate-spin" /> PayTR sayfasına aktarılıyor...
                        </div>
                    </div>
                </div>

                <div className="pt-8 text-xs text-zinc-500">
                    <p>Yönlendirme gerçekleşmezse aşağıdaki butona tıklayın.</p>
                    <div className="flex gap-4 justify-center mt-4">
                        <Button variant="outline" onClick={() => router.push('/odeme/basarili')}>Manuel Yönlendir</Button>
                        <Button variant="ghost" className="text-red-500 hover:text-red-400 hover:bg-red-500/10" onClick={() => router.push('/odeme')}>İptal Et</Button>
                    </div>
                </div>
            </div>
        </main>
    )
}
