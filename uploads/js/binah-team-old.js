function teamInit() {
    let persons=`<div class='teamTitle'>Managing Directors<br />Owners</div>`;
    for (let i=0; i<team.length; i++){
        let obj=`
            <div class='teamPerson' style='background-image:url("${team[i].image}")' data-popup-id="teamPopup${i}">
                <div class='teamPersonGradient'></div>
                <div class='teamPersonNameRole'>
                    <div class='teamPersonName'>
                        ${team[i].name}
                    </div>
                    <div class='teamPersonRole'>
                        ${team[i].role}
                    </div>
                </div>
            </div>
            <div id="teamPopup${i}" class='binahTeamPopup'>
                <div class='binahTeamPopupImage' style='background-image:url("${team[i].image}")'></div>
                <div class='binahTeamPopupDescription'>
                    <div class='binahTeamPopupName h2'>${team[i].name}</div>
                    <hr />
                    <div class='binahTeamPopupRole h3'>${team[i].role}</div>
                    <div class='binahTeamPopupInfo'>${team[i].content}</div>
                </div>
            </div>
        `;
        if (i==1) {
            obj+="<div class='teamDivider'></div><div class='teamTitle'>Advisory</div>"
        }
        if (i==3) {
            obj+="<div class='teamDivider'></div><div class='teamTitle'>Executive<br />Team</div>"
        }
        persons+=obj;
    }
    jQuery('#teamContainer').append(persons);
    let popup2 = new Popup({
    });
}


window.addEventListener("DOMContentLoaded", function () {
    teamInit();    
}, false);