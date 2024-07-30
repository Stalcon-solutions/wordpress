let uniqueObjects=[
    {
        name:"Walker Corporation",
        logo:["walker-logo.png"],
        description:"Building on over 50 years of experience, Lang and the Walker team have cemented a reputation as Australia’s most respected urban transformation specialists. Their high benchmark for outstanding quality has seen them deliver large-scale, complex projects spanning the entire property spectrum, which has made the Walker brand synonymous with excellence.",
        stat:["Projects Completed","1,200+","Project Pipeline","$35billion","Homes To Be Delivered","85,000+"],
        currentImages:["50 First Ave","current-images-01.jpg"],
        tenderingName:"Maroochydore Residentail",
        tenderingImage:"tendering-images-01.jpg",
        tenderingDescription:"50 First Ave, Maroochydore QLD 4558",
        tenderingProjectValue:"$100M",
        tenderingProjectLabel:"Projects Value",
    },

    {
        name:"Frasers Property",
        logo:["frasers-logo.png"],
        description:"Frasers Property develop residential land, housing, and apartments and have delivered over 145,000 homes during their legacy. They develop build-to-rent, commercial, retail and mixed-use properties. Their activities also encompass the ownership and management of investment property, incorporating property and asset management services.",
        stat:["Homes Delivered","145,000","Years Of Operation","100","Units In Pipeline","11,000"],
        currentImages:["Vela Shell Cove","current-images-02.jpg","Ed Square","current-images-03.jpg"],
        tenderingName:"Shell Cove",
        tenderingImage:"tendering-images-02.jpg",
        tenderingDescription:"5 Waterfront Promenade, Shell Cove NSW 2529",
        tenderingProjectValue:"$116M",
        tenderingProjectLabel:"Combined Projects Value",
    },

    {
        name:"Aware Real Estate  |  Barings",
        logo:["aware-logo.png","barings-logo.png"],
        description:"Aware Real Estate is the property investment platform responsible for the strategic performance and management of Aware Super’s directly owned Australian property portfolio. With a steadfast focus on realising more from each opportunity, interaction and partnership, Aware Real Estate is committed to being a positive and responsible player within the property industry. Aware Real Estate leverages collaborations to achieve extraordinary investment outcomes that deliver value not only to members and partners but importantly, to the communities within which they operate.",
        stat:["Portfolio By 2027","$7billion","Units In Pipeline","1,200","Sites In Pipeline","6"],
        currentImages:["Zetland","current-images-04.jpg"],
        tenderingName:"The Mastery Waterloo",
        tenderingImage:"tendering-images-03.jpg",
        tenderingDescription:"44-48 O'Dea Ave, Waterloo NSW 2017",
        tenderingProjectValue:"$200M",
        tenderingProjectLabel:"Projects Value",
    },

];


function createUniquePositioningPopups(){
    let path="/wp-content/uploads/unique-positioning/";
    let popup="";
    for (let i=0; i<uniqueObjects.length;i++){
        let obj=uniqueObjects[i];
        let stats="";
        for (let j=0; j<obj.stat.length; j+=2){
            stats+=`
                <div class='stat'>
                    <div class='statsValue'>${obj.stat[j+1]}</div>
                    <div class='statsName'>${obj.stat[j]}</div>
                </div>
            `;
        }
        let curImgs="";
        for (let j=0; j<obj.currentImages.length; j+=2){
            curImgs+=`
                <div class='curImg'>
                    <div class='curCheck'></div>
                    <div class='curImgName'>${obj.currentImages[j]}</div>
                    <img src="${path}${obj.currentImages[j+1]}" />
                </div>
            `;
        }
        let logos="";
        for (let j=0; j<obj.logo.length; j+=1){
            logos+=`
                <div class="logo"><img src="${path}${obj.logo[j]}" /></div>
            `;
        }
        popup+=`
            <div id="pop${i+1}" class="object popupContent">
                <div class="leftColumn">
                    <h3>Current Project(s)</h3>
                    <div class="curImgsBlock">
                        ${curImgs}
                    </div>
                    <div class='divider40'></div>
                    <h3>Tendering Opportunities</h3>
                    <div class="tenderingBlock">
                        <div class="tenderingBlockImage">
                            <img src="${path}${obj.tenderingImage}" />
                        </div>
                        <div class="tenderingBlockText">
                            <div class='tenderingName'>${obj.tenderingName}</div>
                            ${obj.tenderingDescription}
                            <div class='stat' style='margin-top:40px; width:90%;'>
                                <div class='statsValue'>${obj.tenderingProjectValue}</div>
                                <div class='statsName'>${obj.tenderingProjectLabel}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="rightColumn">
                    <div class="logos">${logos}</div>
                    <div class="name"><h2>${obj.name}<h2></div>
                    <div class="description">${obj.description}</div>
                    <div class="stats">
                        ${stats}
                    </div>
                </div>
            </div>
        `;
    }
    jQuery('.popups').append(popup);
}

window.addEventListener("DOMContentLoaded", function () {
    createUniquePositioningPopups();
}, false);