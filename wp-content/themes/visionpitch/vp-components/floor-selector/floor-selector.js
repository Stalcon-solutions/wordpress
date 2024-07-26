// All floors (Floor Selector) - START
function getFloorData(id) {
	let floors = residesFloors.floors;
	for (let j=0; j<floors.length; j++){
		if (floors[j][0].toLowerCase()==id.toLowerCase()){
			return floors[j];
		}
	}
}

function floorSelectorMakeCalloutText(floorData) {
	let floorTitles = residesFloors.floors[0];
	let text = '<div class="floorCalloutText"><div class="floorCalloutTextRow"><strong>Level: ' + floorData[1] + '</strong></div>';

	for (let i = 2; i < 15; i++) {
		if (parseInt(floorData[i]) != 0) {
			text += '<div class="floorCalloutTextRow"><div>' + floorTitles[i]+ '</div><div class="value">' + floorData[i] + '</div></div>';
		}
	}

	text += '</div>';
	return text;
}

function floorSelectorCallOutsInit() {
	pano.on("changenode", function () {
		if (getPanoName() == 'floor_selector') {
			let allHotspots = pano.getPointHotspotIds();
			for (let i = 0; i < allHotspots.length; i++) {
				let hs = pano.getHotspot(allHotspots[i]);
				
				if (hs.skinid == "ht_floor") {
					let floorData = getFloorData(hs.id);
					let calloutText = floorSelectorMakeCalloutText(floorData);
					hs.div.querySelector('.floorCalloutText').innerHTML = calloutText;
				}

			}
		}
	});
}

function floorSelectorHotspotsInit(floor){
	pano.on("changenode", function () {
		jQuery('.floorHotspot').on('click touchstart', function () {
			let hsId = jQuery(this).find('.floorHotspotName').text();
			if (hsId!=''){
				floor.open(hsId);
			}
		});

	});
}
// All floors (Floor Selector) - FINISH















