-- ============================================
-- REFERENCES TABLOSU GÜNCELLEME
-- ============================================
-- Eksik alanları ekle

-- type alanını ekle (eğer yoksa)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'references' AND column_name = 'type'
    ) THEN
        ALTER TABLE "references" ADD COLUMN type TEXT;
    END IF;
END $$;

-- online_count alanını ekle (eğer yoksa)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'references' AND column_name = 'online_count'
    ) THEN
        ALTER TABLE "references" ADD COLUMN online_count INTEGER DEFAULT 0;
    END IF;
END $$;

-- image_url alanını ekle (eğer yoksa)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'references' AND column_name = 'image_url'
    ) THEN
        ALTER TABLE "references" ADD COLUMN image_url TEXT;
    END IF;
END $$;

-- Mevcut logo değerlerini image_url'e kopyala (eğer image_url boşsa)
UPDATE "references" 
SET image_url = logo 
WHERE image_url IS NULL AND logo IS NOT NULL;
