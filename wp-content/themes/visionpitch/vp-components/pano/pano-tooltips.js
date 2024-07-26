// Глобальный массив инстанцев для Tippy
window.tippyPanoramaInstances = [];

function clearAllPanoTippy() {
	tippyPanoramaInstances.forEach(instance => {
		instance.destroy();
	});
	tippyPanoramaInstances.length = 0; // clear it

}

addTooltipContent = function () {
	var b = document.querySelectorAll('.htInfoTooltip'), i;

	// показываем подсказки для панорам c тегом 'showHotspotTooltips'
	// устанавливаем дефолтные значения
	let showOnCreate = false;
	let trigger = 'mouseenter focus';
	let hideOnClick = true;
	// если есть те, устанавливаем новые значения
	if (pano.getNodesWithTag('showHotspotTooltips').indexOf(pano.getCurrentNode()) > -1) {
		showOnCreate = true;
		trigger = 'manual';
		hideOnClick = false;
	}
	
	for (i = 0; i < b.length; ++i) {
		var tooltipText = b[i].querySelector('.htInfoTooltipText');
		
		if (tooltipText) {
			if (tooltipText.textContent){
				var text = tooltipText.innerHTML; if (text && text.length > 0) {
					b[i].dataset.tippyContent = text;
					b[i].dataset.tippyPlacement = 'top';
					// для хотспотов на панораме (не на карте) - параметры показа в зависимости от тега 'showHotspotTooltips'
					if (b[i].classList.contains('htInfo')) {
						b[i].dataset.tippyShowoncreate = showOnCreate;
						b[i].dataset.tippyTrigger = trigger;
						b[i].dataset.tippyHideonclick = hideOnClick;
						b[i].dataset.tippyZindex = 10;
					}
				}

			}

		}

	}
	let hideDuration = 50;

	let followCursor = false;
	if (pano.getIsMobile()) {
		followCursor = false;
	}

	// удаляем из глобального массива
	clearAllPanoTippy();
	// add tippy to all hotspots
	// but not for .htNode at touch devices
	const instances = tippy('body.hasHover .htInfoTooltip[data-tippy-content], :not(.htNode) > .htInfoTooltip[data-tippy-content]', {
		theme: 'light',
		touch: true,
		followCursor: followCursor,
		sticky: true,
		touch: ['hold', 10],
		duration: [300, hideDuration],
		animation: 'scale',
		allowHTML: true,
		// appendTo: () => document.querySelector('#container > div > div:nth-child(3)'), // put tooltips to skin container to hide above map in Pool panorama
		appendTo: 'parent',
	});
	// добавляем в глобальный массив
	window.tippyPanoramaInstances = tippyPanoramaInstances.concat(instances);

}


