class Menu {
	constructor(props) {
		this.id = props.id;
		this.container = document.querySelector('.' + this.id);
		this.menuCloseButtonAdd = this.menuCloseButtonAdd.bind(this);
		this.menuOpenButtonAdd = this.menuOpenButtonAdd.bind(this);
		this.menuToggle = this.menuToggle.bind(this);
		this.menuTop = `<img src='${props.logo}' class='topMenuLogo' />`;
		this.menuBottom=`
		<div>Contacts:</div>
				<div>
					<span class="material-icons">phone</span><a href="tel:${props.phone}" rel="noopener">${props.phone}</a><br>
					<span class="material-icons">mail_outline</span><a href="mailto:${props.email}" rel="noopener">${props.email}</a>
				</div>
		`;
	}
	create() {
		let menuContainer = '.' + this.id;
		
		jQuery(menuContainer).find('.menuTop').append(this.menuTop);
		jQuery(menuContainer).find('.menuBottom').append(this.menuBottom);

		this.menuItemAnimations();
		this.menuAddPlusMinus();
		this.menuAddVisitedIcon();
		this.menuAccordionInit();
		this.menuItemClick();
		this.menuCloseButtonAdd();
		this.menuOpenButtonAdd();
		this.menuCheckVisited();
	}

	menuItemAnimations() {
		let items = document.querySelectorAll('.menu-item');
		for (let i = 0; i < items.length; i++) {
			items[i].style.transitionDelay = (0.3 + 0.01 * i) + 's';
		}
	}
	menuAddPlusMinus() {
		let items = document.querySelectorAll('.menu-item');
		for (let i = 0; i < items.length; i++) {
			if (items[i].classList.contains('menu-item-has-children')) {
				let plusElement = document.createElement('div');
				plusElement.classList.add('menuItemOpenClose');
				let insideElement = items[i].querySelector('a');
				insideElement.appendChild(plusElement);
			}
		}
	}

	menuAddVisitedIcon() {
		let items = document.querySelectorAll('.menu-item');
		for (let i = 0; i < items.length; i++) {
			let visitedElement = document.createElement('div');
			visitedElement.classList.add('menuVisitedIcon');
			visitedElement.style.transitionDelay = (0.3 + 0.02 * i) + 's';
			let insideElement = items[i].querySelector('a');
			insideElement.appendChild(visitedElement);
		}
	}
	menuAccordionInit() {
		// Закрываем все меню второго уровня
		jQuery(".menu-item").find('.sub-menu').hide();

		// Открываем меню второго уровня, если текущая страница находится в нем
		jQuery('.current-menu-item').parent('.sub-menu').show();
		jQuery('.current-menu-item').parent('.sub-menu').parent('.menu-item-has-children').addClass('menuAccordionOpen');
		return;
	};

	menuItemClick() {
		let menuToggle = this.menuToggle;
		function menuAccordionOpen(clickedItems) {
			clickedItems.find(".sub-menu").slideToggle(200);
			clickedItems.toggleClass("menuAccordionOpen");
			return;
		}
		// Есть подменю - открываем аккордеон
		jQuery('.menu-item-has-children a').click(function (event) {
			var clickedItem = jQuery(this).parent('.menu-item');
			menuAccordionOpen(clickedItem);
			return false;
		});

		// Нет подменю - переход по ссылке
		jQuery('.menu-item a').not('.menu-item-has-children>a').click(function (event) {
			menuToggle();
			let newUrl = jQuery(this).attr('href');
			if (newUrl) {
				window.open(newUrl, '_self');
			}
			let newUrlPath = new URL(newUrl, location).pathname;
			let currentUrlPath = window.location.pathname;
			if (currentUrlPath == newUrlPath) {
				let newUrlHash = new URL(newUrl, location).hash;
				if (newUrlHash && page.pano != '') {
					pano.openNext('{' + newUrlHash.replace('#', '') + '}');

				}
			}
			return false;
		});
		return;
	}

	menuCloseButtonAdd() {
		let menuContainer = this.container;
		let menuCloseButton = document.createElement('div');
		menuCloseButton.classList.add('menuCloseButton');
		menuCloseButton.addEventListener('click', this.menuToggle);
		menuContainer.appendChild(menuCloseButton);
	}

	menuOpenButtonAdd() {
		let topBlock = document.getElementById('header');
		let menuOpenButton = document.createElement('div');
		menuOpenButton.classList.add('menuOpenButtonTop');
		menuOpenButton.classList.add('menuOpenButton');
		menuOpenButton.classList.add('buttonPrimary');
		menuOpenButton.addEventListener('click', this.menuToggle);
		topBlock.appendChild(menuOpenButton);

		jQuery('.footerLeft').prepend("<div class='buttonPrimary menuButtonFooter menuOpenButton'><i class='material-icons'>menu</i></div>");
		document.querySelector('.menuButtonFooter').addEventListener('click', this.menuToggle);
	}

	menuCheckVisited() {
		// получить ID текущего пункта меню
		let currentMenuId = jQuery('.current-menu-item:not(.menu-item-has-children)').attr('id');

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
		// добавить к посещенным пунктам меню класс .menuVisited
		for (let i = 0; i < visitedPagesArray.length; i++) {
			let menuId = visitedPagesArray[i];
			if (menuId != '') {
				jQuery('#' + menuId).addClass('menuVisited');
			}
		}

		// сохранить текущий массив посещенных страниц в куки
		let visitedPagesUpdated = visitedPagesArray.join('|');
		window.sessionStorage.setItem('vpVisitedPages', visitedPagesUpdated);

		// Проверить, все ли пункты второго уровня просмотрены и если да, то отметить пункт первого уровня как просмотренный
		jQuery('.menu-item-has-children').each(function () {
			if (jQuery(this).find('.menu-item').not('.menuVisited').length == 0) {
				jQuery(this).addClass('menuVisited');
			}
		});
	}


	menuToggle() {
		if (this.container.classList.contains('menuClose')) {
			this.container.classList.remove('menuClose');
		} else {
			this.container.classList.add('menuClose');
		}
	}
}




(function ($) {
	let menu = new Menu({
		id: 'mainMenuContainer',
		logo: vpThemeSettings.menuLogo,
		phone: vpThemeSettings.menuPhone,
		email: vpThemeSettings.menuEmail,
	});
	menu.create();
	menuTooltips();

})(jQuery);
