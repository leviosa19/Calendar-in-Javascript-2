
/*
 * Created By: Rushikesh Jade
 * Description: This js file has the calendar functionality but can only used for Security --> User
 */


// calendar functionality start
var monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var cal;
var mon;
var yeear;

// main calendar funciton
var Calendar = function (divId, disaplyDateId, nDaysPlus) {

    // store id to display calendar popup
    this.divId = divId;

    // store id of input field to display selected date
    this.disaplyDateId = disaplyDateId;

    // get number of days from current date
    this.nDaysPlus = parseInt(nDaysPlus) ? parseInt(nDaysPlus) : 180;

    // days of week, starting from Sunday
    this.DaysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    // nDays+current date
    this.nDaysPlusDate = new Date(new Date().setDate(new Date().getDate() + this.nDaysPlus));

    // get months only in range of current date to current date+180 days
    this.Months = []

    // get total number of months from current date to end date
    this.totalMonthsInRange = 0;
    var d1 = new Date()
    this.totalMonthsInRange = (this.nDaysPlusDate.getFullYear() - d1.getFullYear()) * 12;
    this.totalMonthsInRange -= d1.getMonth();
    this.totalMonthsInRange += this.nDaysPlusDate.getMonth();

    // add months with year ( format: July 2022 )
    for (let i = 0; i <= this.totalMonthsInRange; i++) {
        this.Months.push({
            "key": i,
            "value": monthArray[new Date(new Date().setMonth(new Date().getMonth() + i)).getMonth()] + " " + new Date(new Date().setMonth(new Date().getMonth() + i)).getFullYear()
        })
    }

    // set date, month, year
    var d = new Date();
    this.defaultSelectedDate = document.getElementById(this.disaplyDateId).value;
    this.dateArray = getDateArray(this.defaultSelectedDate);

    // check for default date
    if (new Date(this.defaultSelectedDate).getTime() < new Date().getTime() || new Date(this.defaultSelectedDate).getTime() > this.nDaysPlusDate.getTime()) {
        this.currDay = d.getDate();
        this.currentMonth = d.getMonth();
        this.currentYear = d.getFullYear();
    }
    else if (this.defaultSelectedDate !== '') {
        this.currDay = this.dateArray[0];
        this.currentMonth = this.dateArray[1]
        this.currentYear = this.dateArray[2];
    }
    else {
        this.currDay = d.getDate();
        this.currentMonth = d.getMonth();
        this.currentYear = d.getFullYear();
    }
};

// next month button function
Calendar.prototype.nextMonth = function () {
    this.currentMonth = this.currentMonth + 1;
    this.showcurr();
};

// previous month button function
Calendar.prototype.previousMonth = function () {
    this.currentMonth = this.currentMonth - 1;
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

    newDate = new Date(this.dateArray[2], this.dateArray[1]);

    var firstDayOfMonth = new Date(y, m, 1).getDay()
    var lastDateOfMonth = new Date(y, m + 1, 0).getDate()
    var lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();

    var html = '<table id="calTable1">';

    html += '<tr>';
    // select box for months
    html += '<td colspan="5">';
    html += '<div class="firstTD">';
    html += '<select id="selectedMonth" onchange="getMonthAndYear()" >';
    for (var i = 0; i < this.Months.length; i++) {
        html += '<option';
        html += (this.Months[i].value.indexOf(monthArray[new Date(y, m).getMonth()]) != -1) ? ' selected ' : '';
        html += ' value = "' + this.Months[i].value + '" > ' + this.Months[i].value + '</option > ';
    }
    html += '</select>';
    html += '</div>';
    html += '</td>';

    // previous month and next month button
    html += '<td >';
    html += (this.Months[0].value.indexOf(monthArray[new Date(y, m).getMonth()]) != -1) ?
        '<p style="cursor: no-drop; color: #c0c0c0">&#8672;</p>' :
        '<button id="btnPrev" onclick="prevMonth()">&#8672;</button>';
    html += '</td>';
    html += '<td >';
    html += (this.Months[this.Months.length - 1].value.indexOf(monthArray[new Date(y, m).getMonth()]) != -1) ?
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
        // get total number of months from current date to end date
        console.log(y)
        if ((i == this.dateArray[0]) && (m == newDate.getMonth()) && (y == this.dateArray[2])) {
            html += '<td class="normal selectedDate" onclick="getFullDate(' + i + ')">' + i + '</td>';
        }
        else if (i < new Date().getDate() && m == new Date().getMonth()) {
            html += '<td class="not-current"">' + i + '</td>';
        }
        else if (i > this.nDaysPlusDate.getDate() && (this.Months[this.Months.length - 1].value.indexOf(monthArray[new Date(y, m).getMonth()]) != -1)) {
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
    const completeDate = (i < 10 ? ('0' + i) : i) + '' + monthArray[new Date(yeear, mon - 1).getMonth()].slice(0, 3) + '' + new Date(yeear, mon - 1).getFullYear();

    document.getElementById(cal.disaplyDateId).value = completeDate;
    document.getElementById(cal.divId).style.display = 'none';
}

// Get selected month and year and update calendar
function getMonthAndYear() {
    var selectedMonthYear = document.getElementById('selectedMonth').value;
    for (let i = 0; i < cal.Months.length; i++) {
        if (cal.Months[i].value == selectedMonthYear) {
            var x = new Date(new Date().setMonth(new Date().getMonth() + cal.Months[i].key));
            cal.currentMonth = x.getMonth()
            cal.currentYear = x.getFullYear()
        }
    }
    cal.showMonth(cal.currentYear, cal.currentMonth);
}

// Previous month
function prevMonth() {
    cal.previousMonth();
}

// Next month
function nextMonth() {
    cal.nextMonth();
}

// Clear date
function clearDate() {
    document.getElementById(cal.disaplyDateId).value = '';
    document.getElementById(cal.divId).style.display = 'none';
}

// Get Today's date
function getTodayDate() {
    var d = new Date();
    document.getElementById(cal.disaplyDateId).value = (d.getDate() < 10 ? ('0' + d.getDate()) : d.getDate()) + '' + (monthArray[d.getMonth()].slice(0, 3)) + '' + d.getFullYear();
    document.getElementById(cal.divId).style.display = 'none';
}

// converts date(01Feb2022) into array ([01, 2, 2022])
function getDateArray(d) {
    var date, month, year;
    if (d) {
        date = d.slice(0, 2);
        month = (d.slice(2, 5) == "Jan") ? 0 :
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

        year = d.slice(5, 9);
    }
    else {
        date = new Date().getDate();
        month = new Date().getMonth();
        year = new Date().getFullYear();
    }
    return [parseInt(date), parseInt(month), parseInt(year)];
}

// Main Function
function getCalendar(id1, disaplyDateId, nDaysPlus) {
    cal = new Calendar(id1, disaplyDateId, nDaysPlus);
    cal.showcurr();
    document.getElementById(id1).style.display = "block";
}
