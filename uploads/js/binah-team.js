function teamInit() {
    let persons=``;
    for (let i=0; i<team.length; i++){
        let obj=`
            <div id="teamPopup${team[i].id}" class='binahTeamPopup' style='display:1none;'>
                <!--<div class='binahTeamPopupImage' style='background-image:url("${team[i].image}")'></div>-->
                <div class='binahTeamPopupImage'><img src='${team[i].image}' /></div>
                <div class='binahTeamPopupDescription'>
                    <div class='binahTeamPopupName h2'>${team[i].name}</div>
                    <hr />
                    <div class='binahTeamPopupRole h3'>${team[i].role}</div>
                    <div class='binahTeamPopupInfo'>${team[i].content}</div>
                </div>
            </div>
        `;
        persons+=obj;
    }
    jQuery('#teamContainer2').append(persons);
    let popup2 = new Popup({
    });
}


window.addEventListener("DOMContentLoaded", function () {
    teamInit();    
}, false);