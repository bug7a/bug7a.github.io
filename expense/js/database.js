
var database = {};

database.DEFAULT_BUDGET = 2000;
database.lastUsedBudget = storage.load("data-last-used-budget");
if (database.lastUsedBudget == null) {
    database.lastUsedBudget = database.DEFAULT_BUDGET;
    storage.save("data-last-used-budget", database.lastUsedBudget);
}

// Harcamalar.
database.budgetTable = {};
database.budgetTable["m1"] = storage.load("data-budget-table-m1") || database.lastUsedBudget;
database.budgetTable["m2"] = storage.load("data-budget-table-m2") || database.lastUsedBudget;
database.budgetTable["m3"] = storage.load("data-budget-table-m3") || database.lastUsedBudget;
database.budgetTable["m4"] = storage.load("data-budget-table-m4") || database.lastUsedBudget;
database.budgetTable["m5"] = storage.load("data-budget-table-m5") || database.lastUsedBudget;
database.budgetTable["m6"] = storage.load("data-budget-table-m6") || database.lastUsedBudget;
database.budgetTable["m7"] = storage.load("data-budget-table-m7") || database.lastUsedBudget;
database.budgetTable["m8"] = storage.load("data-budget-table-m8") || database.lastUsedBudget;
database.budgetTable["m9"] = storage.load("data-budget-table-m9") || database.lastUsedBudget;
database.budgetTable["m10"] = storage.load("data-budget-table-m10") || database.lastUsedBudget;
database.budgetTable["m11"] = storage.load("data-budget-table-m11") || database.lastUsedBudget;
database.budgetTable["m12"] = storage.load("data-budget-table-m12") || database.lastUsedBudget;


// Harcamalar.
database.spendingTable = {};
database.spendingTable["m1"] =  storage.load("data-spending-table-m1") || [];
database.spendingTable["m2"] =  storage.load("data-spending-table-m2") || [];
database.spendingTable["m3"] =  storage.load("data-spending-table-m3") || [];
database.spendingTable["m4"] =  storage.load("data-spending-table-m4") || [];
database.spendingTable["m5"] =  storage.load("data-spending-table-m5") || [];
database.spendingTable["m6"] =  storage.load("data-spending-table-m6") || [];
database.spendingTable["m7"] =  storage.load("data-spending-table-m7") || [];
database.spendingTable["m8"] =  storage.load("data-spending-table-m8") || [];
database.spendingTable["m9"] =  storage.load("data-spending-table-m9") || [];
database.spendingTable["m10"] =  storage.load("data-spending-table-m10") || [];
database.spendingTable["m11"] =  storage.load("data-spending-table-m11") || [];
database.spendingTable["m12"] =  storage.load("data-spending-table-m12") || [];


