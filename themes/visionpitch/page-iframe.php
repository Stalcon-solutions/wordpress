<?php
/**
 * Mainpage with Iframe (page-iframe.php)
 * @package WordPress
 * @subpackage VisionPitch-template
 * Template Name: Mainpage with Iframe
 */


 
	remove_action('wp_head', 'mbAddToHead', 31);
	remove_action('wp_footer', 'mbAddToFooter', 40);
	remove_action( 'wp_head', 'mbAddPageInfo',30 );
	remove_action( 'wp_body_open', 'addHeaderTag' );
	remove_action( 'wp_footer', 'addFooterTag', 1);
	remove_action( 'wp_footer', 'addMenu', 1);


	remove_action( 'wp_head',             'locale_stylesheet');
	remove_action( 'wp_head', 'wp_maybe_inline_styles',1);
	remove_action( 'wp_head', 'wp_oembed_add_discovery_links');
	remove_action( 'wp_head', 'wp_oembed_add_host_js');
	remove_action( 'wp_head', 'wp_print_font_faces', 50);
	remove_action( 'wp_head', 'rest_output_link_wp_head', 10, 0 );

remove_action( 'wp_head', 'wp_enqueue_scripts', 1 );
remove_action( 'wp_head', 'wp_resource_hints', 2 );
remove_action( 'wp_head', 'wp_preload_resources', 1 );
remove_action( 'wp_head', 'feed_links', 2 );
remove_action( 'wp_head', 'feed_links_extra', 3 );
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'locale_stylesheet' );
remove_action( 'publish_future_post', 'check_and_publish_future_post', 10, 1 );
remove_action( 'wp_head', 'wp_robots', 1 );
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_head', 'wp_print_styles', 8 );
remove_action( 'wp_head', 'wp_print_head_scripts', 9 );
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'rel_canonical' );
remove_action( 'wp_head', 'wp_shortlink_wp_head', 10, 0 );
remove_action( 'wp_head', 'wp_custom_css_cb', 101 );
remove_action( 'wp_head', 'wp_site_icon', 99 );
remove_action( 'wp_head', 'wp_post_preview_js', 1 );


get_header(); ?>

<link href="<?php echo  get_template_directory_uri(); ?>/vp-components/iframepage/iframepage.css" rel="stylesheet">
<script src="<?php echo  get_template_directory_uri(); ?>/vp-components/iframepage/iframepage.js"></script>