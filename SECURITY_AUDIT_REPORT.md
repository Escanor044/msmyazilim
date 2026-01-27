# 🔒 Güvenlik Denetim Raporu

**Tarih:** 2026-01-27  
**Proje:** msmyazilim  
**Denetleyen:** Cursor AI Assistant

---

## 📋 Özet

Bu rapor, projenin güvenlik durumunu analiz eder ve tespit edilen açıkları, riskleri ve önerileri içerir.

---

## ✅ İYİ UYGULAMALAR

### 1. Environment Variables
- ✅ **Service Role Key kullanılmıyor** - Hiçbir yerde `SERVICE_ROLE_KEY` veya `service_role` kullanılmamış
- ✅ **NEXT_PUBLIC_ değişkenleri doğru kullanılıyor** - Sadece public olması gereken değerler (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `ADMIN_EMAIL`) public olarak işaretlenmiş

### 2. Authentication
- ✅ **Middleware ile admin route koruması** - `/admin` route'ları middleware ile korunuyor
- ✅ **Email bazlı admin kontrolü** - Sadece belirli email adresi admin panele erişebiliyor
- ✅ **Session kontrolü** - Middleware'de session kontrolü yapılıyor

### 3. RLS (Row Level Security)
- ✅ **RLS aktif** - Tüm tablolarda RLS etkin
- ✅ **Politikalar tanımlı** - Her tablo için SELECT, INSERT, UPDATE, DELETE politikaları var

---

## ⚠️ TESPİT EDİLEN GÜVENLİK AÇIKLARI

### 🔴 KRİTİK: Client-Side Database İşlemleri

**Sorun:** Tüm admin panel sayfaları (`app/admin/*/page.tsx`) client component'lerde doğrudan Supabase client ile veritabanı yazma işlemleri yapıyor.

**Etkilenen Dosyalar:**
- `app/admin/paketler/page.tsx` - `.insert()`, `.update()`, `.delete()`
- `app/admin/server-files-packages/page.tsx` - `.insert()`, `.update()`, `.delete()`
- `app/admin/referanslar/page.tsx` - `.insert()`, `.update()`, `.delete()`
- `app/admin/hakkimizda/page.tsx` - `.insert()`, `.update()`, `.delete()`
- `app/admin/yasal-sayfalar/page.tsx` - `.insert()`, `.update()`, `.delete()`

**Risk Seviyesi:** 🔴 YÜKSEK

**Açıklama:**
- Client component'lerde yapılan işlemler RLS'ye güveniyor
- Ancak RLS politikaları sadece `auth.role() = 'authenticated'` kontrolü yapıyor
- Bu, herhangi bir authenticated kullanıcının admin panel verilerini değiştirebileceği anlamına geliyor
- `supabase_security_update.sql` dosyasında `is_admin_user()` fonksiyonu tanımlanmış ama çoğu tabloda kullanılmamış

**Örnek Kod:**
```typescript
// ❌ GÜVENSİZ: Client component'te doğrudan yazma
const { error } = await supabase
    .from('packages')
    .insert([packageData])
```

**Çözüm:**
1. Tüm yazma işlemlerini Server Actions veya API Routes'a taşı
2. Server-side'da admin kontrolü yap
3. RLS politikalarını `is_admin_user()` fonksiyonu ile güçlendir

---

### 🟡 ORTA: RLS Politikaları Yetersiz

**Sorun:** Bazı tablolarda RLS politikaları sadece `auth.role() = 'authenticated'` kontrolü yapıyor, admin email kontrolü yapmıyor.

**Etkilenen Tablolar:**
- `packages` - `auth.role() = 'authenticated'` (admin kontrolü yok)
- `systems` - Eski politikalar `auth.role() = 'authenticated'`, yeni `is_admin_user()` var ama uygulanmamış olabilir
- `references` - `auth.role() = 'authenticated'` (admin kontrolü yok)
- `about_page`, `about_values`, `about_team` - `auth.role() = 'authenticated'` (admin kontrolü yok)
- `legal_pages` - Kontrol edilmeli

**Risk Seviyesi:** 🟡 ORTA

**Açıklama:**
- `supabase_security_update.sql` dosyasında `is_admin_user()` fonksiyonu tanımlanmış
- Ancak bu fonksiyon sadece `systems` tablosunda kullanılıyor
- Diğer tablolarda hala eski `auth.role() = 'authenticated'` politikaları aktif

**Çözüm:**
1. Tüm tablolarda `is_admin_user()` fonksiyonunu kullan
2. `supabase_security_update.sql` dosyasını tüm tablolar için güncelle
3. SQL script'ini Supabase'de çalıştır

---

### 🟡 ORTA: @supabase/ssr Kullanılmıyor

**Sorun:** Proje `@supabase/supabase-js` kullanıyor, ancak Next.js App Router için önerilen `@supabase/ssr` kullanılmıyor.

**Etkilenen Dosyalar:**
- `lib/supabase.ts` - `createClient` from `@supabase/supabase-js`
- `lib/supabase-server.ts` - `createClient` from `@supabase/supabase-js`
- `lib/auth-server.ts` - `createClient` from `@supabase/supabase-js`
- `middleware.ts` - `createClient` from `@supabase/supabase-js`

