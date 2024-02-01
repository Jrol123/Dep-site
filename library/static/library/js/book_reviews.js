let buttonWriteReview;
let textareaReview;
let userReview;

let reviewsList = document.querySelector("main .reviews .reviews__list");
let buttonReviewsListMore = reviewsList.querySelector(".icon_arrow_down a");

let reviewPattern = ``;
let reviewPatternStars = ``;

let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');



if(document.querySelector("main .reviews .reviews__write_review .button_write_review")){
    buttonWriteReview = document.querySelector("main .reviews .reviews__write_review .button_write_review");
    textareaReview = buttonWriteReview.closest(".reviews__write_review").querySelector("textarea");
    userReview = textareaReview.dataset.userreview;

    if(userReview != ""){
        textareaReview.value = userReview;
        buttonWriteReview.querySelector("a").innerText = "Изменить отзыв";
    }
    
    buttonWriteReview.addEventListener("click", (e) => {
        e.preventDefault();
        if(textareaReview.value != ""){
            $.ajax({
                url: `write-review/`,
                type: 'post',
                headers: {'X-CSRFToken': csrfToken},
                data: JSON.stringify({review: textareaReview.value}),
                success: function(){
                    buttonWriteReview.querySelector("a").innerText = "Изменить отзыв";
                    popupTooltipOpen("Отзыв успешно сохранен", false);
                },
                error: function() {
                    popupTooltipOpen("Отзыв не был сохранен. Пожалуйста попробуйте еще раз", true);
                }
            });
        }
    });
}



$.ajax({
    url: `reviews/`,
    type: 'get',
    success: function(response){
        let index = 0;
        response.reviews.forEach(( {reviewText, fullName, mark} ) => {
            if(parseInt(mark) != 0 && parseInt(mark) <= 3){
                for(i = 0; i < parseInt(mark); i++){
                    reviewPatternStars += `
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z" fill="#FF6060"/>
                        </svg>
                    `;
                }
            } else if(parseInt(mark) != 0 && parseInt(mark) > 3){
                for(i = 0; i < parseInt(mark); i++){
                    reviewPatternStars += `
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z" fill="#9AE67F"/>
                        </svg>
                    `;
                }
            }

            reviewPattern += `
                <div class="user_review">
                    <div class="user_review__header">
                        <div class="userpic">
                            <img src="{% static 'library/img/book/review_userpic.png' %}" alt="">
                        </div>
            
                        <p class="full_name">${fullName}</p>

                        <div class="stars">${reviewPatternStars}</div>
                    </div>
            
                    <p class="review">${reviewText}</p>
                </div>
            `;

            reviewPatternStars = ``;

            index++;
            if(index != 0 && index <= 2){
                reviewsList.insertAdjacentHTML("afterbegin", reviewPattern);
                reviewPattern = ``;
            }
        });

        if(index === 0){
            reviewsList.removeChild(buttonReviewsListMore.closest(".icon_arrow_down"));
            reviewsList.insertAdjacentHTML("beforeend", `<h1 class="reviews_none">Нет отзывов</h1>`);
        } else if(index < 3){
            reviewsList.removeChild(buttonReviewsListMore.closest(".icon_arrow_down"));
        }
    },
    error: function() {
        reviewsList.removeChild(buttonReviewsListMore.closest(".icon_arrow_down"));
        reviewsList.insertAdjacentHTML("beforeend", `<h1 class="reviews_none">Нет отзывов</h1>`);
    }
});


buttonReviewsListMore.addEventListener("click", (e) => {
    e.preventDefault();
    reviewsList.removeChild(buttonReviewsListMore.closest(".icon_arrow_down"));
    reviewsList.insertAdjacentHTML("beforeend", reviewPattern);
});