// Harcama kategorileri.
// storage.save("data-category-table", [])
database.categoryTable = storage.load("data-category-table") || [];
if (database.categoryTable.length == 0) {

    database.categoryTable.push({ id: 1, name: lang.HOUSE, iconFile: "images/categories/619153.png", active: 1})
    database.categoryTable.push({ id: 2, name: lang.BILLS, iconFile: "images/categories/1558896.png", active: 1})
    database.categoryTable.push({ id: 3, name: lang.SHOPPING, iconFile: "images/categories/678546.png", active: 1})
    database.categoryTable.push({ id: 4, name: lang.ENTERTAINMENT, iconFile: "images/categories/2997154.png", active: 1})
    database.categoryTable.push({ id: 5, name: lang.EATING_OUT, iconFile: "images/categories/737967.png", active: 1})
    database.categoryTable.push({ id: 6, name: lang.CLOTHING, iconFile: "images/categories/7223203.png", active: 1})
    database.categoryTable.push({ id: 7, name: lang.CHILDREN, iconFile: "images/categories/3082060.png", active: 0})
    database.categoryTable.push({ id: 8, name: lang.TRANSPORT, iconFile: "images/categories/1358770.png", active: 1})
    database.categoryTable.push({ id: 9, name: lang.CAR, iconFile: "images/categories/2962391.png", active: 0})
    database.categoryTable.push({ id: 10, name: lang.FUEL, iconFile: "images/categories/6487308.png", active: 0})
    database.categoryTable.push({ id: 11, name: lang.PETS, iconFile: "images/categories/3737726.png", active: 0})
    database.categoryTable.push({ id: 12, name: lang.HEALTH, iconFile: "images/categories/2371353.png", active: 0})
    database.categoryTable.push({ id: 13, name: lang.HOLIDAY, iconFile: "images/categories/2918766.png", active: 1})
    database.categoryTable.push({ id: 14, name: lang.SPORT, iconFile: "images/categories/2327343.png", active: 0})
    database.categoryTable.push({ id: 15, name: lang.GIFT, iconFile: "images/categories/3176231.png", active: 0})
    database.categoryTable.push({ id: 16, name: lang.OTHER, iconFile: "images/categories/679821.png", active: 1})
    database.categoryTable.push({ id: 17, name: lang.FURNITURE, iconFile: "images/categories/1889046.png", active: 0})
    database.categoryTable.push({ id: 18, name: lang.ELECTRONIC, iconFile: "images/categories/808439.png", active: 0})
    database.categoryTable.push({ id: 19, name: lang.HOBBY, iconFile: "images/categories/628324.png", active: 1})
    database.categoryTable.push({ id: 20, name: lang.LUXURY, iconFile: "images/categories/306776.png", active: 1})
    database.categoryTable.push({ id: 21, name: lang.PERSONAL_CARE, iconFile: "images/categories/3467543.png", active: 0})
    database.categoryTable.push({ id: 22, name: lang.CHARITIES, iconFile: "images/categories/1806263.png", active: 0})
    database.categoryTable.push({ id: 23, name: lang.INVESTMENT, iconFile: "images/categories/3135706.png", active: 0})
    database.categoryTable.push({ id: 24, name: lang.RED, iconFile: "images/categories/595005.png", active: 0})
    database.categoryTable.push({ id: 25, name: lang.YELLOW, iconFile: "images/categories/5111178.png", active: 0})
    database.categoryTable.push({ id: 26, name: lang.BLUE, iconFile: "images/categories/594846.png", active: 0})

    storage.save("data-category-table", database.categoryTable);

}

database.checkForOldData = function() {

}

database.getActiveCategoryDataList = function() {

    var activeCategoryDataList = [];

    for (var i = 0; i < database.categoryTable.length; i++) {

        if (database.categoryTable[i].active == 1) {

            activeCategoryDataList.push(database.categoryTable[i]);

        }

    }

    print("database.getActiveCategoryDataList:")
    print(activeCategoryDataList)

    return activeCategoryDataList;

}

database.getCategoryDataList = function() {

    print("database.getCategoryDataList:")
    print(database.categoryTable)

    return [...database.categoryTable];

}

// getDateBarData
database.getMonthNameAndTitleDataList = function() {

    // 12 adet item olsun. 12 ayının adını ve başlığını alıyoruz.
    // Son ay: 24 Haziran şekdinde.

    var dataList = [];

    var currentIndex = date.monthNumber - 1;
    var currentYear = date.year;

    for (var i = 0; i < 12; i++) {

        var dataObject = {};

        if (i == 0) {
            dataObject.title = lang.TODAY_TITLE;
            // dataObject.title = date.gunAdi.toUpperCase();
            dataObject.name =  date.today + " " + lang.MONTHS[currentIndex];
            dataObject.day = date.today;
        } else if (i == 1) {
            dataObject.title = lang.LAST_MONTH;
            dataObject.name = lang.MONTHS[currentIndex];
            dataObject.day = 0;
        } else {
            // dataObject.title = i + " AY ÖNCE";
            dataObject.title = lang.X_MONTHS_AGO.replace("{value}", i);
            if (currentYear == date.year) {
                dataObject.name = lang.MONTHS[currentIndex];
            } else {
                dataObject.name = lang.MONTHS[currentIndex] + " " + currentYear;
            }
            dataObject.day = 0;
        }

        dataObject.year = currentYear;
        // dataObject.monthIndex = currentIndex
        dataObject.monthNumber = currentIndex + 1;

        // Bilgi girişi olmamış ise, listeye ekleme ve daha sonrasını da ekleme.
        // Ama eğer bu ay ise listeye eklenmesine izin ver.
        if (database.spendingTable["m" + dataObject.monthNumber].length == 0 && dataObject.monthNumber != date.monthNumber) {
            break;
        }

        // insert data, top of array:
        dataList.unshift(dataObject);

        currentIndex--;
        
        if (currentIndex < 0) {
            currentIndex = 11;
            currentYear--;
        }
        
    }

    /*
    var dataList = [
        { "title": "3 AY ÖNCE", "name": "Mart", "mount": "5", "day": "30", "year": "2022" },
        { "title": "2 AY ÖNCE", "name": "Nisan", "mount": "5", "day": "30", "year": "2022" },
        { "title": "GEÇEN AY", "name": "Mayıs", "mount": "5", "day": "30", "year": "2022" },
        { "title": "BU AY", "name": "24 Haziran", "mount": "5", "day": "30", "year": "2022" },
    ]
    */

    return dataList;

}

