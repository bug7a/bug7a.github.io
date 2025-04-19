var usageLimit = {};

/* 16 Haziran 2022 - Tarihine kadar tam kullanım. */
usageLimit.lastUsableTime = storage.load("data-last-usable-time");
// var usageLimit.lastUsableTime = null;
 
usageLimit.checkForFirstRun = function() {

    if (usageLimit.lastUsableTime == null) {

        usageLimit.lastUsableTime = {
            "day" : date.today,
            "monthNumber": date.monthNumber,
            "year": date.year,
        }

        storage.save("data-last-usable-time", usageLimit.lastUsableTime);
        print("Started date:");
        print(usageLimit.lastUsableTime);

        // İlk açılış için, 4 ay kullanım ver.
        usageLimit.addTimeAsMonth(4);

    }

}

usageLimit.isTimeLeft = function() {

    var _result = 0;

    if (usageLimit.lastUsableTime.year > date.year) {
        _result = 1;
    } else if (usageLimit.lastUsableTime.year == date.year && usageLimit.lastUsableTime.monthNumber > date.monthNumber) {
        _result = 1;
    } else if (usageLimit.lastUsableTime.year == date.year && usageLimit.lastUsableTime.monthNumber == date.monthNumber && usageLimit.lastUsableTime.day >= date.today) {
        _result = 1;
    } else {
        _result = 0;
    }

    print("Last usage date: " + usageLimit.getLastUsableTimeFullString());

    return _result;

}

usageLimit.getLastUsableTimeFullString = function() {

    var _result = "";
    _result = twoDigitFormat(usageLimit.lastUsableTime.day) + " " + lang.MONTHS[usageLimit.lastUsableTime.monthNumber - 1] + " " + usageLimit.lastUsableTime.year;

    return _result;
    
}

usageLimit.addTimeAsMonth = function($mountCount = 1) {

    var _day = 0;
    var _monthNumber = 0;
    var _year = 0;

    if (usageLimit.isTimeLeft()) {
        _day = usageLimit.lastUsableTime.day;
        _monthNumber = usageLimit.lastUsableTime.monthNumber;
        _year = usageLimit.lastUsableTime.year;
    
    } else {
        _day = date.today;
        _monthNumber = date.monthNumber;
        _year = date.year;
    }

    if (_day > 28) {
        _day = 1;
        $mountCount++;
    }

    for (var i = 0; i < $mountCount; i++) {

        if (_monthNumber == 12) {
            _monthNumber = 1;
            _year++;
        } else {
            _monthNumber++;
        }

    }

    usageLimit.lastUsableTime.day = _day;
    usageLimit.lastUsableTime.monthNumber = _monthNumber;
    usageLimit.lastUsableTime.year = _year;

    storage.save("data-last-usable-time", usageLimit.lastUsableTime);

    print("usageLimit.addTimeAsMonth:");
    print(usageLimit.lastUsableTime);

}