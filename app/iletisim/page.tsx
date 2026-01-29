import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-background">

            <section className="pt-32 pb-16 bg-gradient-to-b from-indigo-900/20 to-transparent border-b border-white/5">
                <div className="container-width text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">İletişim</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Projeleriniz için bizimle iletişime geçin. 7/24 destek hattımız aktif.
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="container-width">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Info */}
                        <div className="space-y-8">
                            <div className="glass-card p-6 rounded-2xl flex items-start gap-4">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <MessageSquare className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-1">WhatsApp / Discord</h3>
                                    <p className="text-muted-foreground mb-4">En hızlı iletişim kanallarımız.</p>
                                    <Button variant="outline" className="mr-2" asChild>
                                        <Link href="https://wa.me/905551404633" target="_blank">WhatsApp</Link>
                                    </Button>
                                    <Button variant="outline">Discord</Button>
                                </div>
                            </div>

                            <div className="glass-card p-6 rounded-2xl flex items-start gap-4">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-1">E-Posta</h3>
                                    <p className="text-muted-foreground">msmyazilim1@gmail.com</p>
                                </div>
                            </div>

                            <div className="glass-card p-6 rounded-2xl bg-gradient-to-br from-indigo-900/20 to-primary/5 border border-primary/20">
                                <h3 className="font-bold text-lg mb-4 text-primary">İlk Mesajda Belirtmeniz Gerekenler</h3>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>• İlgilendiğiniz paket veya hizmet</li>
                                    <li>• Mevcut bütçeniz (opsiyonel)</li>
                                    <li>• Projenizin tahmini açılış tarihi</li>
                                    <li>• Özel istekleriniz (varsa)</li>
                                </ul>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="glass-card p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold mb-6">Bize Yazın</h2>
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Adınız</label>
                                        <Input placeholder="Adınız Soyadınız" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Telefon</label>
                                        <Input placeholder="0555..." />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">E-Posta</label>
                                    <Input type="email" placeholder="ornek@mail.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Konu</label>
                                    <select className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                        <option>Genel Bilgi</option>
                                        <option>Satış / Teklif</option>
                                        <option>Teknik Destek</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Mesajınız</label>
                                    <textarea
                                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Mesajınızı buraya yazın..."
                                    />
                                </div>
                                <Button className="w-full opacity-50 cursor-not-allowed" size="lg" disabled> Gönder </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    )
}
