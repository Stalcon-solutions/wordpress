var vpMap; // map global objectaddMarkerToMap
class VpMap {
	constructor(params) {
		this.mapCenter=params.mapCenter;
		this.zoom=params.zoom;
		this.noAnimation=params.noAnimation;
		this.key = params.key;
		this.style = params.style;
		this.pitch = params.pitch;
		this.parentContainer = params.parentContainer;
		if (this.parentContainer=='') {
			this.parentContainer='main'
			jQuery('.rightSide').hide();
		} else {
			this.parentContainer="#"+this.parentContainer;
		}
			
		this.map;
		this.addPin = this.addPin.bind(this);
		this.poi = this.poi.bind(this);
		this.mapContainerId = params.mapContainerId;
		let mapContainer = '<div id="' + this.mapContainerId + '" class="'+params.mapContainerClass+'"></div>';
		jQuery(this.parentContainer).append(mapContainer);
	}

	initMap(callback){
		let map=this.makeMap(this.mapContainerId,this.mapCenter, this.zoom);
		if (this.zoom!=0) {
			this.flyInToMap(this.mapCenter, 0.9, this.zoom);	
		}
		if(typeof mapPoi !== "undefined") {
			let flyAnimation=true;
			if (this.noAnimation!="0") {
				flyAnimation=false;
			} 
			this.poi(map);
			this.flyToBounds('.mapPin',1,flyAnimation);
		}
		
		// run callback function
		if (typeof callback === 'function') {
            callback(this.map);
        }
	}

	poi(map) {
		// Check: map with current ID has POIs
		let mapId = map.getContainer().id;
		let thumblineId='';
		let thumbLine;
		if (mapPoi.thumblineId!==undefined){
			thumblineId=mapPoi.thumblineId;
			thumbLine = new Thumbline(thumblineId);
		}

		if (mapPoi.mapId == mapId) {
			for (let i = 0; i < mapPoi.poi.length; i++) {
				this.addPin(map, mapPoi.poi[i], i, mapPoi.poi[i].id, mapPoi.mapId);
				if (thumbLine!==undefined){
					thumbLine.addThumbnail(i, mapPoi.poi[i].thumb, mapPoi.poi[i].name, '',function (){mapThumbClick(mapPoi.poi[i].id, map, thumbLine.id)}, true);
				}
			}
		}
		if(thumbLine!==undefined){
			thumbLine.addTooltips();
			thumbLine.update();
		}
		
		// add tooltips to map pin
		let pins = document.querySelectorAll('.mapPin');
		tippy(pins, {
			sticky: true,
			touch: true,
			touch: ['hold', 10],
			theme: 'light',
		});

		function mapThumbClick(pinId, map, thumbLineId) {
			let lat=mapPoi.poi.filter((poi) => poi.id == pinId)[0].lat;
			let lon=mapPoi.poi.filter((poi) => poi.id == pinId)[0].lon;
			jQuery('.mapPin').removeClass('mapPinSelected');
			let selectedPin="[data-pin-id="+pinId+"]";
			jQuery(selectedPin).addClass('mapPinSelected');
			map.flyTo({
				center: { lon: lon, lat: lat },
				zoom: 14,
			});
		}
	}

	makeMap() {	
		let mapContainer=this.mapContainerId;
		let mapCenter = this.mapCenter;
		let zoom = this.zoom;
		let pitch = this.pitch;
		let mapStyle = this.style;
	
		mapboxgl.accessToken = this.key;
		const map = new mapboxgl.Map({
			container: mapContainer,
			style: mapStyle,
			center: mapCenter,
			antialias: true,
			attributionControl:false,
			logoPosition:'bottom-right',
			bearing: 0,
			pitch:pitch,
			zoom: zoom,
		});
		map.dragRotate.disable();
		this.map=map;
		return map;
	}

	hideAtZoom(className, zoomLevel) {
		let currentMap = this.map;
		currentMap.on('zoom', function () {
			let zoom = currentMap.getZoom();
			if (zoom < zoomLevel) {
				jQuery('.' + className).css('visibility','hidden');
				jQuery('.tippy-box').hide();
			} else {
				jQuery('.' + className).css('visibility','visible');
				jQuery('.tippy-box').show();
			}
		});
		currentMap.on('zoomstart', function () {
			
		});
	}

