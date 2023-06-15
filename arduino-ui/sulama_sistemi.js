const settingsPage = {};
    
let myString = '';
let myFloat = 0.5;
let myInteger = 0;
    
// First running function.
window.onload = function() {

    page.fit(600);

    defaultView.default.showWithMotion = 0;
    defaultView.create();
    smallView.create();

    defaultView.clear();
    const box = defaultView.getContainerBox();

    box.color = 'lightblue';
    basic.setDefaultContainerBox(box);

    // UI TITLE: Default values.
    UITitle.resetDefault();
    UITitle.default.backgroundColor = "#23ACCF";
    UITitle.default.borderColor = "rgba(0, 0, 0, 0.4)";
    UITitle.default.bottomBorder = 2;
    UITitle.default.width = 600;
    // UI TITLE: Category title.
    box.categoryUITitle = UITitle.create({ 
    title: 'Sulama Sistemi'
    });
    box.add(that);
    that.lblTitle.textAlign = 'center';
    that.lblTitle.textColor = "rgba(0, 0, 0, 0.7)";
    // Show object:
    that.position = 'relative';

    /*
    startFlexBox();

        window.lblText = createLabel();
        that.text = 'Hello World!';

        that.onClick(doSomthing1);

    endFlexBox();
    */

    // A. APPEARANCE:

    // UI SUB TITLE: APPEARANCE
    //box.appearanceUISubTitle = settingsPage.createRelativeUISubTitle('ELLE SULAMA');
    box.appearanceUISubTitle = settingsPage.createRelativeUISubTitle('MANUEL');
    //box.add(that);


    // A1. Dark Mode: global.settings.PO1

    // UI LEFT TITLE: Default values.
    settingsPage.setLeftTitleDefaultValues();

    // UI LEFT TITLE: Dark Mode.
    box.darkModeUILeftTitle = UILeftTitle.create({ 
        title: 'Su Pompası:', 
        description: (pompa1_status_setting == 0) ? 'Çalıştırmak için şaltere dokun.' : 'Kapatmak için şaltere dokun.'
    });
    //box.add(that);
    // Show
    that.position = 'relative';

    // UI TOGGLE: Dark mode toggle.
    settingsPage.createUIToggleInLeftTitle({
        uiLeftTitle: box.darkModeUILeftTitle,
        toggleId: 'PO1'
    }, function setCustomStyle() {
        UIToggle.default.backgroundOnColor = '#23ACCF';
    });

    // UI LEFT TITLE: Dark Mode.
    box.ledUILeftTitle = UILeftTitle.create({ 
        title: 'Aydınlatma:', 
        description: (led_status_setting == 0) ? 'Çalıştırmak için şaltere dokun.' : 'Kapatmak için şaltere dokun.'
    });
    //box.add(that);
    // Show
    that.position = 'relative';

    // UI TOGGLE: Dark mode toggle.
    settingsPage.createUIToggleInLeftTitle({
        uiLeftTitle: box.ledUILeftTitle,
        toggleId: "LE1"
    }, function setCustomStyle() {
        UIToggle.default.backgroundOnColor = '#23ACCF';
    });

    // B. APPEARANCE:

    // UI SUB TITLE: APPEARANCE
    box.appearanceUISubTitle = settingsPage.createRelativeUISubTitle('OTOMASYON');
    //box.add(that);

// A4. Primary color: global.settings.selectedColor

    // UI LEFT TITLE: Primary color.
    box.colorLeftTitle = UILeftTitle.create({ 
        title: 'Sulama Aralığı:', 
        description: 'Kaç günde bir sulama yapılsın?' 
    });
    //box.add(that);
    // Show
    that.position = 'relative';

    const checkPrimaryColor = function(boxPrimaryColor) {

        if (boxPrimaryColor.colorData == 0) {
            boxPrimaryColor.width = 90;
            boxPrimaryColor.color = 'lightgray';
            boxPrimaryColor.lbl.text = 'Kapalı';
        } else if (boxPrimaryColor.colorData > 0) {
            boxPrimaryColor.width = 90;
            boxPrimaryColor.color = 'lightblue';
            boxPrimaryColor.lbl.text = boxPrimaryColor.colorData + ' gün';
        }

    }

    // BOX: Primary color. (Custom Item)
    box.colorLeftTitle.boxPrimaryColor = createBox(0, 0, 40, 50);
    //that.color = global.settings.selectedColor || '#689BD2';
    //that.colorData = global.settings.selectedColor || '#689BD2';
    that.color = '#689BD2';
    that.colorData = 4;
    that.border = 1;
    that.borderColor = "rgba(0, 0, 0, 0.8)";;
    that.round = 4;

    box.colorLeftTitle.boxPrimaryColor.lbl = createLabel();
    box.colorLeftTitle.boxPrimaryColor.add(that);
    that.text = '';
    that.textAlign = 'center';
    that.width = '100%';
    that.fontSize = 22;
    that.left = 0;
    that.onResize(function(self) {
        self.center('top');
    });

    checkPrimaryColor(box.colorLeftTitle.boxPrimaryColor);

    box.colorLeftTitle.boxPrimaryColor.onClick(function(boxPrimaryColor) {

        // smallView 'Select a Color:'
        selectColorDialog.selectedColor = boxPrimaryColor.colorData;
        selectColorDialog.openInSmallView(function colorSelected(color) {

            //boxPrimaryColor.color = color;
            boxPrimaryColor.colorData = color;
            checkPrimaryColor(boxPrimaryColor);
            //global.settings.selectedColor = color;
            //saveGlobal();

        });

    });

    box.colorLeftTitle.addObject(box.colorLeftTitle.boxPrimaryColor);


// B4. Font Size: global.settings.fontSize
    
    // UI LEFT TITLE: Font size.
    box.fontSizeUILeftTitle = UILeftTitle.create({
        title: 'Sulama Süresi:',
        description: 'Kaç saniye sulama yapılsın?' 
    });
    //box.add(that);
    that.position = 'relative';

    // UI STEPPER: Font size stepper.
    settingsPage.createUIStepperInLeftTitle({

        uiLeftTitle: box.fontSizeUILeftTitle,
        stepperId: 'fontSize'

    }, function setCustomStyle() {

        //UIStepper.default.backgroundColor = 'whitesmoke';
        //UIStepper.default.buttonOuterSpace = 4;
        UIStepper.default.width = 180;

    }, function setOptions(uiToggle) {

        uiToggle.setMinimumNumber(1);
        uiToggle.setMaximumNumber(60);
        uiToggle.setUnitText('sn');

    });

    box.fontSizeUILeftTitle.uiStepper.setValue(10);

    // UI LEFT TITLE: Font size.
    box.sonSulamaUILeftTitle = UILeftTitle.create({
        title: 'Son Sulama:',
        description: '2 gün, 3 saat önce yapıldı.' 
    });
    //box.add(that);
    that.position = 'relative';

    // Show view:
    defaultView.setVisible(1);
    
};

