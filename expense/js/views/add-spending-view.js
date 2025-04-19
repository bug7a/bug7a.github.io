
/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 February 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


*/


var addSpendingView = {}

addSpendingView.sortedCategoryDataList = [];
addSpendingView.selectedCategoryId = -1;
addSpendingView.recordId = 0;
addSpendingView.oldMonthNumber = 1;
// NOT: recordId'li kaydın, hangi nesne içindeki listede olduğu bilgisi oldMonthNumber ile bulunur.

addSpendingView.onAfterActionFunc = function() { };

addSpendingView.create = function() {

    // BOX: Content container box.
    var box = createBox(0, 0, global.USED_WIDTH, page.height);
    that.border = 0;
    that.element.style.backgroundImage = "whitesmoke";
    that.visible = 0;
    /* MOTION: */
    // that.setMotion("opacity 0.3s, transform 0.5s");
    addSpendingView.box = box;





    // #1 DESCRIPTION:

    // BOX: Description container box.
    box.descriptionBox = createBox(0, 0, global.USED_WIDTH, 80);
    box.add(that);
    that.color = "transparent";
    that.border = 0;

    // BOX: Description background box.
    box.descriptionBox.boxBack = createBox(20, 22, global.USED_WIDTH - 40, 52);
    box.descriptionBox.add(that);
    // that.color = "rgba(0, 0, 0, 0.05)";
    that.color = "transparent";
    that.border = 0;
    that.borderColor = "rgba(0,0,0,0.5)";
    that.round = 14;
    that.opacity = 1;

    // IMAGE: Description icon.
    box.descriptionBox.imgIcon = createImage(34, 24, 50, 50);
    box.descriptionBox.add(that);
    that.load("images/desc.png");
    that.opacity = 0.6;
    that.space = 20;
    that.visible = 1;
    that.border = 0;

    // TEXTBOX: Search textbox.
    box.descriptionBox.txtDesc = createTextBox(72, 22);
    box.descriptionBox.add(that);
    that.width = box.width - 80;
    that.height = 50;
    that.border = 0;
    that.minimal = 1;
    that.fontSize = 20;
    that.textColor = "#141414";
    that.color = "transparent";
    that.inputElement.setAttribute("placeholder", lang.DESCRIPTION);
    //that.inputElement.maxLength = 50;
    that.inputElement.setAttribute("maxlength", 50);
    that.visible = 1;

    that.element.addEventListener("click", function(self) {
        clickEffect.makeClick();
        addSpendingView.makeActionButtonCanUsable();
    });
    



    // #3 DATE SELECTION:

    // BOX: Date box.
    box.dateBox = createBox(0, 0, global.USED_WIDTH, 100);
    box.add(that);
    that.color = "transparent";
    that.bottom = 416;
    that.border = 0;

    // BUTTON: Dün button.
    box.dateBox.btnYesterday = createButton(0, 24, 170, 60);
    box.dateBox.add(that);
    that.text = lang.YESTERDAY;
    that.fontSize = 22;
    // that.textColor = "#40A5AF"
    that.textColor = "rgba(0, 0, 0, 0.6)";
    that.minimal = 1;
    // that.color = "#40A5AF44"
    that.color = "rgba(0, 0, 0, 0.05)";
    that.right = 20;
    that.round = 14;
    that.border = 0;
    that.opacity = 1;
    // that.borderColor = "#40A5AF";
    that.borderColor = "rgba(0,0,0,0.5)";
    // that.buttonElement.style.fontFamily = "opensans-bold"

    that.onClick(function(self) {
        if (self.color != "white") {
            clickEffect.makeClick();
            addSpendingView.selectYesterday();
            addSpendingView.makeActionButtonCanUsable();
        }
    })

    // BUTTON: Bugün button.
    box.dateBox.btnToday = createButton(0, 24, 170, 60);
    box.dateBox.add(that);
    that.text = lang.TODAY;
    that.fontSize = 22;
    //that.textColor = "#40A5AF"
    that.textColor = "rgba(0, 0, 0, 0.6)";
    that.minimal = 1;
    //that.color = "rgba(0, 0, 0, 0.05)";
    //that.color = "#40A5AF44"
    that.color = "white";
    that.right = 20 + 170 + 10;
    that.round = 14;
    that.border = 1;
    that.opacity = 1;
    //that.borderColor = "#40A5AF";
    that.borderColor = "rgba(0,0,0,0.5)";
    // that.buttonElement.style.fontFamily = "opensans-bold"

    that.onClick(function(self) {
        if (self.color != "white") {
            clickEffect.makeClick();
            addSpendingView.selectToday();
            addSpendingView.makeActionButtonCanUsable();
        }
    })

    // BUTTON: Date background box.
    box.dateBox.boxBack = createBox(20, 24, 200, 60)
    box.dateBox.add(that)
    // that.textColor = "#40A5AF"
    that.textColor = "rgba(0, 0, 0, 0.6)";
    // that.color = "#40A5AF44"
    that.color = "white";
    // that.color = "rgba(0, 0, 0, 0.05)";
    that.round = 14;
    that.border = 1;
    that.opacity = 0.9;
    // that.borderColor = "#40A5AF";
    that.borderColor = "rgba(0,0,0,0.5)";
    // that.buttonElement.style.fontFamily = "opensans-bold"

    // TEXTBOX: Tarih seçimi.
    box.dateBox.boxBack.txtDate1 = createTextBox(4, 4, 192, 50);
    box.dateBox.boxBack.add(that);
    that.inputElement.setAttribute("type", "date");
    that.fontSize = 22;
    that.color = "white";
    that.border = 0;
    that.borderColor = "rgba(0,0,0,0.2)";
    that.minimal = 1;
    that.textAlign = "center";
    that.inputElement.setAttribute("required", "required");
    // required="required"
    //that.text = currentDate;
    //that.aline(boxMain.boxBack.boxDateRangeGroup.txtDate2, "left", 4)

    that.onChange(function(self) {
        addSpendingView.setSelectedDateButton();
        addSpendingView.makeActionButtonCanUsable();
    });

    that.element.addEventListener("click", function(self) {
        clickEffect.makeClick();
        addSpendingView.makeActionButtonCanUsable();
    });

    // IMAGE: Date icon button.
    box.dateBox.boxBack.imgIcon = createImage(0, 6, 44, 44);
    box.dateBox.boxBack.add(that);
    that.load("images/date-icon.svg");
    that.color = "white";
    that.right = 0;
    that.space = 22;


    // #4 NUMERIC KEYBOARD:

    // BOX: Number keyboard box.
    box.uiNumericKeyboard = createUINumericKeyboard(0, 0, global.USED_WIDTH, 310);
    box.add(that);
    that.bottom = 106;
    that.border = 0;
    that.setTitle(lang.EXPENDITURE_MADE);
    that.onChange(function(self) {
        addSpendingView.makeActionButtonCanUsable();
    });




    // #5 ACTION, CANCEL AND DELETE BUTTONS:

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
        addSpendingView.setVisible(0);
    })
    // that.setMotion("right 0.2s, opacity 0.2s, width 0.2s")

    // BUTTON: Main action button.
    box.buttonGroup.btnAction = createButton(0, 20, "auto", 60);
    box.buttonGroup.add(that);
    that.text = lang.ADD;
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
    that.borderColor = "#40A5AF";
    //that.borderColor = "rgba(0,0,0,0.4)";
    that.buttonElement.style.fontFamily = "opensans-bold";
    that.buttonElement.style.paddingLeft = "36px";
    that.buttonElement.style.paddingRight = "36px";
    that.setMotion("filtre 0.3s, opacity 0.3s");
    // that.setMotion("right 0.2s, opacity 0.2s, width 0.2s")
    that.onClick(function(self) {

        clickEffect.makeClick();

        if (addSpendingView.recordId == 0) {

            // ADD NEW RECORD:

            var _selectedDateString = addSpendingView.box.dateBox.boxBack.txtDate1.text;
            var _selectedDate = new Date(_selectedDateString);

            database.insertSpending(addSpendingView.selectedCategoryId,
                parseInt(addSpendingView.box.uiNumericKeyboard.getValue()),
                addSpendingView.box.descriptionBox.txtDesc.text,
                _selectedDate.getMonth() + 1,
                _selectedDate.getFullYear(),
                _selectedDate.getDate());

            addSpendingView.onAfterActionFunc(_selectedDate.getMonth() + 1);
            // NOT: Yeni kayıt eklendiğinde, o kaydın eklendiği aylık dönem, ana ekrana yüklenir.
            addSpendingView.setVisible(0);

        } else {

            // UPDATE RECORD:

            var _selectedDateString = addSpendingView.box.dateBox.boxBack.txtDate1.text;
            var _selectedDate = new Date(_selectedDateString);

            database.updateSpendingByRecordId(addSpendingView.oldMonthNumber,
                addSpendingView.recordId,
                addSpendingView.selectedCategoryId,
                parseInt(addSpendingView.box.uiNumericKeyboard.getValue()),
                addSpendingView.box.descriptionBox.txtDesc.text,
                _selectedDate.getMonth() + 1,
                _selectedDate.getFullYear(),
                _selectedDate.getDate());

            // NOT: oldMonthNumber eski kaydı silmek için kullanılır.

            addSpendingView.onAfterActionFunc(_selectedDate.getMonth() + 1);
            // NOT: Düzenlenen kaydın, tarihi değiştirilir ise, o tarihe ait dönem; ana ekrana yüklenir.
            addSpendingView.setVisible(0);

        }
    });

    // box.buttonGroup.btnCancel.aline(box.buttonGroup.btnAction, "left", 10)
    box.buttonGroup.btnAction.onResize(function(self) {
        box.buttonGroup.btnCancel.aline(box.buttonGroup.btnAction, "left", 10);
    })

    // IMAGE: Delete gray icon
    box.buttonGroup.imgDelete1 = createImage(40, 24, 50, 50);
    box.buttonGroup.add(that);
    that.load("images/trash1.svg");
    that.opacity = 1;
    that.space = 10;
    that.visible = 1;
    that.border = 0;

    // IMAGE: Delete gray icon
    box.buttonGroup.imgDelete2 = createImage(40, 24, 50, 50);
    box.buttonGroup.add(that);
    that.load("images/trash2.svg");
    that.opacity = 0;
    that.space = 10;
    that.visible = 1;
    that.active = 0;
    /*
    that.border = 2
    that.borderColor = "#FE5D49"
    that.color = "#FE5D4944"
    that.round = 50
    */
    that.setMotion("opacity 0.3s")

    box.buttonGroup.imgDelete2.onClick(function(self) {

        if (box.buttonGroup.imgDelete2.active == 1) {

            // DELETE RECORD:

            clickEffect.makeClick();

            var _selectedDateString = addSpendingView.box.dateBox.boxBack.txtDate1.text;
            var _selectedDate = new Date(_selectedDateString);

            var _itemCount = database.deleteSpendingByRecordId(addSpendingView.oldMonthNumber, addSpendingView.recordId);

            if (_itemCount > 0) {
                addSpendingView.onAfterActionFunc(_selectedDate.getMonth() + 1);
            } else {
                addSpendingView.onAfterActionFunc();
            }
            // NOT: Eğer o ayki tüm kayıtlar artık silinmiş ise, o aylık döneme ait bilgiler yerine, bu ayki kayıtlar yüklenir.
            
            addSpendingView.setVisible(0)

        } else {

            // MAKE ACTIVED DELETE BUTTON:

            setTimeout(function() {
                box.buttonGroup.imgDelete2.active = 1;
            }, 300);

            if (box.buttonGroup.imgDelete2.opacity == 0) {
                clickEffect.makeClick();
            }

            box.buttonGroup.imgDelete2.opacity = 1;

        }
    })





    // #2 CATEGORY SELECTION:

    // BOX: Select category box.
    var _categoryBoxHeight = page.height - box.descriptionBox.height - box.dateBox.height - box.uiNumericKeyboard.height - box.buttonGroup.height;
    box.uiItemList = createUIItemList(0, 0, global.USED_WIDTH, _categoryBoxHeight);
    box.add(that);
    that.color = "transparent";
    that.top = box.descriptionBox.height;
    that.setItemAlign("horizontal-vertical");
    that.setInnerSpaces(0, 15, 0, 15);
    that.setCreateFunctionOfItem(addSpendingView.createCategoryItem);
    // that.createItemsByDataList(addSpendingView.getCategoryDataList());
    that.onChange(addSpendingView.selectClickedCategoryItem);
    // that.selectItemByIndex(0);

    // BOX: Bottom mask for box.uiItemList.
    box.boxBottomMask = createBox(0, 0, box.width, 30)
    box.add(that)
    that.element.style.background = "linear-gradient(to top, whitesmoke, whitesmoke, #FFFFFF00)"
    that.aline(box.uiItemList, "bottom", -26)
    that.border = 0

    // BOX: Top mask for box.uiItemList.
    box.boxTopMask = createBox(0, 0, box.width, 30)
    box.add(that)
    that.element.style.background = "linear-gradient(to bottom, whitesmoke, whitesmoke, #FFFFFF00)"
    that.aline(box.uiItemList, "top", -26)
    that.border = 0


}

