function isMobile() {
	if (page.isMobile){
		return true;
	} else {
		return false;
	}
}

function isSmallScreen(){
	if (window.outerWidth<1024) {
		return true;
	} else {
		return false;
	}
}
function isTouch() {
	return (('ontouchstart' in window) ||
		(navigator.maxTouchPoints > 0) ||
		(navigator.msMaxTouchPoints > 0));
}

function isIos() {
	if (/iPhone|iPod/.test(navigator.userAgent)) {
		return true;
	} else {
		return false;
	}
}


(function ($) {
	if (!isTouch()) {
		let mouseMagic = new MouseMagic();
		document.querySelector('body').classList.add('hasHover');
	}
	
	if (isIos()) {
		document.querySelector('body').classList.add('ios');
	}
	
})(jQuery);