// Function running every second.
const loop = function() {
    
};

// OTHER FUNCTIONS
const doSomthing1 = function() {

    myInteger++;
    lblText.text = 'Clicked Count: ' + myInteger;
    
};

const doSomething2 = function() {
    
};

settingsPage.createRelativeUISubTitle = function(title, color = 'whitesmoke') {

// BOX: UI object container
const box = createBox(0, 0, 600, 90);
that.color = color;
that.borderColor = 'rgba(0, 0, 0, 0.1)';
that.element.style.borderBottomWidth = '3px';
that.element.style.position = 'relative';

// LABEL: object title text
box.lblTitle = createLabel(20, 50, 'auto');
box.add(that);
that.text = title;
that.fontSize = 18;
that.element.style.fontFamily = 'opensans-bold';

makeBasicObject(box);
return box;

}

settingsPage.createRelativeUISpace = function(height = 100, color = 'transparent') {

const box = createBox(0, 0, 600, height);
that.color = color;
that.element.style.position = 'relative';

return box;

}

settingsPage.setLeftTitleDefaultValues = function() {

// UI LEFT TITLE: Default values.
UILeftTitle.resetDefault();
UILeftTitle.default.width = 600;
UILeftTitle.default.height = 100;
UILeftTitle.default.titleFontSize = 20;
UILeftTitle.default.leftInnerSpace = 20;
UILeftTitle.default.rightInnerSpace = 20;
UILeftTitle.default.bottomBorder = 1;
UILeftTitle.default.round = 0;

}

settingsPage.createRightArrowImage = function() {

const imgIcon = createImage(0, 0, 36, 36);
that.load('js/component/ui-left-title/arrow.svg');
that.opacity = 0.8;

return imgIcon;

}

settingsPage.makeRelative = function(box) {

//box.element.style.position = 'relative';
//box.left = 0;
//box.top = 0;
box.position = 'relative';

}

