let buttonsOpenAudience = document.querySelectorAll("#button_open_audience");
let blockBookingAudience = document.querySelector("main .booking_audience");
let date;

let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

let audiences = ``;

let popupQuestionHtml = ``;
let popupQuestion;
let popupQuestionContent;
let buttonClosePopupQuestion;


openAudience();



function openAudience(){
    buttonsOpenAudience.forEach(buttonOpenAudience => {
        buttonOpenAudience.addEventListener("click", () => {
            if(!buttonOpenAudience.classList.contains("another_month")){
                openAudienceRemoveClass();
                buttonOpenAudience.classList.add("_active");

                audiences = ``;
                date = String(currentYear + '-' + (currentMonth + 1) + '-' + buttonOpenAudience.innerText);
        
                $.ajax({
                    url: `date-selection/`,
                    type: 'post',
                    headers: {'X-CSRFToken': csrfToken},
                    data: {date: date},
                    success: function(request){
                        let roomSlots = request.room_slots;
                        for (let roomNumber in roomSlots) {
                            let room = roomSlots[roomNumber];
                          
                            audiences += `
                                <div class="audience_cells">
                                    <h1 class="audience_nubmer">D${roomNumber}</h1>
                            `;
                          
                            for (let timeRange in room) {
                              let roomFree = room[timeRange];
                              let classRoomFree = roomFree ? "_free" : "";
                          
                              audiences += `<a href="" class="audience_cell ${classRoomFree}">${timeRange}</a>`;
                            }
                          
                            audiences += `</div>`;
                        }
    
                        blockBookingAudience.innerHTML = audiences;
                        bookingAudience();                        
                    },
                    error: function() {
                        popupTooltipOpen("Что-то пошло не так. Пожалуйста попробуйте еще раз", true);
                    }
                });
            }
        });
    });
};

function bookingAudience(){
    let buttonsBookingAudience = blockBookingAudience.querySelectorAll(".audience_cell")
    buttonsBookingAudience.forEach(buttonBookingAudience => {
        buttonBookingAudience.addEventListener("click", (e) => {
            e.preventDefault();

            if(buttonBookingAudience.classList.contains("_free")){
                let buttonBookingAudienceHeader = buttonBookingAudience.closest(".audience_cells").querySelector(".audience_nubmer").innerText;
                let buttonBookingAudienceText = buttonBookingAudience.innerText

                popupQuestionHtml = `
                    <div class="popup_question">
                        <div class="popup__body">
                            <div class="popup__content">
                                <div class="popup__close">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.8981 15.982L24.9261 23.0164C25.446 23.5367 25.4456 24.38 24.9253 24.8999C24.405 25.4197 23.5617 25.4194 23.0418 24.899L16.0133 17.8641L8.9684 24.8985C8.44791 25.4182 7.60465 25.4176 7.08493 24.8971C6.56522 24.3766 6.56584 23.5333 7.08633 23.0136L14.1306 15.9798L7.0893 8.93205C6.56943 8.41171 6.56981 7.56846 7.09015 7.04859C7.61049 6.52872 8.45374 6.5291 8.97361 7.04944L16.0155 14.0977L23.0421 7.08157C23.5626 6.56185 24.4058 6.56248 24.9255 7.08297C25.4453 7.60346 25.4446 8.44672 24.9241 8.96643L17.8981 15.982Z" fill="white"/>
                                    </svg> 
                                </div>

                                <div class="question">
                                    <h1>Забронировать аудиторию ${buttonBookingAudienceHeader} на ${buttonBookingAudienceText}?</h1>

                                    <div class="question__answers">
                                        <div class="answer">
                                            <a href="" data-answer="yes">Да</a>
                                        </div>
                                        <div class="answer">
                                            <a href="" data-answer="no">Нет</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                body.classList.add("lock");
                body.insertAdjacentHTML("beforeend", popupQuestionHtml);

                popupQuestion = body.querySelector(".popup_question");
                popupQuestionContent = popupQuestion.querySelector(".popup__content")
                setTimeout(function() {
                    popupQuestion.classList.add("_active")
                }, 30);

                popupQuestionActions(buttonBookingAudience, buttonBookingAudienceHeader, buttonBookingAudienceText);
            } else{
                popupTooltipOpen("Аудитория на это время уже занята", true);
            }
        });
    });
};

function popupQuestionActions(button, audience, time){
    let buttonAnswerYes = popupQuestion.querySelector('a[data-answer="yes"]');
    let buttonAnswerNo = popupQuestion.querySelector('a[data-answer="no"]');

    buttonAnswerYes.addEventListener("click", (e) => {
        e.preventDefault();
        $.ajax({
            url: `booking-audience/`,
            type: 'post',
            headers: {'X-CSRFToken': csrfToken},
            data: {
                date: date,
                audience: audience,
                time: time
            },
            success: function(request){
                body.removeChild(popupQuestion)
                body.classList.remove("lock");
                button.classList.remove("_free");
                popupTooltipOpen("Аудитория успешно забронирована", false);
            },
            error: function() {
                popupTooltipOpen("Что-то пошло не так. Пожалуйста попробуйте еще раз", true);
            }
        });
    });

    buttonAnswerNo.addEventListener("click", (e) => {
        e.preventDefault();
        body.removeChild(popupQuestion)
        body.classList.remove("lock");
    });

    buttonClosePopupQuestion = popupQuestion.querySelector(".popup__close");
    buttonClosePopupQuestion.addEventListener("click", () => {
        body.removeChild(popupQuestion)
        body.classList.remove("lock");
    });

    document.addEventListener("click", (e) => {
        if(!popupQuestionContent.contains(e.target) && popupQuestion.contains(e.target)){
            body.removeChild(popupQuestion);
            body.classList.remove("lock");
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.which === 27){
            body.removeChild(popupQuestion)
            body.classList.remove("lock");
        }
    });
};

function openAudienceRemoveClass(){
    buttonsOpenAudience.forEach(buttonOpenAudience => {
        buttonOpenAudience.classList.remove("_active");
    });
}