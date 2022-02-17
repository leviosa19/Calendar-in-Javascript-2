var i = 0;
function addMoreCalendar() {
    // getCalendar('calendar' + i, 'calendarBody' + i, 1900, 2030);
    var imgURL = 'https://mywildalberta.ca/images/GFX-MWA-Parks-Reservations.png';
    var inputDateId = 'fullDate' + i;
    var calendarId = 'calendar' + i;
    var calendarBodyId = 'calendarBody' + i;
    var comma = ', ';

    var html = `<div>`;
    html += `<input type="text" id="fullDate` + i + `" readonly />`;
    html += `<img id="img" onclick="getCalendar('` + inputDateId + `', '` + calendarId + `', '` + calendarBodyId + `', 1900, 2040, ` + i + `)" src="` + imgURL + `" alt = "" >`;
    html += `<div class="calendar` + i + `" id="calendar` + i + `" style="position: absolute; z-index: 1;">`;
    html += `<div id="calendarBody` + i + `"></div>`;
    html += `</div>`;
    html += `<button onclick='close()'>Close</button>`;
    html += `</div>`;
    i += 1;
    document.getElementById('calendar-body').innerHTML += html;
}