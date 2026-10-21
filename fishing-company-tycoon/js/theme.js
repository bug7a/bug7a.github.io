/* Bismillah */

/*

Fishing Company Tycoon Website - Theme - v26.10

- Renkler, ekran ölçüleri ve bölümlerin ortak parçaları (başlık, metin, düğme, resim).
- Colors, screen metrics and the shared parts of the sections (heading, text, button, picture).
- Colors: the main menu of the game (js/menu.js of the game): a dark harbor at dusk, the gold of the titles, the warm
  cream of the lantern light.

Developer: Bugra Ozden
Email: bugra.ozden@gmail.com

*/

"use strict";

const SITE = {

    // *** COLORS:
    BG: "#0B1420",          // the page (the dark sea of the menu)
    BG_SOFT: "#101C2B",     // every second section
    SURFACE: "#152536",     // cards
    LINE: "rgba(255, 255, 255, 0.08)",
    GOLD: "#F2C14E",        // the titles of the game
    GOLD_DARK: "#2A1C05",   // text on gold
    CREAM: "#F6E8CE",       // headings (the lantern light of the menu buttons)
    TEXT: "rgba(232, 238, 245, 0.78)",
    TEXT_SOFT: "rgba(232, 238, 245, 0.52)",
    BOLD: "opensans-bold, sans-serif",

    // *** STATE:
    lang: "en",
    T: null,      // TEXTS[lang]
    L: null,      // the metrics of the screen (createMetrics)
    sections: {}, // key -> the group of a section (the menu scrolls to it)
    scrollBox: null,

};

// *** METRICS: (the page is built again when the width changes, js/site.js)
SITE.createMetrics = function () {

    const w = page.width;
    const mobile = (w < 760) ? 1 : 0;
    const tablet = (!mobile && w < 1100) ? 1 : 0;
    const gutter = mobile ? 18 : 40;
    const content = Math.min(1120, w - (gutter * 2));
    const gap = mobile ? 14 : 22;

    // the width of one column of `count` (fewer columns on small screens)
    const columns = function (count) {
        let n = count;
        if (mobile) n = (count >= 4) ? 2 : 1;
        else if (tablet && count > 2) n = Math.min(count, 3) == 3 ? 2 : count;
        return Math.floor((content - (gap * (n - 1))) / n);
    };

    return {
        w: w, h: page.height, mobile: mobile, tablet: tablet,
        gutter: gutter, content: content, gap: gap, columns: columns,
        headerH: mobile ? 58 : 66,
        sectionPadY: mobile ? 64 : 104,
        h1: mobile ? 26 : 34,
        h2: mobile ? 26 : 38,
        h3: mobile ? 19 : 23,
        body: mobile ? 15 : 17,
    };

};

// *** SECTIONS:
// A section: the whole width, its own background, the content in the middle (L.content wide).
SITE.startSection = function (key, params = {}) {
    const L = SITE.L;
    const box = VGroup({ clipContent: 0, width: "100%", height: "auto", align: "center top", gap: 0, color: params.color || SITE.BG,
        padding: [L.gutter, (params.padY === undefined) ? L.sectionPadY : params.padY] });
    if (key) SITE.sections[key] = box;
    VGroup({ clipContent: 0, width: L.content, height: "auto", align: params.align || "center top", gap: params.gap || (L.mobile ? 22 : 30) });
    return box;
};
SITE.endSection = function () {
    endGroup();
    endGroup();
};

// *** TEXTS:

SITE.eyebrow = function (text) {
    Label({ text: text, fontSize: 13, bold: 1, textColor: SITE.GOLD, css: { letterSpacing: "2px", textTransform: "uppercase" } });
    return that;
};

// SEO: the text is in a real <h1> / <h2> / <h3> inside the Label (search engines read the tags; the look stays the Label's)
SITE.headingHtml = function (text, level) {
    return "<h" + level + " style='font: inherit; margin: 0; padding: 0; color: inherit; letter-spacing: inherit; text-align: inherit'>" + text + "</h" + level + ">";
};
SITE.heading = function (text, level = 2, params = {}) {
    const L = SITE.L;
    const size = (level == 1) ? L.h1 : (level == 2) ? L.h2 : L.h3;
    Label({ text: SITE.headingHtml(text, level), width: params.width || "100%", fontSize: size, textColor: params.color || SITE.CREAM,
        css: { fontFamily: SITE.BOLD, whiteSpace: "normal", lineHeight: "1.18", textAlign: params.center ? "center" : "left", overflow: "visible", textWrap: "balance" } });
    return that;
};

SITE.text = function (text, params = {}) {
    Label({ text: text, width: params.width || "100%", fontSize: params.size || SITE.L.body, textColor: params.color || SITE.TEXT,
        css: { whiteSpace: "normal", lineHeight: "1.65", textAlign: params.center ? "center" : "left", textWrap: "pretty" } });
    return that;
};