// One Floor View - START
class FloorView {
	constructor(id) {
		// let id ='floorViewContainer';
		this.id=id;
		let code = `
				<div class="floorViewCloseButton buttonPrimary"></div>
				<div class="floorViewDrawButton buttonPrimary" onclick="draw.open();"><i  class="material-icons">draw</i></div>
				<div class="floorMain">
					<div class="floorLeftPanel">
						<div class="floorLeftPanelTop">
							<div class="floorPrevButton"></div>
							<div class="floorLeftPanelTitle">
								Level: <span></span>
							</div>
							<div class="floorNextButton"></div>
						</div>
						<div class="floorLeftPanelCenter">
							<div class="floorValuesTable floorArea"></div>
							<div class="floorValuesTable floorParkings"></div>
							<div class="floorValuesTable floorApartments"></div>
						</div>
					</div>
					<div class="floorTabs hideAtMobile"></div>
					<div class="floorCompass hideAtMobile">
						<svg width="44" height="88" viewBox="0 0 44 88" fill="none" xmlns="http://www.w3.org/2000/svg"><style>.arrow{transition:transform .7s ease;transform-origin:center}.arrow:hover{transform:rotate(360deg)}</style><g clip-path="url(.clip0_1660_547)"><g class="arrow"><circle cx="22" cy="44" r="22" fill="black" fill-opacity="0.2"/><circle cx="22" cy="44" r="16" fill="black" fill-opacity="0.3"/><path d="M22.5 28L26 44H19L22.5 28Z" fill="#FF0000"/><path d="M22.5045 28L26 44H22L22.5045 28Z" fill="#AF0000"/><path d="M22.5 60L19 44L26 44L22.5 60Z" fill="white"/><path d="M22.5045 60L26 44L22 44L22.5045 60Z" fill="#D9D9D9"/></g><path d="M24.6121 10V17H23.5421L19.6821 12.26V17H18.3921V10H19.4621L23.3221 14.74V10H24.6121Z" fill="white"/><path d="M21.4655 79.1C20.9255 79.1 20.4021 79.0233 19.8955 78.87C19.3955 78.7167 18.9988 78.5133 18.7055 78.26L19.1555 77.25C19.4421 77.4767 19.7921 77.6633 20.2055 77.81C20.6255 77.95 21.0455 78.02 21.4655 78.02C21.9855 78.02 22.3721 77.9367 22.6255 77.77C22.8855 77.6033 23.0155 77.3833 23.0155 77.11C23.0155 76.91 22.9421 76.7467 22.7955 76.62C22.6555 76.4867 22.4755 76.3833 22.2555 76.31C22.0355 76.2367 21.7355 76.1533 21.3555 76.06C20.8221 75.9333 20.3888 75.8067 20.0555 75.68C19.7288 75.5533 19.4455 75.3567 19.2055 75.09C18.9721 74.8167 18.8555 74.45 18.8555 73.99C18.8555 73.6033 18.9588 73.2533 19.1655 72.94C19.3788 72.62 19.6955 72.3667 20.1155 72.18C20.5421 71.9933 21.0621 71.9 21.6755 71.9C22.1021 71.9 22.5221 71.9533 22.9355 72.06C23.3488 72.1667 23.7055 72.32 24.0055 72.52L23.5955 73.53C23.2888 73.35 22.9688 73.2133 22.6355 73.12C22.3021 73.0267 21.9788 72.98 21.6655 72.98C21.1521 72.98 20.7688 73.0667 20.5155 73.24C20.2688 73.4133 20.1455 73.6433 20.1455 73.93C20.1455 74.13 20.2155 74.2933 20.3555 74.42C20.5021 74.5467 20.6855 74.6467 20.9055 74.72C21.1255 74.7933 21.4255 74.8767 21.8055 74.97C22.3255 75.09 22.7521 75.2167 23.0855 75.35C23.4188 75.4767 23.7021 75.6733 23.9355 75.94C24.1755 76.2067 24.2955 76.5667 24.2955 77.02C24.2955 77.4067 24.1888 77.7567 23.9755 78.07C23.7688 78.3833 23.4521 78.6333 23.0255 78.82C22.5988 79.0067 22.0788 79.1 21.4655 79.1Z" fill="white"/></g><defs><clipPath class="clip0_1660_547"><rect width="44" height="88" fill="white"/></clipPath></defs></svg>
					</div>
					<div class="floorZoomButtons hideAtMobile">
						<div class="floorZoomInButton"></div>
						<div class="floorZoomOutButton"></div>
					</div>
					<div class="f-panzoom floorImage"></div>
				</div>
		`;

		let el=document.createElement('div');
		el.classList.add('floorViewContainer');
		el.setAttribute('id', id);
		el.innerHTML = code;
		// document.querySelector('body').appendChild(el);
		jQuery('main').append(el);
		
		window.addEventListener('resize', ()=>this.imageResize());

		this.prevButton = document.getElementById(this.id).querySelector('.floorPrevButton');
		this.nextButton = document.getElementById(this.id).querySelector('.floorNextButton');
		this.prevNextButtonClick = this.prevNextButtonClick.bind(this);

		this.zoomInButton = document.getElementById(this.id).querySelector(".floorZoomInButton");
		this.zoomInButton.addEventListener('click', () => this.zoomIn());

		this.zoomOutButton = document.getElementById(this.id).querySelector(".floorZoomOutButton");
		this.zoomOutButton.addEventListener('click', () => this.zoomOut());

		this.floorImagesPath = '/wp-content/uploads/floor-plans';
		this.imageInstance;
		
		this.closeButton = document.getElementById(this.id).querySelector('.floorViewCloseButton');
		this.closeButton.addEventListener('click', () => this.close());
		this.currentFloor='';
	}

	toggleHeaderFooter(){
		jQuery('header').slideToggle(500);
		jQuery('footer').slideToggle(500);
	}
	close() {
		document.getElementById(this.id).classList.remove('floorViewContainerShow');
		document.getElementById(this.id).querySelector('.floorImage').innerHTML = '';
		this.prevButton.removeEventListener('click', this.prevNextButtonClick);
		this.nextButton.removeEventListener('click', this.prevNextButtonClick);
		this.imageInstanceDestroy();
		this.toggleHeaderFooter();
	}

