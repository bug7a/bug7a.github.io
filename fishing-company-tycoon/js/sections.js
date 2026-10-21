/* Bismillah */

/*

Fishing Company Tycoon Website - Sections - v26.10

- Sayfanın bölümleri, yukarıdan aşağıya: üst çubuk, giriş, video, oyun (özellikler), sayılar, görüntüler, çağrı, alt bilgi.
  Ayrıca resim büyütme penceresi (Lightbox).
- The sections of the page, top to bottom: header, hero, video, features, facts, screenshots, call, footer; and the
  lightbox of the screenshots.
- Each one is a function that creates its objects in the current container (js/site.js calls them in order).

Developer: Bugra Ozden
Email: bugra.ozden@gmail.com

*/

"use strict";

const Sections = {};

// NOTE (2026-10-21, the user: "the box of the buttons cuts the button that moves out of it; we meet this often"): a
// basic.js group clips its content (clipContent 1, overflow hidden). A button lifts 1 px and a picture 3 px under the
// mouse: in a group as high as its content they were cut. EVERY group of this file has clipContent: 0.

// *** HEADER: fixed at the top, over the scrolling box; transparent over the hero, solid after it
Sections.header = function (params = {}) {

    const L = SITE.L, T = SITE.T;
    const sidePad = Math.max(L.gutter, Math.round((L.w - L.content) / 2));

    const box = Box(0, 0, "100%", L.headerH, { color: "transparent" });
    box.elem.style.zIndex = "100";
    box.elem.style.transition = "background-color 0.25s, box-shadow 0.25s";
    box.elem.setAttribute("role", "banner");

    createIn(box, function () {
        HGroup({ clipContent: 0, width: "100%", height: "100%", align: "left center", gap: L.mobile ? 10 : 26, padding: [sidePad, 0] });

            // LOGO (back to the top)
            const logo = Icon({ width: Math.round((L.mobile ? 30 : 36) * 720 / 273), height: L.mobile ? 30 : 36, clickable: 1 });
            that.load(CONFIG.logoFile);
            logo.elem.alt = CONFIG.gameName;
            logo.elem.style.cursor = "pointer";
            logo.elem.style.flexShrink = "0";
            logo.on("click", function () { params.onNavClick("top"); });

            Box({ width: 10, height: 1, color: "transparent", css: { flexGrow: "1" } }); // (the space in the middle)

            // THE MENU (not on a phone: the page is short enough to scroll)
            if (!L.mobile) {
                T.nav.forEach(function (item) {
                    Label({ text: item[1], fontSize: 14, bold: 1, textColor: SITE.CREAM, clickable: 1, css: { whiteSpace: "nowrap" } });
                    that.elem.classList.add("site-link");
                    that.elem.setAttribute("role", "link");
                    that.elem.tabIndex = 0;
                    const key = item[0];
                    that.on("click", function () { params.onNavClick(key); });
                    that.on("keydown", function (self, e) { if (e.key == "Enter") params.onNavClick(key); });
                });
            }

            // LANGUAGE: a native <select> (keyboard, screen readers and the menus of phones handle it), styled dark.
            // Every language is written in itself (lang= on its option). (It was an EN / TR switch until 2026-10-21.)
            const langBox = Box({ width: L.mobile ? 104 : 150, height: 32, color: "transparent", clipContent: 0, css: { flexShrink: "0" } });
            const sel = document.createElement("select");
            sel.className = "site-lang";
            sel.setAttribute("aria-label", "Language");
            SITE.languages().forEach(function (l) {
                const o = document.createElement("option");
                o.value = l.code; o.textContent = l.name; o.lang = l.htmlLang;
                if (l.code == SITE.lang) o.selected = true;
                sel.appendChild(o);
            });
            sel.addEventListener("change", function () { params.onLanguageChange(sel.value); });
            langBox.elem.appendChild(sel);

            // STEAM (not on a phone: the hero has it)
            if (!L.mobile) SITE.steamButton({ height: 38, fontSize: 13 });

        endGroup();
    });

    box.refreshScrollState = function (scrollTop) {
        const solid = scrollTop > 40;
        if (box.isSolid === solid) return;
        box.isSolid = solid;
        box.elem.style.backgroundColor = solid ? "rgba(11, 20, 32, 0.94)" : "transparent";
        box.elem.style.boxShadow = solid ? "0 1px 0 rgba(255,255,255,0.06), 0 8px 24px rgba(0,0,0,0.35)" : "none";
    };

    return box;

};

