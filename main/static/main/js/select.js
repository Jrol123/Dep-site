let select = document.querySelector("#select");
let selectText = select.querySelector(".select__text");
let selectHiddenMenu;
let selectHiddenMenuButtons;

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
        selectUpdate();
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