	open(floorId){
		this.toggleHeaderFooter();
		document.getElementById(this.id).classList.add('floorViewContainerShow');
		this.init(floorId);
	}

	
	init(floorId) {
		if (floorId != null) {
			this.currentFloor = floorId;
			document.getElementById(this.id).querySelector(".floorImage").classList.remove('floorImageVisible');
			this.makeTabs(floorId);
			this.makeImage(floorId);
			this.getFloorInfo(floorId);
			this.imageResize();
			this.initPrevNextButtons(floorId);
			
			this.addApartments(floorId);
			this.showHideHotspots('all', 'hide');	// hide all hotspots before image load
		}
	}

	zoomIn() {
		this.imageInstance.zoomIn();
	}
	zoomOut() {
		this.imageInstance.zoomOut();
	}

	addApartments(floorId) {
		for (let i = 0; i < residesFloors.apartments.length; i++) {
			if (residesFloors.apartments[i][0].toLowerCase() == floorId.toLowerCase()) {
				this.addHotspot(residesFloors.apartments[i], i);
			}
		}
	}

	addHotspot(apartmentItem, i) {
		let image = document.getElementById(this.id).querySelector('.floorImage');
		let hotspot = document.createElement('div');
		hotspot.classList.add('floorViewHotspot');
		hotspot.dataset.apartmentType = apartmentItem[1];
		hotspot.dataset.panzoomPin = '';
		hotspot.dataset.status = apartmentItem[4];
		hotspot.dataset.x = apartmentItem[2] + '%';
		hotspot.dataset.y = apartmentItem[3] + '%';
		hotspot.dataset.orderNum = i;
		let hotspotCircle = document.createElement('div');
		hotspotCircle.classList.add('floorViewHotspotCircle');
		hotspot.append(hotspotCircle);
		image.append(hotspot);
	}

	initPrevNextButtons(floorId) {
		// Вычисляем индекс текущего этажа в списке этажей. Потом предыдщий и следующий
		let currentFloor = residesFloors.floors.find(floor => floor[0].toLowerCase() === floorId.toLowerCase());
		let currentFloorIndex = residesFloors.floors.indexOf(currentFloor);
		if (currentFloorIndex > -1) {
			let prevIndex = currentFloorIndex - 1;
			let nextIndex = currentFloorIndex + 1;
			// Отключаем Пред/След кнопки на крайних этажах
			if (prevIndex == 0) {
				this.prevButton.classList.add('floorPrevNextButtonDisabled');
			} else {
				this.prevButton.classList.remove('floorPrevNextButtonDisabled');
				this.prevButton.dataset.floorId = residesFloors.floors[prevIndex][0];
			}
			if (nextIndex == (residesFloors.floors.length)) {
				this.nextButton.classList.add('floorPrevNextButtonDisabled');
			} else {
				this.nextButton.classList.remove('floorPrevNextButtonDisabled');
				this.nextButton.dataset.floorId = residesFloors.floors[nextIndex][0];
			}

		}
		this.prevButton.removeEventListener('click', this.prevNextButtonClick);
		this.prevButton.addEventListener('click', this.prevNextButtonClick);

		this.nextButton.removeEventListener('click', this.prevNextButtonClick);
		this.nextButton.addEventListener('click', this.prevNextButtonClick);

	}

	prevNextButtonClick(event) {
		let floorId = event.target.dataset.floorId;
		this.changeFloor(floorId);
	}

	changeFloor(floorId) {
		if (floorId != this.currentFloor){
			this.init(floorId);
		}
	}

	getFloorInfo(floorId) {
		if (floorId != null) {
			let floorData = this.getFloorData(floorId);
			if (floorData.length > 0) {
				this.makeFloorTitle(floorData);
				this.makefloorValuesTable(floorData);
			}
		}
	}

	makeFloorTitle(floorData) {
		document.getElementById(this.id).querySelector('.floorLeftPanelTitle').querySelector('span').textContent = floorData[1];
	}

