class MouseMagic {
	constructor() {
		let cursorMagic = document.createElement('div');
		cursorMagic.setAttribute('id', 'cursorMagic');
		cursorMagic.style.zIndex = 9999;
		cursorMagic.style.opacity= 0;
		document.body.appendChild(cursorMagic);
		document.addEventListener("mousemove", this.changeCoordinates);
	}
	changeCoordinates(event) {
		var cursorMagic = document.getElementById("cursorMagic");
		cursorMagic.style.opacity=1;
		cursorMagic.style.left = event.clientX + "px";
		cursorMagic.style.top = event.clientY + "px";
	}
}