/* Bismillah */

/*

Web Admin Panel - Site Texts (TR / EN) - v26.09

- Sitedeki bütün metinler burada. Sayfayı düzenlemek için buradan başlayın.
- All site copy lives here. Start here to edit the page.

Developer: Bugra Ozden
Email: bugra.ozden@gmail.com

*/

"use strict";

const TEXTS = {};

// *** TÜRKÇE:
TEXTS.tr = {

    langName: "TR",
    otherLangName: "EN",
    htmlLang: "tr",

    // SEO:
    pageTitle: "Rapor Ekranı ve Yönetim Paneli Geliştirme | Buğra Özden",
    pageDescription: "Veri tabanınızdan güncel raporlar, uygulamanız için yönetim paneli veya işinize özel ekran. Hazır altyapıyla hızlı, sabit fiyat; kaynak kodu ve veriniz sizde.",
    pageKeywords: "rapor ekranı, rapor paneli, raporlama ekranı, logo rapor, mikro rapor, erp raporlama, veri tabanı raporlama, yönetim paneli, admin panel, uygulama yönetim paneli, özel modül geliştirme, dashboard geliştirme, excel yerine panel, açık kaynak admin panel",

    // MENU:
    menu: {
        services: "Hizmetler",
        features: "Özellikler",
        demo: "Demo",
        pricing: "Fiyatlar",
        openSource: "Açık Kaynak",
        faq: "SSS",
        contact: "İletişim",
        cta: "Teklif Alın",
        open: "Menü",
        close: "Kapat",
    },

    // HERO:
    hero: {
        eyebrow: "RAPOR EKRANLARI VE YÖNETİM PANELİ",
        title: "Size özel panel, hazır altyapı hızıyla.",
        lead: "Verilerinizden güncel raporlar, uygulamanız için içerik yönetimi veya işinize özel bir ekran. Hazır bir panel altyapısı üzerine kurduğumuz için hızlı ve sabit fiyatla teslim ediyoruz. Panel kendi sunucunuzda çalışır; kaynak kodu da veriniz de sizde kalır.",
        primaryButton: "Teklif Alın",
        secondaryButton: "Canlı Demoyu Görün",
        note: "Açık kaynak sürümü ücretsiz indirilebilir · Apache 2.0",
        // Ekran görüntüleri (hero.js SCREEN_FILES ile aynı sırada). {screen}: ekranın adı.
        screens: ["Dashboard", "Satış raporu", "Siparişler", "Soğuk oda izleme", "Enerji merkezi"],
        screenCaption: "{screen} · Canlı demodan gerçek ekran görüntüsü",
    },

    // STATS:
    stats: [
        { value: "2–4 hafta", label: "tipik teslim süresi" },
        { value: "Sabit fiyat", label: "teklifte yazılı, sürpriz yok" },
        { value: "%100", label: "kaynak kodu sizde" },
        { value: "₺0", label: "lisans veya abonelik ücreti" },
    ],

    // SERVICES:
    services: {
        eyebrow: "NE YAPIYORUZ",
        title: "Aynı altyapı, üç farklı ihtiyaç",
        lead: "Hazır şablon satmıyoruz: ekranlar sizin işinize göre hazırlanır. Altyapı hazır olduğu için de sıfırdan yazılan bir yazılımdan çok daha hızlı teslim edilir.",
        items: [
            {
                icon: "assets/icons/reports.png",
                title: "Verilerinizden güncel raporlar",
                text: "Veriniz nerede duruyorsa oradan okuyoruz: Logo, Mikro gibi bir muhasebe programı, ERP'niz ya da size özel yazılmış bir sistem. Satış, stok, üretim veya servis rakamları güncel tablo ve grafiklerle tek ekranda. Programınız olduğu gibi kalır.",
                points: ["Logo, Mikro veya kendi veri tabanınız", "Tablo ve grafik raporları", "Aylık abonelik veya BI lisansı yok"],
            },
            {
                icon: "assets/icons/dashboard.png",
                title: "Uygulamanız için yönetim paneli",
                text: "Mobil veya web uygulamanızın kullanıcılarını, içeriğini, bildirimlerini ve ayarlarını tek yerden yönetin. Sade bir panel yaklaşık iki haftada hazır.",
                points: ["Kullanıcı ve içerik yönetimi", "Bildirim gönderme", "Rol ve yetkilendirme"],
            },
            {
                icon: "assets/icons/brick.png",
                title: "İşinize özel ekran veya modül",
                text: "Hazır yazılıma sığmayan bir iş için ekran: soğuk oda veya üretim hattını canlı izlemek, ekibinize özel bir iç araç ya da çalışan sisteminize yeni bir modül. Mevcut kodunuza dokunmadan yanında çalışır.",
                points: ["Cihaz ve sensör verisini canlı izleme", "Ekibinize özel iç araçlar", "Mevcut sisteme yeni modül"],
            },
        ],
    },

    // FEATURES:
    features: {
        eyebrow: "ÖZELLİKLER",
        title: "Hazır altyapıda neler var?",
        lead: "Aşağıdakiler her panelde hazır gelir; sıfırdan yazılmadıkları için süreye ve fiyata eklenmez. Sizin için yazılan kısım, işinize özel ekranlarınızdır.",
        items: [
            { icon: "assets/icons/reports.png", title: "Grafik ve raporlar", text: "Tarih aralığı, filtre, önceki dönemle karşılaştırma, tablo ve grafik; her rapor tek tıkla Excel'e aktarılır." },
            { icon: "assets/icons/url.png", title: "Mevcut verinize bağlanır", text: "Logo, Mikro gibi bir programın veri tabanı, SQL sunucunuz, Supabase veya bir API. Veri bizim sunucumuzdan geçmez." },
            { icon: "assets/icons/bolt.png", title: "Hafif, hızlı, telefonda da açılır", text: "Harici bağımlılık yok, dosyalar küçük; panel hemen açılır, telefonda da çalışır. Güncellemeler paneli bozmaz, bakım masrafı düşük kalır." },
            { icon: "assets/icons/extension.png", title: "Modüler yapı", text: "Her modül bağımsız bir sayfa. Yeni bir modül eklemek, çalışan hiçbir şeyi yeniden yazmayı gerektirmez." },
            { icon: "assets/icons/data-table.png", title: "Tabloda düzenleme", text: "Kayıtları tablo hâlinde görün, hücreye tıklayıp düzenleyin; filtreleyin, arayın, Excel'e aktarın." },
            { icon: "assets/icons/user.png", title: "Giriş ve yetkiler", text: "E-posta ve şifre ile giriş. Kimin hangi ekranı göreceğine ve neyi değiştirebileceğine siz karar verirsiniz." },
            { icon: "assets/icons/light.png", title: "Markanıza göre tema", text: "Renk, logo, yazı tipi ve koyu tema; panel sizin ya da müşterinizin markasıyla uyumlu görünür." },
            { icon: "assets/icons/apps.png", title: "Türkçe arayüz", text: "Menüler, uyarılar, tarih ve para biçimleri Türkçe. İhtiyaç varsa İngilizce veya başka dillerde de." },
        ],
    },

    // USE CASES:
    useCases: {
        eyebrow: "KİMLER İÇİN",
        title: "Panel kimin işine yarar?",
        lead: "",
        items: [
            { title: "Şirket sahipleri ve yöneticiler", text: "Rakamları görmek için birinin Excel hazırlamasını mı bekliyorsunuz? Veriniz ister muhasebe programında ister size özel bir yazılımda olsun, istediğiniz raporu güncel olarak, telefonunuzda da önünüze getiriyoruz." },
            { title: "Mobil uygulama stüdyoları", text: "Uygulama hazır ama arkasında bir yönetim ekranı yok. Ekibinizi panel yazmaya ayırmak yerine bu işi dışarıdan alın, siz ürününüze odaklanın." },
            { title: "Reklam ajansları", text: "Müşteriniz için uygulama veya site yaptınız, içeriği kendisi yönetsin istiyorsunuz. Paneli sizin markanızla (white-label) teslim ediyoruz; siz de müşterinize kendi işiniz olarak sunuyorsunuz." },
            { title: "Kendi yazılımı olan şirketler", text: "Yazılımınız çalışıyor ama yeni bir rapor ekranı ya da ekibiniz için bir iç araç gerekiyor ve geliştiricileriniz yoğun. Modülü biz geliştirip sisteminize ekliyoruz; çalışan kodunuza dokunmadan." },
        ],
    },

    // PROCESS:
    process: {
        eyebrow: "NASIL İLERLİYOR",
        title: "Dört adımda teslim",
        lead: "",
        items: [
            { step: "01", title: "Keşif görüşmesi", text: "Hangi verinin, kim tarafından, hangi ekranda yönetileceğini konuşuyoruz.", time: "1. gün" },
            { step: "02", title: "Ekran planı ve teklif", text: "Modül listesi, ekran taslakları, sabit fiyat ve teslim tarihi. Siz onaylamadan başlamıyoruz.", time: "2–3 gün" },
            { step: "03", title: "Geliştirme", text: "Her hafta çalışan bir sürümü birlikte inceliyoruz. Panel kendi sunucunuzda, kendi verinizle kurulur.", time: "2–4 hafta" },
            { step: "04", title: "Teslim ve destek", text: "Kaynak kodu, kurulum dokümanı ve kullanım eğitimi. Ardından işin kapsamına göre 1–3 ay ücretsiz düzeltme desteği.", time: "Teslim" },
        ],
    },

    // DEMO:
    demo: {
        eyebrow: "CANLI DEMO",
        title: "Panele kendiniz göz atın",
        lead: "Aşağıdaki, gerçek panelin çalışan bir kopyası. Giriş bilgileri hazır gelir; <b>Giriş yap</b> demeniz yeterli. Sol menüden modüller arasında dolaşabilir, tabloda kayıt düzenleyebilirsiniz.",
        frameTitle: "Gerçek panel, bu çerçevenin içinde açılır",
        startButton: "Demoyu Başlat",
        newTabButton: "Yeni Sekmede Aç",
        loadingText: "Panel yükleniyor...",
        mobileWarning: "", // Telefonda demonun altında gösterilir. "": gösterilmez (panel mobil uyumlu).
    },

    // PRICING:
    pricing: {
        eyebrow: "FİYATLAR",
        title: "Net kapsam, sabit fiyat",
        lead: "Saatlik değil, iş bazlı çalışıyoruz. Aşağıdakiler başlangıç fiyatlarıdır; kapsamı birlikte netleştiririz ve teklifte yazan fiyat iş sırasında değişmez.",
        popularLabel: "Önerilen",
        fromLabel: "başlangıç",
        items: [
            {
                name: "Açık Kaynak",
                price: "Ücretsiz",
                priceNote: "Apache 2.0",
                text: "Panelin iskeletini indirin, kendiniz kurun.",
                points: ["Tam kaynak kodu", "Modüler iskelet", "Örnek sayfalar ve bileşenler", "GitHub üzerinden destek"],
                button: "GitHub'dan İndir",
                action: "download",
                packageIndex: 4,
                highlight: 0,
            },
            {
                name: "Başlangıç",
                price: "₺45.000",
                priceNote: "başlangıç fiyatı",
                text: "Tek bir uygulamanın yönetimi için sade bir panel.",
                points: ["1 modül, 3 veri tablosuna kadar", "Giriş ekranı ve kullanıcı yönetimi", "Temel tema uyarlaması", "2 hafta teslim", "1 ay ücretsiz düzeltme desteği"],
                button: "Teklif Alın",
                action: "contact",
                packageIndex: 1,
                highlight: 0,
            },
            {
                name: "Profesyonel",
                price: "₺95.000",
                priceNote: "başlangıç fiyatı",
                text: "Birden çok modül, roller ve raporlarla tam panel.",
                points: ["5 modüle kadar", "Rol ve yetkilendirme", "Dashboard ve rapor ekranları", "Markanıza özel tema", "Mevcut veri tabanı / API bağlantısı", "3 ay ücretsiz düzeltme desteği"],
                button: "Teklif Alın",
                action: "contact",
                packageIndex: 2,
                highlight: 1,
            },
            {
                name: "Kurumsal",
                price: "Özel",
                priceNote: "görüşmeye göre",
                text: "Sınırsız modül, özel entegrasyon ve sürekli geliştirme.",
                points: ["Sınırsız modül", "Özel entegrasyonlar", "Kendi markanızla (white-label) teslim", "Ekip eğitimi", "Sözleşmeli destek (SLA)"],
                button: "Görüşme Ayarlayın",
                action: "contact",
                packageIndex: 3,
                highlight: 0,
            },
        ],
        footNote: "Fiyatlar KDV hariçtir ve proje kapsamına göre teklifte netleşir.",
    },

    // OPEN SOURCE:
    openSource: {
        eyebrow: "AÇIK KAYNAK",
        title: "İsterseniz kendiniz kurun",
        lead: "Panelin iskeleti Apache 2.0 lisansı ile açık kaynak. İndirin, inceleyin, ticari projelerinizde kullanın. Yardıma ihtiyacınız olursa buradayız.",
        points: [
            "Panel iskeleti: sol menü, üst bar, modül sistemi, giriş ekranı",
            "40'tan fazla hazır arayüz bileşeni",
            "Örnek sayfalar, şablonlar ve el kitabı",
            "Ticari kullanıma açık, lisans ve telif bildirimini korumanız yeterli",
        ],
        primaryButton: "GitHub'da İncele",
        secondaryButton: "El Kitabını Aç",
    },

    // FAQ:
    faq: {
        eyebrow: "SIKÇA SORULANLAR",
        title: "Merak edilenler",
        items: [
            { q: "\"Hazır altyapı\" panelimizin bir şablon olacağı anlamına mı geliyor?", a: "Hayır. Hazır olan; giriş, menü, tablo, grafik ve yetki gibi her panelde tekrar eden temel parçalar. Ekranlarınız, raporlarınız ve iş akışınız sizin işinize göre hazırlanır. Temeli yeniden yazmadığımız için süre kısalır ve fiyatı baştan sabitleyebiliyoruz." },
            { q: "Verilerimiz Logo, Mikro veya kendi yazılımımızda. Panel bağlanabilir mi?", a: "Evet. Panel, veriyi nereden aldığından bağımsız çalışır: SQL sunucunuz, Supabase, Firebase veya bir API. Logo, Mikro gibi bir ERP'nin ya da size özel yazılmış bir programın veri tabanından da rapor hazırlarız. Tablo yapısını keşif görüşmesinde birlikte inceliyoruz." },
            { q: "Ne kadar sürede teslim ediliyor?", a: "Tek modüllü sade bir panel yaklaşık 2 hafta, çok modüllü ve raporlu bir panel 3–4 hafta sürer. Teslim tarihi teklifte yazılı olarak belirlenir." },
            { q: "Mevcut sistemimize yeni modül eklenebilir mi?", a: "Evet. Paneliniz bu altyapıyla kuruluysa modül doğrudan eklenir. Değilse modülü bağımsız bir sayfa olarak geliştirip sisteminizin içine yerleştiriyoruz; çalışan kodunuza dokunmadan." },
            { q: "Panel mobilde çalışıyor mu?", a: "Evet. Panel bilgisayarda, tablette ve telefonda çalışır; ekran küçüldüğünde menüler ve tablolar ekrana göre yerleşir. Rapor ekranlarını da yöneticilerin telefondan rahatça bakabileceği şekilde hazırlıyoruz." },
            { q: "Kaynak kodu bizde mi kalıyor?", a: "Evet. Teslimde kodun tamamı size geçer; istediğiniz gibi değiştirir, dilediğiniz sunucuda çalıştırırsınız. Abonelik veya lisans kilidi yok, başka bir yazılımcıyla da devam edebilirsiniz." },
            { q: "Teslimden sonra ücret ödeyecek miyiz?", a: "Hayır, aylık abonelik yok. Hazır rapor programlarının aksine bir kez ödersiniz ve panel sizin olur. Teslimle gelen ücretsiz düzeltme süresinden sonra yeni modül, değişiklik veya bakım isterseniz ayrıca teklif veriyoruz. Sunucu ve veri servisi masrafları varsa doğrudan sizin hesabınızdan ödenir." },
            { q: "KVKK açısından verilerimiz nerede duruyor?", a: "Panel sizin sunucunuzda çalışır ve verilerinize doğrudan sizin altyapınızdan erişir; veriler bizim sunucularımızdan geçmez. Kimin hangi veriyi görebileceği kullanıcı yetkileriyle sınırlanır. Aydınlatma metni, VERBİS kaydı gibi KVKK yükümlülükleri veri sorumlusu olarak işletmenize aittir; bu konuda hukuki danışmanlık vermiyoruz." },
            { q: "Sunucumuz yok, ne yapmalıyız?", a: "Panel sade dosyalardan oluştuğu için neredeyse her hosting hizmetinde çalışır. Veri tarafı için Supabase gibi hazır bir servis veya Türkiye'deki bir sunucu kullanılabilir; size uygun seçeneği keşif görüşmesinde birlikte belirliyoruz." },
            { q: "Excel'deki verilerimizi panele aktarabilir miyiz?", a: "Evet. Mevcut Excel veya CSV dosyalarınız ilk kurulumda panele aktarılabilir. İhtiyacınız varsa panele kalıcı bir içe ve dışa aktarma ekranı da eklenir." },
            { q: "Kendi markamızla (white-label) teslim yapıyor musunuz?", a: "Evet. Ajansların sık tercih ettiği bir yöntem: panel sizin markanızla teslim edilir, biz görünmeyiz." },
            { q: "Panel hangi teknolojiyle yazılıyor?", a: "Saf JavaScript ile. Arayüz, basic.js adlı küçük ve bağımsız bir kütüphane ile çiziliyor. React, Vue veya Angular gibi bir framework, derleme adımı veya paket yöneticisi yok. Bu yüzden panel küçük kalıyor, yıllar sonra da aynı şekilde çalışıyor ve JavaScript bilen her yazılımcı üzerinde çalışabiliyor." },
            { q: "Açık kaynak sürümle ne yapabilirim?", a: "Apache 2.0 lisansı ticari kullanıma izin verir; indirip kendi veya müşteri projelerinizde kullanabilirsiniz. Kurulum ve özelleştirme desteği isterseniz bize yazın." },
        ],
    },

    // CONTACT:
    contact: {
        eyebrow: "İLETİŞİM",
        title: "Projenizi anlatın",
        lead: "Birkaç satır yeterli. Genelde aynı gün, en geç ertesi iş günü dönüş yapıyoruz.",
        nameTitle: "AD SOYAD",
        namePlaceholder: "Ahmet Yılmaz",
        companyTitle: "ŞİRKET",
        companyPlaceholder: "Şirket adı",
        emailTitle: "E-POSTA",
        emailPlaceholder: "ornek@sirket.com",
        emailWarning: "Geçerli bir e-posta adresi yazın",
        packageTitle: "İLGİLENDİĞİNİZ PAKET",
        packageList: ["Henüz emin değilim", "Başlangıç", "Profesyonel", "Kurumsal", "Açık kaynak / destek"],
        messageTitle: "PROJENİZ",
        messagePlaceholder: "Ne gerekiyor: rapor ekranı, yönetim paneli veya yeni modül? Verileriniz şu an nerede duruyor (Logo, Mikro, Excel, kendi yazılımınız...)?",
        messageWarning: "Lütfen birkaç cümle yazın",
        requiredText: "Zorunlu",
        languageTitle: "DİL",
        sendButton: "Gönder",
        missingEntry: "{{count}} eksik alan",
        missingEntries: "{{count}} eksik alan",
        emptyWarning: "<b>{{name}}</b> boş bırakılamaz",
        errorWarning: "<b>{{name}}</b> geçerli değil",
        passiveHint: "Formu göndermek için eksik alanları doldurun.",
        mailTitle: "Teklif Talebi", // Mailin başlığı (mail servisi yazar)
        successTitle: "Mesajınız ulaştı",
        successText: "Teşekkürler. En kısa sürede dönüş yapacağız.",
        errorTitle: "Gönderilemedi",
        errorText: "Bir sorun oluştu. Doğrudan e-posta ile yazabilirsiniz:",
        mailtoText: "Form servisi henüz ayarlanmadı; mesajınız e-posta programınızda açılıyor.",
        orText: "veya doğrudan yazın",
        closeButton: "Tamam",
    },

    // FOOTER:
    footer: {
        tagline: "Size özel panel, hazır altyapı hızıyla.",
        columns: [
            { title: "Hizmet", links: [ { text: "Rapor ekranları", action: "services" }, { text: "Yönetim paneli", action: "services" }, { text: "Özel ekran ve modül", action: "services" }, { text: "Fiyatlar", action: "pricing" } ] },
            { title: "Ürün", links: [ { text: "Canlı demo", action: "demo" }, { text: "Özellikler", action: "features" }, { text: "Açık kaynak", action: "openSource" }, { text: "SSS", action: "faq" } ] },
        ],
        contactTitle: "İletişim",
        rights: "Tüm hakları saklıdır.",
        builtWith: "Bu site de panelin kendisi gibi <b>basic.js</b> ile yazıldı.",
    },

};

