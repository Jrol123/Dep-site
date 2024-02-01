let headerMenu = document.querySelector("header .header_menu");
let headerMenuButtons = headerMenu.querySelectorAll(".button");

headerMenuButtons.forEach(headerMenuButton => {
    headerMenuButton.addEventListener("click", (e) => {     
        let headerMenuButtonParent =  headerMenuButton.closest(".header_menu__button");

        if(!headerMenuButtonParent.classList.contains("link")){
            e.preventDefault();

            if(headerMenuButtonParent.classList.contains("_active")){
                headerMenuButtonParent.querySelector(".links").classList.add("none");
                headerMenuButtonParent.classList.remove("_active");
            } else{
                headerMenuButtonsClose();
                headerMenuButtonParent.querySelector(".links").classList.remove("none");
                headerMenuButtonParent.classList.add("_active");
            }
        }
    });
});

function headerMenuButtonsClose(){
    headerMenuButtons.forEach(headerMenuButton => {
        const  headerMenuButtonParent =  headerMenuButton.closest(".header_menu__button");
        headerMenuButtonParent.querySelector(".links").classList.add("none");
        headerMenuButtonParent.classList.remove("_active");
    });
}