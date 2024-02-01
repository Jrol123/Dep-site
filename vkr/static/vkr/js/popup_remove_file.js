let popupRemoveFile = document.querySelector(".popup__remove_file");
let popupRemoveFileContent = popupRemoveFile.querySelector(".popup__content");
let popupRemoveFileButtonOpen = document.querySelector("#button-remove-file");

let csrfTokenRemoveFile = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

popupRemoveFileButtonOpen.addEventListener("click", (e) => {
    e.preventDefault();
});


function popupRemoveFileClose(){
    let buttonCloseRemoveFile = popupRemoveFileContent.querySelector(".popup__close");
    buttonCloseRemoveFile.addEventListener("click", () => {
        popupRemoveFile.classList.add("none");
        body.classList.remove("lock");
        popupRemoveFile.classList.remove("_active");
    });

    document.addEventListener("click", (e) => {
        if(!popupRemoveFileContent.contains(e.target) && popupRemoveFile.contains(e.target)){
            popupRemoveFile.classList.add("none");
            body.classList.remove("lock");
            popupRemoveFile.classList.remove("_active");
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.which === 27){
            popupRemoveFile.classList.add("none");
            body.classList.remove("lock");
            popupRemoveFile.classList.remove("_active");
        }
    });
}