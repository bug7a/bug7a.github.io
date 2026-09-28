/* Bismillah */

/*

Contact Section - v26.09

- Teklif formu: Form bileşeni (comp/form.min.js) ve InputB alanları.
  (04-template-m2/web-forms/contact-form-to-mail.htm ile aynı yol.)
- Gönderim adresi: CONFIG.formEndpoint (web-forms'un send-form-mail.php mail servisi).
- CONFIG.formEndpoint boş ise; form, ziyaretçinin e-posta programını açar (mailto).

*/

"use strict";

const ContactSection = function () {

    const L = SITE.L;
    const T = SITE.T.contact;

    // Fiyatlar gizli ise (CONFIG.showPricing: 0) paket seçimi de gizli. Ayar yok ise görünür.
    const showPackages = (CONFIG.showPricing !== 0);

    // *** PRIVATE VARIABLES:
    let form = null;
    let formBox = null;
    let nameInput = null;
    let companyInput = null;
    let emailInput = null;
    let messageInput = null;
    let honeypot = null;
    let packageChipList = [];
    let selectedPackageIndex = 0;

    // *** PRIVATE FUNCTIONS:

    // Seçili paket kutucuğunu boyar.
    const refreshPackageChips = function () {

        packageChipList.forEach(function (chip, index) {
            const selected = (index == selectedPackageIndex);
            chip.color = selected ? SITE.PRIMARY : SITE.BG;
            chip.textColor = selected ? SITE.WHITE : SITE.TEXT_SOFT;
            chip.borderColor = selected ? SITE.PRIMARY : SITE.LINE;
        });

    };

    // Mail servisine gidecek alanlar.
    // WHY: Mail servisi başlıkları maile yazar, bu yüzden alanlar başlıklarıyla gönderilir.
    const createFields = function () {

        const fields = [
            { key: "name", type: "text", titleText: T.nameTitle, inputValue: nameInput.getInputValue() },
            { key: "company", type: "text", titleText: T.companyTitle, inputValue: companyInput.getInputValue() },
            { key: "email", type: "email", titleText: T.emailTitle, inputValue: emailInput.getInputValue() },
            { key: "message", type: "textarea", titleText: T.messageTitle, inputValue: messageInput.getInputValue() },
            { key: "language", type: "text", titleText: T.languageTitle, inputValue: SITE.lang },
        ];

        // Paket seçimi sadece fiyatlar görünür ise var. (E-postadan sonra)
        if (showPackages) {
            fields.splice(3, 0, { key: "package", type: "text", titleText: T.packageTitle, inputValue: T.packageList[selectedPackageIndex] });
        }

        return fields;

    };

    // Servis ayarlı değil ise; e-posta programını aç.
    const sendWithMailto = function () {

        const name = nameInput.getInputValue();
        const company = companyInput.getInputValue();
        const packageName = showPackages ? T.packageList[selectedPackageIndex] : "";

        const subject = CONFIG.brandName + (packageName ? " - " + packageName : "") + " - " + name;

        const body = ""
            + name + (company ? " / " + company : "") + "\n"
            + emailInput.getInputValue() + "\n"
            + (packageName ? packageName + "\n" : "") + "\n"
            + messageInput.getInputValue() + "\n";

        go("mailto:" + CONFIG.email
            + "?subject=" + encodeURIComponent(subject)
            + "&body=" + encodeURIComponent(body));

        showFormMessage(1, T.mailtoText);

    };

    // Formu mail servisine gönder. (contact-form-to-mail.htm, sendFormToService ile aynı)
    const sendToService = async function () {

        SITE.formWaiting.show();

        const formData = {
            formName: CONFIG.formName,
            formTitle: T.mailTitle,
            website: honeypot.value,
            fields: createFields(),
        };

        // Servis zamanında cevap vermez ise isteği iptal et.
        const controller = new AbortController();
        const timeoutId = setTimeout(function () { controller.abort(); }, CONFIG.formTimeout);

        let error = null;

        try {
            const response = await fetch(CONFIG.formEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                signal: controller.signal,
            });
            if (!response.ok) {
                error = new Error("HTTP error: " + response.status);
            }
        } catch (e) {
            error = e; // Ağ hatası, CORS hatası veya zaman aşımı
        }

        clearTimeout(timeoutId);

        // WHY: Site yeniden kurulmuş ise (dil / ekran değişti) bu form artık yok.
        if (!form || form._isRemoved || !SITE.formWaiting) return;

        SITE.formWaiting.hide();
        showFormMessage(error ? 0 : 1);

    };

    // Formu temizler.
    const clearForm = function () {

        nameInput.setInputValue("");
        companyInput.setInputValue("");
        emailInput.setInputValue("");
        messageInput.setInputValue("");
        selectedPackageIndex = 0;
        refreshPackageChips();

        form.refresh();

    };

    // form.showMessage(), sadece formun üzerinde ve sitenin renklerinde.
    // WHY: showMessage() mesajını o anki kutuda kurar; createIn ile formun içinde kurulur.
    const showFormMessage = function (isSuccess, customText) {

        const title = isSuccess ? T.successTitle : T.errorTitle;
        const text = customText || (isSuccess ? T.successText : (T.errorText + " " + CONFIG.email));

        createIn(form, function () {
            form.showMessage({
                iconColor: isSuccess ? SITE.PRIMARY : SITE.ACCENT,
                iconFile: isSuccess ? "assets/icons/success.png" : "assets/icons/error.png",
                messageText: "<b>" + title + "</b><br>" + text,
                buttonText: T.closeButton,
                backgroundColor: "rgba(255, 255, 255, 0.96)",
                onClose: function () {
                    if (isSuccess) clearForm();
                },
            });
        });

        // "that", mesajın düğmesidir. Mesaj metni ondan hemen öncedir.
        const btn = that;
        const lblMessage = btn.elem.previousElementSibling;

        if (lblMessage) {
            Object.assign(lblMessage.style, {
                color: SITE.INK,
                fontSize: (L.mobile ? 15 : 16) + "px",
                lineHeight: "1.6",
                textAlign: "center",
                padding: "4px 24px",
            });
        }

        Object.assign(btn.elem.style, {
            backgroundColor: SITE.INK,
            color: SITE.WHITE,
            fontFamily: SITE.BOLD,
            borderRadius: "8px",
            padding: "12px 26px",
            marginTop: "6px",
        });

    };

    // Form düğmesine basıldı. (Form, zorunlu alanlar dolu değil ise düğmeyi pasif tutar.)
    const onSendClick = function () {

        if (!CONFIG.formEndpoint) {
            sendWithMailto();
            return;
        }

        sendToService();

    };

    // Form, Form bileşeninin parçalarını sitenin renklerinde çizer.
    const styleForm = function () {

        // Başlık yok, iç boşluk yok. (Kartın kendi iç boşluğu var.)
        form.titleGroup.visible = 0;
        form.inputGroup.elem.parentElement.style.padding = "0px"; // Form'un "Form Items" grubu

        // BUTTON: Gönder (Pasif iken Form üzerine grayscale koyar.)
        const buttonH = L.mobile ? 48 : 52;
        form.btnSend.height = buttonH;
        form.btnSend.color = SITE.PRIMARY;
        form.btnSend.textColor = SITE.WHITE;
        form.btnSend.fontSize = L.mobile ? 15 : 16;
        Object.assign(form.btnSend.elem.style, {
            borderRadius: "8px",
            border: "0",
            boxShadow: "none",
            fontFamily: SITE.BOLD,
        });

        // Dar düğmede yazı sağda; soldaki "2 eksik alan" etiketi yazının üzerine binmesin.
        const narrow = (innerW < 420);
        form.btnSend.elem.style.textAlign = narrow ? "right" : "center";
        form.btnSend.elem.style.paddingRight = narrow ? "24px" : "0px";

        // LABEL: "2 eksik alan" (düğmenin üzerinde)
        form.lblWarning.color = "#F1C74A";
        form.lblWarning.textColor = SITE.INK;
        form.lblWarning.border = 0;
        form.lblWarning.round = 40;
        form.lblWarning.elem.style.fontFamily = SITE.BOLD;
        form.lblWarning.elem.style.fontSize = "12px";
        form.lblWarning.left = form.btnSend.left + 12;
        form.lblWarning.top = form.btnSend.top + Math.round((buttonH - 26) / 2);

        // LABEL: Eksik alanların listesi (üstteki etiketin üzerine gelince)
        form.lblWarningDetail.color = SITE.WHITE;
        form.lblWarningDetail.textColor = SITE.INK;
        form.lblWarningDetail.borderColor = SITE.LINE;
        form.lblWarningDetail.round = 8;
        form.lblWarningDetail.elem.style.fontSize = "13px";
        form.lblWarningDetail.elem.style.lineHeight = "1.7";

        // TOOLTIP: Pasif gönder düğmesinin üzerinde
        if (form.btnSendCover && form.btnSendCover.tooltip) {
            const tooltip = form.btnSendCover.tooltip;
            tooltip.lbl_color = SITE.INK;
            tooltip.lbl_textColor = SITE.WHITE;
            tooltip.lbl_borderColor = SITE.INK;
            tooltip.lbl_round = 6;
        }

    };

    // Form kutusu, form kadar yüksek olur. (Böylece form kendi içinde kaymaz; sayfa kayar.)
    const layoutFormBox = function () {

        if (!form || !formBox) return;
        formBox.height = form.formContainer.elem.offsetHeight;

    };

    // *** PUBLIC (SITE) FUNCTIONS:
    // Fiyat kartlarından çağrılır.
    SITE.selectPackage = function (index) {

        selectedPackageIndex = index;
        refreshPackageChips();

    };

    // *** SECTION VIEW:
    const strip = SITE.startSection({
        key: "contact",
        color: SITE.INK,
        align: "center top",
        gap: L.mobile ? 30 : 40,
    });

    strip.elem.style.background =
        "radial-gradient(800px 420px at 20% 0%, rgba(44, 90, 56, 0.55), rgba(0, 0, 0, 0) 60%), " + SITE.INK;

        const formW = L.mobile ? L.content : Math.round(L.content * 0.56);
        const textW = L.mobile ? L.content : (L.content - formW - 48);
        const padding = L.mobile ? 22 : 32;
        const innerW = formW - (padding * 2) - 2;

        // Ortak alan görünümü (04-template-m2/web-forms/contact-form-to-mail.htm ile aynı).
        const inputStyle = {
            width: "100%",
            backgroundColor: "#F6F6F6",
            selectedBackgroundColor: "#F6F6F6",
            lineColor: Black(0),
            selectedLineColor: Black(0),
            backBorderColor: Black(0),
            selectedBackBorderColor: Black(0.4),
            backBorderTopRound: 8,
            backBorderBottomRound: 8,
            requiredText: T.requiredText,
        };

        // GROUP: Metin + form
        if (L.mobile) {
            VGroup({ width: "100%", height: "auto", align: "left top", gap: 30 });
        } else {
            HGroup({ width: "100%", height: "auto", align: "left top", gap: 48 });
        }

            // GROUP: Sol sütun
            VGroup({
                width: textW,
                height: "auto",
                align: "left top",
                gap: 14,
            });

                SITE.eyebrow(T.eyebrow, 1);

                SITE.h2(T.title, 1);

                SITE.lead(T.lead, textW, 1);

                SITE.space(6);

                SITE.divider(textW, 1);

                SITE.space(6);

                // LABEL: Doğrudan iletişim
                Label({
                    text: T.orText,
                    width: textW,
                    fontSize: L.small,
                    textColor: SITE.ON_DARK_FAINT,
                });

                SITE.link(CONFIG.email, function () {
                    go("mailto:" + CONFIG.email);
                }, 1, L.lead);
                that.elem.style.fontFamily = SITE.BOLD;
                that.textColor = SITE.PRIMARY_LIGHT;

                if (CONFIG.phone) {
                    SITE.link(CONFIG.phone, function () {
                        go("tel:" + CONFIG.phone.replace(/ /g, ""));
                    }, 1, L.body);
                }

            endGroup(); // Sol sütun

            // CARD: Form kutusu
            startBox(0, 0, formW, "auto", {
                color: SITE.WHITE,
                round: 16,
                border: 1,
                borderColor: "transparent",
            });
            that.elem.style.padding = padding + "px";
            that.elem.style.boxShadow = "0px 20px 50px rgba(0, 0, 0, 0.30)";
            if (!L.mobile) that.elem.style.flexShrink = "0";

                // BOX: Form (Yüksekliği layoutFormBox ile verilir.)
                formBox = startBox(0, 0, innerW, 600, {
                    color: "transparent",
                });
                that.position = "relative";

                    // FORM:
                    // WHY: Form, page.fit(minWidth) çağırır. minWidth 280 ile sayfa yakınlaştırması
                    //      280px'den geniş her ekranda 1 kalır.
                    form = Form({
                        minWidth: 280,
                        maxWidth: innerW,
                        buttonColor: SITE.PRIMARY,
                        buttonText: T.sendButton,
                        showDetailWarning: 1,
                        missingEntryText: T.missingEntry,
                        missingEntriesText: T.missingEntries,
                        warningText: T.emptyWarning,
                        errorText: T.errorWarning,
                        minimalButton: 1,
                        doubleInputAlwaysHorizontal: L.mobile ? 0 : 1,
                        passiveButtonHintText: T.passiveHint,
                        onSendClick: function (json) {
                            onSendClick();
                        },
                    });

                    // INPUT: Ad Soyad
                    nameInput = InputB({
                        key: "name",
                        ...inputStyle,
                        isRequired: 1,
                        titleText: T.nameTitle,
                        placeholder: T.namePlaceholder,
                        maxChar: 60,
                    });

                    // INPUT: Şirket
                    companyInput = InputB({
                        key: "company",
                        ...inputStyle,
                        isRequired: 0,
                        titleText: T.companyTitle,
                        placeholder: T.companyPlaceholder,
                        maxChar: 60,
                    });
                    form.addDoubleInput(nameInput, companyInput);

                    // Mobilde alt alta, geniş ekranda yan yana.
                    form.groupList.forEach(function (group) {
                        group.flow = L.mobile ? "vertical" : "horizontal";
                    });

                    // INPUT: E-posta
                    emailInput = EmailInputB({
                        key: "email",
                        ...inputStyle,
                        isRequired: 1,
                        titleText: T.emailTitle,
                        placeholder: T.emailPlaceholder,
                        warningText: T.emailWarning,
                        warningColor: SITE.ACCENT,
                        maxChar: 60,
                    });
                    form.addInput(emailInput);

                    // GROUP: Paket seçimi (Fiyatlar gizli ise bu da gizli: showPackages)
                    if (showPackages) {

                        // NOTE: form.inputList içinde değil: biri her zaman seçili, Form onu kontrol etmez.
                        const packageGroup = VGroup({
                            width: "100%",
                            height: "auto",
                            align: "left top",
                            gap: 10,
                        });

                            Label({
                                text: T.packageTitle,
                                width: "100%",
                                fontSize: 13,
                                textColor: "#373836",
                            });

                            // GROUP: Kutucuklar
                            HGroup({
                                width: "100%",
                                height: "auto",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: 8,
                                flexWrap: "wrap",
                            });

                                packageChipList = [];

                                T.packageList.forEach(function (name, index) {

                                    Label({
                                        text: name,
                                        width: "auto",
                                        height: "auto",
                                        fontSize: 13,
                                        textColor: SITE.TEXT_SOFT,
                                        color: SITE.BG,
                                        round: 100,
                                        border: 1,
                                        borderColor: SITE.LINE,
                                    });
                                    that.elem.style.padding = "9px 14px";
                                    that.elem.style.whiteSpace = "nowrap";
                                    that.elem.style.cursor = "pointer";
                                    that.setMotion("background-color 0.15s, color 0.15s, border-color 0.15s");

                                    const chip = that;
                                    chip.on("click", function () {
                                        selectedPackageIndex = index;
                                        refreshPackageChips();
                                    });

                                    packageChipList.push(chip);

                                });

                            endGroup();

                        endGroup(); // Paket seçimi
                        form.inputGroup.add(packageGroup);
                        packageGroup.position = "relative";

                    }

                    // INPUT: Proje
                    messageInput = TextareaB({
                        key: "message",
                        ...inputStyle,
                        isRequired: 1,
                        titleText: T.messageTitle,
                        placeholder: T.messagePlaceholder,
                        warningText: T.messageWarning,
                        warningColor: SITE.ACCENT,
                        minCharCount: 0,
                        showCount: 0,
                        maxChar: 1200,
                        height: 140,
                    });
                    form.addInput(messageInput);

                endBox(); // Form

                // WHY: İnsanların görmediği bir alan. Robot doldurur, mail servisi o maili göndermez.
                honeypot = document.createElement("INPUT");
                honeypot.type = "text";
                honeypot.name = "website";
                honeypot.tabIndex = -1;
                honeypot.autocomplete = "off";
                honeypot.setAttribute("aria-hidden", "true");
                honeypot.style.display = "none";
                formBox.elem.appendChild(honeypot);

            endBox(); // Form kutusu

        endGroup(); // Metin + form

    SITE.endSection();

    styleForm();
    refreshPackageChips();

    // Form kutusu her zaman form kadar yüksek. (Uyarılar veya yazı tipi yüklenince form uzayabilir.)
    layoutFormBox();
    form.formContainer.onResize(layoutFormBox);

    // WAITING: Gönderim sırasında. (Sayfaya kurulur; site yeniden kurulunca destroySite siler.)
    SITE.formWaiting = Waiting({
        animated: 1,
        waitingIcon: "assets/icons/mail.png",
        coverBackgroundColor: "rgba(14, 26, 20, 0.85)",
    });
    SITE.formWaiting.icon.elem.style.filter = "invert(100%)";
    SITE.formWaiting.elem.style.zIndex = "100"; // WHY: Sonra kurulan üst çubuğun da üzerinde.

};
