<?php

function triple_quote($str)
{
	return str_replace("\"", "\\\"", $str);
}	

function escape_space($str)
{
	return str_replace(" ", "%20", $str);
}	

?>
