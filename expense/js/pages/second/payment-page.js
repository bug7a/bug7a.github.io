var paymentPage = {}
paymentPage.ID = "payment"

paymentPage.createInSecondViewAndShow = function() {

    secondView.removeOpenedPageInView()

    var box = secondView.getContainerBox()
    // Out of this function, use "paymentPage.box" for "box".
    paymentPage.box = box

    box.color = "whitesmoke"
    box.scrollY = 1;

    // Satın alma modulunu hazırla:
    paymentPage.setupPurchasesIfDidNot();

    // #1

    // BOX: Time left container.
    box.boxTimeLeft = createBox(20, 40, box.width - 40, 134);
    box.add(that);
    that.color = "white";
    that.border = 3;
    that.borderColor = "rgba(0, 0, 0, 0.1)";
    that.round = 60;
    /*
    that.color = "white"
    that.round = 50
    that.border = 1
    that.borderColor = "#141414"
    */

    // LABEL: Time left text.
    box.boxTimeLeft.lblTimeLeft = createLabel(0, 40, box.boxTimeLeft.width, "auto");
    box.boxTimeLeft.add(that);
    //that.text = usageLimit.getLastUsableTimeFullString();
    that.textAlign = "center";
    that.fontSize = 35;
    that.textColor = "#40A5AF";
    // that.textColor = "#FE5D49"; // "#CC75AA";
    that.element.style.fontFamily = "opensans-bold";

    // LABEL: Time left top title.
    box.boxTimeLeft.lblTimeLeftTitle = createLabel(0, 22, box.boxTimeLeft.width, "auto");
    box.boxTimeLeft.add(that);
    that.text = lang.CURRENT_USAGE_TIME;
    that.textAlign = "center";
    that.fontSize = 18;
    that.textColor = "#141414";
    that.opacity = 0.8;

    // LABEL: Time left bottom title.
    box.boxTimeLeft.lblTimeLeftBottomTitle = createLabel(0, 80, box.boxTimeLeft.width, "auto");
    box.boxTimeLeft.add(that);
    // that.text = "Tarihine kadar kullanılabilir.";
    // that.text = "Tarihinde dolmuştur.";
    that.textAlign = "center";
    that.fontSize = 20;
    that.textColor = "#141414";

    paymentPage.refreshTimeLeft();



    // #2

    // LABEL: First description.
    box.boxTimeLeft.lblFirstDesc = createLabel(0, 230, box.width, "auto");
    box.add(that);
    that.text = lang.PAYMENT_DESC1;
    that.textAlign = "center";
    that.fontSize = 25;
    that.textColor = "#141414";




    // #3

    paymentPage.createPayButton(lang.FOUR_MONTHS, lang.FOUR_MONTHS_PRICE);
    box.add(that);
    that.left = 20;
    that.top = 330;
    that.onClick(function(self) {
        clickEffect.makeClick();
        paymentPage.buyPackByName("pack4");
        //usageLimit.addTimeAsMonth(4);
        //paymentPage.refreshTimeLeft();
    });

    paymentPage.createPayButton(lang.TWELVE_MONTHS, lang.TWELVE_MONTHS_PRICE);
    box.add(that);
    that.left = 310;
    that.top = 330;
    that.onClick(function(self) {
        clickEffect.makeClick();
        paymentPage.buyPackByName("pack12");
        //usageLimit.addTimeAsMonth(12);
        //paymentPage.refreshTimeLeft();
    });




    // #4

    // LABEL: Second description.
    box.boxTimeLeft.boxSecondDesc = createBox(20, 700, box.width - 40, "auto");
    box.add(that);
    that.fontSize = 19;
    that.textColor = "#141414";

    if (shared.getPlatformId() == "android") {
        that.html = document.getElementById(lang.PAYMENT_DESC2_ELEMENT_ID).innerHTML;
    } else if (shared.getPlatformId() == "ios") {
        that.html = document.getElementById(lang.IOS_PAYMENT_DESC2_ELEMENT_ID).innerHTML;
    }

    // #5 KUPON:

    /*
    // BOX: Coupon container box.
    box.boxCoupon = createBox(0, 880, box.width, 200);
    box.add(that);
    that.color = "transparent";

    // BOX: Coupon background box.
    box.boxCoupon.boxBack = createBox(20, 20, box.width - 40, 60);
    box.boxCoupon.add(that);
    that.color = "white";
    that.border = 3;
    that.borderColor = "#40A5AF";
    that.round = 20;

    // TEXTBOX: Coupon textbox.
    box.boxCoupon.txtCoupon = createTextBox(32, 22, box.width - 300, 56);
    box.boxCoupon.add(that);
    that.minimal = 1;
    that.color = "transparent";
    that.inputElement.setAttribute("placeholder", "Kupon Kodu");
    
    // LABEL: Coupon send button.
    box.boxCoupon.btnOkay = createButton(0, 0, 200, 56);
    box.boxCoupon.add(that);
    that.text = "GÖNDER";
    that.right = 22;
    that.top = 22;
    that.round = 17;
    that.minimal = 1;
    that.border = 1;
    that.borderColor = "#40A5AF";
    that.color = "#40A5AF44";
    that.textColor = "#40A5AF";
    that.fontSize = 25;
    */


    // #6 CLOSE BUTTON:

    // CLOSE BUTTON: Close button.
    box.btnClose = createUICloseButton();
    box.add(that);
    that.onClick(function() {
        clickEffect.makeClick();
        secondView.cleanAndHide()
    })

    secondView.setVisible(1)
    print("Opened page id: " + paymentPage.ID)
}

