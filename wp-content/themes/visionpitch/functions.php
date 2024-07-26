<?php
/**
 * Функции шаблона (function.php)
 * @package WordPress
 * @subpackage VisionPitch-template
 */
include("registration.php");
add_theme_support('title-tag'); // теперь тайтл управляется самим вп

register_nav_menus(array( // Регистрируем меню
	'left' => 'Left', // ID must be mainMenu
));

add_theme_support('post-thumbnails'); // включаем поддержку миниатюр
set_post_thumbnail_size(250, 150); // задаем размер миниатюрам 250x150
add_image_size('big-thumb', 400, 400, true); // добавляем еще один размер картинкам 400x400 с обрезкой


add_action('wp_footer', 'add_scripts'); // приклеем ф-ю на добавление скриптов в футер
if (!function_exists('add_scripts')) { // если ф-я уже есть в дочерней теме - нам не надо её определять
	function add_scripts() { // добавление скриптов
	    if(is_admin()) return false; // если мы в админке - ничего не делаем
	    wp_deregister_script('jquery'); // выключаем стандартный jquery
	    // wp_enqueue_script('jquery','//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js','','',true); // добавляем свой
	    // wp_enqueue_script('bootstrap', get_template_directory_uri().'/js/bootstrap.min.js','','',true); // бутстрап
	    // wp_enqueue_script('main', get_template_directory_uri().'/js/main.js','','',true); // и скрипты шаблона
	}
}



function my_login_stylesheet() {
    wp_enqueue_style( 'custom-login', get_stylesheet_directory_uri() . '/login.css' );
    // wp_enqueue_script( 'custom-login', get_stylesheet_directory_uri() . '/login.js' );
}


// Remove JQuery Migrate message in console
add_action('wp_default_scripts', function ($scripts) {
    if (!empty($scripts->registered['jquery'])) {
        $scripts->registered['jquery']->deps = array_diff($scripts->registered['jquery']->deps, ['jquery-migrate']);
    }
});


add_action( 'login_enqueue_scripts', 'my_login_stylesheet' );
require_once get_template_directory().'/vp-components/php/vp-functions.php';


add_action('wp_ajax_registrationFormData', 'registrationFormData');
add_action('wp_ajax_nopriv_registrationFormData', 'registrationFormData');

function registrationFormData() {
    $data = $_POST['optionvalue'];
    global $wpdb;

    if (!empty($data)) {
        $table_name = $wpdb->prefix . "registration_form";
        $fname = sanitize_text_field($data['fname']);
        $lname = sanitize_text_field($data['lname']);
        $email = sanitize_text_field($data['email']);
        $country_code = sanitize_text_field($data['country_code']);
        $phone_num = sanitize_text_field($data['phone_num']);
        $organisation = sanitize_text_field($data['organisation']);
        $message = sanitize_text_field($data['message']);

        if (!empty($fname) && !empty($lname) && !empty($email) && !empty($phone_num)) {
            $result = $wpdb->insert(
                $table_name,
                array(
                    'first_name' => $fname,
                    'last_name' => $lname,
                    'email' => $email,
                    'phone_no' => $phone_num,
                    'country_code' => $country_code,
                    'organisation' => $organisation,
                    'message' => $message,
                )
            );

            if ($result) {
                wp_send_json_success('Form submitted successfully');
            } else {
                wp_send_json_error('Error in form submission');
            }
        } else {
            wp_send_json_error('All required fields must be filled out');
        }
    } else {
        wp_send_json_error('No data received');
    }

    die();
}


?>