<?php

function mytheme_customize_register( $wp_customize ) {
/*
adding Section to Theme settings
*/
$wp_customize->add_section(
    // ID
    'data_site_section',
    // Arguments array
    array(
        'title' => 'Main Menu Settings',
        'capability' => 'edit_theme_options',
        'description' => "Main menu logo and contacts"
    )
);


$wp_customize->add_setting(
    // ID
    'theme_hideHelpscreen',
    // Arguments array
    array(
        'default' => '',
        'type' => 'option'
    )
);
$wp_customize->add_control(
    // ID
    'theme_hideHelpscreen_control',
    // Arguments array
    array(
        'type' => 'text',
        'label' => "Logo image (without path)",
        'section' => 'data_site_section2',
        // This last one must match setting ID from above
        'settings' => 'theme_hideHelpscreen'
    )
);









$wp_customize->add_setting(
    // ID
    'theme_menuLogo',
    // Arguments array
    array(
        'default' => '',
        'type' => 'option'
    )
);
$wp_customize->add_control(
    // ID
    'theme_menuLogo_control',
    // Arguments array
    array(
        'type' => 'text',
        'label' => "Logo image (without path)",
        'section' => 'data_site_section',
        // This last one must match setting ID from above
        'settings' => 'theme_menuLogo'
    )
);




$wp_customize->add_setting(
    // ID
    'theme_menuPhone',
    // Arguments array
    array(
        'default' => '',
        'type' => 'option'
    )
);
$wp_customize->add_control(
    // ID
    'theme_menuPhone_control',
    // Arguments array
    array(
        'type' => 'text',
        'label' => "Phone",
        'section' => 'data_site_section',
        // This last one must match setting ID from above
        'settings' => 'theme_menuPhone'
    )
);


$wp_customize->add_setting(
    // ID
    'theme_menuEmail',
    // Arguments array
    array(
        'default' => '',
        'type' => 'option'
    )
);
$wp_customize->add_control(
    // ID
    'theme_menuEmail_control',
    // Arguments array
    array(
        'type' => 'text',
        'label' => "Email",
        'section' => 'data_site_section',
        // This last one must match setting ID from above
        'settings' => 'theme_menuEmail'
    )
);













$wp_customize->add_section(
    // ID
    'google_analytics_site_section',
    // Arguments array
    array(
        'title' => 'Google Analytics',
        'capability' => 'edit_theme_options',
        'description' => ""
    )
);

$wp_customize->add_setting(
    // ID
    'theme_googleAnalytics',
    // Arguments array
    array(
        'default' => '',
        'type' => 'option'
    )
);
$wp_customize->add_control(
    // ID
    'theme_googleAnalytics_control',
    // Arguments array
    array(
        'type' => 'text',
        'label' => "Google Analytics GTag (like: G-xxxxxxxxx)",
        'section' => 'google_analytics_site_section',
        // This last one must match setting ID from above
        'settings' => 'theme_googleAnalytics'
    )
);













// $wp_customize->add_section(
//     'helpscreen_site_section',
//     array(
//         'title' => 'Help screen',
//         'capability' => 'edit_theme_options',
//         'description' => ""
//     )
// );
// $wp_customize->add_setting(
//     'theme_helpscreen',
//     array(
//         'default' => '',
//         'type' => 'option'
//     )
// );
// $wp_customize->add_control(
//     'theme_helpscreen_control',
//     array(
//         'type' => 'checkbox',
//         'label' => "Hide Help Screen at start",
//         'section' => 'helpscreen_site_section',
//         'settings' => 'theme_helpscreen'
//     )
// );




}
add_action( 'customize_register', 'mytheme_customize_register' );

?>