<?php
	$componentsFolder='/vp-components';
	require_once get_template_directory().$componentsFolder.'/php/theme-options.php';
	require_once get_template_directory().$componentsFolder.'/php/shortcodes.php';
	require_once get_template_directory().$componentsFolder.'/php/shortcodes-team.php';
	require_once get_template_directory().$componentsFolder.'/php/shortcodes-tables.php';
	require_once get_template_directory().$componentsFolder.'/php/shortcodes-pano.php';
	require_once get_template_directory().$componentsFolder.'/php/shortcodes-map.php';
	require_once get_template_directory().$componentsFolder.'/php/shortcodes-map-poi.php';
	require_once get_template_directory().$componentsFolder.'/php/admin-columns.php';
	require_once get_template_directory().$componentsFolder.'/php/includes.php';
	require_once get_template_directory().$componentsFolder.'/google-analytics/google-analytics.php';
	require_once get_template_directory().$componentsFolder.'/php/page-vars.php';
	require_once get_template_directory().$componentsFolder.'/menu/menu.php';


function console_log($data){ 
    if(is_array($data) || is_object($data)){
		echo("<script>console.log('php_array: ".json_encode($data)."');</script>");
	} else {
		echo("<script>console.log('php_string: ".$data."');</script>");
	}
}

function isStartPage(){
	global $post;
	$startPage=false;
	if ($post->menu_order==0) {
		$startPage=true;
	}
	return $startPage;
}

// check Parent Page (Main) with iframe
// if Menu Order < 0
function isParentPage(){
	global $post;
	$parentPage=false;
	if ($post->menu_order<0) {
		$parentPage=true;
	}
	return $parentPage;
}

function isPageType($type){
	global $post;
	$pt=get_post_meta($post->ID,'page_type', true);
	if (is_array($pt)) {
		if (in_array($type, $pt)) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}












// Functions for exclude pages that have the current domain specified in the "Hide page at domain" field (ACF Plugin)

function checkDomain($pageID){
	$currentDomain = $_SERVER['SERVER_NAME'];
	str_replace("www.","",$currentDomain);
	// get Field 'Hide at domain' to array
	$hideAtDomainsString=get_post_meta($pageID,'hide_at_domain', true);
	if ($hideAtDomainsString!='') {
		$hideAtDomainsArray=explode(',',$hideAtDomainsString);
		$hideAtDomainsArray = array_map('trim', $hideAtDomainsArray);
		if (is_array($hideAtDomainsArray)) {
			// check domains
			if (in_array($currentDomain, $hideAtDomainsArray)) {
				return false;
			} else {
				return true;
			}
		} else {
			// if Field is empty - we can show this page at this domain
			return true;
		}
	} else {
		// if Field is empty - we can show this page at this domain
		return true;
	}
}

function excludePages(){
	$exclP=array();
	// get all pages list
	$args = array(
		'post_type' => 'page',
		'post_status' => 'publish',
		'fields' => 'ids',
		'posts_per_page' => -1,
	);
	
	$pages = get_posts($args);
	
	if ($pages) {
		$page_ids = wp_list_pluck($pages, 'ID');
	}


	// each page check Field 'Hide at domain'
	// If Field has Current domain - add to array
	foreach ($pages as &$value) {
		if (!checkDomain($value)){
			array_push($exclP,$value);
		}
	}
	return $exclP;
}

?>