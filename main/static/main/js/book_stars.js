let starsBlock = document.querySelector(".book .book__info .stars");
let stars = starsBlock.querySelectorAll(".star");
let countStarsFill = 0;
let countPutStars = -1;

if(starsBlock.dataset.putstars != ""){
    countStarsFill = parseInt(starsBlock.dataset.putstars);
    countPutStars = parseInt(starsBlock.dataset.putstars);
    starsFill();
}

stars.forEach(star => {
    star.addEventListener("mouseover", () => {
        countStarsFill = parseInt(star.dataset.number);
        starsFill();
    });
    star.addEventListener("mouseout", () => {
        countStarsFill = 0;
        starsFill();
    });
    star.addEventListener("click", (e) => {
        e.preventDefault();
        countStarsFill = parseInt(star.dataset.number);
        countPutStars = parseInt(star.dataset.number);
        starsFill();

        $.ajax({
            url: `put-stars/`,
            type: 'post',
            headers: {'X-CSRFToken': csrfToken},
            data: JSON.stringify({starsPut: countPutStars}),
            success: function(){
                popupTooltipOpen("Оценка успешно сохранена", false);
            },
            error: function() {
                popupTooltipOpen("Оценка не была сохранена. Пожалуйста попробуйте еще раз", true);
            }
        });
    });
});



function starsFill(){
    for (let i = 0; i < countStarsFill; i++) {
        stars[i].classList.add("_active");
    }

    for (let i = countStarsFill; i < 5; i++) {
        if(i > countPutStars - 1){
            stars[i].classList.remove("_active");
        }
    }
};