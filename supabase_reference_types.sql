-- ============================================
-- Reference Types Tablosu (Opsiyonel)
-- ============================================
-- Bu tablo referansları kategorize etmek için kullanılır
-- Eğer referanslar sayfasında tip yönetimi kullanıyorsanız bu script'i çalıştırın

-- Reference Types tablosunu oluştur
CREATE TABLE IF NOT EXISTS reference_types (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index'ler
CREATE INDEX IF NOT EXISTS idx_reference_types_slug ON reference_types(slug);
CREATE INDEX IF NOT EXISTS idx_reference_types_sort_order ON reference_types(sort_order);

-- RLS Politikaları
ALTER TABLE reference_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reference types are viewable by everyone"
ON reference_types FOR SELECT
USING (true);

CREATE POLICY "Reference types are insertable by authenticated users"
ON reference_types FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Reference types are updatable by authenticated users"
ON reference_types FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Reference types are deletable by authenticated users"
ON reference_types FOR DELETE
USING (auth.role() = 'authenticated');
