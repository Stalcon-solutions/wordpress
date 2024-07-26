class Tabs{
	constructor(props){
		this.tabHeaderClass = '.'+props.tabHeaderClass;
		this.tabPaneClass = '.'+props.tabPaneClass;
		let activeTab=props.activeTab-1;
		this.activeClass = props.activeClass;
		let tabs = document.querySelectorAll(this.tabHeaderClass);
		let panes = document.querySelectorAll(this.tabPaneClass);
		let changeTab = this.changeTab.bind(this);
		if(tabs[activeTab]!==undefined){
			let activeTabElement=tabs[activeTab].dataset.tabId;
			changeTab(activeTabElement);
		}
		
		tabs.forEach((element) => {
			element.addEventListener('click', (e) => {
				let selected = e.target.dataset.tabId;
				changeTab(selected);
			});
		});
	}
	changeTab(tabId){
			jQuery(this.tabHeaderClass).removeClass(this.activeClass);
			jQuery(this.tabHeaderClass + '[data-tab-id="' + tabId + '"]').addClass(this.activeClass);
			jQuery(this.tabPaneClass).removeClass(this.activeClass);
			jQuery(this.tabPaneClass + '#' + tabId).addClass(this.activeClass);
			this.tabHeight();
	}
	tabHeight(){
		let tabPaneClass=this.tabPaneClass;
		let activeClass=this.activeClass;

		setTimeout(function(){
			let activeChildHeight = jQuery(tabPaneClass + '.' + activeClass).height();
			let activeChildWidth = jQuery(tabPaneClass + '.' + activeClass).width();
			jQuery('.tabContent').animate({ height: activeChildHeight, width: activeChildWidth}, 500);
	
		}, 200);
	}

		
}

let tab = new Tabs({
	tabHeaderClass: 'tabHeader',
	tabPaneClass: 'tabPane',
	activeClass: 'active',
	activeTab: 1,
});

// run after DOM loaded
// window.addEventListener("DOMContentLoaded", function () {
	
// });
