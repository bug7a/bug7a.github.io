
var lang = {};

lang.currentLang = global.lang;
//lang.currentLang = "tr";
//lang.currentLang = "en";

switch (lang.currentLang) {

    case "tr":

        // General usage
        lang.FILTER = "Filtre";
        lang.ADD = "EKLE";
        lang.SAVE = "KAYDET";
        lang.CANCEL = "İPTAL";

        // ui.bottom-tab.js 
        lang.STATUS = "DURUM";
        lang.TRANSACTIONS = "İŞLEMLER";
        lang.SETTINGS = "AYARLAR";

        // status-tab-page.js
        lang.TOTAL_EXPENDITURE = "TOPLAM HARCAMA";
        lang.BUDGET = "BÜTÇE";
        lang.REMAINING_BUDGET = "KALAN BÜTÇE";
        lang.YOU_CANNOT_EDIT_THE_PREVIOUS_MONTHS_BUDGET = "Geçmiş ayın bütçesini düzenleyemezsiniz.";
        lang.PERCENT_VALUE_FORMAT = "%{value}";

        // Category Names:
        lang.HOUSE = "EV";
        lang.BILLS = "FATURALAR";
        lang.SHOPPING = "ALIŞVERİŞ";
        lang.ENTERTAINMENT = "EĞLENCE";
        lang.EATING_OUT = "DIŞARIDA YEMEK";
        lang.CLOTHING = "GİYİM";
        lang.CHILDREN = "ÇOCUKLAR";
        lang.TRANSPORT = "ULAŞIM";
        lang.CAR = "ARABA";
        lang.FUEL = "YAKIT";
        lang.PETS = "EVCİL HAYVAN";
        lang.HEALTH = "SAĞLIK";
        lang.HOLIDAY = "TATİL";
        lang.SPORT = "SPOR";
        lang.GIFT = "HEDİYE";
        lang.OTHER = "DİĞER";
        lang.FURNITURE = "EŞYA";
        lang.ELECTRONIC = "ELEKTRONİK";
        lang.HOBBY = "HOBİ";
        lang.LUXURY = "LÜX";
        lang.PERSONAL_CARE = "KİŞİSEL BAKIM";
        lang.CHARITIES = "HAYIR İŞLERİ";
        lang.INVESTMENT = "YATIRIM";
        lang.RED = "KIRMIZI";
        lang.YELLOW = "SARI";
        lang.BLUE = "MAVİ";

        // MONTHS NAMES:
        lang.MONTHS = [...basic.aylar];
        lang.TODAY_TITLE = "BUGÜN";
        lang.LAST_MONTH = "GEÇEN AY";
        lang.X_MONTHS_AGO = "{value} AY ÖNCE";

        // edit-category-page.js
        lang.YOU_CANNOT_DISABLE_A_USED_CATEGORY = "Kullanılan bir kategoriyi pasif yapamazsınız.";

        // add-spending-view.js
        lang.DESCRIPTION = "Açıklama";
        lang.TODAY = "BUGÜN";
        lang.YESTERDAY = "DÜN";
        lang.EXPENDITURE_MADE = "YAPILAN HARCAMA";

        // setting-tab-page.js
        lang.CATEGORIES_TITLE = "KATEGORİLER";
        lang.CATEGORIES_DESCRIPTION = "Harcama kategorilerinizi düzenleyin.";
        lang.BUDGET_TITLE = "BÜTÇE";
        lang.BUDGET_DESCRIPTION = "Bu ayki toplam bütçenizi belirleyin.";
        lang.PAYMENT_TITLE = "ÖDEME";
        lang.PAYMENT_DESCRIPTION = "Mevcut kullanım sürenizi arttırın.";
        lang.USERS_MANUAL_TITLE = "KULLANIM KLAVUZU";
        lang.USERS_MANUAL_DESCRIPTION = "Uygulama hakkında genel bilgiler.";
        lang.ABOUT_TITLE = "HAKKINDA";
        lang.ABOUT_DESCRIPTION = "Hangi teknolojiler ile geliştirildiği.";
        lang.USERS_MANUAL_URL = "guide.htm";
        lang.ABOUT_URL = "about.htm";

        // edit-budget-page.js
        lang.X_BUDGET = "{value} BÜTÇESİ";

        // payment-page.js
        lang.CURRENT_USAGE_TIME = "MEVCUT KULLANIM SÜRESİ:";
        // Available until this date.
        lang.AVAILABLE_UNTIL_THIS_DATE = "Tarihine kadar kullanılabilir.";
        // It has expired.
        lang.IT_HAS_EXPIRED = "Tarihinde dolmuştur."
        lang.PAYMENT_DESC1 = "Satın aldığınız paket,<br>mevcut kullanım sürenize eklenir."
        lang.PAYMENT_DESC2_ELEMENT_ID = "payment-description";
        lang.IOS_PAYMENT_DESC2_ELEMENT_ID = "ios-payment-description";
        lang.FOUR_MONTHS = "4 AYLIK";
        lang.TWELVE_MONTHS = "12 AYLIK";
        lang.OF_USE = "KULLANIM";
        lang.FOUR_MONTHS_PRICE = "4 TL";
        lang.TWELVE_MONTHS_PRICE = "10 TL";
        lang.TAX = "+ VERGİ";
        lang.CONTINUE = "DEVAM ET";
        lang.ANDRODID_KEY = "goog_WfwGQUFAQqLDZjvgrYnpOFoPwqV";
        lang.IOS_KEY = "";
        lang.PERIOD_HAS_BEEN_UPDATED = "Mevcut kullanım süreniz güncellenmiştir.";
        lang.PLEASE_TRY_AGAIN_LATER = "İşlem başarısız.<br>Lütfen, daha sonra tekrar deneyin.";
        lang.ERROR_HAS_OCCURRED = "Beklenmedik bir hata oluştu.";
        lang.PURCHASES_NOT_SUPPORTED = "Satın alma işlemleri:<br>Bu platform üzerinde desteklenmiyor.";

        break;

    case "en":

        // General usage
        lang.FILTER = "Filter";
        lang.ADD = "ADD";
        lang.SAVE = "SAVE";
        lang.CANCEL = "CANCEL";

        // ui.bottom-tab.js 
        lang.STATUS = "STATUS";
        lang.TRANSACTIONS = "RECEIPTS";
        lang.SETTINGS = "TOOLS";

        // status-tab-page.js
        lang.TOTAL_EXPENDITURE = "TOTAL EXPENDITURE";
        lang.BUDGET = "BUDGET";
        lang.REMAINING_BUDGET = "REMAINING BUDGET";
        lang.YOU_CANNOT_EDIT_THE_PREVIOUS_MONTHS_BUDGET = "You can't edit the previous month's budget.";
        lang.PERCENT_VALUE_FORMAT = "{value}%";

        // Category Names:
        lang.HOUSE = "HOUSE";
        lang.BILLS = "BILLS";
        lang.SHOPPING = "SHOPPING";
        lang.ENTERTAINMENT = "ENTERTAINMENT";
        lang.EATING_OUT = "EATING OUT";
        lang.CLOTHING = "CLOTHING";
        lang.CHILDREN = "CHILDREN";
        lang.TRANSPORT = "TRANSPORT";
        lang.CAR = "CAR";
        lang.FUEL = "FUEL";
        lang.PETS = "PETS";
        lang.HEALTH = "HEALTH";
        lang.HOLIDAY = "HOLIDAY";
        lang.SPORT = "SPORT";
        lang.GIFT = "GIFT";
        lang.OTHER = "OTHER";
        lang.FURNITURE = "FURNITURE";
        lang.ELECTRONIC = "ELECTRONIC";
        lang.HOBBY = "HOBBY";
        lang.LUXURY = "LUXURY";
        lang.PERSONAL_CARE = "PERSONAL CARE";
        lang.CHARITIES = "CHARITIES";
        lang.INVESTMENT = "INVESTMENT";
        lang.RED = "RED";
        lang.YELLOW = "YELLOW";
        lang.BLUE = "BLUE";

        // MONTHS NAMES:
        lang.MONTHS = [...basic.months];
        lang.TODAY_TITLE = "TODAY";
        lang.LAST_MONTH = "LAST MONTH";
        lang.X_MONTHS_AGO = "{value} MONTHS AGO";

        // edit-category-page.js
        lang.YOU_CANNOT_DISABLE_A_USED_CATEGORY = "You can't disable a used category.";

        // add-spending-view.js
        lang.DESCRIPTION = "Description";
        lang.TODAY = "TODAY";
        lang.YESTERDAY = "YESTERDAY";
        lang.EXPENDITURE_MADE = "EXPENDITURE MADE";

        // setting-tab-page.js
        lang.CATEGORIES_TITLE = "CATEGORIES";
        lang.CATEGORIES_DESCRIPTION = "Organize your spending categories.";
        lang.BUDGET_TITLE = "BUDGET";
        lang.BUDGET_DESCRIPTION = "Set your total budget for this month.";
        lang.PAYMENT_TITLE = "PAYMENT";
        lang.PAYMENT_DESCRIPTION = "Increase your current usage time.";
        lang.USERS_MANUAL_TITLE = "USER'S MANUAL";
        lang.USERS_MANUAL_DESCRIPTION = "General information about the application.";
        lang.ABOUT_TITLE = "ABOUT";
        lang.ABOUT_DESCRIPTION = "With which technologies it was developed.";
        lang.USERS_MANUAL_URL = "guide-en.htm";
        lang.ABOUT_URL = "about-en.htm";

        // edit-budget-page.js
        lang.X_BUDGET = "BUDGET {value}";

        // payment-page.js
        lang.CURRENT_USAGE_TIME = "CURRENT USAGE PERIOD:";
        lang.AVAILABLE_UNTIL_THIS_DATE = "Usable until this date.";
        lang.IT_HAS_EXPIRED = "It has expired.";
        lang.PAYMENT_DESC1 = "The package you purchase will be added<br>to your current usage period.";
        lang.PAYMENT_DESC2_ELEMENT_ID = "payment-description-en";
        lang.IOS_PAYMENT_DESC2_ELEMENT_ID = "ios-payment-description-en";
        lang.FOUR_MONTHS = "4 MONTHS";
        lang.TWELVE_MONTHS = "12 MONTHS";
        lang.OF_USE = "OF USE";
        lang.FOUR_MONTHS_PRICE = "$4";
        lang.TWELVE_MONTHS_PRICE = "$10";
        lang.TAX = "+ TAX";
        lang.CONTINUE = "CONTINUE";
        lang.ANDRODID_KEY = "goog_UQgGBSOuNpCWkmPPzLeAgdyFikt";
        lang.IOS_KEY = "";
        lang.PERIOD_HAS_BEEN_UPDATED = "Your current usage period has been updated.";
        lang.PLEASE_TRY_AGAIN_LATER = "Operation failed.<br>Please try again later.";
        lang.ERROR_HAS_OCCURRED = "An unexpected error has occurred.";
        lang.PURCHASES_NOT_SUPPORTED = "Purchases:<br>Not supported on this platform.";

        break;
        
}
