# Supabase Redirect URL Ayarları

## 🔧 Şifre Sıfırlama için Redirect URL Ayarlama

Supabase'de şifre sıfırlama linklerinin doğru çalışması için redirect URL'lerini ayarlamanız gerekiyor.

### Adım 1: Supabase Dashboard'a Gidin

1. https://supabase.com/dashboard
2. Projenizi seçin
3. **Authentication > URL Configuration** bölümüne gidin

### Adım 2: Site URL Ayarlayın

**Site URL (Production):**
```
https://www.msmyazilim.com
```

**ÖNEMLİ:** Site URL production domain'iniz olmalı! Bu, şifre sıfırlama email'lerindeki linklerin base URL'idir.

### Adım 3: Redirect URLs Ekleyin

**Redirect URLs** listesine şunları ekleyin (hem development hem production):

#### Development (Localhost):
```
http://localhost:3000/auth/callback
http://localhost:3000/admin/reset-password
http://localhost:3000/admin/login
```

#### Production (Canlı Site):
```
https://www.msmyazilim.com/auth/callback
https://www.msmyazilim.com/admin/reset-password
https://www.msmyazilim.com/admin/login
```

**VEYA** (Daha basit - Önerilen):

Şifre sıfırlama için direkt reset-password sayfasını kullanın:

**Development:**
```
http://localhost:3000/admin/reset-password
```

**Production:**
```
https://www.msmyazilim.com/admin/reset-password
```

---

## 📝 Notlar

1. **Site URL:** Production domain'iniz olmalı (`https://www.msmyazilim.com`)
2. **Redirect URLs:** Hem development hem production URL'leri ekleyin
3. **Hash Fragment:** Supabase şifre sıfırlama linkleri hash fragment (`#access_token=...`) kullanır
4. **Client-Side:** Hash sadece client-side'da okunabilir, server-side'da okunamaz
5. **Reset Password Sayfası:** Hash'i otomatik olarak okuyup session oluşturur

## ⚠️ Önemli

- **Site URL** production domain'iniz olmalı (www.msmyazilim.com)
- **Redirect URLs** hem localhost hem production için eklenmeli
- Development sırasında localhost URL'leri kullanılır
- Production'da canlı domain URL'leri kullanılır

---

## ✅ Test Etme

1. Supabase Dashboard > Users > Kullanıcı > "Reset password"
2. Email gönderilir
3. Email'deki linke tıklayın
4. `/admin/reset-password` sayfasına yönlendirilmelisiniz
5. Hash'teki token otomatik olarak okunur ve session oluşturulur
6. Yeni şifre belirleyebilirsiniz

---

## 🐛 Sorun Giderme

### Hala Login Sayfasına Yönlendiriliyorsa

1. **Supabase Redirect URLs'i kontrol edin:**
   - `http://localhost:3000/admin/reset-password` ekli mi?
   
2. **Callback Route'u kontrol edin:**
   - `/auth/callback` route'u çalışıyor mu?
   
3. **Browser Console'u kontrol edin:**
   - Hash'te token var mı?
   - Hata mesajı var mı?

### "Geçersiz token" Hatası

- Email'deki linki tekrar kullanın
- Token'ın süresi dolmuş olabilir (genellikle 1 saat)
- Yeni bir şifre sıfırlama linki isteyin
