/* Bismillah */

/*

Fishing Company Tycoon Website - Texts - v26.10

- Sitenin bütün metinleri: İngilizce (en) ve Türkçe (tr). Kaynak: ../steam/store-texts.md (Steam mağaza metinleri).
- All the texts of the site, in English and Turkish. Source: ../steam/store-texts.md (the Steam store texts).
- Bir metin değişince index.htm'deki <noscript> bölümünü ve JSON-LD'yi de aynı yapın.
- When a text changes, change the <noscript> part and the JSON-LD of index.htm too.

Developer: Bugra Ozden
Email: bugra.ozden@gmail.com

*/

"use strict";

// The screenshots (assets/shots/<file>.jpg), in the order of the Steam page (../steam/images/README.md)
const SCREENSHOTS = [
    { file: "01-harbor", en: "The harbor and the east coast of the island", tr: "Liman ve adanın doğu kıyısı" },
    { file: "11-ship-panel", en: "A ship at work and its panel", tr: "Çalışan bir gemi ve paneli" },
    { file: "13-truck-where-to", en: "Where to? The prices of every town", tr: "Nereye? Her kasabanın fiyatları" },
    { file: "04-restaurant-agreement", en: "An agreement with a restaurant", tr: "Bir restoranla anlaşma" },
    { file: "06-storm-fishing", en: "Fishing through a storm", tr: "Fırtınada avlanmak" },
    { file: "05-technology-upgrades", en: "The technology window", tr: "Teknoloji penceresi" },
    { file: "12-autopilot", en: "The auto pilot finds the fish", tr: "Otomatik pilot balığı bulur" },
    { file: "06-fleet", en: "Your fleet", tr: "Filon" },
    { file: "03-towns", en: "The towns and the roads", tr: "Kasabalar ve yollar" },
    { file: "08-night", en: "The island at night", tr: "Gece ada" },
    { file: "07-story-card", en: "A gift from the harbor", tr: "Limandan bir hediye" },
    { file: "10-species-encyclopedia", en: "The species encyclopedia", tr: "Türler ansiklopedisi" },
    { file: "09-main-menu", en: "The main menu", tr: "Ana menü", notInGrid: 1 }, // (12 pictures fill the rows of the grid)
];

// The captions of the screenshots in the languages of js/texts-<code>.js: SCREENSHOT_TEXTS[code][i] (SITE.caption)
const SCREENSHOT_TEXTS = {};

