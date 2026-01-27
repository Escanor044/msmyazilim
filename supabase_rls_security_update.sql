-- ============================================
-- RLS GÜVENLİK GÜNCELLEMESİ - TÜM TABLOLAR
-- ============================================
-- Bu script tüm tablolarda RLS politikalarını is_admin_user() fonksiyonu ile günceller
-- ÖNEMLİ: Bu script'i çalıştırmadan önce Supabase Dashboard > Settings > API > Secrets'te
-- 'app.admin_email' secret'ını ayarlayın (değer: msmyazilim1@gmail.com)

-- ============================================
-- 1. is_admin_user() FONKSİYONU
-- ============================================

CREATE OR REPLACE FUNCTION is_admin_user()
RETURNS BOOLEAN AS $$
DECLARE
    user_email TEXT;
    admin_email TEXT := 'msmyazilim1@gmail.com'; -- Admin email (hardcoded - Server Actions ile aynı)
BEGIN
    -- Kullanıcının email'ini al
    user_email := (SELECT email FROM auth.users WHERE id = auth.uid());
    
    -- Eğer kullanıcı giriş yapmamışsa false döndür
    IF user_email IS NULL THEN
        RETURN false;
    END IF;
    
    -- Email kontrolü (case-insensitive)
    -- Not: Bu email Server Actions'taki NEXT_PUBLIC_ADMIN_EMAIL ile aynı olmalı
    RETURN LOWER(user_email) = LOWER(admin_email);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 2. PACKAGES TABLOSU GÜVENLİK GÜNCELLEMESİ
-- ============================================

-- Eski politikaları kaldır
DROP POLICY IF EXISTS "Packages are insertable by authenticated users" ON packages;
DROP POLICY IF EXISTS "Packages are updatable by authenticated users" ON packages;
DROP POLICY IF EXISTS "Packages are deletable by authenticated users" ON packages;
DROP POLICY IF EXISTS "Packages are insertable by admin only" ON packages;
DROP POLICY IF EXISTS "Packages are updatable by admin only" ON packages;
DROP POLICY IF EXISTS "Packages are deletable by admin only" ON packages;

-- Yeni güvenli politikalar
CREATE POLICY "Packages are insertable by admin only"
ON packages FOR INSERT
WITH CHECK (is_admin_user());

CREATE POLICY "Packages are updatable by admin only"
ON packages FOR UPDATE
USING (is_admin_user());

CREATE POLICY "Packages are deletable by admin only"
ON packages FOR DELETE
USING (is_admin_user());

-- ============================================
-- 3. SYSTEMS TABLOSU GÜVENLİK GÜNCELLEMESİ
-- ============================================

-- Eski politikaları kaldır
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
-- 4. SYSTEM_CATEGORIES TABLOSU GÜVENLİK GÜNCELLEMESİ
-- ============================================

-- Eski politikaları kaldır
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
-- 5. REFERENCES TABLOSU GÜVENLİK GÜNCELLEMESİ
-- ============================================

-- Eski politikaları kaldır
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
-- 6. SERVER_FILE_PACKAGES TABLOSU GÜVENLİK GÜNCELLEMESİ
-- ============================================

-- Eski politikaları kaldır
DROP POLICY IF EXISTS "Server file packages are insertable by authenticated users" ON server_file_packages;
DROP POLICY IF EXISTS "Server file packages are updatable by authenticated users" ON server_file_packages;
DROP POLICY IF EXISTS "Server file packages are deletable by authenticated users" ON server_file_packages;
DROP POLICY IF EXISTS "Server file packages are insertable by admin only" ON server_file_packages;
DROP POLICY IF EXISTS "Server file packages are updatable by admin only" ON server_file_packages;
DROP POLICY IF EXISTS "Server file packages are deletable by admin only" ON server_file_packages;

-- Yeni politikalar
CREATE POLICY "Server file packages are insertable by admin only"
ON server_file_packages FOR INSERT
WITH CHECK (is_admin_user());

CREATE POLICY "Server file packages are updatable by admin only"
ON server_file_packages FOR UPDATE
USING (is_admin_user());

CREATE POLICY "Server file packages are deletable by admin only"
ON server_file_packages FOR DELETE
USING (is_admin_user());

-- ============================================
-- 7. ABOUT_PAGE TABLOSU GÜVENLİK GÜNCELLEMESİ
-- ============================================

-- Eski politikaları kaldır
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

-- ============================================
-- 8. ABOUT_VALUES TABLOSU GÜVENLİK GÜNCELLEMESİ
-- ============================================

-- Eski politikaları kaldır
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

-- ============================================
-- 9. ABOUT_TEAM TABLOSU GÜVENLİK GÜNCELLEMESİ
-- ============================================

-- Eski politikaları kaldır
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
-- 10. LEGAL_PAGES TABLOSU GÜVENLİK GÜNCELLEMESİ
-- ============================================

-- Eski politikaları kaldır
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
-- TAMAMLANDI
-- ============================================
-- Tüm tablolarda RLS politikaları güncellendi.
-- Artık sadece is_admin_user() fonksiyonu true dönen kullanıcılar (yani admin email'i ile giriş yapan)
-- veritabanı yazma işlemleri yapabilir.
