-- ============================================
-- LEGAL PAGES (YASAL SAYFALAR) TABLOSU
-- ============================================
-- Yasal gereklilik sayfalarını yönetmek için

-- Yasal sayfalar tablosu
CREATE TABLE IF NOT EXISTS legal_pages (
    id BIGSERIAL PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE, -- 'gizlilik', 'kvkk', 'mesafeli-satis', 'iade-ve-iptal'
    title TEXT NOT NULL,
    description TEXT,
    content TEXT NOT NULL, -- HTML veya Markdown içerik
    last_updated DATE DEFAULT CURRENT_DATE,
    active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index'ler
CREATE INDEX IF NOT EXISTS idx_legal_pages_slug ON legal_pages(slug);
CREATE INDEX IF NOT EXISTS idx_legal_pages_active ON legal_pages(active);

-- Trigger: updated_at otomatik güncelleme
CREATE TRIGGER update_legal_pages_updated_at
    BEFORE UPDATE ON legal_pages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE legal_pages ENABLE ROW LEVEL SECURITY;

-- Herkes okuyabilir (public read)
CREATE POLICY "Legal pages are viewable by everyone"
    ON legal_pages
    FOR SELECT
    USING (true);

-- Sadece authenticated kullanıcılar yazabilir (admin panel için)
CREATE POLICY "Legal pages are insertable by authenticated users"
    ON legal_pages
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Legal pages are updatable by authenticated users"
    ON legal_pages
    FOR UPDATE
    USING (auth.role() = 'authenticated');

CREATE POLICY "Legal pages are deletable by authenticated users"
    ON legal_pages
    FOR DELETE
    USING (auth.role() = 'authenticated');

-- ============================================
-- BAŞLANGIÇ VERİLERİ
-- ============================================

-- Gizlilik Politikası
INSERT INTO legal_pages (slug, title, description, content, last_updated, active, sort_order)
VALUES (
    'gizlilik',
    'Gizlilik Politikası',
    'Kişisel verilerinizin güvenliği ve gizliliği bizim için önemlidir.',
    '<p>MSM Yazılım olarak, kullanıcılarımızın kişisel verilerinin korunmasına büyük önem vermekteyiz. Bu Gizlilik Politikası, sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda verilerinizin nasıl toplandığını, işlendiğini ve korunduğunu açıklamaktadır.</p>

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
<p>Kişisel verileriniz, yasal zorunluluklar saklı kalmak kaydıyla, üçüncü şahıslarla paylaşılmamaktadır. Ancak, ödeme işlemleri için anlaşmalı ödeme kuruluşları ve yasal makamların talebi üzerine yetkili mercilerle paylaşılabilir.</p>

<h3>4. Veri Güvenliği</h3>
<p>Verileriniz, uluslararası standartlara uygun güvenlik önlemleri ile korunmaktadır. Veri tabanlarımızda şifreleme yöntemleri kullanılmakta ve yetkisiz erişimlere karşı düzenli güvenlik taramaları yapılmaktadır.</p>

<h3>5. Çerezler (Cookies)</h3>
<p>Sitemiz, kullanıcı deneyimini iyileştirmek ve site trafiğini analiz etmek için çerezler kullanmaktadır. Tarayıcı ayarlarınızdan çerez tercihlerinizi dilediğiniz zaman değiştirebilirsiniz.</p>

<h3>6. İletişim</h3>
<p>Gizlilik politikamızla ilgili her türlü soru ve talebiniz için <a href="/iletisim">iletişim sayfamız</a> üzerinden bizimle irtibata geçebilirsiniz.</p>',
    CURRENT_DATE,
    true,
    1
) ON CONFLICT (slug) DO NOTHING;

-- KVKK Aydınlatma Metni
INSERT INTO legal_pages (slug, title, description, content, last_updated, active, sort_order)
VALUES (
    'kvkk',
    'KVKK Aydınlatma Metni',
    'Kişisel Verilerin Korunması Kanunu kapsamında haklarınız ve verilerinizin işlenmesi hakkında bilgilendirme.',
    '<p>MSM Yazılım olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verilerinizin güvenliği ve gizliliği konusunda azami hassasiyet göstermekteyiz. Veri Sorumlusu sıfatıyla, kişisel verilerinizi aşağıda açıklanan kapsamda işlemekteyiz.</p>

<h3>1. Veri Sorumlusu</h3>
<p>KVKK uyarınca, kişisel verileriniz; veri sorumlusu olarak MSM Yazılım tarafından aşağıda açıklanan kapsamda toplanacak ve işlenebilecektir.</p>

<h3>2. Kişisel Verilerin İşlenme Amacı</h3>
<p>Toplanan kişisel verileriniz;</p>
<ul>
    <li>Şirketimiz tarafından sunulan ürün ve hizmetlerden sizleri faydalandırmak için gerekli çalışmaların iş birimlerimiz tarafından yapılması,</li>
    <li>Şirketimiz ile iş ilişkisi içerisinde olan ilgili kişilerin hukuki ve ticari güvenliğinin temini,</li>
    <li>Şirketimizin ticari ve iş stratejilerinin belirlenmesi ve uygulanması,</li>
</ul>
<p>amaçlarıyla KVKK''nın 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları dahilinde işlenecektir.</p>

<h3>3. İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği</h3>
<p>Toplanan kişisel verileriniz; yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda, iş ortaklarımıza, tedarikçilerimize, kanunen yetkili kamu kurumlarına ve özel kişilere, KVKK''nın 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde aktarılabilecektir.</p>

<h3>4. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h3>
<p>Kişisel verileriniz, web sitemiz, mobil uygulamalarımız, çağrı merkezimiz vb. kanallar aracılığıyla elektronik ortamda toplanmaktadır. Bu hukuki sebeple toplanan kişisel verileriniz KVKK''nın 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları kapsamında işlenebilmektedir.</p>

<h3>5. Kişisel Veri Sahibinin Hakları</h3>
<p>KVKK''nın 11. maddesi uyarınca veri sahipleri olarak;</p>
<ul>
    <li>Kişisel veri işlenip işlenmediğini öğrenme,</li>
    <li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,</li>
    <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
    <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</li>
    <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,</li>
</ul>
<p>haklarına sahipsiniz. Bu haklarınızı kullanmak için iletişim kanallarımız üzerinden bize başvurabilirsiniz.</p>',
    CURRENT_DATE,
    true,
    2
) ON CONFLICT (slug) DO NOTHING;

-- Mesafeli Satış Sözleşmesi
INSERT INTO legal_pages (slug, title, description, content, last_updated, active, sort_order)
VALUES (
    'mesafeli-satis',
    'Mesafeli Satış Sözleşmesi',
    'Lütfen hizmet satın almadan önce bu sözleşmeyi dikkatlice okuyunuz.',
    '<h3>1. Taraflar</h3>
<p><strong>SATICI:</strong> MSM Yazılım (Bundan böyle "SATICI" olarak anılacaktır).<br />
<strong>ALICI:</strong> Web sitesi üzerinden hizmet satın alan kişi veya kurum (Bundan böyle "ALICI" olarak anılacaktır).</p>

<h3>2. Konu</h3>
<p>İşbu sözleşmenin konusu, ALICI''nın SATICI''ya ait web sitesi üzerinden elektronik ortamda siparişini yaptığı aşağıda nitelikleri ve satış fiyatı belirtilen ürünün/hizmetin satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.</p>

<h3>3. Sözleşme Konusu Ürün/Hizmet</h3>
<p>Hizmetin türü, miktarı, marka/modeli, rengi ve tüm vergiler dahil satış bedeli web sitesindeki ürün tanıtım sayfasında ve sipariş onay ekranında belirtildiği gibidir. Dijital ürünlerde teslimat, elektronik ortamda gerçekleşir.</p>

<h3>4. Genel Hükümler</h3>
<ul>
    <li><strong>4.1.</strong> ALICI, web sitesinde sözleşme konusu ürünün temel nitelikleri, satış fiyatı ve ödeme şekli ile teslimata ilişkin ön bilgileri okuyup bilgi sahibi olduğunu ve elektronik ortamda gerekli teyidi verdiğini beyan eder.</li>
    <li><strong>4.2.</strong> Sözleşme konusu ürün/hizmet, siparişin SATICI tarafından onaylanmasından sonra ALICI''nın bildirdiği e-posta adresine veya kullanıcı hesabına tanımlanır.</li>
    <li><strong>4.3.</strong> Dijital içerik ve yazılım ürünlerinde, ürünün tesliminden sonra ürünün iadesi veya iptali mümkün değildir (Cayma hakkı istisnaları kapsamında).</li>
</ul>

<h3>5. Cayma Hakkı</h3>
<p>Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallar (lisans, yazılım, kod vb.) için cayma hakkı bulunmamaktadır. ALICI, bu durumu bilerek satın alma işlemini gerçekleştirdiğini kabul eder.</p>

<h3>6. Uyuşmazlık Çözümü</h3>
<p>İşbu sözleşmeden doğabilecek ihtilaflarda, T.C. Ticaret Bakanlığınca ilan edilen değere kadar Tüketici Hakem Heyetleri, bu değerin üzerindeki ihtilaflarda ise Tüketici Mahkemeleri yetkilidir.</p>',
    CURRENT_DATE,
    true,
    3
) ON CONFLICT (slug) DO NOTHING;

-- İade ve İptal Koşulları
INSERT INTO legal_pages (slug, title, description, content, last_updated, active, sort_order)
VALUES (
    'iade-ve-iptal',
    'İade ve İptal Koşulları',
    'Ürün ve hizmetlerimizle ilgili iade ve iptal süreçleri hakkında bilgilendirme.',
    '<h3>1. Genel Bakış</h3>
<p>MSM Yazılım olarak müşteri memnuniyetini ön planda tutmaktayız. Ancak, sunduğumuz hizmetlerin ve ürünlerin doğası gereği iade ve iptal koşullarımız belirli kurallara tabidir.</p>

<h3>2. Dijital Ürünler ve Yazılımlar</h3>
<p>Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallar (lisans anahtarları, indirilebilir yazılımlar, kaynak kodlar, scriptler vb.) <strong>Kesinlikle İade Edilemez</strong>.</p>
<p>Bu tür ürünler, satın alındığı anda tüketiciye teslim edilmiş sayılır ve niteliği gereği iadesi mümkün değildir. Mesafeli Sözleşmeler Yönetmeliği''nin "Cayma Hakkı Kullanılamayacak Ürünler" maddesi kapsamındadır.</p>

<h3>3. Hizmet İptali</h3>
<p>Süreli hizmetlerde (örneğin sunucu kiralama, aylık bakım paketleri), hizmet süresi başlamadan önce yapılan iptal talepleri değerlendirilir ve uygun görülmesi durumunda kesinti yapılarak veya tam iade sağlanabilir. Ancak hizmet süresi başladıktan sonra yapılan iptal taleplerinde, kullanılmayan süre için ücret iadesi yapılmamaktadır.</p>

<h3>4. Teknik Sorunlar ve Kusurlu Hizmet</h3>
<p>Satın alınan yazılım veya hizmette bizden kaynaklı, giderilemeyen teknik bir sorun olması durumunda:</p>
<ul>
    <li>Öncelikle sorunun giderilmesi için teknik destek sağlanır.</li>
    <li>Sorun makul bir süre içinde giderilemezse, iade talebi değerlendirmeye alınır.</li>
    <li>Kullanıcı hatası, üçüncü taraf eklentiler veya sunucu kaynaklı sorunlar iade kapsamı dışındadır.</li>
</ul>

<h3>5. İade Süreci</h3>
<p>İade talebinizin onaylanması durumunda, ödemeniz satın alma işlemini gerçekleştirdiğiniz ödeme yöntemiyle (Kredi Kartı, Havale/EFT) tarafınıza iade edilir. İadelerin hesabınıza yansıması banka prosedürlerine göre 7-14 iş günü sürebilir.</p>',
    CURRENT_DATE,
    true,
    4
) ON CONFLICT (slug) DO NOTHING;
