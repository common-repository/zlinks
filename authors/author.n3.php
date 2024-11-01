<?php

require_once('../system/parseheaders.php');
require_once('../system/validation.php');

include_once('../../../../wp-config.php');
include_once('../../../../wp-includes/wp-db.php');

$header_list = parseAccept($_SERVER['HTTP_ACCEPT'], array("text/rdf+n3", "application/rdf+n3", "application/turtle"));

foreach($header_list as $format)
{
	switch($format[0])
	{
		// RDF/N3
		case "text/rdf+n3":
			header('Content-type: text/rdf+n3');
		break;

		case "application/turtle":
			header('Content-type: application/turtle');
		break;

		default:
			header('Content-type: text/rdf+n3');
		break;
	}
}

global $wpdb;

$table_annotations = $wpdb->prefix . "zlinks_annotations";
$table_authors = $wpdb->prefix . "zlinks_authors";

$id = "";

if (isset($_GET['id'])) 
{
    $id = $_GET['id'];
}

$user_info = get_userdata($id);


$local_path_url = get_option('siteurl')."/wp-content/plugins/zlinks/";

$output = "";

$output .= "@prefix foaf: <http://xmlns.com/foaf/0.1/> .\n";
$output .= "@prefix dcterms: <http://purl.org/dc/terms/> .\n";
$output .= "@prefix owl: <http://www.w3.org/2002/07/owl#> .\n";


if(get_option("zlinks_option_private_".$id) == "false" || get_option("zlinks_option_private_".$annotation->author_id) == "")
{
	// Finding the author's URI.
	$author_uri = get_option('siteurl')."/wp-content/plugins/zlinks/authors/?id=".$id;
	
	if(get_option("zlinks_option_uri_".$id) == "existing" && get_option("zlinks_option_uri_existing_".$id) != "")
	{
		$author_uri = get_option("zlinks_option_uri_existing_".$id);
	}
	else if(get_option("zlinks_option_uri_".$id) == "same_as" && get_option("zlinks_option_uri_sameas_".$id) != "")
	{
		$author_uri = get_option("zlinks_option_uri_sameas_".$id);
	}
	
	
	$output .= "<$author_uri> a foaf:Person ;\n";
	
	if($user_info->first_name != "")
	{
		$output .= " foaf:firstName \"".triple_quote($user_info->first_name)."\" ;\n";
	}
	
	if($user_info->last_name != "")
	{
		$output .= " foaf:family_name \"".triple_quote($user_info->last_name)."\" ;\n";
	}
	
	if($user_info->nickname != "")
	{
		$output .= " foaf:nick \"".triple_quote($user_info->nickname)."\" ;\n";
	}
	
	
	if($user_info->user_url != "")
	{
		$output .= " foaf:homepage <".escape_space(htmlspecialchars($user_info->user_url))."> ;\n";
	}
	
	if($user_info->user_email != "")
	{
		$output .= " foaf:mbox_sha1sum \"".sha1($user_info->user_email)."\" ;\n";
	}
	
	// Link each created annotation with its author
	
	$query = 	"SELECT * FROM " . $table_annotations .
					" WHERE author_id = '$id'";
	
	$annotations = $wpdb->get_results($query);
	
	foreach ($annotations as $annotation) 
	{
		$output .= " foaf:made <".escape_space(htmlspecialchars($annotation->partial_uri.$annotation->id))."> ;\n";
	}
	
	
	// Check if there is an URI defined for that author. If so, make the link between the two author resources.
	$author_uri = "";
	
	if(get_option("zlinks_option_uri_".$id) == "same_as")
	{
		$output .= " owl:sameAs <".escape_space(htmlspecialchars(get_option("zlinks_option_uri_sameas_".$id)))."> ;\n";
	}
	
	
	
	
	$output = substr($output, 0, strlen($output) - 2).".\n";
}
echo $output;



?>
