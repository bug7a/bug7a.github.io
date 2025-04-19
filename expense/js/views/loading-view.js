var loadingView = {}

loadingView.create = function() {

    // BOX: Content container box.
    loadingView.box = createBox(0, 0, page.width, page.height);
    that.border = 0;
    that.color = "whitesmoke";
    // that.element.style.backgroundImage = "radial-gradient(white, white, lightgray)"
    // that.center("left");
    // that.setMotion("opacity 0.3s, transform 0.5s")

    // IMAGE: Logo image.
    loadingView.box.imgLogo = createImage(0, 0, 50, 50)
    loadingView.box.add(that)
    that.load("images/loading.png")
    that.opacity = 1
    that.center()

    /*
    // IMAGE: Logo image.
    loadingView.box.imgLogo = createImage(0, 20, 95, 78)
    loadingView.box.add(that)
    that.load("images/loading-logo.png")
    that.opacity = 1
    that.center()
    that.top -= 250

    // BOX: Progress box.
    loadingView.box.boxProgress = createBox(0, 0, 100, 6)
    loadingView.box.add(that)
    that.color = "white"
    that.border = 1
    that.borderColor = "#40A5AF"
    that.round = 13
    that.center()

    // BOX: Progress box.
    loadingView.box.boxProgress.boxColoredProgress = createBox(0, -1, 10, 6)
    loadingView.box.boxProgress.add(that)
    that.color = "#40A5AF"
    that.border = 0
    that.round = 13
    that.setMotion("width 0.5s")

    */

    setTimeout(function() {
        loadingView.hide();
    }, 1300)

}

loadingView.makeSomeProgress = function() {

    var _width = loadingView.box.boxProgress.boxColoredProgress.width
    _width += random(10, 40)
    if (_width > 100) {
        _width = 100
    }
    loadingView.box.boxProgress.boxColoredProgress.width = _width

    if (_width == 100) {
        setTimeout(function() {
            loadingView.box.visible = 0
        }, 400)

    } else {
        setTimeout(function() {
            loadingView.makeSomeProgress()
        }, random(50, 300))
    }

}

loadingView.show = function() {
    loadingView.box.opacity = 1;
    loadingView.box.visible = 1;

}

loadingView.showHalf = function() {
    loadingView.box.opacity = 0.8;
    loadingView.box.visible = 1;
}

loadingView.hide = function() {
    loadingView.box.visible = 0;
    loadingView.box.opacity = 1;

}