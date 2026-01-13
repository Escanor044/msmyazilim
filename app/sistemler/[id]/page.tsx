
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { systems } from "@/lib/systems-data"
import Link from "next/link"
import { ArrowLeft, Check, Smartphone } from "lucide-react"

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function SystemDetailPage({ params }: PageProps) {
    const { id } = await params
    const system = systems.find(s => s.id === Number(id))

    if (!system) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Header />

            <div className="flex-1 pt-32 pb-16">
                <div className="container-width">
                    <Button variant="ghost" className="mb-8" asChild>
                        <Link href="/sistemler">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Geri Dön
                        </Link>
                    </Button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Image Section */}
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video lg:aspect-square bg-black/20">
                            {system.image && (
                                <img
                                    src={system.image}
                                    alt={system.name}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>

                        {/* Content Section */}
                        <div className="space-y-8">
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <h1 className="text-4xl font-bold">{system.name}</h1>
                                    {system.included ? (
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-500 border border-green-500/20">
                                            PAKETE DAHİL
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                                            EKSTRA
                                        </span>
                                    )}
                                </div>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    {system.desc}
                                </p>
                            </div>

                            <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <Check className="h-5 w-5 text-primary" />
                                    Sistem Özellikleri
                                </h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                                        Yüksek performanslı optimize kod yapısı
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                                        Sorunsuz ve bug-free garantisi
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                                        Kolay yapılandırılabilir ayarlar
                                    </li>
                                </ul>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="bg-[#25D366] hover:bg-[#25D366]/90 text-white gap-2" asChild>
                                    <Link href="https://wa.me/905551404633" target="_blank">
                                        <Smartphone className="h-5 w-5" />
                                        WhatsApp İle Bilgi Al
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
