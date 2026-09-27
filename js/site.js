/* Bismillah */

/*

bug7a.github.io - v26.09 (v3)
The personal web page of Buğra Özden, written with basic.js.

- The code of the page. The same file for every language: the content and the texts are in SITE
  (js/content-en.js, js/content-tr.js), loaded before this file by the page of the language
  (index.html, tr/index.html).
- Everything on the page is created with code. Edit the content in SITE, the look in STYLE below,
  and nothing else has to change.
- The page itself never scrolls (basic.css). All the content is in one scrolling
  Box, and the top bar is over it.
- Motion: the Web Animations API (elem.animate) for the loops, and an
  IntersectionObserver for the sections that come in while scrolling.
  All of it is off when the system asks for reduced motion.

*/

"use strict";

// *** STYLE: (Colors and sizes of the page.)
const STYLE = {
    pageColor: "#07070B",
    surface: "rgba(255, 255, 255, 0.035)",
    line: "rgba(255, 255, 255, 0.08)",
    lineHover: "rgba(255, 255, 255, 0.2)",
    text: "#F4F4F7",
    softText: "rgba(244, 244, 247, 0.66)",
    faintText: "rgba(244, 244, 247, 0.42)",
    violet: "#8B5CF6",
    cyan: "#22D3EE",
    pink: "#F472B6",
    green: "#34D399",
    font: "'Plus Jakarta Sans', opensans, sans-serif",
    ease: "cubic-bezier(0.16, 1, 0.3, 1)",
    maxWidth: 1160,
    sideSpace: 24,
    navHeight: 58,
    navTop: 14,
};
STYLE.gradient = "linear-gradient(110deg, " + STYLE.violet + " 0%, " + STYLE.cyan + " 100%)";
STYLE.gradientText = "linear-gradient(110deg, #A78BFA 0%, " + STYLE.cyan + " 55%, #A5F3FC 100%)";

// *** PAGE OBJECTS AND FUNCTIONS: (Not global names. WHY: A global "createButton" breaks Button().)
const Site = {
    scrollBox: null,
    main: null,
    hero: null,
    heroBg: null,
    heroContent: null,
    nav: null,
    progress: null,
    lightbox: null,
    observer: null,
    sections: {},
    navLinks: {},
    columns: [],
    headings: [],
    cards: [],
    tiles: [],
    osCards: [],
    form: null,     // The contact form (null: the form components could not be loaded)
    formBox: null,
    width: STYLE.maxWidth,
    isSmall: 0,
    activeKey: "",
    reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    finePointer: window.matchMedia("(pointer: fine)").matches,
};

// *** START:
const start = function () {

    page.color = STYLE.pageColor;
    // NOTE: The title is the <title> in <head> (SEO), it is not changed here.

    // BOX: The scrolling page. WHY: page never scrolls (basic.css).
    Site.scrollBox = startBox(0, 0, "100%", "100%", {
        color: "transparent",
        scrollY: 1,
    });
    Site.scrollBox.elem.style.scrollbarWidth = "none"; // The ScrollBar below is used instead.
    Site.initReveal();

        // GROUP: Everything, one under the other. The columns in it are centered.
        Site.main = VGroup({
            width: "100%",
            height: "auto", // Grows with the content, so the Box can scroll.
            align: "center top",
            gap: 0,
        });

            Site.createHero();
            Site.createMarquee();

            Site.createServices();
            Site.createProjects();
            Site.createMoreProjects();
            Site.createOpenSource();
            Site.createContact();

        endGroup();

    endBox();

    ScrollBar({
        scrollableBox: Site.scrollBox,
        bar_color: "#FFFFFF",
        bar_mouseOverColor: "#FFFFFF",
        bar_opacity: 0.18,
        bar_mouseOverOpacity: 0.4,
        bar_width: 4,
        bar_padding: 3,
        showDots: 0,
        neverHide: 0,
    });

    Site.createTopBar();
    Site.createLightbox();
    Site.addSemantics();

    Site.scrollBox.elem.addEventListener("scroll", Site.requestScrollUpdate, { passive: true });
    page.onResize(Site.layout);
    Site.layout();
    // WHY: The web font changes the height of the texts (the contact form box is as tall as the form).
    if (document.fonts) document.fonts.ready.then(Site.layout);
    Site.updateScroll();

    Site.playIntro();
    Site.typeWords();

};

// *** PAGE PARTS:

// SEO / accessibility: basic.js draws with <div>s, so the headings and the parts of the page are
// told with ARIA roles. (h1: the name, h2: the sections, h3: the cards)
Site.addSemantics = function () {

    const heading = function (obj, level) {
        if (!obj) return;
        obj.elem.setAttribute("role", "heading");
        obj.elem.setAttribute("aria-level", String(level));
    };

    heading(Site.lblName, 1);
    Site.headings.forEach(function (obj) { heading(obj, 2); });
    Site.cards.forEach(function (item) { heading(item.title, 3); });
    heading(Site.lblContactTitle, 3);

    Site.nav.elem.setAttribute("role", "navigation");
    Site.main.elem.setAttribute("role", "main");

};

// BAR: A floating glass bar. Name on the left, section links on the right.
Site.createTopBar = function () {

    // WHY: Not clickable, so the wheel goes to the scrolling box. Only the bar is clickable.
    Site.topBar = startBox(0, 0, "100%", STYLE.navTop + STYLE.navHeight + 10, {
        color: "transparent",
    });

        // BOX: Scroll progress line
        Site.progress = Box(0, 0, 0, 2, {
            color: "transparent",
            css: { backgroundImage: STYLE.gradient, boxShadow: "0 0 12px " + STYLE.violet },
        });

        Site.nav = HGroup({
            width: 100,
            height: STYLE.navHeight,
            align: "left center",
            justify: "space-between",
            gap: 12,
            clickable: 1,
            css: {
                padding: "0 8px 0 10px",
                borderRadius: "999px",
                border: "1px solid transparent",
                backdropFilter: "blur(18px) saturate(160%)",
                webkitBackdropFilter: "blur(18px) saturate(160%)",
                transition: "background-color 0.4s, border-color 0.4s, box-shadow 0.4s",
                overflow: "visible", // WHY: The glow of the Contact button is not cut.
            },
        });
        Site.nav.top = STYLE.navTop;

            // GROUP: Logo and name
            const brand = HGroup({
                hug: 1,
                gap: 10,
                align: "left center",
                cursor: "pointer",
            });
            brand.on("click", function () { Site.scrollTo(null); });

                // ICON: Monogram "BÖ" (img/monogram.svg, also the site icon; the letters are paths of Plus Jakarta Sans ExtraBold)
                Icon({
                    width: 38,
                    height: 38,
                    alt: SITE.name,
                    css: { flexShrink: "0" },
                });
                that.load("img/monogram.svg");

                Site.label({
                    text: SITE.name,
                    fontSize: 15,
                    css: { fontWeight: "700", whiteSpace: "nowrap" },
                });

            endGroup();

            // GROUP: Right side
            HGroup({
                hug: 1,
                gap: 8,
                align: "right center",
                css: { overflow: "visible" }, // WHY: The glow of the Contact button is not cut.
            });

                // GROUP: Section links
                Site.navGroup = HGroup({
                    hug: 1,
                    gap: 2,
                    align: "right center",
                });

                    Site.createNavLink(SITE.ui.navServices, "services");
                    Site.createNavLink(SITE.ui.navProjects, "projects");
                    Site.createNavLink(SITE.ui.navOpenSource, "openSource");
                    Site.createNavLink(SITE.ui.navContact, "contact");

                endGroup();

                Site.createLanguageLink();

                // A small screen has no links, only this button.
                Site.btnNavContact = Site.button(SITE.ui.navContact, function () { Site.scrollTo(Site.sections.contact); }, "primary", "small");

            endGroup();

        endGroup();

    endBox();

};

// LANGUAGE: A link to the page in the other language ("TR" / "EN"), on every screen size.
// WHY: A real <a href>, so search engines follow it too. (The two pages also tell it with hreflang in <head>.)
Site.createLanguageLink = function () {

    const lang = SITE.otherLanguage;

    const link = Site.label({
        text: "<a href=\"" + lang.url + "\" hreflang=\"" + lang.code + "\" lang=\"" + lang.code + "\" title=\"" + lang.title + "\" " +
            "style=\"display: block; padding: 7px 12px; color: inherit; text-decoration: none;\">" + lang.text + "</a>",
        fontSize: 13,
        textColor: STYLE.softText,
        cursor: "pointer",
        clickable: 1,
        css: {
            borderRadius: "999px",
            border: "1px solid " + STYLE.lineHover,
            whiteSpace: "nowrap",
            fontWeight: "700",
            letterSpacing: "0.08em",
            transition: "color 0.2s, background-color 0.2s",
        },
    });

    link.on("mouseenter", function () { link.textColor = STYLE.text; link.css.backgroundColor = "rgba(255, 255, 255, 0.08)"; });
    link.on("mouseleave", function () { link.textColor = STYLE.softText; link.css.backgroundColor = "transparent"; });

    return link;

};

Site.createNavLink = function (text, sectionKey) {

    const link = Site.label({
        text: text,
        fontSize: 14,
        textColor: STYLE.softText,
        cursor: "pointer",
        clickable: 1,
        css: {
            padding: "8px 14px",
            borderRadius: "999px",
            whiteSpace: "nowrap",
            fontWeight: "500",
            transition: "color 0.2s, background-color 0.2s",
        },
    });

    link.on("click", function () { Site.scrollTo(Site.sections[sectionKey]); });
    link.on("mouseenter", function () { link.textColor = STYLE.text; });
    link.on("mouseleave", function () { if (Site.activeKey != sectionKey) link.textColor = STYLE.softText; });

    Site.navLinks[sectionKey] = link;
    return link;

};

