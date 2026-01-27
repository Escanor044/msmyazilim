-- ============================================
-- Packages Tablosu (Ana Sayfa Paket Seçenekleri)
-- ============================================
-- Bu tablo ana sayfadaki paket seçeneklerini yönetmek için kullanılır

-- Packages tablosunu oluştur
CREATE TABLE IF NOT EXISTS packages (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    price TEXT NOT NULL DEFAULT 'Teklif Alınız',
    features TEXT[] NOT NULL DEFAULT '{}',
    button_text TEXT NOT NULL DEFAULT 'Paket Detayı',
    link TEXT NOT NULL DEFAULT '/files',
    recommended BOOLEAN NOT NULL DEFAULT false,
    glow_color TEXT DEFAULT 'rgba(59, 130, 246, 0.5)',
    sort_order INTEGER NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index'ler
CREATE INDEX IF NOT EXISTS idx_packages_sort_order ON packages(sort_order);
CREATE INDEX IF NOT EXISTS idx_packages_active ON packages(active);

-- Trigger (updated_at otomatik güncelleme)
CREATE TRIGGER update_packages_updated_at
    BEFORE UPDATE ON packages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS Politikaları
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Packages are viewable by everyone"
ON packages FOR SELECT
USING (true);

CREATE POLICY "Packages are insertable by authenticated users"
ON packages FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Packages are updatable by authenticated users"
ON packages FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Packages are deletable by authenticated users"
ON packages FOR DELETE
USING (auth.role() = 'authenticated');

-- Örnek paketler (mevcut veriler)
INSERT INTO packages (title, description, price, features, button_text, link, recommended, glow_color, sort_order) VALUES
('STARTER', 'İlk adım için minimal kurulum.', 'Teklif Alınız', 
 ARRAY['Metin2 Temel Dosyalar', 'Kurulum Rehberi', '7 Gün Teknik Destek', 'Discord Destek'],
 'Paket Detayı', '/files', false, 'rgba(59, 130, 246, 0.5)', 1),

('BASIC', 'Başlangıç seviyesi projeler için ideal.', 'Teklif Alınız',
 ARRAY['Metin2 Altyapı Dosyaları', 'Temel Sistemler', 'Ücretsiz Kurulum', '1 Ay Teknik Destek', 'Saldırı Koruması (Basic)', 'Discord Rolü'],
 'Paket Detayı', '/files', false, 'rgba(59, 130, 246, 0.5)', 2),

('PRO', 'Büyüyen sunucular ve profesyonel yönetim.', 'Teklif Alınız',
 ARRAY['Her Şey Basic Pakette +', 'Gelişmiş Sistemler & UI', 'Performans Optimizasyonu', '3 Ay Teknik Destek', 'Gelişmiş Anti-Cheat', 'Özel Web Panel Teması', 'Haftalık Yedekleme'],
 'Satın Al', '/odeme?paket=pro', true, 'rgba(37, 99, 235, 0.8)', 3),

('PREMIUM', 'Büyük projeler ve kurumsal çözümler.', 'Teklif Alınız',
 ARRAY['Her Şey Pro Pakette +', 'VIP Sistemler & Özel Mapler', 'Source Dosyaları (Opsiyonel)', 'Sınırsız Teknik Destek', 'Premium Anti-Cheat & Koruma', 'Mobil Uygulama Entegrasyonu', 'Reklam Danışmanlığı', '7/24 Acil Durum Hattı'],
 'Satın Al', '/odeme?paket=premium', false, 'rgba(147, 51, 234, 0.5)', 4),

('BUSINESS', 'Kurumsal sunucular için tam çözüm.', 'Teklif Alınız',
 ARRAY['Her Şey Premium Pakette +', 'Özel Geliştirme', 'Öncelikli Destek', 'Özel Entegrasyonlar', 'Yedekleme & Monitoring', 'API Erişimi'],
 'Satın Al', '/odeme?paket=business', false, 'rgba(59, 130, 246, 0.5)', 5),

('ULTIMATE', 'En üst düzey paket, sınırsız imkânlar.', 'Teklif Alınız',
 ARRAY['Her Şey Business Pakette +', 'Tam Özelleştirme', '7/24 Özel Danışman', 'Kaynak Kod Hakları', 'Öncelikli Güncellemeler', 'Özel Eğitim & Dokümantasyon'],
 'Satın Al', '/odeme?paket=ultimate', false, 'rgba(59, 130, 246, 0.5)', 6)
ON CONFLICT DO NOTHING;