addSpendingView.getContainerBox = function() {
    return addSpendingView.box
}

addSpendingView.setVisible = function(visible) {
    //addSpendingView.box.visible = visible
    shared.setVisibleWithMotion(addSpendingView.box, visible)
}

addSpendingView.createSortedCategoryDataList = function() {

    addSpendingView.sortedCategoryDataList = database.getActiveCategoryDataList();

    addSpendingView.sortedCategoryDataList = addSpendingView.sortedCategoryDataList.sort(function compare( a, b ) {
        if ( a.name < b.name ){
            return -1;
        }
        if ( a.name > b.name ){
            return 1;
        }
        return 0;
    });

    return addSpendingView.sortedCategoryDataList;

}

addSpendingView.createCategoryItem = function($itemData) {

    var ITEM_WIDTH = parseInt(global.USED_WIDTH / 2);
    var box

    // BOX: Object container box
    box = createBox(0, 0, ITEM_WIDTH, 54)
    that.color = "transparent";
    that.border = 0;

    // BOX: Item background box
    box.boxBackground = createBox(20, 2, ITEM_WIDTH - 40, 50)
    box.add(that)
    // that.color = "white";
    that.opacity = 1;
    that.round = 14;
    // that.border = 3;
    // that.borderColor = "rgba(0, 0, 0, 0.15)";
    
    that.color = "transparent";
    that.border = 1;
    that.borderColor = "transparent"

    // IMAGE: Item icon image
    box.boxBackground.imgLogo = createImage(20, 5, 36, 36);
    box.boxBackground.add(that);
    that.load($itemData.iconFile);
    that.round = 4;
    that.color = "transparent";
    that.border = 0;
    that.space = 0;
    that.imageElement.style.filter = "grayscale(30%)";

    // LABEL: Item title text
    box.boxBackground.lblTitle = createLabel(70, 10, 300, 33);
    box.boxBackground.add(that);
    that.text = $itemData.name;
    that.fontSize = 20;
    that.color = "transparent";

    // BOX: Description mask.
    box.boxBackground.boxMask = createBox(0, 0, 50, 70);
    box.boxBackground.add(that);
    that.right = 0;
    that.element.style.background = "linear-gradient(to left, whitesmoke, whitesmoke, #FFFFFF00)"
    that.border = 0;

    makeBasicObject(box)
    return box
}

