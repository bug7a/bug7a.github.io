/* Bismillah */

/*

Web Admin Panel - Site Configuration - v26.09

- Tüm site ayarları bu dosyadadır. Metinler için: js/texts.js
- All site settings are in this file. For copy/texts see: js/texts.js

Developer: Bugra Ozden
Email: bugra.ozden@gmail.com

*/

"use strict";

const CONFIG = {

    // *** BRAND:
    // Marka adı, dile göre. (site.js, CONFIG.brandName'i ziyaretçinin diline göre yazar.)
    brandNames: { tr: "Özel Admin Panel", en: "Custom Admin Panel" },
    brandName: "Özel Admin Panel",
    logoFile: "assets/logo.png",

    // *** CONTACT:
    email: "bugra.ozden@gmail.com",
    // Boş bırakılır ise, o satır gösterilmez.
    phone: "",
    meetingURL: "", // örn: "https://cal.com/..."

    // *** LINKS:
    githubURL: "https://github.com/bug7a/js-components",
    authorName: "Buğra Özden",            // Telif satırındaki isim
    authorURL: "https://bug7a.github.io/", // İsme tıklayınca açılan sayfa
    copyrightYears: "2020–2026",
    downloadURL: "https://github.com/bug7a/js-components",
    handbookURL: "https://bug7a.github.io/basic.js-handbook/",
    componentsURL: "https://bug7a.github.io/js-components/",

    // *** DEMO:
    // Canlı demo, bu adresi bir iframe içinde açar.
    // demo/: the self-contained copy of js-admin-panel (only .min.js files). Changes to js-admin-panel are carried over by hand.
    demoURL: "demo/index.htm",

    // *** PRICING:
    // 0: The pricing section and its menu links are hidden. (Also in index.htm: the <noscript> prices and the
    //    JSON-LD offers are in comments. Put them back when this is 1.)
    showPricing: 0,

    // *** FORM SERVICE:
    // Formun gönderildiği mail servisinin adresi (04-template-m2/web-forms/service/send-form-mail.php).
    // Formu { formName, formTitle, website, fields: [...] } JSON olarak alır ve e-posta ile gönderir.
    // - Boş bırakılır ise; form, kullanıcının e-posta programını mailto ile açar.
    // - Servisin $ALLOWED_ORIGINS listesinde bu sitenin adresi olmalı (CORS).
    // - Örnek: "https://your-site.com/service/send-form-mail.php"
    // NOTE: Özel adres; bu yüzden proje __projects/ altında, depoya gönderilmez.
    formEndpoint: "https://www.hostelchillsteps.com/service/send-form-mail.php",
    formName: "admin-panel-quote", // Hangi form? (Mail servisi yazar.)
    formTimeout: 15000, // ms

    // *** LANGUAGE:
    defaultLanguage: "tr", // "tr", "en"
    languageStorageKey: "wap_lang",

    // *** SEO:
    // The published address of this page (ex: "https://bug7a.github.io/basic.js/"). "": not known yet.
    // With it, the page adds its canonical, hreflang (?lang=tr / ?lang=en) and og:url links.
    // Also write it into og:image in index.htm: link previews do not run JavaScript.
    siteURL: "https://bug7a.github.io/admin-panel/",
    ogImage: "assets/og-image.jpg", // The link preview picture (1200 x 630), relative to this page

    // *** BEHAVIOR:
    // Sayfa yeniden boyutlandığında, sayfayı yeniden kur (responsive).
    rebuildOnResizeDelay: 150,

};
