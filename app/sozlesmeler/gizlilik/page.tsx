import { LegalLayout } from "@/components/layout/legal-layout"

export default function PrivacyPolicy() {
    return (
        <LegalLayout
            title="Gizlilik Politikası"
            description="Kişisel verilerinizin güvenliği ve gizliliği bizim için önemlidir."
            lastUpdated="14 Ocak 2026"
        >
            <p>
                MSM Yazılım olarak, kullanıcılarımızın kişisel verilerinin korunmasına büyük önem vermekteyiz.
                Bu Gizlilik Politikası, sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda verilerinizin
                nasıl toplandığını, işlendiğini ve korunduğunu açıklamaktadır.
            </p>

            <h3>1. Toplanan Veriler</h3>
            <p>Hizmetlerimizi sunabilmek adına aşağıdaki verileri toplayabiliriz:</p>
            <ul>
                <li><strong>Kimlik Bilgileri:</strong> Ad, soyad.</li>
                <li><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası.</li>
                <li><strong>İşlem Güvenliği Bilgileri:</strong> IP adresi, port bilgileri, web sitesi giriş-çıkış bilgileri.</li>
                <li><strong>Müşteri İşlem Bilgileri:</strong> Satın alınan ürün/hizmet detayları, talep ve şikayet bilgileri.</li>
            </ul>

            <h3>2. Verilerin Kullanım Amacı</h3>
            <p>Toplanan kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
            <ul>
                <li>Hizmetlerin sunulması, faturalandırma ve satış sonrası süreçlerin yürütülmesi.</li>
                <li>Müşteri destek hizmetlerinin sağlanması.</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi.</li>
                <li>Hizmet kalitesinin artırılması ve kullanıcı deneyiminin iyileştirilmesi.</li>
            </ul>

            <h3>3. Verilerin Paylaşımı</h3>
            <p>
                Kişisel verileriniz, yasal zorunluluklar saklı kalmak kaydıyla, üçüncü şahıslarla paylaşılmamaktadır.
                Ancak, ödeme işlemleri için anlaşmalı ödeme kuruluşları ve yasal makamların talebi üzerine yetkili
                mercilerle paylaşılabilir.
            </p>

            <h3>4. Veri Güvenliği</h3>
            <p>
                Verileriniz, uluslararası standartlara uygun güvenlik önlemleri ile korunmaktadır.
                Veri tabanlarımızda şifreleme yöntemleri kullanılmakta ve yetkisiz erişimlere karşı düzenli
                güvenlik taramaları yapılmaktadır.
            </p>

            <h3>5. Çerezler (Cookies)</h3>
            <p>
                Sitemiz, kullanıcı deneyimini iyileştirmek ve site trafiğini analiz etmek için çerezler kullanmaktadır.
                Tarayıcı ayarlarınızdan çerez tercihlerinizi dilediğiniz zaman değiştirebilirsiniz.
            </p>

            <h3>6. İletişim</h3>
            <p>
                Gizlilik politikamızla ilgili her türlü soru ve talebiniz için
                <a href="/iletisim"> iletişim sayfamız</a> üzerinden bizimle irtibata geçebilirsiniz.
            </p>
        </LegalLayout>
    )
}
