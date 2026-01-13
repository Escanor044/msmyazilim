import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <div className="container-width py-32 space-y-8 max-w-4xl">
                <h1 className="text-3xl font-bold">Gizlilik Politikası</h1>

                <div className="prose prose-invert max-w-none space-y-4">
                    <p>MSM Yazılım olarak kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz.</p>

                    <h3 className="text-xl font-semibold">1. Toplanan Veriler</h3>
                    <p>Sitemizi ziyaret ettiğinizde veya hizmet satın aldığınızda şu veriler toplanabilir:</p>
                    <ul className="list-disc pl-5">
                        <li>Ad, Soyad, E-posta, Telefon Numarası</li>
                        <li>IP Adresi ve Tarayıcı Bilgileri</li>
                        <li>Satın alma geçmişi</li>
                    </ul>

                    <h3 className="text-xl font-semibold">2. Verilerin Kullanımı</h3>
                    <p>Topladığımız veriler şu amaçlarla kullanılır:</p>
                    <ul className="list-disc pl-5">
                        <li>Hizmetlerin sağlanması ve faturalandırma</li>
                        <li>Müşteri desteği sağlama</li>
                        <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                    </ul>

                    <h3 className="text-xl font-semibold">3. Çerezler (Cookies)</h3>
                    <p>Sitemiz deneyiminizi iyileştirmek için çerezler kullanmaktadır. Tarayıcı ayarlarınızdan çerezleri yönetebilirsiniz.</p>
                </div>
            </div>
            <Footer />
        </main>
    )
}
