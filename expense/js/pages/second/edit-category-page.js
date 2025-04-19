editCategoryPage = {}
editCategoryPage.ID = "edit-category"
editCategoryPage.onAfterActionFunc = function() { };

editCategoryPage.createInSecondViewAndShow = function() {

    secondView.removeOpenedPageInView();

    var box = secondView.getContainerBox();
    // Out of this function, use "editCategoryPage.box" for "box".
    editCategoryPage.box = box;

    box.color = "whitesmoke";



    // #1 SEARCH BAR:

    // UI SEARCH BOX: Search box.
    box.documentsUISearchBox = createUISearchBox(0, 0, global.USED_WIDTH - 60);
    box.add(that);
    that.left = 30;
    that.top = 40;
    that.color = "whitesmoke";
    that.setPlaceholderText(lang.FILTER);
    that.txtSearch.element.addEventListener("click", function(self) {
        clickEffect.makeClick();
    });
    that.imgClearIcon.onClick(function(self) {
        clickEffect.makeClick();
    })



    // #3 ACTION, CANCEL BUTTONS:

    // BOX: Bottom button group.
    box.buttonGroup = createBox(0, 0, global.USED_WIDTH, 106);
    box.add(that);
    that.color = "transparent";
    that.bottom = 0;
    that.border = 0;

    // BUTTON: Cancel button.
    box.buttonGroup.btnCancel = createButton(0, 20, "auto", 60);
    box.buttonGroup.add(that);
    that.text = lang.CANCEL;
    that.fontSize = 25;
    // that.textColor = "#9B9B9B"
    that.textColor = "rgba(0, 0, 0, 0.4)";
    that.minimal = 1;
    // that.color = "#9B9B9B44"
    that.color = "transparent";
    //that.color = "rgba(0, 0, 0, 0.05)";
    that.right = 20;
    that.round = 14;
    that.border = 2;
    that.opacity = 1;
    // that.borderColor = "#9B9B9B"
    that.borderColor = "transparent";
    that.buttonElement.style.fontFamily = "opensans-bold";
    that.buttonElement.style.paddingLeft = "36px";
    that.buttonElement.style.paddingRight = "36px";

    that.onClick(function() {

        clickEffect.makeClick();
        secondView.cleanAndHide();

    });

    
    // BUTTON: Main action button.
    box.buttonGroup.btnAction = createButton(0, 20, "auto", 60);
    box.buttonGroup.add(that);
    that.text = lang.SAVE;
    that.fontSize = 25;
    that.textColor = "#40A5AF";
    //that.textColor = "rgba(0, 0, 0, 0.6)";
    that.minimal = 1;
    that.color = "#40A5AF44";
    //that.color = "white";
    that.right = 20;
    that.round = 14;
    that.border = 1;
    that.opacity = 1;
    that.enabled = 0;
    that.element.style.filter = "grayscale(100%)";
    that.borderColor = "#40A5AF";
    //that.borderColor = "rgba(0,0,0,0.4)";
    that.buttonElement.style.fontFamily = "opensans-bold";
    that.buttonElement.style.paddingLeft = "36px";
    that.buttonElement.style.paddingRight = "36px";
    that.setMotion("filter 0.3s, opacity 0.3s");
    
    that.onClick(function(self) {

        clickEffect.makeClick();
        editCategoryPage.saveCategories();
        secondView.cleanAndHide();

    });

    box.buttonGroup.btnAction.onResize(function(self) {
        box.buttonGroup.btnCancel.aline(box.buttonGroup.btnAction, "left", 10);
    })



    // #2 CATEGORIES

    var uiItemListHeight = page.height - box.documentsUISearchBox.top - box.documentsUISearchBox.height - box.buttonGroup.height - 20;

    // UI ITEM LIST: Documents items in horizontal list
    box.uiItemList = createUIItemList(0, 0, global.USED_WIDTH, uiItemListHeight);
    box.add(that);
    that.top = box.documentsUISearchBox.top + box.documentsUISearchBox.height + 20;
    that.color = "whitesmoke"; // whitesmoke
    that.setItemAlign("horizontal-vertical");
    that.setInnerSpaces(20, 10, 20, 10);
    that.setCreateFunctionOfItem(editCategoryPage.createCategorytItem);
    that.createItemsByDataList(editCategoryPage.getCategoryItemDataList());
    that.onChange(editCategoryPage.selectClickedCategoryItem);
    that.border = 0;

    box.documentsUISearchBox.onSearch(function(uiSearchBox, searchText) {
        box.uiItemList.searchItemByText(searchText);
    })

    // BOX: Bottom mask for box.uiItemList.
    box.boxBottomMask = createBox(0, 0, box.width, 30);
    box.add(that);
    that.element.style.background = "linear-gradient(to top, whitesmoke, whitesmoke, #FFFFFF00)";
    that.aline(box.uiItemList, "bottom", -26);
    that.border = 0;

    // BOX: Top mask for box.uiItemList.
    box.boxTopMask = createBox(0, 0, box.width, 30);
    box.add(that);
    that.element.style.background = "linear-gradient(to bottom, whitesmoke, whitesmoke, #FFFFFF00)";
    that.aline(box.uiItemList, "top", -26);
    that.border = 0;





    // #4 INFO BOX:
    /*
    box.lblInfo = createLabel(0, 0, "auto", "auto");
    box.add(that);
    //that.text = "Bu kategoride, bu ay eklenmiş işlemler var.";
    // that.text = "Bu ay kullanılmış bir kategoriyi kapatamazsınız.";
    that.text = "Kullanılan bir kategoriyi pasif yapamazsınız.";
    that.color = "white";
    that.border = 0;
    that.borderColor = "rgba(0, 0, 0, 0.15)";
    that.round = 14;
    that.spaceX = 30;
    that.spaceY = 22;
    that.fontSize = 22;
    that.opacity = 0;
    that.isShown = 0;
    //that.element.style.fontFamily = "opensans-bold";
    that.element.style.boxShadow = "0px 0px 12px rgba(0, 0, 0, 0.2)";
    that.textColor = "#141414";
    that.setMotion("opacity 0.3s");

    that.onResize(function(self) {
        self.center();
    });
    */

    secondView.setVisible(1)
    print("Opened page id: " + editCategoryPage.ID);

}

