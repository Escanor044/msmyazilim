-- ============================================
-- GÜVENLİK GÜNCELLEMELERİ
-- ============================================
-- RLS politikalarını güçlendir - Sadece belirli admin email'i ile işlem yapılabilir

-- Admin email kontrolü için fonksiyon
CREATE OR REPLACE FUNCTION is_admin_user()
RETURNS BOOLEAN AS $$
DECLARE
    user_email TEXT;
    admin_email TEXT;
BEGIN
    -- Kullanıcının email'ini al
    user_email := (SELECT email FROM auth.users WHERE id = auth.uid());
    
    -- Environment variable'dan admin email'i al (Supabase'de secret olarak saklanmalı)
    -- Not: Bu değer Supabase Dashboard > Settings > API > Secrets'ten ayarlanmalı
    admin_email := current_setting('app.admin_email', true);
    
    -- Eğer secret ayarlanmamışsa, tüm authenticated kullanıcılara izin ver (geriye dönük uyumluluk)
    IF admin_email IS NULL OR admin_email = '' THEN
        RETURN auth.role() = 'authenticated';
    END IF;
    
    -- Email kontrolü (case-insensitive)
    RETURN user_email IS NOT NULL AND LOWER(user_email) = LOWER(admin_email);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- SYSTEMS TABLOSU GÜVENLİK GÜNCELLEMESİ
-- ============================================

-- Mevcut politikaları kaldır (hem eski hem yeni)
DROP POLICY IF EXISTS "Systems are insertable by authenticated users" ON systems;
DROP POLICY IF EXISTS "Systems are updatable by authenticated users" ON systems;
DROP POLICY IF EXISTS "Systems are deletable by authenticated users" ON systems;
DROP POLICY IF EXISTS "Systems are insertable by admin only" ON systems;
DROP POLICY IF EXISTS "Systems are updatable by admin only" ON systems;
DROP POLICY IF EXISTS "Systems are deletable by admin only" ON systems;

-- Yeni güvenli politikalar
CREATE POLICY "Systems are insertable by admin only"
ON systems FOR INSERT
WITH CHECK (is_admin_user());

CREATE POLICY "Systems are updatable by admin only"
ON systems FOR UPDATE
USING (is_admin_user());

CREATE POLICY "Systems are deletable by admin only"
ON systems FOR DELETE
USING (is_admin_user());

-- ============================================
-- SYSTEM_CATEGORIES TABLOSU GÜVENLİK GÜNCELLEMESİ
-- ============================================

-- Mevcut politikaları kaldır (hem eski hem yeni)
DROP POLICY IF EXISTS "Categories are insertable by authenticated users" ON system_categories;
DROP POLICY IF EXISTS "Categories are updatable by authenticated users" ON system_categories;
DROP POLICY IF EXISTS "Categories are deletable by authenticated users" ON system_categories;
DROP POLICY IF EXISTS "Categories are insertable by admin only" ON system_categories;
DROP POLICY IF EXISTS "Categories are updatable by admin only" ON system_categories;
DROP POLICY IF EXISTS "Categories are deletable by admin only" ON system_categories;

-- Yeni politikalar
CREATE POLICY "Categories are insertable by admin only"
ON system_categories FOR INSERT
WITH CHECK (is_admin_user());

CREATE POLICY "Categories are updatable by admin only"
ON system_categories FOR UPDATE
USING (is_admin_user());

CREATE POLICY "Categories are deletable by admin only"
ON system_categories FOR DELETE
USING (is_admin_user());

-- ============================================
-- REFERENCES TABLOSU GÜVENLİK GÜNCELLEMESİ
-- ============================================

-- Mevcut politikaları kaldır (hem eski hem yeni)
DROP POLICY IF EXISTS "References are insertable by authenticated users" ON "references";
DROP POLICY IF EXISTS "References are updatable by authenticated users" ON "references";
DROP POLICY IF EXISTS "References are deletable by authenticated users" ON "references";
DROP POLICY IF EXISTS "References are insertable by admin only" ON "references";
DROP POLICY IF EXISTS "References are updatable by admin only" ON "references";
DROP POLICY IF EXISTS "References are deletable by admin only" ON "references";

-- Yeni politikalar
CREATE POLICY "References are insertable by admin only"
ON "references" FOR INSERT
WITH CHECK (is_admin_user());

CREATE POLICY "References are updatable by admin only"
ON "references" FOR UPDATE
USING (is_admin_user());

CREATE POLICY "References are deletable by admin only"
ON "references" FOR DELETE
USING (is_admin_user());

-- ============================================
-- PACKAGES TABLOSU GÜVENLİK GÜNCELLEMESİ
-- ============================================

-- Packages tablosu için RLS kontrolü
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'packages') THEN
        ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
        
        -- Mevcut politikaları kaldır
        DROP POLICY IF EXISTS "Packages are viewable by everyone" ON packages;
        DROP POLICY IF EXISTS "Packages are insertable by authenticated users" ON packages;
        DROP POLICY IF EXISTS "Packages are updatable by authenticated users" ON packages;
        DROP POLICY IF EXISTS "Packages are deletable by authenticated users" ON packages;
        DROP POLICY IF EXISTS "Packages are insertable by admin only" ON packages;
        DROP POLICY IF EXISTS "Packages are updatable by admin only" ON packages;
        DROP POLICY IF EXISTS "Packages are deletable by admin only" ON packages;
        
        -- Yeni politikalar
        CREATE POLICY "Packages are viewable by everyone"
        ON packages FOR SELECT
        USING (true);
        
        CREATE POLICY "Packages are insertable by admin only"
        ON packages FOR INSERT
        WITH CHECK (is_admin_user());
        
        CREATE POLICY "Packages are updatable by admin only"
        ON packages FOR UPDATE
        USING (is_admin_user());
        
        CREATE POLICY "Packages are deletable by admin only"
        ON packages FOR DELETE
        USING (is_admin_user());
    END IF;
