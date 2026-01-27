# Supabase Veritabanı Şeması

Bu dokümantasyon, projenizde kullanılan Supabase tablolarının yapısını açıklar.

## 📊 Tablolar

### 1. `systems` - Sistemler Tablosu

Bu tablo, tüm sistemlerin bilgilerini içerir.

#### Alanlar (Columns)

| Alan Adı | Tip | Nullable | Açıklama |
|----------|-----|----------|----------|
| `id` | `bigint` (serial) | ❌ | Primary key, otomatik artan |
| `name` | `text` | ❌ | Sistem adı |
| `category` | `text` | ❌ | Kategori slug (system_categories tablosundan) |
| `desc` | `text` | ✅ | Kısa açıklama (başlık altı) |
| `long_description` | `text` | ✅ | Detaylı açıklama |
| `features` | `text[]` (array) | ✅ | Özellikler listesi (her satır bir özellik) |
| `price` | `numeric` | ✅ | Fiyat (opsiyonel) |
| `image` | `text` | ✅ | Görsel URL (Supabase Storage'dan) |
| `included` | `boolean` | ❌ | Pakete dahil mi? (default: false) |
| `package_type` | `text` | ✅ | **YENİ:** Server Files paketi (`orta-emek`, `hard-emek`, `files-105` veya `null`) |
| `created_at` | `timestamp` | ✅ | Oluşturulma tarihi (otomatik) |
| `updated_at` | `timestamp` | ✅ | Güncellenme tarihi (otomatik) |

#### SQL Oluşturma Komutu

```sql
-- Systems tablosunu oluştur
CREATE TABLE IF NOT EXISTS systems (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    desc TEXT,
    long_description TEXT,
    features TEXT[],
    price NUMERIC,
    image TEXT,
    included BOOLEAN NOT NULL DEFAULT false,
    package_type TEXT, -- 'orta-emek', 'hard-emek', 'files-105' veya NULL
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- package_type için check constraint (opsiyonel)
ALTER TABLE systems 
ADD CONSTRAINT check_package_type 
CHECK (package_type IS NULL OR package_type IN ('orta-emek', 'hard-emek', 'files-105'));

-- Index'ler
CREATE INDEX IF NOT EXISTS idx_systems_category ON systems(category);
CREATE INDEX IF NOT EXISTS idx_systems_package_type ON systems(package_type);
CREATE INDEX IF NOT EXISTS idx_systems_included ON systems(included);
```

#### Eğer tablo zaten varsa, sadece `package_type` alanını ekle:

```sql
-- package_type alanını ekle
ALTER TABLE systems 
ADD COLUMN IF NOT EXISTS package_type TEXT;

-- Check constraint ekle (opsiyonel)
ALTER TABLE systems 
ADD CONSTRAINT check_package_type 
CHECK (package_type IS NULL OR package_type IN ('orta-emek', 'hard-emek', 'files-105'));

-- Index ekle
CREATE INDEX IF NOT EXISTS idx_systems_package_type ON systems(package_type);
```

---

### 2. `system_categories` - Sistem Kategorileri Tablosu

Bu tablo, sistem kategorilerini içerir.

#### Alanlar (Columns)

| Alan Adı | Tip | Nullable | Açıklama |
|----------|-----|----------|----------|
| `id` | `bigint` (serial) | ❌ | Primary key, otomatik artan |
| `name` | `text` | ❌ | Kategori adı (örn: "PvP Sistemleri") |
| `slug` | `text` | ❌ | URL-friendly slug (örn: "pvp") |
| `sort_order` | `integer` | ❌ | Sıralama sırası (default: 0) |
| `created_at` | `timestamp` | ✅ | Oluşturulma tarihi (otomatik) |

#### SQL Oluşturma Komutu

```sql
-- System Categories tablosunu oluştur
CREATE TABLE IF NOT EXISTS system_categories (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index'ler
CREATE INDEX IF NOT EXISTS idx_system_categories_slug ON system_categories(slug);
CREATE INDEX IF NOT EXISTS idx_system_categories_sort_order ON system_categories(sort_order);
```

#### Örnek Veri Ekleme

```sql
-- Örnek kategoriler ekle
INSERT INTO system_categories (name, slug, sort_order) VALUES
('Tümü', 'all', 0),
('PvP Sistemleri', 'pvp', 1),
('PvM Sistemleri', 'pvm', 2),
('Yaşam Kalitesi', 'qol', 3),
('Admin Sistemleri', 'admin', 4),
('Etkinlik Sistemleri', 'event', 5),
('Ekonomi Sistemleri', 'economy', 6)
ON CONFLICT (slug) DO NOTHING;
```

---

### 3. `references` - Referanslar Tablosu

Bu tablo, referansları (müşteri yorumları, logolar vb.) içerir.

#### Alanlar (Columns)

| Alan Adı | Tip | Nullable | Açıklama |
|----------|-----|----------|----------|
| `id` | `bigint` (serial) | ❌ | Primary key, otomatik artan |
| `name` | `text` | ❌ | Referans adı (müşteri adı) |
| `logo` | `text` | ✅ | Logo URL (Supabase Storage'dan) |
| `description` | `text` | ✅ | Açıklama/yorum |
| `website` | `text` | ✅ | Website URL |
| `order` | `integer` | ✅ | Sıralama (default: 0) |
| `created_at` | `timestamp` | ✅ | Oluşturulma tarihi (otomatik) |
| `updated_at` | `timestamp` | ✅ | Güncellenme tarihi (otomatik) |

#### SQL Oluşturma Komutu

```sql
-- References tablosunu oluştur
CREATE TABLE IF NOT EXISTS references (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    logo TEXT,
    description TEXT,
    website TEXT,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index'ler
CREATE INDEX IF NOT EXISTS idx_references_order ON references("order");
```

---

## 🔐 Row Level Security (RLS) Politikaları

Supabase'de güvenlik için RLS politikaları ayarlamanız önerilir.

### Systems Tablosu için RLS

```sql
-- RLS'yi etkinleştir
ALTER TABLE systems ENABLE ROW LEVEL SECURITY;

-- Herkes okuyabilir (anon key)
CREATE POLICY "Systems are viewable by everyone"
ON systems FOR SELECT
USING (true);

-- Sadece authenticated kullanıcılar yazabilir (admin panel için)
CREATE POLICY "Systems are insertable by authenticated users"
ON systems FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Systems are updatable by authenticated users"
ON systems FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Systems are deletable by authenticated users"
ON systems FOR DELETE
USING (auth.role() = 'authenticated');
```

### System Categories Tablosu için RLS

```sql
-- RLS'yi etkinleştir
ALTER TABLE system_categories ENABLE ROW LEVEL SECURITY;

-- Herkes okuyabilir
CREATE POLICY "Categories are viewable by everyone"
ON system_categories FOR SELECT
USING (true);

-- Sadece authenticated kullanıcılar yazabilir
CREATE POLICY "Categories are insertable by authenticated users"
ON system_categories FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Categories are updatable by authenticated users"
ON system_categories FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Categories are deletable by authenticated users"
ON system_categories FOR DELETE
USING (auth.role() = 'authenticated');
```

### References Tablosu için RLS

```sql
-- RLS'yi etkinleştir
ALTER TABLE references ENABLE ROW LEVEL SECURITY;

-- Herkes okuyabilir
CREATE POLICY "References are viewable by everyone"
ON references FOR SELECT
USING (true);

-- Sadece authenticated kullanıcılar yazabilir
CREATE POLICY "References are insertable by authenticated users"
ON references FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "References are updatable by authenticated users"
ON references FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "References are deletable by authenticated users"
ON references FOR DELETE
USING (auth.role() = 'authenticated');
```

---

## 📦 Storage Bucket'ları

### `images` Bucket'ı

Sistem görselleri ve referans logoları için kullanılır.

#### Bucket Oluşturma

1. Supabase Dashboard → Storage → Create Bucket
2. Bucket Name: `images`
3. Public: ✅ (Herkes erişebilir)
4. File Size Limit: 5MB (veya istediğiniz limit)
5. Allowed MIME Types: `image/*`

#### Storage Politikaları

```sql
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
```

---

## 🔄 Trigger'lar (Otomatik Güncelleme)

### Updated_at Otomatik Güncelleme

```sql
-- Systems tablosu için
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_systems_updated_at
    BEFORE UPDATE ON systems
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- References tablosu için
CREATE TRIGGER update_references_updated_at
    BEFORE UPDATE ON references
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

---

## 📝 Örnek Veri Ekleme

### Sistem Ekleme

```sql
-- Örnek sistem ekle
INSERT INTO systems (
    name,
    category,
    desc,
    long_description,
    features,
    image,
    included,
    package_type
) VALUES (
    'Arena Sistemi',
    'pvp',
    'Oyuncular arası dövüş sistemi',
    'Detaylı arena sistemi açıklaması...',
    ARRAY['1v1 Dövüş', 'Turnuva Modu', 'Ödül Sistemi'],
    'https://your-supabase-url.supabase.co/storage/v1/object/public/images/arena.png',
    true,
    'orta-emek'
);
```

---

## ✅ Kontrol Listesi

Supabase kurulumunu tamamlamak için:

- [ ] `systems` tablosunu oluştur
- [ ] `package_type` alanını ekle (eğer tablo zaten varsa)
- [ ] `system_categories` tablosunu oluştur
- [ ] `references` tablosunu oluştur
- [ ] RLS politikalarını ayarla
- [ ] `images` storage bucket'ını oluştur
- [ ] Storage politikalarını ayarla
- [ ] Trigger'ları oluştur (updated_at için)
- [ ] Örnek kategoriler ekle
- [ ] Test verisi ekle

---

## 🆘 Sorun Giderme

### package_type alanı görünmüyor

```sql
-- Alanın var olup olmadığını kontrol et
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'systems' AND column_name = 'package_type';

-- Yoksa ekle
ALTER TABLE systems ADD COLUMN package_type TEXT;
```

### RLS hatası alıyorsunuz

RLS politikalarını kontrol edin veya geçici olarak devre dışı bırakın (sadece test için):

```sql
ALTER TABLE systems DISABLE ROW LEVEL SECURITY;
```

### Storage erişim hatası

Bucket'ın public olduğundan ve politikaların doğru ayarlandığından emin olun.

---

## 📚 Ek Kaynaklar

- [Supabase Dokümantasyonu](https://supabase.com/docs)
- [PostgreSQL Veri Tipleri](https://www.postgresql.org/docs/current/datatype.html)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
