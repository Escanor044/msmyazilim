import Link from "next/link"
import { Button } from "@/components/ui/button"

export function FinalCTA() {
    return (
        <section className="py-24">
            <div className="container-width">
                <div className="rounded-3xl bg-gradient-to-br from-indigo-900/50 to-primary/50 border border-white/10 p-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                            Projenizi Başlatmaya Hazır mısınız?
                        </h2>
                        <p className="text-lg text-white/80 mb-8 leading-relaxed">
                            Binlerce oyuncuya ev sahipliği yapacak sunucunuzu bugün kurun. Teknik detaylarla vakit kaybetmeyin, oyun yönetimine odaklanın.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button size="lg" variant="secondary" className="w-full sm:w-auto font-bold" asChild>
                                <Link href="/iletişim">Bize Ulaşın</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white" asChild>
                                <Link href="/files">Paketleri İncele</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
