<?php
add_action('wp_head', 'vpGoogleAnalyticsCode', 0);

function vpGoogleAnalyticsCode(){
	$vpThemeGTag=get_option('theme_googleAnalytics');
	if (!isParentPage() && trim($vpThemeGTag)!='') {
		$gtag=$vpThemeGTag;	// gtag for main domain name
		echo "
			<!-- Google tag (gtag.js) -->
			<script async src=\"https://www.googletagmanager.com/gtag/js?id=".$gtag."\"></script>
			<script>
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			gtag('config', '".$gtag."');
			</script>
		";
	}
}
?>