editCategoryPage.getCategoryItemDataList = function() {

    var _dataList = database.getCategoryDataList();

    var _categoryBasedTranCountDataObject = {};

    for (var i = 0; i < database.spendingTable["m" + date.monthNumber].length; i++) {

        var _categoryId = database.spendingTable["m" + date.monthNumber][i].categoryId;

        // İlk kayıt eklenmeden önce, 0 değerine ayarla.
        if(!_categoryBasedTranCountDataObject["c" + _categoryId]) {
            _categoryBasedTranCountDataObject["c" + _categoryId] = 0;
        }

        _categoryBasedTranCountDataObject["c" + _categoryId] += 1;

    }

    print("_categoryBasedTranCountDataObject:");
    print(_categoryBasedTranCountDataObject);

    for (var i = 0; i < _dataList.length; i++) {
        _dataList[i].searchText = _dataList[i].name;
        _dataList[i].tranCount = _categoryBasedTranCountDataObject["c" + _dataList[i].id] || 0;
    }

    _dataList = _dataList.sort(function compare( a, b ) {
        if ( a.name < b.name ){
            return -1;
        }
        if ( a.name > b.name ){
            return 1;
        }
        return 0;
    });

    return _dataList;

}

editCategoryPage.createCategorytItem = function($itemData) {

    var ITEM_WIDTH = (global.USED_WIDTH - 40) / 2;

    // BOX: Object container box
    var box = createBox(0, 0, ITEM_WIDTH, 200);
    that.color = "transparent";
    that.data = $itemData;

    // BOX: Item background box
    box.boxBackground = createBox(2, 5, ITEM_WIDTH - 4, 190);
    box.add(that);
    that.color = "transparent";
    that.border = 0;
    that.borderColor = "rgba(0, 0, 0, 0.2)";
    that.round = 13;

    // BOX: Selection back color.
    box.boxActive = createBox(0, 0, 100, 100);
    box.add(that);
    that.round = 13;
    that.border = 3;
    that.borderColor = "rgba(0, 0, 0, 0.2)";
    //that.borderColor = "#40A5AF66";
    that.border = 0;
    //that.borderColor = "rgba(0,0,0,0.5)";
    // that.color = "white"; // "#40A5AF44"
    that.color = "rgba(0, 0, 0, 0.05)";
    // that.color = "rgba(255, 255, 255, 0.8)";
    that.center();
    that.top  -= 20;
    that.opacity = 0;
    that.element.style.transform = "scale(0.1)";
    that.setMotion("opacity 0.3s, transform 0.3s");

    // LABEL: Record count.
    box.lblCount = createLabel(0, 0, "auto", "auto");
    box.add(that);
    that.text = $itemData.tranCount;
    that.fontSize = 20;
    that.spaceX = 12;
    that.spaceY = 2;
    that.color = "orangered";
    that.textColor = "white";
    that.border = 2;
    that.borderColor = "rgba(0, 0, 0, 0.3)";
    that.opacity = 0.7;
    that.element.style.fontFamily = "opensans-bold";
    that.round = 20;
    that.top = 20;
    that.right = 78;
    that.setMotion("opacity 0.3s");

    if (that.text > 0) {
        that.visible = 1;
    } else {
        that.visible = 0;
    }

    // IMAGE: icon image
    box.imgIcon = createImage(0, 0, 60, 60);
    box.add(that);
    that.load($itemData.iconFile);
    that.center();
    that.borderColor = "rgba(0, 0, 0, 0.2)";
    that.top  -= 20;
    that.setMotion("opacity 0.3s");

    that.onClick(function(self) {

        if (box.lblCount.text > 0) {
            // Bu kategoriyi pasif yapamazsınız.
            // Bu kategoride, bu ay işlem yapılmış. Kapatmak için, işlemleri silmelisiniz.
            //editCategoryPage.showInfo();
            shared.infoBox.showInfo(lang.YOU_CANNOT_DISABLE_A_USED_CATEGORY);

        } else {
            // clickEffect.makeClick();
            if (box.isActive == 1) {
                makePassive();

            } else {
                makeActive();

            }
            editCategoryPage.box.buttonGroup.btnAction.enabled = 1;
            editCategoryPage.box.buttonGroup.btnAction.element.style.filter = "";
        }

    });

    // TEXTBOX: item name text
    box.txtName = createTextBox(0, 0, ITEM_WIDTH, 50);
    box.add(that);
    that.text = $itemData.name;
    that.top = box.imgIcon.top + box.imgIcon.height + 8 + 14;
    that.minimal = 1;
    that.textAlign = "center";
    that.color = "transparent";
    that.fontSize = 22;
    that.inputElement.setAttribute("maxlength", 20);
    that.setMotion("color 0.3s");

    that.onChange(function(self) {
        // editCategoryPage.updateCategorySearchText(self.data.id);
    });

    that.inputElement.addEventListener("click", function(self) {
        clickEffect.makeClick();
        editCategoryPage.box.buttonGroup.btnAction.enabled = 1;
        editCategoryPage.box.buttonGroup.btnAction.element.style.filter = "";
    });

    var makeActive = function() {

        box.isActive = 1;
        box.boxActive.opacity = 1;
        box.boxActive.element.style.transform = "scale(1)"
        box.imgIcon.imageElement.style.filter = "";
        box.imgIcon.opacity = 1;
        box.txtName.textColor = "#141414";
        box.lblCount.opacity = 1;

    }

    var makePassive = function() {

        box.isActive = 0;
        box.boxActive.opacity = 0;
        box.boxActive.element.style.transform = "scale(0.1)"
        box.imgIcon.imageElement.style.filter = "grayscale(100%)";
        box.imgIcon.opacity = 0.6;
        box.txtName.textColor = "#9B9B9B";
        box.lblCount.opacity = 0.4;

    }

    // İlk oluşturulduğunda, aktif ve ya pasif olarak gösterilecek.
    if ($itemData.active == 1) {
        makeActive();

    } else {
        makePassive();

    }

    makeBasicObject(box);
    return box;
}