	flyInToMap(center, startZoom, finishZoom) {
		let currentMap = this.map;
		let pitch = this.pitch;
		// make start Zoom
		currentMap.setCenter(center);
		currentMap.setZoom(startZoom);

		// Fly to finish Zoom
		currentMap.flyTo({
			center: center,
			zoom: finishZoom,
			pitch:pitch,
			speed: 0.5,
		});
	
	}
	flyToBounds(pins='.mapPin', speed=1, animation=true){
		let coords=[];
		let pitch = this.pitch;
		var bounds = new mapboxgl.LngLatBounds();
		jQuery(pins).each(function( index ) {
			let lonLat=[jQuery(this).attr('lon'),jQuery(this).attr('lat')];
			coords.push(lonLat);
			bounds.extend(lonLat);
		});
		let mapPadding={top:100, right:50, bottom:250, left:50};
		if (document.querySelector('main').clientWidth<1024){
			mapPadding={top:30, right:0, bottom:80, left:0};
		}
		if (coords.length>0) {
			vpMap.map.fitBounds(bounds, {
				padding:mapPadding,
				speed:speed,
				pitch:pitch,
				animate:animation,
			});
		} else {
			let mapCenterLat = page.mapCenterLat;
			let mapCenterLon = page.mapCenterLon;
			let zoom = page.zoom;
			if (animation) {
				vpMap.map.flyTo({
					center: { lon: mapCenterLon, lat: mapCenterLat },
					zoom: zoom,
					pitch:pitch,
					speed:speed,
				});	
			} else {
				vpMap.map.jumpTo({
					center: { lon: mapCenterLon, lat: mapCenterLat },
					zoom: zoom,
					pitch:pitch,
				});	
			}
	
		}
	}
	addPin(map, pinInfo, index, pinId, mapId) {
			let title = pinInfo.name;
			let pulse = pinInfo.pulse;
			let lat = pinInfo.lat;
			let lon = pinInfo.lon;
			lat = parseFloat(lat.replace(',', '.'));
			lon = parseFloat(lon.replace(',', '.'));
			let id = pinInfo.id;
			let pinType = pinInfo.type;
			let pinStage = pinInfo.stage;
			
			// Create a DOM element for each marker.
			const el = document.createElement('div');
			const el2 = document.createElement('div');
			el2.className = 'mapPinInside';
	
			// Create Numbers inside marker
			var insideNumber = document.createElement("div");
			insideNumber.classList.add('mapPinInsideNumber');
			insideNumber.innerHTML = index + 1;
			el2.appendChild(insideNumber);
	
			el.appendChild(el2);
	
			if (pinType) {
				const pulseDiv = document.createElement('div');
				pulseDiv.classList.add('animatedHSback');
				el.appendChild(pulseDiv);
			}
	
			el.className = 'mapPin'+' '+pinType+' '+pinStage;
			el.style.zIndex=(1000-index);
			el.dataset.pinType=pinType;
			if (title) {
				el.dataset.tippyContent = title;
			}
			el.setAttribute('lat', lat);
			el.setAttribute('lon', lon);
			el.setAttribute('id', 'map_pin_' + index);
			el.dataset.pinId=pinId;
			el.dataset.mapId=mapId;
	
			// el.dataset.fancybox = pinStage;
			el.dataset.fancybox = "allObjects";
			el.dataset.src = "#mapPinContent" + id;
			this.addMarkerToMap(map, lat, lon, el);
	}

	addMarkerToMap(map, lat, lon, element) {
		// Add markers to the map.
		new mapboxgl.Marker(element, {
			pitchAlignment: "viewport",
		}).setLngLat([lon, lat]).addTo(map);
	}

}

// window.addEventListener("load", function () {
	if (page.pageType.indexOf('map') != -1) {
		let style=mapParameters.style;
		let parentContainer=mapParameters.container;
		let id=mapParameters.id;
		let lat=mapParameters.lat;
		let lon=mapParameters.lon;
		let zoom=mapParameters.zoom;
		let pitch=mapParameters.pitch;
		let noAnimation=mapParameters.noanimation;
		vpMap = new VpMap({
			key:"pk.eyJ1IjoibWFrc2JvYiIsImEiOiJjbG9ncjY1MnkxNmh4MmpwOWppbzU5cmdxIn0.KlNg1eqBYjqBzETadwFBBw",
			mapContainerId:id,
			mapContainerClass:'mapContainer',
			mapCenter:[lon,lat],
			parentContainer:parentContainer,
			zoom:zoom,
			pitch:pitch,
			style: style,
			noAnimation: noAnimation,
		});
		vpMap.initMap();
		

	}
// });
