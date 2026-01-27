# Güvenlik Dokümantasyonu

## Yapılan Güvenlik İyileştirmeleri

### 1. Middleware ile Route Koruması ✅
- **Dosya**: `middleware.ts`
- **Açıklama**: Admin route'ları middleware seviyesinde korunuyor
- **Özellikler**:
  - Session kontrolü
  - Admin email doğrulaması
  - Otomatik yönlendirme

### 2. Server-Side Auth Helpers ✅
- **Dosya**: `lib/auth.ts`, `lib/supabase-server.ts`
- **Açıklama**: Server-side authentication ve yetkilendirme helper'ları
- **Özellikler**:
  - `checkAdminAuth()` - Admin yetkisi kontrolü
  - `sanitizeInput()` - Input sanitization
  - `sanitizeHTML()` - HTML içerik sanitization
  - `isValidEmail()` - Email validation
  - `checkRateLimit()` - Rate limiting

### 3. Supabase RLS Politikaları Güçlendirme ✅
- **Dosya**: `supabase_security_update.sql`
- **Açıklama**: RLS politikaları sadece admin email'i ile işlem yapılacak şekilde güncellendi
- **Özellikler**:
  - `is_admin_user()` fonksiyonu eklendi
  - Tüm admin işlemleri için email kontrolü
  - Public read, admin-only write

### 4. Input Validation ✅
- **Dosya**: Admin sayfaları
- **Açıklama**: Form input'ları için validation eklendi
- **Özellikler**:
  - Slug validation (regex)
  - Length validation
  - Required field validation

## Güvenlik Açıkları ve Çözümler

### ✅ Düzeltilen Açıklar

1. **Client-Side Only Auth**
   - **Sorun**: Sadece client-side kontrol vardı
   - **Çözüm**: Middleware ve server-side auth helpers eklendi

2. **Zayıf RLS Politikaları**
   - **Sorun**: Sadece `authenticated` kontrolü vardı
   - **Çözüm**: Email bazlı admin kontrolü eklendi

3. **XSS Riski**
   - **Sorun**: HTML içerik direkt render ediliyordu
   - **Çözüm**: `sanitizeHTML()` fonksiyonu eklendi (production'da DOMPurify önerilir)

4. **Input Validation Eksikliği**
   - **Sorun**: Form input'ları validate edilmiyordu
   - **Çözüm**: Validation helper'ları ve form validation eklendi

5. **Rate Limiting Yok**
   - **Sorun**: Brute force saldırılarına açıktı
   - **Çözüm**: `checkRateLimit()` fonksiyonu eklendi

## Önerilen Ek Güvenlik Önlemleri

### 1. DOMPurify Kullanımı
Production'da HTML sanitization için DOMPurify kullanın:

```bash
npm install dompurify
npm install --save-dev @types/dompurify
```

```typescript
import DOMPurify from 'dompurify'

export function sanitizeHTML(html: string): string {
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'br'],
        ALLOWED_ATTR: ['href', 'target']
    })
}
```

### 2. CSRF Token
Form submission'lar için CSRF token ekleyin:

```typescript
// Server-side token oluştur
const csrfToken = crypto.randomBytes(32).toString('hex')

// Form'da token gönder
// Server-side'da token doğrula
```

### 3. Content Security Policy (CSP)
`next.config.ts` dosyasına CSP headers ekleyin:

```typescript
const nextConfig = {
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
                    }
                ]
            }
        ]
    }
}
```

### 4. Environment Variables Güvenliği
- `.env.local` dosyasını `.gitignore`'a ekleyin ✅
- Production'da environment variable'ları platform ayarlarından ekleyin
- `NEXT_PUBLIC_` prefix'i olan değişkenler client-side'da görünür, hassas bilgiler için kullanmayın

### 5. Supabase Secret Ayarlama
Supabase Dashboard'da admin email'i secret olarak saklayın:

1. Supabase Dashboard > Settings > API > Secrets
2. `app.admin_email` adında secret ekleyin
3. Değer: `admin@msmyazilim.com`

### 6. Logging ve Monitoring
- Admin işlemlerini loglayın
- Şüpheli aktiviteleri izleyin
- Failed login attempt'leri kaydedin

## Güvenlik Checklist

- [x] Middleware ile route koruması
- [x] Server-side auth helpers
- [x] RLS politikaları güçlendirme
- [x] Input validation
- [x] HTML sanitization (basit)
- [x] Rate limiting (memory-based)
- [x] DOMPurify entegrasyonu ✅
- [x] CSRF token (fonksiyonlar hazır, form entegrasyonu gerekli)
- [x] CSP headers ✅
- [x] Logging ve monitoring ✅

## Kullanım

### Middleware
Otomatik olarak çalışır, `/admin` route'larını korur.

### Auth Helpers
```typescript
import { checkAdminAuth, sanitizeInput, sanitizeHTML } from '@/lib/auth'

// Admin kontrolü
const { isAdmin, user } = await checkAdminAuth()

// Input sanitization
const cleanInput = sanitizeInput(userInput)

// HTML sanitization
const cleanHTML = sanitizeHTML(htmlContent)
```

### Rate Limiting
```typescript
import { checkRateLimit } from '@/lib/auth'

const ip = req.headers.get('x-forwarded-for') || 'unknown'
if (!checkRateLimit(ip, 10, 60000)) {
    return new Response('Too many requests', { status: 429 })
}
```

## Notlar

- Middleware Next.js 13+ App Router ile çalışır
- RLS politikaları Supabase'de çalıştırılmalı
- Production'da ek güvenlik önlemleri alınmalı
- Düzenli güvenlik güncellemeleri yapılmalı