// A text only for screen readers and search engines (not seen)
SITE.hiddenText = function (parentBox, tag, text) {
    const el = document.createElement(tag);
    el.textContent = text;
    el.style.cssText = "position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;";
    parentBox.elem.appendChild(el);
    return el;
};

// *** ICONS: (24 x 24 line icons)
SITE.ICONS = {
    play: "<path d='M8 5.5v13l10.5-6.5z' fill='currentColor' stroke='none'/>",
    steam: "<circle cx='12' cy='12' r='9.5'/><circle cx='15.5' cy='9' r='2.6'/><circle cx='9' cy='15.2' r='1.8'/><path d='M3 13.2l4.6 1.9M10.6 14.4l3.1-3.4'/>",
    youtube: "<rect x='2.5' y='5.5' width='19' height='13' rx='4'/><path d='M10 9.2v5.6l4.8-2.8z' fill='currentColor' stroke='none'/>",
    up: "<path d='M6 14l6-6 6 6'/>",
    left: "<path d='M15 5l-7 7 7 7'/>",
    right: "<path d='M9 5l7 7-7 7'/>",
    close: "<path d='M6 6l12 12M18 6L6 18'/>",
};
SITE.svg = function (name, size = 18) {
    return "<svg viewBox='0 0 24 24' width='" + size + "' height='" + size + "' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='display:block;flex:0 0 auto'>" + (SITE.ICONS[name] || "") + "</svg>";
};

// *** BUTTONS:
// kind: "gold" (the main one), "glass" (on a picture), "line". A button with `url` opens it in a new tab; without
// `url` and `onClick` it is passive (a link that is not known yet: CONFIG).
SITE.button = function (params = {}) {
    const L = SITE.L;
    const kind = params.kind || "gold";
    const isPassive = !params.url && !params.onClick;
    const looks = {
        gold: { bg: SITE.GOLD, color: SITE.GOLD_DARK, border: "transparent" },
        glass: { bg: "rgba(8, 16, 26, 0.55)", color: SITE.CREAM, border: "rgba(255, 230, 170, 0.35)" },
        line: { bg: "transparent", color: SITE.CREAM, border: "rgba(255, 255, 255, 0.22)" },
    };
    const look = looks[kind];
    const height = params.height || (L.mobile ? 46 : 50);
    const html = "<span style='display:inline-flex;align-items:center;gap:9px'>" + (params.icon ? SITE.svg(params.icon, 18) : "") + "<span>" + params.text + "</span></span>";
    const btn = Label({ text: html, height: height, fontSize: params.fontSize || (L.mobile ? 14 : 15), textColor: look.color, color: look.bg, round: height / 2,
        clickable: isPassive ? 0 : 1,
        css: { display: "flex", alignItems: "center", justifyContent: "center", padding: "0 " + (L.mobile ? 20 : 26) + "px", boxSizing: "border-box",
            fontFamily: SITE.BOLD, whiteSpace: "nowrap", border: "1.5px solid " + look.border, cursor: isPassive ? "default" : "pointer",
            backdropFilter: (kind == "glass") ? "blur(6px)" : "", webkitBackdropFilter: (kind == "glass") ? "blur(6px)" : "",
            transition: "transform 0.15s, filter 0.15s, background-color 0.15s", flexShrink: "0" } });
    if (params.width) btn.width = params.width;
    // THE GLASS BUTTON (2026-10-21, the user: "a clipContent fault on Watch the video"): a `filter` on an element with
    // `backdrop-filter` (the hover brightness) makes Chrome stop clipping the blur to the round corners: square corners
    // of blur showed around the button. The glass one gets a lighter background under the mouse instead of the filter,
    // and a clip-path with the same round corners (the blur can never pass them).
    if (kind == "glass") {
        btn.elem.classList.add("site-button-glass");
        btn.elem.style.clipPath = "inset(0 round " + (height / 2) + "px)";
    }
    if (isPassive) btn.opacity = 0.62;
    else {
        btn.elem.classList.add("site-button");
        btn.elem.setAttribute("role", params.url ? "link" : "button");
        btn.elem.tabIndex = 0;
        const go = function () {
            if (params.url) window.open(params.url, "_blank", "noopener");
            else params.onClick(btn);
        };
        btn.on("click", go);
        btn.on("keydown", function (self, e) { if (e.key == "Enter" || e.key == " ") { e.preventDefault(); go(); } });
    }
    return btn;
};

// The Steam button: "Wishlist on Steam" with CONFIG.steamURL, else "Coming soon to Steam" (passive)
SITE.steamButton = function (params = {}) {
    return SITE.button(Object.assign({ icon: "steam", text: CONFIG.steamURL ? SITE.T.steamButton : SITE.T.steamSoon, url: CONFIG.steamURL }, params));
};

