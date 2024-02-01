let protectionDateCellsBlock = document.querySelector(".protection_date_cells");
let protectionDateCells;

let protectionTimeCellsBlock = document.querySelector(".protection_time_cells");

let popupCommossion;
let popupCommossionContent;
let popupCommossionDate;

let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

$.ajax({
    url: `/vkr/vkr-receiving-protection-date/`,
    type: 'post',
    headers: {'X-CSRFToken': csrfToken},
    success: function(request){
        let table = `
            <table>
                <tr>
        `;
        let index = 0;

        request.dates.forEach(date => {
            if(index % 4 === 0){
                table += `</tr><tr><td class="cell">` + date + `</td>`;   
            } else{
                table += `<td class="cell">` + date + `</td>`;
            }
            index++;
        });

        table += `</tr></table>`;
        protectionDateCellsBlock.innerHTML = table;
        
        protectionDateCells = document.querySelectorAll(".protection_date_cells .cell");
        openCellsTime();
    },
    error: function() {
        popupTooltipOpen("Что-то пошло не так. Пожалуйста попробуйте еще раз", true);
    }
});

function openCellsTime(){
    protectionDateCells.forEach(protectionDateCell => {
        protectionDateCell.addEventListener("click", () => {
            popupCommossionDate = protectionDateCell.innerText;
            $.ajax({
                url: `/vkr/vkr-receiving-commissions/`,
                type: 'post',
                headers: {'X-CSRFToken': csrfToken},
                data: {date: protectionDateCell.innerText},
                success: function(request){
                    let cellsHtml = `<div class="cells">`;

                    request.commissions.forEach(commission => {
                        cellsHtml += `
                            <div class="cell">
                                <div class="cell_data">
                                    <h5>Время:</h5>
                                    <p>${commission.time}</p>
                                </div>

                                <div class="cell_data">
                                    <h5>Члены комиссии:</h5>
                                    <div>
                        `;

                        commission.members.forEach(member => {
                            cellsHtml += `<p>${member}</p>`;
                        });

                        cellsHtml += `</div></div></div>`;
                    });


                    protectionTimeCellsBlock.innerHTML = cellsHtml;
                    confirmCommission();
                },
                error: function() {
                    popupTooltipOpen("Что-то пошло не так. Пожалуйста попробуйте еще раз", true);
                }
            });
        });
    });
};

function confirmCommission(){
    let confirmCommissionButtons = protectionTimeCellsBlock.querySelectorAll(".cells .cell");

    confirmCommissionButtons.forEach(confirmCommissionButton => {
        confirmCommissionButton.addEventListener("click", () => {
            let timeText = confirmCommissionButton.querySelector(".cell_data p").innerText;
            let members = confirmCommissionButton.querySelectorAll(".cell_data div p");
            let memberTest = "";

            let firstElement = true;
            members.forEach(member => {
                if(firstElement){
                    memberTest += member.innerText;
                    firstElement = false;
                } else{
                    memberTest += ", " + member.innerText;
                }
            });

            let popupCommossionHtml = `
                <div class="popup__commission none">
                    <div class="popup__body">
                        <div class="popup__content">
                            <div class="popup__close">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.8981 15.982L24.9261 23.0164C25.446 23.5367 25.4456 24.38 24.9253 24.8999C24.405 25.4197 23.5617 25.4194 23.0418 24.899L16.0133 17.8641L8.9684 24.8985C8.44791 25.4182 7.60465 25.4176 7.08493 24.8971C6.56522 24.3766 6.56584 23.5333 7.08633 23.0136L14.1306 15.9798L7.0893 8.93205C6.56943 8.41171 6.56981 7.56846 7.09015 7.04859C7.61049 6.52872 8.45374 6.5291 8.97361 7.04944L16.0155 14.0977L23.0421 7.08157C23.5626 6.56185 24.4058 6.56248 24.9255 7.08297C25.4453 7.60346 25.4446 8.44672 24.9241 8.96643L17.8981 15.982Z" fill="white"/>
                                </svg> 
                            </div>

                            <h1 class="commission_header">Подтвердите выбор даты защиты</h1>

                            <div class="commission_data">
                                <div class="data">
                                    <h5>Дата:</h5>
                                    <p>${popupCommossionDate}</p>
                                </div>

                                <div class="data">
                                    <h5>Время:</h5>
                                    <p>${timeText}</p>
                                </div>

                                <div class="data">
                                    <h5>Члены комиссии:</h5>
                                    <p>${memberTest}</p>
                                </div>
                            </div>
                
                            <div class="commission__button">
                                <a href="">Подтвердить</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            body.insertAdjacentHTML("beforeend", popupCommossionHtml);
            body.classList.add("lock");

            popupCommossion = document.querySelector(".popup__commission");
            popupCommossionContent = popupCommossion.querySelector(".popup__content")
            popupCommossion.classList.remove("none");
            setTimeout(function() {
                popupCommossion.classList.add("_active");
                popupCommission(timeText);
            }, 30);
        });
    });
};

function popupCommission(timeConfirmCommission){
    let buttonClosePopupCommission = popupCommossionContent.querySelector(".popup__close");
    let buttonConfirmCommission = popupCommossionContent.querySelector(".commission__button");

    buttonClosePopupCommission.addEventListener("click", () => {
        popupCommossion.classList.add("none");
        body.classList.remove("lock");
        popupCommossion.classList.remove("_active");
        body.removeChild(popupCommossion);
    });

    document.addEventListener("click", (e) => {
        if(!popupCommossionContent.contains(e.target) && popupCommossion.contains(e.target)){
            popupCommossion.classList.add("none");
            body.classList.remove("lock");
            popupCommossion.classList.remove("_active");
            body.removeChild(popupCommossion);
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.which === 27){
            popupCommossion.classList.add("none");
            body.classList.remove("lock");
            popupCommossion.classList.remove("_active");
            body.removeChild(popupCommossion);
        }
    });

    buttonConfirmCommission.addEventListener("click", (e) => {
        e.preventDefault();
        $.ajax({
            url: `/vkr/vkr-booking-commission/`,
            type: 'post',
            headers: {'X-CSRFToken': csrfToken},
            data: {
                time_confirm_commission: timeConfirmCommission,
                date_confirm_commission: popupCommossionDate,
            },
            success: function(request){
                popupTooltipOpen("Вы записались на защиту ВКР", false);
            },
            error: function() {
                popupTooltipOpen("Что-то пошло не так. Пожалуйста попробуйте еще раз", true);
            }
        });
    });
}