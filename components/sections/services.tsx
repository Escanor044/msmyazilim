import Link from "next/link"
import { ArrowRight, Server, Shield, Wrench, Code2, Users, Database } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
    {
        icon: Server,
        title: "Server Files",
        description: "Tamamen optimize edilmiş, hatasız ve stabil Metin2 server altyapıları."
    },
    {
        icon: Code2,
        title: "Sistem Ekleme",
        description: "İstediğiniz özel sistemlerin sorunsuz entegrasyonu ve konfigürasyonu."
    },
    {
        icon: Wrench,
        title: "Kurulum & Bakım",
        description: "Anahtar teslim kurulum ve düzenli bakım hizmetleri ile kesintisiz oyun keyfi."
    },
    {
        icon: Shield,
        title: "Anti-Cheat & Güvenlik",
        description: "Hile koruması ve sunucu taraflı güvenlik önlemleri."
    },
    {
        icon: Database,
        title: "Veritabanı Optimizasyonu",
        description: "Lag ve donmaları önlemek için veritabanı performans iyileştirmeleri."
    },
    {
        icon: Users,
        title: "Danışmanlık",
        description: "Projeniz için doğru yol haritası ve teknik danışmanlık hizmeti."
    },
]

export function Services() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container-width relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Hizmetlerimiz</h2>
                    <p className="text-muted-foreground">
                        Oyun sunucunuz için ihtiyacınız olan tüm teknik çözümleri tek bir çatı altında sunuyoruz.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <div key={index} className="group relative p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                            <div className="relative z-10">
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <service.icon className="h-6 w-6" />
                                </div>

                                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                    {service.description}
                                </p>

                                <Link href="/files" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                                    Detaylar <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
