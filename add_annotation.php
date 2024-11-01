<?php

include_once('../../../wp-config.php');
include_once('../../../wp-includes/wp-db.php');

include_once('system/lib_filter.php');
include_once('system/ptsw.php');


$uri = "";
$partial_uri = "";
$author = "";
$annotated_resource = "";
$body = "";

if (isset($_POST['uri'])) 
{
    $uri = urldecode($_POST['uri']);
}

if (isset($_POST['partial_uri'])) 
{
    $partial_uri = urldecode($_POST['partial_uri']);
}

if (isset($_POST['author'])) 
{
    $author = urldecode($_POST['author']);
}

if (isset($_POST['annotated_resource'])) 
{
    $annotated_resource = urldecode($_POST['annotated_resource']);
}

if (isset($_POST['body'])) 
{
    $body = stripslashes(urldecode($_POST['body']));
	
	$body = str_replace(array("\r\n", "\r", "\n"), "<br>", $body);
	
	$body = hyperlink_urls($body, 30, '', '...', false);
}

$date = date('Y-m-d');
$time = date('H:i:s');

global $wpdb;
$table_name = $wpdb->prefix . "zlinks_annotations";


// Filtering out bad HTML. Prevent HTML code injection
$filter_annotation = new lib_filter();
$body = $filter_annotation->go($body);



$insert = 	"INSERT INTO " . $table_name .
				" (partial_uri, author_id, body, annotated_resource, created) " .
				"VALUES ('".quote_smart($partial_uri)."','".quote_smart($author)."', '".quote_smart($body)."', '".quote_smart($annotated_resource)."', '$date $time')";

$results = $wpdb->query( $insert );

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
					" WHERE created = '$date $time'";
					
	$annotations = $wpdb->get_results($query);

	foreach ($annotations as $annotation) 
	{
		pingPTSW($partial_uri.$annotation->id);
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

// From: http://www.coffee2code.com
// mode: 0=full url; 1=host-only ;11+=number of characters to truncate after
function hyperlink_urls ($text, $mode='0', $trunc_before='', $trunc_after='...', $open_in_new_window=true) {
	$text = ' ' . $text . ' ';
	$new_win_txt = ($open_in_new_window) ? ' target="_blank"' : '';
        
	// Hyperlink Class B domains *.(com|org|net|gov|edu|us|info|biz|ws|name|tv)(/*)
	$text = preg_replace("#([\s{}\(\)\[\]])([A-Za-z0-9\-\.]+)\.(com|org|net|gov|edu|us|info|biz|ws|name|tv)((?:/[^\s{}\(\)\[\]]*[^\.,\s{}\(\)\[\]]?)?)#ie",
		"'$1<a href=\"http://$2.$3$4\" title=\"http://$2.$3$4\"$new_win_txt>' . truncate_link(\"$2.$3$4\", \"$mode\", \"$trunc_before\", \"$trunc_after\") . '</a>'",
		$text);

	// Hyperlink anything with an explicit protocol
	$text = preg_replace("#([\s{}\(\)\[\]])(([a-z]+?)://([A-Za-z_0-9\-]+\.([^\s{}\(\)\[\]]+[^\s,\.\;{}\(\)\[\]])))#ie",
		"'$1<a href=\"$2\" title=\"$2\"$new_win_txt>' . truncate_link(\"$4\", \"$mode\", \"$trunc_before\", \"$trunc_after\") . '</a>'",
                $text);

	// Hyperlink e-mail addresses
	$text = preg_replace("#([\s{}\(\)\[\]])([A-Za-z0-9\-_\.]+?)@([^\s,{}\(\)\[\]]+\.[^\s.,{}\(\)\[\]]+)#ie",
		"'$1<a href=\"mailto:$2@$3\" title=\"mailto:$2@$3\">' . truncate_link(\"$2@$3\", \"$mode\", \"$trunc_before\", \"$trunc_after\") . '</a>'",
		$text);

	return substr($text,1,strlen($text)-2);
}

function truncate_link($url, $mode='0', $trunc_before='', $trunc_after='...') 
{
	if (1 == $mode) {
                $url = preg_replace("/(([a-z]+?):\\/\\/[A-Za-z0-9\-\.]+).*/i", "$1", $url);
                $url = $trunc_before . preg_replace("/([A-Za-z0-9\-\.]+\.(com|org|net|gov|edu|us|info|biz|ws|name|tv)).*/i", "$1", $url) . $trunc_after;
        } elseif (($mode > 10) && (strlen($url) > $mode)) {
                $url = $trunc_before . substr($url, 0, $mode) . $trunc_after;
        }
        return $url;
}

?>
