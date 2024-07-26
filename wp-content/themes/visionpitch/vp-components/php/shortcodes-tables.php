<?php
add_shortcode('table', 'posts_table_shortcode');						// One Table with SLug Name [posts_table name="slug-name"]

// Tables



function posts_table_shortcode($atts) {

    $atts = shortcode_atts( array(
        'name' => '',
    ), $atts );


    $args = array(
        'post_type' => 'post',
        'posts_per_page' => -1,
        'name' => $atts['name'],
		'meta_key' => 'order',
		'orderby' => 'meta_value_num',
		'order' => 'ASC',
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) {
        $tabContent = '';
        while ($query->have_posts()) {
            $query->the_post();
			// $name=get_the_title();
			// $category=$atts['category'];
			$table = get_field('table');

			$tabContent='';
			if ( ! empty ( $table ) ) {
				$tabContent.= '<table border="0">';
					if ( ! empty( $table['caption'] ) ) {
						$tabContent.= '<caption>' . $table['caption'] . '</caption>';
					}
					if ( ! empty( $table['header'] ) ) {
						$tabContent.= '<thead>';
							$tabContent.= '<tr>';
								foreach ( $table['header'] as $th ) {
									$tabContent.= '<th>';
										$tabContent.= $th['c'];
									$tabContent.= '</th>';
								}
							$tabContent.= '</tr>';
						$tabContent.= '</thead>';
					}
					$tabContent.= '<tbody>';
						foreach ( $table['body'] as $tr ) {
							$tabContent.= '<tr>';
								foreach ( $tr as $td ) {
									$tabContent.= '<td>';
										$tabContent.= $td['c'];
										if ($td['c']=='') $tabContent.='&nbsp;';

									$tabContent.= '</td>';
								}
							$tabContent.= '</tr>';
						}
					$tabContent.= '</tbody>';
				$tabContent.= '</table>';
			}
        }
    } else {
        $tabContent = '';
    }

    wp_reset_postdata();

    return $tabContent;

}

?>