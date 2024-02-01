let removeFilesBlock = document.querySelector(".window_remove_file");
let filesHtml;

let buttonsRemove;
let removeFunctionTrue = true;

popupRemoveFileButtonOpen.addEventListener("click", (e) => {
    $.ajax({
        url: `remove-file-open/`,
        type: 'post',
        headers: {'X-CSRFToken': csrfTokenRemoveFile},
        success: function(request){
            filesHtml = ``;

            request.materials.forEach(report => {
                let nameElement = document.createElement('span');
                nameElement.style.visibility = 'hidden';
                nameElement.style.position = 'absolute';
                nameElement.style.whiteSpace = 'nowrap';
                document.body.appendChild(nameElement);
                nameElement.textContent = report.material_name;
                
                while (nameElement.offsetWidth > 400) {
                    report.material_name = report.material_name.slice(0, -1);
                    nameElement.textContent = report.material_name + '...';
                }
                
                document.body.removeChild(nameElement);
                let name = nameElement.textContent;   

                filesHtml += `
                    <div class="file">
                        <a href="${report.material_file}" class="file">${name}</a>
                        <span class="button_remove" id="${report.material_id}"></span>
                    </div>
                `;
            });

            removeFilesBlock.innerHTML = filesHtml;

            buttonsRemove = removeFilesBlock.querySelectorAll(".file span");

            if(removeFunctionTrue){
                removeFile();
                removeFunctionTrue = false;
            }

            popupRemoveFile.classList.remove("none");
            setTimeout(function() {
                popupRemoveFile.classList.add("_active");
            }, 30);
            body.classList.add("lock");
            popupRemoveFileClose();
        },
        error: function() {
            popupTooltipOpen("Что-то пошло не так. Пожалуйста, попробуйте ещё раз", true);
        }
    });
});

function removeFile(){
    buttonsRemove.forEach(buttonRemove => {
        buttonRemove.addEventListener("click", () => {
            let removeFileId = buttonRemove.id;
    
            $.ajax({
                url: `remove-file/`,
                type: 'post',
                headers: {'X-CSRFToken': csrfTokenRemoveFile},
                data: {remove_file_id: removeFileId},
                success: function(request){
                    popupTooltipOpen("Файлы успешно удалены", false);
                },
                error: function() {
                    popupTooltipOpen("Что-то пошло не так. Пожалуйста, попробуйте ещё раз", true);
                }
            });
        });
    })
}