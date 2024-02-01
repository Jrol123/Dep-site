let select = document.querySelector("#select");
let selectText = select.querySelector(".select__text");
let selectHiddenMenu;
let selectHiddenMenuButtons;
let updateTrue = true;

select.addEventListener("click", (e) => {
    selectHiddenMenu = select.querySelector(".select__hidden_menu");
    selectHiddenMenuButtons = selectHiddenMenu.querySelectorAll("a");

    if(select.classList.contains("_active")){
        select.classList.remove("_active");
        selectHiddenMenu.classList.add("none");
    } else if(!selectHiddenMenu.contains(e.target)){
        select.classList.add("_active");
        selectHiddenMenu.classList.remove("none");
        selectClose();

        if(updateTrue){
            selectUpdate();
            updateTrue = false;
        }
    }
});

function selectUpdate(){
    selectHiddenMenuButtons.forEach(selectHiddenMenuButton => {
        selectHiddenMenuButton.addEventListener("click", (e) => {
            e.preventDefault();
            selectText.innerText = selectHiddenMenuButton.innerText;
            selectText.classList.add("_active");
            select.classList.remove("_active");
            selectHiddenMenu.classList.add("none");

            $.ajax({
                url: `selection-group/`,
                type: 'post',
                headers: {'X-CSRFToken': csrfTokenAddFile},
                data: {group: selectHiddenMenuButton.innerText},
                success: function(request){
                    let tableBlock = document.querySelector("table");
                    main.removeChild(tableBlock)

                    tableFilesHtml = `
                        <table>
                            <tr>
                                <th>№ <br> п/п</th>
                                <th>ФИО студента</th>
                                <th>Направление</th>
                                <th>Отчёт</th>
                            </tr>
                    `;
            
                    let index = 0;
                    request.reports.forEach(report => {
                        index++;
            
                        let nameElement = document.createElement('span');
                        nameElement.style.visibility = 'hidden';
                        nameElement.style.position = 'absolute';
                        nameElement.style.whiteSpace = 'nowrap';
                        document.body.appendChild(nameElement);
                        nameElement.textContent = report.report_name;
                        
                        while (nameElement.offsetWidth > 300) {
                            report.report_name = report.report_name.slice(0, -1);
                            nameElement.textContent = report.report_name + '...';
                        }
                        
                        document.body.removeChild(nameElement);
                        let name = nameElement.textContent;
            
                        tableFilesHtml += `
                            <tr>
                                <td>${index}</td>
                                <td>${report.student_full_name}</td>
                                <td>${request.group}</td>
                                <td>
                                    <a href="${report.report_file}">${name}</a>                 
                                </td>
                            </tr>
                        `;
                    });
            
                    tableFilesHtml += `</table>`;
                    main.insertAdjacentHTML("beforeend", tableFilesHtml);
                },
                error: function() {
                    popupTooltipOpen("Не удалось выполнить запрос. Пожалуйста, попробуйте ещё раз", true);
                }
            });
        });
    });
}

function selectClose(){
    document.addEventListener("click", (e) => {
        if(!select.contains(e.target)){
            select.classList.remove("_active");
            selectHiddenMenu.classList.add("none");
        }
    });
}