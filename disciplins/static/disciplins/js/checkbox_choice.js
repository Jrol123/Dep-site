function checkboxsSearch(){
    let checkboxs = document.querySelectorAll("#checkbox");
    checkboxs.forEach(checkbox => {
        checkbox.addEventListener("click", () => {
            let blockSelection = checkbox.closest(".block_selection");
            blockSelection.querySelectorAll(".checkbox").forEach(blockSelectionCheckbox => {
                blockSelectionCheckbox.classList.remove("_active");
            })
    
            if(checkbox.classList.contains("_active")){
                checkbox.classList.remove("_active");
            } else{
                checkbox.classList.add("_active");
            }
        });
    });
}