function trackRecordInit(){
    let popupContent='';
    for (let i=0; i<mapPoi.poi.length; i++){
        popupContent+=`
            <div id='mapPinContent${mapPoi.poi[i].id}' class='popupContent'>
                <div class='mapPinContentContainer'>
                    <div class='mapPinContentImage' style="background-image:url(${mapPoi.poi[i].image});"></div>
                    <!--<div class='mapPinContentImage'><img src='${mapPoi.poi[i].image}' /></div>-->
                    <div class='mapPinContentText'>
                        <h2>${mapPoi.poi[i].name}</h2>
                        <hr>
                        <h3><div class='trackRecord--${mapPoi.poi[i].stage}--${mapPoi.poi[i].type}'></div><span style='text-transform:capitalize'>${mapPoi.poi[i].stage}&nbsp;${mapPoi.poi[i].type}</span>&nbsp;project</h3>
                        <div class='mapPinContentContainerBottom'>${mapPoi.poi[i].bottom}</div>
                        <div><b>Project Description</b></div>
                        ${mapPoi.poi[i].content}
                    </div>
                </div>
                
            </div>
        `;
    }
    let el=`<div style='display:none;'>${popupContent}</div>`;
    jQuery('body').append(el);

    jQuery(".trackRecordLegend>div").click(function (e) { 
        if (jQuery(this).hasClass('legendSelected')){
            jQuery(".trackRecordLegend>div").removeClass('legend50');    
            jQuery(".trackRecordLegend>div").removeClass('legendSelected');    
            jQuery('.mapPin').show();
        } else {
            jQuery(".trackRecordLegend>div").addClass('legend50');
            jQuery(this).removeClass('legend50');
            jQuery(this).addClass('legendSelected');
            let filterPoi=jQuery(this).attr('data-filter-poi');
            jQuery('.mapPin').hide();
            jQuery(`.mapPin.${filterPoi}`).show();
        }        
    });
}


if (document.querySelector('body').dataset.domain.indexOf('binah-map')>=0){
    window.sessionStorage.setItem('visionPitchHelpCounter', '1');
    jQuery('.headerProjectTitle').html('Powered by Vision Pitch');
}

// run after DOM loaded
window.addEventListener("DOMContentLoaded", function () {
    trackRecordInit();
}, false);