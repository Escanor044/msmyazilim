export interface System {
    id: number
    name: string
    category: "pvp" | "pvm" | "qol" | "admin" | "event" | "economy"
    desc: string
    included: boolean
    image: string
    seoTitle?: string
    seoDescription?: string
    features?: string[]
    longDescription?: string
}

export const systems: System[] = [
    // PvP Systems
    {
        id: 1,
        name: "Gelişmiş Arena Sistemi",
        category: "pvp",
        desc: "Bahisli 1v1, 3v3 ve 5v5 PvP turnuva sistemi ile oyuncularınız rekabetçi dövüşler yapabilir.",
        included: false,
        image: "/assets/arenasistemi.webp",
        seoTitle: "Arena PvP Sistemi - 1v1, 3v3, 5v5 Turnuva Sistemi",
        seoDescription: "Gelişmiş arena sistemi ile bahisli PvP turnuvaları düzenleyin. Günlük ve haftalık ödüller, ranking sistemi ve matchmaking özellikleri.",
        features: [
            "1v1, 3v3 ve 5v5 dövüş modları",
            "Günlük ve haftalık top 5 sıralaması",
            "KP (Kampanya Puanı) market sistemi",
            "Otomatik matchmaking ve arama sistemi",
            "Detaylı istatistikler ve ranking takibi",
            "Ödül kazananlar listesi",
            "Gerçek zamanlı bilgi güncellemesi"
        ],
        longDescription: "Arena sistemi, oyuncularınızın birbirleriyle rekabet edebileceği gelişmiş bir PvP platformudur. Sistem, 1v1, 3v3 ve 5v5 dövüş modlarını destekler. Oyuncular günlük ve haftalık sıralamalarda yer alabilir, KP puanları kazanabilir ve özel marketten ödüller satın alabilirler. Matchmaking sistemi sayesinde oyuncular hızlıca eşleşir ve adil dövüşler yaparlar."
    },
    {
        id: 2,
        name: "Meydan Okuma Sistemi",
        category: "pvp",
        desc: "Oyuncuların birbirlerine meydan okuyup özel ödüller kazandığı challenge sistemi.",
        included: false,
        image: "/assets/MeydanOkumaSistemi.webp",
        seoTitle: "Meydan Okuma Sistemi - Challenge ve Düello Sistemi",
        seoDescription: "Oyuncuların birbirlerine meydan okuyup özel ödüller kazandığı challenge sistemi. Karakter ve item bazlı meydan okuma özellikleri.",
        features: [
            "Karakter bazlı meydan okuma",
            "Item bazlı meydan okuma (silahlar, eşyalar)",
            "Seviye bazlı eşleştirme",
            "Özel ödül sistemi",
            "Envanter yönetimi",
            "Detaylı istatistik takibi"
        ],
        longDescription: "Meydan Okuma sistemi, oyuncuların birbirlerine meydan okuyup özel dövüşler yapabileceği bir platformdur. Sistem hem karakter hem de item bazlı meydan okumaları destekler. Oyuncular belirli seviye aralıklarında eşleşir ve kazananlar özel ödüller kazanır."
    },
    {
        id: 3,
        name: "Sıralama Sistemi",
        category: "pvp",
        desc: "Detaylı oyuncu sıralamaları ve istatistikleri. Level, metin kesme, boss öldürme ve daha fazlası.",
        included: true,
        image: "/assets/Siralamasistemi.webp",
        seoTitle: "Oyuncu Sıralama Sistemi - Leaderboard ve İstatistikler",
        seoDescription: "Kapsamlı oyuncu sıralama sistemi. Karakter level, metin kesme, boss öldürme, zindan tamamlama ve daha birçok kategori.",
        features: [
            "Karakter level sıralaması",
            "Metin kesme istatistikleri",
            "Boss öldürme sayıları",
            "Metin ve boss hasar takibi",
            "Zindan tamamlama istatistikleri",
            "Oyun süresi takibi",
            "Sandık açma sayıları",
            "Zindan ve boss bazlı özel sıralamalar"
        ],
        longDescription: "Sıralama sistemi, oyuncuların çeşitli kategorilerde birbirleriyle yarışabileceği kapsamlı bir leaderboard platformudur. Sistem, karakter seviyesi, metin kesme, boss öldürme, zindan tamamlama gibi birçok kategoriyi takip eder ve oyuncuları sıralar."
    },
    // PvM Systems
    {
        id: 6,
        name: "Otomatik Av Sistemi",
        category: "pvm",
        desc: "Gelişmiş legal bot sistemi ile oyuncularınız otomatik olarak avlanabilir.",
        included: false,
        image: "/assets/Otoav.webp",
        seoTitle: "Otomatik Av Sistemi - Legal Bot ve Auto Hunt",
        seoDescription: "Gelişmiş otomatik avlanma sistemi. Yetenek atama, canavar seçimi, metin filtreleme ve daha fazlası.",
        features: [
            "6 yetenek slotu ile otomatik yetenek kullanımı",
            "Canavar ve metin filtreleme",
            "Item toplama ve filtreleme",
            "Otomatik başlat/durdur özellikleri",
            "Güvenli ve legal bot sistemi",
            "Özelleştirilebilir ayarlar"
        ],
        longDescription: "Otomatik Av sistemi, oyuncularınızın karakterlerini otomatik olarak avlanmaya gönderebileceği gelişmiş bir legal bot sistemidir. Sistem, yetenek atama, canavar seçimi, metin filtreleme ve item toplama gibi birçok özellik sunar. Oyuncular belirledikleri ayarlara göre otomatik avlanma yapabilirler."
    },
    {
        id: 7,
        name: "Boss Bilgi ve Takip Sistemi",
        category: "pvm",
        desc: "Boss doğma süreleri, lokasyonları ve zamanlama bilgileri ile patron takibi.",
        included: true,
        image: "/assets/PatronBilgiSistemi.webp",
        seoTitle: "Boss Takip Sistemi - Patron Doğma Süreleri ve Lokasyonları",
        seoDescription: "Tüm bossların doğma süreleri, lokasyonları ve zamanlama bilgileri. 9 farklı boss takibi ve gerçek zamanlı güncellemeler.",
        features: [
            "9 farklı boss takibi",
            "Doğma süreleri ve zamanlama",
            "Lokasyon ve kanal bilgileri",
            "Seviye ve bölge bilgileri",
            "Gerçek zamanlı güncellemeler",
            "Boss model görüntüleme",
            "Zamanlama takvimi"
        ],
        longDescription: "Boss Bilgi ve Takip Sistemi, oyuncularınızın tüm bossların doğma sürelerini, lokasyonlarını ve zamanlama bilgilerini takip edebileceği kapsamlı bir platformdur. Sistem, Maymun Lordu, Ork Reisi, Karanlık Lider, Dev Çöl Kaplumbağası, Dokuz Kuyruk, Kraliçe Örümcek, Sarı Kaplan Hayaleti, Alev Kral ve Gölge Savaşçısı gibi 9 farklı bossu takip eder."
    },
    {
        id: 8,
        name: "Zindan Takip",
        category: "pvm",
        desc: "Zindan cooldown ve girenleri görme.",
        included: true,
        image: "/assets/arena.png",
        seoTitle: "Zindan Takip Sistemi - Dungeon Cooldown Takibi",
        seoDescription: "Zindan cooldown süreleri ve giren oyuncuları görüntüleme. Zindan istatistikleri ve takip sistemi.",
        features: [
            "Zindan cooldown takibi",
            "Giren oyuncu listesi",
            "Zindan istatistikleri"
        ],
        longDescription: "Zindan Takip sistemi, oyuncuların zindan cooldown sürelerini ve giren oyuncuları takip edebilmesini sağlar."
    },

    // QoL Systems
    {
        id: 9,
        name: "Biyolog Görev Sistemi",
        category: "qol",
        desc: "Gelişmiş biyolog görev sistemi ile oyuncularınız kolayca quest tamamlayabilir.",
        included: true,
        image: "/assets/Biyologpenceresi.webp",
        seoTitle: "Biyolog Görev Sistemi - Quest ve Ödül Sistemi",
        seoDescription: "Gelişmiş biyolog görev sistemi. Otomatik teslim, ödül takibi, mesaj bildirimleri ve daha fazlası.",
        features: [
            "Otomatik görev teslim etme",
            "Görev ödülü takibi",
            "Item toplama görevleri",
            "Mesaj yolu ile bildirim alma",
            "Hareket hızı ve diğer ödüller",
            "Görev durumu takibi"
        ],
        longDescription: "Biyolog Görev Sistemi, oyuncuların biyolog görevlerini kolayca tamamlayabileceği gelişmiş bir quest platformudur. Sistem, otomatik teslim, ödül takibi, item toplama görevleri ve mesaj bildirimleri gibi birçok özellik sunar."
    },
    {
        id: 10,
        name: "İşınlanma Yüzüğü",
        category: "qol",
        desc: "Oyuncuların harita üzerindeki tüm lokasyonlara hızlıca ışınlanabileceği teleport sistemi.",
        included: false,
        image: "/assets/Yenimapsistemi.webp",
        seoTitle: "İşınlanma Yüzüğü - Teleport ve Harita Navigasyon Sistemi",
        seoDescription: "Gelişmiş teleport sistemi. Tüm harita lokasyonlarına ışınlanma, metin bölgeleri, boss bölgeleri ve minimap özellikleri.",
        features: [
            "13 farklı bölgeye ışınlanma",
            "Metin bölgeleri filtreleme",
            "Boss bölgeleri filtreleme",
            "Detaylı harita görünümü",
            "Minimap entegrasyonu",
            "Lokasyon pin sistemi",
            "Bölge bazlı navigasyon"
        ],
        longDescription: "İşınlanma Yüzüğü, oyuncuların harita üzerindeki tüm lokasyonlara hızlıca ışınlanabileceği gelişmiş bir teleport sistemidir. Sistem, Jinno, Monkey Banana, Yongbi Desert, Land of Giants, Fireland, Orc Valley, Bakra, Red Wood, Hwang Temple, Mount Sohan, Ghostwood, Bokjung ve Chunjo gibi 13 farklı bölgeye ışınlanma imkanı sunar."
    },
    {
        id: 11,
        name: "Hızlı Menü Sistemi",
        category: "qol",
        desc: "Oyuncuların tüm önemli sistemlere tek tıkla erişebileceği hızlı menü.",
        included: true,
        image: "/assets/hızlımenü.webp",
        seoTitle: "Hızlı Menü - Quick Menu ve Hızlı Erişim Sistemi",
        seoDescription: "Tüm önemli sistemlere tek tıkla erişim. Oyuncu sıralaması, biyolog görevleri, otomatik sat, etkinlik takvimi ve daha fazlası.",
        features: [
            "9 farklı hızlı erişim butonu",
            "Oyuncu sıralaması",
            "Biyolog görevleri",
            "Otomatik sat",
            "Etkinlik takvimi",
            "Offline shop",
            "Patron takip",
            "Otomatik av",
            "İşınlanma yüzüğü",
            "Meydan okuma"
        ],
        longDescription: "Hızlı Menü Sistemi, oyuncuların tüm önemli sistemlere tek tıkla erişebileceği kullanıcı dostu bir platformdur. Sistem, oyuncu sıralaması, biyolog görevleri, otomatik sat, etkinlik takvimi, offline shop, patron takip, otomatik av, işınlanma yüzüğü ve meydan okuma gibi 9 farklı özelliğe hızlı erişim sağlar."
    },
    {
        id: 12,
        name: "Eşya Yönetim Sistemi",
        category: "qol",
        desc: "Toplu eşya silme ve satma sistemi ile envanter yönetimi.",
        included: true,
        image: "/assets/itemsilsat.webp",
        seoTitle: "Eşya Yönetim Sistemi - Item Sil ve Sat Sistemi",
        seoDescription: "Toplu eşya silme ve satma sistemi. Otomatik satış, efsunlu eşya koruması ve envanter yönetimi.",
        features: [
            "Toplu eşya silme",
            "Otomatik satış sistemi",
            "Efsunlu eşya koruması",
            "Item filtreleme",
            "Envanter yönetimi",
            "Güvenli silme onayı"
        ],
        longDescription: "Eşya Yönetim Sistemi, oyuncuların envanterlerindeki eşyaları toplu olarak silebileceği veya satabileceği bir platformdur. Sistem, otomatik satış, efsunlu eşya koruması ve güvenli silme onayı gibi özellikler sunar."
    },
    {
        id: 13,
        name: "Uzaktan NPC",
        category: "qol",
        desc: "Map farketmeksizin market açma.",
        included: true,
        image: "/assets/arena.png",
        seoTitle: "Uzaktan NPC - Remote NPC Erişim Sistemi",
        seoDescription: "Harita farketmeksizin NPC'lere uzaktan erişim. Market, envanter ve diğer NPC işlemleri.",
        features: [
            "Uzaktan market erişimi",
            "Harita bağımsız NPC erişimi",
            "Kolay envanter yönetimi"
        ],
        longDescription: "Uzaktan NPC sistemi, oyuncuların harita farketmeksizin NPC'lere erişebilmesini sağlar."
    },
    {
        id: 14,
        name: "Toplu Sandık",
        category: "qol",
        desc: "Tek seferde binlerce sandık açımı.",
        included: true,
        image: "/assets/arena.png",
        seoTitle: "Toplu Sandık Açma - Bulk Chest Opening System",
        seoDescription: "Tek seferde binlerce sandık açma sistemi. Hızlı ve otomatik sandık açımı.",
        features: [
            "Toplu sandık açımı",
            "Otomatik açma",
            "Hızlı işlem"
        ],
        longDescription: "Toplu Sandık sistemi, oyuncuların tek seferde binlerce sandık açabilmesini sağlar."
    },

    // Event Systems
    {
        id: 15,
        name: "Etkinlik Takvimi",
        category: "event",
        desc: "Aylık etkinlik takvimi ile oyuncularınız tüm etkinlikleri takip edebilir.",
        included: true,
        image: "/assets/etkinliktakvimi.webp",
        seoTitle: "Etkinlik Takvimi - Event Calendar ve Etkinlik Yönetimi",
        seoDescription: "Aylık etkinlik takvimi sistemi. Tüm etkinlikleri görüntüleme, tarih takibi ve server time entegrasyonu.",
        features: [
            "Aylık etkinlik takvimi",
            "Server time entegrasyonu",
            "Etkinlik türleri (gold event, futbol event vb.)",
            "Tarih bazlı etkinlik gösterimi",
            "Geçmiş ve gelecek etkinlikler",
            "Etkinlik detayları"
        ],
        longDescription: "Etkinlik Takvimi, oyuncuların aylık etkinlikleri takip edebileceği kapsamlı bir platformdur. Sistem, server time'a göre çalışır ve tüm etkinlikleri tarih bazlı olarak gösterir. Gold event, futbol event gibi farklı etkinlik türleri desteklenir."
    },
    {
        id: 16,
        name: "Vote4Buff Sistemi",
        category: "event",
        desc: "Oyuncuların oy vererek buff kazanabileceği vote sistemi.",
        included: false,
        image: "/assets/Vote4buff.webp",
        seoTitle: "Vote4Buff - Oy Verme ve Buff Sistemi",
        seoDescription: "Oyuncuların oy vererek özel bufflar kazanabileceği vote sistemi. Max HP, canavar gücü ve hayvan gücü buffları.",
        features: [
            "Oy verme sistemi",
            "Max HP +2000 buff",
            "Canavarlara karşı güç +20",
            "Hayvanlara karşı güç +20",
            "Vote durumu takibi",
            "Ödül sistemi"
        ],
        longDescription: "Vote4Buff Sistemi, oyuncuların oy vererek özel bufflar kazanabileceği bir platformdur. Sistem, Max HP +2000, canavarlara karşı güç +20 ve hayvanlara karşı güç +20 gibi farklı buff seçenekleri sunar."
    },
    {
        id: 17,
        name: "Power Bar Rewards",
        category: "event",
        desc: "Seviye bazlı ödül çarkı sistemi ile oyuncularınız ödüller kazanabilir.",
        included: false,
        image: "/assets/Jackpotsistemi.webp",
        seoTitle: "Power Bar Rewards - Seviye Bazlı Ödül Çarkı Sistemi",
        seoDescription: "Seviye bazlı ödül çarkı sistemi. Level range seçimi, jackpot ödülleri ve spin mekanizması.",
        features: [
            "Seviye bazlı ödül sistemi",
            "Level range seçimi (1-25, 26-50 vb.)",
            "20 farklı ödül slotu",
            "Jackpot ödül sistemi",
            "Spin mekanizması (5/15 progress)",
            "Ödül görüntüleme"
        ],
        longDescription: "Power Bar Rewards, oyuncuların seviyelerine göre ödül çarkı çevirebileceği bir sistemdir. Sistem, farklı level range'lerde çalışır ve 20 farklı ödül slotu sunar. Jackpot ödülü ile özel ödüller kazanılabilir."
    },
    {
        id: 18,
        name: "Çark Sistemi",
        category: "event",
        desc: "Bronze coin ile çark çevirme ve ödül kazanma sistemi.",
        included: false,
        image: "/assets/Carksistemi.webp",
        seoTitle: "Çark Sistemi - Wheel System ve Ödül Çarkı",
        seoDescription: "Bronze coin ile çark çevirme sistemi. 8 segmentli ödül çarkı, animasyon atlama ve geniş ödül havuzu.",
        features: [
            "8 segmentli ödül çarkı",
            "Bronze coin ile çevirme",
            "x1, x3, x5 çevirme seçenekleri",
            "Animasyon atlama özelliği",
            "Geniş ödül havuzu",
            "Ödül görüntüleme sistemi"
        ],
        longDescription: "Çark Sistemi, oyuncuların bronze coin kullanarak ödül çarkı çevirebileceği bir platformdur. Sistem, 8 segmentli bir çark sunar ve potion, book, pearl gibi birçok farklı ödül türü içerir. Oyuncular x1, x3 veya x5 çevirme yapabilirler."
    },
    {
        id: 19,
        name: "Fırsat Penceresi",
        category: "economy",
        desc: "Sınırlı süreli özel teklifler ve fırsatlar sistemi.",
        included: false,
        image: "/assets/Fırsatpenceresi.webp",
        seoTitle: "Fırsat Penceresi - Limited Time Offers ve Özel Teklifler",
        seoDescription: "Sınırlı süreli özel teklifler ve fırsatlar. İndirimli EP paketleri, özel item setleri ve zamanlı teklifler.",
        features: [
            "Sınırlı süreli teklifler",
            "İndirimli EP paketleri",
            "Özel item setleri",
            "Teklif süresi takibi",
            "12 item slotlu ödül sistemi",
            "Otomatik süre dolumu bildirimi"
        ],
        longDescription: "Fırsat Penceresi, oyunculara sınırlı süreli özel teklifler sunan bir platformdur. Sistem, indirimli EP paketleri (örneğin 180 EP yerine 150 EP), özel item setleri ve zamanlı teklifler sunar. Tekliflerin süresi dolduğunda otomatik bildirim gösterilir."
    },

]
