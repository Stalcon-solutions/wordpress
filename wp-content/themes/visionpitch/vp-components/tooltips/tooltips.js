var tooltip360;			// глобальная переменная для подсказки 360
var tooltipMap;			// глобальная переменная для подсказки карты


// Tooltips - подсказки

function menuTooltips(){
	tippy('body.hasHover .menuOpenButton', { content: 'Main Menu', });
	tippy('body.hasHover .menuCloseButton', { content: 'Close Main Menu', });
}
function tooltipsCreate() {
	// Общие параметры подсказок
	tippy.setDefaultProps({
		theme: 'light',
		maxWidth: 250,
		allowHTML: true,
		animation: 'scale',
	});

	// Тексты подсказок
	let tooltip360Text = '<b>360 Views</b><br />Click and drag to look around. Roll the mouse wheel forward or back to zoom in and out';
	let tooltipMapText = '<b>Interactive Map</b><br />Click and drag to move the map. Roll the mouse wheel forwards and back to zoom in and out';


	let nextButtonTooltip = page.nextPageTitle;
	let prevButtonTooltip = page.prevPageTitle;
	// Подсказки на кнопках
	tippy('body.hasHover .fullscreenButtonEnter', { content: 'Enter Fullscreen Mode', });
	tippy('body.hasHover .fullscreenButtonExit', { content: 'Exit Fullscreen Mode', });
	tippy('body.hasHover .prevButton', { content: prevButtonTooltip, });
	tippy('body.hasHover .nextButton', { content: nextButtonTooltip, });
	tippy('body.hasHover .homeButton', { content: 'Home', });
	tippy('body.hasHover .drawButton', { content: 'Draw', });
	tippy('body.hasHover .autoplayStart', { content: 'Autoplay', });
	tippy('body.hasHover .autoplayStop', { content: 'Stop', });
	tippy('body.hasHover .footerLogo', { content: 'Vision Pitch Site', });
	tippy('body.hasHover .drawModeButton', { content: 'Mark up tool', });
	

	let iconPano = jQuery('.icon360'); // используем jquery, т.к. в firefox не работает css селектор has
	tooltip360 = tippy(iconPano[0], {
		content: tooltip360Text,
		// trigger: 'click',
		hideOnClick: true,
	});

	let iconMap = jQuery('.iconMap'); // используем jquery, т.к. в firefox не работает css селектор has
	tooltipMap = tippy(iconMap[0], {
		content: tooltipMapText,
		// trigger: 'click',
		hideOnClick: true,
	});

	// подсказки для верхнего навигатора
	tippy('body.hasHover .slideTitleItem', {
		followCursor: 'horizontal',
	});
}
