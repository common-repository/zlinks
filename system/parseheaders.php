<?php

function getValue($type)
{
	if (strstr($type, ";q=")) {
		$values = explode(";q=", $type);
	} else {
		$values = array($type, 1.0);
	}
	return $values;
}

function parseAccept($header, $options)
{
	$header = str_replace(" ", "", $header);

	/* Explode types into an array */
	$types = explode(",", $header);
	
	$types = array_map("getValue", $types);


	$keep_order = 0.100;

	/* Select only the requested options and sort by preference */
	$accepted = array();
	$accepted_type = array();
	$accepted_val = array();
	foreach ($types as $type) {
		if (in_array($type[0], $options)) {
			array_push($accepted, $type);
			array_push($accepted_type, $type[0]);
			if($type[1] == 1)
			{
				array_push($accepted_val, $type[1] + $keep_order);
				$keep_order = $keep_order - 0.01;
			}
			else
			{
				array_push($accepted_val, $type[1]);
			}
		}
	}
	
	array_multisort($accepted_val, SORT_DESC, $accepted_type, SORT_ASC, $accepted);
	return $accepted;
}



?>
