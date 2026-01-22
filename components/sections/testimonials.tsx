import { Star } from "lucide-react"

const testimonials = [
    {
        text: "MSM Yazılım ile çalışmak oyunumuzun kaderini değiştirdi. Files altyapısı çok sağlam ve teknik destek ekibi her an yanımızda.",
        author: "Ahmet Y.",
        role: "Astra2 Sahibi",
        rating: 5
    },
    {
        text: "Sistemlerin kurulumu ve yönetimi inanılmaz kolay. Özel olarak istediklerimizi de kısa sürede entegre ettiler. Kesinlikle tavsiye ederim.",
        author: "Mehmet K.",
        role: "LivaMt2 Yöneticisi",
        rating: 5
    },
    {
        text: "Daha önce farklı firmalarla çalıştım ama böylesine ilgili bir ekip görmedim. Sorunsuz bir açılış yaptık, teşekkürler MSM.",
        author: "Caner T.",
        role: "Rohan2 Kurucusu",
        rating: 5
    }
]

export function Testimonials() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container-width relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Müşteri Yorumları</h2>
                    <p className="text-muted-foreground">
                        Bizi tercih eden sunucu sahiplerinin deneyimleri.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div key={index} className="glass-card p-8 rounded-2xl relative">
                            <div className="flex gap-1 mb-6 text-yellow-500">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-current" />
                                ))}
                            </div>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                &quot;{item.text}&quot;
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                    {item.author[0]}
                                </div>
                                <div>
                                    <div className="font-bold">{item.author}</div>
                                    <div className="text-xs text-muted-foreground">{item.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
