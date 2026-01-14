import { LegalLayout } from "@/components/layout/legal-layout"

export default function DistanceSalesAgreement() {
    return (
        <LegalLayout
            title="Mesafeli Satış Sözleşmesi"
            description="Lütfen hizmet satın almadan önce bu sözleşmeyi dikkatlice okuyunuz."
            lastUpdated="14 Ocak 2026"
        >
            <h3>1. Taraflar</h3>
            <p>
                <strong>SATICI:</strong> MSM Yazılım (Bundan böyle "SATICI" olarak anılacaktır).<br />
                <strong>ALICI:</strong> Web sitesi üzerinden hizmet satın alan kişi veya kurum (Bundan böyle "ALICI" olarak anılacaktır).
            </p>

            <h3>2. Konu</h3>
            <p>
                İşbu sözleşmenin konusu, ALICI'nın SATICI'ya ait web sitesi üzerinden elektronik ortamda siparişini yaptığı
                aşağıda nitelikleri ve satış fiyatı belirtilen ürünün/hizmetin satışı ve teslimi ile ilgili olarak
                6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince
                tarafların hak ve yükümlülüklerinin saptanmasıdır.
            </p>

            <h3>3. Sözleşme Konusu Ürün/Hizmet</h3>
            <p>
                Hizmetin türü, miktarı, marka/modeli, rengi ve tüm vergiler dahil satış bedeli web sitesindeki
                ürün tanıtım sayfasında ve sipariş onay ekranında belirtildiği gibidir. Dijital ürünlerde teslimat,
                elektronik ortamda gerçekleşir.
            </p>

            <h3>4. Genel Hükümler</h3>
            <ul>
                <li>
                    <strong>4.1.</strong> ALICI, web sitesinde sözleşme konusu ürünün temel nitelikleri, satış fiyatı ve
                    ödeme şekli ile teslimata ilişkin ön bilgileri okuyup bilgi sahibi olduğunu ve elektronik ortamda
                    gerekli teyidi verdiğini beyan eder.
                </li>
                <li>
                    <strong>4.2.</strong> Sözleşme konusu ürün/hizmet, siparişin SATICI tarafından onaylanmasından sonra
                    ALICI'nın bildirdiği e-posta adresine veya kullanıcı hesabına tanımlanır.
                </li>
                <li>
                    <strong>4.3.</strong> Dijital içerik ve yazılım ürünlerinde, ürünün tesliminden sonra ürünün iadesi
                    veya iptali mümkün değildir (Cayma hakkı istisnaları kapsamında).
                </li>
            </ul>

            <h3>5. Cayma Hakkı</h3>
            <p>
                Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallar
                (lisans, yazılım, kod vb.) için cayma hakkı bulunmamaktadır. ALICI, bu durumu bilerek satın alma
                işlemini gerçekleştirdiğini kabul eder.
            </p>

            <h3>6. Uyuşmazlık Çözümü</h3>
            <p>
                İşbu sözleşmeden doğabilecek ihtilaflarda, T.C. Ticaret Bakanlığınca ilan edilen değere kadar Tüketici
                Hakem Heyetleri, bu değerin üzerindeki ihtilaflarda ise Tüketici Mahkemeleri yetkilidir.
            </p>
        </LegalLayout>
    )
}