settingsPage.createUIToggleInLeftTitle = function(parameters = {}, setCustomStyle = function() {}, setOptions = function() {}) {

// parameters.uiLeftTitle
// parameters.toggleId

// UI TOGGLE:
UIToggle.resetDefault();
//UIToggle.style.microsoft();

// Custom style:
setCustomStyle();

parameters.uiLeftTitle.uiToggle = UIToggle.create();
parameters.uiLeftTitle.add(that);
// Show at:
that.right = UILeftTitle.default.rightInnerSpace;
that.center('top');
that.toggleId = parameters.toggleId;

// Options:
setOptions(that);

//that.setValue(global.settings[parameters.toggleId]);
that.setValue(settingsPage.getValue(that.toggleId) || 0);
that.onChange(settingsPage.valueChanged_toggle);

}

settingsPage.createUISelectTextInLeftTitle = function(parameters = {}, setCustomStyle = function() {}, setOptions = function() {}) {

// parameters.uiLeftTitle
// parameters.selectTextId
// parameters.itemDataList

// UI SELECT TEXT:
parameters.uiLeftTitle.uiSelectText = UISelectText.create();
parameters.uiLeftTitle.add(that);
// Show at:
that.right = 20;
that.center('top');
that.setAutoResize(1);

//that.color = 'whitesmoke';
//that.boxMask.element.style.background = 'linear-gradient(to right, #FFFFFF00, lightgray)';
that.color = 'white';
that.boxMask.element.style.background = 'linear-gradient(to right, #FFFFFF00, white)';

// Custom style
setCustomStyle(that);

parameters.uiLeftTitle.uiSelectText.selectTextId = parameters.selectTextId;

// Options
setOptions(that);

parameters.uiLeftTitle.uiSelectText.createItemsByDataList(parameters.itemDataList);

let itemIndex = parameters.uiLeftTitle.uiSelectText.getIndexById(
    //global.settings[parameters.uiLeftTitle.uiSelectText.selectTextId + 'Id']
    );

if (itemIndex < 0) {
    itemIndex = 0;
}

parameters.uiLeftTitle.uiSelectText.setSelectedIndex(itemIndex);
parameters.uiLeftTitle.uiSelectText.onChange(settingsPage.valueChanged_selectText);

}

settingsPage.createUIStepperInLeftTitle = function(parameters = {}, setCustomStyle = function() {}, setOptions = function() {}) {

// parameters.uiLeftTitle
// parameters.stepperId

// UI STEPPER: Default values.
UIStepper.resetDefault();
UIStepper.default.buttonOuterSpace = 0;

setCustomStyle();
UIStepper.default.iconFileDecrease = "https://bug7a.github.io/arduino-ui/js/component/ui-stepper/decrease.svg";
UIStepper.default.iconFileIncrease = "https://bug7a.github.io/arduino-ui/js/component/ui-stepper/increase.svg";

parameters.uiLeftTitle.uiStepper = UIStepper.create();
parameters.uiLeftTitle.add(that);
that.stepperId = parameters.stepperId;
// Show at:
that.right = UILeftTitle.default.rightInnerSpace;
that.center('top');

setOptions(that);

that.setValue(settingsPage.getValue(that.stepperId) || 0);
that.onChange(settingsPage.valueChanged_stepper);

}

settingsPage.valueChanged_toggle = function(uiToggle) {

print('Toggle value (' + uiToggle.toggleId + '): ' + uiToggle.getValue());
settingsPage.setValue(uiToggle.toggleId, uiToggle.getValue());

switch(uiToggle.toggleId) {

    case 'PO1':
        // Do something.
        if(uiToggle.getValue()) {
            basic.go("/PO1=ON");
        } else {
            basic.go("/PO1=OFF");
        }
        
        break;

    case "LE1":
        // Do something.
        if(uiToggle.getValue()) {
            basic.go("/LE1=ON");
        } else {
            basic.go("/LE1=OFF");
        }
        
        break;

    case 'isDownloadWiFiOnlyOn':
        // Do something.
        break;

    case 'isOnlyWhenChargingOn':
        // Do something.
        break;

}

}

settingsPage.valueChanged_selectText = function(uiSelectText) {

print('Selected name (' + uiSelectText.selectTextId + '): ' + uiSelectText.getSelectedName());
settingsPage.setValue(uiSelectText.selectTextId + 'Id', uiSelectText.getSelectedId());
settingsPage.setValue(uiSelectText.selectTextId + 'Name', uiSelectText.getSelectedName());

switch(uiSelectText.selectTextId) {

    case 'theme':
        // Do something.
        //alert(uiSelectText.getSelectedName());
        break;

    case 'videoQuality':

        // Do something.
        settingsPage.updateInfo_videoQuality();
        settingsPage.action_videoQuality();
        break;

    case 'update':
        // Do something.
        break;

    case 'notification':
        // Do something.
        break;

    case 'language':
        // Do something.
        break;

}

}

