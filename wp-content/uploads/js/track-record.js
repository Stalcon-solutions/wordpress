function trackRecordInit(){
    let popupContent='';
    for (let i=0; i<mapPoi.poi.length; i++){
        popupContent+=`
            <div id='mapPinContent${mapPoi.poi[i].id}' class='popupContent'>
                <div class='mapPinContentContainer'>
                    <div class='mapPinContentImage' style="background-image:url(${mapPoi.poi[i].image});"></div>
                    <div class='mapPinContentText'>
                        <h4>${mapPoi.poi[i].name}</h4>
                        ${mapPoi.poi[i].content}
                        <hr />
                        <div class='mapPinContentContainerBottom'>${mapPoi.poi[i].bottom}</div>
                    </div>
                </div>
                
            </div>
        `;
    }
    let el=`<div style='display:none;'>${popupContent}</div>`;
    jQuery('body').append(el);
}

// run after DOM loaded
window.addEventListener("DOMContentLoaded", function () {
    trackRecordInit();
	
}, false);