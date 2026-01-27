-- ============================================
-- SERVER FILE PACKAGES TABLOSU
-- ============================================
-- Server Files sayfasındaki paket kartlarını yönetmek için

-- Tabloyu oluştur
CREATE TABLE IF NOT EXISTS server_file_packages (
    id BIGSERIAL PRIMARY KEY,
    package_type TEXT NOT NULL UNIQUE, -- 'orta-emek', 'hard-emek', 'files-105'
    title TEXT NOT NULL, -- "1-99 ORTA EMEK"
    subtitle TEXT NOT NULL, -- "Teklif Alınız"
    features TEXT[] DEFAULT '{}', -- Özellikler listesi
    link TEXT NOT NULL, -- "/serverfiles/orta-emek"
    youtube_url TEXT, -- YouTube video URL (opsiyonel)
    badge_text TEXT, -- "POPÜLER", "GELİŞTİRME AŞAMASINDA" (opsiyonel)
    badge_color TEXT, -- "blue", "amber" (opsiyonel)
    active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Check constraint
ALTER TABLE server_file_packages 
ADD CONSTRAINT check_package_type 
CHECK (package_type IN ('orta-emek', 'hard-emek', 'files-105'));

-- Index'ler
CREATE INDEX IF NOT EXISTS idx_server_file_packages_type ON server_file_packages(package_type);
CREATE INDEX IF NOT EXISTS idx_server_file_packages_active ON server_file_packages(active);
CREATE INDEX IF NOT EXISTS idx_server_file_packages_sort ON server_file_packages(sort_order);

-- Trigger: updated_at otomatik güncelleme
CREATE TRIGGER update_server_file_packages_updated_at
    BEFORE UPDATE ON server_file_packages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- RLS'yi etkinleştir
ALTER TABLE server_file_packages ENABLE ROW LEVEL SECURITY;

-- Herkes okuyabilir (public read)
CREATE POLICY "Server file packages are viewable by everyone"
    ON server_file_packages
    FOR SELECT
    USING (true);

-- Sadece authenticated kullanıcılar yazabilir (admin panel için)
CREATE POLICY "Server file packages are insertable by authenticated users"
    ON server_file_packages
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Server file packages are updatable by authenticated users"
    ON server_file_packages
    FOR UPDATE
    USING (auth.role() = 'authenticated');

CREATE POLICY "Server file packages are deletable by authenticated users"
    ON server_file_packages
    FOR DELETE
    USING (auth.role() = 'authenticated');

-- ============================================
-- BAŞLANGIÇ VERİLERİ
-- ============================================

-- 1-99 Orta Emek
INSERT INTO server_file_packages (
    package_type,
    title,
    subtitle,
    features,
    link,
    youtube_url,
    badge_text,
    badge_color,
    active,
    sort_order
) VALUES (
    'orta-emek',
    '1-99 ORTA EMEK',
    'Teklif Alınız',
    ARRAY['Orta seviye zorluk', '1-99 seviye aralığı', 'Optimize edilmiş deneyim'],
    '/serverfiles/orta-emek',
    'https://www.youtube.com/embed/wEOz2Ua3a50',
    NULL,
    NULL,
    true,
    1
) ON CONFLICT (package_type) DO NOTHING;

-- 1-99 Hard Emek
INSERT INTO server_file_packages (
    package_type,
    title,
    subtitle,
    features,
    link,
    youtube_url,
    badge_text,
    badge_color,
    active,
    sort_order
) VALUES (
    'hard-emek',
    '1-99 HARD EMEK',
    'Teklif Alınız',
    ARRAY['Yüksek zorluk seviyesi', '1-99 seviye aralığı', 'Zorlu ve meydan okuyucu'],
    '/serverfiles/hard-emek',
    NULL,
    'POPÜLER',
    'blue',
    true,
    2
) ON CONFLICT (package_type) DO NOTHING;

-- 1-105 Files
INSERT INTO server_file_packages (
    package_type,
    title,
    subtitle,
    features,
    link,
    youtube_url,
    badge_text,
    badge_color,
    active,
    sort_order
) VALUES (
    'files-105',
    '1-105 FILES',
    'Teklif Alınız',
    ARRAY['Genişletilmiş seviye aralığı', '1-105 seviye aralığı', 'Kapsamlı içerik'],
    '/serverfiles/files-105',
    NULL,
    'GELİŞTİRME AŞAMASINDA',
    'amber',
    true,
    3
) ON CONFLICT (package_type) DO NOTHING;
