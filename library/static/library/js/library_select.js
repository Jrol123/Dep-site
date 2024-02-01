let selectOrderBook = document.querySelector("#select_order_book");
let selectOrderBookText = selectOrderBook.querySelector(".select__text");
let selectOrderBookHiddenMenu;

let order_by = selectOrderBook.dataset.orderby;
if(order_by != ""){
    if(order_by === "title"){
        selectOrderBookText.innerText = "Названию";
    } else if(order_by === "author"){
        selectOrderBookText.innerText = "Автору";
    } else if(order_by === "discipline"){
        selectOrderBookText.innerText = "Дисциплине";
    } else if(order_by === "user"){
        selectOrderBookText.innerText = "Кто выложил";
    }
}


selectOrderBook.addEventListener("click", () => {
    selectOrderBookHiddenMenu = selectOrderBook.querySelector(".select__hidden_menu");

    if(selectOrderBook.classList.contains("_active")){
        selectOrderBook.classList.remove("_active");
        selectOrderBookHiddenMenu.classList.add("none");
    } else{
        selectOrderBook.classList.add("_active");
        selectOrderBookHiddenMenu.classList.remove("none");
        selectOrderBookClose();
    }
});


function selectOrderBookClose(){
    document.addEventListener("click", (e) => {
        if(!selectOrderBook.contains(e.target)){
            selectOrderBook.classList.remove("_active");
            selectOrderBookHiddenMenu.classList.add("none");
        }
    });
}