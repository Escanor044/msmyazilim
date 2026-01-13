import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqCategories = [
    {
        title: "Genel",
        questions: [
            { q: "Teslimat ne kadar sürer?", a: "Ödeme onaylandıktan sonra ortalama 2-6 saat içinde teslimat yapılır." },
            { q: "İade hakkım var mı?", a: "Dijital ürünlerde (files, lisans) yasal olarak iade hakkı bulunmamaktadır. Ancak teknik bir sorun yaşarsanız çözüm garantisi veriyoruz." },
        ]
    },
    {
        title: "Teknik & Kurulum",
        questions: [
            { q: "Kurulumu siz mi yapıyorsunuz?", a: "Evet, tüm paketlerimizde ilk kurulum ücretsiz ve anahtar teslimdir." },
            { q: "Sunucu gereksinimleri nelerdir?", a: "Minimum 4GB RAM, FreeBSD 13 ve SSD disk önerilmektedir." },
            { q: "Source dosyalarını veriyor musunuz?", a: "Sadece Premium pakette ve Full Source lisansı alındığında verilmektedir. Diğer paketlerde game/db lisanslı olarak teslim edilir." },
        ]
    },
    {
        title: "Ödeme & Güvenlik",
        questions: [
            { q: "Ödeme yöntemleri neler?", a: "Kredi kartı (PayTR), Havale/EFT ve Kripto para ile ödeme yapabilirsiniz." },
            { q: "PayTR güvenli mi?", a: "Evet, PayTR BDDK lisanslı bir ödeme kuruluşudur ve 3D Secure ile korunmaktadır." },
            { q: "Fatura kesiyor musunuz?", a: "Evet, tüm işlemleriniz için kurumsal e-fatura kesilmektedir." },
        ]
    }
]

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-background">
            <Header />

            <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-transparent border-b border-white/5">
                <div className="container-width text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Sıkça Sorulan Sorular</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Aklınıza takılan tüm soruların cevapları burada.
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="container-width max-w-3xl">
                    <div className="space-y-12">
                        {faqCategories.map((category, idx) => (
                            <div key={idx}>
                                <h2 className="text-2xl font-bold mb-6 border-l-4 border-primary pl-4">{category.title}</h2>
                                <Accordion type="single" collapsible className="w-full">
                                    {category.questions.map((item, i) => (
                                        <AccordionItem key={i} value={`item-${idx}-${i}`}>
                                            <AccordionTrigger>{item.q}</AccordionTrigger>
                                            <AccordionContent>{item.a}</AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
