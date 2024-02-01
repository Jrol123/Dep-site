let vkrTopicBlock = document.querySelector(".vkr_topic_block");
let vkrTopicBlockInputs = vkrTopicBlock.querySelector(".input_fields");
let buttonConfirm = vkrTopicBlock.querySelector(".button_confirm");

let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

buttonConfirm.addEventListener("click", (e) => {
    e.preventDefault();
    $.ajax({
        url: `/vkr/vkr-booking-topics/`,
        type: 'post',
        headers: {'X-CSRFToken': csrfToken},
        data: {
            topic: vkrTopicBlockInputs.querySelector('textarea').value,
            full_name: vkrTopicBlockInputs.querySelector('input[name="full_name"]').value,
            telephon: vkrTopicBlockInputs.querySelector('input[name="telephon"]').value,
        },
        success: function(request){
            popupTooltipOpen("Вы записались на защиту ВКР", false);
        },
        error: function() {
            popupTooltipOpen("Что-то пошло не так. Пожалуйста попробуйте еще раз", true);
        }
    });
});