// HERO: Moving light, the name, the typed words and the buttons. It fills the screen.
Site.createHero = function () {

    Site.hero = startBox(0, 0, "100%", 760, {
        color: "transparent",
    });

        // BOX: Background (bigger than the hero, so it can move with the mouse)
        Site.heroBg = startBox(-40, -40, "calc(100% + 80px)", "calc(100% + 80px)", {
            color: "transparent",
            css: { transition: "transform 1.6s " + STYLE.ease },
        });

            Site.createBlob("28%", "32%", 760, "rgba(139, 92, 246, 0.42)", [90, 60]);
            Site.createBlob("76%", "26%", 620, "rgba(34, 211, 238, 0.26)", [-80, 70]);
            Site.createBlob("58%", "82%", 580, "rgba(244, 114, 182, 0.2)", [60, -70]);

            // BOX: Grid lines, faded at the sides
            Box(0, 0, "100%", "100%", {
                color: "transparent",
                css: {
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                    backgroundPosition: "center center",
                    maskImage: "radial-gradient(ellipse 60% 55% at 50% 45%, #000 20%, transparent 100%)",
                    webkitMaskImage: "radial-gradient(ellipse 60% 55% at 50% 45%, #000 20%, transparent 100%)",
                },
            });

        endBox();

        // BOX: Fade into the page color at the bottom
        Box(0, 0, "100%", 240, {
            color: "transparent",
            css: { top: "auto", bottom: "0px", backgroundImage: "linear-gradient(to bottom, rgba(7,7,11,0) 0%, " + STYLE.pageColor + " 100%)" },
        });

        // GROUP: The hero content, in the middle
        Site.heroContent = VGroup(0, 0, "100%", "100%", {
            align: "center center",
            gap: 0,
            css: { padding: "90px 16px 60px 16px" },
        });

            // GROUP: The role, in a pill with a live dot
            Site.heroBadge = HGroup({
                hug: 1,
                gap: 10,
                align: "left center",
                css: {
                    padding: "9px 18px 9px 14px",
                    borderRadius: "999px",
                    border: "1px solid " + STYLE.line,
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    backdropFilter: "blur(10px)",
                    webkitBackdropFilter: "blur(10px)",
                    maxWidth: "calc(100vw - 32px)",
                },
            });

                const dot = Box({ width: 8, height: 8, color: STYLE.green, css: { borderRadius: "50%", overflow: "visible" } });
                Site.loop(dot, [
                    { boxShadow: "0 0 0 0 rgba(52, 211, 153, 0.6)" },
                    { boxShadow: "0 0 0 9px rgba(52, 211, 153, 0)" },
                ], { duration: 2000 });

                Site.label({
                    text: SITE.role,
                    fontSize: 14,
                    textColor: STYLE.softText,
                    css: { fontWeight: "500" },
                });

            endGroup();

            // LABEL: The name. The last name is in the gradient.
            const nameParts = SITE.name.split(" ");
            const lastName = nameParts.pop();
            Site.lblName = Site.label({
                width: "100%",
                text: nameParts.join(" ") + " " + Site.gradientSpan(lastName),
                fontSize: 104,
                textAlign: "center",
                lineHeight: "1.02",
                css: { fontWeight: "800", letterSpacing: "-0.045em", marginTop: "30px", overflow: "visible", paddingBottom: "0.08em" },
            });

            // GROUP: "Building ..." and the typed word
            Site.typedLine = HGroup({
                width: "100%",
                height: "auto",
                align: "center center",
                gap: 0,
                wrap: 1,
                css: { marginTop: "26px" },
            });

                Site.lblPrefix = Site.label({
                    text: SITE.focusPrefix + "&nbsp;",
                    fontSize: 24,
                    textColor: STYLE.softText,
                    css: { whiteSpace: "nowrap" },
                });

                // GROUP: Typed word + caret (always on the same line)
                HGroup({ hug: 1, gap: 3, align: "left center" });

                    Site.lblTyped = Site.label({
                        text: "",
                        fontSize: 24,
                        lineHeight: 36,
                        textColor: "transparent",
                        css: {
                            whiteSpace: "nowrap",
                            fontWeight: "700",
                            minHeight: "36px",
                            backgroundImage: STYLE.gradientText,
                            webkitBackgroundClip: "text",
                            backgroundClip: "text",
                        },
                    });

                    Site.caret = Box({ width: 3, height: 28, color: STYLE.cyan, round: 2 });
                    Site.loop(Site.caret, [{ opacity: 1 }, { opacity: 1, offset: 0.5 }, { opacity: 0, offset: 0.5 }, { opacity: 0 }], { duration: 1000 });

                endGroup();

            endGroup();

            // GROUP: Buttons
            Site.heroButtons = HGroup({
                width: "100%",
                height: "auto",
                align: "center center",
                gap: 12,
                wrap: 1,
                css: { marginTop: "44px", overflow: "visible" }, // WHY: The hover lift and glow of the buttons are not cut.
            });

                Site.button(SITE.ui.heroServicesButton + " &nbsp;↓", function () { Site.scrollTo(Site.sections.services); }, "primary");
                Site.button(SITE.ui.heroContactButton, function () { Site.scrollTo(Site.sections.contact); }, "ghost");

            endGroup();

            // GROUP: Accounts
            Site.heroAccounts = HGroup({
                width: "100%",
                height: "auto",
                align: "center center",
                gap: 4,
                wrap: 1,
                css: { marginTop: "34px" },
            });

                SITE.accounts.forEach(function (account) {
                    Site.textLink(account.text + " ↗", function () { Site.openUrl(account.url); });
                });

            endGroup();

        endGroup();

        // BOX: "Scroll" mouse at the bottom
        Site.scrollHint = startBox(0, 0, 26, 42, {
            color: "transparent",
            cursor: "pointer",
            css: { left: "calc(50% - 13px)", top: "auto", bottom: "34px", border: "2px solid " + STYLE.lineHover, borderRadius: "13px" },
        });
        Site.scrollHint.on("click", function () { Site.scrollTo(Site.sections.services); });

            const wheel = Box(10, 8, 2, 8, { color: STYLE.text, round: 1 });
            Site.loop(wheel, [
                { transform: "translateY(0)", opacity: 1 },
                { transform: "translateY(12px)", opacity: 0 },
            ], { duration: 1600, easing: "ease-in" });

        endBox();

    endBox();

    // Parallax: the light moves a little with the mouse.
    if (Site.finePointer && !Site.reduceMotion) {
        page.on("mousemove", function (self, event) {
            if (Site.scrollBox.elem.scrollTop > Site.hero.height) return;
            const x = (event.clientX / page.width) - 0.5;
            const y = (event.clientY / page.height) - 0.5;
            Site.heroBg.css.transform = "translate3d(" + Math.round(x * -40) + "px, " + Math.round(y * -40) + "px, 0)";
        });
    }

};

// A soft round light that floats slowly. (left, top: its center)
Site.createBlob = function (left, top, size, color, move) {

    // WHY: left / top as setters. The constructor writes its numbers with "px" ("28%px").
    const blob = Box(0, 0, size, size, {
        left: left,
        top: top,
        color: "transparent",
        css: {
            borderRadius: "50%",
            backgroundImage: "radial-gradient(circle at center, " + color + " 0%, rgba(0,0,0,0) 65%)",
            transform: "translate(-50%, -50%)",
        },
    });

    Site.loop(blob, [
        { transform: "translate(-50%, -50%) translate(0px, 0px) scale(1)" },
        { transform: "translate(-50%, -50%) translate(" + move[0] + "px, " + move[1] + "px) scale(1.18)" },
    ], { duration: 14000 + Math.abs(move[0]) * 60, direction: "alternate", easing: "ease-in-out" });

    return blob;

};

// MARQUEE: Two endless rows of project pictures, moving in opposite ways.
Site.createMarquee = function () {

    const items = [];
    Site.shown(SITE.services).concat(SITE.projects).forEach(function (project) {
        if (project.marquee === 0) return;
        project.images.forEach(function (image) { items.push({ image: image, text: project.title }); });
    });
    SITE.moreProjects.forEach(function (item) { items.push({ image: item.image, text: item.text }); });

    const half = Math.ceil(items.length / 2);
    const tileHeight = 150;
    const gap = 16;

    Site.band = startBox(0, 0, "100%", (tileHeight * 2) + gap + 40, {
        color: "transparent",
        clickable: 1,
        css: {
            marginTop: "-40px",
            maskImage: "linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%)",
            webkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%)",
        },
    });

        const animations = [
            Site.createMarqueeRow(items.slice(0, half), 0, items, 20, tileHeight, gap, false),
            Site.createMarqueeRow(items.slice(half), half, items, 20 + tileHeight + gap, tileHeight, gap, true),
        ];

    endBox();

    // Slow down under the mouse, so a picture can be clicked.
    Site.band.on("mouseenter", function () {
        animations.forEach(function (a) { if (a) a.updatePlaybackRate(0.15); });
    });
    Site.band.on("mouseleave", function () {
        animations.forEach(function (a) { if (a) a.updatePlaybackRate(1); });
    });

};

Site.createMarqueeRow = function (rowItems, firstIndex, allItems, top, tileHeight, gap, reverse) {

    // WHY: max-content, or the absolute flex row is only as wide as the band.
    //      The right padding makes the two halves exactly the same width.
    const track = HGroup({
        hug: 1,
        gap: gap,
        align: "left center",
        css: { width: "max-content", paddingRight: gap + "px" },
    });
    track.left = 0;
    track.top = top;

        // Two copies: when the first one has gone out, the second one is at its place.
        [0, 1].forEach(function () {
            rowItems.forEach(function (item, index) {

                const tile = Icon({
                    width: Math.round(tileHeight * 1.6),
                    height: tileHeight,
                    imageFit: "cover",
                    alt: item.text,
                    round: 14,
                    cursor: "pointer",
                    css: {
                        objectPosition: "center top",
                        border: "1px solid " + STYLE.line,
                        filter: "grayscale(0.5) brightness(0.7)",
                        transition: "filter 0.4s, transform 0.5s " + STYLE.ease,
                    },
                });
                tile.load(item.image);

                tile.on("click", function () { Site.openLightbox(allItems, firstIndex + index); });
                tile.on("mouseenter", function () { tile.css.filter = "none"; tile.css.transform = "scale(1.05)"; });
                tile.on("mouseleave", function () { tile.css.filter = "grayscale(0.5) brightness(0.7)"; tile.css.transform = "none"; });

            });
        });

    endGroup();

    return Site.loop(track, [
        { transform: "translateX(0)" },
        { transform: "translateX(-50%)" },
    ], { duration: rowItems.length * 5200, easing: "linear", direction: (reverse) ? "reverse" : "normal" });

};

// SERVICES: One big card for every service. (The same cards as the projects.)
Site.createServices = function () {

    Site.column("services");

        Site.createSectionHeader("01", SITE.ui.services, Site.shown(SITE.services).length);
        Site.createCards(Site.shown(SITE.services));

    endGroup();

};

// PROJECTS: One big card for every project.
Site.createProjects = function () {

    Site.column("projects");

        Site.createSectionHeader("02", SITE.ui.projects, SITE.projects.length);
        Site.createCards(SITE.projects);

    endGroup();

};

