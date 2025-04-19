
// transaction-tab-page.js
var tranTabPage = {}

tranTabPage.createIn = function(box) {

    box.html = ""
    tranTabPage.box = box;

    // #1

    // BOX: Search container box
    box.boxSearch = createBox(0, 0, global.USED_WIDTH, 100)
    box.add(that)
    that.color = "transparent"

    // UI SEARCH BOX: Search box in boxSearch
    box.boxSearch.uiSearchBox = createUISearchBox(0, 0, global.USED_WIDTH - 60)
    box.boxSearch.add(that)
    that.left = 30
    that.top = 20
    that.color = "whitesmoke"
    that.setPlaceholderText(lang.FILTER);
    that.txtSearch.element.addEventListener("click", function(self) {
        clickEffect.makeClick();
    });
    that.imgClearIcon.onClick(function(self) {
        clickEffect.makeClick();
    })

    // #2

    // UI ITEM LIST: Transaction items (vertical)
    box.uiItemList = createUIItemList(0, 0, global.USED_WIDTH, box.height - box.boxSearch.height)
    box.add(that)
    that.color = "transparent"
    that.top = box.boxSearch.height
    that.setItemAlign("vertical")
    that.setInnerSpaces(0, 15, 0, 15)
    that.setCreateFunctionOfItem(tranTabPage.createTranItem)
    that.onChange(tranTabPage.selectClickedTranItem)

    // Connect search box with plant item list
    box.boxSearch.uiSearchBox.onSearch(function(uiSearchBox, searchText) {
        box.uiItemList.searchItemByText(searchText)
    })

    // BOX: Bottom mask for box.uiItemList.
    box.boxBottomMask = createBox(0, 0, box.width, 30)
    box.add(that)
    that.element.style.background = "linear-gradient(to top, whitesmoke, whitesmoke, #FFFFFF00)"
    that.aline(box.uiItemList, "bottom", -24)
    that.border = 0

    // BOX: Top mask for box.uiItemList.
    box.boxTopMask = createBox(0, 0, box.width, 30)
    box.add(that)
    that.element.style.background = "linear-gradient(to bottom, whitesmoke, whitesmoke, #FFFFFF00)"
    that.aline(box.uiItemList, "top", -24)
    that.border = 0

}

tranTabPage.createTranItem = function($itemData) {

    var ITEM_WIDTH = global.USED_WIDTH;
    var box;

    if ($itemData.type == "item") {

        // BOX: Object container box
        box = createBox(0, 0, ITEM_WIDTH, 94);
        that.color = "transparent";

        // BOX: Item background box
        box.boxBackground = createBox(20, 2, ITEM_WIDTH - 40, 90);
        box.add(that);
        that.color = "transparent";
        that.round = 14;
        that.opacity = 0;
        that.border = 1;
        that.borderColor = "#40A5AF";
        that.setMotion("opacity 0.7s");

        // IMAGE: Item icon image
        box.imgLogo = createImage(40, 22, 50, 50);
        box.add(that);
        that.load($itemData.iconFile);
        that.round = 4;
        that.color = "transparent";
        that.border = 0;
        that.space = 0;
        that.imageElement.style.filter = "grayscale(30%)";

        // LABEL: Item title text
        box.lblTitle = createLabel(120, 22, 360, 33);
        box.add(that);
        that.text = $itemData.title;
        that.fontSize = 24;

        // LABEL: Item description text.
        box.lblDesc = createLabel(120, 51, 360, 22);
        box.add(that);
        that.text = $itemData.desc;
        that.textColor = "gray";
        that.fontSize = 16;

        if (!$itemData.desc) {
            box.lblDesc.opacity = 0;
            box.lblTitle.top = 31;
        }

        // BOX: Description mask.
        box.boxMask = createBox(400, 10, 80, 70);
        box.add(that);
        that.element.style.background = "linear-gradient(to left, whitesmoke, whitesmoke, #FFFFFF00)";
        that.border = 0;

        // LABEL: Item spending text.
        box.lblSpending = createLabel(120, 31, 280, 33);
        box.add(that);
        that.text = $itemData.spending;
        that.fontSize = 24;
        that.textAlign = "right";
        that.right = 40;

        // Kategori aktif değilse, öğeyi gri göster.
        if ($itemData.isActiveCategory == 0) {
            box.imgLogo.imageElement.style.filter = "grayscale(100%)";
            box.lblTitle.opacity = 0.6;
            box.lblDesc.opacity = 0.6;
            box.lblSpending.opacity = 0.6;
        }

    } else {

        // ITEM TYPE: TITLE

        // BOX: Object container.
        box = createBox(0, 0, ITEM_WIDTH, 47);
        that.color = "transparent";

        // BOX: Item background.
        box.boxBackground = createBox(20, 2, ITEM_WIDTH - 40, 45);
        box.add(that);
        that.color = "white";
        that.round = 14;
        that.border = 3;
        that.borderColor = "rgba(0, 0, 0, 0.15)";

        // LABEL: Item title text.
        box.lblTitle = createLabel(40, 8, 300, 32);
        box.add(that);
        that.text = $itemData.title;
        that.element.style.fontFamily = "opensans-bold";
        that.fontSize = 24;

        // LABEL: Item spending text.
        box.lblSpending = createLabel(0, 8, 200, 32);
        box.add(that);
        that.text = $itemData.spending;
        that.element.style.fontFamily = "opensans-bold";
        that.fontSize = 24;
        that.textAlign = "right";
        that.right = 40;

    }

    makeBasicObject(box);
    return box;
}

tranTabPage.selectClickedTranItem = function(uiItemList, clickedItem, prevClickedItem) {

    if (clickedItem.getData().type == "item") {

        clickEffect.makeClick();

        print(clickedItem.getData());

        addSpendingView.editData(clickedItem.getData());
        
    }

}

tranTabPage.refresh = function($dataList) {

    // box scroll 0 seviyesine geri dön.
    tranTabPage.box.uiItemList.element.scrollTo({top: 0}); // , behavior: 'smooth'

    tranTabPage.box.uiItemList.createItemsByDataList($dataList);

    if (tranTabPage.box.boxSearch.uiSearchBox.getText() != "") {

        tranTabPage.box.uiItemList.searchItemByText(
            tranTabPage.box.boxSearch.uiSearchBox.getText());

    }

}