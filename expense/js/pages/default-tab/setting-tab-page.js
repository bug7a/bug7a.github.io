/*

DURUM RAPORU
- Her ayın, toplam harcama, bütçe ve kalan bilgileri farklı bir alanda kaydedilerek; grafik gösterilebilir.

RAPOR GÖNDER
- Ay sonunda, belirlenen mail adresine ayrıntılı durum traporu gönderilebilir.

*/


var settingTabPage = {};
settingTabPage.ID = "setting";

settingTabPage.createIn = function(box) {

    box.html = "";

    box.lblText = createLabel(0, 0, "auto", "auto");
    box.add(that);
    that.text = "20 Haziran 2022";
    that.fontSize = 26;
    that.visible = 0;

    // BOX: Menu group box.
    box.menuGroup = createBox(20, 0, box.width - 40, "auto");
    box.add(that);
    that.color = "white";
    that.border = 3;
    that.borderColor = "rgba(0, 0, 0, 0.15)";
    that.round = 14;
    that.onResize(function(self) {
        self.center();
    });

    var SPACE_COLOR = "rgba(0, 0, 0, 0.15)";
    var SPACE_HEIGHT = 1;

    box.menuGroup.boxSpaceTop = 
        settingTabPage.createSpaceItem(10, "transparent");
    box.menuGroup.add(that);

    box.menuGroup.boxButton1 = 
        settingTabPage.createMenuItem(
            lang.CATEGORIES_TITLE, 
            lang.CATEGORIES_DESCRIPTION, 
            "images/settings/4394562.png");
    box.menuGroup.add(that);
    that.onClick(function(self) {
        clickEffect.makeClick();
        editCategoryPage.createInSecondViewAndShow();
    });

    box.menuGroup.boxSpace1 = 
        settingTabPage.createSpaceItem(SPACE_HEIGHT, SPACE_COLOR);
    box.menuGroup.add(that);

    box.menuGroup.boxButton2 = 
        settingTabPage.createMenuItem(
            lang.BUDGET_TITLE, 
            lang.BUDGET_DESCRIPTION, 
            "images/settings/2953420.png");
    box.menuGroup.add(that);
    that.onClick(function(self) {
        clickEffect.makeClick();
        editBudgetPage.createInSmallViewAndShow();
    });

    box.menuGroup.boxSpace2 = 
        settingTabPage.createSpaceItem(SPACE_HEIGHT, SPACE_COLOR);
    box.menuGroup.add(that);

    /*
    box.menuGroup.boxButton3 = 
        settingTabPage.createMenuItem(
            lang.PAYMENT_TITLE, 
            lang.PAYMENT_DESCRIPTION, 
            "images/settings/439296.png");
    box.menuGroup.add(that);
    that.onClick(function(self) {
        clickEffect.makeClick();
        paymentPage.createInSecondViewAndShow();
    });

    box.menuGroup.boxSpace3 = 
        settingTabPage.createSpaceItem(SPACE_HEIGHT, SPACE_COLOR);
    box.menuGroup.add(that);
    */

    box.menuGroup.boxButton4 = 
        settingTabPage.createMenuItem(
            lang.USERS_MANUAL_TITLE, 
            lang.USERS_MANUAL_DESCRIPTION, 
            "images/settings/1568401.png");
    box.menuGroup.add(that);
    that.onClick(function(self) {
        clickEffect.makeClick();
        guidePage.createInSecondViewAndShow();
    });
    //  edinin.

    box.menuGroup.boxSpace4 = 
        settingTabPage.createSpaceItem(SPACE_HEIGHT, SPACE_COLOR);
    box.menuGroup.add(that);

    box.menuGroup.boxButton5 = 
        settingTabPage.createMenuItem(
            lang.ABOUT_TITLE, 
            lang.ABOUT_DESCRIPTION, 
            "images/settings/1197409.png"); // images/settings/1197409.png"
    box.menuGroup.add(that);
    that.onClick(function(self) {
        clickEffect.makeClick();
        aboutPage.createInSecondViewAndShow();
    });
    // ni öğrenin.

    box.menuGroup.boxSpaceBottom = 
        settingTabPage.createSpaceItem(10, "transparent");
    box.menuGroup.add(that);

}

settingTabPage.createMenuItem = function($titleText, $descriptionText, $iconFile) {

    var ITEM_WIDTH = global.USED_WIDTH - 40;

    // BOX: Menu button item container.
    var boxItem = createBox(0, 0, ITEM_WIDTH, 100);
    that.color = "transparent";
    that.element.style.position = "relative";

    // BOX: Menu button item background.
    boxItem.boxBack = createBox(10, 10, ITEM_WIDTH - 40, 74);
    boxItem.add(that);
    that.color = "yellow";
    that.round = 14;
    that.border = 0;
    that.visible = 0;

    // IMAGE: Button icon.
    boxItem.imgIcon = createImage(30, 24, 50, 50);
    // boxItem.imgIcon = createImage(30, 18, 60, 60);
    boxItem.add(that);
    that.load($iconFile);
    that.color = "transparent";
    that.imageElement.style.filter = "grayscale(80%)";
    // sepia(100%); grayscale(100%)

    // LABEL: Button title.
    boxItem.lblTitle = createLabel(100, 20, 440, 40);
    boxItem.add(that);
    that.fontSize = 25;
    that.text = $titleText;

    // LABEL: Button description.
    boxItem.lblDescription = createLabel(100, 48, 440, 30);
    boxItem.add(that);
    that.fontSize = 20;
    that.text = $descriptionText;
    that.textColor = "rgba(0, 0, 0, 0.5)";

    makeBasicObject(boxItem);
    return boxItem;

}

settingTabPage.createSpaceItem = function($height, $color) {

    var ITEM_WIDTH = global.USED_WIDTH - 40;

    // BOX: Menu button item container.
    var boxSpace = createBox(0, 0, ITEM_WIDTH, $height);
    that.color = $color;
    that.element.style.position = "relative";

    makeBasicObject(boxSpace);
    return boxSpace;

}