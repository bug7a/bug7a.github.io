
var statusTabPage = {}

statusTabPage.createIn = function(box) {

    box.html = ""
    statusTabPage.box = box

    // #1

    // BOX: Total spending container.
    box.totalSpendingBox = createBox(0, 0, box.width, 150)
    box.add(that)
    that.color = "transparent"
    that.border = 0

    // UI PROGRESS BAR: Total spending progress bar.
    box.totalSpendingBox.uiProgressBar = createUIProgressBar(20, 70, box.width - 40, 30)
    box.totalSpendingBox.add(that)

    // LABEL: Total spending value.
    box.totalSpendingBox.lblTotalSpendingValue = createLabel(40, 23, 250, 41)
    box.totalSpendingBox.add(that)
    that.textColor = "#141414"
    that.fontSize = 30
    that.element.style.fontFamily = "opensans-bold"
    that.text = "0"
    //that.aline(box.totalSpendingBox.uiProgressBar, "top", 6)

    // LABEL: Total spending title.
    box.totalSpendingBox.lblTotalSpendingTitle = createLabel(40, 5, 250, 20);
    box.totalSpendingBox.add(that);
    that.textColor = "#141414";
    that.fontSize = 16;
    that.opacity = 0.6;
    that.text = lang.TOTAL_EXPENDITURE;
    //that.aline(box.totalSpendingBox.lblTotalSpendingValue, "top", -2)
    /*
    that.onResize(function(self) {
        print(self.height)
    })
    */

    // LABEL: Budget value.
    box.totalSpendingBox.lblBudgetValue = createLabel(0, 0, 250, 41)
    box.totalSpendingBox.add(that)
    that.textColor = "#141414"
    that.fontSize = 30
    that.element.style.fontFamily = "opensans-bold"
    that.textAlign = "right"
    that.text = "0"
    // that.aline(box.totalSpendingBox.uiProgressBar, "top", 6, "right")
    that.right = 40
    that.top = box.totalSpendingBox.lblTotalSpendingValue.top
    that.onClick(function(self) {
        if (periodBar.getItemDataByIndex(periodBar.getSelectedItemIndex()).monthNumber == date.monthNumber) {
            clickEffect.makeClick();
            editBudgetPage.createInSmallViewAndShow();
        } else {
            // statusTabPage.showInfo();
            shared.infoBox.showInfo(lang.YOU_CANNOT_EDIT_THE_PREVIOUS_MONTHS_BUDGET);
        }
    })

    // LABEL: Budget title.
    box.totalSpendingBox.lblBudgetTitle = createLabel(0, 0, "auto", 20);
    box.totalSpendingBox.add(that);
    that.textColor = "#141414";
    that.fontSize = 16;
    that.opacity = 0.6;
    that.textAlign = "right";
    that.text = lang.BUDGET;
    // that.aline(box.totalSpendingBox.lblBudgetValue, "top", -2, "right")
    that.right = 40;
    that.top = box.totalSpendingBox.lblTotalSpendingTitle.top;
    that.onClick(function(self) {
        if (periodBar.getItemDataByIndex(periodBar.getSelectedItemIndex()).monthNumber == date.monthNumber) {
            clickEffect.makeClick();
            editBudgetPage.createInSmallViewAndShow();
        } else {
            //statusTabPage.showInfo();
            shared.infoBox.showInfo(lang.YOU_CANNOT_EDIT_THE_PREVIOUS_MONTHS_BUDGET);
        }
    })


    // #2

    // BOX: Saving budget container.
    box.savingBudgetBox = createBox(0, 0, box.width, 100);
    box.add(that);
    that.aline(box.totalSpendingBox, "bottom", 0);
    that.color = "transparent";
    that.border = 0;

    // BOX: Saving budget background.
    box.savingBudgetBox.boxBack = createBox(20, 15, box.width - 40, 66);
    box.savingBudgetBox.add(that);
    that.color = "white";
    that.border = 3;
    that.borderColor = "rgba(0, 0, 0, 0.15)";
    that.round = 14;

    // LABEL: Saving budget title.
    box.savingBudgetBox.boxBack.lblTitle = createLabel(20, 13, 250, 34);
    box.savingBudgetBox.boxBack.add(that);
    that.textColor = "#141414";
    that.fontSize = 25;
    // that.element.style.fontFamily = "opensans-bold"
    that.text = lang.REMAINING_BUDGET;
    //that.center("top")

    // LABEL: Saving budget value.
    box.savingBudgetBox.boxBack.lblValue = createLabel(0, 13, 250, 34);
    box.savingBudgetBox.boxBack.add(that);
    that.right = 20;
    that.textColor = "#141414";
    that.fontSize = 25;
    that.textAlign = "right";
    that.element.style.fontFamily = "opensans-bold";
    that.text = "0";
    //that.center("top")


    // #3

    // BOX: Category-based spending container.
    box.categoryBasedSpendingBox = createBox(0, 0, box.width, box.height - box.totalSpendingBox.height - box.savingBudgetBox.height - 1)
    box.add(that)
    that.aline(box.savingBudgetBox, "bottom", 0)
    that.color = "transparent"
    that.scrollY = 1
    that.border = 0

    // BOX: Bottom mask for box.categoryBasedSpendingBox.
    box.boxBottomMask = createBox(0, 0, box.width, 25)
    box.add(that)
    that.element.style.background = "linear-gradient(to top, whitesmoke, whitesmoke, #FFFFFF00)"
    that.aline(box.categoryBasedSpendingBox, "bottom", -19)
    that.border = 0

    // BOX: Top mask for box.categoryBasedSpendingBox.
    box.boxTopMask = createBox(0, 0, box.width, 30)
    box.add(that)
    that.element.style.background = "linear-gradient(to bottom, whitesmoke, whitesmoke, #FFFFFF00)"
    that.aline(box.categoryBasedSpendingBox, "top", -24)
    that.border = 0


    // #4 INFO BOX:
    /*
    box.lblInfo = createLabel(0, 0, "auto", "auto");
    box.add(that);
    //that.text = "Bu kategoride, bu ay eklenmiş işlemler var.";
    that.text = "Geçmiş ayın bütçesini düzenleyemezsiniz.";
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


    statusTabPage.createCategoryBasedSpendingItems();

}

statusTabPage.createCategoryBasedSpendingItems = function() {

    var categoryDataList = database.getCategoryDataList();

    for (var i = 0; i < categoryDataList.length; i++) {

        statusTabPage.box.categoryBasedSpendingBox["item" + categoryDataList[i].id] = statusTabPage.createCategoryBasedSpendingItem()
        statusTabPage.box.categoryBasedSpendingBox.add(that)
        // that.setOrderIndex(i)
        that.setTitle(categoryDataList[i].name)
        that.loadIcon(categoryDataList[i].iconFile)
    
    }

}

statusTabPage.createCategoryBasedSpendingItem = function() {

    // BOX: Category-based spending item container box.
    var boxItem = createBox(0, 0, statusTabPage.box.width, 120)
    that.color = "transparent"
    that.border = 0
    //that.top = 400
    that.top = statusTabPage.box.height + 120
    that.visible = 0
    /* MOTION: */
    // that.setMotion("top 0.4s")

    // UI PROGRESS BAR: Total spending progress bar.
    boxItem.uiProgressBar = createUIProgressBar(20, 60, statusTabPage.box.width - 40, 14)
    boxItem.add(that)

    // IMAGE: item icon.
    boxItem.imgIcon = createImage(0, 0, 40, 40)
    boxItem.add(that)
    that.imageElement.style.filter = "grayscale(30%)";
    that.aline(boxItem.uiProgressBar, "top", 10 )
    that.left += 20

    // LABEL: item % value.
    boxItem.lblPercentValue = createLabel(0, 0, 100, 34)
    boxItem.add(that)
    that.textColor = "#141414"
    that.fontSize = 25
    that.text = lang.PERCENT_VALUE_FORMAT.replace("{value}", "0"); // TÜRKÇE %0 olmalı. Ve ingilizce 0% olmalı.

    // LABEL: item value.
    boxItem.lblValue = createLabel(0, 15, 250, 34)
    boxItem.add(that)
    that.textColor = "#141414"
    that.fontSize = 25
    that.text = "0"
    that.textAlign = "right"
    that.right = 40

    // LABEL: item title.
    boxItem.lblTitle = createLabel(76 + 20, 15, "auto", 34)
    boxItem.add(that)
    that.textColor = "#141414"
    that.fontSize = 25
    that.text = "DIŞARIDA YEMEK"
    that.element.style.fontFamily = "opensans-bold"
    that.onResize(function(self) {
        boxItem.lblPercentValue.aline(self, "right", 8)
    })

    boxItem.loadIcon = function(iconFile) {
        boxItem.imgIcon.load(iconFile)
    }

    boxItem.setTitle = function(title) {
        boxItem.lblTitle.text = title
    }

    boxItem.setValue = function(value, previousValue, maxValue) {

        boxItem.lblValue.text = value;
        boxItem._value = value;
        boxItem._previousValue = previousValue;

        var _progressPercentage = UIProgressBar.calculatePercentage(value, maxValue);
        var _limitLinePercentage = UIProgressBar.calculatePercentage(previousValue, maxValue);

        // boxItem.lblPercentValue.text = "%" + _progressPercentage;
        boxItem.lblPercentValue.text = lang.PERCENT_VALUE_FORMAT.replace("{value}", _progressPercentage);
        boxItem.uiProgressBar.setProgressPercentage(_progressPercentage);
        
        if (_limitLinePercentage == 100) {
            // Limit çizgisi sondaysa, göstermeye gerek yok.
            // boxItem.uiProgressBar.setLineLimitPercentage(0)
        } else {
            // boxItem.uiProgressBar.setLineLimitPercentage(_limitLinePercentage)
        }
        
        boxItem.uiProgressBar.setLineLimitPercentage(_limitLinePercentage)
        boxItem.uiProgressBar.setLineLimitText(previousValue)

        if (previousValue > maxValue) {
            boxItem.uiProgressBar.makeLineLimitHalfVisible()
        } else {
            
        }

        // Progress bar color:
        if (previousValue == 0) {
            boxItem.uiProgressBar.setProgressColor("purple")
        } else if (value <=  previousValue) { // || previousValue == 0
            boxItem.uiProgressBar.setProgressColor("green")
        } else {
            boxItem.uiProgressBar.setProgressColor("yellow")
        }
    }

    boxItem.getValue = function() {
        return boxItem.lblValue.text;
    }

    boxItem.setOrderIndex = function(index) {
        boxItem.orderIndex = index;
        /* MOTION:
        boxItem.withMotion(function(self) {
            self.top = 120 * self.orderIndex + 10
        })
        */
        boxItem.top = 120 * boxItem.orderIndex + 10;
    }

    makeBasicObject(boxItem)
    return boxItem

}

