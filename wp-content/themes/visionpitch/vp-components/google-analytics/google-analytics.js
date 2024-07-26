function googleAnalyticsEvent(event){
	gtag('event', event, {
		'event_category': 'UI element pressed',
	});
}


// run after DOM loaded
window.addEventListener("DOMContentLoaded", function () {
	jQuery('.nextButton').click(()=>{
		googleAnalyticsEvent('Next Button pressed');
	});
	jQuery('.prevButton').click(() => {
		googleAnalyticsEvent('Prev Button pressed');
	});
	jQuery('.footerLogo').click(() => {
		googleAnalyticsEvent('VP Logo Pressed');
	});
}, false);