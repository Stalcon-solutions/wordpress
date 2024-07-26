class Thumbline {
	constructor(id, hide=false) {
		let thumbline = "<div class='thumbContainerWrap' data-thumbcontainer-id='"+id+"'>";
		thumbline += "<div class='thumbContainer' id='" + id + "'>";
		thumbline += "<div class='thumbLine'>";
		thumbline += "</div></div></div>";
		jQuery('main').append(thumbline);
		this.thumbline = thumbline;
		this.id = id;
		this.scroll=this.addScroll(this.id);
		this.addHideButton(this.id);
		if (isSmallScreen() || hide) this.hide();
	}
	update(){
		this.scroll.updateMetrics();
	}
	addScroll(id) {
		// делаем ширину контейнера thumbContainer  равной ширине ленты thumbLine
		let thumblineId = id;
		let currentObj = this;
		currentObj.resize(thumblineId);
		window.addEventListener('resize', function (event) { currentObj.resize(thumblineId); });
		// включаем прокрутку
		let thumbScroll = new ScrollBooster({
			viewport: document.getElementById(thumblineId),
			scrollMode: 'native',
			direction: 'horizontal',
			bounce: true,
			content: document.getElementById(thumblineId).querySelector('.thumbLine'),
		});
		return thumbScroll;
	}

	addHideButton(id) {
		let thumbCloseButton = "<div class='thumbCloseButton'></div>";
		let currentObj = this;
		jQuery('#'+id).parent('.thumbContainerWrap').append(thumbCloseButton);
		jQuery('#'+id).parent('.thumbContainerWrap').find(".thumbCloseButton").on("click", function () {
			currentObj.toggle();
		});
	}

	toggle() {
		jQuery('.thumbContainerWrap').toggleClass('closedThumbLine');
		jQuery('.switherAboveThumbs').toggleClass('closedThumbLine');
	}
	hide() {
		jQuery('.thumbContainerWrap').addClass('closedThumbLine');
		jQuery('.switherAboveThumbs').addClass('closedThumbLine');
	}
	addTooltips() {
		let thumbs = document.getElementById(this.id).querySelectorAll('.thumb');
		tippy(thumbs, {
			sticky: true,
			touch: true,
			touch: ['hold', 10],
			theme: 'light',
		});
	}

	addThumbnail(index, image, title, panoId, clickFunction, numbers=true) {
		let thumbLineId = this.id;
		let hide=this.hide;
		let thumb = document.createElement('div');
		thumb.classList.add('thumb');
		thumb.setAttribute('id', 'thumb' + index);
		
		thumb.dataset.tippyContent = title;
		if (panoId) {
			thumb.dataset.panoId = panoId;
		}
		
		if (clickFunction!==undefined && clickFunction!=''){
			jQuery(thumb).on('click touchend',()=>{
				clickFunction(thumb);
				if (isSmallScreen())
					hide();
			});
		}

		thumb.style.backgroundImage = 'url(' + image + ')';

		if (numbers) {
			let thumbNumberInsideHtml = "<div class='thumbFade'><div class='thumbNum'>"+(index+1)+"</div></div>";
			thumb.innerHTML = thumbNumberInsideHtml;
		}
		
		

		let thumbLine = document.getElementById(thumbLineId).querySelector('.thumbLine');
		thumbLine.appendChild(thumb);
		this.resize(thumbLineId);
	}

	resize(id) {
		let thumbContainer = document.getElementById(id);
		let thumbLine = thumbContainer.querySelector('.thumbLine');
		let width = thumbLine.offsetWidth;
		let windowWidth = window.innerWidth;
		if (windowWidth < width) {
			width = windowWidth;
		}
		thumbContainer.style.width = width + 'px';
		// thumbContainer.style.width = (window.innerWidth/2) + 'px';
	}

}



// Array = [Thumb Image, Title, Pano Node ID]
class PanoThumbline {
	constructor(props) {
		let onComplete = props.onComplete || function() {}; // Callback function: fires after Thumbs created 
		let onThumbClick = props.onThumbClick || function() {};		// Callback function: fires after Thumb clicked
		let id = props.id;
		let thumbs = props.thumbs;
		let path = props.path;
		let hide = props.hide;

		let thumbScroll;
		pano.on("configloaded", function () {
			// Создаем полоску с превьюшками для слайда с Thumbnails
			let thumbLine = new Thumbline(id, hide);
			thumbScroll=thumbLine.scroll;
			for (let i = 0; i < thumbs.length; i++) {
				let img = path + thumbs[i][0];
				let title = thumbs[i][1];
				let panoId = thumbs[i][2];
				thumbLine.addThumbnail(i, img, title, panoId, archThumbClick, false);
			}
			thumbLine.addTooltips();
			onComplete();
		});

		// подсветка текущей панорамы
		pano.on("changenode", function () {
			highlightCurrentThumb(thumbScroll);
			if (jQuery('.mapContainer:visible').length<1){
				archThumbClick();
			}
		});

		function archThumbClick(e) {
			let panoId= pano.getNodeUserdata().customnodeid;
			if (e) {
				panoId = e.dataset.panoId;
				pano.openNext("{" + panoId + "}");
			}
			onThumbClick(panoId);
		}

		function highlightCurrentThumb(thumbScroll) {
			// Получаем ID текущей панорамы, чтобы сравнить с ID записаным в аттрибуте Thumb-а
			// Так же получаем данные из переменной thumbGroup, чтобы подсветить thumb при переходе
			let panoId = pano.getNodeUserdata(pano.getCurrentNode()).customnodeid;
			let thumbGroup = pano.getVariableValue('thumbGroup');
			let thumbs = document.getElementById(id).querySelectorAll('.thumb');
			if (thumbs.length > 0) {
				for (let i = 0; i < thumbs.length; i++) {
					thumbs[i].classList.remove('thumbSelected');
					if (thumbs[i].dataset.panoId == panoId || thumbs[i].dataset.panoId == thumbGroup) {
						thumbs[i].classList.add('thumbSelected');
						// прокрутка к текущему thumb
						let x = thumbs[i].offsetLeft;
						thumbScroll.scrollTo({ x: x, y: 0 });
					}
				}
			}
		}
	}
}