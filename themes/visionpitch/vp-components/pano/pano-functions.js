// function to calculate Radians from Degrees. Used in callouts
function toRadians(angle) {
	return angle * (Math.PI / 180);
}

// get Custom Node ID (panorama name)
function getPanoName() {
	return pano.getNodeUserdata(pano.getCurrentNode()).customnodeid;
}

window.infoHsLeave = function () {
	var pins = document.querySelectorAll('.floorPlanPin');
	for (i = 0; i < pins.length; i++) {
		pins[i].classList.remove('mapPinHover');
	}
}

function infoHsEnter() {
	let hsId = pano.getVariableValue('hoverHsId');
	if (hsId != '') {
		var pins = document.querySelectorAll('.floorPlanPin');
		for (i = 0; i < pins.length; i++) {
			let pinHsId = pins[i].dataset.hotspot;
			if (pinHsId == hsId) {
				pins[i].classList.add('mapPinHover');
			}
		}
	}
}

function mapPinLeave(el) {
	var hotspots = document.querySelectorAll('.htInfoTooltip');
	for (i = 0; i < hotspots.length; i++) {
		hotspots[i].classList.remove('htInfoHover');
	}
}

function mapPinEnter(el) {
	let hsId = el.target.dataset.hotspot;
	if (hsId != '') {
		pano.getHotspot(hsId).div.querySelector('.htInfoTooltip').classList.add('htInfoHover');
	}
}

function turnPanoToHotspot(el) {
	let hsId = el.target.dataset.hotspot;
	if (hsId != '') {
		let pan = pano.getHotspot(hsId).pan;
		let tilt = pano.getHotspot(hsId).tilt;
		let fov = pano.getFov();
		let speed = 5;
		let roll = pano.getRoll();
		let projection = pano.getProjection();
		if (pan && tilt) {
			pano.moveTo(pan, tilt, fov, speed, roll, projection);
		}
	}
}


// Floor plan window size change (to panoramas with interior floor plan)
function floorplanChangeSizeInit() {
	pano.on("varchanged_floorPlanBig", function () {
		let map = skin._floorplan;
		let mapBig = pano.getVariableValue('floorPlanBig');
		let pins = document.querySelectorAll('.floorPlanPinWithoutPano');
		if (pins.length > 0) {
			for (i = 0; i < pins.length; i++) {
				let x = pins[i].dataset.posX;
				let y = pins[i].dataset.posY;
				let ratioX = pins[i].dataset.bigMapWidth / pins[i].dataset.smallMapWidth;
				let ratioY = pins[i].dataset.bigMapHeight / pins[i].dataset.smallMapHeight;
				if (mapBig) {
					let x2 = parseFloat(x * ratioX);
					let y2 = parseFloat(y * ratioY);
					placeMapPinWithoutPano(pins[i], x2, y2);
				} else {
					placeMapPinWithoutPano(pins[i], x, y);
				}
			}
		}
	});
}


// Вспомогательная функция. См. addMapPinWithoutPano()
// Добавляем пины на карту. Если у них нет панорамы. Например Montario Quarter
function placeMapPinWithoutPano(el, smallMapX, smallMapY) {
	let elWidth = el.offsetWidth;
	let elHeight = el.offsetHeight;
	smallMapX = parseFloat(smallMapX - elWidth / 2);
	smallMapY = parseFloat(smallMapY - elHeight / 2);
	el.style.left = smallMapX + 'px';
	el.style.top = smallMapY + 'px';
}

// Добавляем пины на карту. Если у них нет панорамы. Например Montario Quarter
// Параметры: Заголовок, X на маленькой карте, Y, Ширина большой карты, Высота, ID хотспота для связи
function addMapPinWithoutPano(title, smallMapX, smallMapY, bigMapWidth, bigMapHeight, hotspotId) {
	// let map = skin._floorplan;
	let map = document.querySelector('.floorPlanMap');
	let el = document.createElement('div');
	el.classList.add('ggskin');
	el.classList.add('ggskin_rectangle');
	el.classList.add('floorPlanPin');
	el.classList.add('htInfoTooltip');
	el.classList.add('floorPlanPinWithoutPano');
	map.appendChild(el);

	placeMapPinWithoutPano(el, smallMapX, smallMapY);

	el.dataset.posX = smallMapX;
	el.dataset.posY = smallMapY;
	el.dataset.smallMapWidth = map.offsetWidth;
	el.dataset.smallMapHeight = map.offsetHeight;
	el.dataset.bigMapWidth = bigMapWidth;
	el.dataset.bigMapHeight = bigMapHeight;
	el.dataset.tippyContent = title;
	el.dataset.tippyPlacement = 'top';

	// tippy(el,{
	// 	theme: 'material',
	// });

	// Если есть ID хотспота, то добавляем действия
	if (hotspotId) {
		el.dataset.hotspot = hotspotId;
		el.addEventListener("click", turnPanoToHotspot);
		el.addEventListener("mouseover", mapPinEnter, false);
		el.addEventListener("mouseout", mapPinLeave, false);
	}
}