Site.createCards = function (list) {

    // GROUP: Cards
    VGroup({
        width: "100%",
        height: "auto",
        align: "left top",
        gap: 28,
    });

        list.forEach(function (project, index) {
            Site.createProject(project, index, list.length);
        });

    endGroup();

};

// PROJECT: Media (video or pictures) on one side, the texts and links on the other.
// count: The number of cards in the section ("01 —— 04")
Site.createProject = function (project, index, count) {

    const card = HGroup({
        width: "100%",
        height: "auto",
        align: "left center",
        gap: 48,
        css: { borderRadius: "28px", border: "1px solid " + STYLE.line },
    });
    Site.spotlight(card, STYLE.surface);

        // GROUP: Media
        const media = VGroup({
            width: 100,
            height: "auto",
            align: "left top",
            gap: 12,
        });

            if (project.video) {
                Site.createVideo(project.video);
            } else if (project.images.length) {
                Site.createGallery(project);
            } else if (project.features) {
                Site.createFeatures(project.features);
            }

        endGroup();

        // GROUP: Texts
        const info = VGroup({
            width: 100,
            height: "auto",
            align: "left top",
            gap: 0,
            css: { overflow: "visible" }, // WHY: The glow of the link buttons is not cut.
        });

            // GROUP: "01 —— 04"
            HGroup({ hug: 1, gap: 12, align: "left center" });

                Site.label({
                    text: Site.pad(index + 1),
                    fontSize: 13,
                    textColor: "transparent",
                    css: { fontWeight: "800", letterSpacing: "0.18em", backgroundImage: STYLE.gradientText, webkitBackgroundClip: "text", backgroundClip: "text" },
                });
                Box({ width: 32, height: 1, color: STYLE.lineHover });
                Site.label({
                    text: Site.pad(count),
                    fontSize: 13,
                    textColor: STYLE.faintText,
                    css: { fontWeight: "600", letterSpacing: "0.18em" },
                });

            endGroup();

            const title = Site.label({
                width: "100%",
                text: project.title,
                fontSize: 34,
                lineHeight: "1.18",
                css: { fontWeight: "800", letterSpacing: "-0.025em", marginTop: "18px", overflow: "visible" }, // WHY: The letters of a big text (Ö, ğ, g) reach past its line box; basic.css cuts a label.
            });

            project.texts.forEach(function (text) {
                Site.label({
                    width: "100%",
                    text: text,
                    fontSize: 16.5,
                    textColor: STYLE.softText,
                    lineHeight: "1.75",
                    selectable: 1,
                    css: { marginTop: "16px" },
                });
            });

            if (project.links.length) {

                // GROUP: Links
                HGroup({
                    width: "100%",
                    height: "auto",
                    align: "left center",
                    gap: 10,
                    wrap: 1,
                    css: { marginTop: "30px", overflow: "visible" },
                });

                    // link.section: scrolls to a section of this page (ex: "contact") instead of opening an address.
                    project.links.forEach(function (link) {
                        Site.button(link.text + ((link.section) ? " &nbsp;↓" : " &nbsp;↗"), function () {
                            if (link.section) Site.scrollTo(Site.sections[link.section]);
                            else Site.openUrl(link.url);
                        }, (link.primary) ? "primary" : "ghost");
                    });

                endGroup();

            }

        endGroup();

    endGroup();

    Site.cards.push({ card: card, media: media, info: info, title: title, reverse: (index % 2 == 1) });
    Site.reveal(card);

};

// GALLERY: A big picture on a blurred copy of itself, and small pictures under it.
Site.createGallery = function (project) {

    const items = project.images.map(function (image) { return { image: image, text: project.title }; });
    let current = 0;
    const thumbs = [];

    const stage = startBox(0, 0, "100%", "auto", {
        color: "#0D0D14",
        cursor: "pointer",
        css: { aspectRatio: "16 / 10", borderRadius: "20px", border: "1px solid " + STYLE.line },
    });

        const imgBack = Icon(0, 0, "100%", "100%", {
            imageFit: "cover",
            alt: "",
            css: { filter: "blur(30px) saturate(1.4)", transform: "scale(1.25)", opacity: "0.5" },
        });

        const imgMain = Icon(0, 0, "100%", "100%", {
            imageFit: "contain",
            alt: project.title,
            css: { transition: "opacity 0.3s, transform 0.8s " + STYLE.ease },
        });

        // LABEL: "Open" sign, seen on hover
        const zoom = Site.label({
            width: 40,
            height: 40,
            text: "⤢",
            fontSize: 18,
            textAlign: "center",
            lineHeight: 38,
            css: {
                left: "auto", right: "14px", top: "14px",
                borderRadius: "50%",
                backgroundColor: "rgba(7, 7, 11, 0.55)",
                border: "1px solid " + STYLE.lineHover,
                backdropFilter: "blur(8px)",
                webkitBackdropFilter: "blur(8px)",
                opacity: "0",
                transition: "opacity 0.3s",
            },
        });

    endBox();

    const show = function (index) {
        current = index;
        thumbs.forEach(function (thumb, i) {
            thumb.css.opacity = (i == index) ? "1" : "0.45";
            thumb.css.borderColor = (i == index) ? "rgba(255, 255, 255, 0.85)" : "transparent";
        });
        imgMain.css.opacity = "0";
        setTimeout(function () {
            imgMain.load(items[index].image);
            imgBack.load(items[index].image);
            imgMain.css.opacity = "1";
        }, (imgMain.elem.getAttribute("src")) ? 180 : 0);
    };

    stage.on("click", function () { Site.openLightbox(items, current); });
    stage.on("mouseenter", function () { zoom.css.opacity = "1"; imgMain.css.transform = "scale(1.03)"; });
    stage.on("mouseleave", function () { zoom.css.opacity = "0"; imgMain.css.transform = "none"; });

    if (items.length > 1) {

        // GROUP: Small pictures
        HGroup({
            width: "100%",
            height: "auto",
            align: "left center",
            gap: 8,
            wrap: 1,
        });

            items.forEach(function (item, index) {
                const thumb = Icon({
                    width: 72,
                    height: 48,
                    imageFit: "cover",
                    alt: item.text,
                    cursor: "pointer",
                    css: {
                        objectPosition: "center top",
                        borderRadius: "10px",
                        border: "2px solid transparent",
                        transition: "opacity 0.25s, border-color 0.25s",
                    },
                });
                thumb.load(item.image);
                thumb.on("click", function () { if (index != current) show(index); });
                thumbs.push(thumb);
            });

        endGroup();

    }

    show(0);

};

// FEATURES: A card without pictures: its main features as small tiles with an icon, in the place of the gallery.
// features: [{ icon: "install", text: "..." }]. Icons: Site.FEATURE_ICONS
Site.FEATURE_ICONS = {
    install: '<path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/>',
    offline: '<path d="M2 8.8a15 15 0 0 1 20 0"/><path d="M5 12.4a10 10 0 0 1 14 0"/><path d="M8.5 15.9a5 5 0 0 1 7 0"/><path d="M12 19.5h.01"/>',
    launch: '<rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10 6h4"/><circle cx="12" cy="13" r="2.5"/>',
    banner: '<rect x="3" y="14" width="18" height="6.5" rx="2"/><path d="M7 17.25h6"/><path d="M12 3v7"/><path d="M9 7l3 3 3-3"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h4"/>',
    update: '<path d="M20 11a8 8 0 0 0-14.9-3.9L4 9"/><path d="M4 4v5h5"/><path d="M4 13a8 8 0 0 0 14.9 3.9L20 15"/><path d="M20 20v-5h-5"/>',
};

Site.createFeatures = function (features) {

    // GROUP: The panel (the same frame as a gallery)
    const panel = VGroup({
        width: "100%",
        height: "auto",
        align: "left top",
        gap: 0,
        css: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "12px",
            padding: "14px",
            boxSizing: "border-box",
            borderRadius: "20px",
            border: "1px solid " + STYLE.line,
            backgroundColor: "#0D0D14",
            backgroundImage: "radial-gradient(120% 90% at 0% 0%, rgba(139, 92, 246, 0.16), transparent 60%), radial-gradient(120% 90% at 100% 100%, rgba(34, 211, 238, 0.12), transparent 60%)",
        },
    });

        features.forEach(function (feature) {

            // GROUP: Tile
            const tile = HGroup({
                width: "auto",
                height: "auto",
                align: "left center",
                gap: 14,
                css: {
                    padding: "16px",
                    borderRadius: "14px",
                    border: "1px solid " + STYLE.line,
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    transition: "border-color 0.3s, background-color 0.3s",
                },
            });
            tile.on("mouseenter", function () { tile.css.borderColor = STYLE.lineHover; tile.css.backgroundColor = "rgba(255, 255, 255, 0.06)"; });
            tile.on("mouseleave", function () { tile.css.borderColor = STYLE.line; tile.css.backgroundColor = "rgba(255, 255, 255, 0.03)"; });

                // LABEL: Icon on the gradient
                Site.label({
                    width: 40,
                    height: 40,
                    text: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#FFFFFF" stroke-width="1.9"'
                        + ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (Site.FEATURE_ICONS[feature.icon] || "") + '</svg>',
                    css: {
                        flexShrink: "0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "12px",
                        backgroundImage: STYLE.gradient,
                        boxShadow: "0 6px 18px rgba(139, 92, 246, 0.25)",
                    },
                });

                Site.label({
                    width: "auto",
                    text: feature.text,
                    fontSize: 14.5,
                    lineHeight: "1.45",
                    css: { fontWeight: "600", flex: "1 1 0", minWidth: "0" },
                });

            endGroup();

        });

    endGroup();

    return panel;

};

// VIDEO: A YouTube player. (A raw iframe needs pointer-events.)
Site.createVideo = function (url) {

    const box = Box(0, 0, "100%", "auto", {
        color: "#000000",
        css: { aspectRatio: "16 / 9", borderRadius: "20px", border: "1px solid " + STYLE.line },
    });

    const frame = document.createElement("IFRAME");
    frame.src = url;
    frame.loading = "lazy"; // WHY: The player is loaded when it is seen.
    frame.title = SITE.ui.videoTitle;
    frame.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    frame.allowFullscreen = true;
    frame.style.cssText = "width: 100%; height: 100%; border: 0; pointer-events: auto;";
    box.elem.appendChild(frame);

    return box;

};

