let popupAddFileButtonAddFile = popupAddFileContent.querySelector(".add_file__button");

let csrfTokenAddFile = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

let tableBlocks = document.querySelectorAll(".table .table__block");
let tableFilesHtml = ``;
let maxWidth = tableBlocks[0].offsetWidth - 100;

$.ajax({
    url: `receive-list-files/`,
    type: 'post',
    headers: {'X-CSRFToken': csrfTokenAddFile},
    success: function(request){
        let index = 0;
        request.materials.forEach(material => {
            index++;

            let nameElement = document.createElement('span');
            nameElement.style.visibility = 'hidden';
            nameElement.style.position = 'absolute';
            nameElement.style.whiteSpace = 'nowrap';
            document.body.appendChild(nameElement);
            nameElement.textContent = material.material_name;
            
            while (nameElement.offsetWidth > maxWidth) {
                material.material_name = material.material_name.slice(0, -1);
                nameElement.textContent = material.material_name + '...';
            }
            
            document.body.removeChild(nameElement);
            let name = nameElement.textContent;

            tableFilesHtml += `
                <a href="${material.material_file}">${name}</a>
            `;

            if(index % 14 == 0){
                tableFilesHtml = ``;
            }

            if(index <= 14){
                tableBlocks[0].innerHTML = tableFilesHtml;
            } else if(index > 14 && index <= 28){
                tableBlocks[1].innerHTML = tableFilesHtml;
            } else if(index > 28 && index <= 42){
                tableBlocks[2].innerHTML = tableFilesHtml;
            } else if(index > 42 && index <= 56){
                tableBlocks[3].innerHTML = tableFilesHtml;
            }
        });

        selectText.innerText = request.group;
    },
    error: function() {
        popupTooltipOpen("Файлы не удалось получить. Пожалуйста перезагрузите страницу", true);
    }
});

popupAddFileButtonAddFile.addEventListener("click", (e) => {
    e.preventDefault();
    
    let addFileGroups = Array.from(document.querySelectorAll('.popup__add_file .popup__content .choice_groups .select .select__text .group')).map(group => group.innerText);

    let formData = new FormData();
    inputsFileData.forEach(file => {
        formData.append('files', file);
    });
    
    // Добавление других данных
    addFileGroups.forEach(group => {
        formData.append('groups', group);
    });

    if (inputsFileData.has('document')) {
        $.ajax({
            url: `add-file/`,
            type: 'post',
            headers: {'X-CSRFToken': csrfTokenAddFile},
            data: formData,
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