let popupAddFileSelect = document.querySelector("#group-select");
let popupAddFileSelectText = popupAddFileSelect.querySelector(".select__text");
let popupAddFileSelectHiddenMenu;
let popupAddFileSelectHiddenMenuButtons;
let groups = ``;
let selectUpdateTrue = true;

popupAddFileSelect.addEventListener("click", (e) => {
    popupAddFileSelectHiddenMenu = popupAddFileSelect.querySelector(".select__hidden_menu");
    popupAddFileSelectHiddenMenuButtons = popupAddFileSelectHiddenMenu.querySelectorAll("a");

    if(popupAddFileSelect.classList.contains("_active")){
        popupAddFileSelect.classList.remove("_active");
        popupAddFileSelectHiddenMenu.classList.add("none");
    } else if(!popupAddFileSelectHiddenMenu.contains(e.target)){
        popupAddFileSelect.classList.add("_active");
        popupAddFileSelectHiddenMenu.classList.remove("none");
        selectAddFileClose();

        if(selectUpdateTrue){
            selectAddFileUpdate();
            selectUpdateTrue = false;
        }
    }
});

function selectAddFileUpdate(){
    popupAddFileSelectHiddenMenuButtons.forEach(popupAddFileSelectHiddenMenuButton => {
        popupAddFileSelectHiddenMenuButton.addEventListener("click", (e) => {
            e.preventDefault();

            if(groups === ``){
                groups += `<i class="group">${popupAddFileSelectHiddenMenuButton.innerText}</i>`;
            } else{
                groups += `<i>, </i> <i class="group">${popupAddFileSelectHiddenMenuButton.innerText}</i>`;
            }
            popupAddFileSelectText.innerHTML = groups;

            popupAddFileSelectText.classList.add("_active");
            popupAddFileSelect.classList.remove("_active");
            popupAddFileSelectHiddenMenu.classList.add("none");
        });
    });
}

function selectAddFileClose(){
    document.addEventListener("click", (e) => {
        if(!popupAddFileSelect.contains(e.target)){
            popupAddFileSelect.classList.remove("_active");
            popupAddFileSelectHiddenMenu.classList.add("none");
        }
    });
}