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
        question: "Lisans işlemi nasıl oluyor?",
        answer: "Test sunucusu ile birlikte açılışta kullanacağınız ana makina IP adresinize lisans tanımlanır."
    },
    {
        question: "Lisans süresi ne kadar?",
        answer: "Teslim aldığınız pakete göre lisans süresi değişiklik gösterebilir. Lisans haklarınız paket koşulları kapsamında geçerlidir ve talep etmeniz halinde yenileme yapılabilir."
    },
    {
        question: "Sınırsız lisans mevcut mu?",
        answer: "Evet, ULTIMATE pakete özel olarak sınırsız lisans hakkı sunulmaktadır. Bu pakette standart yenileme ücreti uygulanmaz."
    },
    {
        question: "Lisans yenileme politikası nasıl işliyor?",
        answer: "ULTIMATE paket haricindeki paketlerde, farklı bir isimle yeni sunucu açmak istemeniz durumunda güncel paket fiyatının %35’i oranında lisans yenileme bedeli uygulanır."
    },
    {
        question: "Server Files ne zaman teslim edilir?",
        answer: "Ödeme onaylandıktan sonra kurulum süreci başlatılır ve genellikle aynı gün içerisinde teslimat gerçekleştirilir. Süre, yoğunluğa göre değişiklik gösterebilir."
    },
    {
        question: "Kurulum ücretli mi?",
        answer: "Hayır, tüm paketlerimizde ilk kurulum ücretsizdir ve sistem anahtar teslim şekilde sunulur."
    },
    {
        question: "Taksitli ödeme yapabilir miyim?",
        answer: "Evet, tüm kredi kartlarına 12 taksite varan vade seçenekleriyle ödeme yapabilirsiniz."
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
