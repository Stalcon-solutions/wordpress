class Autoplay{
	constructor(params){
		this.pageChangeTime = params.pageChangeTime;
		this.startButtonClass = params.startButtonClass;
		this.stopButtonClass = params.stopButtonClass;
		this.pageChangeTimer;
		this.sessionVariable ='visionPitchAutoPlay';

	}
	get isRun(){
		// проверить включен ли autoplay
		let status = window.sessionStorage.getItem(this.sessionVariable);
		if (status == '1' && page.nextPageUrl != "") {
			return true;
		} else {
			return false;
		}
	}
	start(){
		this.buttonTurnOn();
		this.saveSessionVar();
		// запуск таймера
		this.pageChangeTimer = setTimeout(this.changePage, this.pageChangeTime * 1000);
		let progressBarDiv = '<div class="autoPlayProgressBar" style="animation-duration:' + this.pageChangeTime + 's;"></div>';
		jQuery('main').after(progressBarDiv);
	}
	stop(){
		if (this.isRun) {
			this.buttonTurnOff();
			
			// записать в куку visionPitchAutoPlay false
			this.resetSessionVar();
			
			// остановить таймер
			clearTimeout(this.pageChangeTimer);
			this.hideProgressBar();
		}
	}
	toggle(){
		if (this.isRun){
			this.stop();
		} else {
			this.start();
		}
	}
	changePage(){
		if (page.nextPageUrl!='') {
			window.open(page.nextPageUrl, '_self');
		} else {
			this.stop();
		}
	}
	buttonTurnOn(){
		// смена кнопки на активную
		jQuery('.' + this.startButtonClass).parent('.w-btn-wrapper').css('display', 'none');
		jQuery('.' + this.startButtonClass).css('display', 'none');
		jQuery('.' + this.stopButtonClass).parent('.w-btn-wrapper').css('display', 'block');
		jQuery('.' + this.stopButtonClass).css('display', 'block');
	}
	buttonTurnOff() {
		// смена кнопки на обычную
		jQuery('.' + this.stopButtonClass).parent('.w-btn-wrapper').css('display', 'none');
		jQuery('.' + this.stopButtonClass).css('display', 'none');
		jQuery('.' + this.startButtonClass).parent('.w-btn-wrapper').css('display', 'block');
		jQuery('.' + this.startButtonClass).css('display', 'block');
	}
	showProgressBar(){
		let progressBarDiv = '<div class="autoPlayProgressBar" style="animation-duration:' + this.pageChangeTime + 's;"></div>';
		jQuery('main').after(progressBarDiv);
	}
	hideProgressBar(){
		jQuery('.autoPlayProgressBar').remove();
	}
	saveSessionVar(){
		window.sessionStorage.setItem(this.sessionVariable, '1');
	}
	resetSessionVar(){
		window.sessionStorage.setItem(this.sessionVariable, '0');
	}

}



const autoplayStartButtonClass ="autoplayStart";
const autoplayStopButtonClass ="autoplayStop";

const autoplay = new Autoplay({
	pageChangeTime: 20,
	startButtonClass: autoplayStartButtonClass,
	stopButtonClass: autoplayStopButtonClass,

});
if (autoplay.isRun) {
	autoplay.start();
}


(function ($) {
	// autoPlay();
	jQuery('.' + autoplayStartButtonClass).on("click", function () {
		autoplay.start();
	});
	jQuery('.' + autoplayStopButtonClass).on("click", function () {
		autoplay.stop();
	});
})(jQuery);
