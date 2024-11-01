<?php

require_once('../system/validation.php');

include_once('../../../../wp-config.php');
include_once('../../../../wp-includes/wp-db.php');


header('Content-type: application/rdf+xml');

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


echo "<?xml version=\"1.0\"?>\n";
echo "<rdf:RDF xmlns:annotea=\"http://www.w3.org/2000/10/annotation-ns#\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns:dcterms=\"http://purl.org/dc/terms/\">\n";

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
	
		echo "<annotea:Annotation rdf:about=\"".$annotation->partial_uri.$annotation->id."\">\n";
		echo "	<annotea:annotates rdf:resource=\"".escape_space(htmlspecialchars($annotation->annotated_resource))."\" />\n";
		echo "	<annotea:body>".htmlspecialchars($annotation->body)."</annotea:body>\n";
		echo "	<dcterms:creator rdf:resource=\"".escape_space(htmlspecialchars($author_uri))."\" />\n";
		echo "	<dcterms:date>".htmlspecialchars($annotation->created)."</dcterms:date>\n";
		echo "</annotea:Annotation>\n";
	}
}

echo "</rdf:RDF>\n";

?>