addSpendingView.selectClickedCategoryItem = function(uiItemList, clickedItem, prevClickedItem) {

    if (clickedItem.isSelected() == 0) {

        if (addSpendingView.selectedCategoryId != -1) {
            clickEffect.makeClick();
        }
        // NOT: Bu nesne ilk oluşturulduğunda, tıklama effecti görünmemesi için.

        if (prevClickedItem) {
            prevClickedItem.boxBackground.color = "transparent";
            prevClickedItem.boxBackground.borderColor = "transparent";
            prevClickedItem.boxBackground.boxMask.element.style.background = "linear-gradient(to left, whitesmoke, whitesmoke, #FFFFFF00)"
            uiItemList.removeItemFromSelectedList(prevClickedItem)
        }

        // Selected item properties
        clickedItem.boxBackground.color = "white";
        //clickedItem.boxBackground.borderColor = "rgba(0, 0, 0, 0.15)";
        clickedItem.boxBackground.borderColor = "rgba(0,0,0,0.5)";
        clickedItem.boxBackground.boxMask.element.style.background = "linear-gradient(to left, white, white, #FFFFFF00)"
        uiItemList.addItemToSelectedList(clickedItem)

        addSpendingView.selectedCategoryId = clickedItem.getData().id;
        print("Category: " + clickedItem.getData().name + ": " + clickedItem.getData().id)

        addSpendingView.makeActionButtonCanUsable();

    }
}