database.getStatusData = function($selectedDate) {

    // 12 ay tamamlanmış ise, yeni datalar için eskileri temizle.
    //database.deleteOldData();

    // Bu ayın bütçesi, son düzenlenen bütçeye eşit olmalı.
    //database.setBudgetFromLastEdit();

    print("*** START *** database.getStatusData:");
    print("$selectedDate:");
    print($selectedDate);

    var dataObject = {};

    dataObject.totalSpending = 0;
    dataObject.previousTotalSpending = 0;
    dataObject.budget = 0;
    dataObject.savingBudget = 0;

    print("database.spendingTable - m" + $selectedDate.monthNumber + ":");
    print(database.spendingTable["m" + $selectedDate.monthNumber]);

    // Total spending:
    for (var i = 0; i < database.spendingTable["m" + $selectedDate.monthNumber].length; i++) {
        dataObject.totalSpending += database.spendingTable["m" + $selectedDate.monthNumber][i].spending;
    }
    // NOT: Aktif olmayan kategorilere ait kayıtlar da DAHİL edilir.

    // Budget:
    // Önce bilgiyi tekrar al.
    database.budgetTable["m" + $selectedDate.monthNumber] = storage.load("data-budget-table-m" + $selectedDate.monthNumber) || database.lastUsedBudget;
    dataObject.budget = database.budgetTable["m" + $selectedDate.monthNumber];
    // NOT: Eski datalar temizlenirken, budget değeri son kaydedilen budget değeri ile güncellenir.

    // Saving budget:
    dataObject.savingBudget = dataObject.budget - dataObject.totalSpending;

    var _previousMonthNumber = $selectedDate.monthNumber;
    // var _previousYear = $selectedDate.year

    // Previous total spending:
    if ($selectedDate.monthNumber == 1) {
        _previousMonthNumber = 12;
        // _previousYear--;
    } else {
        _previousMonthNumber--;
    }

    print("$selectedDate.index: " + $selectedDate.index + " (0 ise ilk dönem.)")
    // Eğer bu kayıt edilen ilk ay ise, önceki ayın verilerini ALMA:
    if ($selectedDate.index != 0) {
        for (var i = 0; i < database.spendingTable["m" + _previousMonthNumber].length; i++) {
            if (database.spendingTable["m" + _previousMonthNumber][i].day <= $selectedDate.day || $selectedDate.day == 0) {
                dataObject.previousTotalSpending += database.spendingTable["m" + _previousMonthNumber][i].spending;
            }
            // NOT: Ay daha bitmemiş ise, hesaplamalar bu güne kadar yapılır. Örnek: 15 haziran için 15 mayısa kadarki eski veriler hesaplanır.
        }
    }

    // Category based spending:
    dataObject.categoryBasedSpendingDataList = [];

    // Category based total spending:
    var _categoryBasedTotalSpendingDataObject = {};

    for (var i = 0; i < database.spendingTable["m" + $selectedDate.monthNumber].length; i++) {

        var _spending = database.spendingTable["m" + $selectedDate.monthNumber][i].spending;
        var _categoryId = database.spendingTable["m" + $selectedDate.monthNumber][i].categoryId;

        // İlk kayıt eklenmeden önce, 0 değerine ayarla.
        if(!_categoryBasedTotalSpendingDataObject["c" + _categoryId]) {
            _categoryBasedTotalSpendingDataObject["c" + _categoryId] = 0;
        }

        _categoryBasedTotalSpendingDataObject["c" + _categoryId] += _spending;

    }

    print("_categoryBasedTotalSpendingDataObject:");
    print(_categoryBasedTotalSpendingDataObject);

    // previous category based total spending:
    var _previousCategoryBasedTotalSpendingDataObject = {};

    for (var i = 0; i < database.spendingTable["m" + _previousMonthNumber].length; i++) {

        var _spending = database.spendingTable["m" + _previousMonthNumber][i].spending;
        var _categoryId = database.spendingTable["m" + _previousMonthNumber][i].categoryId;

        // If not spending for this category yet, set as 0:
        if(!_previousCategoryBasedTotalSpendingDataObject["c" + _categoryId]) {
            _previousCategoryBasedTotalSpendingDataObject["c" + _categoryId] = 0;
        }

        // Just calculate if the day is less than or equal to the selected day.
        if ($selectedDate.index != 0) {
            if (database.spendingTable["m" + _previousMonthNumber][i].day <= $selectedDate.day || $selectedDate.day == 0) {       
                _previousCategoryBasedTotalSpendingDataObject["c" + _categoryId] += _spending;
            }
        }

    }

    print("_previousCategoryBasedTotalSpendingDataObject:");
    print(_previousCategoryBasedTotalSpendingDataObject);

    // Category based spending:
    for (var i = 0; i < database.categoryTable.length; i++) {

        var _categoryId = database.categoryTable[i].id;

        var categoryBasedSpendingDataItem = {};
        categoryBasedSpendingDataItem.categoryId = _categoryId;
        categoryBasedSpendingDataItem.totalSpending = _categoryBasedTotalSpendingDataObject["c" + _categoryId] || 0;
        categoryBasedSpendingDataItem.previousTotalSpending = _previousCategoryBasedTotalSpendingDataObject["c" + _categoryId] || 0;

        dataObject.categoryBasedSpendingDataList.push(categoryBasedSpendingDataItem);

    }

    print("*** END *** statusData:");
    print(dataObject);

    return dataObject;
    
}

