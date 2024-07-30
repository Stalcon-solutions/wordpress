<?php
/**
 * Header Template (header.php)
 * @package WordPress
 * @subpackage VisionPitch-template
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' );  ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

	<?php /* Все скрипты и стили теперь подключаются в functions.php */ ?>

	<!--[if lt IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	

	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">

	
	<?php wp_head(); // необходимо для работы плагинов и функционала ?>
</head>
<body <?php body_class(); // все классы для body ?> data-page-url="<?php echo $post->post_name ?>" data-domain="<?php echo $_SERVER['SERVER_NAME'] ?>">
	
	<?php
	if (!isStartPage() && !isParentPage()) {
		addHeaderTag();
	}
	?>




<?php

function addHeaderTag(){
	echo '
	<header id="header">
				<nav class="slideTitleContainer" id="slideTitleContainer">'.pagesListNavigator().'</nav>
				<div class="headerProjectTitle">'.get_bloginfo( 'name' ).'<span>, '.get_bloginfo( 'description' ).'</span></div>
	</header>
	';
}

//////////////////////////////////////////////////////////////////////////////////
// Top left navigator
function getExcludePages(){
	// Get pages with menu_order < 0 to exclude thats from Top Navigator
	$pages = get_pages();
	$resultArray=array();
	foreach ($pages as $page) {
 		if ($page->menu_order < 0) {
 			$resultArray[] = $page->ID;
 		}
	}
	return $resultArray;
}

function pagesListNavigator(){
	$curPagID=get_the_ID();
	$excludePages=getExcludePages();

	$excludePages=array_merge($excludePages, excludePages());	// exclude pages with Field 'Hide at domain'
	$pages = get_pages(
    	array (
        	'parent'  => 0, 
			'exclude' => $excludePages,	
			'sort_order' => 'ASC',
			'sort_column' => 'menu_order',
			'post_type'=>'page'
    	)
	);
	$name = wp_list_pluck( $pages, 'post_title' );
	$url = wp_list_pluck( $pages, 'post_name' );
	$ids = wp_list_pluck( $pages, 'ID' );

	$res='';

	for($i=0; $i<count($name); $i++) {
	$active='';
	if ($ids[$i]==$curPagID)
		$active='slideTitleItemActive';
		$url2=$url[$i];
	$res=$res.'<div class="slideTitleItem '.$active.'" slideurl="/'.$url2.'/" id="navigatorItem'.$i.'" data-tippy-content="'.$name[$i].'">'.$name[$i].'</div>';
	}

	return $res;
}
//////////////////////////////////////////////////////////////////////////////////

?>