addSpendingView.addNewData = function() {

    addSpendingView.recordId = 0;

    // Clean description:
    addSpendingView.box.descriptionBox.txtDesc.text = "";

    // Clean category and select first.
    addSpendingView.showAndSelectCategory();

    // Bugünün tarihini seç.
    addSpendingView.selectToday();
    addSpendingView.setMinMaxDateLimites();
    // NOT: Bir önceki aydan daha geriyede bir tarih seçilemez.

    // Clean numeric keyboard value:
    addSpendingView.box.uiNumericKeyboard.setValue("0");

    // Hide delete button:
    addSpendingView.box.buttonGroup.imgDelete1.visible = 0;
    addSpendingView.box.buttonGroup.imgDelete2.visible = 0;
    addSpendingView.box.buttonGroup.imgDelete2.opacity = 0;
    addSpendingView.box.buttonGroup.imgDelete2.active = 0;

    // Prepare add button.
    addSpendingView.box.buttonGroup.btnAction.text = lang.ADD;
    addSpendingView.box.buttonGroup.btnAction.enabled = 0;
    addSpendingView.box.buttonGroup.btnAction.element.style.filter = "grayscale(100%)";
    addSpendingView.makeActionButtonCanUsable();

    // Show add spending view:
    addSpendingView.setVisible(1);

}