database.check = function() {

        // 12 ay tamamlanmış ise, yeni datalar için eskileri temizle.
        database.deleteOldData();

        // Bu ayın bütçesi, son düzenlenen bütçeye eşit olmalı.
        database.setBudgetFromLastEdit();

}

// if Bu ayın ilk kaydı bu yıla ait değil ise, bu ayın eski yıl kayıtlarını temizle.
database.deleteOldData = function() {

    var _lastSpendingDataList = database.spendingTable["m" + date.monthNumber];

    if (_lastSpendingDataList.length > 0) {
        if (_lastSpendingDataList[0].year < date.year) {

            print("*** database.deleteOldData:");
            print(database.spendingTable["m" + date.monthNumber]);

            database.spendingTable["m" + date.monthNumber] = [];
            // database.budgetTable["m" + date.monthNumber] = database.lastUsedBudget;

            storage.save("data-spending-table-m" + date.monthNumber, []);
            // storage.save("data-budget-table-m" + date.monthNumber, database.lastUsedBudget);

                // Eğer uygulama uzun süre açılmamış ise, bir önceki ayın bilgileri de eski olabilir.
                var _previousMonthNumber = date.monthNumber - 1;
                var _previousYear = date.year;
                if (_previousMonthNumber == 0) {
                    _previousMonthNumber = 12;
                    _previousYear--;
                }

                var _prevLastSpendingDataList = database.spendingTable["m" + _previousMonthNumber];

                if (_prevLastSpendingDataList.length > 0) {
                    if (_prevLastSpendingDataList[0].year < _previousYear) {

                        print("Bir önceki ay da silindi:");
                        print(database.spendingTable["m" + _previousMonthNumber]);

                        database.spendingTable["m" + _previousMonthNumber] = [];
                        storage.save("data-spending-table-m" + _previousMonthNumber, []);

                        storage.save("data-budget-table-m" + _previousMonthNumber, database.lastUsedBudget);
                        database.budgetTable["m" + _previousMonthNumber] = database.lastUsedBudget;

                    }
                }

            //shared.refreshPeriodBar();

        }
    }

    // TODO: Eğer uygulama bir aydan fazla kullanılmaz ise, bu ayki eski datalar silinirken; bir önceki ayın dataları silinemeyecektir.
}

database.setBudgetFromLastEdit = function() {

    var _budget = storage.load("data-budget-table-m" + date.monthNumber);
    
    if (_budget != database.lastUsedBudget) {

        print("database.setBudgetFromLastEdit:");
        print("Budget: " + date.monthNumber + " : " + database.lastUsedBudget);

        storage.save("data-budget-table-m" + date.monthNumber, database.lastUsedBudget);
        database.budgetTable["m" + date.monthNumber] = database.lastUsedBudget;
        
    }   

}

database.insertSpending = function($categoryId, $spending, $description, $monthNumber, $year, $day) {

    var _spendingData = {};

    _spendingData.recordId = date.now;
    _spendingData.categoryId = $categoryId;
    _spendingData.spending = $spending;
    _spendingData.description = $description || "";
    _spendingData.monthNumber = $monthNumber || date.monthNumber;
    _spendingData.year = $year || date.year;
    _spendingData.day = $day || date.today;

    database.spendingTable["m" + $monthNumber].push(_spendingData);
    storage.save("data-spending-table-m" + $monthNumber, database.spendingTable["m" + $monthNumber]);

}

