<?php
/**
 * Plugin Name: Nelios Packages CPT
 */

add_action('init', function () {
    register_post_type('package', [
        'labels' => [
            'name' => 'Packages',
            'singular_name' => 'Package',
        ],
        'public' => true,
        'show_in_rest' => true,
        'menu_icon' => 'dashicons-palmtree',
        'supports' => ['title', 'editor', 'thumbnail'],
    ]);
});