class Fullscreen {
	constructor(params) {
		this.element = document;
		this.enterButton=params.enterButton;
		this.exitButton = params.exitButton;
		this.handleFullscreenChange = this.handleFullscreenChange.bind(this);
		this.getElement();
		this.addCheckEvent();
	}
	getElement() {
		if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement)
			this.element = document;
		if (window.parent.document.fullscreenElement || window.parent.document.webkitFullscreenElement || window.parent.document.mozFullScreenElement)
			this.element = window.parent.document;
		if (top.document.fullscreenElement || top.document.webkitFullscreenElement || top.document.mozFullScreenElement)
			this.element = top.document;
		if (parent.document.fullscreenElement || parent.document.webkitFullscreenElement || parent.document.mozFullScreenElement)
			this.element = parent.document;
	}

	enter() {
		// document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		if (!this.isFullscreen) {
			this.element = parent.document.getElementById('mainIframe');
			if (!this.isIframe) {
				this.element = document.documentElement;
			}
			// if (this.element.requestFullscreen) {
			// 	this.element.requestFullscreen();
			// } else if (this.element.webkitrequestFullscreen) {
			// 	this.element.webkitRequestFullscreen();
			// } else if (this.element.mozRequestFullscreen) {
			// 	this.element.mozRequestFullScreen();
			// }


			if (this.element.requestFullscreen) {
				this.element.requestFullscreen();
			} else if (this.element.mozRequestFullScreen) {
				this.element.mozRequestFullScreen();
			} else if (this.element.webkitRequestFullscreen) {
				this.element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			} else if (this.element.msRequestFullscreen) {
				this.element.msRequestFullscreen();
			}
		}
	}

	exit() {
		if (this.isFullscreen) {
			this.getElement();
			if (this.element.exitFullscreen) {
				this.element.exitFullscreen();
			} else if (this.element.mozCancelFullScreen) { // Firefox
				this.element.mozCancelFullScreen();
			} else if (this.element.webkitExitFullscreen) { // Chrome, Safari and Opera
				this.element.webkitExitFullscreen();
			} else if (this.element.msExitFullscreen) { // IE/Edge
				this.element.msExitFullscreen();
			}
		}
	}
	get isFullscreen() {
		this.getElement();
		if (document.fullscreenElement ||
			this.element.fullscreenElement ||
			this.element.webkitFullscreenElement ||
			this.element.mozFullScreenElement
		) {
			return true;
		} else {
			return false;
		}
	}
	get isIframe() {
		if (window.self !== window.parent) {
			return true;
		} else {
			return false;
		}
	}
	addCheckEvent(){
		// добавляем события для проверки режима полного экрана
		this.getElement();
		
		document.addEventListener('DOMContentLoaded', () => this.handleFullscreenChange());

		document.addEventListener('fullscreenchange', () => this.handleFullscreenChange());
		document.addEventListener('webkitfullscreenchange', () => this.handleFullscreenChange());
		document.addEventListener('mozfullscreenchange', () => this.handleFullscreenChange());

		parent.document.addEventListener('fullscreenchange', () => this.handleFullscreenChange());
		parent.document.addEventListener('webkitfullscreenchange', () => this.handleFullscreenChange());
		parent.document.addEventListener('mozfullscreenchange', () => this.handleFullscreenChange());

		top.document.addEventListener('fullscreenchange', () => this.handleFullscreenChange());
		top.document.addEventListener('webkitfullscreenchange', () => this.handleFullscreenChange());
		top.document.addEventListener('mozfullscreenchange', () => this.handleFullscreenChange());

	}
	handleFullscreenChange(){
		let enterButton = this.enterButton;
		let exitButton = this.exitButton;
		// Проверяем включени ли Fullscreen
		if (!this.isFullscreen) {
			// если не fullscreen то выключаем кнопки
			jQuery(exitButton).hide();
			jQuery(enterButton).show();
			jQuery('body').removeClass('fullscreen');
		} else {
			jQuery(enterButton).hide();
			jQuery(exitButton).show();
			jQuery('body').addClass('fullscreen');
		}
	}

}
let fullscreen = new Fullscreen({
	enterButton: document.querySelector('.fullscreenButtonEnter'),
	exitButton: document.querySelector('.fullscreenButtonExit'),
});

jQuery('.fullscreenButtonEnter').click(function () {
	fullscreen.enter();
});
jQuery('.fullscreenButtonExit').click(function () {
	fullscreen.exit();
});