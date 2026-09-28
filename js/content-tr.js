/* Bismillah */

/*

bug7a.github.io/tr/ - Sayfanın Türkçe içeriği. (tr/index.html)
- js/site.js'den önce yüklenir. İngilizce sayfa (index.html) js/content-en.js'i yükler: aynı anahtarlar.
- Resimlerin yolları sitenin köküne göredir. (tr/index.html'de <base href="../"> var.)
- Müşterilere "siz" diye yazılır. İstanbul, müşterilerin yeri olarak yazılır, yaşanan yer olarak değil
  (iş uzaktan yapılıyor): "İstanbul'daki müşteriler", asla "İstanbul'da yaşıyorum".

*/

"use strict";

// *** SITE CONTENT: (Sayfa burada düzenlenir.)
const SITE = {

    lang: "tr",
    // Diğer dildeki sayfanın bağlantısı (üst çubuk). url: sitenin köküne göre.
    otherLanguage: { code: "en", text: "EN", title: "English", url: "./" },

    name: "Buğra Özden",
    role: "Freelance Web ve Uygulama Geliştirici",

    // Hero'da birbiri ardına yazılan kelimeler.
    focusPrefix: "Uzmanlığım:",
    focus: ["interaktif web uygulamaları", "özel yönetim panelleri", "dashboard'lar", "gelişmiş web formları"],

    accounts: [
        { text: "GitHub", url: "https://github.com/bug7a/" },
        { text: "LinkedIn", url: "https://www.linkedin.com/in/bugra-ozden/" },
        { text: "YouTube", url: "https://www.youtube.com/c/bugraozden" },
        { text: "Udemy", url: "https://www.udemy.com/user/bugra-ozden/" },
    ],

    services: [
        {
            title: "Özel Yönetim Panelleri ve Dashboard'lar",
            texts: [
                "İşletmenize özel bir yönetim paneli: siparişler, müşteriler, ürünler, raporlar ve cihazlardan gelen canlı veriler tek ekranda. Yalnızca ihtiyacınız olan sayfalar, sizin renklerinizle.",
                "Grafikler, veri tabloları, filtreler ve dışa aktarma hazır; yeni modüller, paneli baştan yazmadan sonradan eklenebilir. Tarayıcıda çalışır, kurulum gerektirmez.",
            ],
            images: ["img/service-admin1.jpg", "img/service-admin2.jpg", "img/service-admin3.jpg", "img/service-admin4.jpg"],
            links: [
                { text: "İnternet Sitesi", url: "https://bug7a.github.io/admin-panel", primary: 1 },
                { text: "Canlı örnek", url: "https://bug7a.github.io/admin-panel-example" },
            ],
        },
        {
            title: "Gelişmiş Web Formları",
            texts: [
                "Yalnızca yazı toplamaktan fazlasını yapan formlar: randevu, sipariş, etkinlik bileti, iş başvurusu, destek talebi ve müşteri geri bildirimi.",
                "Ziyaretçi yazarken her alan kendini kontrol eder, gönder düğmesi neyin eksik olduğunu gösterir. Cevaplar e-postanıza ya da veritabanınıza gelir ve form her web sitesine yerleştirilebilir.",
            ],
            images: ["img/service-form1.jpg", "img/service-form2.jpg", "img/service-form3.jpg", "img/service-form4.jpg"],
            links: [
                { text: "İnternet Sitesi", url: "https://bug7a.github.io/web-forms", primary: 1 },
                { text: "Canlı örnek", section: "contact" }, // Bu sayfanın altındaki iletişim formu
            ],
        },
        {
            title: "easyPWA",
            hidden: 1, // ŞİMDİLİK GİZLİ: tekrar göstermek için bu satırı silin.
            texts: [
                "Web sitenizi ya da web uygulamanızı, App Store veya Google Play olmadan telefonlara ve bilgisayarlara kurulabilen bir uygulamaya dönüştürür.",
                "Ana ekrandan tarayıcı çubuğu olmadan açılır, kendi yükleme ekranınızı gösterir ve internet bağlantısı olmadığında kullanıcıya haber verir. Siteyi güncellediğinizde uygulama da güncellenir.",
            ],
            images: [],
            // Resim yok: bu kutucuklar galerinin yerine çizilir. (ikonlar: site.js içinde Site.FEATURE_ICONS)
            features: [
                { icon: "install", text: "Uygulama mağazası olmadan telefonlara ve bilgisayarlara kurulur" },
                { icon: "offline", text: "İnternet yokken anlaşılır bir sayfa veya çevrimdışı çalışan bir site" },
                { icon: "launch", text: "Kendi açılış ekranınız, ikonunuz ve renkleriniz" },
                { icon: "banner", text: "Yükleme banner'ı veya kendi yükleme butonunuz" },
                { icon: "file", text: "Sitenize eklenen tek dosya, kütüphane yok" },
                { icon: "update", text: "Sitenizle birlikte güncellenir, yeniden yayınlamak gerekmez" },
            ],
            links: [
                { text: "Canlı örnek", url: "https://bug7a.github.io/pwa/", primary: 1 },
            ],
        },
    ],

    projects: [
        {
            title: "Kodlama: Kod Yazma Eğitimi",
            texts: [
                "Bu eğitim uygulaması; çocuklara, gerçek bir programlama dili (JavaScript) kullanarak, algoritma geliştirme ve problem çözme deneyimi kazandırmak için tasarlanmıştır.",
                "Eğlenceli ve daha akılda kalıcı olması için; bulmaca oyunu tarzında simülasyonlar ile, yazılım geliştirmenin temellerini öğretir.",
            ],
            video: "https://www.youtube.com/embed/tP0VKKtMyPE",
            images: [],
            links: [
                { text: "İnternet Sitesi", url: "https://bug7a.github.io/kodlama/", primary: 1 },
                { text: "Eğitim", url: "https://bug7a.github.io/kodlama-egitimi/" },
                { text: "Örnek Projeler", url: "https://github.com/bug7a/basicjs-turkce/" },
            ],
        },
        {
            title: "The Fallen Kingdoms",
            texts: [
                "Sıra tabanlı strateji ile kart seçme (card-drafting) mekaniklerini birleştiren, arkadaşlarla keyifli vakit geçirmek için yepyeni bir kutu oyunu! Krallığını kur, rakiplerini yen ve tahtı ele geçir!",
                "Bir parti oyunudur ve Steam'de <b>\"Remote Play Together\"</b> özelliğini destekler.",
            ],
            images: ["img/s1.jpg", "img/s5.jpg", "img/s7.jpg", "img/s2.jpg"],
            links: [
                { text: "Steam'de gör", url: "https://store.steampowered.com/app/2923920?utm_source=bugraozden", primary: 1 },
            ],
        },
        {
            title: "Kişisel Harcama Defteri",
            texts: [
                "Bir bütçe belirleyin ve harcamalarınızı kategorilere göre takip edin.",
                "Bu mobil uygulama; sadelik, işlevsellik ve hızlı kullanım düşünülerek tasarlandı.",
            ],
            images: ["img/expense.jpg"],
            links: [
                { text: "Önizleme", url: "https://bug7a.github.io/expense/", primary: 1 },
            ],
        },
        {
            title: "Closed-Loop Marketing",
            texts: [
                "İlaç firmalarının saha ekipleri için geliştirdiğim mobil (iOS) CLM (Closed-Loop Marketing) uygulaması. Roche, Novo Nordisk ve Boehringer Ingelheim'da 500'den fazla tıbbi temsilci, doktor ziyaretlerinde bu uygulamayı kullandı.",
                "Doktorlara yapılan sunumlar, ziyaret verileri ve temsilcilerin eğitimleri tek bir uygulamada toplanır.",
            ],
            images: ["img/clm1.jpg", "img/clm2.jpg", "img/mobile4.jpg", "img/mobile2.jpg", "img/mobile13.jpg", "img/mobile6.jpg", "img/mobile9.jpg"],
            links: [],
        },
    ],

    // WHY: İlk ikisi büyük çizilir. Geri kalanların sayısı 12 / 4 / 3 / 2 sütunun katı olsun (12).
    moreProjects: [
        { text: "Mobil Uygulama", image: "img/notes.jpg" },
        { text: "Mobil Oyunlar", image: "img/mobile-game.jpg" },
        { text: "Uygulama içerik yönetimi", image: "img/telefun5.jpg" },
        { text: "Yeniden kullanılabilir bileşenler", image: "img/components.jpg", url: "https://bug7a.github.io/cordova-mobile-app-ui-template/" },
        { text: "API geliştirme", image: "img/component.jpg", url: "https://azimutportfoy.com/fon/lzv/" },
        { text: "Kiosk Uygulaması", image: "img/mob1.jpg" },
        { text: "Mobil uygulama içerik yönetimi", image: "img/admin1.jpg" },
        { text: "İnteraktif web", image: "img/table.jpg" },
        { text: "Anket modülü", image: "img/ekr.jpg" },
        { text: "Uygulama içi mesajlaşma modülü", image: "img/message.jpg" },
        { text: "Uygulama içi arama modülü", image: "img/novokampus.jpg" },
        { text: "Kendini güncelleyen web sitesi", image: "img/tvshows1.jpg" },
        { text: "Mobil Oyun", image: "img/mobile-game2.jpg" },
        { text: "Masaüstü uygulamaları", image: "img/desktop.jpg" },
    ],

    openSource: [
        { text: "basic.js — Arayüz Kütüphanesi", image: "img/logo/basicjs.svg", url: "https://bug7a.github.io/basic.js/" },
        { text: "basic.js — Arayüz Bileşenleri", image: "img/logo/basicui.svg", url: "https://bug7a.github.io/js-components/" },
        { text: "basic.js — Şablonlar", image: "img/logo/basicjs-templates.svg", url: "https://github.com/bug7a/js-components" },
    ],

    // WHY: Adres bir resimdir ve kodla birleştirilir, böylece spam robotları okuyamaz.
    emailImage: "img/email.png",
    emailUser: "bugra.ozden",
    emailHost: "gmail.com",

    contactTitle: "Aklınızda bir proje mi var?",
    contactText: "İhtiyacınızı formla anlatın ya da doğrudan bana yazın. En kısa sürede dönüş yapacağım.<br><br>İstanbul'daki, Türkiye genelindeki ve yurt dışındaki müşterilerle uzaktan çalışıyorum.",

    // CONTACT FORM: Mail servisine JSON olarak gönderilir. (İngilizce sayfayla aynı servis)
    formServiceUrl: "https://www.hostelchillsteps.com/service/send-form-mail.php",
    formName: "website-contact-tr",     // Hangi form? (Mail servisi yazar.)
    formMailTitle: "Web Sitesi İletişim Formu (TR)", // Mailin en üstündeki başlık.
    formTimeout: 15000,                 // ms

    // İletişim formunda, konunun üstünde bir soru: mesaj ne hakkında? (Radio button)
    contactTopicTitle: "NE HAKKINDA?",
    contactTopics: [
        { value: "admin-panel", text: "Yönetim paneli veya dashboard" },
        { value: "web-form", text: "Gelişmiş web formu" },
        { value: "pwa", text: "Kurulabilir uygulama (PWA)", hidden: 1 }, // ŞİMDİLİK GİZLİ: tekrar göstermek için "hidden: 1"i silin.
        { value: "other", text: "Başka bir konu" },
    ],
    contactTopicDefault: "other",       // Form açılınca (ve gönderildikten sonra) seçili olan

    footerText: "basic.js ile yazıldı",
    footerUrl: "https://bug7a.github.io/basic.js/",

    // *** SAYFANIN YAZILARI: (Düğmeler, başlıklar, iletişim formu...)
    ui: {
        navServices: "Hizmetler",
        navProjects: "Projeler",
        navOpenSource: "Açık Kaynak",
        navContact: "İletişim",
        heroServicesButton: "Hizmetleri gör",
        heroContactButton: "İletişime geçin",

        services: "Hizmetler",
        projects: "Projeler",
        moreProjects: "Diğer Projeler",
        openSource: "Açık Kaynak",
        contact: "İletişim",

        emailCardTitle: "E-POSTA",
        emailAlt: "E-posta adresi",
        videoTitle: "Video",
        backToTop: "Yukarı dön ↑",

        form: {
            firstName: "ADINIZ",
            firstNamePlaceholder: "Ahmet",
            lastName: "SOYADINIZ",
            lastNamePlaceholder: "Yılmaz",
            email: "E-POSTA ADRESİNİZ",
            emailPlaceholder: "ornek@site.com",
            emailWarning: "Geçersiz e-posta adresi",
            phone: "TELEFON NUMARASI",
            phoneWarning: "Geçersiz telefon numarası",
            subject: "KONU",
            subjectPlaceholder: "Mesajınız ne hakkında?",
            message: "MESAJINIZ",
            messagePlaceholder: "Projenizi anlatın: neye ihtiyacınız var, ne zaman?",
            messageWarning: "Mesaj 20 karakterden uzun olmalı",
            lengthText: "uzunluk: ",
            required: "Zorunlu",
            sendButton: "MESAJI GÖNDER",
            missingEntry: "{{count}} eksik alan",
            missingEntries: "{{count}} eksik alan",
            emptyWarning: "<b>{{name}}</b> boş olamaz",
            errorWarning: "<b>{{name}}</b> geçerli değil",
            passiveHint: "Mesajı göndermek için eksik alanları doldurun.",
            successMessage: "Teşekkürler, mesajınız gönderildi.<br>En kısa sürede dönüş yapacağım.",
            successButton: "TAMAM",
            errorMessage: "Mesaj gönderilemedi.<br>Lütfen tekrar deneyin ya da e-posta gönderin.",
            errorButton: "KAPAT",
        },

        // Mailde alanların başlıkları
        mail: {
            firstName: "AD",
            lastName: "SOYAD",
            email: "E-POSTA",
            phone: "TELEFON",
            topic: "KONU BAŞLIĞI",
            subject: "KONU",
            message: "MESAJ",
        },
    },

};