const TEXTS = {

    en: {
        htmlLang: "en",
        pageTitle: "Fishing Company Tycoon – a relaxed fishing management game", // (≤ 60 letters: Google cuts a longer title)
        pageDescription: "Build a fishing company from a single boat: send ships to the fishing grounds, truck the catch to the best markets and grow a fleet that works by itself.", // (≤ 160 letters)

        // HEADER
        nav: [["video", "Video"], ["features", "Features"], ["screenshots", "Screenshots"]],
        steamButton: "Wishlist on Steam",
        steamSoon: "Coming soon to Steam",

        // HERO
        heroTagline: "Build a fishing company from a single boat.",
        heroText: "Send your ships to the fishing grounds, truck the catch to the markets that pay the most, research better gear, and grow a fleet that works by itself. A relaxed management game on a living island.",
        heroVideoButton: "Watch the video",
        heroNote: "In development · PC (Windows) · English and Turkish",

        // VIDEO
        videoEyebrow: "Watch",
        videoTitle: "See the harbor come to life",
        videoSoon: "The intro video is coming soon.",
        videoChannel: "Meanwhile: short videos on our YouTube channel",

        // FEATURES
        featuresEyebrow: "The game",
        featuresTitle: "From one small boat to the biggest fish company of the island",
        featuresLead: "You start with one small boat and an empty warehouse on the east coast of an island. Around you: twenty fishing grounds, four towns that all want something different, and a harbor that is waiting for someone to make it busy.",
        features: [
            { title: "From the harbor to the market", shot: "11-ship-panel", // (2026-10-20, the user: the "Where to?" table was not a good first picture)
                text: "Catch the fish, bring it home, and decide where it goes. The local buyer pays at once, but a truck to the right town pays more: the resort wants swordfish, the factory village wants sardines. Prices fall when you flood a market and recover when you leave it alone." },
            { title: "A fleet that works by itself", shot: "12-autopilot",
                text: "Six kinds of ships, from the starter boat to a solar flagship. Teach them, box by box, to cast, come home, unload, refuel and go out again. Then do the same for your trucks. The more your company grows, the less you have to click." },
            { title: "Fish that run out, and come back", shot: "06-storm-fishing",
                text: "Every fishing ground has its own stock. Fish it gently and it grows back; fish it too hard and it collapses. Tuna, swordfish and bluefin wait far out at sea for ships that can reach them." },
            { title: "More than fish", shot: "04-restaurant-agreement",
                text: "Agreements with hotels and restaurants, a reputation to earn, crab pots, squid that only bite at night, a mussel farm, a fish farm, a canning factory with one very big order, and your own restaurants to open." },
            { title: "A living island", shot: "08-night",
                text: "Day turns to night, the weather changes, lamps come on in the towns, and your ships keep working with their lights. Now and then a big shoal shows up, or the harbor leaves you a gift." },
        ],

        // FACTS
        factsTitle: "What is in the harbor",
        facts: [
            ["6", "ship types"], ["7", "kinds of trucks"], ["20", "fishing grounds"], ["12", "kinds of fish and seafood"],
            ["4", "towns with their own prices"], ["10", "technology columns"], ["11", "chapters of tasks"], ["2", "languages: English, Turkish"],
        ],

        // SCREENSHOTS
        shotsEyebrow: "Screenshots",
        shotsTitle: "A look around the island",
        shotsHint: "Click a picture to see it bigger.",
        lightboxClose: "Close",

        // SYSTEM REQUIREMENTS AND PRESS KIT
        reqTitle: "System requirements",
        reqNote: "Preliminary: they will be confirmed before the release.",
        requirements: [
            ["OS", "Windows 10 (64-bit)"], ["Processor", "Dual core, 2 GHz"], ["Memory", "4 GB RAM"],
            ["Graphics", "Any card with WebGL support"], ["Storage", "400 MB available space"],
        ],
        pressTitle: "Press kit",
        pressText: "Writing about the game or showing it in a video? The logo, the icon, the key art and the screenshots are in one file. You may use them to write about or show the game.",
        pressFacts: [["Developer", "Ozden Games"], ["Platform", "PC (Windows), Steam"], ["Status", "In development"], ["Languages", "English, Turkish"]],
        pressButton: "Download the press kit",
        pressSize: "ZIP · 6.8 MB",

        // FINAL CALL
        callTitle: "Follow the harbor",
        callText: "The game is in development. Add it to your wishlist on Steam to hear when it comes out, and watch the new short videos on YouTube.",
        youtubeButton: "YouTube channel",

        // FOOTER
        footerMade: "A game by {author} · Ozden Games", // ({author}: the name with its link, CONFIG.authorURL)
        footerRights: "© 2026 Ozden Games. All rights reserved.",
        toTop: "Back to top",
    },

    tr: {
        htmlLang: "tr",
        pageTitle: "Fishing Company Tycoon – sakin bir balıkçılık yönetim oyunu",
        pageDescription: "Tek tekneyle bir balıkçılık şirketi kur: gemileri av sahalarına gönder, balığı en iyi pazara kamyonla taşı, kendi kendine çalışan bir filo büyüt.",

        // HEADER
        nav: [["video", "Video"], ["features", "Oyun"], ["screenshots", "Görüntüler"]],
        steamButton: "Steam'de istek listene ekle",
        steamSoon: "Yakında Steam'de",

        // HERO
        heroTagline: "Tek bir tekneyle bir balıkçılık şirketi kur.",
        heroText: "Gemilerini av sahalarına gönder, balığı en çok para veren pazara kamyonla taşı, daha iyi donanım geliştir ve kendi kendine çalışan bir filo büyüt. Yaşayan bir adada, sakin bir yönetim oyunu.",
        heroVideoButton: "Videoyu izle",
        heroNote: "Geliştiriliyor · PC (Windows) · İngilizce ve Türkçe",

        // VIDEO
        videoEyebrow: "İzle",
        videoTitle: "Limanın hareketlenişini gör",
        videoSoon: "Tanıtım videosu yakında burada.",
        videoChannel: "Bu arada: YouTube kanalımızdaki kısa videolar",

        // FEATURES
        featuresEyebrow: "Oyun",
        featuresTitle: "Küçük bir tekneden adanın en büyük balık şirketine",
        featuresLead: "Bir adanın doğu kıyısında, küçük bir tekne ve boş bir depoyla başlarsın. Çevrende yirmi av sahası, her biri başka şey isteyen dört kasaba ve hareketlenmeyi bekleyen bir liman var.",
        features: [
            { title: "Limandan pazara", shot: "11-ship-panel",
                text: "Balığı tut, eve getir ve nereye gideceğine karar ver. Yerel alıcı hemen öder, ama doğru kasabaya giden bir kamyon daha çok kazandırır: tatil kasabası kılıç balığı ister, fabrika köyü sardalya. Bir pazarı balığa boğarsan fiyat düşer, rahat bırakırsan toparlanır." },
            { title: "Kendi kendine çalışan bir filo", shot: "12-autopilot",
                text: "Başlangıç teknesinden güneş enerjili amiral gemisine altı gemi türü. Onlara kutu kutu ağ atmayı, eve dönmeyi, boşaltmayı, yakıt almayı ve yeniden çıkmayı öğret. Sonra aynısını kamyonların için yap. Şirketin büyüdükçe daha az tıklarsın." },
            { title: "Tükenen ve geri gelen balıklar", shot: "06-storm-fishing",
                text: "Her av sahasının kendi stoğu var. Ölçülü avlanırsan yenilenir, fazla yüklenirsen çöker. Orkinos, kılıç balığı ve mavi yüzgeçli orkinos, onlara ulaşabilen gemileri açık denizde bekler." },
            { title: "Balıktan fazlası", shot: "04-restaurant-agreement",
                text: "Otellerle ve restoranlarla anlaşmalar, kazanılacak bir itibar, yengeç sepetleri, yalnızca gece tutulan kalamar, bir midye çiftliği, bir balık çiftliği, tek bir büyük siparişi olan konserve fabrikası ve açacağın kendi restoranların." },
            { title: "Yaşayan bir ada", shot: "08-night",
                text: "Gün geceye döner, hava değişir, kasabalarda lambalar yanar ve gemilerin ışıklarıyla çalışmaya devam eder. Ara sıra büyük bir sürü belirir ya da liman sana bir hediye bırakır." },
        ],

        // FACTS
        factsTitle: "Limanda neler var",
        facts: [
            ["6", "gemi türü"], ["7", "çeşit kamyon"], ["20", "av sahası"], ["12", "çeşit balık ve deniz ürünü"],
            ["4", "kendi fiyatı olan kasaba"], ["10", "teknoloji sütunu"], ["11", "bölüm görev"], ["2", "dil: İngilizce, Türkçe"],
        ],

        // SCREENSHOTS
        shotsEyebrow: "Görüntüler",
        shotsTitle: "Adada bir tur",
        shotsHint: "Büyütmek için bir resme tıkla.",
        lightboxClose: "Kapat",

        // SYSTEM REQUIREMENTS AND PRESS KIT
        reqTitle: "Sistem gereksinimleri",
        reqNote: "Ön bilgi: çıkıştan önce kesinleşecek.",
        requirements: [
            ["İşletim sistemi", "Windows 10 (64 bit)"], ["İşlemci", "Çift çekirdekli, 2 GHz"], ["Bellek", "4 GB RAM"],
            ["Ekran kartı", "WebGL destekleyen herhangi bir kart"], ["Depolama", "400 MB boş alan"],
        ],
        pressTitle: "Basın kiti",
        pressText: "Oyun hakkında yazıyor ya da bir videoda gösteriyor musun? Logo, simge, kapak resmi ve ekran görüntüleri tek dosyada. Oyunu anlatmak ve göstermek için kullanabilirsin.",
        pressFacts: [["Geliştirici", "Ozden Games"], ["Platform", "PC (Windows), Steam"], ["Durum", "Geliştiriliyor"], ["Diller", "İngilizce, Türkçe"]],
        pressButton: "Basın kitini indir",
        pressSize: "ZIP · 6,8 MB",

        // FINAL CALL
        callTitle: "Limanı takip et",
        callText: "Oyun geliştiriliyor. Çıktığında haber almak için Steam'de istek listene ekle, yeni kısa videoları YouTube'da izle.",
        youtubeButton: "YouTube kanalı",

        // FOOTER
        footerMade: "{author}'in bir oyunu · Ozden Games",
        footerRights: "© 2026 Ozden Games. Tüm hakları saklıdır.",
        toTop: "Başa dön",
    },

};
