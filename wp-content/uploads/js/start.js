class StartPage{
	constructor(props){
		this.class=props.class;
		this.startscreenClass = props.startscreenClass;
		const el=document.createElement('div');
		el.className=this.class;
		el.style.backgroundImage=`url('${vpThemeSettings.directory}/images/vp-logo-animated.svg')`;
		if (document.querySelector('main')){
			this.isPage=true;
			document.querySelector('main').appendChild(el);
		} else {
			this.isPage=false;
		}
	}
	showLoader(){
		document.querySelector(`.${this.class}`).style.display='block';
	}
	hideLoader(){
		document.querySelector(`.${this.class}`).classList.add('startScreenLoaderHide');
		let hiddenBlock=document.querySelector(`.rightSide > div`);
		if (hiddenBlock!==null) {
			hiddenBlock.style.visibility='visible';
		}
	}
	markVisited() {
		// получить ID текущего пункта меню
		let currentMenuId = 'menu-item-'+page.menuId;
		
		// Массив посещенных страниц
		let visitedPagesArray = [];

		// получить строку посещенных страниц из куки
		let visitedPages = window.sessionStorage.getItem('vpVisitedPages');
		if (visitedPages != '' && visitedPages != null) {
			// если строка получена, то преобразуем ее в массив
			visitedPagesArray = visitedPages.split('|');
		}

		// проверить массив - есть ли текущий ID, и если нет, то:
		// добавить текущий ID в массив посещенных страниц
		if (visitedPagesArray.indexOf(currentMenuId) == -1) {
			visitedPagesArray.push(currentMenuId);
		}

		// сохранить текущий массив посещенных страниц в куки
		let visitedPagesUpdated = visitedPagesArray.join('|');
		window.sessionStorage.setItem('vpVisitedPages', visitedPagesUpdated);
	}
}

const startScreen = new StartPage({
	class:'startScreenLoader',
});

if (startScreen.isPage){
	startScreen.showLoader();
	startScreen.markVisited();	
}


// run after Content loaded
window.addEventListener("load", function () {
	if (startScreen.isPage){
		startScreen.hideLoader();
	}
}, false);