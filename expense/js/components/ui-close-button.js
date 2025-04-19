/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 February 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/

*/

var CloseButton = {}

createUICloseButton = function() {

    var box = createBox(20, 30, 40, 40);
    that.right = 30;
    that.border = 1;
    that.color = "white";
    that.borderColor = "#141414";
    that.round = 8;
    that.opacity = 1;

    box.imgClose = createImage(0, 0, 22, 22);
    box.add(that);
    that.load("js/components/ui-close-button/close-button.svg");
    that.border = 0;
    that.color = "transparent";
    that.borderColor = "lightgray";
    that.round = 0;
    that.space = 6;
    that.opacity = 0.6;
    that.center();

    makeBasicObject(box)
    return box
}