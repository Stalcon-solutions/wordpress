<?php
/**
 * Шаблон подвала (footer.php)
 * @package WordPress
 * @subpackage VisionPitch-template
 */
?>


<?php

	if (!isStartPage() && !isParentPage()) {
		echo '
			<footer class="footer">
				<div class="footerLeft"></div>
				<div class="footerCenter"></div>
				<div class="footerRight"></div>
			</footer>
		';
	}


?>

<?php wp_footer(); // необходимо для работы плагинов и функционала  ?>
</body>
</html>