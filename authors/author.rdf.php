<?php

require_once('../system/parseheaders.php');
require_once('../system/validation.php');

include_once('../../../../wp-config.php');
include_once('../../../../wp-includes/wp-db.php');


header('Content-type: application/rdf+xml');


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


$output .= "<?xml version=\"1.0\"?>\n";
$output .= "<rdf:RDF xmlns:foaf=\"http://xmlns.com/foaf/0.1/\" xmlns:owl=\"http://www.w3.org/2002/07/owl#\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n";

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
	
	$output .= "<foaf:Person rdf:about=\"".escape_space(htmlspecialchars($author_uri))."\"> \n";
	
	if($user_info->first_name != "")
	{
		$output .= " <foaf:firstName>".htmlspecialchars($user_info->first_name)."</foaf:firstName>\n";
	}
	
	if($user_info->last_name != "")
	{
		$output .= " <foaf:family_name>".htmlspecialchars($user_info->last_name)."</foaf:family_name>\n";
	}
	
	if($user_info->nickname != "")
	{
		$output .= " <foaf:nick>".htmlspecialchars($user_info->nickname)."</foaf:nick>\n";
	}
	
	
	if($user_info->user_url != "")
	{
		$output .= " <foaf:homepage rdf:resource=\"".escape_space(htmlspecialchars($user_info->user_url))."\" />\n";
	}
	
	if($user_info->user_email != "")
	{
		$output .= " <foaf:mbox_sha1sum>".sha1($user_info->user_email)."</foaf:mbox_sha1sum>\n";
	}
	
	// Link each created annotation with its author
	
	$query = 	"SELECT * FROM " . $table_annotations .
					" WHERE author_id = '$id'";
	
	$annotations = $wpdb->get_results($query);
	
	foreach ($annotations as $annotation) 
	{
		$output .= " <foaf:made rdf:resource=\"".escape_space(htmlspecialchars($annotation->partial_uri.$annotation->id))."\" />\n";
	}
	
	
	// Check if there is an URI defined for that author. If so, make the link between the two author resources.
	$author_uri = "";
	
	if(get_option("zlinks_option_uri_".$id) == "same_as")
	{
		$output .= " <owl:sameAs rdf:resource=\"".escape_space(htmlspecialchars(get_option("zlinks_option_uri_sameas_".$id)))."\" /> ;\n";
	}
	
	$output .= "</foaf:Person> \n";
	
}


$output .= "</rdf:RDF>\n";


echo $output;



?>