// MORE PROJECTS: A grid of pictures. The first two are big.
Site.createMoreProjects = function () {

    Site.column("more");

        Site.createSectionHeader("03", SITE.ui.moreProjects, SITE.moreProjects.length);

        Site.grid = HGroup({
            width: "100%",
            height: "auto",
            align: "left top",
            gap: 18,
            wrap: 1,
        });

            SITE.moreProjects.forEach(function (item, index) {
                Site.createTile(item, index);
            });

        endGroup();

    endGroup();

};

Site.createTile = function (item, index) {

    const big = (index < 2);

    const tile = startBox(0, 0, 100, "auto", {
        color: STYLE.surface,
        cursor: "pointer",
        css: { aspectRatio: (big) ? "16 / 10" : "4 / 3", borderRadius: "20px", border: "1px solid " + STYLE.line },
    });

        const img = Icon(0, 0, "100%", "100%", {
            imageFit: "cover",
            alt: item.text,
            css: { objectPosition: "center top", transition: "transform 0.9s " + STYLE.ease },
        });
        img.load(item.image);

        // BOX: Dark at the bottom, so the text can be read
        Box(0, 0, "100%", "100%", {
            color: "transparent",
            css: { backgroundImage: "linear-gradient(to top, rgba(7,7,11,0.94) 0%, rgba(7,7,11,0.4) 38%, rgba(7,7,11,0) 62%)" },
        });

        const caption = Site.label({
            left: 18,
            width: "calc(100% - 36px)",
            text: item.text,
            fontSize: (big) ? 20 : 15,
            lineHeight: "1.3",
            css: { top: "auto", bottom: "16px", fontWeight: "700", transition: "transform 0.5s " + STYLE.ease },
        });

        if (item.url) {
            Site.label({
                width: 34,
                height: 34,
                text: "↗",
                fontSize: 15,
                textAlign: "center",
                lineHeight: 32,
                css: {
                    left: "auto", right: "12px", top: "12px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(7, 7, 11, 0.55)",
                    border: "1px solid " + STYLE.lineHover,
                    backdropFilter: "blur(8px)",
                    webkitBackdropFilter: "blur(8px)",
                },
            });
        }

    endBox();

    tile.on("click", function () {
        if (item.url) {
            Site.openUrl(item.url);
        } else {
            Site.openLightbox(SITE.moreProjects, index);
        }
    });
    tile.on("mouseenter", function () {
        img.css.transform = "scale(1.07)";
        caption.css.transform = "translateY(-4px)";
        tile.css.borderColor = STYLE.lineHover;
    });
    tile.on("mouseleave", function () {
        img.css.transform = "none";
        caption.css.transform = "none";
        tile.css.borderColor = STYLE.line;
    });

    Site.tiles.push({ tile: tile, big: big, caption: caption });
    Site.reveal(tile, (index % 4) * 70);

};

