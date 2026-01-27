import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import { FilteredSystemsView } from "@/components/systems/filtered-systems-view"

export default function Files105Page() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-16">
            <div className="container-width max-w-7xl mx-auto">
                <Link href="/serverfiles" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Geri Dön</span>
                </Link>

                <Card className="glass-card p-8 md:p-12 rounded-3xl mb-8">
                    <div className="mb-8">
                        <span className="text-xs font-black tracking-[0.2em] text-blue-400 uppercase">
                            1-105 FILES
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-white mt-2 tracking-tight">
                            Teklif Alınız
                        </h1>
                        <p className="text-lg text-muted-foreground mt-4">
                            Genişletilmiş seviye aralığı sunan, kapsamlı içerik ile tasarlanmış server files paketi.
                        </p>
                    </div>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-4 text-white/90">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border border-blue-500/50 bg-blue-500/10">
                                <Check className="w-3 h-3 text-blue-400" strokeWidth={3} />
                            </div>
                            <span className="text-base font-medium">Genişletilmiş seviye aralığı</span>
                        </div>
                        <div className="flex items-center gap-4 text-white/90">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border border-blue-500/50 bg-blue-500/10">
                                <Check className="w-3 h-3 text-blue-400" strokeWidth={3} />
                            </div>
                            <span className="text-base font-medium">1-105 seviye aralığı</span>
                        </div>
                        <div className="flex items-center gap-4 text-white/90">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border border-blue-500/50 bg-blue-500/10">
                                <Check className="w-3 h-3 text-blue-400" strokeWidth={3} />
                            </div>
                            <span className="text-base font-medium">Kapsamlı içerik</span>
                        </div>
                    </div>

                    {/* YouTube Video Placeholder */}
                    <div className="aspect-video bg-zinc-800/50 rounded-lg border border-zinc-700/50 flex items-center justify-center mb-8">
                        <p className="text-sm text-muted-foreground">YouTube Video</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                            <Link href="/iletisim">Teklif Al</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/serverfiles">Tüm Paketler</Link>
                        </Button>
                    </div>
                </Card>

                {/* Paket Sistemleri */}
                <FilteredSystemsView packageType="files-105" />
            </div>
        </main>
    )
}
