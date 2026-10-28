/* Bismillah */

/*

Consent and Google Ads - v26.10
- The Google tag (CONFIG.adsTagId) with Consent Mode: every consent is "denied" until the visitor accepts the
  banner, so no cookie is written before that (KVKK). Google counts the conversions of the visitors who did not
  accept with its own models.
- The banner (bottom of the screen) is shown until the visitor chooses; the choice is kept in basic.storage.
- SiteConsent.trackConversion(): a sent form (js/sections/contact.js).
- CONFIG.adsTagId "": nothing is loaded, the banner is not shown.

Developer: Bugra Ozden
Email: bugra.ozden@gmail.com

*/

"use strict";

const SiteConsent = {};

SiteConsent.GRANTED = "granted";
SiteConsent.DENIED = "denied";
SiteConsent.banner = null;

SiteConsent.isOn = function () {
    return !!CONFIG.adsTagId;
};

// "granted", "denied" or "" (not chosen yet).
SiteConsent.getChoice = function () {
    return basic.storage.load(CONFIG.consentStorageKey) || "";
};

// The consent of the Google tag: ads cookies and data only with "granted".
SiteConsent.getConsentState = function (choice) {
    const value = (choice === SiteConsent.GRANTED) ? "granted" : "denied";
    return { ad_storage: value, ad_user_data: value, ad_personalization: value, analytics_storage: value };
};

// The Google tag, with the consent first. (Runs when this file loads, before the page is built.)
SiteConsent.loadTag = function () {
    if (!SiteConsent.isOn()) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag("consent", "default", SiteConsent.getConsentState(SiteConsent.getChoice()));
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + CONFIG.adsTagId;
    document.head.appendChild(script);
    gtag("js", new Date());
    gtag("config", CONFIG.adsTagId);
};

SiteConsent.choose = function (choice) {
    basic.storage.save(CONFIG.consentStorageKey, choice);
    if (window.gtag) gtag("consent", "update", SiteConsent.getConsentState(choice));
    SiteConsent.removeBanner();
};

// A sent form. (No tag: nothing.)
SiteConsent.trackConversion = function () {
    if (!SiteConsent.isOn() || !window.gtag) return;
    gtag("event", "conversion", { send_to: CONFIG.adsConversionSendTo });
};

SiteConsent.removeBanner = function () {
    if (!SiteConsent.banner) return;
    SiteConsent.banner.remove();
    SiteConsent.banner = null;
};

// LABEL: A button of the banner.
SiteConsent.createButton = function (text, isMain, onClick) {
    const btn = Label({ text: "", fontSize: 14, padding: [16, 9], round: 8 });
    btn.plainText = text;
    btn.color = (isMain) ? SITE.PRIMARY_LIGHT : "transparent";
    btn.textColor = (isMain) ? SITE.INK : SITE.ON_DARK;
    btn.border = (isMain) ? 0 : 1;
    btn.borderColor = SITE.ON_DARK_LINE;
    btn.elem.style.fontFamily = SITE.BOLD;
    btn.shrink = 0;
    btn.cursor = "pointer";
    // WHY: setAttribute: the basic.js copy of this site (v26.09.18) has no role / tabIndex / aria props.
    btn.elem.setAttribute("role", "button");
    btn.elem.setAttribute("tabindex", "0");
    btn.on("click", onClick);
    btn.on("keydown", function (self, event) {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        onClick();
    });
    return btn;
};

// GROUP: The banner at the bottom of the screen, until the visitor chooses. (Made again with the site.)
SiteConsent.createBanner = function () {
    SiteConsent.removeBanner();
    if (!SiteConsent.isOn() || SiteConsent.getChoice()) return;

    const L = SITE.L;
    const T = SITE.T.consent;
    const MARGIN = 16;
    const width = Math.min(640, page.width - MARGIN * 2);

    // WHY: The banner is kept inside the function: createIn() of this site's basic.js (v26.09.18) returns nothing.
    createIn(page, function () {
        const banner = (L.mobile)
            ? VGroup({ width: width, height: "auto", align: "left top", gap: 12, padding: 16 })
            : HGroup({ width: width, height: "auto", align: "left center", gap: 16, padding: [20, 16] });
        banner.color = SITE.INK_SOFT;
        banner.round = 12;
        banner.border = 1;
        banner.borderColor = SITE.ON_DARK_LINE;
        banner.boxShadow = "0px 12px 32px rgba(0, 0, 0, 0.35)";
        banner.left = Math.round((page.width - width) / 2);
        banner.bottom = MARGIN;
        banner.zIndex = 1000;
        banner.elem.setAttribute("role", "dialog");
        banner.elem.setAttribute("aria-label", T.text);
            const lblText = Label({ text: "", fontSize: 14, textColor: SITE.ON_DARK_SOFT });
            lblText.plainText = T.text;
            lblText.elem.style.lineHeight = "1.5";
            lblText.elem.style.whiteSpace = "normal";
            lblText.grow = 1;
            // GROUP: The buttons
            HGroup({ hug: 1, align: "right center", gap: 8 });
                SiteConsent.createButton(T.reject, 0, function () { SiteConsent.choose(SiteConsent.DENIED); });
                SiteConsent.createButton(T.accept, 1, function () { SiteConsent.choose(SiteConsent.GRANTED); });
            endGroup();
        endGroup();
        SiteConsent.banner = banner;
    });
};

SiteConsent.loadTag();
