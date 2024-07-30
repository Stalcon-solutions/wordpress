<?php

$componentsPath= get_template_directory_uri()."/vp-components/";

add_action( 'wp_head', 'vpAddToHead', 31);
add_action( 'wp_footer', 'vpAddToFooter',40 );

function getPageSlug(){
	global $post;
	return $post->post_name;
}


// Header
function vpAddToHead(){
	if (!isParentPage()) {
		echo '	
				<link href="'.$GLOBALS['componentsPath'].'css/variables.css" rel="stylesheet" />
				<link href="'.$GLOBALS['componentsPath'].'css/index.css" rel="stylesheet" />
				<link href="'.$GLOBALS['componentsPath'].'tooltips/tooltips.css" rel="stylesheet" />
				<link href="'.$GLOBALS['componentsPath'].'css/buttons.css" rel="stylesheet" />
				<link href="'.$GLOBALS['componentsPath'].'css/pages.css" rel="stylesheet" />
				<link href="'.$GLOBALS['componentsPath'].'layout/layout.css" rel="stylesheet" />
				<link href="'.$GLOBALS['componentsPath'].'css/animations.css" rel="stylesheet" />
				<link href="'.$GLOBALS['componentsPath'].'mouse/mouse.css" rel="stylesheet" />
		';
		if(!isStartPage()){
			echo '
				<link href="'.$GLOBALS['componentsPath'].'helpscreen/helpscreen.css" rel="stylesheet" />
				<link href="'.$GLOBALS['componentsPath'].'menu/menu.css" rel="stylesheet" />
				<link href="'.$GLOBALS['componentsPath'].'header-footer/header-footer.css" rel="stylesheet" />
			';
		}
		echo '
			<link href="'.$GLOBALS['componentsPath'].'layout/layout-mobile.css" rel="stylesheet" />
		';
	}
}

// Footer
function vpAddToFooter(){
	if (!isParentPage()) {
		if(isStartPage()){
			echo '
				<script src="'.$GLOBALS['componentsPath'].'mouse/mouse.js"></script>
				<script src="'.$GLOBALS['componentsPath'].'js/index.js"></script>
				<script src="'.$GLOBALS['componentsPath'].'layout/layout.js"></script>
			';
			getLinksFromPageSettings();
		} else {
			echo '
				<script src="'.$GLOBALS['componentsPath'].'3rdparty/tippy/popper.min.js"></script>
				<script src="'.$GLOBALS['componentsPath'].'3rdparty/tippy/tippy.umd.min.js"></script>
				<link href="'.$GLOBALS['componentsPath'].'3rdparty/tippy/tippy.css" rel="stylesheet" />
				<link href="'.$GLOBALS['componentsPath'].'3rdparty/tippy/themes/light.css" rel="stylesheet" />
				<link href="'.$GLOBALS['componentsPath'].'3rdparty/tippy/animations/shift-toward.css" rel="stylesheet" />
				<link href="'.$GLOBALS['componentsPath'].'3rdparty/tippy/animations/scale.css" rel="stylesheet" />

				<script src="'.$GLOBALS['componentsPath'].'mouse/mouse.js"></script>
				<script src="'.$GLOBALS['componentsPath'].'js/index.js"></script>
				<script src="'.$GLOBALS['componentsPath'].'header-footer/header-footer.js"></script>
				<script src="'.$GLOBALS['componentsPath'].'tooltips/tooltips.js"></script>
				<script src="'.$GLOBALS['componentsPath'].'helpscreen/helpscreen.js"></script>

				';
			pagesByType();
			getLinksFromPageSettings();
			echo '
				<script src="'.$GLOBALS['componentsPath'].'js/pages.js"></script>
				<script src="'.$GLOBALS['componentsPath'].'autoplay/autoplay.js"></script>
				<script src="'.$GLOBALS['componentsPath'].'layout/layout.js"></script>
				<script src="'.$GLOBALS['componentsPath'].'menu/menu.js"></script>
				<script src="'.$GLOBALS['componentsPath'].'fullscreen/fullscreen.js"></script>
				<script src="'.$GLOBALS['componentsPath'].'google-analytics/google-analytics.js"></script>
			';
		}
	}

	
}

function pagesByType(){
	if (isPageType('map')){
		echo '
			<link href="'.$GLOBALS['componentsPath'].'map/map.css" rel="stylesheet" />
			<link href="'.$GLOBALS['componentsPath'].'thumbline/thumbline.css" rel="stylesheet" />
			<link href="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css" rel="stylesheet" />
			<script src="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js"></script>
			<script src="'.$GLOBALS['componentsPath'].'3rdparty/scrollbuster/scrollbooster.min.js"></script>
			<script src="'.$GLOBALS['componentsPath'].'thumbline/thumbline.js"></script>
			<script src="'.$GLOBALS['componentsPath'].'map/map.js"></script>
		';
	}
	if (isPageType('pano')){
		echo '
			<link rel="stylesheet" href="'.$GLOBALS['componentsPath'].'pano/pano.css" />
			<script src="'.$GLOBALS['componentsPath'].'pano/pano-functions.js"></script>
			<script src="'.$GLOBALS['componentsPath'].'pano/pano.js"></script>
			<script src="'.$GLOBALS['componentsPath'].'pano/pano-tooltips.js"></script>
		';
	}
	if (isPageType('tabs')){
		echo '
		<link href="'.$GLOBALS['componentsPath'].'tabs/tabs.css" rel="stylesheet" />
		<script src="'.$GLOBALS['componentsPath'].'tabs/tabs.js"></script>
		';
	}
	if (isPageType('popup')){
		echo '
			<script src="'.$GLOBALS['componentsPath'].'popup/popup.js"></script>
			<script src="'.$GLOBALS['componentsPath'].'3rdparty/fancybox/fancybox/fancybox.umd.js"></script>			
			<link rel="stylesheet" href="'.$GLOBALS['componentsPath'].'3rdparty/fancybox/fancybox/fancybox.css" />
			<link href="'.$GLOBALS['componentsPath'].'popup/popup.css" rel="stylesheet" />
		';
	}
	if (isPageType('carousel')){
		echo '
		<link rel="stylesheet"	href="'.$GLOBALS['componentsPath'].'3rdparty/fancybox/carousel/carousel.thumbs.css" />
		<link rel="stylesheet" href="'.$GLOBALS['componentsPath'].'3rdparty/fancybox/carousel/carousel.css" />
		<script src="'.$GLOBALS['componentsPath'].'3rdparty/fancybox/carousel/carousel.umd.js"></script>			
		<script src="'.$GLOBALS['componentsPath'].'3rdparty/fancybox/carousel/carousel.thumbs.umd.js"></script>
		';
	}

}


// Fields: CSS files, JS files at WP page settings
function getLinksFromPageSettings(){
	global $post;
	$jsFilesString=get_post_meta($post->ID,'js_files', true);
	$jsFiles=(explode(PHP_EOL, $jsFilesString));
	for($i=0; $i<count($jsFiles); $i++) {
		$file=trim($jsFiles[$i]);
		if ($file!=''){
			echo '<script src="'.wp_get_upload_dir()['baseurl'].'/js/'.$file.'"></script>';
		}
	}
	$cssFilesString=get_post_meta($post->ID,'css_files', true);
	$cssFiles=(explode(PHP_EOL, $cssFilesString));
	for($i=0; $i<count($cssFiles); $i++) {
		$file=trim($cssFiles[$i]);
		if ($file!=''){
			echo '<link href="'.wp_get_upload_dir()['baseurl'].'/css/'.$file.'" rel="stylesheet" />';
		}
		
	}

}
?>