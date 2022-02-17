
// calendar functionality start

var monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var cal;
var mon;
var yeear;

// main calendar funciton
var Calendar = function (divId, disaplyDateId, nDaysPlus) {

    this.nDaysPlus = nDaysPlus;

    // store id to display calendar popup
    this.divId = divId;

    // store id of input field to display selected date
    this.disaplyDateId = disaplyDateId;

    // days of week, starting from Sunday
    this.DaysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    // get months only in range of current date to current date+180 days
    this.Months = []
    for (let i = new Date("11Aug2022").getMonth(); i <= new Date(new Date("11Aug2022").setDate(new Date("11Aug2022").getDate() + this.nDaysPlus)).getMonth(); i++) {
        this.Months.push(monthArray[i])
    }

    // start year and end year (for year range)
    this.startYear = new Date("11Aug2022").getFullYear();
    this.endYear = new Date(new Date("11Aug2022").setDate(new Date("11Aug2022").getDate() + this.nDaysPlus)).getFullYear();

    // get years only in range of current date to current date+180 days
    this.yearArray = [];
    for (let i = this.startYear; i <= this.endYear; i++) {
        this.yearArray.push(i);
    }

    // set date, month, year
    var d = new Date("11Aug2022");
    this.defaultSelectedDate = document.getElementById(this.disaplyDateId).value;
    var defaultSelectedMonth =  this.defaultSelectedDate.slice(2, 5);
    this.cuMon = (defaultSelectedMonth === "Jan") ? 1 :
        ((defaultSelectedMonth === "Feb" ? 2 :
            ((defaultSelectedMonth === "Mar") ? 3 :
                ((defaultSelectedMonth === "Apr") ? 4 :
                    ((defaultSelectedMonth === "May") ? 5 :
                        ((defaultSelectedMonth === "Jun") ? 6 :
                            ((defaultSelectedMonth === "Jul") ? 7 :
                                ((defaultSelectedMonth === "Aug") ? 8 :
                                    ((defaultSelectedMonth === "Sep") ? 9 :
                                        ((defaultSelectedMonth === "Oct") ? 10 :
                                            ((defaultSelectedMonth === "Nov") ? 11 :
                                                ((defaultSelectedMonth === "Dec") ? 12 : 0))))))))))));
    this.selectedDate = [parseInt(this.defaultSelectedDate.slice(0, 2)), this.cuMon, parseInt(this.defaultSelectedDate.slice(5, 9))];
    console.log(d.getMonth())

    // check for default date
    if (this.defaultSelectedDate !== '') {
        this.currDay = this.selectedDate[0];
        this.currentMonth = this.selectedDate[1] - 1;
        this.currentYear = this.selectedDate[2];
    }
    else {
        this.currentMonth = d.getMonth();
        this.currentYear = d.getFullYear();
        this.currDay = d.getDate();
    }
};

// next month button function
Calendar.prototype.nextMonth = function () {
    if (this.currentMonth == this.Months.length) {
        this.currentMonth = new Date("11Aug2022").getMonth();
    }
    else {
        this.currentMonth = this.currentMonth + 1;
    }
    this.showcurr();
};

// previous month button function
Calendar.prototype.previousMonth = function () {
    if (this.currentMonth == new Date("11Aug2022").getMonth()) {
        this.currentMonth = this.Months.length;
    }
    else {
        this.currentMonth = this.currentMonth - 1;
    }
    this.showcurr();
};

// show current month
Calendar.prototype.showcurr = function () {
    this.showMonth(this.currentYear, this.currentMonth);
}

