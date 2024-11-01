<?php

include_once('../../../wp-config.php');
include_once('../../../wp-includes/wp-db.php');

$uri = "";

if (isset($_GET['uri'])) 
{
    $uri = $_GET['uri'];
}


global $wpdb;
$table_name = $wpdb->prefix . "zlinks_annotations";

$query = 	"SELECT * FROM " . $table_name .
				" WHERE annotated_resource = '$uri' ORDER BY created";



$annotations = $wpdb->get_results($query);

// header
header('Content-type: text/xml');
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); // Date in the past

echo "<response>\n";

foreach ($annotations as $annotation) 
{
	echo "<annotation>\n";
	echo "	<id>".$annotation->id."</id>\n";
	echo "	<partial_uri>".$annotation->partial_uri."</partial_uri>\n";
	echo "	<author>".$annotation->author."</author>\n";
	echo "	<body>".htmlspecialchars($annotation->body)."</body>\n";
	echo "	<created>".$annotation->created."</created>\n";
	echo "</annotation>\n";
}

echo "</response>\n"

?>
