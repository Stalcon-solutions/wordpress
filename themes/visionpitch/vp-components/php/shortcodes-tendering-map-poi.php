<?php
// Shortcodes for use Data from Posts in Pages
add_shortcode('tendering-map-poi', 'tenderingMapPoi_shortcode');	//  Example: [map-poi category='track-record' map-id='trackMap']

function tenderingMapPoi_shortcode($atts) {
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
			
            $thumb = esc_url($image['sizes']['thumbnail']);
			$im=esc_url($image['sizes']['large']);
			$name=get_the_title();
			
			$lon=get_post_meta(get_the_ID(),'longitude', true);
			$lat=get_post_meta(get_the_ID(),'latitude', true);
			
			$id=get_the_ID();
			$client=get_post_meta(get_the_ID(),'client', true);
            $value=get_post_meta(get_the_ID(),'value', true);
            $address=get_post_meta(get_the_ID(),'address', true);
            $confirmed=get_post_meta(get_the_ID(),'confirmed', true);

            $output.=parse_poi_tendering($id, $name, $lon, $lat, $im, $client, $value, $address, $thumb, $confirmed);
			
        }
        $output.="]};</script>";
    } else {
        $output = '';
    }

    
    wp_reset_postdata();

    return $output;
}



function parse_poi_tendering($id, $name, $lon, $lat, $im, $client, $value, $address, $thumb, $confirmed){
        $data=[
            'id' => $id,
            'name' => $name,
            'lon' => $lon,
            'lat' => $lat,
            'thumb' => $thumb,
            'image' => $im,
            'client' => $client,
            'value' => $value,
            'address' => $address,
            'confirmed' => $confirmed,
        ];
        $json_data = json_encode($data).",";
        // $json_data = json_encode($data, JSON_PRETTY_PRINT).",";
    return $json_data;
}
?>