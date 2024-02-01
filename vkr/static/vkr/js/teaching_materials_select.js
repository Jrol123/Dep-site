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
                    tableBlocks.forEach(tableBlock => {
                        tableBlock.innerHTML = "";
                    });

                    let index = 0;
                    tableFilesHtml = ``;
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