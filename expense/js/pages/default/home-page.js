
var homePage = {}
homePage.ID = "home"

homePage.selectedTabPageIndex = 0
homePage.dragStared = 0;
homePage.startedMouseX = 0;
homePage.currentLeft = 0;
homePage.openPageByIndex = function(pageIndex) {};

homePage.createInDefaultViewAndShow = function() {

    if (homePage.ID != defaultView.getLastOpenedPage().ID) {

        defaultView.removeOpenedPageInView()

        var box = defaultView.getContainerBox()
        // Out of this function, use "homePage.box" for "box".
        homePage.box = box

        box.color = "whitesmoke"

        // BOX: Grouped of 3 pages.
        box.boxPageGroup = createBox(0, 0, box.width * 3, box.height);
        box.add(that);
        /* MOTION: */
        that.setMotion("left 0.2s");
        // that.setMotion("left 0.5s")
        that.clickable = 1;

        // BOX: 1st (status) page container box.
        box.boxPageGroup.boxStatusPage = createBox(0, 160, box.width, box.height - 160)
        box.boxPageGroup.add(that)
        that.color = "transparent"
        statusTabPage.createIn(that)

        // BOX: 2st (transaction) page container box.
        box.boxPageGroup.boxTransactionPage = createBox(box.width, 160, box.width, box.height - 160);
        box.boxPageGroup.add(that);
        that.color = "transparent";
        tranTabPage.createIn(that);

        // BOX: 3st (setting) page container box.
        box.boxPageGroup.boxSettingPage = createBox(box.width * 2, 0, box.width, box.height);
        box.boxPageGroup.add(that);
        that.color = "transparent";
        settingTabPage.createIn(that);
        
        /* DRAG TO NEXT PAGE:

        box.boxPageGroup.element.addEventListener("mousedown", function(event) {

            event.preventDefault();
            homePage.dragStared = 1;

            var e = window.event;
            var posX = e.clientX;

            homePage.startedMouseX = basic.antiZoom(posX);
            homePage.currentLeft = (homePage.box.width * homePage.selectedTabPageIndex) * -1;

        });

        box.boxPageGroup.element.addEventListener("mousemove", function(event) {

            if (homePage.dragStared == 1) {

                event.preventDefault();
                var e = window.event;
                var posX = e.clientX;
                var mouseX = basic.antiZoom(posX);

                var _difference = mouseX - homePage.startedMouseX;

                if (_difference > -179 && _difference < 0 && homePage.selectedTabPageIndex < 2) {
                    homePage.box.boxPageGroup.dontMotion();
                    homePage.box.boxPageGroup.left = homePage.currentLeft + _difference;
                }

                if (_difference > 0 && _difference < 179 && homePage.selectedTabPageIndex > 0) {
                    homePage.box.boxPageGroup.dontMotion();
                    homePage.box.boxPageGroup.left = homePage.currentLeft + _difference;
                }

                if (_difference < -180) {
                    if (homePage.selectedTabPageIndex < 2) {
                        print("Sağ git");
                        homePage.dragStared = 0;
                        homePage.startedMouseX = 0;
                        homePage.openPageByIndex(homePage.selectedTabPageIndex + 1);
                    }

                } else if (_difference > 180) {
                    if (homePage.selectedTabPageIndex > 0) {
                        print("sola git");
                        homePage.dragStared = 0;
                        homePage.startedMouseX = 0;
                        homePage.openPageByIndex(homePage.selectedTabPageIndex - 1);
                    }

                }
            }

        });

        box.boxPageGroup.element.addEventListener("mouseup", function(event) {
            event.preventDefault();
            if (homePage.dragStared == 1) {
                homePage.dragStared = 0;
                homePage.startedMouseX = 0;
                // Eski haline döndür.
                homePage.box.boxPageGroup.withMotion(function(self) {
                    self.left = (homePage.box.width * homePage.selectedTabPageIndex) * -1
                });
            }
        });
        */

        defaultView.pushIntoOpenedPageList(homePage)
        defaultView.setVisible(1)
    }
}

homePage.changeTabPageByIndex = function(pageIndex) {

    if (homePage.selectedTabPageIndex != pageIndex) {
        // homePage.box.boxPageGroup.left = (homePage.box.width * pageIndex) * -1;
        homePage.selectedTabPageIndex = pageIndex;
        homePage.box.boxPageGroup.withMotion(function(self) {
            self.left = (homePage.box.width * homePage.selectedTabPageIndex) * -1;
        });
    }

}