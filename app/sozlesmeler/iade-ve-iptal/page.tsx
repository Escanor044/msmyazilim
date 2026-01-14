import { LegalLayout } from "@/components/layout/legal-layout"

export default function RefundPolicy() {
    return (
        <LegalLayout
            title="İade ve İptal Koşulları"
            description="Ürün ve hizmetlerimizle ilgili iade ve iptal süreçleri hakkında bilgilendirme."
            lastUpdated="14 Ocak 2026"
        >
            <h3>1. Genel Bakış</h3>
            <p>
                MSM Yazılım olarak müşteri memnuniyetini ön planda tutmaktayız. Ancak, sunduğumuz hizmetlerin ve ürünlerin
                doğası gereği iade ve iptal koşullarımız belirli kurallara tabidir.
            </p>

            <h3>2. Dijital Ürünler ve Yazılımlar</h3>
            <p>
                Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallar
                (lisans anahtarları, indirilebilir yazılımlar, kaynak kodlar, scriptler vb.)
                <strong>Kesinlikle İade Edilemez</strong>.
            </p>
            <p>
                Bu tür ürünler, satın alındığı anda tüketiciye teslim edilmiş sayılır ve niteliği gereği iadesi mümkün değildir.
                Mesafeli Sözleşmeler Yönetmeliği'nin "Cayma Hakkı Kullanılamayacak Ürünler" maddesi kapsamındadır.
            </p>

            <h3>3. Hizmet İptali</h3>
            <p>
                Süreli hizmetlerde (örneğin sunucu kiralama, aylık bakım paketleri), hizmet süresi başlamadan önce yapılan
                iptal talepleri değerlendirilir ve uygun görülmesi durumunda kesinti yapılarak veya tam iade sağlanabilir.
                Ancak hizmet süresi başladıktan sonra yapılan iptal taleplerinde, kullanılmayan süre için ücret iadesi yapılmamaktadır.
            </p>

            <h3>4. Teknik Sorunlar ve Kusurlu Hizmet</h3>
            <p>
                Satın alınan yazılım veya hizmette bizden kaynaklı, giderilemeyen teknik bir sorun olması durumunda:
            </p>
            <ul>
                <li>Öncelikle sorunun giderilmesi için teknik destek sağlanır.</li>
                <li>Sorun makul bir süre içinde giderilemezse, iade talebi değerlendirmeye alınır.</li>
                <li>Kullanıcı hatası, üçüncü taraf eklentiler veya sunucu kaynaklı sorunlar iade kapsamı dışındadır.</li>
            </ul>

            <h3>5. İade Süreci</h3>
            <p>
                İade talebinizin onaylanması durumunda, ödemeniz satın alma işlemini gerçekleştirdiğiniz ödeme yöntemiyle
                (Kredi Kartı, Havale/EFT) tarafınıza iade edilir. İadelerin hesabınıza yansıması banka prosedürlerine göre
                7-14 iş günü sürebilir.
            </p>
        </LegalLayout>
    )
}