settingsPage.valueChanged_stepper = function(uiStepper) {

print('Stepper number (' + uiStepper.stepperId + '): ' + uiStepper.getValue());
settingsPage.setValue(uiStepper.stepperId, uiStepper.getValue());

switch(uiStepper.stepperId) {

    case 'fontSize':
        // Do something.
        break;

}

}

settingsPage.setValue = function(id, value) {

//global.settings[id] = value;
//saveGlobal();

}

settingsPage.getValue = function(id) {
//return global.settings[id];
    if(id == "PO1") {
        return pompa1_status_setting;
    } if (id == "LE1") {
        return led_status_setting;
    } else {
        return 0;
    }

}

settingsPage.updateInfo_videoQuality = function() {

const uiLeftTitle = settingsPage.box.videoQualityUILeftTitle;

switch(uiLeftTitle.uiSelectText.getSelectedId()) {

    case 'low':
        uiLeftTitle.setDescription('Current quality: 25%');
        break;

    case 'standart':
        uiLeftTitle.setDescription('');
        break;

    case 'high':
        uiLeftTitle.setDescription('Remaining disk space: 2.3GB');
        break;

}

}

settingsPage.action_videoQuality = function() {

switch(settingsPage.box.videoQualityUILeftTitle.uiSelectText.getSelectedId()) {

    case 'low':
        // Do something.
        notice.show({ 
            message: 'Videos will look very poor quality.', 
            backgroundColor: notice.colors.YELLOW,
            textColor: '#141414'
        });
        break;

    case 'standart':
        // Do something.
        break;

    case 'high':
        // Do something.
        notice.show({ 
            message: 'Videos will take up a lot of space.', 
            backgroundColor: notice.colors.YELLOW,
            textColor: '#141414'
        });
        break;

}

}


const selectColorDialog = {};
selectColorDialog.PAGE_ID = 'selectColorDialog';

//selectColorDialog.colorList = ['#FFD541', '#689BD2', '#A5D5BE', 'lightgray', '#EE7553', 'pink' ];
selectColorDialog.colorList = [0, 1, 2, 3, 4, 5, 6, 7 ];
selectColorDialog.selectedColor = '';

selectColorDialog.openInSmallView = function(colorSelectedCallback = function() {}) {

    smallView.clear();

    // BOX: Page container.
    const box = smallView.getContainerBox();
    selectColorDialog.box = box;

    box.color = 'white';
    box.height = 240;

    // LABEL: Title text.
    box.lblTitle = createLabel(0, 60, '100%', 'auto');
    box.add(that);
    that.text = 'Kaç günde bir sulama yapılsın?';
    that.textAlign = 'center';
    that.fontSize = 28;
    that.textAlign = 'center';

    // UI GROUP: Color items.
    box.grpColor = UIGroup.create();
    box.add(that);
    that.setInnerSpaces(0, 0, 0, 0);
    that.setSpacesBetweenItems(8);
    //that.setItemAlignment(UIGroup.alignType.HORIZONTAL, 'center');

    for (let i = 0; i < selectColorDialog.colorList.length; i++) {

        if (selectColorDialog.selectedColor != selectColorDialog.colorList[i]) {

            // COLOR ITEM:
            const colorItem = selectColorDialog.createColorItem(selectColorDialog.colorList[i]);

            box.grpColor.addItem(colorItem);
            colorItem.colorData = selectColorDialog.colorList[i];

            colorItem.onClick(function(self) {

                colorSelectedCallback(self.colorData);
                smallView.close();

            });

        }

    };

    box.grpColor.onResize(function(self) {

        self.center('left');
        self.top = 120;

    })

    smallView.setVisible(1);

};

selectColorDialog.createColorItem = function(color = 'white') {

    // BOX: Item container.
    const item = createBox(0, 0, 50, 50);

    that.color = color;
    that.border = 1;
    that.borderColor = 'gray';
    that.round = 4;

    item.lbl = createLabel();
    item.add(that);
    that.textAlign = 'center';
    that.width = '100%';
    that.left = 0;
    that.fontSize = 22;
    that.onResize(function(self) {
        self.center('top');
    });

    if (color == 0) {
        item.width = 90;
        item.color = 'lightgray';
        item.lbl.text = 'Kapat';
    } else if (color > 0) {
        item.width = 50;
        item.color = 'lightblue';
        item.lbl.text = color;
    }

    makeBasicObject(item);
    return(item);

};