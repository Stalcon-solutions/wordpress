<?php
add_shortcode('pano', 'pano_shortcode');	//  Example: [pano id='panoId' container='parentContainerId' start='drone_high']

function pano_shortcode($atts) {
    $atts = shortcode_atts( array(
        'container' => '',
        'id' => '',
        'start' => '',
    ), $atts );

    if (empty($atts['container'])) {
        $container='';
    } else {
        $container=$atts['container'];
    }

    if (empty($atts['id'])) {
        $panoId='vpPano';
    } else {
        $panoId=$atts['id'];
    }

    if (empty($atts['start'])) {
        $startPanoName="";
    } else {
        $startPanoName=$atts['start'];
    }

    $output="
    <script>
        let panoParameters={
            container:'{$container}',
            id:'{$panoId}',
            startPanoName:'{$startPanoName}',
        }
    </script>
    ";
    return $output;
}

?>