// *** ENGLISH:
TEXTS.en = {

    langName: "EN",
    otherLangName: "TR",
    htmlLang: "en",

    // SEO:
    pageTitle: "Reporting Dashboard and Admin Panel Development | Buğra Özden",
    pageDescription: "Up-to-date reports from your database, an admin panel for your app or a screen built for your business. Fast on a ready-made foundation, at a fixed price; the source code and your data stay with you.",
    pageKeywords: "reporting dashboard, report panel, reporting screen, erp reporting, database reporting, sql reporting dashboard, admin panel, app admin panel, custom module development, dashboard development, replace excel reports, open source admin panel",

    // MENU:
    menu: {
        services: "Services",
        features: "Features",
        demo: "Demo",
        pricing: "Pricing",
        openSource: "Open Source",
        faq: "FAQ",
        contact: "Contact",
        cta: "Get a Quote",
        open: "Menu",
        close: "Close",
    },

    // HERO:
    hero: {
        eyebrow: "REPORTING SCREENS AND ADMIN PANELS",
        title: "A custom panel, at the speed of a ready-made one.",
        lead: "Up-to-date reports from your data, content management for your app, or a screen built for your business. Because we build on a ready-made panel foundation, we deliver fast and at a fixed price. The panel runs on your own server; the source code and your data stay with you.",
        primaryButton: "Get a Quote",
        secondaryButton: "See the Live Demo",
        note: "The open source edition is free to download · Apache 2.0",
        // Screenshots (same order as SCREEN_FILES in hero.js). {screen}: the name of the screen.
        screens: ["Dashboard", "Sales report", "Orders", "Cold room monitoring", "Energy hub"],
        screenCaption: "{screen} · A real screenshot from the live demo",
    },

    // STATS:
    stats: [
        { value: "2–4 weeks", label: "typical delivery time" },
        { value: "Fixed price", label: "written in the quote, no surprises" },
        { value: "100%", label: "of the source code is yours" },
        { value: "$0", label: "license or subscription fees" },
    ],

    // SERVICES:
    services: {
        eyebrow: "WHAT WE DO",
        title: "One foundation, three different needs",
        lead: "We don't sell ready-made templates: the screens are built around your business. And because the foundation is already there, delivery is much faster than with software written from scratch.",
        items: [
            {
                icon: "assets/icons/reports.png",
                title: "Up-to-date reports from your data",
                text: "We read your data wherever it lives: an accounting program, your ERP (Logo, Mikro and others) or a system written just for you. Sales, stock, production or service figures in up-to-date tables and charts, on one screen. Your program stays exactly as it is.",
                points: ["Your ERP or your own database", "Table and chart reports", "No monthly subscription or BI license"],
            },
            {
                icon: "assets/icons/dashboard.png",
                title: "An admin panel for your app",
                text: "Manage the users, content, notifications and settings of your mobile or web app from one place. A simple panel is ready in about two weeks.",
                points: ["User and content management", "Sending notifications", "Roles and permissions"],
            },
            {
                icon: "assets/icons/brick.png",
                title: "A screen or module for your business",
                text: "A screen for work that off-the-shelf software doesn't cover: live monitoring of a cold room or a production line, an internal tool for your team, or a new module for the system you already run. It works alongside your existing code without touching it.",
                points: ["Live device and sensor data", "Internal tools for your team", "A new module for your existing system"],
            },
        ],
    },

    // FEATURES:
    features: {
        eyebrow: "FEATURES",
        title: "What's in the foundation?",
        lead: "All of the following comes ready in every panel. None of it is written from scratch, so it adds nothing to the time or the price. The part we write for you is the screens that are specific to your business.",
        items: [
            { icon: "assets/icons/reports.png", title: "Charts and reports", text: "Date ranges, filters, comparison with the previous period, tables and charts; every report exports to Excel in one click." },
            { icon: "assets/icons/url.png", title: "Connects to your existing data", text: "The database of your ERP or accounting program, your SQL server, Supabase or an API. Your data never passes through our servers." },
            { icon: "assets/icons/bolt.png", title: "Light, fast, works on phones too", text: "No external dependencies and small files: the panel opens instantly and works on phones too. Updates don't break it, so maintenance costs stay low." },
            { icon: "assets/icons/extension.png", title: "Modular architecture", text: "Every module is an independent page. Adding a new one never means rewriting anything that already works." },
            { icon: "assets/icons/data-table.png", title: "Edit in the table", text: "See records in a table and click a cell to edit it; filter, search and export to Excel." },
            { icon: "assets/icons/user.png", title: "Login and permissions", text: "Email and password sign-in. You decide who sees which screen and what they can change." },
            { icon: "assets/icons/light.png", title: "Themed for your brand", text: "Colors, logo, typeface and dark mode; the panel matches your brand or your client's." },
            { icon: "assets/icons/apps.png", title: "In your language", text: "Menus, messages, and date and currency formats in English. Turkish or other languages are available if you need them." },
        ],
    },

    // USE CASES:
    useCases: {
        eyebrow: "WHO IT IS FOR",
        title: "Who is the panel for?",
        lead: "",
        items: [
            { title: "Business owners and managers", text: "Waiting for someone to put an Excel sheet together just to see the numbers? Whether your data lives in an accounting program or in custom software, we bring the reports you want to your screen, always up to date, on your phone too." },
            { title: "Mobile app studios", text: "The app is ready, but there is no admin screen behind it. Instead of pulling your team onto building a panel, hand that work to us and stay focused on your product." },
            { title: "Advertising agencies", text: "You built an app or a website for a client and want them to manage the content themselves. We deliver the panel under your brand (white-label), and you offer it to your client as your own work." },
            { title: "Companies with their own software", text: "Your software works, but you need a new report screen or an internal tool for your team, and your developers are busy. We build the module and add it to your system, without touching your working code." },
        ],
    },

    // PROCESS:
    process: {
        eyebrow: "HOW IT WORKS",
        title: "Delivered in four steps",
        lead: "",
        items: [
            { step: "01", title: "Discovery call", text: "We talk through which data is managed, by whom, and on which screen.", time: "Day 1" },
            { step: "02", title: "Screen plan and quote", text: "Module list, screen sketches, a fixed price and a delivery date. Nothing starts until you approve it.", time: "2–3 days" },
            { step: "03", title: "Development", text: "Every week we review a working build together. The panel is set up on your own server, with your own data.", time: "2–4 weeks" },
            { step: "04", title: "Handover and support", text: "Source code, setup documentation and user training, followed by 1–3 months of free fixes depending on the scope.", time: "Delivery" },
        ],
    },

    // DEMO:
    demo: {
        eyebrow: "LIVE DEMO",
        title: "Explore the panel yourself",
        lead: "Below is a working copy of the real panel. The login details are pre-filled, so just press <b>Login</b>. Move between the modules in the left menu and edit records in the table.",
        frameTitle: "The real panel opens inside this frame",
        startButton: "Start the Demo",
        newTabButton: "Open in a New Tab",
        loadingText: "Loading the panel...",
        mobileWarning: "", // Shown under the demo on phones. "": not shown (the panel is mobile compatible).
    },

    // PRICING:
    pricing: {
        eyebrow: "PRICING",
        title: "Clear scope, fixed price",
        lead: "We work per project, not per hour. These are starting prices: we define the scope together, and the price in the quote does not change while the work is done.",
        popularLabel: "Recommended",
        fromLabel: "starting at",
        items: [
            {
                name: "Open Source",
                price: "Free",
                priceNote: "Apache 2.0",
                text: "Download the panel skeleton and set it up yourself.",
                points: ["Full source code", "Modular skeleton", "Sample pages and components", "Support through GitHub"],
                button: "Download on GitHub",
                action: "download",
                packageIndex: 4,
                highlight: 0,
            },
            {
                name: "Starter",
                price: "$1,500",
                priceNote: "starting price",
                text: "A simple panel to manage a single application.",
                points: ["1 module, up to 3 data tables", "Login screen and user management", "Basic theme adaptation", "Delivered in 2 weeks", "1 month of free fixes"],
                button: "Get a Quote",
                action: "contact",
                packageIndex: 1,
                highlight: 0,
            },
            {
                name: "Professional",
                price: "$3,200",
                priceNote: "starting price",
                text: "A full panel with several modules, roles and reports.",
                points: ["Up to 5 modules", "Roles and permissions", "Dashboard and report screens", "A theme made for your brand", "Connection to your existing database / API", "3 months of free fixes"],
                button: "Get a Quote",
                action: "contact",
                packageIndex: 2,
                highlight: 1,
            },
            {
                name: "Enterprise",
                price: "Custom",
                priceNote: "let's talk",
                text: "Unlimited modules, custom integrations and ongoing development.",
                points: ["Unlimited modules", "Custom integrations", "Delivered under your brand (white-label)", "Team training", "Support contract (SLA)"],
                button: "Book a Call",
                action: "contact",
                packageIndex: 3,
                highlight: 0,
            },
        ],
        footNote: "Prices exclude VAT and are finalized in the quote according to the project scope.",
    },

    // OPEN SOURCE:
    openSource: {
        eyebrow: "OPEN SOURCE",
        title: "Set it up yourself if you like",
        lead: "The panel skeleton is open source under the Apache 2.0 license. Download it, read it, use it in your commercial projects. If you need help, we're here.",
        points: [
            "Panel skeleton: left menu, top bar, module system, login screen",
            "More than 40 ready-made interface components",
            "Sample pages, templates and a handbook",
            "Free for commercial use; just keep the license and copyright notice",
        ],
        primaryButton: "View on GitHub",
        secondaryButton: "Open the Handbook",
    },

    // FAQ:
    faq: {
        eyebrow: "FREQUENTLY ASKED",
        title: "Common questions",
        items: [
            { q: "Does a \"ready-made foundation\" mean our panel will be a template?", a: "No. What is ready are the basic parts every panel repeats: login, menus, tables, charts and permissions. Your screens, your reports and your workflow are built around your business. Because we don't rewrite the foundation, the work takes less time and we can fix the price from the start." },
            { q: "Our data is in an ERP like Logo or Mikro, or in our own software. Can the panel connect to it?", a: "Yes. The panel works the same wherever the data comes from: your SQL server, Supabase, Firebase or an API. We also build reports straight from the database of an ERP or of a program written just for you. We go through the table structure together on the discovery call." },
            { q: "How long does delivery take?", a: "A simple single-module panel takes about 2 weeks; a panel with several modules and reports takes 3–4 weeks. The delivery date is set in writing in the quote." },
            { q: "Can you add a new module to our existing system?", a: "Yes. If your panel is built on this foundation, the module drops straight in. If not, we build the module as an independent page and place it inside your system, without touching your working code." },
            { q: "Does the panel work on mobile?", a: "Yes. The panel works on computers, tablets and phones; on smaller screens the menus and tables rearrange to fit. We also build report screens so that managers can comfortably check them on their phones." },
            { q: "Do we keep the source code?", a: "Yes. On delivery the full code is handed over to you; change it as you like and run it on any server you choose. No subscription and no license lock, and you can carry on with another developer." },
            { q: "Will we pay anything after delivery?", a: "No, there is no monthly subscription. Unlike off-the-shelf reporting tools, you pay once and the panel is yours. After the free fix period that comes with delivery, we quote separately if you want new modules, changes or maintenance. Server and data service costs, if any, are paid directly from your own account." },
            { q: "Where is our data kept, and what about data protection laws?", a: "The panel runs on your server and reaches your data directly from your own infrastructure; the data never passes through our servers. User permissions limit who can see which data. Obligations under GDPR, KVKK or similar laws, such as privacy notices and registrations, belong to your business as the data controller; we don't give legal advice on them." },
            { q: "We don't have a server. What should we do?", a: "The panel is made of plain files, so it runs on almost any hosting service. For the data side, a ready-made service like Supabase or a server in your own country can be used; we choose the right option together on the discovery call." },
            { q: "Can we move our Excel data into the panel?", a: "Yes. Your existing Excel or CSV files can be imported into the panel at the first setup. If you need it, a permanent import and export screen can be added to the panel too." },
            { q: "Do you deliver under our brand (white-label)?", a: "Yes. Agencies often choose this: the panel is delivered under your brand and we stay invisible." },
            { q: "What technology is the panel written in?", a: "Plain JavaScript. The interface is drawn with basic.js, a small, dependency-free library. There is no framework like React, Vue or Angular, no build step and no package manager. That is why the panel stays small, still works the same years later, and any developer who knows JavaScript can work on it." },
            { q: "What can I do with the open source edition?", a: "The Apache 2.0 license allows commercial use: download it and use it in your own or your clients' projects. Write to us if you want help with setup or customization." },
        ],
    },

    // CONTACT:
    contact: {
        eyebrow: "CONTACT",
        title: "Tell us about your project",
        lead: "A few lines is enough. We usually reply the same day, and at the latest the next working day.",
        nameTitle: "FULL NAME",
        namePlaceholder: "Jack Brown",
        companyTitle: "COMPANY",
        companyPlaceholder: "Company name",
        emailTitle: "EMAIL",
        emailPlaceholder: "you@company.com",
        emailWarning: "Please enter a valid email address",
        packageTitle: "PACKAGE YOU'RE INTERESTED IN",
        packageList: ["Not sure yet", "Starter", "Professional", "Enterprise", "Open source / support"],
        messageTitle: "YOUR PROJECT",
        messagePlaceholder: "What do you need: a report screen, an admin panel or a new module? Where does your data live today (an ERP, Excel, your own software...)?",
        messageWarning: "Please write a few sentences",
        requiredText: "Required",
        languageTitle: "LANGUAGE",
        sendButton: "Send",
        missingEntry: "{{count}} missing entry",
        missingEntries: "{{count}} missing entries",
        emptyWarning: "<b>{{name}}</b> can't be empty",
        errorWarning: "<b>{{name}}</b> is not valid",
        passiveHint: "Please fill in the missing fields to send the form.",
        mailTitle: "Quote Request", // The title of the mail (written by the mail service)
        successTitle: "Message received",
        successText: "Thank you. We will get back to you shortly.",
        errorTitle: "Could not send",
        errorText: "Something went wrong. You can write to us directly by email:",
        mailtoText: "The form service is not set up yet, so your message is opening in your email program.",
        orText: "or write to us directly",
        closeButton: "OK",
    },

    // FOOTER:
    footer: {
        tagline: "A custom panel, at the speed of a ready-made one.",
        columns: [
            { title: "Services", links: [ { text: "Report screens", action: "services" }, { text: "Admin panels", action: "services" }, { text: "Custom screens and modules", action: "services" }, { text: "Pricing", action: "pricing" } ] },
            { title: "Product", links: [ { text: "Live demo", action: "demo" }, { text: "Features", action: "features" }, { text: "Open source", action: "openSource" }, { text: "FAQ", action: "faq" } ] },
        ],
        contactTitle: "Contact",
        rights: "All rights reserved.",
        builtWith: "Like the panel itself, this site is written with <b>basic.js</b>.",
    },

};
