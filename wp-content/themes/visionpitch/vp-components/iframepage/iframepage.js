class IframePage {
	constructor(params) {
		this.chId = params.childrenId;
		// DOM created but not finish loading
		document.addEventListener("DOMContentLoaded", () => {
			this.createIframe();
			this.addEventToChildren();	// when children (re)Load - fires event
			this.checkHash();			// if start URL has hash - open needfull page inside iframe
			this.backButtonCheck();		// if browserBack button pressed
		});
		
	}
	createIframe(){
		var elIFrame = document.createElement("iframe");
		elIFrame.src = '/start/';
		elIFrame.id = 'mainIframe';
		elIFrame.className = 'mainIframe';
		elIFrame.setAttribute("name", "mainIframe");
		elIFrame.setAttribute("allowFullscreen","");
		elIFrame.setAttribute("seamless","");
		document.querySelector('body').appendChild(elIFrame);
	}
	backButtonCheck() {
		let chId = this.chId;
		window.onhashchange = function () {
			let parentPage = window.location.hash.replaceAll('#', '').replaceAll('/', '');
			let childrenPage = window.document.getElementById(chId).contentWindow.location.pathname.replaceAll('#', '').replaceAll('/', '');;
			// return;
			if (parentPage != childrenPage) {
				window.location.reload();
			}
		}
	}
	addEventToChildren() {
		let iframeChanged = this.iframeChanged;
		document.getElementById(this.chId).addEventListener('load', () => {
			iframeChanged(this.chId, this);
		})
	}
	iframeChanged(chId, context) {
		let iframeUrl = document.getElementById(chId).contentWindow.location.href;
		let newUrl = new URL(iframeUrl);
		let newHash = newUrl.pathname.replaceAll('/', '');
		window.location.hash = newHash;

		// change iframe title
		let newTitle = document.getElementById(chId).contentWindow.document.title;
		if (newTitle) context.changeTitle(newTitle);
	}
	changeTitle(newTitle) {
		document.title = newTitle;
	}

	// if Parent URL has hash, then open Children with this page name
	checkHash() {
		if (window.location.hash) {
			let newUrl = "/" + window.location.hash.substring(1) + "/";
			document.getElementById(this.chId).src = newUrl;
		}
	}

}

let vpIframePage = new IframePage({
	childrenId: 'mainIframe',
});