paymentPage.createPayButton = function($titleText, $priceText) {

    var _box = createBox(0, 0, 270, 340);
    that.color = "white";
    that.border = 3;
    that.borderColor = "#40A5AF";
    that.round = 20;

    _box.lblTitle = createLabel(0, 20, _box.width, "auto");
    _box.add(that);
    that.text = $titleText;
    that.element.style.fontFamily = "opensans-bold";
    that.textAlign = "center";
    that.fontSize = 25;

    _box.lblSubTitle = createLabel(0, 45, _box.width, "auto");
    _box.add(that);
    that.text = lang.OF_USE;
    that.textAlign = "center";
    that.fontSize = 25;

    _box.lblPrice = createLabel(0, 120, _box.width, "auto");
    _box.add(that);
    that.text = $priceText;
    that.element.style.fontFamily = "opensans-bold";
    that.textAlign = "center";
    that.fontSize = 45;
    that.textColor = "#40A5AF";

    _box.lblPriceDesc = createLabel(0, 170, _box.width, "auto");
    _box.add(that);
    that.text = lang.TAX;
    that.textAlign = "center";
    that.fontSize = 25;
    that.textColor = "#40A5AF";
    

    _box.btnOkay = createButton(0, 0, _box.width - 6 - 4, 66);
    _box.add(that);
    that.text = lang.CONTINUE;
    that.left = 2;
    that.bottom = 2;
    that.round = 17;
    that.minimal = 1;
    that.border = 1;
    that.borderColor = "#40A5AF";
    that.color = "#40A5AF44";
    that.textColor = "#40A5AF";
    that.fontSize = 25;

    makeBasicObject(_box);
    return _box;

}

paymentPage.refreshTimeLeft = function() {

    paymentPage.box.boxTimeLeft.lblTimeLeft.text = usageLimit.getLastUsableTimeFullString();

    if (usageLimit.isTimeLeft()) {
        paymentPage.box.boxTimeLeft.lblTimeLeftBottomTitle.text = lang.AVAILABLE_UNTIL_THIS_DATE;
        paymentPage.box.boxTimeLeft.lblTimeLeft.textColor = "#40A5AF";
    } else {
        paymentPage.box.boxTimeLeft.lblTimeLeftBottomTitle.text = lang.IT_HAS_EXPIRED;
        paymentPage.box.boxTimeLeft.lblTimeLeft.textColor = "#FE5D49";
    }

}

