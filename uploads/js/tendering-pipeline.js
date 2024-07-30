function tenderingMapInit(){
    let popupContent='';
    for (let i=0; i<mapPoi.poi.length; i++){
        let confirmed="";
        if (mapPoi.poi[i].confirmed=="1") {
            confirmed="<div class='confirmed'></div>";
        }
        popupContent+=`
            <div id='mapPinContent${mapPoi.poi[i].id}' class='popupContent'>
            ${confirmed}
                <div class='mapPinContentContainer'>
                    <div class='mapPinContentImage' style="background-image:url(${mapPoi.poi[i].image});"></div>
                    <div class='mapPinContentText'>
                        <h2>${mapPoi.poi[i].name}</h2>
                        <hr>
                        <div class='address'>
                            <div class='addressIcon'></div><h3>${mapPoi.poi[i].address}</h3>
                        </div>
                        
                        <div class='client'><b>Client:</b> ${mapPoi.poi[i].client}</div>
                        
                        <div class='stat' style='margin-top:40px;'>
                            <div class='statsValue'>${mapPoi.poi[i].value}</div>
                            <div class='statsName'>Project Value</div>
                        </div>

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
    tenderingMapInit();
	
}, false);