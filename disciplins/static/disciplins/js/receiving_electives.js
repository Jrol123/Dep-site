let tableElectives = document.querySelector("main table tbody");
let tableHeader = `
    <tr>
        <th>№ <br> п/п</th>
        <th>Наименование дисциплины</th>
        <th>Выбор</th>
    </tr>
`;



class ElectivesRender {
    render(){
        $.ajax({
            url: `/disciplins/receiving-electives/`,
            type: 'get',
            success: function(request){
                tableElectives.innerHTML = tableHeader;

                let electives_list = request.electives_data;
                
                let number = 1;
                electives_list.forEach(electives_object => {
                    let electivesHtml = ``;
                    let checkboxHtml = ``;
                    electives_object.forEach(elective => {
                        electivesHtml += `<div class="name">${elective.name}</div>`;
                        checkboxHtml += `<div class="checkbox" id="checkbox"></div>`;
                    })
                    
                    let tableField = `
                        <tr>
                            <td>${number}</td>
                            <td>
                                <div class="block_selection_name">${electivesHtml}</div>
                            </td>
                            <td>
                                <div class="block_selection">${checkboxHtml}</div>
                            </td>
                        </tr>
                    `;
            
                    tableElectives.insertAdjacentHTML("beforeend", tableField);
                    number++;
                });

                checkboxsSearch();
            },
            error: function() {
                popupTooltipOpen("Что-то пошло не так. Пожалуйста попробуйте еще раз", true);
            }
        });
    }
}

let electivesClass = new ElectivesRender();
electivesClass.render();