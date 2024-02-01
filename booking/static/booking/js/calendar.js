let calendarArrows = document.querySelectorAll(".calendar .arrow");

let container = document.querySelector(".calendar .month_days");
let headerMonth = document.querySelector(".calendar .month h1");
let cell = 0;
const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let thisMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let thisYear = currentDate.getFullYear();



createCalendar(currentYear, currentMonth);

calendarArrows.forEach(calendarArrow => {
    calendarArrow.addEventListener("click", (e) => {
        e.preventDefault();
        blockBookingAudience.innerHTML = `
            <div class="audience_none_cells">
                <h1>Выберите нужную вам дату</h1>
            </div>
        `;

        if(calendarArrow.classList.contains("button_next_month")){
            if(currentMonth === 11){
                currentMonth = 0;
                currentYear++;
            } else{
                currentMonth++;
            }
        } else{
            if(currentMonth === 0){
                currentMonth = 11;
                currentYear--;
            } else{
                currentMonth--;
            }
        }

        if(thisYear === currentYear){
            calendarArrow.closest(".calendar").querySelector(".month .year").innerText = "";
        } else{
            calendarArrow.closest(".calendar").querySelector(".month .year").innerText = currentYear;
        }

        container.innerHTML = "";
        cell = 0;
        createCalendar(currentYear, currentMonth);
        buttonsOpenAudience = document.querySelectorAll("#button_open_audience");
        openAudience();
    });
});



function createCalendar(year, month){
    headerMonth.innerText = months[month];

    let day = new Date(year, month);

    let table = `
        <table>
            <tr class="week">
                <th>Пн</th>
                <th>Вт</th>
                <th>Ср</th>
                <th>Чт</th>
                <th>Пт</th>
                <th>Сб</th>
            </tr>
            <tr>
    `;

    let prevMonthDay = new Date(year, month);
    prevMonthDay.setHours(-1);

    for(let i = 0; i < getDay(day); i++){
        cell += 1;
        table += `<td class="another_month">` + (prevMonthDay.getDate() - getDay(day) + 1 + i) + `</td>`;
    }
    
    while(day.getMonth() === month){
        if(getDay(day) != 6){
            if(thisYear < year){
                table += `<td id="button_open_audience">` + day.getDate() + `</td>`;
            } else if(thisMonth <= month && thisYear === year){
                table += `<td id="button_open_audience">` + day.getDate() + `</td>`;
            } else{
                table += `<td class="another_month">` + day.getDate() + `</td>`;
            }

            cell += 1;
        } else {
            table += `</tr><tr>`;
        }

        day.setDate(day.getDate() + 1);
    }

    while(cell < 37){
        cell += 1;

        if(getDay(day) != 6){
            table += `<td class="another_month">` + day.getDate() + `</td>`;
        } else {
            table += `</tr><tr>`;
        }

        day.setDate(day.getDate() + 1);
    }

    table += `</tr></table>`;
    container.innerHTML = table;
}

function getDay(date){
    let day = date.getDay();
    if(day == 0) day = 7;
    return day - 1;
}