// *** HERO: the picture of the main menu of the game, the logo, the short text, the buttons
Sections.hero = function (params = {}) {

    const L = SITE.L, T = SITE.T;
    const height = L.mobile ? Math.max(640, L.h) : Math.min(Math.max(L.h, 660), 900);

    const box = Box({ width: "100%", height: height, color: SITE.BG, clipContent: 1 });
    SITE.sections.top = box;

    createIn(box, function () {

        // THE PICTURE (no lazy loading: it is the first thing seen)
        const back = Icon(0, 0, "100%", "100%");
        that.load(L.mobile ? CONFIG.heroImageSmall : CONFIG.heroImage);
        back.elem.style.objectFit = "cover";
        back.elem.style.objectPosition = L.mobile ? "38% center" : "center 40%";
        back.elem.alt = "";
        back.elem.fetchPriority = "high";

        // A DARK VEIL: the texts are read on every part of the picture; the bottom fades into the page
        Box(0, 0, "100%", "100%", { color: "transparent" });
        that.elem.style.background = "radial-gradient(ellipse 60% 55% at 50% 48%, rgba(6, 14, 24, 0.62), rgba(6, 14, 24, 0.25) 70%, rgba(6, 14, 24, 0.1))," +
            " linear-gradient(to bottom, rgba(11, 20, 32, 0.55) 0%, rgba(11, 20, 32, 0) 18%, rgba(11, 20, 32, 0) 70%, " + SITE.BG + " 100%)";

        VGroup({ clipContent: 0, width: "100%", height: "100%", align: "center center", gap: L.mobile ? 16 : 20, padding: [L.gutter, L.headerH] });
            that.elem.classList.add("site-in");

            const logoW = Math.min(L.mobile ? 320 : 540, L.content);
            const logo = Icon({ width: logoW, height: Math.round(logoW * 273 / 720) });
            that.load(CONFIG.logoFile);
            logo.elem.alt = CONFIG.gameName + ": " + CONFIG.gameSubtitle;
            logo.elem.fetchPriority = "high";
            logo.elem.style.filter = "drop-shadow(0 10px 18px rgba(0, 0, 0, 0.55))";
            logo.elem.style.flexShrink = "0";
            // (the name of the game as the h1 of the page: the logo is a picture, a hidden <h1> says it)
            SITE.hiddenText(box, "h1", CONFIG.gameName + ": " + CONFIG.gameSubtitle);

            SITE.heading(T.heroTagline, 2, { center: 1, width: Math.min(720, L.content) });
            that.fontSize = L.mobile ? 22 : 30;
            that.elem.style.textShadow = "0 2px 10px rgba(0, 0, 0, 0.6)";

            SITE.text(T.heroText, { center: 1, width: Math.min(640, L.content), color: "rgba(246, 236, 218, 0.88)" });
            that.elem.style.textShadow = "0 1px 6px rgba(0, 0, 0, 0.7)";

            HGroup({ clipContent: 0, width: L.content, height: "auto", gap: 12, align: "center center", wrap: 1, css: { marginTop: "8px" } });
                SITE.steamButton();
                SITE.button({ kind: "glass", icon: "play", text: T.heroVideoButton, onClick: function () { params.onNavClick("video"); } });
            endGroup();

            Label({ text: T.heroNote, fontSize: 13, textColor: "rgba(246, 236, 218, 0.62)", css: { whiteSpace: "normal", textAlign: "center", letterSpacing: "0.3px", textShadow: "0 1px 4px rgba(0,0,0,0.7)" } });

        endGroup();

    });

    return box;

};

