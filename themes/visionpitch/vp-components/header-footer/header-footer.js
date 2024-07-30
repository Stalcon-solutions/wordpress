class Header{
	constructor(params){
		this.pageNumber=params.pageNumber;

		let header = document.getElementById('header');
		if (header) {
			let height = header.offsetHeight;
			document.querySelector('.headerProjectTitle').style.height = height + "px";
			
			// add Slide number
			let slideNumber = this.pageNumber;
			let slideNumberElement = "<div class='slideNumber'>" + slideNumber + "</div>";
			document.querySelector('.headerProjectTitle').innerHTML += slideNumberElement;
		}
	}
	show(){
		document.getElementById('header').style.opacity = 1;
		this.makeTopNavigator();
	}
	// top left navigator
	makeTopNavigator() {
		jQuery('.slideTitleItem:not(.slideTitleItemActive)').click(function () {
			let newUrl = jQuery(this).attr('slideurl');
			if (newUrl != '') {
				window.open(newUrl, '_self');
			}
		});

		jQuery(".slideTitleItem").hover(
			function () {
				jQuery(this).prev(".slideTitleItem").addClass("slideTitleItemHoverPrev");
			}, function () {
				jQuery(this).prev(".slideTitleItem").removeClass("slideTitleItemHoverPrev");
			}
		);

	}
}

class Footer{
	constructor(params){
		this.id=params.id;
		this.pageMap=params.pageMap;
		this.page360 = params.page360;
		this.pageDraw = params.pageDraw;
		this.pageRender = params.pageRender;
		this.pageRenderLabel = params.pageRenderLabel;

		
		this.footerDiv = document.querySelector('.'+this.id);
		let leftBlock = this.footerDiv.querySelector('.footerLeft');
		let leftButtons =`
			<div class='buttonPrimary homeButton' onclick='page.gotoStart();'></div>
			<div class='buttonPrimary autoplayStart'></div>
			<div class='buttonPrimary autoplayStop'></div>
			<div class='buttonPrimary drawModeButton' id='drawModeButton' onclick="draw.open();"></div>
		`;

		let centerBlock = this.footerDiv.querySelector('.footerCenter');
		let centerButtons = `
			<div class='buttonPrimary prevButton ' onclick="page.prevNext('prev','.prevButton');"></div>
			<div class='buttonPrimary nextButton  ' onclick="page.prevNext('next','.nextButton');"></div>
		`;

		let rightBlock = this.footerDiv.querySelector('.footerRight');
		let rightButtons=`
			<div class='buttonPrimary fullscreenButtonEnter'></div>
			<div class='buttonPrimary fullscreenButtonExit'></div>


			<div class='footerLogo'>
				<a href='${params.logoLink}' target='_blank'>
					<img width="40" height="22" src="${vpThemeSettings.directory}/images/vp-small-logo.png">
				</a>
			</div>

			
		`;
		jQuery(leftBlock).html(leftButtons);
		jQuery(centerBlock).html(centerButtons);
		jQuery(rightBlock).html(rightButtons);

		if (this.pageRender != -1) {
			this.makeRenderLabel();
		}

	}
	show(){
		if (this.pageMap==-1) jQuery('.iconMap').hide();
		if (this.page360==-1) jQuery('.icon360').hide();
		if (this.pageDraw == -1) jQuery('.drawModeButton').hide();
		this.footerDiv.style.opacity = 1;
	}
	makeRenderLabel(){
		let text = this.pageRenderLabel;
		let label=document.createElement('div');
		label.className ='renderLabel';
		label.innerHTML=text;
		jQuery('main').append(label);
	}

}

const pageNumber = page.pageIndex;


const header = new Header({
	pageNumber: pageNumber,
});

const footer = new Footer({
	id:'footer',
	logoLink:'https://visionpitch.com.au/',
	pageMap: page.pageType.indexOf('map'),
	page360: page.pageType.indexOf('pano'),
	pageDraw: page.pageType.indexOf('draw'),
	pageRender: page.pageType.indexOf('render'),
	pageRenderLabel:"* Artist's Impression Only *",
});







// run after DOM loaded
window.addEventListener("DOMContentLoaded", function () {
	header.show();
	footer.show();
}, false);