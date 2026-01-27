# Deployment Talimatları (Proje Sahibi İçin)

## 📋 Ön Gereksinimler

1. GitHub hesabı
2. Vercel hesabı (ücretsiz: https://vercel.com)
3. Git kurulu olmalı
4. Node.js kurulu olmalı (v18 veya üzeri)

---

## 🔧 Adım 1: Repository'yi Clone Etme

```bash
# Projeyi bilgisayarına indir
git clone https://github.com/Escanor044/msmyazilim.git

# Proje klasörüne gir
cd msmyazilim

# Son değişiklikleri çek
git pull origin main
```

---

## 🔐 Adım 2: Environment Variables Ayarlama

`.env.local` dosyası oluştur ve aşağıdaki bilgileri ekle:

```bash
# .env.local dosyası oluştur
# Windows: type nul > .env.local
# Mac/Linux: touch .env.local
```

`.env.local` dosyasına şunları ekle:

```env
NEXT_PUBLIC_SUPABASE_URL=https://rgqhpybnzrinwwmpptfk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJncWhweWJuenJpbnd3bXBwdGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0NjQ0MjksImV4cCI6MjA4NTA0MDQyOX0.N597Od5XohRCH4fzlAfym48fD-mD81gSxqUWuo6uEo0

# Admin Panel Security - Sadece bu email adresi ile admin panele giriş yapılabilir
NEXT_PUBLIC_ADMIN_EMAIL=msmyazilim1@gmail.com
```

**ÖNEMLİ:** `NEXT_PUBLIC_ADMIN_EMAIL` değerini kendi admin email adresinizle değiştirin!

---

## 📦 Adım 3: Bağımlılıkları Yükleme

```bash
# NPM paketlerini yükle
npm install
```

---

## 🚀 Adım 4: Vercel'e Deploy Etme

### Yöntem 1: Vercel Dashboard Üzerinden (Önerilen)

1. **Vercel'e Git:** https://vercel.com
2. **GitHub ile Giriş Yap**
3. **"Add New Project"** butonuna tıkla
4. **Repository Seç:** `Escanor044/msmyazilim` repository'sini seç
5. **Project Settings:**
   - Framework Preset: **Next.js** (otomatik algılanır)
   - Root Directory: `./` (boş bırak)
   - Build Command: `npm run build` (otomatik)
   - Output Directory: `.next` (otomatik)
6. **Environment Variables Ekle:**
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://rgqhpybnzrinwwmpptfk.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJncWhweWJuenJpbnd3bXBwdGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0NjQ0MjksImV4cCI6MjA4NTA0MDQyOX0.N597Od5XohRCH4fzlAfym48fD-mD81gSxqUWuo6uEo0`
   - `NEXT_PUBLIC_ADMIN_EMAIL` = `msmyazilim1@gmail.com` (kendi email'inizle değiştirin)
7. **"Deploy"** butonuna tıkla

### Yöntem 2: Vercel CLI ile

```bash
# Vercel CLI'yi global olarak yükle
npm install -g vercel

# Vercel'e login ol
vercel login

# Projeyi deploy et
vercel

# Production'a deploy et
vercel --prod
```

---

## ✅ Adım 5: Supabase SQL Script'lerini Çalıştırma

1. **Supabase Dashboard'a Git:** https://supabase.com/dashboard
2. **Projenizi Seçin**
3. **SQL Editor'e Git** (Sol menüden)
4. **Aşağıdaki SQL dosyalarını sırayla çalıştır:**

   - `supabase_security_update.sql` (ÖNEMLİ - Güvenlik için)
   - `supabase_packages.sql`
   - `supabase_about.sql`
   - `supabase_server_file_packages.sql`
   - `supabase_legal_pages.sql`
   - `supabase_references_update.sql`

**Her SQL dosyasını çalıştırmak için:**
1. SQL Editor'de "New Query" butonuna tıkla
2. Dosya içeriğini kopyala-yapıştır
3. "Run" butonuna tıkla

---

## 🔄 Otomatik Deploy (GitHub Push Sonrası)

Vercel, GitHub repository'nize bağlandıktan sonra:
- Her `main` branch'e push yaptığınızda otomatik deploy yapar
- Pull Request oluşturduğunuzda preview deployment yapar

---

## 🐛 Sorun Giderme

### Build Hatası Alıyorsanız:

```bash
# Node modules'ı temizle ve yeniden yükle
rm -rf node_modules package-lock.json
npm install

# Build'i test et
npm run build
```

### Environment Variables Çalışmıyorsa:

- Vercel Dashboard > Project > Settings > Environment Variables
- Tüm environment variable'ların eklendiğinden emin olun
- Production, Preview ve Development için ayrı ayrı eklenebilir

### Supabase Bağlantı Hatası:

- Supabase URL ve Anon Key'in doğru olduğundan emin olun
- Supabase Dashboard > Settings > API'den kontrol edin

---

## 📝 Önemli Notlar

1. **`.env.local` dosyası asla GitHub'a pushlanmamalı** (zaten `.gitignore`'da)
2. **Vercel'de environment variables mutlaka eklenmeli**
3. **Supabase SQL script'leri mutlaka çalıştırılmalı**
4. **Admin email'i production'da kendi email'inizle değiştirin**

---

## 🎯 Hızlı Başlangıç Komutları

```bash
# 1. Clone
git clone https://github.com/Escanor044/msmyazilim.git
cd msmyazilim

# 2. Environment variables oluştur (.env.local)
# (Yukarıdaki içeriği ekle)

# 3. Bağımlılıkları yükle
npm install

# 4. Local'de test et (opsiyonel)
npm run dev

# 5. Vercel'e deploy et
vercel --prod
```

---

## 📞 Destek

Sorun yaşarsanız:
1. Vercel Dashboard'daki build loglarını kontrol edin
2. Browser console'da hataları kontrol edin
3. Supabase Dashboard'da SQL hatalarını kontrol edin