statusTabPage.refreshCategoryBasedSpendingItemPositions = function() {

    // box scroll 0 seviyesine geri dön.
    statusTabPage.box.categoryBasedSpendingBox.element.scrollTo({top: 0}); // behavior: 'smooth'

    var categoryDataList = database.getCategoryDataList();
    var sortedCategoryDataList = [];

    for (var i = 0; i < categoryDataList.length; i++) {
    
        var boxItem = statusTabPage.box.categoryBasedSpendingBox["item" + categoryDataList[i].id];
        // İsmini de güncelle.
        boxItem.setTitle(categoryDataList[i].name);

        sortedCategoryDataList.push(categoryDataList[i]);

        var _lastItemIndex = sortedCategoryDataList.length - 1;

        if (boxItem._value > 0 || boxItem._previousValue > 0) {
            sortedCategoryDataList[_lastItemIndex].shown = 1;
            sortedCategoryDataList[_lastItemIndex].value = boxItem._value;
        } else {
            sortedCategoryDataList[_lastItemIndex].shown = 0;
            sortedCategoryDataList[_lastItemIndex].value = 0;
        }

    }

    sortedCategoryDataList = sortedCategoryDataList.sort(function(a, b) {
        return b.value - a.value;
    });

    var count = 0;
    for (var i = 0; i < sortedCategoryDataList.length; i++) {

        var boxItem = statusTabPage.box.categoryBasedSpendingBox["item" + sortedCategoryDataList[i].id];
        if (sortedCategoryDataList[i].active == 1 && sortedCategoryDataList[i].shown == 1) {
            boxItem.visible = 1
            boxItem.setOrderIndex(count);
            count++;
        } else {
            boxItem.visible = 0
            boxItem.top = statusTabPage.box.height + 120
        }
    
    }

}

