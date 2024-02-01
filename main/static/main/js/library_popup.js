let buttonOpenPostBook = document.querySelector("#button_post_book");
let popupPostBook = document.querySelector(".popup__post_book");
let buttonPostBookContent = popupPostBook.querySelector(".popup__body .popup__content");
let buttonClosePostBook;

buttonOpenPostBook.addEventListener("click", (e) => {
    e.preventDefault();
    popupPostBook.classList.remove("none");
    setTimeout(function() {
        popupPostBook.classList.add("_active");
    }, 30);
    body.classList.add("lock");
    popupPostBookClose();
});

function popupPostBookClose(){
    buttonClosePostBook = buttonPostBookContent.querySelector(".popup__close");
    buttonClosePostBook.addEventListener("click", () => {
        popupPostBook.classList.add("none");
        body.classList.remove("lock");
        popupPostBook.classList.remove("_active");
    });

    document.addEventListener("click", (e) => {
        if(!buttonPostBookContent.contains(e.target) && popupPostBook.contains(e.target)){
            popupPostBook.classList.add("none");
            body.classList.remove("lock");
            popupPostBook.classList.remove("_active");
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.which === 27){
            popupPostBook.classList.add("none");  
            body.classList.remove("lock");
            popupPostBook.classList.remove("_active");
        }
    });
}