database.updateSpendingByRecordId = function($oldMonthNumber, $recordId, $categoryId, $spending, $description, $monthNumber, $year, $day) {

    database.insertSpending($categoryId, $spending, $description, $monthNumber, $year, $day);
    database.deleteSpendingByRecordId($oldMonthNumber, $recordId);

}

database.deleteSpendingByRecordId = function($oldMonthNumber, $recordId) {

    var _spendingTable = database.spendingTable["m" + $oldMonthNumber];
    var _recordIndex = -1;

    for (var i = 0; i < _spendingTable.length; i++) {   
        if (_spendingTable[i].recordId == $recordId) {
            _recordIndex = i;
            break;
        }
    }

    if (_recordIndex != -1) {
        _spendingTable.splice(_recordIndex, 1);
        storage.save("data-spending-table-m" + $oldMonthNumber, _spendingTable);
    }

    return _spendingTable.length;

}

database.getTransactioData = function($selectedDate) {

    print("*** START *** database.getTransactioData:");
    var dataList = [];

    var _selectedSpendingTable = database.spendingTable["m" + $selectedDate.monthNumber];
    print("database.spendingTable -- m" + $selectedDate.monthNumber);
    print(_selectedSpendingTable);

    // { title:"Broccoli", desc:"Vegetable", iconFile:"images/fruids/brokoli.png", searchText: "Broccoli Vegetable", spending: 100, categoryIndex: 1, monthNumber: 1, day: 1 }

    for (var i = 31; i >= 1; i--) {

        var _titleDataItem = {};
        _titleDataItem.type = "title";
        _titleDataItem.title = i + " " + lang.MONTHS[$selectedDate.monthNumber - 1];
        _titleDataItem.searchText = "*";

        var _dataItemList = [];
        var _totalSpending = 0;

        for (var j = _selectedSpendingTable.length - 1; j >= 0; j--) {

            var _dataItem = {};
            _dataItem.type = "item";

            if (_selectedSpendingTable[j].day == i) {

                _dataItem.title = database.categoryTable[_selectedSpendingTable[j].categoryId - 1].name;
                _dataItem.iconFile = database.categoryTable[_selectedSpendingTable[j].categoryId - 1].iconFile;
                _dataItem.spending = _selectedSpendingTable[j].spending;
                _dataItem.desc = _selectedSpendingTable[j].description;
                _dataItem.searchText = database.categoryTable[_selectedSpendingTable[j].categoryId - 1].name + " " + _dataItem.desc;
                _dataItem.recordId = _selectedSpendingTable[j].recordId;
                _dataItem.categoryId = _selectedSpendingTable[j].categoryId;
                _dataItem.monthNumber = _selectedSpendingTable[j].monthNumber;
                _dataItem.year = _selectedSpendingTable[j].year;
                _dataItem.day = _selectedSpendingTable[j].day;
                _dataItem.isActiveCategory = database.categoryTable[_selectedSpendingTable[j].categoryId - 1].active;

                _totalSpending += _selectedSpendingTable[j].spending;

                _dataItemList.push(_dataItem);

            }

        }

        if (_dataItemList.length > 0) {
            _titleDataItem.spending = _totalSpending;
            dataList.push(_titleDataItem);
            
            for (var k = 0; k < _dataItemList.length; k++) {
                dataList.push(_dataItemList[k]);
            }
        }

    }

    print("*** END *** transactioData:");
    print(dataList);

    return dataList;
}



database.addTestData = function($limit = 100) {

    for (var j = 1; j <= 12; j++) {

        database.budgetTable["m" + j] = random(4000, 10000);

    }

    for(var i = 0; i < $limit; i++) {

        setTimeout(function() {

            var _monthNumber = random(1, 12);
            var _categoryId = random(1, 20);

            var isOkay = 0;
            for (var j = 0; j < database.categoryTable.length; j++) {

                if (database.categoryTable[j].id == _categoryId) {
                    if (database.categoryTable[j].active == 1) {
                        isOkay = 1;
                    }
                    break;
                }

            }

            if (isOkay == 1) {

                database.insertSpending(_categoryId,
                    random(10, 400),
                    "Otomatik eklenmiş kayıt.",
                    _monthNumber,
                    2022,
                    random(1, 28));

            }

        }, i)

    }

    // Delete old data test:
    // database.spendingTable["m" + date.monthNumber][0].year = date.year - 1;

}