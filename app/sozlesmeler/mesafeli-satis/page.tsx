import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function DistanceSalesAgreement() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <div className="container-width py-32 space-y-8 max-w-4xl">
                <h1 className="text-3xl font-bold">Mesafeli Satış Sözleşmesi</h1>

                <div className="prose prose-invert max-w-none space-y-4">
                    <p className="text-sm text-muted-foreground">Son Güncelleme: 14.01.2024</p>

                    <h3 className="text-xl font-semibold">1. TARAFLAR</h3>
                    <p>İşbu Sözleşme aşağıdaki taraflar arasında aşağıda belirtilen hüküm ve şartlar çerçevesinde imzalanmıştır.</p>
                    <p><strong>ALICI:</strong> (Sözleşmede bundan sonra "ALICI" olarak anılacaktır)</p>
                    <p><strong>SATICI:</strong> MSM Yazılım (Sözleşmede bundan sonra "SATICI" olarak anılacaktır)</p>

                    <h3 className="text-xl font-semibold">2. KONU</h3>
                    <p>İşbu sözleşmenin konusu, SATICI'nın, ALICI'ya satışını yaptığı, aşağıda nitelikleri ve satış fiyatı belirtilen ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.</p>

                    <h3 className="text-xl font-semibold">3. CAYMA HAKKI</h3>
                    <p className="text-red-400">ÖNEMLİ: Niteliği itibarıyla iade edilemeyecek ürünler, tek kullanımlık ürünler, kopyalanabilir yazılım ve programlar, hızlı bozulan veya son kullanım tarihi geçen ürünler için cayma hakkı kullanılamaz. Server Files ve Lisans hizmetleri bu kapsama girmektedir.</p>

                    <h3 className="text-xl font-semibold">4. GENEL HÜKÜMLER</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>ALICI, internet sitesinde sözleşme konusu ürünün temel nitelikleri, satış fiyatı ve ödeme şekli ile teslimata ilişkin ön bilgileri okuyup bilgi sahibi olduğunu ve elektronik ortamda gerekli teyidi verdiğini beyan eder.</li>
                        <li>Dijital ürün teslimatları, ödeme onayını takiben en geç 24 saat içinde ALICI'nın bildirdiği e-posta adresine veya üyelik hesabına yapılır.</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </main>
    )
}
