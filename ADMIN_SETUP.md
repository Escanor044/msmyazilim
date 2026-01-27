# Admin Panel Kurulum Rehberi

## 1. Supabase'de Admin Kullanıcısı Oluşturma

### Adım 1: Supabase Dashboard'a Giriş
1. [Supabase Dashboard](https://supabase.com/dashboard) adresine gidin
2. Projenize giriş yapın

### Adım 2: Authentication > Users Bölümüne Gidin
1. Sol menüden **"Authentication"** seçeneğine tıklayın
2. **"Users"** sekmesine tıklayın

### Adım 3: Yeni Kullanıcı Ekle
1. Sağ üst köşedeki **"Add user"** veya **"Invite user"** butonuna tıklayın
2. **"Create new user"** seçeneğini seçin

### Adım 4: Kullanıcı Bilgilerini Girin
- **Email**: `.env.local` dosyasında belirttiğiniz email adresini girin
  - Örnek: `admin@msmyazilim.com`
- **Password**: Güçlü bir şifre belirleyin (en az 8 karakter)
  - Örnek: `MySecurePassword123!`
- **Auto Confirm User**: ✅ İşaretleyin (otomatik onay için)

### Adım 5: Kullanıcıyı Oluştur
- **"Create user"** butonuna tıklayın

## 2. Environment Variable Yapılandırması

`.env.local` dosyanızda admin email adresinizi belirtin:

```env
NEXT_PUBLIC_ADMIN_EMAIL=admin@msmyazilim.com
```

**ÖNEMLİ**: 
- Email adresi Supabase'de oluşturduğunuz kullanıcının email'i ile **tam olarak aynı** olmalıdır
- Büyük/küçük harf duyarlı değildir (otomatik olarak küçük harfe çevrilir)

## 3. Test Etme

1. Development server'ı başlatın:
   ```bash
   npm run dev
   ```

2. Tarayıcıda `/admin/login` sayfasına gidin

3. Giriş bilgilerini girin:
   - **Email**: Supabase'de oluşturduğunuz email
   - **Şifre**: Supabase'de belirlediğiniz şifre

4. Başarılı giriş yapıldığında admin paneline yönlendirilirsiniz

## 4. Güvenlik İpuçları

### Güçlü Şifre Önerileri:
- En az 12 karakter
- Büyük ve küçük harf
- Rakamlar
- Özel karakterler (!@#$%^&*)
- Örnek: `MyAdmin2024!Secure#Pass`

### Şifre Değiştirme:
1. Supabase Dashboard > Authentication > Users
2. Kullanıcıyı bulun ve tıklayın
3. **"Reset Password"** butonuna tıklayın
4. Yeni şifre belirleyin

## 5. Sorun Giderme

### "Invalid login credentials" Hatası:
- Email adresinin doğru olduğundan emin olun
- Şifrenin doğru olduğundan emin olun
- Supabase'de kullanıcının **"Email Confirmed"** durumunun aktif olduğunu kontrol edin

### "Bu email adresi ile giriş yapılamaz" Hatası:
- `.env.local` dosyasındaki `NEXT_PUBLIC_ADMIN_EMAIL` değerini kontrol edin
- Email adresinin Supabase'deki kullanıcı email'i ile eşleştiğinden emin olun
- Development server'ı yeniden başlatın (environment variable değişiklikleri için)

### Environment Variable Değişiklikleri Yansımıyor:
- Development server'ı durdurun (Ctrl+C)
- Tekrar başlatın: `npm run dev`

## 6. Production (Canlı Ortam) İçin

Production'da (Vercel, Netlify vb.) environment variable'ları platform ayarlarından ekleyin:

### Vercel:
1. Proje > Settings > Environment Variables
2. `NEXT_PUBLIC_ADMIN_EMAIL` ekleyin
3. Deploy edin

### Netlify:
1. Site settings > Environment variables
2. `NEXT_PUBLIC_ADMIN_EMAIL` ekleyin
3. Deploy edin

**ÖNEMLİ**: Production'da `.env.local` dosyası kullanılmaz, platform ayarlarından environment variable eklemeniz gerekir.