// OPEN SOURCE: The libraries, as cards with their logo.
Site.createOpenSource = function () {

    Site.column("openSource");

        Site.createSectionHeader("04", SITE.ui.openSource, SITE.openSource.length);

        Site.osGroup = HGroup({
            width: "100%",
            height: "auto",
            align: "left top",
            gap: 18,
            wrap: 1,
        });

            SITE.openSource.forEach(function (item, index) {

                const card = VGroup({
                    width: 100,
                    height: "auto",
                    align: "left top",
                    gap: 0,
                    cursor: "pointer",
                    css: { borderRadius: "22px", border: "1px solid " + STYLE.line },
                });
                Site.spotlight(card, STYLE.surface);

                    // BOX: Logo (the pictures have a white background)
                    startBox(0, 0, "100%", "auto", {
                        color: "#FFFFFF",
                        css: { aspectRatio: "535 / 310" },
                    });

                        const logo = Icon(0, 0, "100%", "100%", {
                            imageFit: "contain",
                            alt: item.text,
                            css: { transition: "transform 0.8s " + STYLE.ease },
                        });
                        logo.load(item.image);

                    endBox();

                    // GROUP: Name, address and arrow
                    HGroup({
                        width: "100%",
                        height: "auto",
                        align: "left center",
                        justify: "space-between",
                        gap: 12,
                        css: { padding: "20px 20px 22px 22px" },
                    });

                        VGroup({ width: "calc(100% - 50px)", height: "auto", align: "left top", gap: 4 });

                            Site.label({
                                width: "100%",
                                text: item.text,
                                fontSize: 16,
                                lineHeight: "1.35",
                                css: { fontWeight: "700" },
                            });

                            Site.label({
                                width: "100%",
                                text: item.url.replace(/^https?:\/\//, "").replace(/\/$/, ""),
                                fontSize: 13,
                                textColor: STYLE.faintText,
                                ellipsis: 1,
                            });

                        endGroup();

                        const arrow = Site.label({
                            width: 38,
                            height: 38,
                            text: "↗",
                            fontSize: 15,
                            textAlign: "center",
                            lineHeight: 36,
                            css: {
                                borderRadius: "50%",
                                border: "1px solid " + STYLE.lineHover,
                                transition: "background-color 0.3s, color 0.3s, transform 0.4s " + STYLE.ease,
                            },
                        });

                    endGroup();

                endGroup();

                card.on("click", function () { Site.openUrl(item.url); });
                card.on("mouseenter", function () {
                    logo.css.transform = "scale(1.05)";
                    arrow.css.backgroundColor = STYLE.text;
                    arrow.textColor = STYLE.pageColor;
                    arrow.css.transform = "rotate(45deg)";
                    card.css.borderColor = STYLE.lineHover;
                });
                card.on("mouseleave", function () {
                    logo.css.transform = "none";
                    arrow.css.backgroundColor = "transparent";
                    arrow.textColor = STYLE.text;
                    arrow.css.transform = "none";
                    card.css.borderColor = STYLE.line;
                });

                Site.osCards.push(card);
                Site.reveal(card, index * 90);

            });

        endGroup();

    endGroup();

};

// CONTACT: In a glowing card, a short text, the e-mail picture and the accounts on one side,
//          the contact form on the other. (One under the other on a small screen.) Then the footer.
Site.createContact = function () {

    Site.column("contact");

        Site.createSectionHeader("05", SITE.ui.contact);

        Site.contactCard = HGroup({
            width: "100%",
            height: "auto",
            align: "left top",
            gap: 56,
            css: {
                borderRadius: "32px",
                border: "1px solid " + STYLE.line,
                backgroundImage: "radial-gradient(640px circle at 15% 0%, rgba(139, 92, 246, 0.24), transparent 60%), " +
                    "radial-gradient(560px circle at 90% 100%, rgba(34, 211, 238, 0.16), transparent 60%)",
                backgroundColor: STYLE.surface,
            },
        });

            // GROUP: Text, e-mail and accounts
            Site.contactInfo = VGroup({
                width: 100,
                height: "auto",
                align: "left top",
                gap: 0,
                css: { overflow: "visible" }, // WHY: The glow of the buttons is not cut.
            });

                Site.lblContactTitle = Site.label({
                    width: "100%",
                    text: SITE.contactTitle,
                    fontSize: 34,
                    lineHeight: "1.18",
                    css: { fontWeight: "800", letterSpacing: "-0.025em", overflow: "visible" }, // WHY: The letters of a big text (Ö, ğ, g) reach past its line box; basic.css cuts a label.
                });

                Site.label({
                    width: "100%",
                    text: SITE.contactText,
                    fontSize: 16.5,
                    textColor: STYLE.softText,
                    lineHeight: "1.75",
                    css: { marginTop: "16px" },
                });

                // GROUP: E-mail card. The whole card opens the mail program.
                Site.emailCard = HGroup({
                    width: "100%",
                    height: "auto",
                    align: "left center",
                    justify: "space-between",
                    gap: 16,
                    clickable: 1,
                    cursor: "pointer",
                    css: {
                        marginTop: "32px",
                        padding: "16px 20px",
                        borderRadius: "16px",
                        border: "1px solid " + STYLE.line,
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        transition: "border-color 0.25s, background-color 0.25s",
                    },
                });

                    VGroup({ hug: 1, align: "left top", gap: 8 });

                        Site.label({
                            text: SITE.ui.emailCardTitle,
                            fontSize: 12,
                            textColor: STYLE.faintText,
                            css: { fontWeight: "700", letterSpacing: "0.12em" },
                        });

                        // ICON: The address. (A picture, see SITE.emailImage) Its width is set in Site.layout().
                        Site.imgEmail = Icon({
                            width: 240,
                            height: "auto",
                            imageFit: "contain",
                            alt: SITE.ui.emailAlt,
                            css: { aspectRatio: "1328 / 112", filter: "invert(1) brightness(1.9)" },
                        });
                        Site.imgEmail.load(SITE.emailImage);

                    endGroup();

                    const emailArrow = Site.label({
                        text: "↗",
                        fontSize: 18,
                        textColor: STYLE.softText,
                        css: { transition: "color 0.2s, transform 0.35s " + STYLE.ease },
                    });

                endGroup();

                Site.emailCard.on("click", Site.sendMail);
                Site.emailCard.on("mouseenter", function () {
                    Site.emailCard.css.borderColor = STYLE.lineHover;
                    Site.emailCard.css.backgroundColor = "rgba(255, 255, 255, 0.06)";
                    emailArrow.textColor = STYLE.text;
                    emailArrow.css.transform = "translate(2px, -2px)";
                });
                Site.emailCard.on("mouseleave", function () {
                    Site.emailCard.css.borderColor = STYLE.line;
                    Site.emailCard.css.backgroundColor = "rgba(255, 255, 255, 0.03)";
                    emailArrow.textColor = STYLE.softText;
                    emailArrow.css.transform = "none";
                });

                // GROUP: Accounts
                HGroup({
                    width: "100%",
                    height: "auto",
                    align: "left center",
                    gap: 10,
                    wrap: 1,
                    css: { marginTop: "20px", overflow: "visible" },
                });

                    SITE.accounts.forEach(function (account) {
                        Site.button(account.text + " &nbsp;↗", function () { Site.openUrl(account.url); }, "ghost", "small");
                    });

                endGroup();

            endGroup();

            // WHY: If a component file could not be loaded, the page is still drawn (only without the form).
            if (typeof Form === "function" && typeof InputB === "function" && typeof EmailInputB === "function" &&
                typeof PhoneInputB === "function" && typeof TextareaB === "function" && typeof Waiting === "function" &&
                typeof Tooltip === "function" && typeof ScrollBar === "function" && typeof RadioButton === "function") {
                Site.createContactForm();
            }

        endGroup();
        Site.reveal(Site.contactCard);

        Site.createFooter();

    endGroup();

};

// CONTACT FORM: Made with the Form components of js-components (comp/), the same way as
//   __projects/contact-form. The components are made for a white page, so their colors are
//   given in the params (inputStyle) and changed after they are created (Site.styleForm, Site.styleInput).
//   WHY: Form scrolls in its own box and calls page.fit(minWidth). With minWidth 280 the page zoom
//        stays 1 on every screen wider than 280px, and Site.formBox is always as tall as the form
//        (Site.layoutContactForm), so the form never scrolls: the page does.
Site.createContactForm = function () {

    // BOX: Form container (Its size is set in Site.layoutContactForm.)
    Site.formBox = startBox(0, 0, 100, 700, {
        color: "transparent",
    });

        // FORM:
        Site.form = Form({
            minWidth: 280,
            maxWidth: 700,
            buttonColor: STYLE.violet,
            buttonText: SITE.ui.form.sendButton,
            showDetailWarning: 1,
            missingEntryText: SITE.ui.form.missingEntry,
            missingEntriesText: SITE.ui.form.missingEntries,
            warningText: SITE.ui.form.emptyWarning,
            errorText: SITE.ui.form.errorWarning,
            minimalButton: 1,
            doubleInputAlwaysHorizontal: 0,
            passiveButtonHintText: SITE.ui.form.passiveHint,
            onSendClick: function (json) {

                Site.sendContactForm();

            },
        });

        // NOTE: No title in the form. The title and the text are on the left side of the card.

        // Common input params:
        const inputStyle = {
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            selectedBackgroundColor: "rgba(255, 255, 255, 0.07)",
            lineColor: Black(0),
            selectedLineColor: Black(0),
            backBorderColor: STYLE.line,
            selectedBackBorderColor: "rgba(167, 139, 250, 0.75)",
            backBorderTopRound: 14,
            backBorderBottomRound: 14,
            warningBallType: "icon", // "color", "icon"
            requiredText: SITE.ui.form.required, // The tooltip of the required icon
            requiredIconColor: "rgba(255, 255, 255, 0.28)",
            // The required / warning tooltip, like the one on the passive send button (Site.styleForm)
            tooltipStyle: {
                color: "#16161E",
                textColor: STYLE.text,
                borderColor: STYLE.lineHover,
                round: 8,
            },
        };

        // Unit (TR, length) of the inputs:
        const unitStyle = {
            padding: [12, 4],
            color: "rgba(255, 255, 255, 0.1)",
            textColor: STYLE.softText,
            round: 40,
            fontSize: 13,
        };

        // INPUT: First Name
        Site.firstNameInput = InputB({
            key: "1",
            ...inputStyle,
            isRequired: 1,
            titleText: SITE.ui.form.firstName,
            placeholder: SITE.ui.form.firstNamePlaceholder,
            leftPadding: 20,
        });
        Site.styleInput(that);

        // INPUT: Last Name
        Site.lastNameInput = InputB({
            key: "2",
            ...inputStyle,
            isRequired: 0,
            titleText: SITE.ui.form.lastName,
            placeholder: SITE.ui.form.lastNamePlaceholder,
            leftPadding: 20,
        });
        Site.styleInput(that);
        Site.form.addDoubleInput(Site.firstNameInput, Site.lastNameInput);

        // INPUT: Email
        Site.emailInput = EmailInputB({
            key: "3",
            ...inputStyle,
            isRequired: 1,
            titleText: SITE.ui.form.email,
            placeholder: SITE.ui.form.emailPlaceholder,
            warningText: SITE.ui.form.emailWarning,
            warningColor: "#E5885E",
            maxChar: 60,
        });
        Site.styleInput(that);
        Site.form.addInput(Site.emailInput);

        // INPUT: Phone
        Site.phoneInput = PhoneInputB({
            key: "4",
            ...inputStyle,
            isRequired: 0,
            titleText: SITE.ui.form.phone,
            placeholder: "(auto)",
            warningText: SITE.ui.form.phoneWarning,
            warningColor: "#E5885E",
            countryCode: "+90",
            phoneMask: " (___) ___-____",
            unitText: "TR",
            unitStyle: unitStyle,
        });
        Site.styleInput(that);
        Site.form.addInput(Site.phoneInput);

        // GROUP: Topic (radio buttons), above the subject
        Site.topicGroup = Site.createTopicGroup();
        Site.form.inputGroup.add(Site.topicGroup);
        Site.topicGroup.position = "relative";
        // NOTE: Not in form.inputList: one is always selected, so Form does not check it.

        // INPUT: Subject
        Site.subjectInput = InputB({
            key: "5",
            ...inputStyle,
            titleText: SITE.ui.form.subject,
            placeholder: SITE.ui.form.subjectPlaceholder,
            descriptionText: "",
            isRequired: 0,
            maxChar: 80,
        });
        Site.styleInput(that);
        Site.form.addInput(Site.subjectInput);

        // INPUT: Textarea
        Site.messageTextarea = TextareaB({
            key: "6",
            ...inputStyle,
            isRequired: 1,
            titleText: SITE.ui.form.message,
            placeholder: SITE.ui.form.messagePlaceholder,
            minCharCount: 20,
            showCount: 1,
            lengthText: SITE.ui.form.lengthText,
            warningText: SITE.ui.form.messageWarning,
            warningColor: "#E5885E",
            maxChar: 2000,
            height: 190,
            rightPadding: 5,
            unitStyle: unitStyle,
        });
        Site.styleInput(that);
        Site.form.addInput(Site.messageTextarea);

    endBox();

    Site.styleForm(Site.form);

    // WAITING: Create object 1 time.
    Site.waiting = Waiting({
        animated: 1,
        waitingIcon: "img/form/mail.png",
        coverBackgroundColor: "rgba(7, 7, 11, 0.85)",
    });
    Site.waiting.icon.elem.style.filter = "invert(100%)";
    Site.waiting.elem.style.zIndex = "100"; // WHY: Over the top bar, which is created later.

    // WHY: A field that people do not see. A robot fills it, and the mail service does not send that mail.
    Site.honeypot = document.createElement("INPUT");
    Site.honeypot.type = "text";
    Site.honeypot.name = "website";
    Site.honeypot.tabIndex = -1;
    Site.honeypot.autocomplete = "off";
    Site.honeypot.setAttribute("aria-hidden", "true");
    Site.honeypot.style.display = "none";
    Site.formBox.elem.appendChild(Site.honeypot);

    return Site.formBox;

};

// TOPIC: RadioButton (comp-m3) rows in a box that looks like the inputs of the form.
//   The theme is radio-button-2.htm: the "modern" style package, only the colors are changed
//   (Site.getRadioStyle) for this dark page.
Site.TOPIC_GROUP = "contact-topic"; // The group name of the radio buttons

Site.createTopicGroup = function () {

    const group = VGroup({
        width: "100%",
        height: "auto",
        align: "left top",
        gap: 4,
        css: {
            padding: "14px 8px 8px 8px",
            borderRadius: "14px",
            border: "1px solid " + STYLE.line,
            backgroundColor: "rgba(255, 255, 255, 0.04)",
        },
    });

        // LABEL: Title (the same as the titles of the inputs)
        Site.label({
            text: SITE.contactTopicTitle,
            fontSize: 12,
            textColor: STYLE.softText,
            css: { fontWeight: "700", letterSpacing: "0.1em", marginLeft: "12px", marginBottom: "4px" },
        });

        // GROUP: Radio buttons (two in a row, one in a row on a narrow form)
        HGroup({
            width: "100%",
            height: "auto",
            align: "left top",
            gap: 4,
            wrap: 1,
        });

            Site.topicRadios = Site.shown(SITE.contactTopics).map(function (topic) {
                return RadioButton({
                    width: "100%",
                    group: Site.TOPIC_GROUP,
                    value: topic.value,
                    labelText: topic.text,
                    checked: (topic.value == SITE.contactTopicDefault) ? 1 : 0,
                    styleName: "modern",
                    style: Site.getRadioStyle(),
                });
            });

        endGroup();

    endGroup();

    return group;

};

// Returns a new style object for each radio button. (The same way as radio-button-2.htm)
// NOTE: Layout and sizes come from the "modern" style package. The colors are for the dark page.
// WHY: RadioButton fills missing keys into the given object, so do not share one object.
Site.getRadioStyle = function () {
    return {
        box: {
            color: "transparent",
            round: 10,
        },
        hoverBox: {
            color: "rgba(255, 255, 255, 0.05)",
        },
        checkedBox: {
            color: "rgba(139, 92, 246, 0.16)",
        },
        hoverCheckedBox: {
            color: "rgba(139, 92, 246, 0.24)", // A bit stronger, so mouse over is visible on checked rows too.
        },
        mark: { // Unchecked circle
            color: "rgba(255, 255, 255, 0.04)",
            borderColor: "rgba(255, 255, 255, 0.35)",
        },
        hoverMark: {
            borderColor: "rgba(255, 255, 255, 0.75)",
        },
        checkedMark: { // The circle stays without border, behind the dot.
            color: "rgba(139, 92, 246, 0.3)",
            borderColor: "transparent",
        },
        dot: {
            color: "#A78BFA",
        },
        label: {
            fontSize: 15,
            textColor: STYLE.text,
            fontFamily: STYLE.font,
        },
    };
};

// The text of the selected topic, or "".
Site.getTopicText = function () {
    const selected = RadioButton.getSelected(Site.TOPIC_GROUP);
    return (selected) ? selected.labelText : "";
};

// The parts of the Form (made for a white page) in the colors of this page.
Site.styleForm = function (form) {

    // No title, and no padding (The card has its own padding.)
    form.titleGroup.visible = 0;
    form.inputGroup.elem.parentElement.style.padding = "0px"; // The "Form Items" group of Form

    // BUTTON: Send (The gradient becomes gray while it is passive: Form puts grayscale on it.)
    form.btnSend.height = 54;
    form.btnSend.textColor = "#FFFFFF";
    Object.assign(form.btnSend.elem.style, {
        borderRadius: "999px",
        border: "0",
        boxShadow: "none",
        backgroundImage: STYLE.gradient,
        fontFamily: STYLE.font,
        fontSize: "15px",
        fontWeight: "700",
        letterSpacing: "0.08em",
    });

    // LABEL: "3 missing entries" (on the button)
    form.lblWarning.color = "#FBBF24";
    form.lblWarning.textColor = STYLE.pageColor;
    form.lblWarning.border = 0;
    form.lblWarning.round = 40;
    form.lblWarning.css.fontFamily = STYLE.font;
    form.lblWarning.css.fontSize = "12px";
    form.lblWarning.css.fontWeight = "700";
    form.lblWarning.left = form.btnSend.left + 14;
    form.lblWarning.top = form.btnSend.top + 15;

    // LABEL: The list of the missing entries (on the mouse over the label above)
    form.lblWarningDetail.color = "#16161E";
    form.lblWarningDetail.textColor = STYLE.text;
    form.lblWarningDetail.borderColor = STYLE.lineHover;
    form.lblWarningDetail.round = 10;
    form.lblWarningDetail.css.fontFamily = STYLE.font;
    form.lblWarningDetail.css.fontSize = "13px";
    form.lblWarningDetail.css.lineHeight = "1.7";

    // TOOLTIP: On the passive send button
    if (form.btnSendCover && form.btnSendCover.tooltip) {
        const tooltip = form.btnSendCover.tooltip;
        tooltip.lbl_color = "#16161E";
        tooltip.lbl_textColor = STYLE.text;
        tooltip.lbl_borderColor = STYLE.lineHover;
        tooltip.lbl_round = 8;
    }

    if (form.scrollBar) Site.styleScrollBar(form.scrollBar);

};

// An InputB (or an extended one) in the colors of this page.
Site.styleInput = function (obj) {

    // LABEL: Title
    obj.title.textColor = STYLE.softText;
    obj.title.fontSize = 12;
    obj.title.css.fontFamily = STYLE.font;
    obj.title.css.fontWeight = "700";
    obj.title.css.letterSpacing = "0.1em";
    obj.inputGroup.gap = 4;

    obj.background.css.transition = "background-color 0.2s, border-color 0.2s";

    // The warning icon is not on the round corner.
    obj.warningBall.css.right = "12px";
    obj.warningBall.css.top = "12px";

    // WHY: colorScheme: dark keeps the browser's autofill colors dark.
    const textStyle = {
        color: STYLE.text,
        fontFamily: STYLE.font,
        fontSize: "17px",
        colorScheme: "dark",
    };

    if (obj.input) {
        Object.assign(obj.input.inputElement.style, textStyle);
    }

    // TextareaB: its <textarea> and its scroll bar
    if (obj.type == "textarea") {
        const textarea = obj.inputBox.elem.querySelector("textarea");
        if (textarea) Object.assign(textarea.style, textStyle, { fontSize: "16px", lineHeight: "1.6" });
        if (obj.inputBox.scrollBar) Site.styleScrollBar(obj.inputBox.scrollBar);
    }

    if (obj.unit) obj.unit.css.fontFamily = STYLE.font;

};

// A ScrollBar in white (It is dark by default.)
Site.styleScrollBar = function (scrollBar) {
    scrollBar.bar_color = "#FFFFFF";
    scrollBar.bar_mouseOverColor = "#FFFFFF";
    ["boxScrollBarTop", "boxScrollBarLeft", "topRightDot", "bottomRightDot", "bottomLeftDot"].forEach(function (key) {
        if (scrollBar[key]) scrollBar[key].color = "#FFFFFF";
    });
};

// The form box is as wide as its column, and as tall as the form. (So the form does not scroll.)
Site.layoutContactForm = function (width) {

    Site.formBox.width = width;

    // WHY: Form centers its container only on a page resize, and the width of the box is set here.
    Site.form.formContainer.center("left");

    // First and last name: side by side, or one under the other on a narrow form
    Site.form.groupList.forEach(function (group) {
        group.flow = (width < 460) ? "vertical" : "horizontal";
    });

    // Topics: two in a row, or one in a row on a narrow form
    Site.topicRadios.forEach(function (radio) {
        radio.width = (width < 520) ? "100%" : "calc(50% - 2px)"; // 2px: half of the gap
    });

    // A narrow send button: the text on the right, so "3 missing entries" on the left is not over it.
    const narrow = (width < 420);
    Site.form.btnSend.elem.style.textAlign = (narrow) ? "right" : "center";
    Site.form.btnSend.elem.style.paddingRight = (narrow) ? "24px" : "0px";

    Site.formBox.height = Site.form.formContainer.elem.offsetHeight;

};

// Sends the form to the mail service. (The same as sendFormToService of __projects/contact-form)
Site.sendContactForm = async function () {

    Site.waiting.show();

    // WHY: The mail service writes the titles to the mail, so the fields are sent with their titles.
    const formData = {
        formName: SITE.formName,
        formTitle: SITE.formMailTitle,
        website: Site.honeypot.value,
        fields: [
            { key: "first_name", type: "text", titleText: SITE.ui.mail.firstName, inputValue: Site.firstNameInput.getInputValue() },
            { key: "last_name", type: "text", titleText: SITE.ui.mail.lastName, inputValue: Site.lastNameInput.getInputValue() },
            { key: "email", type: "email", titleText: SITE.ui.mail.email, inputValue: Site.emailInput.getInputValue() },
            { key: "phone", type: "text", titleText: SITE.ui.mail.phone, inputValue: Site.phoneInput.getInputValue() },
            { key: "topic", type: "text", titleText: SITE.ui.mail.topic, inputValue: Site.getTopicText() },
            { key: "subject", type: "text", titleText: SITE.ui.mail.subject, inputValue: Site.subjectInput.getInputValue() },
            { key: "message", type: "textarea", titleText: SITE.ui.mail.message, inputValue: Site.messageTextarea.getInputValue() },
        ],
    };

    // Cancel the request if the service does not respond in time
    const controller = new AbortController();
    const timeoutId = setTimeout(function () { controller.abort(); }, SITE.formTimeout);

    let error = null;

    try {
        const response = await fetch(SITE.formServiceUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            signal: controller.signal,
        });
        if (!response.ok) {
            error = new Error("HTTP error: " + response.status);
        }
    } catch (e) {
        error = e; // Network error, CORS error or timeout
    }

    clearTimeout(timeoutId);
    Site.waiting.hide();

    if (error) {

        Site.showFormMessage({
            iconColor: "#F87171",
            iconFile: "img/form/error.png",
            messageText: SITE.ui.form.errorMessage,
            buttonText: SITE.ui.form.errorButton,
            onClose: function () {},
        });

    } else {

        Site.showFormMessage({
            iconColor: STYLE.green,
            iconFile: "img/form/success.png",
            messageText: SITE.ui.form.successMessage,
            buttonText: SITE.ui.form.successButton,
            onClose: function () {

                // Clean the form.
                RadioButton.setValue(Site.TOPIC_GROUP, SITE.contactTopicDefault, 1);
                Site.firstNameInput.setInputValue("");
                Site.lastNameInput.setInputValue("");
                Site.emailInput.setInputValue("");
                Site.phoneInput.setInputValue("");
                Site.subjectInput.setInputValue("");
                Site.messageTextarea.setInputValue("");

                Site.form.refresh();

            },
        });

    }

};

