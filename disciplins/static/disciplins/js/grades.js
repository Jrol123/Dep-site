let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
let term = 1;
let tableGrades = document.querySelector("main table tbody");
let tableHeader = `
    <tr>
        <th>
            № <br> п/п
            <div class="separator"></div>
        </th>
        <th>
            Наименование дисциплины
            <div class="separator"></div>
        </th>
        <th>
            Тип
            <div class="separator"></div>
        </th>
        <th>
            Оценка
            <div class="separator"></div>
        </th>
        <th>
            Дата сдачи
            <div class="separator"></div>
        </th>
        <th>
            Ф.И.О. преподавателя
        </th>
    </tr>
`;

let select = document.querySelector("#select");
let selectText = select.querySelector(".select__text");
let selectHiddenMenu;
let selectHiddenMenuButtons;
let updateTrue = true;



class GradesRender {
    render(){
        $.ajax({
            url: `/disciplins/receiving-grades/`,
            type: 'post',
            headers: {'X-CSRFToken': csrfToken},
            data: {term: term},
            success: function(request){
                tableGrades.innerHTML = tableHeader;

                let grades_list = request.grades_data;
                
                let number = 1;
                grades_list.forEach(grade_object => {
                    let grade;

                    if(grade_object[1] == "зачет"){
                        grade = grade_object[2] >= 50 ? "зачет" : "не зачет";
                    } else{
                        if(grade_object[2] >= 85){
                            grade = "отлично";
                        } else if(grade_object[2] >= 75){
                            grade = "хорошо";
                        } else if(grade_object[2] >= 50){
                            grade = "удовлетворительно";
                        } else{
                            grade = "неудовлетворительно"
                        }
                    }

                    let tableField = `
                        <tr>
                            <td>${number}</td>
                            <td>${grade_object[0]}</td>
                            <td>${grade_object[1]}</td>
                            <td>${grade}</td>
                            <td>${grade_object[3]}</td>
                            <td>${grade_object[4]}</td>
                        </tr>
                    `;
            
                    tableGrades.insertAdjacentHTML("beforeend", tableField);
                    number++;
                });
            },
            error: function() {
                popupTooltipOpen("Что-то пошло не так. Пожалуйста попробуйте еще раз", true);
            }
        });
    }
}

let gradesClass = new GradesRender();
gradesClass.render();



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

            term = parseInt(selectHiddenMenuButton.dataset.term);
            gradesClass.render();
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