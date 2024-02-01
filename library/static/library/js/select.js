let select = document.querySelector(".select");
let selectText = select.querySelector(".select__text");
let selectHiddenMenu;
let selectHiddenMenuButtons;

let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

let order_by = select.dataset.orderby;
if(order_by != ""){
    if(order_by === "title"){
        selectText.innerText = "Названию";
    } else if(order_by === "author"){
        selectText.innerText = "Автору";
    } else if(order_by === "discipline"){
        selectText.innerText = "Дисциплине";
    } else if(order_by === "user"){
        selectText.innerText = "Кто выложил";
    }
}


select.addEventListener("click", () => {
    selectHiddenMenu = select.querySelector(".select__hidden_menu");
    selectHiddenMenuButtons = selectHiddenMenu.querySelectorAll("a");

    if(select.classList.contains("_active")){
        select.classList.remove("_active");
        selectHiddenMenu.classList.add("none");
    } else{
        select.classList.add("_active");
        selectHiddenMenu.classList.remove("none");
        selectClose();
    }
});


function selectClose(){
    document.addEventListener("click", (e) => {
        if(!select.contains(e.target)){
            select.classList.remove("_active");
            selectHiddenMenu.classList.add("none");
        }
    });
}