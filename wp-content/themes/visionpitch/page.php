<?php
/**
 * Default page Template (page.php)
 * @package WordPress
 * @subpackage VisionPitch-template
 */
get_header(); // include header.php
remove_filter('the_content', 'wpautop'); // remove auto add <BR /> tag in text
remove_filter ('acf_the_content', 'wpautop');

// Left side page Content
$lsc=get_field('left_side_content',false,true); 
if (is_array($lsc)) {
	$pageLeftSideContent=implode(',',$lsc);
} else {
	$pageLeftSideContent=$lsc;
}

?>

<main id="page" class="main" data-page-url="<?php echo $post->post_name ?>">
	<?php
	if(trim($pageLeftSideContent)!='') echo'
		<aside class="leftSide">
			'.trim(str_replace(['<p>', '</p>'], '', $pageLeftSideContent)).'
		</aside>
	';
	
	$style='style="';
	if(trim($pageLeftSideContent)=='') $style.='width:100%; padding:0 5%';
	// if(isPageType('map')) $style.='display:none;';
	$style.='"';
	?>

	
	<section class='rightSide' <?php echo $style; ?>>
	<?php
	while ( have_posts() ) {
		the_post();
		the_content();
	}
	?>
	</section>
</main>

<?php get_footer(); // include footer.php ?>