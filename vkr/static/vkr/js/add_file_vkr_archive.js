let popupAddFileButtonAddFile = popupAddFileContent.querySelector(".add_file__button");

let csrfTokenAddFile = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

let main = document.querySelector("main");
let tableFilesHtml = ``;
let maxWidth;

let choiceGroupsBlock = document.querySelector(".choice_groups");
popupAddFile.querySelector(".popup__content").removeChild(choiceGroupsBlock);

$.ajax({
    url: `receive-list-files/`,
    type: 'post',
    headers: {'X-CSRFToken': csrfTokenAddFile},
    success: function(request){
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

        selectText.innerText = request.group;
    },
    error: function() {
        popupTooltipOpen("Файлы не удалось получить. Пожалуйста перезагрузите страницу", true);
    }
});

popupAddFileButtonAddFile.addEventListener("click", (e) => {
    e.preventDefault();
    if (inputsFileData.has('document')) {
        $.ajax({
            url: `add-files/`,
            type: 'post',
            headers: {'X-CSRFToken': csrfTokenAddFile},
            data: inputsFileData,
            processData: false,
            contentType: false,
            success: function(){
                popupAddFile.classList.add("none");
                body.classList.remove("lock");
                popupAddFile.classList.remove("_active");
                filesBlock.innerHTML = "";
                popupTooltipOpen("Файлы успешно опубликованы", false);
            },
            error: function() {
                popupTooltipOpen("Файлы не удалось опубликовать. Пожалуйста, попробуйте ещё раз", true);
            }
        });
    } else {
        popupTooltipOpen("Пожалуйста, сначала прикрепите файлы", true);
    }
});