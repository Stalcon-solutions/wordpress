<?php


add_action( 'wp_footer', 'addVPMenu', 1);
add_filter('wp_nav_menu_objects', 'hide_menu_items', 10, 2);

function addVPMenu(){
	if(!isStartPage() && !isParentPage()){
		$menu=wp_nav_menu([
			'menu' => 'mainMenu',
			'echo' => false,
		]);

		echo "
			<nav class='menuContainer mainMenuContainer menuClose'>
				<div class='menuTop'></div>
				<div class='mainMenu'>".$menu."</div>
				<div class='menuBottom'></div>
			</nav>
		";
	}
}


// hide menu items which pages has Field 'Hide at domain'
function hide_menu_items($items, $args) {
    foreach ($items as $key => $item) {
        // get Pae ID from Menu Item
        $pageID = $item->object_id;
        
        // Check Filed 'Hide at domain'
		if (!checkDomain($pageID)) {
			unset($items[$key]);
		}

    }
    return $items;
}

?>