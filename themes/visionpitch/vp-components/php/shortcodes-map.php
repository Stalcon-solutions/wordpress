<?php
add_shortcode('map', 'map_shortcode');	//  Example: [map id='mapId' container='parentContainerId' lat='60' lon='30' zoom='11' pitch='45' noanimation='1' style='mapbox://styles/mapbox/streets-v12']

function map_shortcode($atts) {
    $atts = shortcode_atts( array(
        'container' => '',
        'id' => '',
        'lat' => '',
        'lon' => '',
        'zoom' => '',
        'pitch' => '',
        'style' => '',
        'noanimation' => '',
    ), $atts );

    if (empty($atts['container'])) {
        $container='';
    } else {
        $container=$atts['container'];
    }

    if (empty($atts['id'])) {
        $mapId='vpMap';
    } else {
        $mapId=$atts['id'];
    }

    if (empty($atts['lat'])) {
        $lat="0";
    } else {
        $lat=$atts['lat'];
    }

    if (empty($atts['lon'])) {
        $lon="0";
    } else {
        $lon=$atts['lon'];
    }

    if (empty($atts['zoom'])) {
        $zoom="0";
    } else {
        $zoom=$atts['zoom'];
    }

    if (empty($atts['pitch'])) {
        $pitch="0";
    } else {
        $pitch=$atts['pitch'];
    }

    if (empty($atts['style'])) {
        $style="mapbox://styles/mapbox/streets-v12";
    } else {
        $style=$atts['style'];
    }
    

    if (empty($atts['noanimation'])) {
        $noanimation="0";
    } else {
        $noanimation="1";
    }


    $output="
    <script>
        let mapParameters={
            container:'{$container}',
            id:'{$mapId}',
            lat:{$lat},
            lon:{$lon},
            zoom:{$zoom},
            pitch:{$pitch},
            style:'{$style}',
            noanimation:'{$noanimation}',
        }
    </script>
    ";
    return $output;
}

?>