// *** PICTURES:
// A picture of `width`, its height from its ratio (16:9 for the screenshots). lazy: loaded when it is near the screen.
SITE.picture = function (file, width, ratio = 9 / 16, params = {}) {
    const img = Icon({ width: width, height: Math.round(width * ratio), round: params.round === undefined ? 12 : params.round });
    that.load(file);
    img.elem.style.objectFit = "cover";
    img.elem.style.backgroundColor = SITE.SURFACE;
    img.elem.loading = params.lazy === 0 ? "eager" : "lazy";
    img.elem.decoding = "async";
    img.elem.alt = params.alt || "";
    if (params.shadow !== 0) img.elem.style.boxShadow = "0 18px 40px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.06)";
    img.elem.style.flexShrink = "0";
    return img;
};

// The caption of screenshot i in the language of the page (English when the language has none)
SITE.caption = function (i) {
    const s = SCREENSHOTS[i];
    return s[SITE.lang] || (SCREENSHOT_TEXTS[SITE.lang] || [])[i] || s.en;
};

// The languages that have their texts (a missing texts-<code>.js file: left out)
SITE.languages = function () {
    return CONFIG.languages.filter(function (l) { return TEXTS[l.code]; });
};
SITE.language = function (code) {
    return CONFIG.languages.find(function (l) { return l.code == code; }) || CONFIG.languages[0];
};

SITE.shotFile = function (name) {
    return CONFIG.shotsPath + name + ".jpg";
};

// *** YOUTUBE:
// The id of a YouTube address (watch?v=, youtu.be/, shorts/, embed/), "" when it is not one.
SITE.youtubeId = function (url) {
    if (!url) return "";
    const m = String(url).match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/|\/live\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : "";
};

// *** SCROLL:
SITE.addScrollBar = function (scrollableBox, params = {}) {
    if (typeof ScrollBar !== "function") return null;
    params.scrollableBox = scrollableBox;
    return ScrollBar(params);
};

SITE.scrollToKey = function (key, smooth = 1) {
    const target = SITE.sections[key];
    if (!target || !SITE.scrollBox) return;
    const boxElem = SITE.scrollBox.elem;
    const top = target.elem.getBoundingClientRect().top - boxElem.getBoundingClientRect().top + boxElem.scrollTop - SITE.L.headerH + 1;
    boxElem.scrollTo({ top: Math.max(0, top), behavior: smooth ? "smooth" : "auto" });
};

// The key of the section at the top of the screen (to keep the place when the page is built again)
SITE.getVisibleSectionKey = function () {
    if (!SITE.scrollBox) return "";
    const boxTop = SITE.scrollBox.elem.getBoundingClientRect().top;
    let foundKey = "";
    for (let key in SITE.sections) {
        if (SITE.sections[key].elem.getBoundingClientRect().top - boxTop <= SITE.L.headerH + 4) foundKey = key;
    }
    return foundKey;
};

// *** CSS:
// WHY: the hover / focus look of the buttons and the pictures can not be given with inline styles.
SITE.injectCss = function () {
    if (document.getElementById("site-css")) return;
    const st = document.createElement("style");
    st.id = "site-css";
    st.textContent = [
        ".site-button:hover { transform: translateY(-1px); filter: brightness(1.08); }",
        ".site-button:active { transform: translateY(0) scale(0.98); }",
        ".site-button-glass:hover { filter: none; background-color: rgba(18, 32, 48, 0.72) !important; border-color: rgba(255, 230, 170, 0.6) !important; }",
        ".site-button:focus-visible, .site-link:focus-visible, .site-shot:focus-visible { outline: 2px solid " + SITE.GOLD + "; outline-offset: 3px; }",
        ".site-link { cursor: pointer; transition: color 0.15s; }",
        ".site-lang { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: auto; cursor: pointer; appearance: none; -webkit-appearance: none;" +
            " font: 13px opensans-bold, sans-serif; color: " + SITE.CREAM + "; background: rgba(8, 16, 26, 0.55) url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6'><path d='M1 1l4 4 4-4' stroke='%23F6E8CE' fill='none' stroke-width='1.5'/></svg>\") no-repeat right 12px center;" +
            " border: 1px solid rgba(255, 255, 255, 0.18); border-radius: 16px; padding: 0 28px 0 12px; text-overflow: ellipsis; }",
        ".site-lang:hover { border-color: " + SITE.GOLD + "; }",
        ".site-lang:focus-visible { outline: 2px solid " + SITE.GOLD + "; outline-offset: 2px; }",
        ".site-lang option { color: #111; background: #fff; }",
        ".site-link:hover { color: " + SITE.GOLD + " !important; }",
        ".site-shot { cursor: zoom-in; transition: transform 0.25s ease, box-shadow 0.25s ease; }",
        ".site-shot:hover { transform: translateY(-3px); }",
        "@keyframes site-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }",
        ".site-in { animation: site-in 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both; }",
        "@media (prefers-reduced-motion: reduce) { .site-in { animation: none; } .site-shot, .site-button { transition: none; } }",
    ].join("\n");
    document.head.appendChild(st);
};
