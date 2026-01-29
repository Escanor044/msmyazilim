import { ShoppingCart, Crown, Rocket } from "lucide-react"

const steps = [
    {
        icon: ShoppingCart,
        title: "1. Paket Seçimi",
        description: "İhtiyacınıza uygun server files paketini ve sistemleri seçin."
    },
    {
        icon: Crown,
        title: "2. Güvenli Ödeme",
        description: "Faturalı şekilde hizmetinizi teslim alın."
    },
    {
        icon: Rocket,
        title: "3. Teslimat & Kurulum",
        description: "Ekibimiz sunucunuzu kursun, gerekli ayarları yapsın ve teslim etsin."
    }
]

export function Timeline() {
    return (
        <section className="py-24 relative">
            <div className="container-width">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Nasıl Çalışır?</h2>
                    <p className="text-muted-foreground">
                        3 adımda hayalinizdeki Metin2 sunucusuna sahip olun.
                    </p>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Connector Line */}
                    <div className="hidden md:block absolute top-[2.5rem] left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0" />

                    {steps.map((step, index) => (
                        <div key={index} className="relative flex flex-col items-center text-center group">
                            <div className="h-20 w-20 rounded-2xl bg-black border border-white/10 flex items-center justify-center relative z-10 mb-6 group-hover:border-primary/50 transition-colors shadow-2xl">
                                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <step.icon className="h-8 w-8 text-white relative z-10" />
                                <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-primary flex items-center justify-center font-bold text-white border-4 border-black">
                                    {index + 1}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground text-sm max-w-[250px]">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
