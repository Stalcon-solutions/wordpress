<?php
// Shortcodes for use Data from Posts in Pages
add_shortcode('map-poi', 'mapPoi_shortcode');	//  Example: [map-poi category='track-record' map-id='trackMap']

function mapPoi_shortcode($atts) {
    $atts = shortcode_atts( array(
        'map-id' => '',
        'thumbline-id' => '',
        'category' => '',
    ), $atts );

    $args = array(
        'post_type' => 'post',
        'posts_per_page' => -1,
        'category_name' => $atts['category'],
		'meta_key' => 'order',
		'orderby' => 'meta_value_num',
		'order' => 'ASC',
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) {
        if (empty($atts['thumbline-id'])) {
            $thLn="";
        } else {
            $thLn="thumblineId:'{$atts['thumbline-id']}',";
        }

        $output = "
            <script>
                let mapPoi={
                    mapId: '{$atts['map-id']}',
                    ".$thLn."
                    poi:[
        ";
        while ($query->have_posts()) {
            $query->the_post();
			$image = get_field('image');
			$galleryRaw = get_field('gallery');
			$thumb = esc_url($image['sizes']['thumbnail']);
			$im=esc_url($image['sizes']['large']);
			$name=get_the_title();
			
            if (get_post_meta(get_the_ID(),'type', true)) {
				$type="featured";
			} else {
				$type="";
			}
			
			$lon=get_post_meta(get_the_ID(),'longitude', true);
			$lat=get_post_meta(get_the_ID(),'latitude', true);
			$content=get_post_meta(get_the_ID(),'description', true);
			$id=get_the_ID();
			$stage=get_post_meta(get_the_ID(),'stage', true);
            $bottom=get_post_meta(get_the_ID(),'description_more', true);
			$pulse="";
            $output.=parse_poi($id, $name, $lon, $lat, $thumb, $pulse, $content, $im, $galleryRaw, $type, $bottom, $stage);
			
        }
        $output.="]};</script>";
    } else {
        $output = '';
    }

    
    wp_reset_postdata();

    return $output;
}



function parse_poi($id, $name, $lon, $lat, $thumb, $pulse, $content, $im, $galleryRaw, $type, $bottom, $stage){
        $data=[
            'id' => $id,
            'name' => $name,
            'lon' => $lon,
            'lat' => $lat,
            'thumb' => $thumb,
            'pulse' => $pulse,
            'image' => $im,
            'galleryRaw' => $galleryRaw,
            'type' => $type,
            'bottom' => $bottom,
            'stage' => $stage,
            'content' => $content,
        ];
        $json_data = json_encode($data).",";
        // $json_data = json_encode($data, JSON_PRETTY_PRINT).",";
    return $json_data;
}
?>