// show month in table
Calendar.prototype.showMonth = function (y, m) {
    mon = m + 1;
    yeear = y;

    var firstDayOfMonth = new Date(y, m, 1).getDay()
    var lastDateOfMonth = new Date(y, m + 1, 0).getDate()
    var lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();

    var html = '<table id="calTable1">';

    html += '<tr>';
    // select box for months
    html += '<td colspan="5">';
    html += '<div class="firstTD">';
    html += '<select id="selectedMonth" onchange="getMonthAndYear()">';
    for (var i = 0; i < this.Months.length; i++) {
        html += '<option';
        html += (i == m-1) ? ' selected ' : '';
        html += ' value = "' + this.Months[i] + '" > ' + this.Months[i] + '</option > ';
    }
    html += '</select>';
    // select box for year
    html += '<select id="selectedYear" onchange="getMonthAndYear()">';
    for (var i = 0; i < this.yearArray.length; i++) {
        html += '<option';
        html += (this.yearArray[i] == y) ? ' selected ' : '';
        html += ' value = "' + this.yearArray[i] + '" > ' + this.yearArray[i] + '</option > ';
    }
    html += '</select>';
    html += '</div>';
    html += '</td>';
    // previous month and next month button
    html += '<td >';
    html += (this.currentMonth == new Date("11Aug2022").getMonth()) ?
        '<p style="cursor: no-drop; color: #c0c0c0">&#8672;</p>' :
        '<button id="btnPrev" onclick="prevMonth()">&#8672;</button>';
    html += '</td>';
    html += '<td >';
    html += (this.currentMonth == new Date(new Date("11Aug2022").setDate(new Date("11Aug2022").getDate() + this.nDaysPlus)).getMonth()) ?
        '<p style="cursor: no-drop; color: #c0c0c0">&#8674;</p>' :
        '<button id="btnNext" onclick="nextMonth()">&#8674;</button>';
    html += '</td>';
    html += '</tr>';

    // print days of the week
    html += '<tr class="days r">';
    for (var i = 0; i < this.DaysOfWeek.length; i++) {
        html += '<td>' + this.DaysOfWeek[i] + '</td>';
    }
    html += '</tr>';

    // print days
    var i = 1;
    var datePlusN = new Date(new Date("11Aug2022").setDate(new Date("11Aug2022").getDate() + this.nDaysPlus));
    var datePlusNDate = datePlusN.getDate();
    var datePlusNDaysMonth = datePlusN.getMonth() + 1;
    var datePlusNDaysYear = datePlusN.getFullYear();

    do {
        var dow = new Date(y, m, i).getDay();

        // sunday, start new row
        if (dow == 0) {
            html += '<tr class="r">';
        }
        // it will write the last days from the previous month
        else if (i == 1) {
            html += '<tr class="r">';
            var k = lastDayOfLastMonth - firstDayOfMonth + 1;
            for (var j = 0; j < firstDayOfMonth; j++) {
                html += '<td class=""></td>';
                k++;
            }
        }

        // print the current day in the loop
        if (i == this.selectedDate[0] && mon == this.selectedDate[1] && yeear == this.selectedDate[2]) {
            html += '<td class="normal selectedDate" onclick="getFullDate(' + i + ')">' + i + '</td>';
        }
        else if (i < new Date("11Aug2022").getDate() && mon == new Date("11Aug2022").getMonth() + 1 || mon < new Date("11Aug2022").getMonth() + 1) {
            html += '<td class="not-current"">' + i + '</td>';
        }
        else if (i > datePlusNDate && mon == datePlusNDaysMonth && yeear == datePlusNDaysYear) {
            html += '<td class="not-current"">' + i + '</td>';
        }
        else {
            html += '<td class="normal" onclick="getFullDate(' + i + ')">' + i + '</td>';
        }

        // saturday, closes the row
        if (dow == 6) {
            html += '</tr>';
        }
        // it will write the next few days from the next month
        else if (i == lastDateOfMonth) {
            var k = 1;
            for (dow; dow < 6; dow++) {
                html += '<td class=""></td>';
                k++;
            }
        }

        i++;
    } while (i <= lastDateOfMonth);

    // clear and today button
    html += '<tr>';
    html += '<td colspan="4" class="bottomButtons" onclick="clearDate()">CLEAR</td>';
    html += '<td colspan="3" class="bottomButtons" onclick="getTodayDate()">TODAY</td>';
    html += '</tr>';

    // closes table
    html += '</table>';

    // write HTML to the div
    document.getElementById(this.divId).innerHTML = html;
};


// Get full date in format (ddMMMYYYY) (09Feb2022)
function getFullDate(i) {
    const completeDate = (i < 10 ? ('0' + i) : i) + '' + this.monthArray[mon-1].slice(0, 3) + '' + yeear;
    document.getElementById(cal.disaplyDateId).value = completeDate;
    document.getElementById(cal.divId).style.display = 'none';
}

// Get selected month and year and update calendar
function getMonthAndYear() {
    var selectedMonth = document.getElementById('selectedMonth').value;
    cal.currentMonth = monthArray.indexOf(selectedMonth);
    var selectedYear = document.getElementById('selectedYear').value;
    cal.currentYear = selectedYear;

    mon = cal.currentMonth;
    yeear = cal.currentYear;
    cal.showMonth(cal.currentYear, cal.currentMonth);
}

// Previous month
function prevMonth() {
    if (cal.currentMonth == 0 && cal.currentYear == cal.yearArray[0]) {
        document.getElementById('btnPrev').disabled = true;
        document.getElementById('btnPrev').style.cursor = 'not-allowed';
    }
    else {
        cal.previousMonth();
    }
}

// Next month
function nextMonth() {
    if (cal.currentMonth == 11 && cal.currentYear == cal.yearArray[cal.yearArray.length - 1]) {
        document.getElementById('btnNext').disabled = true;
        document.getElementById('btnNext').style.cursor = 'not-allowed';
    }
    else {
        cal.nextMonth();
    }
}

// Clear date
function clearDate() {
    document.getElementById(cal.disaplyDateId).value = '';
    document.getElementById(cal.divId).style.display = 'none';
}

// Get Today's date
function getTodayDate() {
    var d = new Date("11Aug2022");
    document.getElementById(cal.disaplyDateId).value = (d.getDate() < 10 ? ('0' + d.getDate()) : d.getDate()) + '' + (monthArray[d.getMonth()].slice(0, 3)) + '' + d.getFullYear();
    document.getElementById(cal.divId).style.display = 'none';
}

// Main Function
function getCalendar(id1, disaplyDateId, nDaysPlus) {
    cal = new Calendar(id1, disaplyDateId, nDaysPlus);
    var d = document.getElementById(disaplyDateId).value;
    if (d) {
        cal.currDay = d.slice(0, 2);
        cal.currentMonth = (d.slice(2, 5) == "Jan") ? 0 :
            ((d.slice(2, 5) == "Feb" ? 1 :
                ((d.slice(2, 5) == "Mar") ? 2 :
                    ((d.slice(2, 5) == "Apr") ? 3 :
                        ((d.slice(2, 5) == "May") ? 4 :
                            ((d.slice(2, 5) == "Jun") ? 5 :
                                ((d.slice(2, 5) == "Jul") ? 6 :
                                    ((d.slice(2, 5) == "Aug") ? 7 :
                                        ((d.slice(2, 5) == "Sep") ? 8 :
                                            ((d.slice(2, 5) == "Oct") ? 9 :
                                                ((d.slice(2, 5) == "Nov") ? 10 :
                                                    ((d.slice(2, 5) == "Dec") ? 11 : 0))))))))))));
        
        cal.currentYear = d.slice(5, 9);
    }
    cal.showcurr();
    document.getElementById(id1).style.display = "block";

}
