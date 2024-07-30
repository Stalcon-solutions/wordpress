function popupClose() {
	jQuery('.w-popup-closer').click();
}

// Передача данных в popup окно
function openPopupInit() {
	jQuery(".openPopupText").on("click", function () {
		let content = jQuery(this).closest('.wpb_wrapper').find('.textInPopup').html();
		if (content != '') {
			jQuery('.w-popup-box-content').html(content);
		} else {
			jQuery('.w-popup-box-content').html('');
			popupClose();
		}
		return;
	});
	jQuery(".person").on("click", function () {
		let content = jQuery(this).find('.textInPopup').html();
		if (content != '') {
			jQuery('.w-popup-box-content').html(content);
		} else {
			jQuery('.w-popup-box-content').html('');
			popupClose();
		}
		return;
	});


}











// Выключаем несколько нижних кнопок, так как :has не работает в Firefox
function switchOffBottomButtons(){
	jQuery('.iconMap').parent('.w-btn-wrapper').hide();
	jQuery('.fullscreenButtonExit').parent('.w-btn-wrapper').hide();
}

// Запускаем анимации колонок
function runPageAnimation(){
	// Анимация левой колонки
	jQuery('.leftColumn').addClass('leftColumnAnimated');

	// Анимация правой колонки (кроме teamColumn) + задержка появления
	jQuery('.contentColumn:not(.teamColumn) .vc_column_container').each(function (index) {
		jQuery(this).css('transition-delay', index*0.3+"s");
	});
	jQuery('.contentColumn .vc_column_container').addClass('rightColumnAnimated');

	// Анимация правой teamColumn + задержка появления
	jQuery('.teamColumn .person').each(function (index) {
		jQuery(this).css('transition-delay', index * 0.3 + "s");
	});
	jQuery('.teamColumn .person').addClass('rightColumnAnimated');
	
}


function switcherItemWidth(switcherId){
	let swither = jQuery("#" + switcherId);
	let width = swither.find('.switcherActive').outerWidth(true);
	swither.find('.switcherSelector').width(width+'px');
}

function switcherChangePosition(switcherId){
	let swither = jQuery("#" + switcherId);
	let left = swither.find('.switcherActive').position().left;
	swither.find('.switcherSelector').css('left',left+'px');
	swither.find('.switcherSelector').addClass('switcherSelectorScale').delay(300).queue(function () {
		jQuery(this).removeClass("switcherSelectorScale").dequeue();
	});
	switcherItemWidth(switcherId);
}
function switcherChange(switcherId, position){
	
	let swither = jQuery("#" + switcherId);
	switcherCurrentPosition = parseInt(swither.find('.switcherActive').index())-1;
	if (position != switcherCurrentPosition) {
		swither.find('.switherItem').removeClass('switcherActive');
		swither.find('.switherItem').eq(position).addClass('switcherActive');
		switcherChangePosition(switcherId);
	}

}
function addSwitcher(items, selectedItemIndex, functions, switherId2){
	////////////////////////////////////////////////////
	// Пример вызова со списком функций
	// var functionsArray = [
	// 	"console.log(1);",
	// 	"console.log(2);",
	// ];
	// addSwitcher(['Before', 'After'], 1, functionsArray);
	////////////////////////////////////////////////////

	let switcherId = 'switcher' +parseInt(parseInt(jQuery('.switcherContainer').length)+1);
	if (switherId2) {
		switcherId = switherId2;
	}
	let switcher = '<div class="switcherContainer" id="' + switcherId +'"><div class="switcherSelector"></div>';
	for(i=0; i<items.length; i++){
		let switcherActive='';
		if (i == (selectedItemIndex-1)) {
			switcherActive ='switcherActive';
		}
		switcherItemId = switcherId+"_"+i;
		switcher = switcher + '<div class="switherItem ' + switcherActive + '" id="' + switcherItemId +'" onClick="' + functions[i]+'">'+items[i]+'</div>';
	}
	switcher=switcher+'</div>';
	jQuery('main').append(switcher);
	
	setTimeout(() => {
		switcherChangePosition(switcherId);
	}, 0);

	jQuery(".switherItem").click(function () {
		jQuery(".switherItem").removeClass('switcherActive');
		jQuery(this).addClass('switcherActive');
		let switcherClickedId = jQuery(this).parent('.switcherContainer').attr('id');
		switcherChangePosition(switcherClickedId);
	});
}


function createLoadingScreen(){
	let loadingScreen = "<div class='loadingScreenNext'></div><div class='loadingScreenPrev'></div>";
	jQuery('#page-content').prepend(loadingScreen);
}

function addMainContentBlockName(){
	jQuery('main').attr('data-page-url', page.pageUrl);
}

// Установка переменных в родительской странице
function setParentVariables(){
	window.parent.document.getElementById('mainIframe').dataset.pageName = page.pageUrl;
	window.parent.changedPage();

}

(function ($) {
	switchOffBottomButtons();
	tooltipsCreate();
	createLoadingScreen();
	addMainContentBlockName();
	openPopupInit();
	runPageAnimation();
})(jQuery);
