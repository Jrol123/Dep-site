let body = document.querySelector("body");
let popupTooltipModel;

function popupTooltipOpen(popupTooltipText, error){
    if(!body.querySelector(".popup_tooltip")){
        if(error){
            popupTooltipModel = `
                <div class="popup_tooltip">
                    <div class="tooltip_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                            <path fill="#F44336" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)"/>
                            <path fill="#F44336" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)"/>
                        </svg>
                    </div>
                    <p class="tooltip_text">${popupTooltipText}</p>
                </div>
            `;
    
            body.insertAdjacentHTML("afterbegin", popupTooltipModel);
        } else{
            popupTooltipModel = `
                <div class="popup_tooltip">
                    <div class="tooltip_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                            <path fill="#43A047" d="M40.6 12.1L17 35.7 7.4 26.1 4.6 29 17 41.3 43.4 14.9z"/>
                        </svg>
                    </div>
                    <p class="tooltip_text">${popupTooltipText}</p>
                </div>
            `;
    
            body.insertAdjacentHTML("afterbegin", popupTooltipModel);
        }
    
        let popupTooltip = document.querySelector(".popup_tooltip");
    
        setTimeout(function() {
            popupTooltip.classList.add("_active");
        }, 10);
    
        setTimeout(function() {
            popupTooltip.classList.remove("_active");
            setTimeout(function() {
                body.removeChild(popupTooltip);
            }, 1550);
        }, 4000);
    }
}