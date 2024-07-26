class PanoPage {
	constructor(params) {
		// Проверяем Location page
		let locationPage = false;
		if (page.pageUrl == 'location') {
			locationPage = true;
		}
		// remove rightside block
		if (!page.isStartPage) {
			jQuery('.rightSide').css('display', 'none');
		}

		let panoId = page.panoUrl;

		// for mouse (or finger) animation at start panorama 
		this.idleTime=params.idleTime;
		this.positionChanged=0;		// Pano position chaged counter. 1 = at pano load, 2+ = pano load and user change position
		this.startActions=this.startActions.bind(this);
		this.changeNodeActions=this.changeNodeActions.bind(this);
		this.initHint=this.initHint.bind(this);

		if (panoId != '') {
			// для панорамы на Location page добавляем класс locationPagePanoContainerHide
			let locationPagePanoContainerHide = '';
			if (locationPage) {
				locationPagePanoContainerHide = 'locationPagePanoContainerHide';
			}
			// adding TimeStamp parameter to clear cache
			let ts=new Date().getTime();
			let panoHtml = '<div class="panoContainer ' + locationPagePanoContainerHide + '">';
			panoHtml += '<script src=/wp-content/uploads/panoramas/pano2vr_player.js?ts='+ts+'></script>';
			panoHtml += '<script src=/wp-content/uploads/panoramas/skin.js?ts='+ts+'></script>';
			panoHtml += '<div id=container style=width:100%;height:100%;overflow:hidden><br>Loading...<br><br></div>';
			panoHtml += '<script>pano=new pano2vrPlayer("container",{ webGLFlags: { preserveDrawingBuffer:true } });';
			panoHtml += 'pano.setQueryParameter("ts='+ts+'");';
			panoHtml += 'skin=new pano2vrSkin(pano,"/wp-content/uploads/panoramas/");';
			panoHtml += 'pano.startNode = "' + panoId + '";';
			panoHtml += 'window.addEventListener("load",function(){ pano.readConfigUrlAsync("/wp-content/uploads/panoramas/pano.xml?ts='+ts+'"); })</script></div>';
			jQuery('main').append(panoHtml);
			this.moveFloorplanUp();
			checkBeforeAfter();
			this.startActions();		// Actions at 'pano.configloaded'
			this.changeNodeActions();		// Actions at 'pano.changenode'
			this.smallScreen(params.mobileFov);
		}


		function checkBeforeAfter() {
			pano.on("changenode", function () {
				let after = pano.getVariableValue('after_node');
				let before = pano.getVariableValue('before_node');
				if (after || before) {
					var functionsArray = [
						"panoPage.beforeAfterGoto();",
						"panoPage.beforeAfterGoto();",
					];
					
					// если еще нет переключателя, то создаем его
					if (jQuery('.switcherContainer').length == 0) {
						addSwitcher(['Before', 'After'], 1, functionsArray, 'beforeAfterSwitcher');
						// Check thumbnails line
						if (pano.getVariableValue('thumbGroup')) {
							jQuery('.switcherContainer').addClass('switherAboveThumbs');
						}

						if (jQuery('.thumbContainerWrap').hasClass('closedThumbLine'))
							jQuery('.switherAboveThumbs').addClass('closedThumbLine');
					}
					updateBeforeAfter('beforeAfterSwitcher');
				}
			});
		}

		function updateBeforeAfter(switcherId) {
			let after = pano.getVariableValue('after_node');
			let before = pano.getVariableValue('before_node');

			if (before) {
				switcherChange(switcherId, 1);
			}
			if (after) {
				switcherChange(switcherId, 0);
			}
		}
	}






















	// Show hint (mouse or finger animation) at start
	showHint(){
		if (this.positionChanged<2){
			this.addStartHint();
		}
	}
	hideHint(){
		jQuery('.panoStartAnimation').removeClass('hintAnimationStart'); 	// hide Hint
		setTimeout(()=>{jQuery('.panoStartAnimation').remove()},500);		// remove element from DOM
	}

	initHint(){
		if (!isMobile()) {
			jQuery('.panoStartAnimation').remove();
			setTimeout(()=>{this.showHint()},this.idleTime);
			// делаем небольшую задержку, чтобы успела повернуться панорама, еслиесть повороты при старте проекта (в сторону выбранного объекта)
			setTimeout(()=>{
				pano.on("positionchanged", ()=>{
					if (this.positionChanged<2){
						this.positionChanged++;
					}
					// check Hint element existance
					if (jQuery('.panoStartAnimation').length>0){
						if (this.positionChanged>=1) this.hideHint();
					}
				});
			},100);
		}
	}
	changeNodeActions(){
		pano.on("changenode", ()=>{
		});
	}

	startActions() {
		pano.on("configloaded", ()=>{
		});
	}

	// add mouse or finger animation element to pano
	addStartHint(){
		let device="mouse";
		let text="Use the mouse to look around";
		if (isTouch()) {
			device="finger";
			text="Use gestures to look around";
		}
		let el=`<div class='panoStartAnimation ${device}'><img src='/wp-content/uploads/${device}.svg' />${text}</div>`;
		jQuery('.panoContainer').append(el);
		setTimeout(()=>{jQuery('.panoStartAnimation').addClass('hintAnimationStart')},100);
	}





























	smallScreen(nodesFov) {
		if (isSmallScreen()) {
			pano.on("configloaded", function () {
				// hide floorplan at start without animation
				document.querySelector('.floorPlanContainer').classList.add('floorplanMobileHideAtStart');
				pano.setVariableValue('floorPlanOpen',false);				
			});
			pano.on("changenode", function () {
				// Change FOV (zoom) at some panoramas
				document.querySelector('.floorPlanContainer').classList.remove('floorplanMobileHideAtStart');
				for (let i=0; i<nodesFov.length;i++){
					let current = pano.getNodeUserdata().customnodeid;
					if (current==nodesFov[i][0]) {
						pano.setFov(nodesFov[i][1]);
					}
				}
			});
		}
	}

	// Move floorplan to 'main' for change z-index
	moveFloorplanUp(){
		jQuery('.floorPlanSkinElement').prependTo('main')
	}
	beforeAfterGoto() {
		let newPanoId = '';
		let pan = pano.getPan();
		let tilt = pano.getTilt();
		let fov = pano.getFov();
		let params = pan + '/' + tilt + '/' + fov;

		pano.setTransition({ type: 'crossdissolve', transitiontime: 0.5, });

		let after = pano.getVariableValue('after_node');
		let before = pano.getVariableValue('before_node');
		if (before) {
			newPanoId = before;
		} else {
			newPanoId = after;
		}

		if (newPanoId != '') {
			pano.openNext('{' + newPanoId + '}', params);
		}

		pano.setTransition({ type: 'crossdissolve', transitiontime: 0.2, });
	}
	// showPanoTooltip() {
	// 	if (page.pageUrl != 'location' && !page.isStartPage) {
	// 		let mapShownCounter = window.sessionStorage.getItem('visionPitchShowPanoHelp');
	// 		if (!mapShownCounter) {
	// 			tooltip360.show();
	// 			window.sessionStorage.setItem('visionPitchShowPanoHelp', '1');
	// 		}
	// 	}
	// }
	panoInfo(info){
		if (info!=''){
			document.querySelector('.leftSide').innerHTML=info;
		}
	}
}


if (page.pageType.indexOf('pano') != -1) {
	var panoPage = new PanoPage({
		idleTime:5000,
		mobileFov:[
			['Montario',49],
			['floor_selector',75],
			['The_market_Sub_market',68],
			['Pool_Deck',100],
		],
	});
}

window.addEventListener("load", function () {
	// panoPage.showPanoTooltip();
	setTimeout(addTooltipContent, 100);
});