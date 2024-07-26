<?php
/**
 * Страница 404 ошибки (404.php)
 * @package WordPress
 * @subpackage VisionPitch-template
 */
get_header(); // Подключаем header.php ?>
<section style='
position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: black;
    top: 0;
    left: 0;
    background-position: center;
    background-size: cover;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
'>
	<div class="container" style='
	position: relative;
    padding: 5vw;
    /* background-color: rgba(0,0,0,0.5);
    border-radius: 20px; */
    backdrop-filter: blur(10px);
    text-align: center;
    box-shadow: 0 0 100px rgba(0,0,0,0.5);
    border: solid 1px rgba(255,255,255,0.2);
	z-index:1;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
	'>
				<div class='error404left' style='
                    padding-right: 10px;
                    font-weight:500;
                '>ERROR 404</div>
                <div class='error404right' style='
                    text-align: left;
                    padding-left: 10px;
                    border-left: solid 1px white;
                '>
				    Page not found<br />
				    Please go to the <a href='/'>start page</a>
                </div>
	</div>
	<div style='
		position:absolute;
		top:0;
		left:0; width:100%; height:100%;
		background-color: rgba(0,0,0,0.5);
		z-index:0;
	'></div>
</section>
<?php get_footer(); // подключаем footer.php ?>