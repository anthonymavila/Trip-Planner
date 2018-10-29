<?php

	if ( @ isset($_GET['page']) ) {
		$page = $_GET['page'];
		$template = file_get_contents("views/{$page}.html");
		if ( isset($_GET['lid']) ) {
			$locs = array(
				0  => "",
				1  => "Cliffs of Utah",
				2  => "Grand Canyon Arizona",
				3  => "Tall Building",
				4  => "",
				5  => "Long Beach California",
				6  => "New York, New York",
				7  => "Manhattan New York",
				8  => "Las Vegas Nevada",
				9  => "Space Needle Oregon",
				10 => "The Keys Florida",
				11 => "Miami Florida",
				12 => "Hollywood California"
			);
			$template = str_replace("{@var=lid}", 	$_GET['lid'], 		 $template);
			$template = str_replace("{@var=lname}", $locs[$_GET['lid']], $template);
		}
	} else {
		$template = file_get_contents("views/home.html");
	}
	
	echo $template;

?>