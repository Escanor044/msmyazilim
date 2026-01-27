# Vercel Environment Variables Kurulumu

## 🚨 ÖNEMLİ: Build Hatası Çözümü

Vercel'de `supabaseUrl is required` hatası alıyorsanız, environment variable'ları eklemeniz gerekiyor.

---

## 📝 Adım Adım: Vercel'de Environment Variables Ekleme

### 1. Vercel Dashboard'a Giriş Yapın

1. https://vercel.com adresine gidin
2. GitHub hesabınızla giriş yapın

### 2. Projeyi Seçin

1. Dashboard'da `msmyazilim` projesini bulun
2. Projeye tıklayın

### 3. Settings'e Gidin

1. Üst menüden **"Settings"** sekmesine tıklayın
2. Sol menüden **"Environment Variables"** seçeneğine tıklayın

### 4. Environment Variables Ekleyin

Aşağıdaki 3 environment variable'ı sırayla ekleyin:

#### ✅ 1. NEXT_PUBLIC_SUPABASE_URL

- **Key:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://rgqhpybnzrinwwmpptfk.supabase.co`
- **Environment:** 
  - ✅ Production
  - ✅ Preview
  - ✅ Development
- **"Add"** butonuna tıklayın

#### ✅ 2. NEXT_PUBLIC_SUPABASE_ANON_KEY

- **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJncWhweWJuenJpbnd3bXBwdGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0NjQ0MjksImV4cCI6MjA4NTA0MDQyOX0.N597Od5XohRCH4fzlAfym48fD-mD81gSxqUWuo6uEo0`
- **Environment:**
  - ✅ Production
  - ✅ Preview
  - ✅ Development
- **"Add"** butonuna tıklayın

#### ✅ 3. NEXT_PUBLIC_ADMIN_EMAIL

- **Key:** `NEXT_PUBLIC_ADMIN_EMAIL`
- **Value:** `msmyazilim1@gmail.com` (Kendi admin email'inizle değiştirin!)
- **Environment:**
  - ✅ Production
  - ✅ Preview
  - ✅ Development
- **"Add"** butonuna tıklayın

---

## 🔄 Adım 5: Redeploy Yapın

Environment variable'ları ekledikten sonra:

1. **"Deployments"** sekmesine gidin
2. En son deployment'ın yanındaki **"..."** menüsüne tıklayın
3. **"Redeploy"** seçeneğini seçin
4. **"Redeploy"** butonuna tıklayın

Veya yeni bir commit push edin (otomatik deploy olur).

---

## ✅ Kontrol Listesi

Environment variable'ları ekledikten sonra kontrol edin:

- [ ] `NEXT_PUBLIC_SUPABASE_URL` eklendi mi?
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` eklendi mi?
- [ ] `NEXT_PUBLIC_ADMIN_EMAIL` eklendi mi?
- [ ] Her üçü de Production, Preview ve Development için işaretli mi?
- [ ] Redeploy yapıldı mı?

---

## 🎯 Hızlı Erişim

Vercel Dashboard > Proje > Settings > Environment Variables

**URL Formatı:**
```
https://vercel.com/[proje-adi]/settings/environment-variables
```

---

## 📸 Görsel Rehber

1. **Settings** sekmesi → **Environment Variables**
2. **"Add New"** butonuna tıklayın
3. Key ve Value'yu girin
4. Environment'ları seçin (Production, Preview, Development)
5. **"Add"** butonuna tıklayın
6. Tüm 3 variable'ı ekleyin
7. **Redeploy** yapın

---

## ⚠️ Önemli Notlar

1. **`NEXT_PUBLIC_` prefix'i önemli!** Bu prefix olmadan client-side'da kullanılamaz.
2. **Her environment için ayrı ayrı eklenebilir** (Production, Preview, Development)
3. **Value'ları doğru kopyalayın** (boşluk, satır sonu olmamalı)
4. **Redeploy yapmadan değişiklikler aktif olmaz!**

---

## 🐛 Hala Hata Alıyorsanız

1. **Environment variable'ların doğru eklendiğini kontrol edin**
2. **Redeploy yaptığınızdan emin olun**
3. **Build loglarını kontrol edin** (Deployments > Build Logs)
4. **Variable isimlerinde typo olmadığından emin olun**

---

## 📋 Kopyala-Yapıştır İçin Değerler

```env
NEXT_PUBLIC_SUPABASE_URL=https://rgqhpybnzrinwwmpptfk.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJncWhweWJuenJpbnd3bXBwdGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0NjQ0MjksImV4cCI6MjA4NTA0MDQyOX0.N597Od5XohRCH4fzlAfym48fD-mD81gSxqUWuo6uEo0

NEXT_PUBLIC_ADMIN_EMAIL=msmyazilim1@gmail.com
```

**Not:** `NEXT_PUBLIC_ADMIN_EMAIL` değerini kendi admin email'inizle değiştirmeyi unutmayın!