function clearMapPinWithoutPano() {
	let pins = document.querySelectorAll('.floorPlanPinWithoutPano');
	if (pins.length > 0) {
		for (i = 0; i < pins.length; i++) {
			pins[i].remove();
		}
	}
}

function mapPinsInit() {
	pano.on("changenode", function () {
		clearMapPinWithoutPano();
		
		// For big map to whole screen height (minus header, footer and 20px margin)
		bigMapHeight=window.innerHeight - 120 - 20;
		bigMapWidth=bigMapHeight;

		if (getPanoName() == 'Pool_Deck') {
			// let bigMapWidth = 480;
			// let bigMapHeight = 480;


			addMapPinWithoutPano('Gym', 240, 142, bigMapWidth, bigMapHeight, 'Point01');
			addMapPinWithoutPano('Group Fitness', 128, 215, bigMapWidth, bigMapHeight, 'Point02');
			addMapPinWithoutPano('Games Room', 83, 219, bigMapWidth, bigMapHeight, 'Point03');
			addMapPinWithoutPano('Theatre', 21, 225, bigMapWidth, bigMapHeight, 'Point04');
			addMapPinWithoutPano('Library', 47, 208, bigMapWidth, bigMapHeight, 'Point05');
			addMapPinWithoutPano('Fire Pit', 35, 145, bigMapWidth, bigMapHeight, 'Point06');
			addMapPinWithoutPano('Sauna + Steam', 192, 82, bigMapWidth, bigMapHeight, 'Point07');
			addMapPinWithoutPano('BBQ Area', 34, 60, bigMapWidth, bigMapHeight, 'Point08');
			addMapPinWithoutPano('Podcast', 46, 239, bigMapWidth, bigMapHeight, 'Point09');
		}

		if (getPanoName() == 'Montario') {
			// let bigMapWidth = 480;
			// let bigMapHeight = 480;
			addMapPinWithoutPano('Park Terraces', 51, 53, bigMapWidth, bigMapHeight, 'Point01');
			addMapPinWithoutPano('Project Site', 117, 112, bigMapWidth, bigMapHeight, 'Point02');
			addMapPinWithoutPano('Shenton Quarter', 179, 86, bigMapWidth, bigMapHeight, 'Point03');
			addMapPinWithoutPano('Coles', 211, 86, bigMapWidth, bigMapHeight, 'Point05');
			addMapPinWithoutPano('Victoria House', 223, 145, bigMapWidth, bigMapHeight, 'Point04');
		}

	});
}

// Floor Selector Panorama Page
function floorSelectorPanoInit() {
	pano.on("changenode", function () {
		let hotspots = document.querySelectorAll('.floorHotspot');
		for (i = 0; i < hotspots.length; i++) {
			let calloutLine = hotspots[i].querySelector('.hotspotCalloutLine');
			let tilt = calloutLine.querySelector('.hsTilt > div').textContent;
			if (tilt) {
				let angle = tilt * 2.5;
				calloutLine.style.transform = "rotate(" + angle + "deg)";
				// let radius = calloutLine.clientWidth;
				let radius = 100;
				let newX = radius * Math.cos(toRadians(angle));
				let newY = radius * Math.sin(toRadians(angle)) + angle * 0.7;
				let callOutText = hotspots[i].querySelector('.callOutText');
				callOutText.style.transform = "translateY(calc(-50% + " + newY + "px)) translateX(" + newX + "px)";
			}
		}
	});

}




// Show 'Reset view' button at Floor Selector Page
function floorSelectorResetViewButtonInit() {
	let defaultPan;
	function showResetViewButton() {
		let btn = document.querySelector('.panoResetViewButton');
		if (btn) {
			btn.classList.add('panoResetViewButtonVisible');
		}
	}

	function hideResetViewButton() {
		let btn = document.querySelector('.panoResetViewButton');
		if (btn) {
			btn.classList.remove('panoResetViewButtonVisible');
		}
	}
	function checkRotate() {
		let pan = pano.getPan();
		let panLimit1 = defaultPan - 50;
		let panLimit2 = defaultPan + 50;

		if (pan < panLimit1 || pan > panLimit2) {
			showResetViewButton();
		} else {
			hideResetViewButton();
		}
	}
	pano.on("changenode", function () {
		if (getPanoName() == 'floor_selector') {
			defaultPan = pano.getPan();
			pano.on("positionchanged", checkRotate);
		} else {
			pano.removeEventListener("positionchanged", checkRotate);
		}
	});
}


function changeLeftInfo() {
	if (typeof panoPage !=='undefined'){
		pano.on("changenode", function () {
			let info = pano.getVariableValue('leftSideInfo');
			if (info != '') {
				panoPage.panoInfo(info);
			}
		});
	}
}
function changeNodeInit(){
	pano.on("changenode", function () {
		// "More info" buttons at left side
		Layout.moreInfoButtonInit();
		setTimeout(addTooltipContent, 100);
	});
}

function panoInit() {
	floorplanChangeSizeInit();
	mapPinsInit();
	floorSelectorPanoInit();
	floorSelectorResetViewButtonInit();
	changeLeftInfo();
	changeNodeInit();
}

window.onload = function () {
	panoInit();
}
