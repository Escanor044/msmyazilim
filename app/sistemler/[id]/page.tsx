"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { ArrowLeft, Smartphone, Check, Loader2, AlertCircle, Monitor, X } from "lucide-react"

interface System {
    id: number
    name: string
    category: string
    desc: string
    long_description: string
    features: string[]
    price: number | null
    image: string
    included: boolean
}

export default function SystemDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [system, setSystem] = useState<System | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchSystem = async () => {
            // params.id can be string or array, handle safely
            const id = Array.isArray(params.id) ? params.id[0] : params.id
            if (!id) return

            setLoading(true)
            const { data, error } = await supabase
                .from('systems')
                .select('*')
                .eq('id', id)
                .single()

            if (error) {
                console.error("Error fetching system:", error)
                setError("Sistem bulunamadı veya bir hata oluştu.")
            } else {
                setSystem(data)
            }
            setLoading(false)
        }

        fetchSystem()
    }, [params.id])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (error || !system) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4 text-center p-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <h1 className="text-2xl font-bold">Hata</h1>
                <p className="text-muted-foreground">{error || "Sistem bulunamadı."}</p>
                <Button variant="outline" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Geri Dön
                </Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground pt-32 pb-12 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="hover:bg-white/5 text-muted-foreground hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Geri Dön
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left: Image */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="relative aspect-video lg:aspect-square w-full rounded-xl overflow-hidden bg-black/40 border border-white/10 group shadow-lg cursor-pointer">
                                {system.image ? (
                                    <>
                                        <img
                                            src={system.image}
                                            alt={system.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="bg-black/80 text-white px-4 py-2 rounded-lg font-medium backdrop-blur-sm border border-white/10 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                                Büyütmek için tıklayın
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                        <Monitor className="h-24 w-24 opacity-20" />
                                    </div>
                                )}
                            </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-[95vw] max-h-[95vh] w-auto h-auto bg-transparent border-none p-0 shadow-none flex items-center justify-center outline-none" showCloseButton={false}>
                            <div className="relative w-auto h-auto flex items-center justify-center group/modal">
                                {system.image && (
                                    <>
                                        <img
                                            src={system.image}
                                            alt={system.name}
                                            className="max-w-[95vw] max-h-[95vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                                        />
                                        <DialogClose className="absolute -top-12 right-0 md:-right-12 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-200 border border-white/20 backdrop-blur-sm">
                                            <X className="h-6 w-6" />
                                            <span className="sr-only">Kapat</span>
                                        </DialogClose>
                                    </>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Right: Content */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                                    {system.name}
                                </h1>
                                {system.included ? (
                                    <span className="px-3 py-1 rounded text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/20 shadow-[0_0_10px_rgba(74,222,128,0.1)]">
                                        PAKETE DAHİL
                                    </span>
                                ) : (
                                    <span className="px-3 py-1 rounded text-xs font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.1)]">
                                        EKSTRA
                                    </span>
                                )}
                            </div>

                            {/* Short Description */}
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {system.desc}
                            </p>

                            {/* Long Description */}
                            <div className="mt-8 prose prose-invert max-w-none text-muted-foreground/80">
                                <p>{system.long_description}</p>
                            </div>
                        </div>

                        {/* Features List */}
                        {system.features && system.features.length > 0 && (
                            <div className="bg-[#111322] rounded-xl p-6 border border-white/5 shadow-inner">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Check className="h-5 w-5 text-primary" />
                                    Sistem Özellikleri
                                </h3>
                                <ul className="space-y-3">
                                    {system.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="pt-4">
                            <Button
                                asChild
                                size="lg"
                                className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold h-14 text-lg shadow-lg hover:shadow-[#25D366]/20 transition-all duration-300 rounded-xl"
                            >
                                <Link
                                    href={`https://wa.me/905551404633?text=${encodeURIComponent(`Merhaba, ${system.name} hakkında detaylı bilgi almak istiyorum.`)}`}
                                    target="_blank"
                                >
                                    <Smartphone className="h-5 w-5 mr-2" />
                                    WhatsApp İle Bilgi Al
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
