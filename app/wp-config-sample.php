<?php
// ===================================================
// Load database info and local development parameters
// ===================================================
if ( file_exists( dirname( __FILE__ ) . '/wp-config-local.php' ) ) {
  include( dirname( __FILE__ ) . '/wp-config-local.php' );
} else {
  define( 'DB_NAME', 'db_name' );
  define( 'DB_USER', 'db_user' );
  define( 'DB_PASSWORD', 'db_password' );
  define( 'DB_HOST', 'localhost' ); // Probably 'localhost'
}

// ========================
// Custom Content Directory
// ========================
define( 'WP_CONTENT_DIR', dirname( __FILE__ ) . '/content' );
define( 'WP_CONTENT_URL', 'http://' . $_SERVER['HTTP_HOST'] . '/content' );

// ============================================================
// Define the Wordpress Core location and the site home address
// ============================================================
define( 'WP_SITEURL', 'http://' . $_SERVER['HTTP_HOST'] . '/wp' );
define( 'WP_HOME', 'http://' . $_SERVER['HTTP_HOST'] );

// ================================================
// You almost certainly do not want to change these
// ================================================
define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );

// ==============================================================
// Salts, for security
// Grab these from: https://api.wordpress.org/secret-key/1.1/salt
// ==============================================================
define( 'AUTH_KEY',         'put your unique phrase here' );
define( 'SECURE_AUTH_KEY',  'put your unique phrase here' );
define( 'LOGGED_IN_KEY',    'put your unique phrase here' );
define( 'NONCE_KEY',        'put your unique phrase here' );
define( 'AUTH_SALT',        'put your unique phrase here' );
define( 'SECURE_AUTH_SALT', 'put your unique phrase here' );
define( 'LOGGED_IN_SALT',   'put your unique phrase here' );
define( 'NONCE_SALT',       'put your unique phrase here' );

// ==============================================================
// Table prefix
// Change this if you have multiple installs in the same database
// ==============================================================
$table_prefix  = 'wp_';

// ================================
// Language
// Leave blank for American English
// ================================
define( 'WPLANG', '' );

// ==================
// Disable Debug Mode
// ==================
define('WP_DEBUG', false);

// ======================================
// Load a Memcached config if we have one
// ======================================
if ( file_exists( dirname( __FILE__ ) . '/memcached.php' ) )
  $memcached_servers = include( dirname( __FILE__ ) . '/memcached.php' );

// ===================
// Bootstrap WordPress
// ===================
if ( !defined( 'ABSPATH' ) )
  define( 'ABSPATH', dirname( __FILE__ ) . '/wp/' );
require_once( ABSPATH . 'wp-settings.php' );
