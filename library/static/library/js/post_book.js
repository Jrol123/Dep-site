let buttonOpenPostBook = document.querySelector("#button_post_book");
let popupPostBook = document.querySelector(".popup__post_book");
let buttonPostBookContent = popupPostBook.querySelector(".popup__body .popup__content");
let buttonClosePostBook;

let inputsFileData = new FormData();
let inputsFile = document.querySelectorAll('.input_file');
let label;

let buttonPostBook = document.querySelector(".post_book__button");

let csrfTokenPostBook = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

buttonOpenPostBook.addEventListener("click", (e) => {
    e.preventDefault();
    popupPostBook.classList.remove("none");
    setTimeout(function() {
        popupPostBook.classList.add("_active");
    }, 30);
    body.classList.add("lock");
    popupPostBookClose();
});

inputsFile.forEach(inputFile => {
    inputFile.addEventListener('change', function() {
        if (inputFile.files.length > 0) {
            label = inputFile.closest(".form_line__right").querySelector('label');
            label.textContent = inputFile.files[0].name;
        }
    });
});

buttonPostBook.addEventListener('click', function(e) {
    e.preventDefault();

    let inputFileBook = document.querySelector('input[name="file_book"]').files[0];
    let inputFileImg = document.querySelector('input[name="file_img"]').files[0];
    let nameBook = document.querySelector('input[name="name_book"]').value;
    let authorFullName = document.querySelector('input[name="author_full_name"]').value;
    let nameDiscipline = document.querySelector('.name_discipline').innerHTML;
    let descriptionBook = document.querySelector('textarea[name="description_book"]').value;

    if(popupPostBookValidation(inputFileBook, nameBook, authorFullName, nameDiscipline, descriptionBook)){
        inputsFileData.append('book_file', inputFileBook);
        inputsFileData.append('book_img', inputFileImg);
        inputsFileData.append('nameBook', nameBook);
        inputsFileData.append('authorFullName', authorFullName);
        inputsFileData.append('nameDiscipline', nameDiscipline);
        inputsFileData.append('descriptionBook', descriptionBook);
        
        $.ajax({
            url: `/library/post-book/`,
            type: 'post',
            headers: {'X-CSRFToken': csrfTokenPostBook},
            data: inputsFileData,
            processData: false,
            contentType: false,
            success: function(){
                popupPostBook.classList.add("none");
                body.classList.remove("lock");
                popupPostBook.classList.remove("_active");
                popupTooltipOpen("Книга успешно опубликована", false);
            },
            error: function() {
                popupTooltipOpen("Книгу не удалось опубликовать. Пожалуйста, попробуйте ещё раз", true);
            }
        });
    } else{
        popupPostBookValidationClass(inputFileBook, nameBook, authorFullName, nameDiscipline, descriptionBook);
        popupTooltipOpen("Книгу не удалось опубликовать. Пожалуйста, заполните обязательные поля", true);
    }
});



function popupPostBookValidation(inputFileBook, nameBook, authorFullName, nameDiscipline, descriptionBook){
    if(inputFileBook === undefined){
        return false;
    } else if(nameBook === ""){
        return false;
    } else if(authorFullName === ""){
        return false;
    } else if(nameDiscipline === "Название дисциплины"){
        return false;
    } else if(descriptionBook === ""){
        return false;
    } else{
        return true
    }
}

function popupPostBookValidationClass(inputFileBook, nameBook, authorFullName, nameDiscipline, descriptionBook){
    if(inputFileBook === undefined){
        document.querySelector('label[for="input_file_book"]').classList.add("_none_val");
        setTimeout(function() {
            document.querySelector('label[for="input_file_book"]').classList.remove("_none_val");
        }, 4000);
    }
    if(nameBook === ""){
        document.querySelector('input[name="name_book"]').classList.add("_none_val");
        setTimeout(function() {
            document.querySelector('input[name="name_book"]').classList.remove("_none_val");
        }, 4000);
    }
    if(authorFullName === ""){
        document.querySelector('input[name="author_full_name"]').classList.add("_none_val");
        setTimeout(function() {
            document.querySelector('input[name="author_full_name"]').classList.remove("_none_val");
        }, 4000);
    }
    if(nameDiscipline === "Название дисциплины"){
        document.querySelector('.name_discipline').closest(".select").classList.add("_none_val");
        setTimeout(function() {
            document.querySelector('.name_discipline').closest(".select").classList.remove("_none_val");
        }, 4000);
    }
    if(descriptionBook === ""){
        document.querySelector('textarea[name="description_book"]').classList.add("_none_val");
        setTimeout(function() {
            document.querySelector('textarea[name="description_book"]').classList.remove("_none_val");
        }, 4000);
    }
}

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