	makefloorValuesTable(floorData) {
		let tableTitles = residesFloors.floors[0];
		let floorTableArea = "";
		let floorTableParkings = "";
		let floorTableApartments = "";

		for (i = this.areaColumns[0]; i <= this.areaColumns[1]; i++) {
			if (floorData[i] > 0 && floorData[i]!='') {
				floorTableArea += "<div class='floorTableRow'><div>" + tableTitles[i] + "</div><div>" + floorData[i] + " <span>m<sup>2</sup></span></div></div>";
			}
		}

		for (i = this.parkingColumns[0]; i <= this.parkingColumns[1]; i++) {
			if (floorData[i] > 0 && floorData[i] != '') {
				floorTableParkings += "<div class='floorTableRow'><div>" + tableTitles[i] + "</div><div>" + floorData[i] + "</div></div>";
			}
		}

		for (i = this.apartmentColumns[0]; i <= this.apartmentColumns[1]; i++) {
			if (floorData[i] > 0 && floorData[i] != '') {
				let checkBox = '';
				let filter = '';
				if (tableTitles[i] != 'Totals' && floorData[0].toLowerCase() != 'all') {
					checkBox = "<div class='apartmentFilterCheckbox'></div>";
					filter = 'apartmentFilter';
				}
				floorTableApartments += "<div class='floorTableRow " + filter + "' data-apartament-type='" + tableTitles[i] + "'><div>" + checkBox + tableTitles[i] + "</div><div>" + floorData[i] + "</div></div>";
			}
		}



		// Если таблица с количеством апартаментов не пустая, то показываем чекбокс Only Available
		if (floorTableApartments != '' && floorData[0].toLowerCase() != 'all') {
			let checkBox = "<div class='apartmentFilterCheckboxHide apartmentFilterCheckbox'></div>";
			let availableApartments = "<div class='floorTableRow floorShowAvailable apartmentFilter' data-apartament-type='sold'><div>" + checkBox + "Show only available</div></div>";
			floorTableApartments += availableApartments;
		}
		document.getElementById(this.id).querySelector('.floorArea').innerHTML = floorTableArea;
		document.getElementById(this.id).querySelector('.floorParkings').innerHTML = floorTableParkings;
		document.getElementById(this.id).querySelector('.floorApartments').innerHTML = floorTableApartments;
		

		// Добавляем события на фильтр
		let apartmentFilters = document.getElementById(this.id).querySelectorAll('.apartmentFilter');
		if (apartmentFilters.length>0){
			for (let i = 0; i < apartmentFilters.length; i++){
				let aptType = apartmentFilters[i].dataset.apartamentType;
				if (aptType) {
					apartmentFilters[i].addEventListener('click', () => this.filterClick(aptType));
				}
			}
		}


	}
	getFloorData(floorId) {
		let floorData = [];
		for (i = 0; i < residesFloors.floors.length; i++) {
			if (residesFloors.floors[i][0].toLowerCase() == floorId.toLowerCase()) {
				for (let j = 0; j < residesFloors.floors[0].length; j++) {
					floorData[j] = residesFloors.floors[i][j];
				}
				break;
			}
		}
		return floorData;
	}

	imageResize() {
		// Set Image container size
		let leftPanelWidth = document.getElementById(this.id).querySelector('.floorLeftPanel').clientWidth + document.getElementById(this.id).querySelector('.floorTabs').clientWidth;
		let width = document.getElementById(this.id).querySelector('.floorMain').clientWidth - leftPanelWidth;
		document.getElementById(this.id).querySelector('.floorImage').style.width = width + "px";
		document.getElementById(this.id).querySelector('.floorImage').style.left = leftPanelWidth + "px";
	}
	makeTabs(selectedFloorId) {
		// Сдвигаем влево на ширину .floorLeftPanel
		let left = document.getElementById(this.id).querySelector('.floorLeftPanel').clientWidth;
		document.getElementById(this.id).querySelector('.floorTabs').style.left = left + "px";

		// Добавляем все этажи
		let tabs = "";
		for (i = 1; i < residesFloors.floors.length; i++) {
			let selected = "";
			if (residesFloors.floors[i][0].toLowerCase() == selectedFloorId.toLowerCase()) {
				selected = "class='floorTabSelected'";
			}
			// tabs += "<div " + selected + "  onclick='changeFloor(`" + residesFloors.floors[i][0] + "`);'>" + residesFloors.floors[i][0] + "</div>";
			tabs += "<div " + selected + "  data-floor-id='" + residesFloors.floors[i][0] + "'>" + residesFloors.floors[i][0] + "</div>";
		}
		document.getElementById(this.id).querySelector('.floorTabs').innerHTML = tabs;

		this.floorTabs = document.getElementById(this.id).querySelectorAll(".floorTabs > div");
		for (let i = 0; i < this.floorTabs.length; i++) {
			let floorId = this.floorTabs[i].dataset.floorId;
			this.floorTabs[i].addEventListener('click', () => this.changeFloor(`${floorId}`));
		}
	}

