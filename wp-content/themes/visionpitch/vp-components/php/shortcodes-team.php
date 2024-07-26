<?php
add_shortcode('team', 'post_team_shortcode');		//  Example: [team category='team']

// Team - START
function post_team_shortcode($atts) {

    $atts = shortcode_atts( array(
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
        $output = "
            <script>
                let team=[
        ";
        while ($query->have_posts()) {
            $query->the_post();
            $id=get_the_ID();
			$name=get_the_title();
			$order=get_post_meta(get_the_ID(),'order', true);
			$role=get_post_meta(get_the_ID(),'role', true);
			$image=wp_get_attachment_url(get_post_meta(get_the_ID(),'image', true));
			$thumb=wp_get_attachment_thumb_url(get_post_meta(get_the_ID(),'image', true));
			$content=get_the_content();

            $output.=parse_team($id, $name, $order, $role, $image, $thumb, $content);
			
        }
        $output.="];</script>";
    } else {
        $output = '';
    }
        
    wp_reset_postdata();

    return $output;

}

function parse_team($id, $name, $order, $role, $image, $thumb, $content){
    $data=[
        'id' => $id,
        'name' => $name,
        'order' => $order,
        'role' => $role,
        'image' => $image,
        'thumb' => $thumb,
        'content' => $content,
    ];
    $json_data = json_encode($data).",";
return $json_data;
}

// Team - FINISH
?>