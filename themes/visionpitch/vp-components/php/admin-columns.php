<?php

// ADMIN COLUMNS 
// POSTS

add_filter('manage_posts_columns', 'custom_columns_head');
add_action('manage_posts_custom_column', 'custom_columns_content', 10, 2);

function custom_columns_head($columns) {
    $columns['ID'] = 'ID';
    $columns['company'] = 'Company';
    $columns['order'] = 'Order';
    $columns['image'] = 'Image';
    $columns['road_type'] = 'Road type';
    $columns['longitude'] = 'Longitude';
    $columns['latitude'] = 'Latitude';
    $columns['type'] = 'Featured';
    
    
    return $columns;
}

function custom_columns_content($column_name, $post_ID) {
    if ($column_name == 'ID') {
        $res = get_the_ID();
        echo $res;
    }
    if ($column_name == 'road_type') {
        $res = get_field('road_type', $post_ID);
        echo $res;
    }
    if ($column_name == 'order') {
        $res = get_field('order', $post_ID);
        echo $res;
    }
	if ($column_name == 'longitude') {
        $res = get_field('longitude', $post_ID);
        echo $res;
    }
	if ($column_name == 'latitude') {
        $res = get_field('latitude', $post_ID);
        echo $res;
    }
	if ($column_name == 'type') {
        $res = get_field('type', $post_ID);
        if (is_array($res)) {
            $res = implode(', ', $res);
        } 
        echo $res;
    }
	if ($column_name == 'company') {
        $res = get_field('company', $post_ID);
        if (is_array($res)) {
            $res = implode(', ', $res);
        } 
        echo $res;
    }
	if ($column_name == 'image') {
        $image = get_field('image', $post_ID);
        if (is_array($image)) {
            $thumb = esc_url($image['sizes']['thumbnail']);
        } else {
            $thumb = $image;
        }
        if ($thumb){
            $res="<img src='".$thumb."' style='width:40px; background-color:gray' />";
        }
        echo $res;
    }
}






// PAGES
add_filter('manage_pages_columns', 'pages_custom_columns_head');
add_action('manage_pages_custom_column', 'pages_custom_columns_content', 10, 2);
function pages_custom_columns_head($columns) {
    $columns['ID'] = 'ID';
    $columns['order'] = 'Order';
    $columns['page_type'] = 'Page Type';
    $columns['panorama_url'] = 'Pano Custom ID';
    $columns['hide_at_domain'] = 'Hide at domains';
    return $columns;
}

function pages_custom_columns_content($column_name, $post_ID) {
    if ($column_name == 'ID') {
        $res = get_the_ID();
        echo $res;
    }
    if ($column_name == 'order') {
        $res = get_post()->menu_order;
        echo $res;
    }
	if ($column_name == 'page_type') {
        $resArr=get_field('page_type', $post_ID);
        if (is_array($resArr)) {
            $res = implode(', ', $resArr);
        } else {
            $res=$resArr;
        }
        echo $res;
    }
	if ($column_name == 'panorama_url') {
        $res = get_field('panorama_url', $post_ID);
        echo $res;
    }
	if ($column_name == 'hide_at_domain') {
        $resArr = get_field('hide_at_domain', $post_ID);
        if (is_array($resArr)) {
            $res = implode(', ', $resArr);
        } else {
            $res=$resArr;
        }

        echo $res;
    }
}
?>