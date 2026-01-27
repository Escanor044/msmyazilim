-- ============================================
-- ABOUT PAGE (HAKKIMIZDA) TABLOSU
-- ============================================
-- Hakkımızda sayfası içeriğini yönetmek için

-- Ana içerik tablosu
CREATE TABLE IF NOT EXISTS about_page (
    id BIGSERIAL PRIMARY KEY,
    section_type TEXT NOT NULL UNIQUE, -- 'hero', 'mission', 'vision', 'story', 'cta'
    title TEXT,
    description TEXT,
    content TEXT, -- JSON veya uzun metin için
    active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Değerler tablosu
CREATE TABLE IF NOT EXISTS about_values (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT, -- Icon adı (ShieldCheck, Award, etc.)
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ekip üyeleri tablosu
CREATE TABLE IF NOT EXISTS about_team (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT, -- Icon adı (Code, Settings, etc.)
    image_url TEXT, -- Profil fotoğrafı (opsiyonel)
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index'ler
CREATE INDEX IF NOT EXISTS idx_about_page_type ON about_page(section_type);
CREATE INDEX IF NOT EXISTS idx_about_page_active ON about_page(active);
CREATE INDEX IF NOT EXISTS idx_about_values_sort ON about_values(sort_order);
CREATE INDEX IF NOT EXISTS idx_about_team_sort ON about_team(sort_order);

-- Trigger: updated_at otomatik güncelleme
CREATE TRIGGER update_about_page_updated_at
    BEFORE UPDATE ON about_page
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_about_values_updated_at
    BEFORE UPDATE ON about_values
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_about_team_updated_at
    BEFORE UPDATE ON about_team
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- About Page
ALTER TABLE about_page ENABLE ROW LEVEL SECURITY;

CREATE POLICY "About page is viewable by everyone"
    ON about_page
    FOR SELECT
    USING (true);

CREATE POLICY "About page is insertable by authenticated users"
    ON about_page
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "About page is updatable by authenticated users"
    ON about_page
    FOR UPDATE
    USING (auth.role() = 'authenticated');

CREATE POLICY "About page is deletable by authenticated users"
    ON about_page
    FOR DELETE
    USING (auth.role() = 'authenticated');

-- About Values
ALTER TABLE about_values ENABLE ROW LEVEL SECURITY;

CREATE POLICY "About values are viewable by everyone"
    ON about_values
    FOR SELECT
    USING (true);

CREATE POLICY "About values are insertable by authenticated users"
    ON about_values
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "About values are updatable by authenticated users"
    ON about_values
    FOR UPDATE
    USING (auth.role() = 'authenticated');

CREATE POLICY "About values are deletable by authenticated users"
    ON about_values
    FOR DELETE
    USING (auth.role() = 'authenticated');

-- About Team
ALTER TABLE about_team ENABLE ROW LEVEL SECURITY;

CREATE POLICY "About team is viewable by everyone"
    ON about_team
    FOR SELECT
    USING (true);

CREATE POLICY "About team is insertable by authenticated users"
    ON about_team
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "About team is updatable by authenticated users"
    ON about_team
    FOR UPDATE
    USING (auth.role() = 'authenticated');

CREATE POLICY "About team is deletable by authenticated users"
    ON about_team
    FOR DELETE
    USING (auth.role() = 'authenticated');

-- ============================================
-- BAŞLANGIÇ VERİLERİ
-- ============================================

-- Hero Section
INSERT INTO about_page (section_type, title, description, active, sort_order)
VALUES (
    'hero',
    'Hakkımızda',
    'Metin2 sunucu çözümlerinde uzmanlaşmış, kalite ve güvenilirlik odaklı bir ekibiz.',
    true,
    1
) ON CONFLICT (section_type) DO NOTHING;

-- Mission
INSERT INTO about_page (section_type, title, description, active, sort_order)
VALUES (
    'mission',
    'Misyonumuz',
    'Metin2 sunucu sahiplerine en kaliteli, güvenilir ve modern çözümleri sunarak, başarılı sunucular kurmalarına yardımcı olmak. Müşterilerimizin hayallerindeki sunucuya ulaşmaları için teknolojik yenilikleri ve deneyimimizi birleştiriyoruz.',
    true,
    2
) ON CONFLICT (section_type) DO NOTHING;

-- Vision
INSERT INTO about_page (section_type, title, description, active, sort_order)
VALUES (
    'vision',
    'Vizyonumuz',
    'Metin2 ekosisteminde öncü bir marka olmak ve sektördeki standartları yükseltmek. Sürekli gelişen teknolojilerle, müşterilerimize en iyi deneyimi sunarak sektörde referans noktası haline gelmek.',
    true,
    3
) ON CONFLICT (section_type) DO NOTHING;

-- Story (Hikayemiz - 3 paragraf)
INSERT INTO about_page (section_type, title, content, active, sort_order)
VALUES (
    'story',
    'Hikayemiz',
    'MSM Yazılım olarak, Metin2 sunucu ekosisteminde uzun yıllardır faaliyet gösteren deneyimli bir ekibiz. Başlangıçta küçük bir topluluk olarak başladığımız yolculuğumuz, zamanla sektörde tanınan ve güvenilen bir marka haline geldi.

Müşterilerimizin ihtiyaçlarını anlamak ve onlara en iyi çözümleri sunmak için sürekli çalışıyoruz. Her projede, her kurulumda ve her destek talebinde, müşteri memnuniyetini ön planda tutuyoruz.

Bugün, yüzlerce başarılı sunucuya imza atmış, binlerce mutlu müşteriye hizmet vermiş bir ekibiz. Ancak başarılarımızla yetinmiyor, her gün daha iyisini yapmak için çalışmaya devam ediyoruz.',
    true,
    4
) ON CONFLICT (section_type) DO NOTHING;

-- CTA Section
INSERT INTO about_page (section_type, title, description, content, active, sort_order)
VALUES (
    'cta',
    'Bizimle Çalışmaya Hazır mısınız?',
    'Hayalinizdeki Metin2 sunucusunu kurmak için bugün bizimle iletişime geçin. Uzman ekibimiz size yardımcı olmaya hazır.',
    '{"button1": {"text": "İletişime Geç", "link": "/iletisim"}, "button2": {"text": "Sistemlerimizi İncele", "link": "/sistemler"}}',
    true,
    5
) ON CONFLICT (section_type) DO NOTHING;

-- Değerler
INSERT INTO about_values (title, description, icon, sort_order, active) VALUES
('Güvenilirlik', 'Tüm hizmetlerimizde şeffaflık ve güvenilirlik ön plandadır. Müşterilerimizle kurduğumuz güven ilişkisi en değerli varlığımızdır.', 'ShieldCheck', 1, true),
('Kalite', 'Her projede en yüksek kalite standartlarını uygularız. Detaylara verdiğimiz önem, işimizin temel taşıdır.', 'Award', 2, true),
('Müşteri Odaklılık', 'Müşterilerimizin başarısı bizim başarımızdır. Her adımda müşteri memnuniyetini ön planda tutarız.', 'Users', 3, true),
('Yenilikçilik', 'Teknolojik gelişmeleri yakından takip eder, sektördeki yenilikleri hizmetlerimize entegre ederiz.', 'Zap', 4, true),
('Tutku', 'İşimize olan tutkumuz, her projede kendini gösterir. Metin2 dünyasına olan sevgimiz, çalışmalarımıza yansır.', 'Heart', 5, true),
('Sürekli Gelişim', 'Kendimizi sürekli geliştirir, müşteri geri bildirimlerini değerlendirerek hizmet kalitemizi artırırız.', 'Target', 6, true)
ON CONFLICT DO NOTHING;

-- Ekip Üyeleri
INSERT INTO about_team (name, role, description, icon, sort_order, active) VALUES
('Ahmet Yılmaz', 'Kurucu & Geliştirici', '10+ yıllık Metin2 geliştirme deneyimi. Sistem mimarisi ve optimizasyon konularında uzman.', 'Code', 1, true),
('Mehmet Demir', 'Teknik Lider', 'Sunucu kurulumları ve sistem yönetimi konusunda uzman. 8+ yıllık sektör deneyimi.', 'Settings', 2, true),
('Ayşe Kaya', 'Müşteri Destek Uzmanı', '7/24 müşteri desteği sağlıyor. Teknik sorunların çözümünde ve danışmanlıkta uzman.', 'Headphones', 3, true),
('Can Özkan', 'Backend Geliştirici', 'Veritabanı yönetimi ve API geliştirme konularında uzman. Performans optimizasyonu odaklı çalışıyor.', 'Code', 4, true),
('Fatma Şahin', 'UI/UX Tasarımcı', 'Kullanıcı deneyimi ve arayüz tasarımı konularında uzman. Modern ve kullanıcı dostu tasarımlar üretiyor.', 'Zap', 5, true),
('Emre Arslan', 'Güvenlik Uzmanı', 'Sunucu güvenliği ve anti-cheat sistemleri konusunda uzman. Güvenli ve stabil sunucular için çalışıyor.', 'ShieldCheck', 6, true)
ON CONFLICT DO NOTHING;
