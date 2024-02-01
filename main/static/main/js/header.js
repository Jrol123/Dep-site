let headerMenu = document.querySelector("header .header_menu");
let headerMenuButtons = headerMenu.querySelectorAll(".button");


headerMenuButtons.forEach(headerMenuButton => {
    let headerMenuButtonParent =  headerMenuButton.closest(".header_menu__button");
    let headerMenuHidden;
    let isTimerRunning = false;
    let timeOut;

    headerMenuButton.addEventListener("click", (e) => {
        if(headerMenuButtonParent.querySelector(".links")){
            e.preventDefault();
        }
    });

    let maxHeight;
    headerMenuButton.addEventListener("mouseover", () => {
        headerMenuHidden = headerMenuButtonParent.querySelector(".links");

        if(isTimerRunning){
            clearTimeout(timeOut)
            headerMenuHidden.style.transition = "all .5s ease";
            headerMenuHidden.style.height = maxHeight + "px";
            headerMenuHidden.style.padding = "20px";
        } else if(headerMenuButtonParent.querySelector(".links") && !headerMenuButtonParent.classList.contains("_active")){
            headerMenuButtonParent.querySelector(".links").classList.remove("none");
            headerMenuButtonParent.classList.add("_active");

            headerMenuHidden.style.transition = "all .5s ease";
            maxHeight = headerMenuHidden.scrollHeight + 40;
            headerMenuHidden.style.height = headerMenuHidden.scrollHeight + 40 + "px";
            headerMenuHidden.style.padding = "20px";

            isTimerRunning = true;
        }
    });

    headerMenuButtonParent.addEventListener("mouseout", (e) => {
        if (headerMenuButtonParent.querySelector(".links") && !headerMenuHidden.contains(e.relatedTarget) && !headerMenuButtonParent.contains(e.relatedTarget)) {
            headerMenuHidden.style.transition = "all .3s ease";
            headerMenuHidden.style.height = 0;
            headerMenuHidden.style.padding = "0 20px";
            timeOut = setTimeout(function() {
                isTimerRunning = false;
                headerMenuButtonParent.querySelector(".links").classList.add("none");
                headerMenuButtonParent.classList.remove("_active");
            }, 300);
        }
    });
});