// form.showMessage() over the form only, in the colors of this page.
// WHY: showMessage() creates its message in the current container, which is the page after start().
Site.showFormMessage = function (messageData) {

    messageData.backgroundColor = "rgba(14, 14, 20, 0.94)";

    createIn(Site.form, function () {
        Site.form.showMessage(messageData);
    });

    // "that" is the button of the message. The message text is just before it.
    const btn = that;
    const lblMessage = btn.elem.previousElementSibling;

    if (lblMessage) {
        Object.assign(lblMessage.style, {
            color: STYLE.text,
            fontFamily: STYLE.font,
            fontSize: "18px",
            fontWeight: "600",
            lineHeight: "1.6",
            textAlign: "center",
            padding: "6px 24px",
        });
    }

    Object.assign(btn.elem.style, {
        backgroundColor: "#FFFFFF",
        color: STYLE.pageColor,
        fontFamily: STYLE.font,
        fontWeight: "700",
        letterSpacing: "0.08em",
        borderRadius: "999px",
        padding: "12px 26px",
        marginTop: "8px",
    });

};

Site.createFooter = function () {

    const footer = HGroup({
        width: "100%",
        height: "auto",
        align: "left center",
        justify: "space-between",
        gap: 12,
        wrap: 1,
        css: { marginTop: "90px", paddingTop: "26px", paddingBottom: "44px", borderTop: "1px solid " + STYLE.line },
    });

        HGroup({ hug: 1, gap: 6, align: "left center", wrap: 1 });

            Site.label({
                text: "© 2020–" + new Date().getFullYear() + " " + SITE.name + " ·",
                fontSize: 13,
                textColor: STYLE.faintText,
            });

            Site.textLink(SITE.footerText, function () { Site.openUrl(SITE.footerUrl); }, 13);

        endGroup();

        Site.textLink(SITE.ui.backToTop, function () { Site.scrollTo(null); }, 13);

    endGroup();

    // WHY: No reveal. It is the last thing of the page: moved 40px down, it is never seen enough to come in.
    return footer;

};

// LIGHTBOX: The pictures in full screen. Arrows, keys and swipe change the picture.
Site.createLightbox = function () {

    const lb = Site.lightbox = startBox(0, 0, "100%", "100%", {
        color: "rgba(6, 6, 10, 0.94)",
        clickable: 1,
        css: { zIndex: "1000", backdropFilter: "blur(14px)", webkitBackdropFilter: "blur(14px)" },
    });
    lb.items = [];
    lb.index = 0;

        lb.img = Icon(0, 0, 100, 100, {
            imageFit: "contain",
            alt: "",
        });

        lb.lblCounter = Site.label({
            left: 26,
            top: 30,
            text: "",
            fontSize: 13,
            textColor: STYLE.softText,
            css: { fontWeight: "600", letterSpacing: "0.16em" },
        });

        lb.lblCaption = Site.label({
            left: 80,
            width: "calc(100% - 160px)",
            text: "",
            fontSize: 15,
            textAlign: "center",
            css: { top: "auto", bottom: "30px", fontWeight: "600" },
        });

        lb.btnClose = Site.roundButton("✕", 44, Site.closeLightbox);
        lb.btnClose.css.left = "auto";
        lb.btnClose.css.right = "18px";
        lb.btnClose.top = 18;

        lb.btnPrev = Site.roundButton(Site.chevron("M15 18l-6-6 6-6"), 52, function () { Site.showLightboxItem(lb.index - 1, -1); });
        lb.btnNext = Site.roundButton(Site.chevron("M9 18l6-6-6-6"), 52, function () { Site.showLightboxItem(lb.index + 1, 1); });
        lb.btnNext.css.left = "auto";
        lb.btnNext.css.right = "18px";

    endBox();
    lb.visible = 0;

    // A click on the dark background closes it. (The picture is not clickable.)
    lb.on("click", function (self, event) {
        if (event.target === lb.elem) Site.closeLightbox();
    });

    page.on("keydown", function (self, event) {
        if (!lb.visible) return;
        if (event.key == "Escape") Site.closeLightbox();
        if (event.key == "ArrowLeft") Site.showLightboxItem(lb.index - 1, -1);
        if (event.key == "ArrowRight") Site.showLightboxItem(lb.index + 1, 1);
    });

    // Swipe
    let touchX = null;
    lb.elem.addEventListener("touchstart", function (event) { touchX = event.touches[0].clientX; }, { passive: true });
    lb.elem.addEventListener("touchend", function (event) {
        if (touchX === null) return;
        const dx = event.changedTouches[0].clientX - touchX;
        touchX = null;
        if (Math.abs(dx) > 50) Site.showLightboxItem(lb.index + ((dx < 0) ? 1 : -1), (dx < 0) ? 1 : -1);
    });

};

