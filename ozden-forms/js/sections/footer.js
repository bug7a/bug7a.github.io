/* Bismillah */

/*

Footer Section - v26.09
- Sayfa altı: marka, bağlantılar, iletişim ve telif satırı.

*/

"use strict";

const FooterSection = function (params = {}) {

    mergeIntoIfMissing(params, {
        onNavClick: function (key) { },
    });

    const L = SITE.L;
    const T = SITE.T.footer;

    // SECTION: Alt bilgi
    const strip = SITE.startSection({
        key: "footer",
        color: SITE.INK,
        align: "left top",
        gap: L.mobile ? 34 : 46,
        padY: L.mobile ? 46 : 64,
    });

    // Hareketli arka plan: Açılış ekranının sönük hali. Sayfa aynı havayla biter. (js/background.js)
    SITE.backgroundEffect(strip, { level: 0.5, sheen: 0 });

        const brandW = L.mobile ? L.content : Math.round(L.content * 0.34);
        const colW = L.mobile ? Math.floor((L.content - 20) / 2) : Math.floor((L.content - brandW - 40) / 3);

        // GROUP: Sütunlar
        const columns = L.mobile
            ? VGroup({ width: "100%", height: "auto", align: "left top", gap: 34 })
            : HGroup({ width: "100%", height: "auto", align: "left top", gap: 20 });

            // GROUP: Marka sütunu
            VGroup({
                width: brandW,
                height: "auto",
                align: "left top",
                gap: 12,
            });

                // GROUP: Logo satırı
                HGroup({
                    width: "auto",
                    height: "auto",
                    align: "left center",
                    gap: 10,
                });

                    Icon({ width: 24, height: 24, opacity: 0.9, alt: "" }); // Decorative
                    that.load(CONFIG.logoFile);

                    Label({
                        text: CONFIG.brandName,
                        width: "auto",
                        fontSize: 16,
                        textColor: SITE.WHITE,
                    });
                    that.elem.style.fontFamily = SITE.BOLD;
                    that.elem.style.whiteSpace = "nowrap";

                endGroup();

                SITE.text(T.tagline, brandW, 1, L.small + 1);

                SITE.space(2);

                // NOTE: "basic.js", basic.js web sitesine bağlantı olur. Label tıklanamaz (pointer-events), bu yüzden <a> açıkça tıklanabilir yapılır.
                SITE.text(T.builtWith.replace("basic.js", '<a href="' + CONFIG.basicjsURL + '" target="_blank" rel="noopener" style="pointer-events: auto; color: inherit; text-decoration: underline;">basic.js</a>'), brandW, 1, L.small);
                that.textColor = SITE.ON_DARK_FAINT;

            endGroup(); // Marka sütunu

            // GROUP: Bağlantı sütunları
            if (L.mobile) {
                HGroup({ width: "100%", height: "auto", align: "left top", gap: 20 });
            }

            T.columns.forEach(function (column) {

                VGroup({
                    width: colW,
                    height: "auto",
                    align: "left top",
                    gap: 12,
                });

                    Label({
                        text: column.title,
                        width: "100%",
                        fontSize: L.tiny,
                        textColor: SITE.ON_DARK_FAINT,
                    });
                    that.elem.style.fontFamily = SITE.BOLD;
                    that.elem.style.letterSpacing = "1.2px";

                    SITE.space(2);

                    column.links.filter(function (link) { return SITE.hasSection(link.action); }).forEach(function (link) {
                        SITE.link(link.text, function () { params.onNavClick(link.action); }, 1, L.small + 1);
                    });

                endGroup();

            });

            if (L.mobile) {
                endGroup();
            }

            // GROUP: İletişim sütunu
            VGroup({
                width: L.mobile ? "100%" : colW,
                height: "auto",
                align: "left top",
                gap: 12,
            });

                Label({
                    text: T.contactTitle,
                    width: "100%",
                    fontSize: L.tiny,
                    textColor: SITE.ON_DARK_FAINT,
                });
                that.elem.style.fontFamily = SITE.BOLD;
                that.elem.style.letterSpacing = "1.2px";

                SITE.space(2);

                SITE.link(CONFIG.email, function () { go("mailto:" + CONFIG.email); }, 1, L.small + 1);

                if (CONFIG.phone) {
                    SITE.link(CONFIG.phone, function () { go("tel:" + CONFIG.phone.replace(/ /g, "")); }, 1, L.small + 1);
                }

                SITE.link("GitHub", function () { go(CONFIG.githubURL, "_blank"); }, 1, L.small + 1);

                SITE.link(SITE.T.menu.contact, function () { params.onNavClick("contact"); }, 1, L.small + 1);

            endGroup(); // İletişim sütunu

        endGroup(); // Sütunlar

        SITE.divider("100%", 1);

        // GROUP: Telif satırı
        const bottom = L.mobile
            ? VGroup({ width: "100%", height: "auto", align: "left top", gap: 10 })
            : HGroup({ width: "100%", height: "auto", align: "left center", gap: 10 });

            // GROUP: © yıllar, isim (web sayfasına link), marka
            // NOTE: Label tıklanamaz (pointer-events), bu yüzden isim ayrı bir link.
            HGroup({ width: "auto", height: "auto", align: "left center", gap: 5, wrap: 1 });

                Label({
                    text: "© " + CONFIG.copyrightYears,
                    width: "auto",
                    fontSize: L.small,
                    textColor: SITE.ON_DARK_FAINT,
                });

                SITE.link(CONFIG.authorName, function () { go(CONFIG.authorURL, "_blank"); }, 1, L.small);

                Label({
                    text: "· " + CONFIG.brandName + ". " + T.rights,
                    width: "auto",
                    fontSize: L.small,
                    textColor: SITE.ON_DARK_FAINT,
                });

            endGroup();

            if (!L.mobile) {
                Box(0, 0, 1, 1, { color: "transparent" });
                that.elem.style.flexGrow = "1";
            }

            Label({
                text: "Apache License 2.0",
                width: "auto",
                fontSize: L.small,
                textColor: SITE.ON_DARK_FAINT,
            });

        endGroup(); // Telif satırı

    SITE.endSection();

};
