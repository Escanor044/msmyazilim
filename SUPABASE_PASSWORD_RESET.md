# Supabase Şifre Sıfırlama Rehberi

## 🔑 Şifre Sıfırlama Adımları

### Yöntem 1: Supabase Dashboard'dan (Önerilen)

1. **Supabase Dashboard'a gidin:** https://supabase.com/dashboard
2. **Authentication > Users** bölümüne gidin
3. **Kullanıcıyı bulun:** `msmyazilim1@gmail.com`
4. **Kullanıcıya tıklayın** (detay sayfasına gidin)
5. **"Reset password"** veya **"Update password"** butonuna tıklayın
6. **Yeni şifre belirleyin:**
   - En az 8 karakter
   - Güçlü bir şifre önerisi: `Admin2024!Secure`
7. **Şifreyi kaydedin** (bir yere not edin)
8. **"Update"** veya **"Save"** butonuna tıklayın

### Yöntem 2: Kullanıcıyı Silip Yeniden Oluşturma

Eğer şifre sıfırlama çalışmazsa:

1. **Supabase Dashboard > Authentication > Users**
2. **Kullanıcıyı bulun:** `msmyazilim1@gmail.com`
3. **"..."** menüsünden **"Delete user"** seçin
4. **Yeni kullanıcı oluşturun:**
   - **Email:** `msmyazilim1@gmail.com`
   - **Password:** Yeni bir şifre (örnek: `Admin2024!Secure`)
   - **Auto Confirm User:** ✅ **MUTLAKA İŞARETLEYİN**
5. **"Create user"** butonuna tıklayın

---

## ✅ Şifre Sıfırladıktan Sonra

1. **Yeni şifreyi not edin**
2. **Login sayfasına gidin:** `/admin/login`
3. **Giriş bilgilerini girin:**
   - **Email:** `msmyazilim1@gmail.com`
   - **Şifre:** Yeni belirlediğiniz şifre
4. **"Giriş Yap"** butonuna tıklayın

---

## 🔒 Güçlü Şifre Önerileri

**Örnek şifreler:**
- `Admin2024!Secure`
- `Msmyazilim123!`
- `MyAdmin2024#Pass`

**Şifre gereksinimleri:**
- En az 8 karakter
- Büyük harf içermeli
- Küçük harf içermeli
- Rakam içermeli
- Özel karakter içermeli (!@#$%^&*)

---

## 🐛 Hala Giriş Yapamıyorsanız

1. **Browser console'u açın** (F12 > Console)
2. **Giriş yapmayı deneyin**
3. **Console'da şu mesajları kontrol edin:**
   - `Admin email check:` - Email eşleşmesi
   - `Login response:` - Supabase yanıtı
   - `Supabase login error:` - Hata detayları

4. **Hata mesajına göre:**
   - `Invalid login credentials` → Şifre hala yanlış, tekrar sıfırlayın
   - `Email not confirmed` → Email doğrulanmamış, "Confirm email" yapın
   - Başka bir hata → Console'daki tam hata mesajını paylaşın

---

## 💡 İpucu: Test Şifresi

Hızlı test için basit bir şifre kullanabilirsiniz:

- **Şifre:** `Test123!`
- Supabase'de bu şifreyi ayarlayın
- Giriş yapmayı deneyin
- Başarılı olursa, daha güçlü bir şifre belirleyin

---

## 📝 Not

- Şifre Supabase'de hash'lenerek saklanır
- Şifreyi unutursanız her zaman Supabase Dashboard'dan sıfırlayabilirsiniz
- Güvenlik için şifreyi düzenli olarak değiştirin