addSpendingView.editData = function($itemData) {

    addSpendingView.recordId = $itemData.recordId;
    addSpendingView.oldMonthNumber = $itemData.monthNumber;

    // Clean description:
    addSpendingView.box.descriptionBox.txtDesc.text = $itemData.desc;

    // Clean category and select first.
    addSpendingView.showAndSelectCategory($itemData.categoryId);
    //addSpendingView.box.uiItemList.element.scrollTo({top: 0});

    // Tarihini seç.
    var _dateString = $itemData.year + "-" + twoDigitFormat($itemData.monthNumber) + "-" + twoDigitFormat($itemData.day);
    addSpendingView.selectDateByString(_dateString);
    addSpendingView.setMinMaxDateLimites(_dateString);
    // NOT: Kaydın tarihi, bir önceki aydan daha geriyede ise, en eski seçilebilir tarih olarak o kullanılır.

    // Clean numeric keyboard value:
    addSpendingView.box.uiNumericKeyboard.setValue($itemData.spending);

    // Hide delete button:
    addSpendingView.box.buttonGroup.imgDelete1.visible = 1;
    addSpendingView.box.buttonGroup.imgDelete2.visible = 1;
    addSpendingView.box.buttonGroup.imgDelete2.opacity = 0;
    addSpendingView.box.buttonGroup.imgDelete2.active = 0;

    // Prepare add button.
    addSpendingView.box.buttonGroup.btnAction.text = lang.SAVE;
    addSpendingView.box.buttonGroup.btnAction.enabled = 0;
    addSpendingView.box.buttonGroup.btnAction.element.style.filter = "grayscale(100%)";
    //addSpendingView.makeActionButtonCanUsable();

    // Show add spending view:
    addSpendingView.setVisible(1);

}

addSpendingView.selectToday = function() {

    const today = new Date();
    const todayString = today.toISOString().substring(0,10);
    
    addSpendingView.box.dateBox.boxBack.txtDate1.text = todayString;
    addSpendingView.setSelectedDateButton();
    
}

addSpendingView.selectYesterday = function() {

    const today = new Date();
    const yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayString = yesterday.toISOString().substring(0, 10);

    addSpendingView.box.dateBox.boxBack.txtDate1.text = yesterdayString;
    addSpendingView.setSelectedDateButton();

}

addSpendingView.selectDateByString = function($dateString) {

    const aday = new Date($dateString);
    const adayString = aday.toISOString().substring(0,10);

    addSpendingView.box.dateBox.boxBack.txtDate1.text = adayString;
    addSpendingView.setSelectedDateButton();
    
}

