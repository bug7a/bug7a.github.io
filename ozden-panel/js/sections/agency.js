/* Bismillah */

/*

Agency Section - v26.10
- Only on the address of the ads for agencies (?for=ajans): how we work with advertising agencies, four cards.
  The hero text changes there too (texts.js agency.hero, hero.js).

*/

"use strict";

const AgencySection = function () {

    const L = SITE.L;
    const T = SITE.T.agency;

    // SECTION: Ajanslar için
    SITE.startSection({
        key: "agency",
        color: SITE.WHITE,
        align: "center top",
        gap: L.mobile ? 28 : 40,
    });

        // GROUP: Bölüm başlığı
        VGroup({
            width: L.mobile ? "100%" : Math.min(720, L.content),
            height: "auto",
            align: "center top",
            gap: 12,
        });

            SITE.eyebrow(T.eyebrow).textAlign = "center";
            SITE.h2(T.title).textAlign = "center";
            if (T.lead) SITE.lead(T.lead).textAlign = "center";

        endGroup();

        const cardW = L.columns(2);
        const innerW = cardW - (L.mobile ? 48 : 60);

        // GRID: Kartlar
        SITE.startGrid();

            T.items.forEach(function (item) {

                // CARD: Tek madde
                SITE.startCard({
                    width: cardW,
                    gap: 12,
                    padding: L.mobile ? 24 : 30,
                    color: SITE.BG,
                });

                    SITE.h3(item.title, 0, innerW);
                    SITE.text(item.text, innerW);

                SITE.endCard();

            });

        SITE.endGrid();

        SITE.button({
            text: SITE.T.menu.cta,
            kind: "primary",
            onClick: function () { SITE.scrollToKey("contact"); },
        });

    SITE.endSection();

};
