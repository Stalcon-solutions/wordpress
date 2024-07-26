<?php
add_action( 'wp_head', 'mbAddPageInfo',30 );

function mbAddPageInfo(){
	global $post;
	global $wpdb;
	
	$pageBg=wp_get_original_image_url(get_post_meta($post->ID,'background_image', true));
	
	$pt=get_post_meta($post->ID,'page_type', true);
	if (is_array($pt)) {
		$pageType=implode(',',$pt);
	} else {
		$pageType='';
	}

	$pl=get_post_meta($post->ID,'page_left_props', true);
	if (is_array($pl)) {
		$pageLeftSideSettings=implode(',',$pl);
	} else {
		$pageLeftSideSettings='';
	}
	
	

	$panoUrl=get_post_meta($post->ID,'panorama_url', true);
	$mapCenterLat=get_post_meta($post->ID,'map_center_lat', true);
	$mapCenterLon=get_post_meta($post->ID,'map_center_lon', true);
	$mapZoom=get_post_meta($post->ID,'map_zoom', true);
	$mapWithTrains=get_post_meta($post->ID,'map_locations', true);
	
	
	if ($post->menu_order ==0) {
		$startPage=1;
	} else {
		$startPage='';
	}


	$menu_items = wp_get_nav_menu_items( 'mainMenu' );
	$this_item = current( wp_filter_object_list( $menu_items, array( 'object_id' => get_queried_object_id() ) ) );
	$menuId= $this_item->ID;

$q="SELECT * FROM `wp_posts` WHERE `post_type` = 'page' AND `post_status`='publish' AND `menu_order` = 0 ORDER BY `menu_order` ASC LIMIT 1";
$pageStartUrl= get_permalink(intval($wpdb->get_var( $q, 0, 0)));
$pageUrl=$post->post_name;



$curPagID=get_the_ID();
$pages = get_pages(
    array (
        	'parent'  => 0, 
			'sort_order' => 'ASC',
			'sort_column' => 'menu_order',
			'post_type'=>'page'
    	)
);
$ids = wp_list_pluck( $pages, 'ID' );
$pageIndex = array_search($curPagID, $ids);




// prev-next pages
$curPag=$post->menu_order;
$excludePagesArray=excludePages();
$excludePages="";
if (count($excludePagesArray)>0){
	foreach ($excludePagesArray as $exclPage) {
		$excludePages.=" AND ID!=".$exclPage;
	  }
}
// next page
$q="SELECT * FROM `wp_posts` WHERE `post_type` = 'page' AND `post_status`='publish' AND `menu_order` >= 0 AND `menu_order` > ".$curPag." ".$excludePages." ORDER BY `menu_order` ASC LIMIT 1";
$res=$wpdb->get_var( $q, 0, 0);
if ($res=='') {
	$q="SELECT * FROM `wp_posts` WHERE `post_type` = 'page' AND `post_status`='publish' AND `menu_order` >= 0  ".$excludePages." ORDER BY `menu_order` ASC LIMIT 1";
}
$nextPageUrl=get_permalink(intval($wpdb->get_var( $q, 0, 0)));
$nextPageTitle=$wpdb->get_var( $q, 5, 0);

// prev page
$q="SELECT * FROM `wp_posts` WHERE `post_type` = 'page' AND `post_status`='publish' AND `menu_order` >= 0 AND `menu_order` < ".$curPag." ".$excludePages." ORDER BY `menu_order` DESC LIMIT 1";
$res=$wpdb->get_var( $q, 0, 0);
if ($res=='') {
	$q="SELECT * FROM `wp_posts` WHERE `post_type` = 'page' AND `post_status`='publish' AND `menu_order` >= 0  ".$excludePages." ORDER BY `menu_order` DESC LIMIT 1";
}
$prevPageUrl= get_permalink(intval($wpdb->get_var( $q, 0, 0)));
$prevPageTitle=$wpdb->get_var( $q, 5, 0);





$postTitle = get_the_title();
$isMobile=wp_is_mobile();
$vpThemeDirectory=get_stylesheet_directory_uri();
$vpThemeMenuLogo=get_option('theme_menuLogo');
if ($vpThemeMenuLogo=='') {
	$vpThemeMenuLogo=$vpThemeDirectory.'/images/vp-small-logo.png';
} else {
	$vpThemeMenuLogo=wp_get_upload_dir()['url'].'/'.$vpThemeMenuLogo;
}
$vpThemeMenuPhone=get_option('theme_menuPhone');
$vpThemeMenuEmail=get_option('theme_menuEmail');


	echo "
	<script>
	let vpThemeSettings={
		directory:`$vpThemeDirectory`,
		menuLogo:`$vpThemeMenuLogo`,
		menuPhone:`$vpThemeMenuPhone`,
		menuEmail:`$vpThemeMenuEmail`,
	}
	let page = {
		isStartPage: `$startPage`,
		pageBG: `$pageBg`,
		pageType: `$pageType`,
		pageLeftSide: `$pageLeftSideSettings`,
		pageIndex: `$pageIndex`,
		panoUrl: `$panoUrl`,
		mapCenterLat: `$mapCenterLat`,
		mapCenterLon: `$mapCenterLon`,
		mapZoom: `$mapZoom`,
		mapWithTrains: `$mapWithTrains`,
		isMobile:`$isMobile`,
		pageStartUrl: `$pageStartUrl`,
		pageUrl: `$pageUrl`,
		nextPageUrl: `$nextPageUrl`,
		nextPageTitle: `$nextPageTitle`,
		prevPageUrl: `$prevPageUrl`,
		prevPageTitle: `$prevPageTitle`,
		postTitle: `$postTitle`,
		menuId: `$menuId`,
	};
	</script>
	";
}

?>