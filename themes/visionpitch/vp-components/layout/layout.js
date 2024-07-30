class Layout {
	constructor(props) {
		this.pageObj = props.pageObj;
		this.bg = props.background;
		this.pageType=props.pageType;
		let mainElement=document.querySelector('main');
		if (!mainElement) {
			return false;
		}

		
		let bgElement = document.createElement('div');
		bgElement.classList.add('pageBg');
	
		let gradientSize = this.bg ? '50%' : '30%';
		let colorGradientStart=getComputedStyle(document.body).getPropertyValue('--colorGradientStart');
		let colorGradientEnd=getComputedStyle(document.body).getPropertyValue('--colorGradientEnd');
		let gradient = props.gradient ? `linear-gradient(to right, ${colorGradientStart} 0%, ${colorGradientEnd} ${gradientSize})` : '';
		gradient = props.startPage ? `linear-gradient(to right, ${colorGradientStart}, ${colorGradientEnd} 60%)` : gradient;

		let bgImage = this.bg ? `url(${this.bg})` : `none`;	
		let bgStyle = gradient ? `${gradient}, ${bgImage}` : `${bgImage}`;
		bgElement.style.backgroundImage = bgStyle;


		// Add Animation of BG image
		if (this.bg) {
			bgElement.classList.add('pageBgAnimated');
		}
		
		mainElement.appendChild(bgElement);
		

		
		let permeable = props.permeable ? 'none' : 'all';
		let leftSide=document.querySelector('.'+props.leftSideClass);
		if (leftSide) leftSide.style.pointerEvents = `${permeable}`;

		Layout.moreInfoButtonInit();
		this.createBlinds();
		this.createVerticalMessage();
		this.animateApearance();
		this.addPageMethods();
	}
	// More info button init
	static moreInfoButtonInit(){
		jQuery(".moreInfoOpen").off("click").on("click", function () {
			jQuery(this).prev('.moreInfoText').slideToggle();
			jQuery(this).toggleClass('moreInfoOpened');
		});
	}

	addPageMethods() {
		let showBlindsScreen = this.showBlindsScreen;
		this.pageObj.prevNext = function (direction = 'next', obj) {
			if (obj) {
				jQuery(obj).addClass('btnDisabled');
			}
			let newUrl = '';
			if (direction == 'next') {
				newUrl = page.nextPageUrl;
			} else {
				jQuery('.blindsScreenPrev').attr('show-this', '1');
				newUrl = page.prevPageUrl;
			}
			if (newUrl != '') {
				window.location.replace(newUrl);
			}
			showBlindsScreen();

		}
		this.pageObj.gotoStart = function () {
			window.location.replace(this.pageStartUrl);
		}
	}

	createBlinds(){
		// Blinds close when go from page
		let blindsScreenNext = document.createElement('div');
		blindsScreenNext.className = 'blindsScreenNext';
		let blindsScreenPrev = document.createElement('div');
		blindsScreenPrev.className = 'blindsScreenPrev';
		document.querySelector('main').after(blindsScreenNext);
		document.querySelector('main').after(blindsScreenPrev);
		if ('onbeforeunload' in window) {
			window.addEventListener('beforeunload', showBlindsScreen);	// for Windows
		} else {
			window.addEventListener('unload', showBlindsScreen);	// for MacOs
		}

		function showBlindsScreen() {			
			let blindsScreenObj = '.blindsScreenNext';
			if (jQuery('.blindsScreenPrev').attr('show-this') == '1') {
				blindsScreenObj = ".blindsScreenPrev";
			}
			jQuery(blindsScreenObj).addClass('blindsScreenVisible');
			jQuery('#mainContentBlock').fadeOut(1500);
		}

	}

	showBlindsScreen() {
		let blindsScreenObj = '.blindsScreenNext';
		if (jQuery('.blindsScreenPrev').attr('show-this') == '1') {
			blindsScreenObj = ".blindsScreenPrev";
		}
		jQuery(blindsScreenObj).addClass('blindsScreenVisible');
		jQuery('#mainContentBlock').fadeOut(1500);
	}

	// Animate elements at start
	animateApearance(){
		let rightElements = document.querySelectorAll('.animatedChildrens > div');
		rightElements.forEach((e,i)=>{
			rightElements[i].style.transitionDelay=300+300*i+"ms";
			rightElements[i].style.transform="scale(1)";
			rightElements[i].style.opacity="1";
		});
		let leftElements = document.querySelectorAll('.leftSide');
		leftElements.forEach((e, i) => {
			leftElements[i].style.transform = "translateX(0)";
			leftElements[i].style.opacity = "1";
		});
	}
	createVerticalMessage(){
		let verticalScreenLocker = document.createElement('div');
		verticalScreenLocker.className = 'verticalScreenLocker';
		verticalScreenLocker.innerHTML =`<div><img src="${vpThemeSettings.directory}/images/rotate-device.svg" style="width:100px; margin-bottom:20px;" alt="rotate your device" /><br />For the best experience<br />rotate your device</div>`;
		// verticalScreenLocker.addEventListener('touchmove',()=>{
		// 	document.querySelector('.verticalScreenLocker').style.display='none';
		// });
		document.querySelector('main').after(verticalScreenLocker);
	}
}


// run after DOM loaded
window.addEventListener("DOMContentLoaded", function () {
	// проверяем, что запущен Clean Page Template
	

		let layout = new Layout(
			{
				pageObj: page,
				pageType:page.pageType,
				background: page.pageBG,
				leftSideClass: 'leftSide',
				startPage: page.isStartPage,
				gradient: page.pageLeftSide.indexOf('gradient') > -1 ? true : false,
				permeable: page.pageLeftSide.indexOf('permeable') > -1 ? true : false,
			}
		)


}, false);