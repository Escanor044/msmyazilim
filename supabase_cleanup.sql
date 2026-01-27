-- ============================================
-- Supabase Veritabanı Temizleme Scripti
-- ============================================
-- DİKKAT: Bu script TÜM verileri siler!
-- Sadece tabloları baştan oluşturmak istediğinizde kullanın.
-- Supabase Dashboard → SQL Editor → New Query → Bu script'i yapıştırın → Run

-- ============================================
-- 1. TRIGGER'LARI SİL
-- ============================================

DROP TRIGGER IF EXISTS update_systems_updated_at ON systems;
DROP TRIGGER IF EXISTS update_references_updated_at ON "references";

-- ============================================
-- 2. FONKSİYONLARI SİL
-- ============================================

DROP FUNCTION IF EXISTS update_updated_at_column();

-- ============================================
-- 3. RLS POLİTİKALARINI SİL
-- ============================================

-- Systems tablosu politikaları
DROP POLICY IF EXISTS "Systems are viewable by everyone" ON systems;
DROP POLICY IF EXISTS "Systems are insertable by authenticated users" ON systems;
DROP POLICY IF EXISTS "Systems are updatable by authenticated users" ON systems;
DROP POLICY IF EXISTS "Systems are deletable by authenticated users" ON systems;

-- System Categories tablosu politikaları
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON system_categories;
DROP POLICY IF EXISTS "Categories are insertable by authenticated users" ON system_categories;
DROP POLICY IF EXISTS "Categories are updatable by authenticated users" ON system_categories;
DROP POLICY IF EXISTS "Categories are deletable by authenticated users" ON system_categories;

-- References tablosu politikaları
DROP POLICY IF EXISTS "References are viewable by everyone" ON "references";
DROP POLICY IF EXISTS "References are insertable by authenticated users" ON "references";
DROP POLICY IF EXISTS "References are updatable by authenticated users" ON "references";
DROP POLICY IF EXISTS "References are deletable by authenticated users" ON "references";

-- Storage politikaları
DROP POLICY IF EXISTS "Images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Images are uploadable by authenticated users" ON storage.objects;
DROP POLICY IF EXISTS "Images are deletable by authenticated users" ON storage.objects;

-- ============================================
-- 4. TABLOLARI SİL (CASCADE ile ilişkileri de siler)
-- ============================================

-- Önce foreign key'leri kontrol edip, varsa kaldır
-- Sonra tabloları sil

DROP TABLE IF EXISTS systems CASCADE;
DROP TABLE IF EXISTS system_categories CASCADE;
DROP TABLE IF EXISTS "references" CASCADE;

-- ============================================
-- 5. CONSTRAINT'LERİ SİL (Eğer tablolar silinmediyse)
-- ============================================

ALTER TABLE IF EXISTS systems DROP CONSTRAINT IF EXISTS check_package_type;

-- ============================================
-- ✅ TEMİZLEME TAMAMLANDI!
-- ============================================
-- Şimdi supabase_setup.sql script'ini çalıştırabilirsiniz.
