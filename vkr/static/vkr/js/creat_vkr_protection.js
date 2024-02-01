let buttonMembersCommission = document.querySelector(".vkr_protection_organization .input_fields .button_members_commission");
let membersCommission = document.querySelector(".vkr_protection_organization .input_fields .members_commission");
let inputField = `
    <input name="full_name_members" type="text" placeholder="Введите фио члена комисии">
`;

let buttonConfirm = document.querySelector(".vkr_protection_organization .button_confirm");

let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');



buttonMembersCommission.addEventListener("click", (e) => {
    e.preventDefault();
    membersCommission.insertAdjacentHTML("afterbegin", inputField);
});

buttonConfirm.addEventListener("click", (e) => {
    e.preventDefault();

    let date = document.querySelector('.date .input_field input[name="date"]').value;
    let time = document.querySelector('.date .input_field input[name="time"]').value;
    let groups = Array.from(document.querySelectorAll('.groups .select .select__text .group')).map(group => group.innerText);
    let fullNameMembers = Array.from(document.querySelectorAll('.members_commission input[name="full_name_members"]')).map(fullName => fullName.value);
    let fullNameSecretary = document.querySelector('.members_commission input[name="full_name_secretary"]').value;

    $.ajax({
        url: `/vkr/creating-vkr-protection/`,
        type: 'post',
        headers: {'X-CSRFToken': csrfToken},
        data: {
            date: date,
            time: time,
            groups: groups,
            fullNameMembers: fullNameMembers,
            fullNameSecretary: fullNameSecretary,
        },
        success: function(request){
            popupTooltipOpen("Комиссия успешно создана", false);   
        },
        error: function() {
            popupTooltipOpen("Что-то пошло не так. Пожалуйста попробуйте еще раз", true);
        }
    });
})