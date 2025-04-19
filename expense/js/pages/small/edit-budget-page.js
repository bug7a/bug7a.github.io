
var editBudgetPage = {};
editBudgetPage.ID = "edit-budget";

editBudgetPage.createInSmallViewAndShow = function() {

    smallView.removeOpenedPageInView();

    var box = smallView.getContainerBox();
    // Out of this function, use "editBudgetPage.box" for "box".
    editBudgetPage.box = box;

    box.color = "white";
    box.height = 434;

    // #4 NUMERIC KEYBOARD:

    // BOX: Number keyboard box.
    box.uiNumericKeyboard = createUINumericKeyboard(0, 0, global.USED_WIDTH, 310)
    box.add(that);
    that.bottom = 106;
    that.border = 0;
    // that.setTitle(date.ayAdi.toUpperCase() + " BÜTÇESİ");
    that.setTitle(lang.X_BUDGET.replace("{value}", lang.MONTHS[date.monthNumber - 1].toUpperCase()));
    that.setValue(database.budgetTable["m" + date.monthNumber]);

    that.onChange(function(self) {

        if (self.getValue() == "0") {
            box.buttonGroup.btnAction.enabled = 0;
            box.buttonGroup.btnAction.element.style.filter = "grayscale(100%)";

        } else {
            if (database.budgetTable["m" + date.monthNumber] == self.getValue()) {
                box.buttonGroup.btnAction.enabled = 0;
                box.buttonGroup.btnAction.element.style.filter = "grayscale(100%)";

            } else {
                box.buttonGroup.btnAction.enabled = 1;
                box.buttonGroup.btnAction.element.style.filter = "";
            }
        }
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
    that.opacity = 0.9;
    // that.borderColor = "#9B9B9B"
    that.borderColor = "transparent";
    that.buttonElement.style.fontFamily = "opensans-bold";
    that.buttonElement.style.paddingLeft = "36px";
    that.buttonElement.style.paddingRight = "36px";

    that.onClick(function() {

        clickEffect.makeClick();
        smallView.setVisible(0);

    })
    // that.setMotion("right 0.2s, opacity 0.2s, width 0.2s")

    // BUTTON: Main action button.
    box.buttonGroup.btnAction = createButton(0, 20, "auto", 60)
    box.buttonGroup.add(that)
    that.text = lang.SAVE;
    that.fontSize = 25
    that.textColor = "#40A5AF"
    //that.textColor = "rgba(0, 0, 0, 0.6)";
    that.minimal = 1;
    that.color = "#40A5AF44"
    //that.color = "white";
    that.right = 20;
    that.round = 14;
    that.border = 1;
    that.opacity = 0.9;
    that.borderColor = "#40A5AF";
    that.enabled = 0;
    that.element.style.filter = "grayscale(100%)";
    //that.borderColor = "rgba(0,0,0,0.4)";
    that.buttonElement.style.fontFamily = "opensans-bold"
    that.buttonElement.style.paddingLeft = "36px"
    that.buttonElement.style.paddingRight = "36px"
    that.setMotion("filter 0.3s, opacity 0.3s");
    // that.setMotion("right 0.2s, opacity 0.2s, width 0.2s")

    that.onClick(function(self) {

        clickEffect.makeClick();

        database.budgetTable["m" + date.monthNumber] = parseInt(box.uiNumericKeyboard.getValue());
        storage.save("data-budget-table-m" + date.monthNumber, database.budgetTable["m" + date.monthNumber]);

        database.lastUsedBudget = database.budgetTable["m" + date.monthNumber];
        storage.save("data-last-used-budget", database.lastUsedBudget); 
        
        smallView.setVisible(0);
        setDataOnPages();
        
    });

    box.buttonGroup.btnAction.onResize(function(self) {
        box.buttonGroup.btnCancel.aline(box.buttonGroup.btnAction, "left", 10)
    })

    smallView.setVisible(1)
}