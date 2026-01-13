import Link from "next/link"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

const faqs = [
    {
        question: "Server Files ne zaman teslim edilir?",
        answer: "Ödeme onaylandıktan sonra ortalama 2-6 saat içerisinde kurulum tamamlanır ve teslimat yapılır."
    },
    {
        question: "Kurulum ücretli mi?",
        answer: "Hayır, tüm paketlerimizde ilk kurulum tamamen ücretsizdir. Anahtar teslim olarak sunulur."
    },
    {
        question: "Teknik destek süreci nasıl işliyor?",
        answer: "Paket türüne göre 1-3 ay arası ücretsiz teknik destek sağlıyoruz. Destek taleplerinizi panel üzerinden veya Discord kanalımızdan iletebilirsiniz."
    },
    {
        question: "PayTR ile taksitli ödeme yapabilir miyim?",
        answer: "Evet, PayTR altyapısı sayesinde tüm kredi kartlarına 12 taksite varan vade seçenekleriyle ödeme yapabilirsiniz."
    },
]

export function FAQPreview() {
    return (
        <section className="py-24 bg-black/20">
            <div className="container-width">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Sıkça Sorulan Sorular</h2>
                        <p className="text-muted-foreground mb-8">
                            Aklınıza takılan soruların cevaplarını burada bulabilirsiniz. Daha fazlası için SSS sayfamızı ziyaret edin.
                        </p>
                        <Button variant="outline" asChild>
                            <Link href="/sss">Tüm Soruları Gör</Link>
                        </Button>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}
