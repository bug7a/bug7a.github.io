/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 February 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/

*/

var clickEffect = {}
clickEffect.isActive = 1

clickEffect.create = function() {

    /*
    page.onClick(function(self) {

        clickEffect.makeClick()
        
    })
    */
}

clickEffect.setActive = function(value) {
    clickEffect.isActive = value
}

clickEffect.makeClick = function() {

    if (clickEffect.isActive) {

        var lastSelectedBox = getSelectedBox()
        if (lastSelectedBox != page) {
            selectBox(page)
        }

        var e = window.event;
        var posX = e.clientX;
        var posY = e.clientY;

        posX = basic.antiZoom(posX)
        posY = basic.antiZoom(posY)

        /* MOTION:
        createBox(posX - 20, posY - 20, 40, 40)
        that.color = "#40A5AF"
        that.round = 50
        that.border = 0
        that.borderColor = "#40A5AF"
        that.setMotion("left 0.4s, top 0.4s, opacity 0.4s, width 0.4s, height 0.4s")
        that.opacity = 0.5
        that.withMotion(function(self) {

            self.opacity = 0
            self.width += 80
            self.height += 80
            self.top -= 40
            self.left -= 40
        })
        */

        createBox(posX - 40, posY - 40, 80, 80)
        //that.color = "#40A5AF"
        that.color = "#CC75AA"
        that.round = 50
        that.border = 0
        that.borderColor = "#40A5AF"
        that.setMotion("opacity 0.6s")
        that.opacity = 0.4
        
        that.withMotion(function(self) {
            self.opacity = 0
        })
        
        var _that = that
        setTimeout(function() {
            _that.remove()
        }, 600)

        selectBox(lastSelectedBox)
    }
    
}