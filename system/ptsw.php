<?php

function pingPTSW($uri)
{
	$ptsw_conn = curl_init();
	
	if (!$ptsw_conn) 
	{
		return;
	}
	
	// set some cURL options
	$ret = curl_setopt($ptsw_conn, CURLOPT_URL, "http://pingthesemanticweb.com/rest/?url=".urlencode($uri));
	$ret = curl_setopt($ptsw_conn, CURLOPT_FOLLOWLOCATION, 1);
	$ret = curl_setopt($ptsw_conn, CURLOPT_RETURNTRANSFER, 1);
	$ret = curl_setopt($ptsw_conn, CURLOPT_USERAGENT, "zlink.zitgist.com-WP-Plugin/0.2");
	$ret = curl_setopt($ptsw_conn, CURLOPT_TIMEOUT, 15);


	// Send the request
	$ptsw_answer = curl_exec($ptsw_conn);
	
	if (empty($ptsw_answer)) 
	{
		// some kind of an error occured
		curl_close($ptsw_conn);
	} 
	else 
	{
		curl_close($ptsw_conn);
	}
}


?>
