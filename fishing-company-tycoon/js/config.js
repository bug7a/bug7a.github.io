/* Bismillah */

/*

Fishing Company Tycoon Website - Site Configuration - v26.10

- Tüm site ayarları bu dosyadadır. Metinler: js/texts.js  |  Renkler ve yardımcılar: js/theme.js
- All site settings are in this file. Texts: js/texts.js  |  Colors and helpers: js/theme.js

Developer: Bugra Ozden
Email: bugra.ozden@gmail.com

*/

"use strict";

const CONFIG = {

    // *** GAME:
    gameName: "Fishing Company Tycoon",
    gameSubtitle: "Harbor to Market",
    studioName: "Ozden Games",

    // *** LINKS:
    // "": not known yet. The page shows "coming soon" in their place until they are written here.
    // The Steam page of the game (ex: "https://store.steampowered.com/app/1234560/Fishing_Company_Tycoon/")
    steamURL: "https://store.steampowered.com/app/5452400/Fishing_Company_Tycoon_Harbor_to_Market/",
    // The intro video on YouTube (ex: "https://www.youtube.com/watch?v=XXXXXXXXXXX", "https://youtu.be/XXXXXXXXXXX")
    youtubeIntroURL: "https://youtu.be/vra29kgX-7Q",
    // The YouTube channel of the studio
    youtubeChannelURL: "https://www.youtube.com/@ozdengames",
    // The site of the developer (the name in the footer)
    authorName: "Buğra Özden",
    authorURL: "https://bug7a.github.io/",

    // *** FILES: (relative to this page)
    heroImage: "assets/hero.jpg",          // the picture of the main menu of the game (2560 x 1440)
    heroImageSmall: "assets/hero-small.jpg", // the same, 1280 x 720 (phones)
    logoFile: "assets/logo.png",           // the logo of the game (720 x 273, transparent)
    iconFile: "assets/icon.png",           // the icon of the game (256 x 256)
    shotsPath: "assets/shots/",            // the screenshots (1600 x 900 jpg), names in SCREENSHOTS (js/texts.js)
    pressKitFile: "assets/press-kit.zip",  // logo, icon, key art, background, screenshots, fact-sheet.txt (made 2026-10-20)

    // *** LANGUAGE:
    defaultLanguage: "en",
    languageStorageKey: "fct_site_lang",
    // The languages of the site (2026-10-21: English, Turkish + 8 by the Codex CLI, js/texts-<code>.js). code: the
    // address (?lang=de) and the key of TEXTS; name: in its own language (the menu); htmlLang: <html lang> and
    // hreflang; locale: og:locale. A language whose texts file is missing is left out of the menu by itself.
    languages: [
        { code: "en", name: "English", htmlLang: "en", locale: "en_US" },
        { code: "tr", name: "Türkçe", htmlLang: "tr", locale: "tr_TR" },
        { code: "de", name: "Deutsch", htmlLang: "de", locale: "de_DE" },
        { code: "fr", name: "Français", htmlLang: "fr", locale: "fr_FR" },
        { code: "es", name: "Español (Latinoamérica)", htmlLang: "es-419", locale: "es_LA" },
        { code: "pt", name: "Português (Brasil)", htmlLang: "pt-BR", locale: "pt_BR" },
        { code: "pl", name: "Polski", htmlLang: "pl", locale: "pl_PL" },
        { code: "ru", name: "Русский", htmlLang: "ru", locale: "ru_RU" },
        { code: "zh", name: "简体中文", htmlLang: "zh-Hans", locale: "zh_CN" },
        { code: "ja", name: "日本語", htmlLang: "ja", locale: "ja_JP" },
    ],

    // *** SEO:
    // The published address of this page (ex: "https://bug7a.github.io/fishing-company-tycoon/"). "": not known yet.
    // With it, the page adds its canonical, hreflang (?lang=tr) and og:url links. Also write it into og:image in
    // index.htm: link previews do not run JavaScript.
    siteURL: "https://bug7a.github.io/fishing-company-tycoon/",
    ogImage: "assets/og-image.jpg", // the link preview picture (1200 x 630)

    // *** BEHAVIOR:
    rebuildOnResizeDelay: 180, // ms: the page is built again when the width of the window changes

};
