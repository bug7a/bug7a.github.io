/* Bismillah */

/*

Fishing Company Tycoon Website - Site Controller - v26.10

- Sayfayı kurar, dili değiştirir, ekran genişliği değişince yeniden kurar.
- Builds the page, switches the language and builds it again when the width of the window changes.
- The language is in the address (?lang=tr; the default one has none), then the saved one, then the browser's.

Developer: Bugra Ozden
Email: bugra.ozden@gmail.com

*/

"use strict";

const SiteApp = { header: null, scrollBar: null, resizeTimer: null, lastWidth: 0 };

// *** FIRST RUNNING FUNCTION:
const start = function () {
    SITE.lang = SiteApp.loadLanguage();
    page.color = SITE.BG;
    SITE.injectCss();
    SiteApp.build();
    page.onResize(SiteApp.onPageResize);
};

// *** BUILD:
SiteApp.build = function (keepSectionKey = "") {

    SITE.L = SITE.createMetrics();
    SITE.T = TEXTS[SITE.lang];
    SITE.sections = {};
    SiteApp.lastWidth = SITE.L.w;
    SiteApp.applyDocumentInfo();

    // BOX: the full screen box that scrolls (WHY: page never scrolls in basic.js)
    SITE.scrollBox = startBox(0, 0, "100%", "100%", { color: SITE.BG, scrollY: 1 });
        VGroup({ clipContent: 0, width: "100%", height: "auto", align: "center top", gap: 0 }); // (height auto: the content can be taller than the box)
            Sections.hero({ onNavClick: SiteApp.onNavClick });
            Sections.video();
            Sections.features();
            Sections.facts();
            Sections.screenshots();
            Sections.info();
            Sections.call();
            Sections.footer({ onNavClick: SiteApp.onNavClick });
        endGroup();
    endBox();
    SITE.scrollBox.elem.setAttribute("role", "main");

    SiteApp.scrollBar = SITE.addScrollBar(SITE.scrollBox, { bar_color: "rgba(242, 193, 78, 0.55)", bar_mouseOverColor: "#F2C14E" });

    // BOX: the header (out of the scrolling box: it stays at the top)
    SiteApp.header = Sections.header({ onNavClick: SiteApp.onNavClick, onLanguageChange: SiteApp.setLanguage });
    SITE.scrollBox.on("scroll", function () { SiteApp.header.refreshScrollState(SITE.scrollBox.elem.scrollTop); });

    if (keepSectionKey) SITE.scrollToKey(keepSectionKey, 0);
    SiteApp.header.refreshScrollState(SITE.scrollBox.elem.scrollTop);

};

SiteApp.destroy = function () {
    Lightbox.close();
    if (SiteApp.header) { SiteApp.header.remove(); SiteApp.header = null; }
    if (SiteApp.scrollBar) { SiteApp.scrollBar.remove(); SiteApp.scrollBar = null; }
    if (SITE.scrollBox) { SITE.scrollBox.remove(); SITE.scrollBox = null; }
};

// *** ACTIONS:
SiteApp.onNavClick = function (key) {
    if (key == "top") { SITE.scrollBox.elem.scrollTo({ top: 0, behavior: "smooth" }); return; }
    SITE.scrollToKey(key);
};

SiteApp.setLanguage = function (code) {
    if (!TEXTS[code] || code == SITE.lang) return;
    SITE.lang = code;
    basic.storage.save(CONFIG.languageStorageKey, SITE.lang);
    history.replaceState(null, "", SiteApp.languageAddress(SITE.lang)); // WHY: a copied link opens in this language
    const sectionKey = SITE.getVisibleSectionKey();
    SiteApp.destroy();
    SiteApp.build(sectionKey);
};

// The address (?lang=de) first, then the saved one, then the languages of the browser (de-AT -> de, pt-PT -> pt...).
SiteApp.loadLanguage = function () {
    const asked = new URLSearchParams(location.search).get("lang");
    if (asked && TEXTS[asked]) return asked;
    const saved = basic.storage.load(CONFIG.languageStorageKey);
    if (saved && TEXTS[saved]) return saved;
    const browser = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || ""];
    for (let i = 0; i < browser.length; i++) {
        const code = String(browser[i]).toLowerCase().split("-")[0];
        if (TEXTS[code]) return code;
    }
    return CONFIG.defaultLanguage;
};

SiteApp.onPageResize = function () {
    SiteApp.resizeTimer = waitAndRun(SiteApp.resizeTimer, function () {
        if (page.width == SiteApp.lastWidth) return; // WHY: only the height changed (the address bar of a phone)
        const sectionKey = SITE.getVisibleSectionKey();
        SiteApp.destroy();
        SiteApp.build(sectionKey);
    }, CONFIG.rebuildOnResizeDelay);
};

// *** DOCUMENT AND SEO:
SiteApp.applyDocumentInfo = function () {
    const T = SITE.T;
    document.title = T.pageTitle;
    document.documentElement.setAttribute("lang", T.htmlLang);
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", T.pageDescription);
    SiteApp.setSeoTag("meta", "property", "og:title", "content", T.pageTitle);
    SiteApp.setSeoTag("meta", "property", "og:description", "content", T.pageDescription);
    SiteApp.setSeoTag("meta", "property", "og:locale", "content", SITE.language(SITE.lang).locale);
    SiteApp.setSeoTag("meta", "name", "twitter:title", "content", T.pageTitle);
    SiteApp.setSeoTag("meta", "name", "twitter:description", "content", T.pageDescription);
    if (!CONFIG.siteURL) return;
    SiteApp.setSeoTag("link", "rel", "canonical", "href", SiteApp.languageAddress(SITE.lang, CONFIG.siteURL));
    SITE.languages().forEach(function (l) {
        SiteApp.setSeoTag("link", "hreflang", l.htmlLang, "href", SiteApp.languageAddress(l.code, CONFIG.siteURL), { rel: "alternate" });
    });
    SiteApp.setSeoTag("link", "hreflang", "x-default", "href", SiteApp.languageAddress(CONFIG.defaultLanguage, CONFIG.siteURL), { rel: "alternate" });
    SiteApp.setSeoTag("meta", "property", "og:url", "content", SiteApp.languageAddress(SITE.lang, CONFIG.siteURL));
    SiteApp.setSeoTag("meta", "property", "og:image", "content", new URL(CONFIG.ogImage, CONFIG.siteURL).href);
};

// The address of a language. base: CONFIG.siteURL (no hash), or the current address.
SiteApp.languageAddress = function (lang, base) {
    const url = new URL(base || location.href);
    if (lang == CONFIG.defaultLanguage) url.searchParams.delete("lang");
    else url.searchParams.set("lang", lang);
    if (base) url.hash = "";
    return url.href;
};

// Finds (or adds) <tag key="value"> in <head> and sets one of its attributes.
SiteApp.setSeoTag = function (tag, key, value, attr, content, extra) {
    let elem = document.head.querySelector(tag + "[" + key + "=\"" + value + "\"]");
    if (!elem) {
        elem = document.createElement(tag);
        elem.setAttribute(key, value);
        if (extra) Object.keys(extra).forEach(function (name) { elem.setAttribute(name, extra[name]); });
        document.head.appendChild(elem);
    }
    elem.setAttribute(attr, content);
};