editCategoryPage.updateCategorySearchText = function(categoryId) {
    
    // TODO: İsmi değiştirilen kategorinin, searchText ini de değiştir.

}

editCategoryPage.saveCategories = function() {

    var _itemList = editCategoryPage.box.uiItemList.getItemList();

    for (var i = 0; i < _itemList.length; i++) {

        var _itemIndex = -1;
        for (var j = 0; j < database.categoryTable.length; j++) {
            if (_itemList[i].data.id == database.categoryTable[j].id) {
                _itemIndex = j;
                break;
            }
        }

        database.categoryTable[_itemIndex].active = _itemList[i].isActive;
        database.categoryTable[_itemIndex].name = _itemList[i].txtName.text;

    }

    storage.save("data-category-table", database.categoryTable);

    addSpendingView.onAfterActionFunc(periodBar.getSelectedDate().monthNumber);

}

editCategoryPage.onAfterAction = function($func) {
        editCategoryPage.onAfterActionFunc = $func;
    
}

editCategoryPage.selectClickedCategoryItem = function(uiItemList, itemObject, exItemObject) {

    // Category item clicked.

}

/*
editCategoryPage.showInfo = function($info = "") {

    if (editCategoryPage.box.lblInfo.isShown == 0) {
        editCategoryPage.box.lblInfo.opacity = 1;
        editCategoryPage.box.lblInfo.isShown = 1;
        setTimeout(function() {
            editCategoryPage.box.lblInfo.opacity = 0;
            editCategoryPage.box.lblInfo.isShown = 0;
        }, 1500);
    }
}
*/