// *** VIDEO: the intro on YouTube (CONFIG.youtubeIntroURL); without it a "coming soon" card
Sections.video = function () {

    const L = SITE.L, T = SITE.T;
    const id = SITE.youtubeId(CONFIG.youtubeIntroURL);

    SITE.startSection("video", { color: SITE.BG, padY: L.mobile ? 40 : 64 });

        SITE.eyebrow(T.videoEyebrow);
        SITE.heading(T.videoTitle, 2, { center: 1 });

        const w = Math.min(960, L.content);
        const h = (!id && L.mobile) ? Math.round(w * 0.8) : Math.round(w * 9 / 16); // (the "coming soon" card needs room on a phone)
        const frame = Box({ width: w, height: h, round: 14, color: "#000", clipContent: 1,
            css: { boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.07)", flexShrink: "0" } });

        if (id) {
            // (youtube-nocookie: no cookies until the visitor plays it; a raw element in a basic.js box needs pointer-events)
            frame.elem.innerHTML = "<iframe src='https://www.youtube-nocookie.com/embed/" + id + "?rel=0' title='" + CONFIG.gameName + "'" +
                " style='position:absolute;left:0;top:0;width:100%;height:100%;border:0;pointer-events:auto'" +
                " allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen loading='lazy'></iframe>";
            // (referrerpolicy: YouTube shows "Error 153" when it gets no referrer; opened as file:// there is none either)
        } else {
            createIn(frame, function () {
                const pic = Icon(0, 0, "100%", "100%");
                that.load(SITE.shotFile("01-harbor"));
                pic.elem.style.objectFit = "cover";
                pic.elem.style.filter = "blur(3px) brightness(0.45)";
                pic.elem.style.transform = "scale(1.04)";
                pic.elem.loading = "lazy";
                pic.elem.alt = "";
                VGroup({ clipContent: 0, width: "100%", height: "100%", align: "center center", gap: 16, padding: [20, 20] });
                    Label({ text: SITE.svg("play", L.mobile ? 34 : 44), width: L.mobile ? 70 : 88, height: L.mobile ? 70 : 88, round: 50, textColor: SITE.GOLD_DARK, color: SITE.GOLD,
                        css: { display: "flex", alignItems: "center", justifyContent: "center", paddingLeft: "5px", boxSizing: "border-box", opacity: "0.9" } });
                    SITE.text(T.videoSoon, { center: 1, color: SITE.CREAM, size: L.mobile ? 16 : 19 });
                    SITE.button({ kind: "glass", icon: "youtube", text: T.videoChannel, url: CONFIG.youtubeChannelURL, height: 42, fontSize: 13 });
                    that.elem.style.whiteSpace = "normal";
                    that.elem.style.textAlign = "center";
                    if (L.mobile) { that.height = "auto"; that.elem.style.padding = "10px 18px"; }
                endGroup();
            });
        }

    SITE.endSection();

};

// *** FEATURES: the five parts of the store text, each with a screenshot (left / right in turn)
Sections.features = function () {

    const L = SITE.L, T = SITE.T;

    SITE.startSection("features", { color: SITE.BG_SOFT, gap: L.mobile ? 40 : 72 });

        VGroup({ clipContent: 0, width: "100%", height: "auto", align: "center top", gap: 14 });
            SITE.eyebrow(T.featuresEyebrow);
            SITE.heading(T.featuresTitle, 2, { center: 1, width: Math.min(820, L.content) });
            SITE.text(T.featuresLead, { center: 1, width: Math.min(720, L.content) });
        endGroup();

        const stacked = L.mobile || L.tablet;
        const picW = stacked ? Math.min(720, L.content) : Math.round(L.content * 0.56);
        const textW = stacked ? Math.min(720, L.content) : L.content - picW - 56;

        T.features.forEach(function (f, i) {
            const picFirst = stacked || (i % 2 == 0);
            const row = stacked ? VGroup({ clipContent: 0, width: "100%", height: "auto", align: "center top", gap: 22 })
                : HGroup({ clipContent: 0, width: "100%", height: "auto", align: "center center", gap: 56 });
                const addPicture = function () {
                    const pic = SITE.picture(SITE.shotFile(f.shot), picW, 9 / 16, { alt: f.title });
                    pic.clickable = 1;
                    pic.elem.classList.add("site-shot");
                    pic.on("click", function () { Lightbox.open(SCREENSHOTS.findIndex(function (s) { return s.file == f.shot; })); });
                };
                const addText = function () {
                    VGroup({ clipContent: 0, width: textW, height: "auto", align: "left top", gap: 12 });
                        Label({ text: String(i + 1).padStart(2, "0"), fontSize: 14, bold: 1, textColor: SITE.GOLD, css: { letterSpacing: "1.5px" } });
                        SITE.heading(f.title, 3);
                        SITE.text(f.text);
                    endGroup();
                };
                if (picFirst) { addPicture(); addText(); } else { addText(); addPicture(); }
            endGroup();
            row.elem.setAttribute("role", "group");
        });

    SITE.endSection();

};

// *** FACTS: the numbers of the game
Sections.facts = function () {

    const L = SITE.L, T = SITE.T;

    SITE.startSection("facts", { color: SITE.BG, padY: L.mobile ? 56 : 88 });

        SITE.heading(T.factsTitle, 2, { center: 1 });

        const cardW = L.columns(4);
        HGroup({ clipContent: 0, width: "100%", height: "auto", gap: L.gap, align: "center top", wrap: 1 });
            T.facts.forEach(function (f) {
                VGroup({ clipContent: 0, width: cardW, height: "auto", align: "left top", gap: 4, color: SITE.SURFACE, round: 14, padding: [L.mobile ? 16 : 22, L.mobile ? 16 : 20],
                    css: { boxShadow: "inset 0 0 0 1px " + SITE.LINE, flexShrink: "0", boxSizing: "border-box" } });
                    Label({ text: f[0], fontSize: L.mobile ? 30 : 40, textColor: SITE.GOLD, css: { fontFamily: SITE.BOLD, lineHeight: "1.1" } });
                    Label({ text: f[1], width: "100%", fontSize: L.mobile ? 13 : 15, textColor: SITE.TEXT, css: { whiteSpace: "normal", lineHeight: "1.4" } });
                endGroup();
            });
        endGroup();

    SITE.endSection();

};

// *** SCREENSHOTS: a grid; a click opens the lightbox
Sections.screenshots = function () {

    const L = SITE.L, T = SITE.T;

    SITE.startSection("screenshots", { color: SITE.BG_SOFT });

        VGroup({ clipContent: 0, width: "100%", height: "auto", align: "center top", gap: 12 });
            SITE.eyebrow(T.shotsEyebrow);
            SITE.heading(T.shotsTitle, 2, { center: 1 });
            SITE.text(T.shotsHint, { center: 1, color: SITE.TEXT_SOFT, size: 14 });
        endGroup();

        const w = L.mobile ? Math.floor((L.content - 10) / 2) : L.columns(3);
        HGroup({ clipContent: 0, width: "100%", height: "auto", gap: L.mobile ? 10 : L.gap, align: "left top", wrap: 1 });
            SCREENSHOTS.forEach(function (s, i) {
                if (s.notInGrid) return; // (the lightbox still shows it)
                const pic = SITE.picture(SITE.shotFile(s.file), w, 9 / 16, { round: L.mobile ? 6 : 10, alt: SITE.caption(i) });
                pic.clickable = 1;
                pic.elem.classList.add("site-shot");
                pic.elem.tabIndex = 0;
                pic.elem.setAttribute("role", "button");
                pic.elem.title = SITE.caption(i);
                pic.on("click", function () { Lightbox.open(i); });
                pic.on("keydown", function (self, e) { if (e.key == "Enter") Lightbox.open(i); });
            });
        endGroup();

    SITE.endSection();

};

// *** INFO: the system requirements and the press kit, two cards side by side
Sections.info = function () {

    const L = SITE.L, T = SITE.T;

    SITE.startSection("info", { color: SITE.BG, padY: L.mobile ? 56 : 88 });

        const stacked = L.mobile || L.tablet;
        const cardW = stacked ? L.content : Math.floor((L.content - L.gap) / 2);
        const pad = L.mobile ? 20 : 30;

        const card = function () {
            return VGroup({ clipContent: 0, width: cardW, height: "auto", align: "left top", gap: 14, color: SITE.SURFACE, round: 16, padding: [pad, pad],
                css: { boxShadow: "inset 0 0 0 1px " + SITE.LINE, flexShrink: "0", boxSizing: "border-box", alignSelf: "stretch" } });
        };
        // a list of [title, value] rows
        const rows = function (list) {
            VGroup({ clipContent: 0, width: "100%", height: "auto", align: "left top", gap: 0 });
                list.forEach(function (r, i) {
                    HGroup({ clipContent: 0, width: "100%", height: "auto", align: "left top", gap: 12, padding: [0, 10],
                        css: { borderTop: i ? "1px solid " + SITE.LINE : "none", boxSizing: "border-box" } });
                        Label({ text: r[0], width: L.mobile ? 118 : 140, fontSize: 14, textColor: SITE.TEXT_SOFT, css: { whiteSpace: "normal", flexShrink: "0" } });
                        Label({ text: r[1], fontSize: 14, bold: 1, textColor: SITE.CREAM, css: { whiteSpace: "normal", flex: "1 1 0", minWidth: "0" } });
                    endGroup();
                });
            endGroup();
        };

        const row = stacked ? VGroup({ clipContent: 0, width: "100%", height: "auto", align: "center top", gap: L.gap })
            : HGroup({ clipContent: 0, width: "100%", height: "auto", align: "left top", gap: L.gap });

            // SYSTEM REQUIREMENTS
            card();
                SITE.heading(T.reqTitle, 3);
                rows(T.requirements);
                SITE.text(T.reqNote, { size: 13, color: SITE.TEXT_SOFT });
            endGroup();

            // PRESS KIT
            card();
                SITE.heading(T.pressTitle, 3);
                SITE.text(T.pressText, { size: 15 });
                rows(T.pressFacts);
                HGroup({ clipContent: 0, width: "100%", height: "auto", align: "left center", gap: 14, wrap: 1 });
                    SITE.button({ kind: "line", text: T.pressButton, height: 44, fontSize: 14, onClick: function () {
                        // (a link with `download`: the zip is saved, not opened)
                        const a = document.createElement("a");
                        a.href = CONFIG.pressKitFile;
                        a.download = "fishing-company-tycoon-press-kit.zip";
                        document.body.appendChild(a); a.click(); a.remove();
                    } });
                    Label({ text: T.pressSize, fontSize: 13, textColor: SITE.TEXT_SOFT });
                endGroup();
            endGroup();

        endGroup();

    SITE.endSection();

};

// *** CALL: the last words before the footer: Steam and YouTube
Sections.call = function () {

    const L = SITE.L, T = SITE.T;

    SITE.startSection("call", { color: SITE.BG_SOFT, padY: L.mobile ? 56 : 96 });

        const card = VGroup({ clipContent: 0, width: "100%", height: "auto", align: "center top", gap: 18, round: 20, padding: [L.mobile ? 20 : 48, L.mobile ? 36 : 56],
            css: { boxSizing: "border-box", boxShadow: "inset 0 0 0 1px rgba(242, 193, 78, 0.25)" } });
            card.elem.style.background = "linear-gradient(180deg, rgba(11, 20, 32, 0.55), rgba(11, 20, 32, 0.92)), url('" + CONFIG.heroImageSmall + "') center 60% / cover";

            const icon = Icon({ width: L.mobile ? 72 : 88, height: L.mobile ? 72 : 88, round: 18 });
            that.load(CONFIG.iconFile);
            icon.elem.alt = "";
            icon.elem.loading = "lazy";
            icon.elem.style.boxShadow = "0 10px 24px rgba(0,0,0,0.5)";
            icon.elem.style.flexShrink = "0";

            SITE.heading(T.callTitle, 2, { center: 1 });
            SITE.text(T.callText, { center: 1, width: Math.min(620, L.content - 40), color: "rgba(246, 236, 218, 0.85)" });

            HGroup({ clipContent: 0, width: "100%", height: "auto", gap: 12, align: "center center", wrap: 1 });
                SITE.steamButton();
                SITE.button({ kind: "line", icon: "youtube", text: T.youtubeButton, url: CONFIG.youtubeChannelURL });
            endGroup();
        endGroup();

    SITE.endSection();

};

// *** FOOTER
Sections.footer = function (params = {}) {

    const L = SITE.L, T = SITE.T;

    const box = VGroup({ clipContent: 0, width: "100%", height: "auto", align: "center top", gap: 0, color: "#08101A", padding: [L.gutter, L.mobile ? 30 : 40] });
        box.elem.setAttribute("role", "contentinfo");
        const inner = L.mobile ? VGroup({ clipContent: 0, width: L.content, height: "auto", align: "center top", gap: 14 })
            : HGroup({ clipContent: 0, width: L.content, height: "auto", align: "left center", gap: 18 });

            VGroup({ clipContent: 0, width: L.mobile ? "100%" : "auto", height: "auto", align: L.mobile ? "center top" : "left top", gap: 4, css: { flexGrow: L.mobile ? "0" : "1" } });
                Label({ text: CONFIG.gameName + ": " + CONFIG.gameSubtitle, fontSize: 14, bold: 1, textColor: SITE.CREAM, css: { whiteSpace: "normal", textAlign: L.mobile ? "center" : "left" } });
                // (the name is a real <a>: search engines follow it; a raw element in a basic.js box needs pointer-events)
                const authorLink = "<a href='" + CONFIG.authorURL + "' target='_blank' rel='noopener' class='site-link' style='color: " + SITE.CREAM + "; text-decoration: none; pointer-events: auto'>" + CONFIG.authorName + "</a>";
                Label({ text: T.footerMade.replace("{author}", authorLink), fontSize: 13, textColor: SITE.TEXT_SOFT, css: { whiteSpace: "normal", textAlign: L.mobile ? "center" : "left" } });
                Label({ text: T.footerRights, fontSize: 12, textColor: "rgba(232, 238, 245, 0.36)", css: { whiteSpace: "normal", textAlign: L.mobile ? "center" : "left" } });
            endGroup();

            HGroup({ clipContent: 0, width: "auto", height: "auto", gap: 18, align: "center center", wrap: 1 });
                const link = function (html, onClick) {
                    Label({ text: html, fontSize: 13, bold: 1, textColor: SITE.TEXT, clickable: 1, css: { whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "6px" } });
                    that.elem.classList.add("site-link");
                    that.elem.setAttribute("role", "link");
                    that.elem.tabIndex = 0;
                    that.on("click", onClick);
                    that.on("keydown", function (self, e) { if (e.key == "Enter") onClick(); });
                };
                link(SITE.svg("youtube", 16) + "YouTube", function () { window.open(CONFIG.youtubeChannelURL, "_blank", "noopener"); });
                if (CONFIG.steamURL) link(SITE.svg("steam", 16) + "Steam", function () { window.open(CONFIG.steamURL, "_blank", "noopener"); });
                link(SITE.svg("up", 16) + T.toTop, function () { params.onNavClick("top"); });
            endGroup();

        endGroup();
    endGroup();

    return box;

};

// *** LIGHTBOX: a screenshot on the whole screen; arrows / keys for the next one, Escape or a click on the dark closes
const Lightbox = { box: null, index: 0, offKey: null };

Lightbox.open = function (index) {

    if (index < 0) index = 0;
    Lightbox.close();
    const L = SITE.L, T = SITE.T;

    createIn(page, function () {
        const box = Box(0, 0, "100%", "100%", { color: "rgba(4, 8, 14, 0.94)", clickable: 1 });
        box.elem.style.zIndex = "500";
        box.elem.setAttribute("role", "dialog");
        box.elem.setAttribute("aria-modal", "true");
        Lightbox.box = box;

        createIn(box, function () {
            VGroup({ clipContent: 0, width: "100%", height: "100%", align: "center center", gap: 14, padding: [L.mobile ? 8 : 70, L.mobile ? 60 : 40] });
                box.img = Icon({ width: 10, height: 10, round: 10 });
                box.img.elem.style.objectFit = "contain";
                box.img.elem.style.boxShadow = "0 20px 60px rgba(0,0,0,0.6)";
                box.img.elem.style.flexShrink = "0";
                box.caption = Label({ text: "", fontSize: 15, textColor: SITE.CREAM, css: { whiteSpace: "normal", textAlign: "center" } });
            endGroup();

            const roundButton = function (icon, label, x, y, onClick) {
                Label({ text: SITE.svg(icon, 22), width: 46, height: 46, round: 23, color: "rgba(255,255,255,0.1)", textColor: "white", clickable: 1,
                    css: { display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", cursor: "pointer" } });
                Object.assign(that.elem.style, { left: "auto", top: "auto" }, x, y); // (basic.js writes a left / top: they would win over right / bottom)
                that.elem.classList.add("site-button");
                that.elem.setAttribute("aria-label", label);
                that.elem.setAttribute("role", "button");
                that.on("click", function (self, e) { e.stopPropagation(); onClick(); });
            };
            roundButton("close", T.lightboxClose, { right: "16px" }, { top: "16px" }, Lightbox.close);
            roundButton("left", "<", { left: L.mobile ? "12px" : "16px" }, { top: L.mobile ? "auto" : "calc(50% - 23px)", bottom: L.mobile ? "16px" : "auto" }, function () { Lightbox.show(Lightbox.index - 1); });
            roundButton("right", ">", { right: L.mobile ? "12px" : "16px" }, { top: L.mobile ? "auto" : "calc(50% - 23px)", bottom: L.mobile ? "16px" : "auto" }, function () { Lightbox.show(Lightbox.index + 1); });
        });

        box.on("click", function (self, e) { if (e.target === box.elem || e.target.parentElement === box.elem) Lightbox.close(); });
    });

    const onKey = function (e) {
        if (e.key == "Escape") Lightbox.close();
        else if (e.key == "ArrowLeft") Lightbox.show(Lightbox.index - 1);
        else if (e.key == "ArrowRight") Lightbox.show(Lightbox.index + 1);
    };
    window.addEventListener("keydown", onKey);
    Lightbox.offKey = function () { window.removeEventListener("keydown", onKey); };

    Lightbox.show(index);

};

Lightbox.show = function (index) {
    if (!Lightbox.box) return;
    const n = SCREENSHOTS.length;
    Lightbox.index = (index + n) % n;
    const s = SCREENSHOTS[Lightbox.index];
    const L = SITE.L;
    const maxW = L.w - (L.mobile ? 16 : 140), maxH = L.h - (L.mobile ? 170 : 130);
    const w = Math.min(maxW, Math.round(maxH * 16 / 9));
    Lightbox.box.img.width = w;
    Lightbox.box.img.height = Math.round(w * 9 / 16);
    Lightbox.box.img.load(SITE.shotFile(s.file));
    Lightbox.box.img.elem.alt = SITE.caption(Lightbox.index);
    Lightbox.box.caption.text = (Lightbox.index + 1) + " / " + n + " · " + SITE.caption(Lightbox.index);
};

Lightbox.close = function () {
    if (Lightbox.offKey) { Lightbox.offKey(); Lightbox.offKey = null; }
    if (Lightbox.box) { Lightbox.box.remove(); Lightbox.box = null; }
};
