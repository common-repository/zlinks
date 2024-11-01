<?php

include_once('../../../wp-config.php');
include_once('../../../wp-includes/wp-db.php');

include_once('system/lib_filter.php');
include_once('system/ptsw.php');

$id = "";
$body = "";
$author = "";

if (isset($_POST['id'])) 
{
    $id = urldecode($_POST['id']);
}

if (isset($_POST['body'])) 
{
    $body = stripslashes(urldecode($_POST['body']));
	
	$body = str_replace(array("\\\"", "\'", "\\\\"), array("\"", "'", "\\"), $body);
	
	$body = str_replace(array("\r\n", "\r", "\n"), "<br>", $body);
}

if (isset($_POST['author'])) 
{
    $author = stripslashes(urldecode($_POST['author']));
}

$date = date('Y-m-d');
$time = date('H:i:s');

global $wpdb;
$table_name = $wpdb->prefix . "zlinks_annotations";


// Filtering out bad HTML. Prevent HTML code injection
$filter_annotation = new lib_filter();
$body = $filter_annotation->go($body);


$update =		"UPDATE " . $table_name .
				 	" SET body = '".quote_smart($body)."' WHERE id = $id";

$results = $wpdb->query( $update );

// header 
header('Content-type: text/xml');
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); // Date in the past

echo "<response>\n";
echo "</response>\n";


// If user shares annotations, then we have to ping http://pingthesemanticweb.com
if(get_option("zlinks_option_private_".$author) == "false" || get_option("zlinks_option_private_".$author) == "")
{
	$query = 	"SELECT * FROM " . $table_name .
					" WHERE id = $id";
					
	$annotations = $wpdb->get_results($query);

	foreach ($annotations as $annotation) 
	{
		pingPTSW($annotation->partial_uri.$annotation->id);
	}
}



function quote_smart($value)
{
   // Stripslashes
   if (get_magic_quotes_gpc()) 
   {
	   $value = stripslashes($value);
   }
   // Quote if not a number or a numeric string
   if (!is_numeric($value)) 
   {
	   $value = mysql_escape_string($value);
   }

   return $value;
}




?>