Site.openLightbox = function (items, index) {

    const lb = Site.lightbox;
    lb.items = items;
    lb.btnPrev.visible = lb.btnNext.visible = (items.length > 1) ? 1 : 0;
    Site.layoutLightbox();
    Site.showLightboxItem(index, 0);

    lb.visible = 1;
    lb.elem.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: "ease-out" });

};

Site.closeLightbox = function () {

    const lb = Site.lightbox;
    if (!lb.visible) return;

    const animation = lb.elem.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, easing: "ease-in" });
    animation.onfinish = function () { lb.visible = 0; };

};

// direction: -1 back, 1 forward, 0 opening
Site.showLightboxItem = function (index, direction) {

    const lb = Site.lightbox;
    const count = lb.items.length;
    if (!count) return;

    lb.index = (index + count) % count;
    const item = lb.items[lb.index];

    lb.img.load(item.image);
    lb.img.alt = item.text;
    lb.lblCaption.plainText = item.text;
    lb.lblCounter.text = Site.pad(lb.index + 1) + " / " + Site.pad(count);

    if (!Site.reduceMotion) {
        const from = (direction) ? "translateX(" + (direction * 40) + "px)" : "scale(0.94)";
        lb.img.elem.animate([
            { opacity: 0, transform: from },
            { opacity: 1, transform: "none" },
        ], { duration: 450, easing: STYLE.ease });
    }

};

// *** SMALL PARTS:

// LABEL: Every text of the page, with the page font.
Site.label = function (props) {
    return Label(Object.assign({ fontFamily: STYLE.font, fontSize: 16, textColor: STYLE.text }, props));
};

// COLUMN: A centered section column. Its width is set in Site.layout().
Site.column = function (sectionKey) {

    const column = VGroup({
        width: STYLE.maxWidth,
        height: "auto",
        align: "left top",
        gap: 0,
        css: { paddingTop: "130px" },
    });

    Site.columns.push(column);
    if (sectionKey) Site.sections[sectionKey] = column;

    return column;

};

// TITLE: "01 ——" and the big title with a count.
Site.createSectionHeader = function (number, text, count) {

    const header = VGroup({
        width: "100%",
        height: "auto",
        align: "left top",
        gap: 14,
        css: { paddingBottom: "44px" },
    });

        HGroup({ hug: 1, gap: 12, align: "left center" });

            Site.label({
                text: number,
                fontSize: 13,
                textColor: "transparent",
                css: { fontWeight: "800", letterSpacing: "0.2em", backgroundImage: STYLE.gradientText, webkitBackgroundClip: "text", backgroundClip: "text" },
            });
            Box({ width: 40, height: 1, color: "transparent", css: { backgroundImage: STYLE.gradient } });

        endGroup();

        HGroup({ width: "100%", height: "auto", align: "left center", gap: 16, wrap: 1 });

            const heading = Site.label({
                text: text,
                fontSize: 56,
                lineHeight: "1.1",
                css: { fontWeight: "800", letterSpacing: "-0.035em", whiteSpace: "nowrap", paddingBottom: "0.06em", overflow: "visible" }, // WHY: The letters of a big text (Ö, ğ, g) reach past its line box; basic.css cuts a label.
            });
            Site.headings.push(heading);

            if (count) {
                Site.label({
                    text: String(count),
                    fontSize: 13,
                    textColor: STYLE.softText,
                    css: { fontWeight: "700", padding: "4px 12px", borderRadius: "999px", border: "1px solid " + STYLE.lineHover },
                });
            }

        endGroup();

    endGroup();

    Site.reveal(header);
    return header;

};

// BUTTON: A text in a pill. kind: "primary" (white) or "ghost" (glass). size: "small"
Site.button = function (text, onClick, kind, size) {

    const primary = (kind == "primary");
    const small = (size == "small");
    const height = (small) ? 40 : 50;
    const base = {
        background: (primary) ? "#FFFFFF" : "rgba(255, 255, 255, 0.04)",
        border: (primary) ? "#FFFFFF" : STYLE.lineHover,
    };

    const btn = Site.label({
        text: text,
        height: height,
        fontSize: (small) ? 14 : 15,
        lineHeight: height - 2,
        textColor: (primary) ? STYLE.pageColor : STYLE.text,
        cursor: "pointer",
        clickable: 1,
        css: {
            boxSizing: "border-box",
            padding: (small) ? "0 18px" : "0 26px",
            borderRadius: "999px",
            border: "1px solid " + base.border,
            backgroundColor: base.background,
            whiteSpace: "nowrap",
            fontWeight: "700",
            transition: "background-color 0.25s, border-color 0.25s, box-shadow 0.35s, transform 0.35s " + STYLE.ease,
        },
    });

    btn.on("click", function () { onClick(); });
    btn.on("mouseenter", function () {
        btn.css.transform = "translateY(-2px)";
        if (primary) {
            btn.css.boxShadow = "0 0 0 4px rgba(139, 92, 246, 0.25), 0 12px 32px rgba(139, 92, 246, 0.4)";
        } else {
            btn.css.backgroundColor = "rgba(255, 255, 255, 0.1)";
            btn.css.borderColor = "rgba(255, 255, 255, 0.35)";
        }
    });
    btn.on("mouseleave", function () {
        btn.css.transform = "none";
        btn.css.boxShadow = "none";
        btn.css.backgroundColor = base.background;
        btn.css.borderColor = base.border;
    });

    return btn;

};

// LINK: A small soft text that is bright on hover.
Site.textLink = function (text, onClick, fontSize) {

    const link = Site.label({
        text: text,
        fontSize: fontSize || 14,
        textColor: STYLE.softText,
        cursor: "pointer",
        clickable: 1,
        css: { padding: (fontSize) ? "0" : "6px 12px", whiteSpace: "nowrap", fontWeight: "500", transition: "color 0.2s" },
    });

    link.on("click", function () { onClick(); });
    link.on("mouseenter", function () { link.textColor = STYLE.text; });
    link.on("mouseleave", function () { link.textColor = STYLE.softText; });

    return link;

};

// BUTTON: A round glass button with one sign. (Lightbox)
Site.roundButton = function (sign, size, onClick) {

    const btn = Site.label({
        width: size,
        height: size,
        text: sign,
        fontSize: Math.round(size * 0.42),
        textAlign: "center",
        lineHeight: size - 2,
        cursor: "pointer",
        clickable: 1,
        css: {
            borderRadius: "50%",
            border: "1px solid " + STYLE.lineHover,
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            transition: "background-color 0.2s",
        },
    });

    btn.on("click", function () { onClick(); });
    btn.on("mouseenter", function () { btn.css.backgroundColor = "rgba(255, 255, 255, 0.16)"; });
    btn.on("mouseleave", function () { btn.css.backgroundColor = "rgba(255, 255, 255, 0.06)"; });

    return btn;

};

// An arrow (SVG path in a 24 x 24 box) in the middle of a round button.
// WHY: The text arrows (‹ ›) sit on the base line of the font, so they are not in the middle.
Site.chevron = function (path) {
    return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
        'stroke-linecap="round" stroke-linejoin="round" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);">' +
        '<path d="' + path + '"/></svg>';
};

// A light that follows the mouse on a card.
Site.spotlight = function (obj, baseColor) {

    obj.css.backgroundImage = "radial-gradient(520px circle at var(--mx, -1000px) var(--my, -1000px), rgba(139, 92, 246, 0.11), transparent 45%)";
    obj.css.backgroundColor = baseColor;

    if (!Site.finePointer) return;

    obj.on("mousemove", function (self, event) {
        const rect = obj.elem.getBoundingClientRect();
        obj.elem.style.setProperty("--mx", Math.round(event.clientX - rect.left) + "px");
        obj.elem.style.setProperty("--my", Math.round(event.clientY - rect.top) + "px");
    });
    obj.on("mouseleave", function () {
        obj.elem.style.setProperty("--mx", "-1000px");
        obj.elem.style.setProperty("--my", "-1000px");
    });

};

// *** MOTION:

// An endless animation (Web Animations API). Nothing moves with reduced motion.
Site.loop = function (obj, keyframes, options) {
    if (Site.reduceMotion || !obj.elem.animate) return null;
    return obj.elem.animate(keyframes, Object.assign({ iterations: Infinity }, options));
};

// Sections come up softly when they are seen for the first time.
Site.initReveal = function () {

    if (Site.reduceMotion || !("IntersectionObserver" in window)) return;

    Site.observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.style.opacity = "1";
            entry.target.style.transform = "none";
            Site.observer.unobserve(entry.target);
        });
    }, {
        root: Site.scrollBox.elem,
        rootMargin: "0px 0px -6% 0px",
        threshold: 0.06,
    });

};

Site.reveal = function (obj, delay) {

    if (!Site.observer) return obj;

    const wait = " " + (delay || 0) + "ms";
    obj.css.opacity = "0";
    obj.css.transform = "translateY(40px)";
    // WHY: border-color is in the list too, for the hover of the cards.
    obj.css.transition = "opacity 1s " + STYLE.ease + wait + ", transform 1s " + STYLE.ease + wait + ", border-color 0.3s";
    Site.observer.observe(obj.elem);

    return obj;

};

