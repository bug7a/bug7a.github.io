
// global.js - shared variables storaged at local storage.
var global = {};

global.appId = "my-budget-app";
global.USED_WIDTH = 600;
global.MAX_ZOOMABLE_WIDTH = 450;

// tr: Tükçe, en: English
global.lang = "en";

// Colors
global.COLOR = {};
global.COLOR.WHITE = "#FFFFFF";
global.COLOR.BLACK = "#000000";
global.COLOR.BLUE = "#588ABE";
global.COLOR.GREEN = "#40A5AF";
global.COLOR.YELLOW = "#F1C74A";
global.COLOR.ORANGE = "#FE5D49";
global.COLOR.PURPLE = "#CC75AA";
global.COLOR.GRAY1 = "#F6F6F6";
global.COLOR.GRAY2 = "#D8D8D8";
global.COLOR.GRAY3 = "#B7B7B7";
global.COLOR.GRAY4 = "#9B9B9B";
global.COLOR.GRAY5 = "#4A4A4A";
global.COLOR.GRAY6 = "#141414";

global.defaultView = {};
global.defaultView.openedPageListLimit = 10;

global.settings = {};
// its working.
global.settings.useMotionInTransitions = 0;
// they are examples: not working.
global.settings.isDarkModeOn = 0;
global.settings.themeIndex = 1;
global.settings.themeName = "StarWars";
global.settings.languageIndex = 0;
global.settings.languageName = "English";


var saveGlobal = function() {
    storage.save(global.appId + "-global-vars", global);
}

var loadGlobal = function() {
    global = storage.load(global.appId + "-global-vars") || global;
}