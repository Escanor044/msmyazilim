import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Server, Zap } from "lucide-react"

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
            {/* Background with gradients */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[128px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
            </div>

            <div className="container-width relative z-10">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-medium text-muted-foreground">Premium Metin2 Altyapısı</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                        Metin2 Server Files & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
                            Özel Sistem Çözümleri
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Tamamen optimize edilmiş server files, güncel sistemler, kurulum, bakım ve anti-cheat çözümleri ile projenizi güvenle başlatın.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" variant="premium" className="w-full sm:w-auto min-w-[180px]" asChild>
                            <Link href="https://wa.me/905550000000" target="_blank">WhatsApp / Discord'a Yaz</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[180px] glass" asChild>
                            <Link href="/files">Paketleri İncele</Link>
                        </Button>
                    </div>

                    <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-muted-foreground border-t border-white/5 mt-8">
                        <div className="flex items-center justify-center gap-2">
                            <Zap className="h-4 w-4 text-yellow-500" />
                            <span>Optimize Altyapı</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-primary" />
                            <span>Güvenlik Odaklı</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <Server className="h-4 w-4 text-green-500" />
                            <span>Süreç Şeffaf & Hızlı</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
