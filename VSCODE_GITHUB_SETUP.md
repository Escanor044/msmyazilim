# VSCode'da GitHub Projesi Çekme ve Push Yapma Rehberi

## 📋 Ön Gereksinimler

1. **Git Kurulumu:**
   - Windows: https://git-scm.com/download/win
   - Kurulum sırasında "Add Git to PATH" seçeneğini işaretle
   - Kurulumdan sonra bilgisayarı yeniden başlat

2. **GitHub Hesabı:**
   - https://github.com adresinden hesap oluştur

3. **VSCode:**
   - Zaten kurulu ✅

---

## 🔧 Adım 1: Git Kurulumunu Kontrol Et

1. **VSCode'u aç**
2. **Terminal aç:** `Ctrl + ~` (veya View > Terminal)
3. **Git versiyonunu kontrol et:**
   ```bash
   git --version
   ```
   - Eğer versiyon gösteriyorsa: ✅ Git kurulu
   - Eğer hata veriyorsa: Git'i yukarıdaki linkten kur

---

## 🔐 Adım 2: Git Kimlik Bilgilerini Ayarla

Terminal'de şu komutları çalıştır:

```bash
git config --global user.name "Adınız Soyadınız"
git config --global user.email "email@example.com"
```

**Örnek:**
```bash
git config --global user.name "Mert Yılmaz"
git config --global user.email "msmyazilim1@gmail.com"
```

---

## 📥 Adım 3: GitHub Projesini Çekme (Clone)

### Yöntem 1: VSCode Terminal'den (Önerilen)

1. **VSCode'u aç**
2. **Terminal aç:** `Ctrl + ~`
3. **Projeyi çek:**
   ```bash
   git clone https://github.com/Escanor044/msmyazilim.git
   ```
4. **Proje klasörüne gir:**
   ```bash
   cd msmyazilim
   ```
5. **VSCode'da projeyi aç:**
   - File > Open Folder
   - `msmyazilim` klasörünü seç

### Yöntem 2: VSCode Source Control'dan

1. **VSCode'u aç**
2. **Sol menüden Source Control ikonuna tıkla** (Ctrl + Shift + G)
3. **"Clone Repository" butonuna tıkla**
4. **Repository URL'ini yapıştır:**
   ```
   https://github.com/Escanor044/msmyazilim.git
   ```
5. **Klasör seç** (projeyi nereye indireceğini seç)
6. **"Open" butonuna tıkla**

---

## 🔑 Adım 4: GitHub Authentication (İlk Kez Push İçin)

### Yöntem 1: Personal Access Token (Önerilen)

1. **GitHub'a git:** https://github.com
2. **Settings > Developer settings > Personal access tokens > Tokens (classic)**
3. **"Generate new token (classic)" butonuna tıkla**
4. **Token ayarları:**
   - Note: `VSCode Git Access`
   - Expiration: `90 days` (veya istediğiniz süre)
   - Scopes: `repo` seçeneğini işaretle (tüm repo izinleri)
5. **"Generate token" butonuna tıkla**
6. **Token'ı kopyala** (bir daha gösterilmeyecek!)

### Yöntem 2: GitHub CLI (Alternatif)

```bash
# GitHub CLI'yi yükle
# Windows: winget install GitHub.cli
# Mac: brew install gh

# Login ol
gh auth login
```

---

## 📤 Adım 5: Değişiklikleri Push Etme

### İlk Kez Push Yapıyorsanız:

1. **Terminal'de proje klasöründe olduğundan emin ol:**
   ```bash
   cd msmyazilim
   ```

2. **Değişiklikleri kontrol et:**
   ```bash
   git status
   ```

3. **Değişiklikleri ekle:**
   ```bash
   git add .
   ```
   (Tüm değişiklikleri ekler)

4. **Commit yap:**
   ```bash
   git commit -m "Değişiklik açıklaması buraya"
   ```
   **Örnek:**
   ```bash
   git commit -m "Admin panel güncellemeleri"
   ```

5. **Push yap:**
   ```bash
   git push origin main
   ```
   
   **İlk kez push yapıyorsanız:**
   - Username: GitHub kullanıcı adınız
   - Password: Personal Access Token (yukarıda oluşturduğunuz)

### VSCode Source Control Panel'den:

1. **Sol menüden Source Control ikonuna tıkla** (Ctrl + Shift + G)
2. **Değişiklikleri görüntüle**
3. **"+" butonuna tıkla** (Stage All Changes)
4. **Commit mesajı yaz** (üstteki kutuya)
5. **"✓" butonuna tıkla** (Commit)
6. **"..." menüsünden "Push" seç**

---

## 🔄 Adım 6: Son Değişiklikleri Çekme (Pull)

Başka biri değişiklik yaptıysa, son versiyonu çekmek için:

```bash
git pull origin main
```

Veya VSCode Source Control panel'den:
- "..." menüsünden "Pull" seç

---

## 📝 Sık Kullanılan Git Komutları

```bash
# Durumu kontrol et
git status

# Son değişiklikleri çek
git pull origin main

# Tüm değişiklikleri ekle
git add .

# Belirli dosyayı ekle
git add dosya-adi.tsx

# Commit yap
git commit -m "Açıklama"

# Push yap
git push origin main

# Branch değiştir
git checkout branch-adi

# Yeni branch oluştur
git checkout -b yeni-branch-adi

# Commit geçmişini gör
git log
```

---

## 🐛 Sorun Giderme

### "git: command not found" Hatası

**Çözüm:** Git kurulu değil veya PATH'e eklenmemiş
- Git'i yukarıdaki linkten kur
- Bilgisayarı yeniden başlat

### "Authentication failed" Hatası

**Çözüm:** 
- Personal Access Token kullan (şifre değil!)
- Token'ın `repo` izni olduğundan emin ol

### "Permission denied" Hatası

**Çözüm:**
- Repository'nin sahibi misiniz kontrol edin
- Veya repository'yi fork edin

### "Your branch is ahead of origin/main" Uyarısı

**Çözüm:**
- Değişiklikleri push etmeniz gerekiyor:
  ```bash
  git push origin main
  ```

---

## 💡 VSCode Git Extension Önerileri

VSCode'da daha iyi Git deneyimi için:

1. **GitLens** (Zaten VSCode'da var, aktifleştir)
   - Sol menüden Extensions (Ctrl + Shift + X)
   - "GitLens" ara ve Install

2. **Git Graph**
   - Git geçmişini görsel olarak gösterir

---

## 🎯 Hızlı Başlangıç Checklist

- [ ] Git kurulu mu? (`git --version`)
- [ ] Git kimlik bilgileri ayarlandı mı?
- [ ] Proje clone edildi mi?
- [ ] Personal Access Token oluşturuldu mu?
- [ ] İlk push yapıldı mı?

---

## 📞 Yardım

Sorun yaşarsanız:
1. Terminal'deki hata mesajını kontrol edin
2. Git status ile durumu kontrol edin: `git status`
3. GitHub'da repository ayarlarını kontrol edin