	makeImage(selectedFloorId) {
		let image = this.floorImagesPath + "/" + selectedFloorId.toLowerCase() + '.png';
		let imgWrap = document.getElementById(this.id).querySelector('.floorImage');
		imgWrap.innerHTML = "";
		let img=document.createElement('img');
		img.src=image;
		img.addEventListener('load', () => this.runImageEngine());
		imgWrap.appendChild(img);
	}

	runImageEngine() {
		this.imageInstanceDestroy();
		const container = document.getElementById(this.id).querySelector(".floorImage");
		const options = {
			click: "iterateZoom",
			minScale: 0.5,
			maxScale: 2,
			on:{
				ready: (instance) => {
					instance.zoomTo(0.99);	// little Zoom Out At start to show all lines in screen
				},
			}
		};

		this.imageInstance = new Panzoom(container, options, { Pins });

		document.getElementById(this.id).querySelector(".floorImage").classList.add('floorImageVisible');
		this.showHideHotspots('all', 'show'); // show hotspots after image load
	}

	showHideHotspots(apartmentType, showHide) {
		let dataType = "data-apartment-type";
		if (apartmentType == 'sold') {
			dataType = "data-status";
		}
		let hotspots = document.getElementById(this.id).querySelectorAll('.floorViewHotspot[' + dataType + '="' + apartmentType + '"]');
		
		if (apartmentType == 'all') {
			hotspots = document.getElementById(this.id).querySelectorAll('.floorViewHotspot');
		}
		for (i = 0; i < hotspots.length; i++) {
			if (showHide == 'hide') {
				if (apartmentType == 'sold')
					hotspots[i].classList.add('floorViewHotspotHiddenSold');
				else
					hotspots[i].classList.add('floorViewHotspotHidden');
			} else {

				if (apartmentType == 'sold')
					hotspots[i].classList.remove('floorViewHotspotHiddenSold');
				else
					hotspots[i].classList.remove('floorViewHotspotHidden');

			}

		}
	}

	imageInstanceDestroy() {
		if (this.imageInstance) {
			this.imageInstance.destroy();
		}
	}


	filterClick(apartmentType) {
		if (apartmentType) {
			let selectedCheckbox = document.getElementById(this.id).querySelector('.apartmentFilter[data-apartament-type="' + apartmentType + '"] .apartmentFilterCheckbox');
			if (selectedCheckbox.classList.contains('apartmentFilterCheckboxHide')) {
				// переключаем чекбокс
				selectedCheckbox.classList.remove('apartmentFilterCheckboxHide');
				if (apartmentType != 'sold') {
					// показываем выбранные типы
					this.showHideHotspots(apartmentType, 'show');
				} else {
					// если тип SOLD то, наоборот скрываем - инверсная логика
					this.showHideHotspots(apartmentType, 'hide');
				}

			} else {
				// переключаем чекбокс
				selectedCheckbox.classList.add('apartmentFilterCheckboxHide');
				// скрываем выбранные типы апартаментов. 
				if (apartmentType != 'sold') {
					this.showHideHotspots(apartmentType, 'hide');
				} else {
					// если тип SOLD то, наоборот показываем - инверсная логика
					this.showHideHotspots(apartmentType, 'show');
				}

			}

		}
	}

}

// One Floor View - FINISH












function floorSelectorInit(){
	let floor = new FloorView('floorViewContainer');
	floor.areaColumns=[2,3];
	floor.apartmentColumns=[4,8];
	floor.parkingColumns=[9,14]
	floorSelectorCallOutsInit();
	floorSelectorHotspotsInit(floor);
}


window.addEventListener("load", function () {
	floorSelectorInit();
});