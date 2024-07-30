<?php
// Shortcodes for use Data from Posts in Pages
add_shortcode('include_html', 'include_html_shortcode'); // [include_html file="../uploads/html/about.html"]

add_shortcode('poi_at_map', 'poi_at_map_shortcode');	// Project Location page (POI at Map). Example: [poi_at_map]











// Include HTML file
function include_html_shortcode($atts) {
    $atts = shortcode_atts(
        array(
            'file' => ''
        ),
        $atts,
        'includeHtml'
    );

    if (empty($atts['file'])) {
        return '';
    }

    // $file_path = get_template_directory() . '/' . $atts['file'];
    $file_path = wp_get_upload_dir()['basedir'].'/'.$atts['file'];

    if (!file_exists($file_path)) {
        return $file_path.'File not found';
    }

    ob_start();
    include($file_path);
    $output = ob_get_clean();

    return $output;
}






function poi_at_map_shortcode() {
    $args = array(
        'post_type' => 'post',
        'posts_per_page' => -1,
        'category_name' => 'poi_at_map',
    );

    $query = new WP_Query($args);


	if ($query->have_posts()) {

		$output = '';

		while ($query->have_posts()) {
			$query->the_post();
			$name=get_the_title();
			$group=get_post_meta(get_the_ID(),'group', true);
			$lon=get_post_meta(get_the_ID(),'longitude', true);
			$lat=get_post_meta(get_the_ID(),'latitude', true);
			$routetype=get_post_meta(get_the_ID(),'road_type', true);
			$routetime=get_post_meta(get_the_ID(),'route_time', true);
			$description=nl2br(get_post_meta(get_the_ID(),'description', true));
			$route=get_post_meta(get_the_ID(),'route', true);

			$output .= "
			<div class='mapLocationObject'>
				<div class='mapLocationTitle'>{$name}</div>
				<div class='mapLocationGroup'>{$group}</div>
				<div class='mapLocationLon'>{$lon}</div>
				<div class='mapLocationLat'>{$lat}</div>
				<div class='mapLocationRouteType'>{$routetype}</div>
				<div class='mapLocationRouteTime'>{$routetime}</div>
				<div class='mapLocationDescription'>{$description}</div>
				<div class='mapLocationRouteJson'>{$route}</div>
			</div>";
		}

    } else {
        $output = '';
    }

    wp_reset_postdata();

    return $output;
	


}
?>