// statusTabPage.refresh = function() {
statusTabPage.setData = function($dataObject) {

    // Set label, total spending:
    statusTabPage.box.totalSpendingBox.lblTotalSpendingValue.text = $dataObject.totalSpending;

    // Set label, budget:
    statusTabPage.box.totalSpendingBox.lblBudgetValue.text = $dataObject.budget;

    // UI progressbar percentage, total spending:
    statusTabPage.box.totalSpendingBox.uiProgressBar.setProgressPercentage(
        UIProgressBar.calculatePercentage(
            $dataObject.totalSpending, 
            $dataObject.budget));

    // Set label, saving budget:
    statusTabPage.box.savingBudgetBox.boxBack.lblValue.text = $dataObject.savingBudget;

    // If value is less than 0, set color to red.
    if (parseInt($dataObject.savingBudget) < 0) {
        statusTabPage.box.savingBudgetBox.boxBack.lblValue.textColor = "#FE5D49";
    } else {
        statusTabPage.box.savingBudgetBox.boxBack.lblValue.textColor = "#141414";
    }

    // UI progressbar color:
    var _progressBarColor = "green";
    if ($dataObject.totalSpending <=  $dataObject.previousTotalSpending 
        || $dataObject.previousTotalSpending == 0) { // || $dataObject.previousTotalSpending == 0
            _progressBarColor = "green";
    } else {
        _progressBarColor = "yellow";
    }

    if ($dataObject.totalSpending > $dataObject.budget) {
        _progressBarColor = "red";
    }

    statusTabPage.box.totalSpendingBox.uiProgressBar.setProgressColor(_progressBarColor);
    
    // UI progressbar linelimit, previous total spending:
    if ($dataObject.previousTotalSpending > 0) {
        statusTabPage.box.totalSpendingBox.uiProgressBar.setLineLimitVisible(1);
    } else {
        statusTabPage.box.totalSpendingBox.uiProgressBar.setLineLimitVisible(0);
    }
    
    statusTabPage.box.totalSpendingBox.uiProgressBar.setLineLimitPercentage(
        UIProgressBar.calculatePercentage(
            $dataObject.previousTotalSpending, 
            $dataObject.budget));

    statusTabPage.box.totalSpendingBox.uiProgressBar.setLineLimitText(
        $dataObject.previousTotalSpending);

    if ($dataObject.previousTotalSpending > $dataObject.budget) {
        statusTabPage.box.totalSpendingBox.uiProgressBar.makeLineLimitHalfVisible(1);
    }

    // Category-based spending:
    for (var i = 0; i < $dataObject.categoryBasedSpendingDataList.length; i++) {

        var _categoryId = $dataObject.categoryBasedSpendingDataList[i].categoryId;
        var boxItem = statusTabPage.box.categoryBasedSpendingBox["item" + _categoryId];

        boxItem.setValue(
            $dataObject.categoryBasedSpendingDataList[i].totalSpending, 
            $dataObject.categoryBasedSpendingDataList[i].previousTotalSpending, 
            $dataObject.totalSpending);

    }

    statusTabPage.refreshCategoryBasedSpendingItemPositions();

}

/*
statusTabPage.showInfo = function($info = "") {

    if (statusTabPage.box.lblInfo.isShown == 0) {
        statusTabPage.box.lblInfo.opacity = 1;
        statusTabPage.box.lblInfo.isShown = 1;
        setTimeout(function() {
            statusTabPage.box.lblInfo.opacity = 0;
            statusTabPage.box.lblInfo.isShown = 0;
        }, 1500);
    }
}
*/