END $$;

-- ============================================
-- SERVER_FILE_PACKAGES TABLOSU GÜVENLİK GÜNCELLEMESİ
-- ============================================

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'server_file_packages') THEN
        ALTER TABLE server_file_packages ENABLE ROW LEVEL SECURITY;
        
        -- Mevcut tüm politikaları kaldır
        DROP POLICY IF EXISTS "Server file packages are viewable by everyone" ON server_file_packages;
        DROP POLICY IF EXISTS "Server file packages are insertable by authenticated users" ON server_file_packages;
        DROP POLICY IF EXISTS "Server file packages are updatable by authenticated users" ON server_file_packages;
        DROP POLICY IF EXISTS "Server file packages are deletable by authenticated users" ON server_file_packages;
        DROP POLICY IF EXISTS "Server file packages are insertable by admin only" ON server_file_packages;
        DROP POLICY IF EXISTS "Server file packages are updatable by admin only" ON server_file_packages;
        DROP POLICY IF EXISTS "Server file packages are deletable by admin only" ON server_file_packages;
        
        -- Yeni politikalar
        CREATE POLICY "Server file packages are viewable by everyone"
        ON server_file_packages FOR SELECT
        USING (true);
        
        CREATE POLICY "Server file packages are insertable by admin only"
        ON server_file_packages FOR INSERT
        WITH CHECK (is_admin_user());
        
        CREATE POLICY "Server file packages are updatable by admin only"
        ON server_file_packages FOR UPDATE
        USING (is_admin_user());
        
        CREATE POLICY "Server file packages are deletable by admin only"
        ON server_file_packages FOR DELETE
        USING (is_admin_user());
    END IF;
END $$;

-- ============================================
-- LEGAL_PAGES TABLOSU GÜVENLİK GÜNCELLEMESİ
-- ============================================

-- Mevcut politikaları kaldır (hem eski hem yeni)
DROP POLICY IF EXISTS "Legal pages are insertable by authenticated users" ON legal_pages;
DROP POLICY IF EXISTS "Legal pages are updatable by authenticated users" ON legal_pages;
DROP POLICY IF EXISTS "Legal pages are deletable by authenticated users" ON legal_pages;
DROP POLICY IF EXISTS "Legal pages are insertable by admin only" ON legal_pages;
DROP POLICY IF EXISTS "Legal pages are updatable by admin only" ON legal_pages;
DROP POLICY IF EXISTS "Legal pages are deletable by admin only" ON legal_pages;

