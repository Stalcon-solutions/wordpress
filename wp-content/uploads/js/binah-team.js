function runTeamCarousel(){
    if (team.length > 0) {
    for (let i = 0; i < team.length; i++) {
        let name = team[i].name;
        let role = team[i].role;
        let image = team[i].image;
        let thumb = team[i].thumb;
        let content = team[i].content;
        if (name != '') {
            let item = `
            <div class='personNew f-carousel__slide' data-thumb-src='${thumb}'>
                <div class='personNewImage'><img src='${image}' alt='${name}' /></div>    
                <div class='personNewName'>${name}</div>
                <div class='personNewRole'>${role}</div>
                
                <div class='personNewContent'>${content}</div>

           </div>
        `;
            jQuery('.teamContainer').append(item);
        }
    }
    
    const container = document.getElementById("myCarousel");
    const options = {
        infinite: false,
        Thumbs: {
            type: "classic",
          },
    };
    new Carousel(container, options, { Thumbs });
}
}

window.addEventListener("DOMContentLoaded", function () {
    runTeamCarousel();
}, false);