<?php 
                $currentDomain = $_SERVER['SERVER_NAME'];
                $mapDomain="binah-map";
                if (strripos($currentDomain, $mapDomain)===false){
                    // Not Map
                    $title="Investment Opportunity";
                    $start="Start Presentation";

                } else {
                    // Map
                    $title="Projects Map";
                    $start="Launch Map";

                }
?>

<div class="startScreen" style="visibility: hidden;">
    <div class="startScreenCenter">
        <div class="startScreenLogo"><img src="/wp-content/uploads/binah-logo-white.svg" alt="Binah" /></div>
        <div class="startScreenTitle">
            <?php echo $title; ?>
        </div>
        <div class="startScreenSubTitle">
            Creating opportunities.<br />
            Building communities.<br />
            Empowering lives.
        </div>
        <div class="startScreenButton" onClick="page.prevNext('next',this);">
            <div class="startText"><?php echo $start; ?></div><div class="startArrow"></div>
        </div>    
    </div>
</div>