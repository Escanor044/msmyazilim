"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShieldCheck, CreditCard, Lock, Loader2 } from "lucide-react"

function CheckoutContent() {
    const searchParams = useSearchParams()
    const paket = searchParams.get('paket') || 'basic'

    const getPackageDetails = (p: string) => {
        switch (p) {
            case 'premium': return { name: "Premium Server Files", price: "45.000 ₺" }
            case 'pro': return { name: "Pro Server Files", price: "25.000 ₺" }
            default: return { name: "Basic Server Files", price: "12.500 ₺" }
        }
    }

    const details = getPackageDetails(paket)

    return (
        <main className="min-h-screen bg-background">
            <header className="border-b border-white/5 bg-black/20 backdrop-blur-sm">
                <div className="container-width h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <ShieldCheck className="h-8 w-8 text-primary" />
                        <span className="font-bold text-xl">MSM<span className="text-primary">Ödeme</span></span>
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                        <Lock className="h-3 w-3" />
                        Güvenli Ödeme Sayfası
                    </div>
                </div>
            </header>

            <div className="container-width py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left - Forms */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Step 1: Account */}
                        <div className="p-6 rounded-xl bg-card border border-white/5 space-y-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">1</span>
                                Hesap Bilgileri
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Input placeholder="Adınız" />
                                <Input placeholder="Soyadınız" />
                                <Input placeholder="E-Posta" type="email" />
                                <Input placeholder="Telefon" />
                            </div>
                        </div>

                        {/* Step 2: Billing */}
                        <div className="p-6 rounded-xl bg-card border border-white/5 space-y-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">2</span>
                                Fatura Bilgileri
                            </h2>
                            <div className="space-y-4">
                                <Input placeholder="TC Kimlik / Vergi No" />
                                <Input placeholder="Adres" />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input placeholder="İl" />
                                    <Input placeholder="İlçe" />
                                </div>
                            </div>
                        </div>

                        {/* Step 3: Payment Method */}
                        <div className="p-6 rounded-xl bg-card border border-white/5 space-y-4 opacity-75">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">3</span>
                                Ödeme Yöntemi
                            </h2>
                            <div className="p-4 rounded-lg bg-white/5 border border-primary/50 flex items-center justify-between cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <CreditCard className="h-6 w-6 text-primary" />
                                    <span className="font-semibold">Banka / Kredi Kartı (PayTR)</span>
                                </div>
                                <div className="h-4 w-4 rounded-full border-4 border-primary bg-background" />
                            </div>
                            <p className="text-xs text-muted-foreground ml-9">
                                &quot;Ödemeye Git&quot; butonuna tıkladığınızda PayTR güvenli ödeme sayfasına yönlendirileceksiniz.
                            </p>
                        </div>
                    </div>

                    {/* Right - Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <div className="p-6 rounded-xl bg-card border border-white/5 space-y-6">
                                <h3 className="font-bold text-lg border-b border-white/5 pb-4">Sipariş Özeti</h3>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">{details.name}</span>
                                        <span className="font-medium">{details.price}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Kurulum Hizmeti</span>
                                        <span className="font-medium text-green-500">Ücretsiz</span>
                                    </div>
                                </div>

                                <div className="border-t border-white/5 pt-4">
                                    <div className="flex justify-between items-center text-lg font-bold">
                                        <span>Toplam</span>
                                        <span>{details.price}</span>
                                    </div>
                                    <div className="text-xs text-right text-muted-foreground mt-1">+ KDV Dahil</div>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <div className="flex gap-2 items-start">
                                        <input type="checkbox" className="mt-1" id="terms" />
                                        <label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer select-none">
                                            <span className="text-primary hover:underline">Mesafeli Satış Sözleşmesi</span>&apos;ni okudum ve kabul ediyorum.
                                        </label>
                                    </div>
                                    <Button className="w-full h-12 text-lg" asChild>
                                        <Link href={`/odeme/paytr?paket=${paket}`}>Ödemeye Git</Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
                                {/* Mock logos */}
                                <div className="h-6 w-12 bg-white/10 rounded" />
                                <div className="h-6 w-12 bg-white/10 rounded" />
                                <div className="h-6 w-12 bg-white/10 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    )
}