// MAKE PAYMENT:
paymentPage.isSetupPurchasesCalled = 0;
paymentPage.setupPurchasesIfDidNot = function() {
  if (paymentPage.isSetupPurchasesCalled == 0) {
    try {
      switch (shared.getPlatformId()) {
            case "android":
                loadingView.showHalf();
                Purchases.setDebugLogsEnabled(true);
                Purchases.configure(lang.ANDRODID_KEY);
                paymentPage.isSetupPurchasesCalled = 1;
                loadingView.hide();
                break;
            case "ios":
                Purchases.setDebugLogsEnabled(true);
                Purchases.configure(lang.IOS_KEY);
                paymentPage.isSetupPurchasesCalled = 1;
                break;
      }
      // Eğer daha önceden uyeliği var ise, bilgilerini yükler.
      // restoreTransactionsIfFirstTime();

    } catch (e) {

        // alert(JSON.stringify(e));

    }
  }
}

// pack4 ... pack12
paymentPage.buyPackByName = function($packName) {
     
    //android için
    if(shared.getPlatformId() == "android" || shared.getPlatformId() == "ios") {

        try {

            if (paymentPage.isSetupPurchasesCalled == 1) {

            loadingView.showHalf();

            Purchases.getOfferings(
            offerings => {

                //try { alert(JSON.stringify(offerings.current.availablePackages)); } catch (e) { alert(JSON.stringify(e)); }     
                //try { alert(JSON.stringify(offerings.current.availablePackages[0])); } catch (e) { alert(JSON.stringify(e)); }     
                
                //try { alert(JSON.stringify(offerings.current)); } catch (e) { alert(JSON.stringify(e)); }  
                //try { alert(JSON.stringify(offerings)); } catch (e) { alert(JSON.stringify(e)); }  
                
                var package = ""

                switch ($packName) {
                        case "pack4":
                            package = offerings.current.availablePackages[0];
                            break;
                        case "pack12":
                            package = offerings.current.availablePackages[1];
                            break;
                    }

                Purchases.purchasePackage(package, ({ productIdentifier, purchaserInfo }) => {

                    switch ($packName) {
                        case "pack4":
                            usageLimit.addTimeAsMonth(4);
                            paymentPage.refreshTimeLeft();
                            break;
                        case "pack12":
                            usageLimit.addTimeAsMonth(12);
                            paymentPage.refreshTimeLeft();
                            break;
                    }

                    // Mevcut kullanım sürenize eklenmiştir.
                    loadingView.hide();
                    shared.infoBox.showInfo(lang.PERIOD_HAS_BEEN_UPDATED);

                },
                ({error, userCancelled}) => {

                    loadingView.hide();

                    shared.infoBox.showInfo(lang.PLEASE_TRY_AGAIN_LATER);
                    // alert(JSON.stringify(error));

                });

            },
            error => {

                    loadingView.hide();
                    shared.infoBox.showInfo(lang.PLEASE_TRY_AGAIN_LATER);
                    // alert(JSON.stringify(error));

            });

            } else {

                shared.infoBox.showInfo(lang.ERROR_HAS_OCCURRED);

            }

        } catch (e) {

            // alert(JSON.stringify(e));
            loadingView.hide();

        }        

        
    } else if(shared.getPlatformId() == "electron" || shared.getPlatformId() == "browser" || shared.getPlatformId() == "web") {

        // browser: cordovanın web için publish edilmiş hali.
        // web: projenin cordovasız çalıştırılmış hali.
        
        //web
        shared.infoBox.showInfo(lang.PURCHASES_NOT_SUPPORTED);
        
    }
    
}