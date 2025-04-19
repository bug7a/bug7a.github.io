// shared.js - shared functions.
var shared = {}
shared.isCordovaExist = 0
shared.lastPerformanceCheckTime = Date.now()
shared.savedSelectedBox = null

shared.cordovaOnDeviceReady = function (func) {

    window.addEventListener("load", function () {

        if (typeof cordova !== "undefined") {
            shared.isCordovaExist = 1;
            document.addEventListener('deviceready', func.bind(this), false);
        
        }else {
            func();
        }
    });

}

shared.getPlatformId = function() {
    return shared.isCordovaExist ? cordova.platformId : "web"
}

shared.saveSelectedBox = function() {
    shared.savedSelectedBox = getSelectedBox()
}

shared.restoreSelectedBox = function() {
    if (shared.savedSelectedBox) {
        selectBox(shared.savedSelectedBox)
        shared.savedSelectedBox = null
    }
}

shared.checkPerformance = function(label) {
    var spendingTime = (Date.now() - shared.lastPerformanceCheckTime)
    shared.lastPerformanceCheckTime = Date.now()
    print(label + ": " + spendingTime + "ms")
}

shared.createSafeAreaBackground = function() {
    page.boxBackground = createBox(0, 0, global.USED_WIDTH, page.height)
    that.color = "white"
}

shared.setSafeAreaBackgroundColor = function(color) {
    page.boxBackground.color = color
}

shared.setBackgroundColorWithStatusBar = function(color) {
    page.color = color
    // StatusBar.backgroundColorByHexString("#C0C0C0");
}

shared.createRelativeBox = function(height = 100, color = "transparent") {

    var box = createBox(0, 0, global.USED_WIDTH, height)
    that.color = color
    that.element.style.position = "relative"

    return box
}
shared.createRelativeUISpace = shared.createRelativeBox

shared.createRelativeUITitle = function(titleText = "", backgroundColor = "transparent") {

    // BOX: Object container box
    var box = shared.createUITitle(0, 0, titleText, backgroundColor)
    that.element.style.position = "relative"

    return box
}

shared.createUITitle = function(x = 0, y = 0, titleText = "", backgroundColor = "transparent") {

    // BOX: Object container box
    var box = createBox(x, y, global.USED_WIDTH, 110)
    that.color = backgroundColor
    that.element.style.borderBottom = "2px solid rgba(0, 0, 0, 0.06)"

    // LABEL: title text
    box.lblTitle = createLabel(30, 0, 540, 38)
    box.add(that)
    that.bottom = 20
    that.text = titleText
    that.fontSize = 28
    that.color = "transparent"
    that.textColor = "rgba(0, 0, 0, 0.8)"
    that.element.style.fontFamily = "opensans-bold"
    /*
    that.onResize(function(self) {
        print(self.height)
    })
    */

    makeBasicObject(box)
    return box
}

shared.createRelativeUISubTitle = function(titleText, color = "whitesmoke") {

    // BOX: object container
    var box = createBox(0, 0, global.USED_WIDTH, 90)
    that.color = color
    that.borderColor = "rgba(0, 0, 0, 0.1)"
    that.element.style.borderBottomWidth = "3px"
    that.element.style.position = "relative"
    
    // LABEL: object title text
    box.lblTitle = createLabel(20, 50, "auto")
    box.add(that)
    that.text = titleText
    that.fontSize = 18
    that.element.style.fontFamily = "opensans-bold"

    makeBasicObject(box)
    return box
}

shared.setVisibleWithMotion = function(object, visible) {

    if (global.settings.useMotionInTransitions) {

            if (object.motionSetTimeout) {
                clearTimeout(object.motionSetTimeout)
            }

            object.setMotion("opacity 0.2s, transform 0.2s")
            if (visible) {
                if (object.visible == 0) {
                    object.dontMotion()
                    object.element.style.transform = "scale(1.4)"
                    object.opacity = 0
                    object.visible = 1
                }

                object.withMotion(function(self) {
                    self.element.style.transform = "scale(1)"
                    self.opacity = 1
                })
    
            } else {
                if (object.visible == 1) {
                    object.dontMotion()
                    object.element.style.transform = "scale(1)"
                    object.opacity = 1
                }
                
                object.withMotion(function(self) {
                    self.element.style.transform = "scale(1.4)"
                    self.opacity = 0
                    self.motionSetTimeout = setTimeout(function() {
                        self.visible = 0
                    }, 200)
                })
            }

    } else {
        object.visible = visible
        object.dontMotion()
        object.opacity = visible
        object.element.style.transform = "scale(1)"
    }
}

shared.changeLabelNumberWithAnimation = function($label, $value, $valueFormat = "{value}") {

    var _currentValue = parseInt($label.text);

    if (isNaN(_currentValue)) {
        _currentValue = 0
    }

    var _numberToAdd = 1;

    _currentValue = $value - 25;

    var labelInterval = setInterval(function() {

        /*
        var _difference = _currentValue - $value;
        if (_difference < 0) {
            _difference = _difference * -1
        }

        if (_difference < 100) {
            _numberToAdd = 1
        } else if (_difference < 1000) {
            _numberToAdd = 99
        } else {
            _numberToAdd = 299
        }
        */

        if (_currentValue < $value) {
            _currentValue += _numberToAdd;
        } else {
            _currentValue -= _numberToAdd;
        }
        $label.text = $valueFormat.replace("{value}", _currentValue)

        if (_currentValue == $value) {
            clearInterval(labelInterval)
        }

    }, 25)

}

shared.refreshPeriodBar = function() {

    periodBar.createItemsByDataList(database.getMonthNameAndTitleDataList());
    periodBar.selectItemByIndex(periodBar.getLastItemIndex());
    
}

shared.createUIInfoBox = function() {

    // #4 INFO BOX:
    var lblInfo = createLabel(0, 0, "auto", "auto");
    //that.text = "Bu kategoride, bu ay eklenmiş işlemler var.";
    // that.text = "Bu ay kullanılmış bir kategoriyi kapatamazsınız.";
    that.text = "Info Box";
    that.color = "white";
    that.border = 0;
    that.borderColor = "rgba(0, 0, 0, 0.15)";
    that.textAlign = "center";
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

    lblInfo.showInfo = function($info = "", $time = 1500) {

        if (lblInfo.isShown == 0) {
            lblInfo.text = $info;
            lblInfo.opacity = 1;
            lblInfo.isShown = 1;
            setTimeout(function() {
                lblInfo.opacity = 0;
                lblInfo.isShown = 0;
            }, $time);
        }
    }

    return lblInfo;

}