**Risk Seviyesi:** 🟡 ORTA

**Açıklama:**
- `@supabase/ssr` Next.js App Router için optimize edilmiş
- Cookie yönetimi ve session handling daha güvenli
- SSR ve client-side hydration için daha iyi uyumluluk

**Çözüm:**
1. `@supabase/ssr` paketini yükle
2. `createBrowserClient` ve `createServerClient` kullan
3. Cookie yönetimini `@supabase/ssr` ile yap

---

### 🟢 DÜŞÜK: NEXT_PUBLIC_ADMIN_EMAIL Public

**Sorun:** `NEXT_PUBLIC_ADMIN_EMAIL` public bir değişken, client-side'da görülebilir.

**Risk Seviyesi:** 🟢 DÜŞÜK

**Açıklama:**
- Bu sadece bir email adresi, hassas bir bilgi değil
- Ancak saldırganlar hangi email'in admin olduğunu öğrenebilir
- Bu bilgi brute-force saldırılarını kolaylaştırabilir

**Çözüm:**
- Bu değişkeni server-side'da tutmak daha iyi olur
- Ancak mevcut kullanım kabul edilebilir (düşük risk)

---

## 📝 ÖNERİLER

### 1. Server Actions Kullanımı (Öncelik: YÜKSEK)

Tüm admin panel yazma işlemlerini Server Actions'a taşı:

```typescript
// ✅ GÜVENLİ: Server Action
'use server'

import { createServerSupabaseClient } from '@/lib/auth-server'
import { checkAdminAuth } from '@/lib/auth-server'

export async function createPackage(data: PackageData) {
    const { isAdmin } = await checkAdminAuth()
    if (!isAdmin) {
        throw new Error('Unauthorized')
    }
    
    const supabase = await createServerSupabaseClient()
    const { error } = await supabase
        .from('packages')
        .insert([data])
    
    if (error) throw error
    return { success: true }
}
```

### 2. RLS Politikalarını Güçlendir (Öncelik: YÜKSEK)

Tüm tablolarda `is_admin_user()` fonksiyonunu kullan:

```sql
-- Örnek: packages tablosu
DROP POLICY IF EXISTS "Packages are insertable by authenticated users" ON packages;
CREATE POLICY "Packages are insertable by admin only"
ON packages FOR INSERT
WITH CHECK (is_admin_user());
```

### 3. @supabase/ssr'ye Geçiş (Öncelik: ORTA)

```typescript
// lib/supabase.ts
import { createBrowserClient } from '@supabase/ssr'

export const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

### 4. Input Validation (Öncelik: ORTA)

Zod veya benzeri bir kütüphane ile input validation ekle:

```typescript
import { z } from 'zod'

const PackageSchema = z.object({
    title: z.string().min(1).max(100),
    price: z.string(),
    features: z.array(z.string()),
    // ...
})
```

### 5. Rate Limiting (Öncelik: DÜŞÜK)

Admin panel işlemleri için rate limiting ekle (zaten `lib/auth.ts`'de memory-based rate limiting var, ancak admin işlemleri için özel bir limit eklenebilir).

---

## ✅ YAPILMASI GEREKENLER

### Acil (Bu Hafta)
- [ ] Tüm admin panel yazma işlemlerini Server Actions'a taşı
- [ ] RLS politikalarını `is_admin_user()` ile güncelle
- [ ] SQL script'ini Supabase'de çalıştır

### Kısa Vadeli (Bu Ay)
- [ ] `@supabase/ssr` paketine geçiş yap
- [ ] Input validation ekle (Zod)
- [ ] Error handling'i iyileştir

### Uzun Vadeli (Gelecek)
- [ ] Audit logging ekle (hangi admin ne zaman ne yaptı)
- [ ] 2FA (Two-Factor Authentication) ekle
- [ ] IP whitelist ekle (opsiyonel)

---

## 📊 Risk Matrisi

| Açık | Risk Seviyesi | Etki | Olasılık | Öncelik |
|------|---------------|------|----------|---------|
| Client-Side DB İşlemleri | 🔴 YÜKSEK | Yüksek | Yüksek | 1 |
| RLS Politikaları Yetersiz | 🟡 ORTA | Orta | Orta | 2 |
| @supabase/ssr Kullanılmıyor | 🟡 ORTA | Düşük | Düşük | 3 |
| NEXT_PUBLIC_ADMIN_EMAIL | 🟢 DÜŞÜK | Düşük | Düşük | 4 |

---

## 🔗 İLGİLİ DOSYALAR

- `lib/supabase.ts` - Client-side Supabase client
- `lib/supabase-server.ts` - Server-side Supabase client
- `lib/auth-server.ts` - Server-side auth utilities
- `middleware.ts` - Route protection
- `supabase_security_update.sql` - RLS güvenlik güncellemeleri
- `app/admin/**/page.tsx` - Admin panel sayfaları

---

## 📞 İLETİŞİM

Sorularınız için: [Cursor AI Assistant]

---

**Not:** Bu rapor otomatik olarak oluşturulmuştur. Manuel inceleme önerilir.
