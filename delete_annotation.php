<?php

include_once('../../../wp-config.php');
include_once('../../../wp-includes/wp-db.php');



$id = "";

if (isset($_GET['id'])) 
{
    $id = urldecode($_GET['id']);
}

global $wpdb;
$table_name = $wpdb->prefix . "zlinks_annotations";



$delete = 	"DELETE FROM " . $table_name .
				" WHERE id = '$id'";

$results = $wpdb->query( $delete );

// header 
header('Content-type: text/xml');
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); // Date in the past

echo "<response>\n";
echo "</response>\n";


?>
