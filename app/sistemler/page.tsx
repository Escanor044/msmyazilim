import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SystemsView } from "@/components/systems/systems-view"

export default function SystemsPage() {
    return (
        <main className="min-h-screen bg-background">
            <Header />

            <section className="pt-32 pb-16 bg-gradient-to-b from-indigo-900/20 to-transparent border-b border-white/5">
                <div className="container-width text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Sistem Çözümleri</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Sunucunuzu rakiplerinizden ayıracak modern, performanslı ve oyuncu dostu sistemler.
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="container-width">
                    <SystemsView />
                </div>
            </section>

            <Footer />
        </main>
    )
}
