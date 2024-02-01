let popupAddFile = document.querySelector(".popup__add_file");
let popupAddFileContent = popupAddFile.querySelector(".popup__content");
let popupAddFileButtonOpen = document.querySelector("#button-add-file");
let filesBlock = popupAddFile.querySelector(".files");

let inputsFileData = new FormData();

popupAddFileButtonOpen.addEventListener("click", (e) => {
    e.preventDefault();
    popupAddFile.classList.remove("none");
    setTimeout(function() {
        popupAddFile.classList.add("_active");
    }, 30);
    body.classList.add("lock");
    popupAddFileClose();
});

window.addEventListener("load", () => {
    const input = document.querySelector("#input_add_file");
    const label = popupAddFile.querySelector(".window_add_file label");

    input.addEventListener("change", (e) => {
        inputsFileData.append('document', e.target.files[0]);
        let fileName = e.target.files[0].name;
        filesBlock.insertAdjacentHTML("beforeend", `<p class="file">${fileName}</p>`);
    });

    label.addEventListener('dragover', (e) => {
        e.preventDefault();
        label.classList.add('dragover');
    });

    label.addEventListener('dragleave', () => {
        label.classList.remove('dragover');
    });

    label.addEventListener('drop', (e) => {
        e.preventDefault();
        label.classList.remove('dragover');

        const file = e.dataTransfer.files[0];
        if (checkFileType(file)) {
            input.files = e.dataTransfer.files;

            inputsFileData.append('book_file', file);
            let fileName = file.name;
            filesBlock.insertAdjacentHTML("beforeend", `<p class="file">${fileName}</p>`);
        } else {
            popupTooltipOpen("Пожалуйста, выберите файлы только с расширениями .doc, .docx или .pdf", true);
        }
    });
});


function popupAddFileClose(){
    let buttonClosePostBook = popupAddFileContent.querySelector(".popup__close");
    buttonClosePostBook.addEventListener("click", () => {
        popupAddFile.classList.add("none");
        body.classList.remove("lock");
        popupAddFile.classList.remove("_active");
    });

    document.addEventListener("click", (e) => {
        if(!popupAddFileContent.contains(e.target) && popupAddFile.contains(e.target)){
            popupAddFile.classList.add("none");
            body.classList.remove("lock");
            popupAddFile.classList.remove("_active");
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.which === 27){
            popupAddFile.classList.add("none");
            body.classList.remove("lock");
            popupAddFile.classList.remove("_active");
        }
    });
}

function checkFileType(file) {
    return /\.(doc|docx|pdf)$/i.test(file.name);
}