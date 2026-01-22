import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

const references = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    name: `Referans Sunucu ${i + 1}`,
    type: i % 2 === 0 ? "1-99 Oldschool" : "1-120 Newschool",
    online: Math.floor(Math.random() * 5000) + 500,
    tags: ["Files", "Koruma", "Sistem"]
}))

export default function ReferencesPage() {
    return (
        <main className="min-h-screen bg-background">
            <Header />

            <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-transparent border-b border-white/5">
                <div className="container-width text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Referanslarımız</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Bizi tercih eden yüzlerce mutlu müşteriden bazıları.
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="container-width grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {references.map((item) => (
                        <div key={item.id} className="group glass-card p-6 rounded-2xl flex flex-col gap-4">
                            <div className="h-40 w-full bg-black/40 rounded-lg flex items-center justify-center border border-white/5 group-hover:border-primary/50 transition-colors relative overflow-hidden">
                                {/* Placeholder for project image */}
                                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                                <span className="font-bold text-2xl text-white/20 group-hover:text-white/40 transition-colors">{item.name}</span>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-lg">{item.name}</h3>
                                    <span className="text-xs text-green-500 font-mono bg-green-500/10 px-2 py-1 rounded">+{item.online} Online</span>
                                </div>

                                <p className="text-sm text-muted-foreground">{item.type}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    )
}