-- Yeni politikalar
CREATE POLICY "Legal pages are insertable by admin only"
ON legal_pages FOR INSERT
WITH CHECK (is_admin_user());

CREATE POLICY "Legal pages are updatable by admin only"
ON legal_pages FOR UPDATE
USING (is_admin_user());

CREATE POLICY "Legal pages are deletable by admin only"
ON legal_pages FOR DELETE
USING (is_admin_user());

-- ============================================
-- ABOUT TABLOLARI GÜVENLİK GÜNCELLEMESİ
-- ============================================

-- About Page
-- Mevcut politikaları kaldır (hem eski hem yeni)
DROP POLICY IF EXISTS "About page is insertable by authenticated users" ON about_page;
DROP POLICY IF EXISTS "About page is updatable by authenticated users" ON about_page;
DROP POLICY IF EXISTS "About page is deletable by authenticated users" ON about_page;
DROP POLICY IF EXISTS "About page is insertable by admin only" ON about_page;
DROP POLICY IF EXISTS "About page is updatable by admin only" ON about_page;
DROP POLICY IF EXISTS "About page is deletable by admin only" ON about_page;

-- Yeni politikalar
CREATE POLICY "About page is insertable by admin only"
ON about_page FOR INSERT
WITH CHECK (is_admin_user());

CREATE POLICY "About page is updatable by admin only"
ON about_page FOR UPDATE
USING (is_admin_user());

CREATE POLICY "About page is deletable by admin only"
ON about_page FOR DELETE
USING (is_admin_user());

-- About Values
-- Mevcut politikaları kaldır (hem eski hem yeni)
DROP POLICY IF EXISTS "About values are insertable by authenticated users" ON about_values;
DROP POLICY IF EXISTS "About values are updatable by authenticated users" ON about_values;
DROP POLICY IF EXISTS "About values are deletable by authenticated users" ON about_values;
DROP POLICY IF EXISTS "About values are insertable by admin only" ON about_values;
DROP POLICY IF EXISTS "About values are updatable by admin only" ON about_values;
DROP POLICY IF EXISTS "About values are deletable by admin only" ON about_values;

-- Yeni politikalar
CREATE POLICY "About values are insertable by admin only"
ON about_values FOR INSERT
WITH CHECK (is_admin_user());

CREATE POLICY "About values are updatable by admin only"
ON about_values FOR UPDATE
USING (is_admin_user());

CREATE POLICY "About values are deletable by admin only"
ON about_values FOR DELETE
USING (is_admin_user());

-- About Team
-- Mevcut politikaları kaldır (hem eski hem yeni)
DROP POLICY IF EXISTS "About team is insertable by authenticated users" ON about_team;
DROP POLICY IF EXISTS "About team is updatable by authenticated users" ON about_team;
DROP POLICY IF EXISTS "About team is deletable by authenticated users" ON about_team;
DROP POLICY IF EXISTS "About team is insertable by admin only" ON about_team;
DROP POLICY IF EXISTS "About team is updatable by admin only" ON about_team;
DROP POLICY IF EXISTS "About team is deletable by admin only" ON about_team;

-- Yeni politikalar
CREATE POLICY "About team is insertable by admin only"
ON about_team FOR INSERT
WITH CHECK (is_admin_user());

CREATE POLICY "About team is updatable by admin only"
ON about_team FOR UPDATE
USING (is_admin_user());

CREATE POLICY "About team is deletable by admin only"
ON about_team FOR DELETE
USING (is_admin_user());

-- ============================================
-- NOT: Supabase Dashboard'da Secret Ayarlama
-- ============================================
-- 1. Supabase Dashboard > Settings > API > Secrets
-- 2. "app.admin_email" adında bir secret ekleyin
-- 3. Değer olarak admin email adresinizi girin (örn: admin@msmyazilim.com)
-- 
-- Alternatif olarak, bu kontrolü client-side'da yapabilirsiniz
-- (şu anki implementasyon gibi)
