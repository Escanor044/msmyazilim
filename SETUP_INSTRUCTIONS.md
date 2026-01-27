# Güvenlik Kurulum Talimatları

## ✅ Otomatik Yapılan İşlemler

Aşağıdaki güvenlik önlemleri otomatik olarak eklendi:

1. ✅ **DOMPurify Entegrasyonu** - HTML sanitization için
2. ✅ **CSRF Token Fonksiyonları** - Token oluşturma ve doğrulama
3. ✅ **CSP Headers** - Content Security Policy headers
4. ✅ **Logging Sistemi** - Admin işlemleri ve güvenlik logları

## 📦 Yapmanız Gerekenler

### 1. NPM Paketlerini Yükleyin

```bash
npm install
```

Bu komut şu paketleri yükleyecek:
- `dompurify` - HTML sanitization
- `isomorphic-dompurify` - Server-side DOMPurify
- `@types/dompurify` - TypeScript types

### 2. Supabase Security Update SQL'i Çalıştırın

1. Supabase Dashboard'a gidin: https://supabase.com/dashboard
2. Projenizi seçin
3. Sol menüden **SQL Editor**'e tıklayın
4. **New Query** butonuna tıklayın
5. `supabase_security_update.sql` dosyasının içeriğini kopyalayıp yapıştırın
6. **Run** butonuna tıklayın

**ÖNEMLİ**: Bu SQL script'i RLS politikalarını güçlendirir ve sadece admin email'i ile işlem yapılmasını sağlar.

### 3. (Opsiyonel) Supabase Secret Ayarlama

Eğer database seviyesinde email kontrolü istiyorsanız:

1. Supabase Dashboard > **Settings** > **API** > **Secrets**
2. **Add Secret** butonuna tıklayın
3. **Name**: `app.admin_email`
4. **Value**: Admin email adresiniz (örn: `admin@msmyazilim.com`)
5. **Save** butonuna tıklayın

**Not**: Bu opsiyonel bir adımdır. Şu anki implementasyon client-side'da email kontrolü yapıyor.

### 4. (Opsiyonel) External Logging Service

Production'da logları external service'e göndermek için:

#### 5.1. Sentry (Önerilen)

```bash
npm install @sentry/nextjs
```

`lib/logger.ts` dosyasındaki `sendToExternalService()` fonksiyonunu implement edin.

#### 5.2. Diğer Seçenekler

- **LogRocket**: https://logrocket.com/
- **CloudWatch**: AWS CloudWatch
- **Datadog**: https://www.datadoghq.com/
- **New Relic**: https://newrelic.com/

### 6. Development Server'ı Yeniden Başlatın

Tüm değişikliklerin yüklenmesi için:

```bash
# Development server'ı durdurun (Ctrl+C)
# Sonra tekrar başlatın:
npm run dev
```

## 🔍 Test Etme

### 1. DOMPurify Test

1. Admin panel > Yasal Sayfalar
2. Yeni bir sayfa ekleyin veya mevcut bir sayfayı düzenleyin
3. İçeriğe `<script>alert('XSS')</script>` ekleyin
4. Kaydedin ve sayfayı görüntüleyin
5. Script çalışmamalı (sanitize edilmiş olmalı)

### 2. Rate Limiting Test

1. Admin login sayfasına gidin
2. Yanlış şifre ile 5+ kez giriş yapmayı deneyin
3. "Çok fazla deneme yapıldı" mesajı görünmeli

### 3. CSP Headers Test

1. Browser Developer Tools'u açın (F12)
2. **Network** sekmesine gidin
3. Herhangi bir sayfayı yenileyin
4. Response headers'da `Content-Security-Policy` header'ını kontrol edin

### 4. Logging Test

1. Admin panelde bir işlem yapın (ör: yeni sistem ekle)
2. Console'da log mesajı görünmeli
3. Failed login denemesi yapın
4. Security log mesajı görünmeli

## 📝 Checklist

- [ ] `npm install` çalıştırıldı
- [ ] `supabase_security_update.sql` Supabase'de çalıştırıldı
- [ ] (Opsiyonel) Supabase secret ayarlandı
- [ ] (Opsiyonel) External logging service entegre edildi
- [ ] Development server yeniden başlatıldı
- [ ] Tüm testler başarılı

## 🚨 Önemli Notlar

1. **DOMPurify**: Artık tüm HTML içerikler otomatik olarak sanitize ediliyor
2. **Rate Limiting**: Memory-based çalışıyor
3. **Logging**: Şu an console'a yazıyor, production'da external service kullanın
4. **CSRF Token**: Fonksiyonlar hazır, form'lara entegre edilebilir
5. **CSP Headers**: Otomatik olarak tüm sayfalara ekleniyor

## 🆘 Sorun Giderme

### DOMPurify Hata Veriyor

```bash
# Paketleri yeniden yükleyin
rm -rf node_modules package-lock.json
npm install
```

### CSP Header Çalışmıyor

- `next.config.ts` dosyasının doğru olduğundan emin olun
- Development server'ı yeniden başlatın
- Browser cache'ini temizleyin

## 📚 Ek Kaynaklar

- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)
- [Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)
- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
