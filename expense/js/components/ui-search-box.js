/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 15 March 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


HANDBOOK:

createUISearchBox(left: float, top: float, width: number) : UISearchBox
- Create a search box.
- UISearchBox extends the Box object.

object.onSearch(func: function) : void
- Call this function when textbox text changes.
- Return parameters: self: UISearchBox, searchText: string
- Example:
    object.onSearch(function(self, searchText) {
        print(searchText)
    })

object.setWidth(width: number)
- Change the width of the search box

object.setPlaceholderText(text: string)
- Change the placeholder text of the search box

object.setText(text: string)
- Change the text of the search box.

object.getText() : string
- Get the text of the search box.

object.color = "white"
- Change color of search box


*/

var UISearchBox = {}

var createUISearchBox = function(left = 0, top = 0, width = 300, height = 50) {

    // *** PRIVATE VARIABLES:
    var onSearchFunc = function() {}

    // *** OBJECT MODEL:
    // BOX: Search box
    var box = createBox(left, top, width, height)
    that.color = "whitesmoke"
    that.round = 6
    //that.border = 0
    //that.borderColor = "gray"
    that.element.style.borderBottom = "2px solid rgba(0, 0, 0, 0.06)"
    that.visible = 1

    // IMAGE: Search icon
    box.imgIcon = createImage(5, 0, height, height)
    box.add(that)
    that.load("js/components/ui-search-box/search.svg")
    that.opacity = 0.4
    that.space = 25
    that.visible = 1

    // TEXTBOX: Search textbox
    box.txtSearch = createTextBox(height - 5, 0)
    box.add(that)
    that.width = box.width - 80
    that.height = height
    that.border = 0
    that.minimal = 1
    that.fontSize = (height / 2) - 5
    that.textColor = "gray"
    that.color = "transparent"
    that.inputElement.setAttribute("placeholder", "Search")
    that.visible = 1

    // IMAGE: Clear icon
    box.imgClearIcon = createImage(5, 0, height, height)
    box.add(that)
    that.load("js/components/ui-search-box/clear.svg")
    that.opacity = 0
    that.space = 28
    that.visible = 1
    that.right = 10
    that.setMotion("opacity 0.3s")
    that.onClick(function(self) {

        box.imgClearIcon.opacity = 0
        box.txtSearch.text = ""
        onSearchFunc(box, box.txtSearch.text.toLowerCase())

    })


    // *** PUBLIC METHODS:
    box.onResize = function(self) {
        self.txtSearch.width = self.width - 80
    }

    box.onSearch = function(func) {
        onSearchFunc = func
    }

    box.setWidth = function(width) {
        box.width = width
    }

    box.setText = function(text) {
        box.txtSearch.text = text
    }

    box.getText = function() {
        return box.txtSearch.text
    }

    box.setPlaceholderText = function(text) {
        box.txtSearch.inputElement.setAttribute("placeholder", text)
    }

    box.txtSearch.inputElement.addEventListener("keyup", function() {

        onSearchFunc(box, box.txtSearch.text.toLowerCase())

        if (box.txtSearch.text.length > 0) {
            box.imgClearIcon.opacity = 0.6
        } else {
            box.imgClearIcon.opacity = 0
        }

    })

    makeBasicObject(box)
    return box
}

