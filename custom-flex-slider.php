<?php

/*
Plugin Name: Custom FlexSlider
Description: A simple plugin that integrates FlexSlider with WordPress using custom post types!
Author: Undefined
Version: 0.1
*/

/*Some Set-up*/
define('EFS_PATH', WP_PLUGIN_URL . '/' . plugin_basename( dirname(__FILE__) ) . '/' );
define('EFS_NAME', "Custom FlexSlider");
define ("EFS_VERSION", "0.1");

/*Files to Include*/
require_once('slider-img-type.php');


/*Add the Javascript/CSS Files!*/
wp_enqueue_script('flexslider', EFS_PATH.'jquery.flexslider-min.js', array('jquery'));
wp_enqueue_script('custom_js', EFS_PATH.'custom.js');
wp_enqueue_style('flexslider_css', EFS_PATH.'flexslider.css');
wp_enqueue_style('custom_css', EFS_PATH.'custom.css');


/*Add the Hooks to place the javascript in the header*/

function efs_script(){

print '<script type="text/javascript" charset="utf-8">
  //jQuery(window).load(function() {
    //jQuery(\'.flexslider\').flexslider();
  //});
</script>';

}

add_action('wp_head', 'efs_script');

function efs_get_slider(){
	
	$slider= '<div class="flexslider">
	  <ul class="slides">';

	//$efs_query= "post_type=slider-image";
	$efs_query = array( 'post_type' => 'slider-image', 'LIMIT' => '10');
	query_posts($efs_query);
	
	
	if (have_posts()) : while (have_posts()) : the_post(); 
		$img =  get_the_post_thumbnail($post->ID);
		
		$slider.='<li class="flex__item">'.$img.'</li>';
			
	endwhile; endif; wp_reset_query();


	$slider.= '</ul>
	</div>';
	
	return $slider;
}


/**add the shortcode for the slider- for use in editor**/

function efs_insert_slider($atts, $content=null){

$slider= efs_get_slider();

return $slider;

}


add_shortcode('ef_slider', 'efs_insert_slider');



/**add template tag- for use in themes**/

function efs_slider(){

	print efs_get_slider();
}


?>