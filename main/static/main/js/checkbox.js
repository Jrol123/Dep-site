let checkboxs = document.querySelectorAll("#checkbox");

checkboxs.forEach(checkbox => {
    checkbox.addEventListener("click", () => {
        if(checkbox.classList.contains("_active")){
            checkbox.classList.remove("_active");
        } else{
            checkbox.classList.add("_active");
        }
    });
});