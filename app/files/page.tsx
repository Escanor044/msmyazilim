import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ComparisonTable } from "@/components/files/comparison-table"
import { Packages } from "@/components/sections/packages"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FilesPage() {
    return (
        <main className="min-h-screen bg-background">
            <Header />

            {/* Page Hero */}
            <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-transparent border-b border-white/5">
                <div className="container-width text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Server Files Paketleri</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        İster sıfırdan başlıyor olun, ister büyük bir kitleye hitap edin. Her seviyeye uygun optimize edilmiş files çözümleri.
                    </p>
                </div>
            </section>

            {/* Pricing Cards (Reused) */}
            <Packages />

            {/* Comparison Table */}
            <section className="py-24">
                <div className="container-width">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Detaylı Karşılaştırma</h2>
                        <p className="text-muted-foreground">
                            Paketler arasındaki farkları detaylıca inceleyin.
                        </p>
                    </div>
                    <ComparisonTable />
                </div>
            </section>

            {/* Delivery Process */}
            <section className="py-24 bg-black/20 border-y border-white/5">
                <div className="container-width">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Teslimat ve Kurulum Süreci</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center font-bold text-white shrink-0">1</div>
                                    <div>
                                        <h3 className="font-bold mb-1">Satın Alma</h3>
                                        <p className="text-sm text-muted-foreground">Web sitemizden paketinizi seçin ve güvenli ödeme ile sipariş oluşturun.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center font-bold text-white shrink-0">2</div>
                                    <div>
                                        <h3 className="font-bold mb-1">Bilgi Toplama</h3>
                                        <p className="text-sm text-muted-foreground">Ekibimiz sizinle iletişime geçerek sunucu adını ve tercih ettiğiniz yapılandırmaları alır.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center font-bold text-white shrink-0">3</div>
                                    <div>
                                        <h3 className="font-bold mb-1">Kurulum</h3>
                                        <p className="text-sm text-muted-foreground">Uzman ekibimiz files kurulumunu, veritabanı ayarlarını ve güvenlik optimizasyonlarını yapar.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center font-bold text-white shrink-0">4</div>
                                    <div>
                                        <h3 className="font-bold mb-1">Teslimat</h3>
                                        <p className="text-sm text-muted-foreground">Tüm giriş bilgileri tarafınıza iletilir ve test süreci başlar.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-900/20 to-primary/10 p-8 rounded-3xl border border-white/10">
                            <h3 className="font-bold text-xl mb-4">Sunucu Gereksinimleri</h3>
                            <ul className="space-y-3 text-sm text-muted-foreground mb-8">
                                <li>• Minimum 4GB RAM (8GB Önerilen)</li>
                                <li>• FreeBSD 12/13/14 işletim sistemi</li>
                                <li>• MariaDB 10.3+ veya MySQL 5.6+</li>
                                <li>• SSD Disk (Performans için şart)</li>
                            </ul>
                            <Button className="w-full" asChild>
                                <Link href="https://wa.me/905550000000">Sunucu Tavsiyesi Al</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
