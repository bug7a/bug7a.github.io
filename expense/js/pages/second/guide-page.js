var guidePage = {}
guidePage.ID = "guide"

guidePage.createInSecondViewAndShow = function() {

    secondView.removeOpenedPageInView()

    var box = secondView.getContainerBox()
    // Out of this function, use "guidePage.box" for "box".
    guidePage.box = box

    box.color = "whitesmoke"

    // IMAGE: background image.
    box.uiWebView = createUIWebView(0, 0, box.width, box.height)
    box.add(that)
    that.loadHTMLFileFromURL(lang.USERS_MANUAL_URL);
    

    // CLOSE BUTTON: Close button.
    box.btnClose = createUICloseButton()
    box.add(that)
    //that.color = "rgba(255, 255, 255, 0.1)"
    //that.border = 2
    //that.borderColor = "rgba(0, 0, 0, 0.1)"
    //that.imgClose.center()
    that.onClick(function() {
        clickEffect.makeClick();
        secondView.cleanAndHide();
    })

    secondView.setVisible(1)
    print("Opened page id: " + guidePage.ID)
}