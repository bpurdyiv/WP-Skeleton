<?php
/**
 * PurdyTheme functions and definitions
 *
 * @package PurdyTheme
 */

 /**
  * Enqueue scripts and styles for front-end.
  *
  */
function purdytheme_scripts() {
  wp_enqueue_style( 'purdytheme-style', get_template_directory_uri() . '/assets/purdystyles.min.css' );

  wp_enqueue_script( 'purdytheme-js', get_template_directory_uri() . '/js/js-name.js', array(), true, true );
}
add_action( 'wp_enqueue_scripts', 'purdytheme_scripts' );
