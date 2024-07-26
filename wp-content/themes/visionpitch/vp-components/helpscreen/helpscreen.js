class Helpscreen {
	constructor(props) {
		this.helpScreen;
		this.tooltips = [];
		this.helpElements = props.helpElements;
		this.addHelpScreen();
		this.runHelpTooltips(this.helpElements);
	}
	addHelpScreen() {
		this.helpScreen = document.createElement('div');
		this.helpScreen.className = 'helpScreen';
		this.blackScreen = document.createElement('div');
		this.blackScreen.className = 'helpScreenBlackBg';
		let closeButton = document.createElement('div');
		closeButton.className = "helpScreenClose";
		closeButton.classList.add('buttonPrimary');
		closeButton.innerHTML = "<i class='material-icons'>close</i>"
		this.helpScreen.addEventListener('click', () => { this.closeHelpScreen(); });
		closeButton.addEventListener('click', () => { this.closeHelpScreen(); });
		this.helpScreen.append(closeButton);
		document.querySelector('body').append(this.helpScreen);
		document.querySelector('body').append(this.blackScreen);
	}
	runHelpTooltips(helpElements) {
		let elements = helpElements.elements;
		let texts = helpElements.texts;
		let placements = helpElements.placements;
		let showAtSmallScreen = helpElements.showAtSmallScreen;
		elements.forEach((e, i) => {
			if (!isSmallScreen() || showAtSmallScreen[i]) {			
				let ttip = tippy(elements[i], {
					content: texts[i],
					trigger: 'manual',
					placement: placements[i],
					animation: 'shift-toward',
					inertia: true,
					onHide(instance) { return false; },
				});
				this.tooltips.push(ttip);
				setTimeout(function () { ttip[0].show(); }, 500 + 500 * i);
			}
			
		});
	}

	closeHelpScreen() {
		this.tooltips.forEach((e) => {
			e[0].destroy();
		});
		jQuery('.helpScreen').fadeOut();
		jQuery('.helpScreenBlackBg').fadeOut();
	}
}


// run after DOM loaded
window.addEventListener("DOMContentLoaded", function () {
	let helpCounter = window.sessionStorage.getItem('visionPitchHelpCounter');
	if (!helpCounter) {
		help = new Helpscreen({
			helpElements: {
				elements: ['.footerCenter', '.slideTitleContainer', '.helpScreenClose'],
				showAtSmallScreen: [true, false, true],
				placements: ['top', 'bottom', 'left'],
				texts: [
					'<div class="helpScreenHeader">01</div>Use the arrows to move forward or back through your presentation',
					'<div class="helpScreenHeader">02</div>Click a category to jump to that specific slide',
					'Close this screen',
				],
			}
		})
	}
	window.sessionStorage.setItem('visionPitchHelpCounter', '1');
}, false);