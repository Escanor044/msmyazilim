import Link from "next/link"
import { Check, Shield, Zap, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const packages = [
    {
        name: "BASIC",
        price: "Teklif Alınız",
        description: "Başlangıç seviyesi projeler için ideal.",
        features: [
            "Metin2 Altyapı Dosyaları",
            "Temel Sistemler",
            "Ücretsiz Kurulum",
            "1 Ay Teknik Destek",
            "Saldırı Koruması (Basic)",
            "Discord Rolü"
        ],
        cta: "Paket Detayı",
        link: "/files",
        popular: false
    },
    {
        name: "PRO",
        price: "Teklif Alınız",
        description: "Büyüyen sunucular ve profesyonel yönetim.",
        features: [
            "Her Şey Basic Pakette +",
            "Gelişmiş Sistemler & UI",
            "Performans Optimizasyonu",
            "3 Ay Teknik Destek",
            "Gelişmiş Anti-Cheat",
            "Özel Web Panel Teması",
            "Haftalık Yedekleme"
        ],
        cta: "Satın Al",
        link: "/odeme?paket=pro",
        popular: true
    },
    {
        name: "PREMIUM",
        price: "Teklif Alınız",
        description: "Büyük projeler ve kurumsal çözümler.",
        features: [
            "Her Şey Pro Pakette +",
            "VIP Sistemler & Özel Mapler",
            "Source Dosyaları (Opsiyonel)",
            "Sınırsız Teknik Destek",
            "Premium Anti-Cheat & Koruma",
            "Mobil Uygulama Entegrasyonu",
            "Reklam Danışmanlığı",
            "7/24 Acil Durum Hattı"
        ],
        cta: "Satın Al",
        link: "/odeme?paket=premium",
        popular: false
    }
]

export function Packages() {
    return (
        <section className="py-24 bg-black/20">
            <div className="container-width">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Paket Seçenekleri</h2>
                    <p className="text-muted-foreground">
                        Bütçenize ve ihtiyaçlarınıza uygun paketi seçin, sunucunuzu hemen kuralım.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packages.map((pkg, index) => (
                        <div
                            key={index}
                            className={`relative rounded-2xl p-8 border transition-all duration-300 ${pkg.popular
                                    ? "bg-primary/5 border-primary/50 shadow-2xl shadow-primary/10 scale-105 z-10"
                                    : "bg-white/5 border-white/5 hover:border-white/10"
                                }`}
                        >
                            {pkg.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-indigo-600 rounded-full text-xs font-bold text-white shadow-lg">
                                    EN ÇOK TERCİH EDİLEN
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-lg font-bold tracking-wide">{pkg.name}</h3>
                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className="text-3xl font-bold">{pkg.price}</span>
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">{pkg.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {pkg.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm">
                                        <div className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${pkg.popular ? "bg-primary text-white" : "bg-white/10 text-muted-foreground"
                                            }`}>
                                            <Check className="h-3 w-3" />
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className="w-full"
                                variant={pkg.popular ? "default" : "outline"}
                                asChild
                            >
                                <Link href={pkg.link}>{pkg.cta}</Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
