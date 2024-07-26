class Popup{
	constructor(props){

		// jQuery('.openPopupContent').each(function (index) {
		// 	jQuery(this).find('img').attr('data-fancybox', 'vpFancyGroup');
		// });

		jQuery('[data-popup-id]').each(function (index) {
			let popupId = jQuery(this).attr('data-popup-id');
		
			jQuery(this).addClass('openPopupContent');
			let group=jQuery(this).attr('data-popup-group');
			if (group) {
				jQuery(this).attr('data-fancybox', group);
			} else {
				jQuery(this).attr('data-fancybox', 'vpFancyGroup');
			}
			jQuery(this).attr('data-src', '#' + popupId);
			jQuery('#' + popupId).hide();
			jQuery('#' + popupId).addClass('popupContent');
		});


	}
	run(){
		Fancybox.bind("[data-fancybox]", {
			animated:true,
			groupAll: false,
			closeButton: false,
			compact: true,
			Thumbs: false,
			Hash: false,
			Carousel: {
				infinite: false,

				

				Navigation: {
					prevTpl:
						'<i class="material-icons">chevron_left</i>',
					nextTpl:
					  '<i class="material-icons">chevron_right</i>',
				  },

				  
			},
			tpl: {
				closeButton:
					'<button data-fancybox-close class="popupCloseButton buttonPrimary" title="{{CLOSE}}"><i class="material-icons">close</i></button>',
			},

			on: {
				close: (fancybox, slide) => {
					jQuery('.popupContent').hide();
				},
			  },
		});
	}
	close(){
		Fancybox.close();
	}
	open(content){
		
	}
}
let popup = new Popup({
});
window.addEventListener("DOMContentLoaded", function () {

	// at Maps run after map loading
	// if (page.pageType.indexOf('map')==-1) {
		popup.run();
	// }
}, false);

window.addEventListener("beforeunload", function(){
	popup.close();
});