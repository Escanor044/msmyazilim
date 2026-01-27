-- ============================================
-- Supabase Veritabanı TAM KURULUM Scripti
-- ============================================
-- Bu script önce mevcut yapıyı temizler, sonra baştan oluşturur.
-- DİKKAT: TÜM VERİLER SİLİNECEK!
-- Supabase Dashboard → SQL Editor → New Query → Bu script'i yapıştırın → Run

-- ============================================
-- BÖLÜM 1: TEMİZLEME
-- ============================================

-- Önce tabloları sil (CASCADE ile trigger'lar ve policy'ler de silinir)
DROP TABLE IF EXISTS systems CASCADE;
DROP TABLE IF EXISTS system_categories CASCADE;
DROP TABLE IF EXISTS "references" CASCADE;

-- Fonksiyonları sil (tablolar silindikten sonra)
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Storage politikalarını sil (eğer varsa)
DROP POLICY IF EXISTS "Images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Images are uploadable by authenticated users" ON storage.objects;
DROP POLICY IF EXISTS "Images are deletable by authenticated users" ON storage.objects;

-- ============================================
-- BÖLÜM 2: TABLOLARI OLUŞTUR
-- ============================================

-- 1. SYSTEM_CATEGORIES TABLOSU
CREATE TABLE system_categories (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index'ler
CREATE INDEX idx_system_categories_slug ON system_categories(slug);
CREATE INDEX idx_system_categories_sort_order ON system_categories(sort_order);

-- Örnek kategoriler
INSERT INTO system_categories (name, slug, sort_order) VALUES
('Tümü', 'all', 0),
('PvP Sistemleri', 'pvp', 1),
('PvM Sistemleri', 'pvm', 2),
('Yaşam Kalitesi', 'qol', 3),
('Admin Sistemleri', 'admin', 4),
('Etkinlik Sistemleri', 'event', 5),
('Ekonomi Sistemleri', 'economy', 6);

-- 2. SYSTEMS TABLOSU
CREATE TABLE systems (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    "desc" TEXT,
    long_description TEXT,
    features TEXT[],
    price NUMERIC,
    image TEXT,
    included BOOLEAN NOT NULL DEFAULT false,
    package_type TEXT, -- 'orta-emek', 'hard-emek', 'files-105' veya NULL
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Check constraint (sadece belirtilen değerler kabul edilir)
ALTER TABLE systems 
ADD CONSTRAINT check_package_type 
CHECK (package_type IS NULL OR package_type IN ('orta-emek', 'hard-emek', 'files-105'));

-- Index'ler
CREATE INDEX idx_systems_category ON systems(category);
CREATE INDEX idx_systems_package_type ON systems(package_type);
CREATE INDEX idx_systems_included ON systems(included);

-- 3. REFERENCES TABLOSU
CREATE TABLE "references" (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    logo TEXT,
    description TEXT,
    website TEXT,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX idx_references_order ON "references"("order");

-- ============================================
-- BÖLÜM 3: TRIGGER'LAR
-- ============================================

-- Updated_at otomatik güncelleme fonksiyonu
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Systems tablosu için trigger
CREATE TRIGGER update_systems_updated_at
    BEFORE UPDATE ON systems
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- References tablosu için trigger
CREATE TRIGGER update_references_updated_at
    BEFORE UPDATE ON "references"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- BÖLÜM 4: ROW LEVEL SECURITY (RLS)
-- ============================================

-- Systems tablosu için RLS
ALTER TABLE systems ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Systems are viewable by everyone"
ON systems FOR SELECT
USING (true);

CREATE POLICY "Systems are insertable by authenticated users"
ON systems FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Systems are updatable by authenticated users"
ON systems FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Systems are deletable by authenticated users"
ON systems FOR DELETE
USING (auth.role() = 'authenticated');

-- System Categories tablosu için RLS
ALTER TABLE system_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
ON system_categories FOR SELECT
USING (true);

CREATE POLICY "Categories are insertable by authenticated users"
ON system_categories FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Categories are updatable by authenticated users"
ON system_categories FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Categories are deletable by authenticated users"
ON system_categories FOR DELETE
USING (auth.role() = 'authenticated');

-- References tablosu için RLS
ALTER TABLE "references" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "References are viewable by everyone"
ON "references" FOR SELECT
USING (true);

CREATE POLICY "References are insertable by authenticated users"
ON "references" FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "References are updatable by authenticated users"
ON "references" FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "References are deletable by authenticated users"
ON "references" FOR DELETE
USING (auth.role() = 'authenticated');

-- ============================================
-- BÖLÜM 5: STORAGE BUCKET POLİTİKALARI
-- ============================================
-- NOT: Storage bucket'ı manuel olarak oluşturmanız gerekiyor:
-- Supabase Dashboard → Storage → Create Bucket → Name: "images" → Public: ✅

-- Storage politikaları (bucket oluşturulduktan sonra çalıştırın)
-- Herkes okuyabilir 
CREATE POLICY "Images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Sadece authenticated kullanıcılar yükleyebilir
CREATE POLICY "Images are uploadable by authenticated users"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Sadece authenticated kullanıcılar silebilir
CREATE POLICY "Images are deletable by authenticated users"
ON storage.objects FOR DELETE
USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- ============================================
-- ✅ KURULUM TAMAMLANDI!
-- ============================================
-- Şimdi yapmanız gerekenler:
-- 1. Supabase Dashboard → Storage → Create Bucket → "images" (Public: ✅)
-- 2. Admin panelden sistem ekleyin
-- 3. Test verisi ekleyin (opsiyonel)