addSpendingView.setSelectedDateButton = function() {

    const selectedDateString = addSpendingView.box.dateBox.boxBack.txtDate1.text;

    const today = new Date();
    const yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    const todayString = today.toISOString().substring(0,10);
    const yesterdayString = yesterday.toISOString().substring(0,10);

    addSpendingView.box.dateBox.btnToday.color = "rgba(0, 0, 0, 0.05)";
    addSpendingView.box.dateBox.btnToday.border = 0;

    addSpendingView.box.dateBox.btnYesterday.color = "rgba(0, 0, 0, 0.05)";
    addSpendingView.box.dateBox.btnYesterday.border = 0;

    if (selectedDateString == todayString) {
        addSpendingView.box.dateBox.btnToday.color = "white";
        addSpendingView.box.dateBox.btnToday.borderColor = "rgba(0,0,0,0.5)";
        addSpendingView.box.dateBox.btnToday.border = 1;
        
    } else if (selectedDateString == yesterdayString) {
        addSpendingView.box.dateBox.btnYesterday.color = "white";
        addSpendingView.box.dateBox.btnYesterday.borderColor = "rgba(0,0,0,0.5)";
        addSpendingView.box.dateBox.btnYesterday.border = 1;
        
    } else {
        // Seçim yok.
        // Bugün ve Dün butonları seçili olmasın.

    }
}

addSpendingView.setMinMaxDateLimites = function($minDateString) {

    const today = new Date();
    const todayString = today.toISOString().substring(0,10);

    addSpendingView.box.dateBox.boxBack.txtDate1.inputElement.setAttribute("max", todayString);

    var minDateString;

    const yesterday = new Date(today);
    yesterday.setMonth(today.getMonth() - 1);
    yesterday.setDate(yesterday.getDate() - today.getDate() + 1);

    minDateString = yesterday.toISOString().substring(0,10);

    if ($minDateString) {
        if ($minDateString < minDateString) {
            minDateString = $minDateString;
        }
    }
    // NOT: Parametre ile daha eski bir tarih gönderilir ise onu kullan.

    addSpendingView.box.dateBox.boxBack.txtDate1.inputElement.setAttribute("min", minDateString);

}

addSpendingView.showAndSelectCategory = function($categoryId) {

    addSpendingView.selectedCategoryId = -1;
    addSpendingView.createSortedCategoryDataList();

    if (addSpendingView.sortedCategoryDataList) {
        if (addSpendingView.sortedCategoryDataList.length > 0) {

            // Create all categories:
            addSpendingView.box.uiItemList.createItemsByDataList(addSpendingView.sortedCategoryDataList);

            if ($categoryId) {

                // SELECT BY ID:
                var _sortedCategoryIndex = -1;

                for (var i = 0; i < addSpendingView.sortedCategoryDataList.length; i++) {
                    if (addSpendingView.sortedCategoryDataList[i].id == $categoryId) {
                        _sortedCategoryIndex = i;
                        break;
                    }
                }

                if (_sortedCategoryIndex != -1) {
                    addSpendingView.box.uiItemList.selectItemByIndex(_sortedCategoryIndex);
                }

            } else {

                // SELECT FIRST CATEGORY:
                addSpendingView.box.uiItemList.selectItemByIndex(0);

            }

            // SET SCROLL TOP 0:
            setTimeout(function() {
                addSpendingView.box.uiItemList.element.scrollTo({top: 0});
            }, 1);
            // TODO: Scroll'u başa almak için beklemek gerekiyor. Nedenini bulamadım.

        } else {
            addSpendingView.box.uiItemList.createItemsByDataList([]);

        }
    }
}

addSpendingView.makeActionButtonCanUsable = function() {
    addSpendingView.box.buttonGroup.btnAction.enabled = 0;
    addSpendingView.box.buttonGroup.btnAction.element.style.filter = "grayscale(100%)";
    if (addSpendingView.selectedCategoryId != -1) {
        if (addSpendingView.box.dateBox.boxBack.txtDate1.text != "") {
            if (addSpendingView.box.uiNumericKeyboard.getValue() != "0") {
                addSpendingView.box.buttonGroup.btnAction.enabled = 1;
                addSpendingView.box.buttonGroup.btnAction.element.style.filter = "";
            }
        }
    }
}

addSpendingView.onAfterAction = function($func) {
    addSpendingView.onAfterActionFunc = $func;
}