// The hero parts come in one after another.
Site.playIntro = function () {

    if (Site.reduceMotion) return;

    [Site.heroBadge, Site.lblName, Site.typedLine, Site.heroButtons, Site.heroAccounts, Site.scrollHint].forEach(function (obj, index) {
        obj.elem.animate([
            { opacity: 0, transform: "translateY(30px)", filter: "blur(10px)" },
            { opacity: 1, transform: "none", filter: "blur(0px)" },
        ], { duration: 1200, delay: 150 + (index * 120), easing: STYLE.ease, fill: "backwards" });
    });

};

// The words are typed, waited, and deleted, one after another.
Site.typeWords = async function () {

    const lbl = Site.lblTyped;

    if (Site.reduceMotion) {
        lbl.plainText = SITE.focus[0];
        return;
    }

    await basic.sleep(1300);

    let i = 0;
    while (!lbl.isRemoved) {
        const word = SITE.focus[i % SITE.focus.length];
        for (let n = 1; n <= word.length; n++) {
            lbl.plainText = word.slice(0, n);
            await basic.sleep(50 + Math.random() * 45);
        }
        await basic.sleep(1900);
        for (let n = word.length - 1; n >= 0; n--) {
            lbl.plainText = word.slice(0, n);
            await basic.sleep(26);
        }
        await basic.sleep(350);
        i++;
    }

};

// *** PAGE FUNCTIONS:

// Every size that does not come from the flex layout is set here.
Site.layout = function () {

    // WHY: clientWidth, not page.width: the scrolling box is what the content sits in.
    const pageWidth = Site.scrollBox.elem.clientWidth || page.width;
    const pageHeight = Site.scrollBox.elem.clientHeight || page.height;
    const side = (pageWidth < 640) ? 16 : STYLE.sideSpace;
    const width = Math.min(STYLE.maxWidth, pageWidth - (side * 2));
    const isSmall = (pageWidth < 720);

    Site.width = width;
    Site.isSmall = isSmall;

    Site.columns.forEach(function (column) {
        column.width = width;
        column.css.paddingTop = (isSmall) ? "90px" : "130px";
    });

    // TOP BAR
    const navWidth = Math.min(width + 16, pageWidth - 16);
    Site.nav.width = navWidth;
    Site.nav.left = Math.round((pageWidth - navWidth) / 2);
    Site.navGroup.visible = (pageWidth < 820) ? 0 : 1;
    Site.btnNavContact.visible = (pageWidth < 820) ? 1 : 0;

    // HERO
    Site.hero.height = Math.max(isSmall ? 600 : 680, pageHeight);
    Site.lblName.fontSize = Math.round(basic.clamp(pageWidth * 0.1, 46, 112));
    const typedSize = (isSmall) ? 18 : 24;
    Site.lblPrefix.fontSize = typedSize;
    Site.lblTyped.fontSize = typedSize;
    Site.caret.height = Math.round(typedSize * 1.15);

    Site.headings.forEach(function (heading) { heading.fontSize = (isSmall) ? 36 : 56; });

    // PROJECT CARDS: side by side, or one under the other
    const wide = (width >= 900);
    const pad = (isSmall) ? 18 : 36;
    const inner = width - (pad * 2) - 2; // 2: the border
    Site.cards.forEach(function (item) {
        item.card.css.padding = pad + "px";
        item.title.fontSize = (isSmall) ? 26 : 34;
        if (wide) {
            item.card.flow = "horizontal";
            if (item.reverse) item.card.css.flexDirection = "row-reverse";
            item.card.css.gap = "48px";
            item.media.width = Math.round(inner * 0.56);
            item.info.width = inner - item.media.width - 48;
            item.info.css.padding = "0 " + ((isSmall) ? 0 : 8) + "px";
        } else {
            item.card.flow = "vertical";
            item.card.css.gap = "28px";
            item.media.width = inner;
            item.info.width = inner;
            item.info.css.padding = "0";
        }
    });

    // MORE PROJECTS GRID: 4, 3 or 2 columns. The two big tiles are half a row (a full row on 2 columns).
    const cols = (width >= 900) ? 4 : (width >= 600) ? 3 : 2;
    const gap = (isSmall) ? 12 : 18;
    const smallWidth = Math.floor((width - (gap * (cols - 1))) / cols);
    const bigWidth = (cols == 2) ? width : Math.floor((width - gap) / 2);
    Site.grid.css.gap = gap + "px";
    Site.tiles.forEach(function (item) {
        item.tile.width = (item.big) ? bigWidth : smallWidth;
        item.caption.fontSize = (item.big) ? ((isSmall) ? 17 : 20) : ((isSmall) ? 13 : 15);
        item.caption.css.left = (isSmall) ? "12px" : "18px";
        item.caption.width = (isSmall) ? "calc(100% - 24px)" : "calc(100% - 36px)";
        item.caption.css.bottom = (isSmall) ? "10px" : "16px";
    });

    // OPEN SOURCE: 3, 2 or 1 columns
    const osCols = (width >= 820) ? 3 : (width >= 540) ? 2 : 1;
    const osWidth = Math.floor((width - (18 * (osCols - 1))) / osCols);
    Site.osCards.forEach(function (card) { card.width = osWidth; });

    // CONTACT: The text and the form side by side, or one under the other
    const contactWide = (width >= 900);
    const contactPad = (isSmall) ? 20 : 48;
    const contactInner = width - (contactPad * 2) - 2; // 2: the border
    const contactGap = (contactWide) ? 56 : 44;
    Site.contactCard.css.padding = ((isSmall) ? 36 : 56) + "px " + contactPad + "px";
    Site.contactCard.flow = (contactWide) ? "horizontal" : "vertical";
    Site.contactCard.css.gap = contactGap + "px";
    Site.contactInfo.width = (contactWide && Site.formBox) ? Math.round(contactInner * 0.4) : contactInner;
    if (Site.formBox) Site.layoutContactForm((contactWide) ? contactInner - Site.contactInfo.width - contactGap : contactInner);
    Site.lblContactTitle.fontSize = (isSmall) ? 26 : 34;
    Site.imgEmail.width = Math.min(240, Site.contactInfo.width - 90); // 90: the padding of the card and the arrow

    Site.layoutLightbox();
    Site.updateScroll();

};

Site.layoutLightbox = function () {

    const lb = Site.lightbox;
    if (!lb) return;

    const w = page.width;
    const h = page.height;
    const small = (w < 720);

    lb.img.left = (small) ? 12 : 96;
    lb.img.top = 80;
    lb.img.width = w - ((small) ? 24 : 192);
    lb.img.height = h - 80 - ((small) ? 150 : 100);

    // Arrows: in the middle of the picture area. Small screen: at the bottom, around the caption.
    const arrowTop = (small) ? h - 80 : lb.img.top + Math.round((lb.img.height - 52) / 2);
    lb.btnPrev.left = 18;
    lb.btnPrev.top = arrowTop;
    lb.btnNext.top = arrowTop;

    // Small screen: the middle of the caption is at the middle of the arrows (54px = 80 - 52 / 2),
    // also when the caption is two lines.
    lb.lblCaption.css.bottom = (small) ? "54px" : "30px";
    lb.lblCaption.css.transform = (small) ? "translateY(50%)" : "none";

};

// The scroll work is done once a frame.
Site.requestScrollUpdate = function () {
    if (Site.scrollFrame) return;
    Site.scrollFrame = requestAnimationFrame(function () {
        Site.scrollFrame = 0;
        Site.updateScroll();
    });
};

Site.updateScroll = function () {

    const el = Site.scrollBox.elem;
    const y = el.scrollTop;
    const max = el.scrollHeight - el.clientHeight;

    // Progress line
    Site.progress.width = ((max > 0) ? (y / max) * 100 : 0) + "%";

    // Glass bar after the top
    const solid = (y > 20);
    Site.nav.css.backgroundColor = (solid) ? "rgba(14, 14, 20, 0.62)" : "transparent";
    Site.nav.css.borderColor = (solid) ? STYLE.line : "transparent";
    Site.nav.css.boxShadow = (solid) ? "0 12px 40px rgba(0, 0, 0, 0.35)" : "none";

    // The hero goes up slower, and fades.
    if (!Site.reduceMotion) {
        const rate = Math.min(1, y / Site.hero.height);
        Site.heroContent.css.transform = "translateY(" + Math.round(y * 0.3) + "px)";
        Site.heroContent.css.opacity = String(Math.max(0, 1 - (rate * 1.4)));
    }

    // The link of the section on the screen
    let active = "";
    Object.keys(Site.navLinks).forEach(function (key) {
        if (Site.sections[key].elem.offsetTop - (el.clientHeight * 0.4) <= y) active = key;
    });
    if (max > 0 && y >= max - 4) active = "contact";
    Site.setActiveNav(active);

};

Site.setActiveNav = function (key) {

    if (key == Site.activeKey) return;
    Site.activeKey = key;

    Object.keys(Site.navLinks).forEach(function (linkKey) {
        const link = Site.navLinks[linkKey];
        link.textColor = (linkKey == key) ? STYLE.text : STYLE.softText;
        link.css.backgroundColor = (linkKey == key) ? "rgba(255, 255, 255, 0.08)" : "transparent";
    });

};

// Scroll to a section. (null: to the top)
Site.scrollTo = function (section) {
    const top = (section) ? section.elem.offsetTop + ((Site.isSmall) ? 20 : 50) : 0;
    Site.scrollBox.elem.scrollTo({ top: Math.max(0, top), behavior: (Site.reduceMotion) ? "auto" : "smooth" });
};

Site.sendMail = function () {
    // WHY: The address is put together here, it is not written in the page.
    go("mailto:" + SITE.emailUser + "@" + SITE.emailHost);
};

Site.openUrl = function (url) {
    if (!url) return;
    if (url.indexOf("mailto:") === 0) {
        go(url);
        return;
    }
    window.open(url, "_blank", "noopener");
};

// "Buğra Özden" -> "BÖ"
Site.initials = function (name) {
    return name.split(" ").map(function (part) { return part.charAt(0); }).join("").slice(0, 2).toUpperCase();
};

// The items of a list that are not hidden. (hidden: 1 in SITE: a service or a topic that is not shown for now)
Site.shown = function (list) {
    return list.filter(function (item) { return !item.hidden; });
};

// 4 -> "04"
Site.pad = function (number) {
    return (number < 10) ? "0" + number : String(number);
};

Site.gradientSpan = function (text) {
    return "<span style=\"background-image: " + STYLE.gradientText + "; -webkit-background-clip: text; background-clip: text; color: transparent;\">" + basic.escapeHtml(text) + "</span>";
};

