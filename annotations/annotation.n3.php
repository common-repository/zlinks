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

$id = "";

if (isset($_GET['id'])) 
{
    $id = $_GET['id'];
}

global $wpdb;
$table_name = $wpdb->prefix . "zlinks_annotations";

$query = 	"SELECT * FROM " . $table_name .
				" WHERE id = '$id'";



$annotations = $wpdb->get_results($query);


echo "@prefix annotea: <http://www.w3.org/2000/10/annotation-ns#> .\n";
echo "@prefix dcterms: <http://purl.org/dc/terms/> .\n";

// http://foo.com/wp-content/plugins/zlinks/annotations/?id=$id

foreach ($annotations as $annotation) 
{
	if(get_option("zlinks_option_private_".$annotation->author_id) == "false" || get_option("zlinks_option_private_".$annotation->author_id) == "")
	{
		// Finding the author's URI.
		$author_uri = get_option('siteurl')."/wp-content/plugins/zlinks/authors/?id=".$annotation->author_id;
		
		if(get_option("zlinks_option_uri_".$annotation->author_id) == "existing" && get_option("zlinks_option_uri_existing_".$annotation->author_id) != "")
		{
			$author_uri = get_option("zlinks_option_uri_existing_".$annotation->author_id);
		}
		else if(get_option("zlinks_option_uri_".$annotation->author_id) == "same_as" && get_option("zlinks_option_uri_sameas_".$annotation->author_id) != "")
		{
			$author_uri = get_option("zlinks_option_uri_sameas_".$annotation->author_id);
		}
	
		echo "<".escape_space(htmlspecialchars($annotation->partial_uri.$annotation->id))."> a annotea:Annotation ;\n";
		echo " annotea:annotates <".escape_space(htmlspecialchars($annotation->annotated_resource))."> ;\n";
		echo " annotea:body \"\"\"".triple_quote($annotation->body)."\"\"\" ;\n";
		echo " dcterms:creator <".escape_space(htmlspecialchars($author_uri))."> ;\n";
		echo " dcterms:date \"".triple_quote($annotation->created)."\" .\n\n";
	}
}

?>
